import { useParams, Link } from "react-router-dom";
import VerificationResultCard from "../components/VerificationResultCard";
import { useVerifyPublicCertificate } from "../hooks/useVerifyPublicCertificate";
import "../styles/verification.css";

export default function PublicCertificateVerificationPage() {

    const { certificatePublicId } = useParams();
    const { data, error, isLoading } =
        useVerifyPublicCertificate(certificatePublicId);

    if (isLoading) {
        return (
        <div className="verification-page container py-5">
            <div className="verification-loading">
            <div
                className="spinner-border text-primary mb-3"
                role="status"
                aria-hidden="true"
            />

            <h5 className="fw-semibold mb-2">Verificando certificado</h5>

            <p className="text-muted mb-0">
                Estamos validando la información del certificado...
            </p>
            </div>
        </div>
        );
    }

    if (error) {
        return (
        <div className="verification-page container py-5">
            <div className="verification-error card border-0 shadow-sm">
            <div className="card-body text-center p-5">
                <div className="verification-error-icon mb-3">
                <i className="bi bi-exclamation-circle-fill"></i>
                </div>

                <h4 className="fw-bold mb-2">
                No se pudo verificar el certificado
                </h4>

                <p className="text-muted mb-4">
                Ocurrió un problema al consultar la información del certificado.
                Verifica que el enlace sea correcto e inténtalo nuevamente.
                </p>

                <Link to="/" className="btn btn-outline-primary">
                <i className="bi bi-house me-2"></i>
                Volver al inicio
                </Link>
            </div>
            </div>
        </div>
        );
    }

    if (!data) {
        return (
        <div className="verification-page container py-5">
            <div className="verification-empty card border-0 shadow-sm">
            <div className="card-body">
                <i className="bi bi-search"></i>

                <h4 className="fw-bold">Certificado no encontrado</h4>

                <p className="text-muted">
                No encontramos información asociada al certificado solicitado.
                </p>
            </div>
            </div>
        </div>
        );
    }

    return (
        <main className="verification-page container py-0">

            {/* RESULTADO */}

            <div className="verification-result-wrapper">
                <VerificationResultCard result={data} />
            </div>

            {/* FOOTER */}

            <footer className="text-center mt-4 pb-4">
                <p className="text-muted small mb-0">
                Verificación proporcionada por Cervalid.
                </p>
            </footer>
        </main>
    );
}
