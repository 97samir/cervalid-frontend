import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { selectInstitutionRequest } from "../api/authApi";
import useAuthStore from "@/app/store/auth/useAuthStore";
import useRoleRedirect from "@/core/security/useRoleRedirect";
import tokenManager from "@/core/security/tokenManager";

export default function SelectInstitutionPage() {
    const location = useLocation();
    const navigate = useNavigate();

    const { loadUser, notifyLogin } = useAuthStore();
    const redirectByRole = useRoleRedirect();

    const institutions =
        location.state?.institutions?.length > 0
        ? location.state.institutions
        : tokenManager.getPendingInstitutions();

    const [selectedInstitution, setSelectedInstitution] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSelect = async (institution) => {
        if (loading) return;

        const { institutionUserId, institutionId } = institution;

        if (!institutionUserId || !institutionId) {
        setError("No se pudo identificar la institución seleccionada.");
        return;
        }

        setSelectedInstitution(institution);
        setError("");
        setLoading(true);

        try {
        await selectInstitutionRequest({
            institutionUserId,
            institutionId,
        });

        const updatedUser = await loadUser();

        if (updatedUser?.role) {
            notifyLogin();
            tokenManager.clearPendingInstitutions();
            redirectByRole(updatedUser);
        }

        tokenManager.clearPendingInstitutions();

        redirectByRole(updatedUser);
        } catch (err) {
        console.error("Error seleccionando institución:", err);

        setError(
            err.response?.data?.message ||
            "No fue posible seleccionar la institución. Vuelve a intentarlo.",
        );
        } finally {
        setLoading(false);
        }
    };

    if (!institutions.length) {
        return (
        <div className="auth-page">
            <div className="auth-card-wrapper">
            <div className="auth-card text-center">
                <div className="auth-page-icon">
                <i className="bi bi-building-x"></i>
                </div>

                <h1>Selecciona una institución</h1>

                <p className="text-muted">
                No encontramos la lista de instituciones de tu inicio de sesión.
                Vuelve a iniciar sesión para continuar.
                </p>

                <button
                type="button"
                className="btn auth-submit-btn w-100 mt-3"
                onClick={() => navigate("/login", { replace: true })}
                >
                Volver al inicio de sesión
                </button>
            </div>
            </div>
        </div>
        );
    }

    return (
        <div className="auth-page">
        <div className="auth-card-wrapper auth-card-wide">
            <div className="auth-page-heading">
            <div className="auth-page-icon">
                <i className="bi bi-buildings-fill"></i>
            </div>

            <h1>Selecciona una institución</h1>

            <p>
                Tu cuenta está asociada a varias instituciones. Selecciona con cuál
                deseas continuar.
            </p>
            </div>

            <div className="auth-card">
            {error && (
                <div className="alert alert-danger auth-alert" role="alert">
                <i className="bi bi-exclamation-circle me-2"></i>
                {error}
                </div>
            )}

            <div className="institution-selection-list">
                {institutions.map((institution) => {
                const isSelected =
                    selectedInstitution?.institutionUserId ===
                    institution.institutionUserId;

                return (
                    <button
                    key={institution.institutionUserId}
                    type="button"
                    className={`institution-selection-item ${
                        isSelected ? "selected" : ""
                    }`}
                    onClick={() => handleSelect(institution)}
                    disabled={loading}
                    >
                    <div className="institution-selection-icon">
                        <i className="bi bi-building"></i>
                    </div>

                    <div className="institution-selection-content">
                        <strong>{institution.institutionName}</strong>

                        <span>{institution.role}</span>
                    </div>

                    <div className="institution-selection-arrow">
                        {isSelected && loading ? (
                        <span
                            className="spinner-border spinner-border-sm"
                            aria-hidden="true"
                        ></span>
                        ) : (
                        <i className="bi bi-chevron-right"></i>
                        )}
                    </div>
                    </button>
                );
                })}
            </div>

            <div className="institution-selection-help">
                <i className="bi bi-info-circle"></i>

                <span>
                Tu acceso dependerá del rol que tengas en la institución
                seleccionada.
                </span>
            </div>
            </div>
        </div>
        </div>
    );
}
