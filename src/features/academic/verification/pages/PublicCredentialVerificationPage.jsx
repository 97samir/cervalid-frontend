import { Link, useParams } from "react-router-dom";

import VerificationResultCard from "../components/VerificationResultCard";
import { usePublicCredentialVerification } from "../hooks/usePublicCredentialVerification";
import { normalizeVerificationResult } from "../mapper/verificationMapper";

export default function PublicCredentialVerificationPage() {

    
    const { credentialPublicId } = useParams();
    const { data, isLoading, isError, error } =
        usePublicCredentialVerification(credentialPublicId);

    const normalizedData = normalizeVerificationResult(data);

    if (isLoading) {
        return (
        <div className="verification-page">
            <div className="container">
            <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Cargando...</span>
                </div>

                <p className="text-muted mt-3 mb-0">
                Consultando la credencial académica...
                </p>
            </div>
            </div>
        </div>
        );
    }

    if (isError) {
        return (
        <div className="verification-page">
            <div className="container">
            <div className="verification-hero">
                <div className="verification-hero-icon text-danger">
                <i className="bi bi-exclamation-circle" />
                </div>

                <h1 className="verification-hero-title">
                No se pudo consultar la credencial
                </h1>

                <p className="verification-hero-description">
                Ocurrió un problema al consultar la información de la credencial
                académica.
                </p>

                {error?.response?.data?.message && (
                <p className="text-muted">{error.response.data.message}</p>
                )}

                <Link to="/verify/credential" className="btn btn-primary mt-3">
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
                Credencial no encontrada
                </h1>

                <p className="verification-hero-description">
                No se encontró información asociada a la credencial solicitada.
                </p>

                <Link to="/verify/credential" className="btn btn-primary mt-3">
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
            {/* <div className="verification-hero">
                <div className="verification-hero-icon text-success">
                    <i className="bi bi-shield-check" />
                </div>

                <h1 className="verification-hero-title">
                    Verificación de credencial académica
                </h1>

                <p className="verification-hero-description">
                    Resultado de la consulta de autenticidad de la credencial académica.
                </p>
            </div> */}

            <VerificationResultCard result={normalizedData} />

            <footer className="text-center mt-4 pb-4">
                <p className="text-muted small mb-0">
                Verificación proporcionada por CERVALID.
                </p>
            </footer>

            {/* <div className="text-center mt-4">
            <Link to="/verify/credential" className="btn btn-outline-primary">
                <i className="bi bi-search me-2" />
                Verificar otra credencial
            </Link>
            </div> */}
        </div>
        </div>
    );
}
