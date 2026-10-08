import { Link, useParams } from "react-router-dom";

import { useStudentTranscripts } from "../hooks/useStudentTranscripts";
import TranscriptTable from "../components/TranscriptTable";

export default function TranscriptListPage() {
    const { studentPublicId } = useParams();

    const {
        data: transcripts = [],
        isLoading,
        error,
    } = useStudentTranscripts(studentPublicId);

    if (isLoading) {
        return (
        <div className="d-flex justify-content-center py-5">
            <div
            className="spinner-border text-primary"
            role="status"
            aria-label="Cargando historiales académicos"
            />
        </div>
        );
    }

    if (error) {
        return (
        <div className="alert alert-danger" role="alert">
            <div className="d-flex align-items-start gap-2">
            <i className="bi bi-exclamation-circle fs-5"></i>

            <div>
                <div className="fw-semibold">
                No fue posible cargar los historiales académicos.
                </div>

                <div className="small mt-1">
                Inténtalo nuevamente o vuelve a la página anterior.
                </div>
            </div>
            </div>
        </div>
        );
    }

    return (
        <div className="container-fluid">
        {/* HEADER */}

        <div className="card border-0 shadow-sm rounded-4 mb-4">
            <div className="card-body p-4">
            <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3">
                {/* INFORMACIÓN */}

                <div>
                <div className="d-flex align-items-center gap-2 mb-1">
                    <div
                    className="
                                            rounded-circle
                                            bg-primary-subtle
                                            text-primary
                                            d-flex
                                            align-items-center
                                            justify-content-center
                                            flex-shrink-0
                                        "
                    style={{
                        width: "42px",
                        height: "42px",
                    }}
                    >
                    <i className="bi bi-journal-bookmark"></i>
                    </div>

                    <h2 className="fw-bold mb-0">Historial Académico</h2>
                </div>

                <p className="text-muted mb-0 ms-lg-5">
                    {transcripts.length} historial
                    {transcripts.length !== 1 ? "es" : ""} registrado
                    {transcripts.length !== 1 ? "s" : ""}.
                </p>
                </div>

                {/* ACCIONES */}

                <div className="d-flex flex-column flex-sm-row gap-2">
                <Link to={-1} className="btn btn-outline-secondary">
                    <i className="bi bi-arrow-left me-2"></i>
                    Volver
                </Link>

                <Link
                    to={`/institution/students/${studentPublicId}/transcripts/create`}
                    className="btn btn-primary"
                >
                    <i className="bi bi-plus-lg me-2"></i>
                    Nuevo historial
                </Link>
                </div>
            </div>
            </div>
        </div>

        {/* TABLA */}

        <TranscriptTable
            transcripts={transcripts}
            studentPublicId={studentPublicId}
        />
        </div>
    );
}
