import { Link, useParams } from "react-router-dom";

import CertificateSummaryCard from "../components/CertificateSummaryCard";

import { useCertificate } from "../hooks/useCertificate";
import { useRevokeCertificate } from "../hooks/useRevokeCertificate";

export default function CertificateDetailPage() {

    const { certificatePublicId } = useParams();

    const {
        data: certificate,
        isLoading,
        error,
    } = useCertificate(certificatePublicId);

    const revokeMutation = useRevokeCertificate();

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

    return (
        <div className="container-fluid">
            {/* <div className="card shadow-sm border-0 mb-4"></div> */}
            <div className="mb-4">
                <div className="card-body d-flex justify-content-between align-items-center">
                    <div>
                        {/* <h2 className="fw-bold">Certificado Académico</h2>

                        <p className="text-muted mb-0">
                        Información completa del certificado.
                        </p> */}
                    </div>

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
            />
        </div>
    );
}
