import { Link, useParams } from "react-router-dom";
import { useVerificationHistory } from "../hooks/useVerificationHistory";
import VerificationHistoryTable from "../components/VerificationHistoryTable";

export default function CertificateVerificationHistoryPage() {

    const { certificatePublicId } = useParams();

    const {
        data = [],
        isLoading,
        error,
    } = useVerificationHistory(certificatePublicId);

    if (isLoading) {
        return (
        <div className="container-fluid">
            <div className="text-center py-5">
            <div className="spinner-border" />
            </div>
        </div>
        );
    }

    if (error) {
        return (
        <div className="container-fluid">
            <div className="alert alert-danger">
            No se pudo cargar el historial del certificado.
            </div>
        </div>
        );
    }

    return (
        <div className="container-fluid">
        <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
            <h2 className="fw-bold mb-1">Historial del certificado</h2>

            <p className="text-muted mb-0">
                Registro completo de todas las verificaciones realizadas sobre este
                certificado.
            </p>
            </div>

            <Link
            className="btn btn-outline-secondary"
            to="/institution/verification/history"
            >
            <i className="bi bi-arrow-left me-2" />
            Volver
            </Link>
        </div>

        <VerificationHistoryTable records={data} />
        
        </div>
    );
}
