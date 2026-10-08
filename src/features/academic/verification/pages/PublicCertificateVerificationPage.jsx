import { Link, useParams } from "react-router-dom";

import VerificationResultCard from "../components/VerificationResultCard";
import { usePublicCertificateVerification } from "../hooks/usePublicCertificateVerification";
import { normalizeVerificationResult } from "../mapper/verificationMapper";

export default function PublicCertificateVerificationPage() {
    const { certificatePublicId } = useParams();

    const { data, error, isLoading } =
        usePublicCertificateVerification(certificatePublicId);

    const normalizedData = normalizeVerificationResult(data);

    if (isLoading) {
        return (
            <div className="verification-page">
                <div className="container">
                    <div className="text-center py-5">
                        <div
                            className="spinner-border text-primary"
                            role="status"
                        >
                            <span className="visually-hidden">
                                Cargando...
                            </span>
                        </div>

                        <p className="text-muted mt-3 mb-0">
                            Verificando certificado...
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="verification-page">
                <div className="container">
                    <div className="verification-hero">
                        <div className="verification-hero-icon text-danger">
                            <i className="bi bi-exclamation-circle" />
                        </div>

                        <h1 className="verification-hero-title">
                            No se pudo verificar el certificado
                        </h1>

                        <p className="verification-hero-description">
                            Ocurrió un problema al consultar la información
                            del certificado académico.
                        </p>

                        {error?.response?.data?.message && (
                            <p className="text-muted">
                                {error.response.data.message}
                            </p>
                        )}

                        <Link
                            to="/verify"
                            className="btn btn-primary mt-3"
                        >
                            <i className="bi bi-arrow-left me-2" />
                            Volver a verificar
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="verification-page">
                <div className="container">
                    <div className="verification-hero">
                        <div className="verification-hero-icon">
                            <i className="bi bi-search" />
                        </div>

                        <h1 className="verification-hero-title">
                            Certificado no encontrado
                        </h1>

                        <p className="verification-hero-description">
                            No se encontró información asociada al certificado
                            solicitado.
                        </p>

                        <Link
                            to="/verify"
                            className="btn btn-primary mt-3"
                        >
                            <i className="bi bi-arrow-left me-2" />
                            Nueva verificación
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="verification-page">
            <div className="container">
                <VerificationResultCard result={normalizedData} />

                <footer className="text-center mt-4 pb-4">
                    <p className="text-muted small mb-0">
                        Verificación proporcionada por CERVALID.
                    </p>
                </footer>
            </div>
        </div>
    );
}

