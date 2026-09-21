import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

import { useCredential } from "../hooks/useCredential";
import { useIssueCredential } from "../hooks/useIssueCredential";
import { useRevokeCredential } from "../hooks/useRevokeCredential";
import { useUpdateCredential } from "../hooks/useUpdateCredential";
import { useUpdateCredentialDocument } from "../hooks/useUpdateCredentialDocument";

import CredentialSummaryCard from "../components/CredentialSummaryCard";
import CredentialActionModal from "../components/CredentialActionModal";
import CredentialEditModal from "../components/CredentialEditModal";
import CredentialDocumentModal from "../components/CredentialDocumentModal";

export default function CredentialDetailPage() {
    const { credentialPublicId } = useParams();
    const navigate = useNavigate();

    const [action, setAction] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDocumentModal, setShowDocumentModal] = useState(false);
    const [documentModalKey, setDocumentModalKey] = useState(0);

    const {
        data: credential,
        isLoading,
        error,
    } = useCredential(credentialPublicId);

    const issueMutation = useIssueCredential();
    const revokeMutation = useRevokeCredential();
    const updateMutation = useUpdateCredential();
    const documentMutation = useUpdateCredentialDocument();

    if (isLoading) {
        return (
        <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando credencial...</span>
            </div>
        </div>
        );
    }

    if (error) {
        return (
        <div className="alert alert-danger border-0 shadow-sm">
            <i className="bi bi-exclamation-triangle me-2"></i>
            No fue posible cargar la credencial académica.
        </div>
        );
    }

    if (!credential) {
        return (
        <div className="alert alert-warning border-0 shadow-sm">
            <i className="bi bi-info-circle me-2"></i>
            No se encontró la credencial académica.
        </div>
        );
    }

    const handleBack = () => {
        navigate(-1);
    };

    const handleIssue = () => {
        setAction("issue");
    };

    const handleRevoke = () => {
        setAction("revoke");
    };

    const handleDocument = () => {
        /*
        * Al cambiar la key, React crea una nueva instancia
        * del modal con los datos actuales de la credencial.
        *
        * Esto evita necesitar un useEffect para copiar props
        * hacia estados internos.
        */
        setDocumentModalKey((current) => current + 1);
        setShowDocumentModal(true);
    };

    const handleConfirmAction = (payload) => {
        if (action === "issue") {
        issueMutation.mutate(credential.publicId, {
            onSuccess: () => {
            setAction(null);
            },
        });

        return;
        }

        if (action === "revoke") {
        revokeMutation.mutate(
            {
            credentialPublicId: credential.publicId,
            ...payload,
            },
            {
            onSuccess: () => {
                setAction(null);
            },
            },
        );
        }
    };

    const handleUpdate = (payload) => {
        updateMutation.mutate(
        {
            credentialPublicId: credential.publicId,
            ...payload,
        },
        {
            onSuccess: () => {
            setShowEditModal(false);
            },
            onError: (error) => {
            console.error("Error actualizando credencial:", error);

            alert("No fue posible actualizar la credencial.");
            },
        },
        );
    };

    const handleUpdateDocument = (payload) => {
        documentMutation.mutate(
        {
            credentialPublicId: credential.publicId,
            ...payload,
        },
        {
            onSuccess: () => {
            setShowDocumentModal(false);
            },
            onError: (error) => {
            console.error("Error actualizando documento:", error);

            alert("No fue posible actualizar el documento.");
            },
        },
        );
    };

    const isProcessing =
        issueMutation.isPending ||
        revokeMutation.isPending ||
        updateMutation.isPending ||
        documentMutation.isPending;

    return (
        <div className="container-fluid">
        {/* =====================================================
                    HEADER
                ===================================================== */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 mb-4">
            <div>
            <h4 className="fw-bold mb-1">Detalle de credencial</h4>

            <p className="text-muted mb-0">
                Información completa de la credencial académica.
            </p>
            </div>

            <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={handleBack}
            >
            <i className="bi bi-arrow-left me-2"></i>
            Volver
            </button>
        </div>

        {/* =====================================================
                    SUMMARY
                ===================================================== */}
        <CredentialSummaryCard
            credential={credential}
            onEdit={() => setShowEditModal(true)}
            onDocument={handleDocument}
            onIssue={handleIssue}
            onRevoke={handleRevoke}
            processing={isProcessing}
            issuing={issueMutation.isPending}
            revoking={revokeMutation.isPending}
        />

        {/* =====================================================
                    ACTION MODAL
                ===================================================== */}
        <CredentialActionModal
            action={action}
            credential={credential}
            isProcessing={issueMutation.isPending || revokeMutation.isPending}
            onConfirm={handleConfirmAction}
            onCancel={() => setAction(null)}
        />

        {/* =====================================================
                    EDIT MODAL
                ===================================================== */}
        {showEditModal && (
            <CredentialEditModal
            key={credential.publicId}
            credential={credential}
            onClose={() => setShowEditModal(false)}
            onSubmit={handleUpdate}
            submitting={updateMutation.isPending}
            />
        )}

        {/* =====================================================
                    DOCUMENT MODAL
                ===================================================== */}
        <CredentialDocumentModal
            key={documentModalKey}
            show={showDocumentModal}
            credential={credential}
            submitting={documentMutation.isPending}
            onClose={() => setShowDocumentModal(false)}
            onSubmit={handleUpdateDocument}
        />
        </div>
    );
}
