import { Link, useParams } from "react-router-dom";

import { useStudentCredentials } from "../hooks/useStudentCredentials";

import CredentialTable from "../components/CredentialTable";

export default function CredentialListPage() {
    const { studentPublicId } = useParams();

    const {
        data: credentials = [],
        isLoading,
        error,
    } = useStudentCredentials(studentPublicId);

    if (isLoading) {
        return (
        <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando credenciales...</span>
            </div>
        </div>
        );
    }

    if (error) {
        return (
        <div className="alert alert-danger border-0 shadow-sm">
            No fue posible cargar las credenciales académicas.
        </div>
        );
    }

    return (
        <div className="container-fluid">
        {/* HEADER */}

        <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
            <h4 className="fw-bold mb-1">
                <i className="bi bi-mortarboard-fill text-primary me-2"></i>
                Grados y títulos
            </h4>

            <p className="text-muted mb-0">
                Gestiona las credenciales académicas registradas para este
                estudiante.
            </p>
            </div>

            <div className="d-flex gap-2">
            <Link
                to={`/institution/students/${studentPublicId}`}
                className="btn btn-outline-secondary"
            >
                <i className="bi bi-arrow-left me-2"></i>
                Volver al estudiante
            </Link>

            <Link
                to={`/institution/students/${studentPublicId}/credentials/create`}
                className="btn btn-primary"
            >
                <i className="bi bi-plus-lg me-2"></i>
                Nueva credencial
            </Link>
            </div>
        </div>

        {/* TABLE */}

        <CredentialTable credentials={credentials} />
        </div>
    );
}
