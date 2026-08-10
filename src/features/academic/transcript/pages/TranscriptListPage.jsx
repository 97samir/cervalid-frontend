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
                <div className="spinner-border text-primary" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="alert alert-danger">
                No fue posible cargar los historiales académicos.
            </div>
        );
    }

    return (
        <div className="container-fluid">

            <div className="card border-0 shadow-sm rounded-4 mb-4">

                <div className="card-body d-flex justify-content-between align-items-center">

                    <div>
                        <h2 className="fw-bold mb-1">
                            <i className="bi bi-journal-bookmark me-2 text-primary"></i>
                            Historial Académico
                        </h2>

                        <p className="text-muted mb-0">
                            {transcripts.length} historial
                            {transcripts.length !== 1 ? "es" : ""} registrado
                            {transcripts.length !== 1 ? "s" : ""}.
                        </p>
                    </div>

                    <Link
                        to={`/institution/students/${studentPublicId}/transcripts/create`}
                        className="btn btn-primary"
                    >
                        <i className="bi bi-plus-lg me-2"></i>
                        Nuevo historial
                    </Link>

                </div>

            </div>

            <TranscriptTable
                transcripts={transcripts}
                studentPublicId={studentPublicId}
            />

        </div>
    );
}