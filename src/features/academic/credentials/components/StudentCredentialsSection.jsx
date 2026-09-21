import { useState } from "react";

import CredentialTable from "./CredentialTable";
import CredentialForm from "./CredentialForm";
import CredentialDetailCard from "./CredentialDetailCard";
import CredentialActionModal from "./CredentialActionModal";

import { useStudentCredentials } from "../hooks/useStudentCredentials";
import { useCreateCredential } from "../hooks/useCreateCredential";
import { useUpdateCredential } from "../hooks/useUpdateCredential";
import { useIssueCredential } from "../hooks/useIssueCredential";
import { useRevokeCredential } from "../hooks/useRevokeCredential";

export default function StudentCredentialsSection({ 
    studentPublicId 
}) {
    const [view, setView] = useState("list");
    const [selectedCredential, setSelectedCredential] = useState(null);
    const [action, setAction] = useState(null);
    const [actionError, setActionError] = useState("");

    const {
        data: credentials = [],
        isLoading,
        isError,
        error,
    } = useStudentCredentials(studentPublicId);

    const createMutation = useCreateCredential();
    const updateMutation = useUpdateCredential();
    const issueMutation = useIssueCredential();
    const revokeMutation = useRevokeCredential();

    /* =====================================================
        CREAR
        ===================================================== */

    const handleCreate = () => {
        setSelectedCredential(null);
        setActionError("");
        setView("create");
    };

    /* =====================================================
        VER DETALLE
        ===================================================== */

    const handleView = (credential) => {
        setSelectedCredential(credential);
        setActionError("");
        setView("detail");
    };

    /* =====================================================
        EDITAR
        ===================================================== */

    const handleEdit = (credential) => {
        setSelectedCredential(credential);
        setActionError("");
        setView("edit");
    };

    /* =====================================================
        EMITIR
        ===================================================== */

    const handleIssue = (credential) => {
        setSelectedCredential(credential);
        setActionError("");
        setAction("issue");
    };

    /* =====================================================
        REVOCAR
        ===================================================== */

    const handleRevoke = (credential) => {
        setSelectedCredential(credential);
        setActionError("");
        setAction("revoke");
    };

    /* =====================================================
        CERRAR MODAL
        ===================================================== */

    const handleCloseAction = () => {
        if (issueMutation.isPending || revokeMutation.isPending) {
        return;
        }

        setAction(null);
        setSelectedCredential(null);
        setActionError("");
    };

    /* =====================================================
        CREAR CREDENTIAL
        ===================================================== */

    const handleCreateSubmit = async (formData) => {
        await createMutation.mutateAsync({
        studentPublicId,
        data: formData,
        });

        setSelectedCredential(null);
        setView("list");
    };

    /* =====================================================
        ACTUALIZAR CREDENTIAL
        ===================================================== */

    const handleUpdateSubmit = async (formData) => {
        await updateMutation.mutateAsync({
        credentialPublicId: selectedCredential.publicId,
        data: formData,
        });

        setSelectedCredential(null);
        setView("list");
    };

    /* =====================================================
        CONFIRMAR ACCIÓN
        ===================================================== */

    const handleConfirmAction = async (data) => {
        if (!selectedCredential) {
        return;
        }

        setActionError("");

        try {
        if (action === "issue") {
            await issueMutation.mutateAsync(selectedCredential.publicId);
        }

        if (action === "revoke") {
            await revokeMutation.mutateAsync({
            credentialPublicId: selectedCredential.publicId,
            reason: data.reason,
            });
        }

        setAction(null);
        setSelectedCredential(null);
        setActionError("");
        setView("list");
        } catch (error) {
        const message =
            error?.response?.data?.message ||
            error?.response?.data?.error ||
            "No fue posible completar la operación.";

        setActionError(message);
        }
    };

    /* =====================================================
        ESTADOS DE CARGA
        ===================================================== */

    if (isLoading) {
        return (
        <div className="card border-0 shadow-sm">
            <div className="card-body py-5 text-center">
            <div
                className="spinner-border text-primary mb-3"
                role="status"
                aria-label="Cargando credenciales"
            />

            <p className="text-muted mb-0">Cargando grados y títulos...</p>
            </div>
        </div>
        );
    }

    /* =====================================================
        ERROR DE CONSULTA
        ===================================================== */

    if (isError) {
        return (
        <div className="alert alert-danger border-0 shadow-sm">
            <div className="d-flex align-items-start">
            <i className="bi bi-exclamation-circle me-2 mt-1"></i>

            <div>
                <strong>No fue posible cargar los grados y títulos.</strong>

                <div className="small mt-1">
                {error?.response?.data?.message ||
                    "Ocurrió un error al consultar la información académica."}
                </div>
            </div>
            </div>
        </div>
        );
    }

    /* =====================================================
        VISTA PRINCIPAL
        ===================================================== */

    return (
        <div className="card border-0 shadow-sm">
        <div className="card-body">
            {/* =================================================
                        HEADER
                    ================================================== */}

            {view === "list" && (
            <>
                <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h6 className="fw-bold mb-1">Grados y títulos</h6>

                    <p className="text-muted small mb-0">
                    Credenciales académicas oficiales del estudiante.
                    </p>
                </div>

                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleCreate}
                >
                    <i className="bi bi-plus-lg me-2"></i>
                    Nueva credencial
                </button>
                </div>

                <CredentialTable
                credentials={credentials}
                isLoading={isLoading}
                onView={handleView}
                onEdit={handleEdit}
                onIssue={handleIssue}
                onRevoke={handleRevoke}
                />
            </>
            )}

            {/* =================================================
                        CREAR
                    ================================================== */}

            {view === "create" && (
            <>
                <div className="mb-4">
                <button
                    type="button"
                    className="btn btn-link text-decoration-none px-0"
                    onClick={() => setView("list")}
                >
                    <i className="bi bi-arrow-left me-2"></i>
                    Volver a grados y títulos
                </button>

                <h6 className="fw-bold mb-1 mt-3">Nueva credencial académica</h6>

                <p className="text-muted small mb-0">
                    Registra un grado o título académico del estudiante.
                </p>
                </div>

                <CredentialForm
                mode="create"
                onSubmit={handleCreateSubmit}
                onCancel={() => setView("list")}
                isSubmitting={createMutation.isPending}
                />
            </>
            )}

            {/* =================================================
                        EDITAR
                    ================================================== */}

            {view === "edit" && selectedCredential && (
            <>
                <div className="mb-4">
                <button
                    type="button"
                    className="btn btn-link text-decoration-none px-0"
                    onClick={() => {
                    setSelectedCredential(null);
                    setView("list");
                    }}
                >
                    <i className="bi bi-arrow-left me-2"></i>
                    Volver a grados y títulos
                </button>

                <h6 className="fw-bold mb-1 mt-3">Editar credencial</h6>

                <p className="text-muted small mb-0">
                    Solo puedes modificar una credencial en estado borrador.
                </p>
                </div>

                <CredentialForm
                key={selectedCredential.publicId}
                mode="edit"
                credential={selectedCredential}
                onSubmit={handleUpdateSubmit}
                onCancel={() => {
                    setSelectedCredential(null);
                    setView("list");
                }}
                isSubmitting={updateMutation.isPending}
                />
            </>
            )}

            {/* =================================================
                        DETALLE
                    ================================================== */}

            {view === "detail" && selectedCredential && (
            <>
                <div className="mb-4">
                <button
                    type="button"
                    className="btn btn-link text-decoration-none px-0"
                    onClick={() => {
                    setSelectedCredential(null);
                    setView("list");
                    }}
                >
                    <i className="bi bi-arrow-left me-2"></i>
                    Volver a grados y títulos
                </button>
                </div>

                <CredentialDetailCard
                credential={selectedCredential}
                onEdit={
                    selectedCredential.status === "DRAFT"
                    ? () => handleEdit(selectedCredential)
                    : undefined
                }
                onIssue={
                    selectedCredential.status === "DRAFT"
                    ? () => handleIssue(selectedCredential)
                    : undefined
                }
                onRevoke={
                    selectedCredential.status === "ISSUED"
                    ? () => handleRevoke(selectedCredential)
                    : undefined
                }
                />
            </>
            )}
        </div>

        {/* =================================================
                    MODAL DE ACCIONES
                ================================================== */}

        {action && selectedCredential && (
            <CredentialActionModal
            action={action}
            credential={selectedCredential}
            error={actionError}
            isSubmitting={issueMutation.isPending || revokeMutation.isPending}
            onClose={handleCloseAction}
            onConfirm={handleConfirmAction}
            />
        )}
        </div>
    );
}
