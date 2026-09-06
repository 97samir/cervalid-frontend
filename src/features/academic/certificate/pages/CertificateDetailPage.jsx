import { useState } from "react";
import { Link, useParams } from "react-router-dom";

import CertificateSummaryCard from "../components/CertificateSummaryCard";
import CertificateDocumentModal from "../components/CertificateDocumentModal";

import { useCertificate } from "../hooks/useCertificate";
import { useRevokeCertificate } from "../hooks/useRevokeCertificate";
import { useUpdateCertificateDocument } from "../hooks/useUpdateCertificateDocument";

export default function CertificateDetailPage() {

    const { certificatePublicId } = useParams();

    const [showDocumentModal, setShowDocumentModal] = useState(false);

    const {
        data: certificate,
        isLoading,
        error,
    } = useCertificate(certificatePublicId);

    const revokeMutation = useRevokeCertificate();

    const documentMutation = useUpdateCertificateDocument();

    if (isLoading) {
        return (
        <div className="text-center py-5">
            <div className="spinner-border text-primary" />
        </div>
        );
    }

    if (error) {
        return (
        <div className="alert alert-danger">
            No fue posible cargar el certificado.
        </div>
        );
    }

    const handleRevoke = () => {
        if (certificate.certificate.status === "REVOKED") {
        return alert("Este certificado ya fue revocado.");
        }

        if (!window.confirm("¿Desea revocar este certificado?")) {
        return;
        }

        revokeMutation.mutate(certificate.certificate.publicId);
    };

    const handleDocumentSubmit = (payload) => {
        documentMutation.mutate(
        {
            certificatePublicId,
            ...payload,
        },
        {
            onSuccess: () => {
            setShowDocumentModal(false);

            alert("El documento fue registrado correctamente.");
            },

            onError: (error) => {
            console.error("Error registrando documento:", error);

            alert("No fue posible registrar el documento.");
            },
        },
        );
    };

    return (
        <div className="container-fluid">
        <div className="mb-4">
            <div className="card-body d-flex justify-content-between align-items-center">
            <div />

            <Link to={-1} className="btn btn-outline-secondary">
                <i className="bi bi-arrow-left me-2"></i>
                Volver
            </Link>
            </div>
        </div>

        <CertificateSummaryCard
            certificate={certificate}
            onRevoke={handleRevoke}
            revoking={revokeMutation.isPending}
            onDocumentAction={() => setShowDocumentModal(true)}
        />

        <CertificateDocumentModal
            //key={certificate?.certificate?.publicId}
            show={showDocumentModal}
            onClose={() => setShowDocumentModal(false)}
            onSubmit={handleDocumentSubmit}
            submitting={documentMutation.isPending}
            certificate={certificate.certificate}
        />
        </div>
    );
}
