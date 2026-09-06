import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { selectInstitutionRequest } from "../api/authApi";
import useAuthStore from "@/app/store/auth/useAuthStore";
import useRoleRedirect from "@/core/security/useRoleRedirect";

export default function SelectInstitutionPage() {

    const location = useLocation();
    const navigate = useNavigate();

    const { loadUser } = useAuthStore();
    const redirectByRole = useRoleRedirect();

    const institutions = location.state?.institutions || [];

    const [selectedInstitution, setSelectedInstitution] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSelect = async (institution) => {
        if (loading) return;

        setSelectedInstitution(institution);
        setError("");

        const institutionUserId = institution.id ?? institution.institutionUserId;

        const institutionId = institution.institutionId;

        if (!institutionUserId || !institutionId) {
        setError("No se pudo identificar la institución seleccionada.");
        return;
        }

        try {
        setLoading(true);

        await selectInstitutionRequest({
            institutionUserId,
            institutionId,
        });

        const updatedUser = await loadUser();

        if (!updatedUser?.role) {
            setError("No se pudo determinar el rol de tu cuenta.");
            return;
        }

        redirectByRole(updatedUser.role);
        } catch (err) {
        setError(
            err.response?.data?.message ||
            "No fue posible seleccionar la institución.",
        );
        } finally {
        setLoading(false);
        }
    };

    /*
    * Protección adicional:
    * si alguien llega directamente a esta URL sin
    * haber pasado por el login.
    */
    if (!institutions.length) {
        return (
        <div className="auth-page">
            <div className="auth-card-wrapper">
            <div className="auth-card text-center">
                <div className="auth-page-icon">
                <i className="bi bi-building-x"></i>
                </div>

                <h1>No hay instituciones disponibles</h1>

                <p className="text-muted">
                No encontramos instituciones asociadas a tu sesión.
                </p>

                <button
                className="btn auth-submit-btn w-100 mt-3"
                onClick={() => navigate("/login")}
                >
                Volver a iniciar sesión
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
                const institutionId =
                    institution.id ?? institution.institutionUserId;

                const isSelected =
                    selectedInstitution?.institutionId ===
                    institution.institutionId;

                return (
                    <button
                    key={institutionId}
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

                        <span>Continuar con esta institución</span>
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
                Puedes cambiar de institución posteriormente desde tu cuenta,
                según tus permisos.
                </span>
            </div>
            </div>
        </div>
        </div>
    );
}
