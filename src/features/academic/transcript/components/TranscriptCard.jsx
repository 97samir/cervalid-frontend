import { Link } from "react-router-dom";
import { useStudentTranscripts } from "../hooks/useStudentTranscripts";
import TranscriptStatusBadge from "./TranscriptStatusBadge";

export default function TranscriptCard({ studentPublicId }) {
    const {
        data: transcripts = [],
        isLoading,
        error,
    } = useStudentTranscripts(studentPublicId);

    if (isLoading) {
        return (
        <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body text-center py-5">
            <div className="spinner-border text-primary" />
            </div>
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
        <div className="card border-0 shadow-sm">
        <div className="card-body">
            {/* Header */}

            <div className="d-flex justify-content-between align-items-start mb-4">
            <div>
                <h5 className="fw-bold mb-1">
                <i className="bi bi-journal-bookmark me-2 text-primary"></i>
                Historial Académico
                </h5>

                <p className="text-muted mb-0">
                {transcripts.length} historial
                {transcripts.length !== 1 ? "es" : ""} registrado
                {transcripts.length !== 1 ? "s" : ""}.
                </p>
            </div>

            {transcripts.length > 0 && (
                <Link
                to={`/institution/students/${studentPublicId}/transcripts`}
                className="btn btn-outline-primary btn-sm"
                >
                Ver todos
                </Link>
            )}
            </div>

            {/* Estado vacío */}

            {transcripts.length === 0 && (
            <div className="text-center py-2">
                <i
                className="bi bi-journal-x text-secondary"
                style={{ fontSize: "2.5rem" }}
                ></i>

                <h6 className="mt-3">Aún no existe un historial académico</h6>

                <p className="text-muted mb-4">
                Cree uno para comenzar a registrar los
                períodos del estudiante.
                </p>

                <Link
                to={`/institution/students/${studentPublicId}/transcripts/create`}
                className="btn btn-primary"
                >
                <i className="bi bi-plus-lg me-2"></i>
                Crear historial académico
                </Link>
            </div>
            )}

            {/* Tabla */}

            {transcripts.length > 0 && (
            <div className="table-responsive">
                <table className="table align-middle mb-0">
                <thead className="table-light">
                    <tr>
                    <th>Período</th>
                    <th>Estado</th>
                    <th className="text-center">Cursos</th>
                    <th className="text-center">Promedio</th>
                    <th className="text-center">Certificado</th>
                    <th style={{ width: 120 }}></th>
                    </tr>
                </thead>

                <tbody>
                    {transcripts.slice(0, 3).map((transcript) => (
                    <tr key={transcript.publicId}>
                        <td className="fw-semibold">{transcript.academicPeriod}</td>

                        <td>
                        <TranscriptStatusBadge status={transcript.status} />
                        </td>

                        <td className="text-center">{transcript.coursesCount}</td>

                        <td className="text-center fw-semibold">
                        {transcript.gpa ?? "-"}
                        </td>

                        <td className="text-center">

                            {transcript.certificatePublicId ? (
                                <span className="badge bg-success-subtle text-success">
                                    <i className="bi bi-patch-check-fill me-1"></i>
                                    Emitido
                                </span>
                            ) : (
                                <span className="badge bg-secondary-subtle text-secondary">
                                    Pendiente
                                </span>
                            )}

                        </td>

                        <td className="text-end">
                            <Link
                                to={`/institution/transcripts/${transcript.publicId}`}
                                className="btn btn-outline-secondary btn-sm"
                            >
                                <i className="bi bi-eye me-1"></i>
                                Detalle
                            </Link>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
            )}
        </div>
        </div>
    );
}
