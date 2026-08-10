import { Link } from "react-router-dom";
import TranscriptStatusBadge from "./TranscriptStatusBadge";

export default function TranscriptTable({ 
    transcripts, studentPublicId }) {
    
    if (transcripts.length === 0) {
        return (
        <div className="card border-0 shadow-sm rounded-4">
            <div className="card-body text-center py-5">
            <i
                className="bi bi-journal-x text-secondary"
                style={{ fontSize: "3rem" }}
            />

            <h5 className="mt-3">No existen historiales académicos</h5>

            <p className="text-muted mb-4">
                Cree el primer historial académico del estudiante para comenzar a
                registrar sus períodos.
            </p>

            <Link
                to={`/institution/students/${studentPublicId}/transcripts/create`}
                className="btn btn-primary"
            >
                <i className="bi bi-plus-lg me-2"></i>
                Crear historial académico
            </Link>
            </div>
        </div>
        );
    }

    return (
        <div className="card border-0 shadow-sm rounded-4">
        <div className="table-responsive">
            <table className="table align-middle mb-0">
            <thead className="table-light">
                <tr>
                <th>Período</th>
                <th>Estado</th>
                <th className="text-center">Cursos</th>
                <th className="text-center">Promedio</th>
                <th className="text-center">Créditos</th>
                <th className="text-center">Certificado</th>
                <th style={{ width: 140 }}></th>
                </tr>
            </thead>

            <tbody>
                {transcripts.map((transcript) => (
                <tr key={transcript.publicId}>
                    <td className="fw-semibold">{transcript.academicPeriod}</td>

                    <td>
                    <TranscriptStatusBadge status={transcript.status} />
                    </td>

                    <td className="text-center">{transcript.coursesCount}</td>

                    <td className="text-center fw-semibold">
                    {transcript.gpa ?? "-"}
                    </td>

                    <td className="text-center">{transcript.creditsEarned}</td>

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
                        className="btn btn-outline-primary btn-sm"
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
        </div>
    );
}
