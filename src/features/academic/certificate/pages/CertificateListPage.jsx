import { Link, useParams } from "react-router-dom";
import { useCertificates } from "../hooks/useCertificates";
import CertificateTable from "../components/CertificateTable";

export default function CertificateListPage() {
    
    const { studentPublicId } = useParams();

    const {
        data: certificates = [],
        isLoading,
        error,
    } = useCertificates(studentPublicId);

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
            No fue posible cargar los certificados.
        </div>
        );
    }

    return (
        <div className="container-fluid">
        <div className="card shadow-sm border-0 mb-4">
            <div className="card-body d-flex justify-content-between align-items-center">
            <div>
                <h2 className="fw-bold mb-1">Certificados</h2>

                <p className="text-muted mb-0">
                Certificados emitidos para este estudiante.
                </p>
            </div>

            <Link
                to={`/institution/students/${studentPublicId}`}
                className="btn btn-outline-secondary"
            >
                <i className="bi bi-arrow-left me-2"></i>
                Volver
            </Link>
            </div>
        </div>

        <CertificateTable certificates={certificates} />
        </div>
    );
}
