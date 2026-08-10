import { Link } from "react-router-dom";
import TranscriptStatusBadge from "./TranscriptStatusBadge";
import TranscriptStatistics from "./TranscriptStatistics";
import TranscriptBlockchainCard from "./TranscriptBlockchainCard";
import { formatTranscriptDate } from "../utils/transcriptDateUtils";

export default function TranscriptSummaryCard({
    transcript,
    onFinalize,
    onIssue,
    finalizing = false,
    issuing = false,
    }) {
    if (!transcript) return null;

    return (
        <div className="card shadow-sm border-0 mb-4">
        {/* HEADER */}

        <div className="card-header bg-white">
            <div className="d-flex justify-content-between align-items-center">
                <div>
                    <h5 className="fw-bold mb-1">
                    <i className="bi bi-journal-bookmark me-2 text-primary"></i>
                    Historial Académico
                    </h5>

                    <div className="text-muted small mb-2">
                    Período académico: <strong>{transcript.academicPeriod}</strong>
                    </div>

                    <TranscriptStatusBadge status={transcript.status} />
                    {/* INFORMATIVO */}
                    {transcript.certificatePublicId && (
                        <div className="text-success small mt-2">
                            <i className="bi bi-check-circle-fill me-1"></i>
                            Certificado emitido
                        </div>
                    )}

                </div>

                <div>
                    {transcript.status === "DRAFT" && (
                    <button
                        className="btn btn-outline-success"
                        onClick={onFinalize}
                        disabled={finalizing}
                    >
                        {finalizing ? (
                        <>
                            <span className="spinner-border spinner-border-sm me-2" />
                            Finalizando...
                        </>
                        ) : (
                        <>
                            <i className="bi bi-check-circle me-2"></i>
                            Finalizar
                        </>
                        )}
                    </button>
                    )}

                    {transcript.status === "FINALIZED" &&
                        !transcript.certificatePublicId && (
                            <button
                                className="btn btn-success"
                                onClick={onIssue}
                                disabled={issuing}
                            >
                                {issuing ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2" />
                                        Emitiendo certificado...
                                    </>
                                ) : (
                                    <>
                                        <i className="bi bi-patch-check me-2"></i>
                                        Emitir certificado
                                    </>
                                )}
                            </button>
                        )}
                </div>
            </div>
        </div>

        {/* ESTADO DE TRANSCRIPT PARA CERTIFICADO */}
        {transcript.certificatePublicId && (
            <Link
                to={`/institution/certificates/${transcript.certificatePublicId}`}
                className="btn btn-outline-success"
            >
                <i className="bi bi-patch-check-fill me-2"></i>
                Ver certificado
            </Link>
        )}

        {/* BODY */}

        <div className="card-body">
            <div className="row g-4">
            {/* INFORMACIÓN ACADÉMICA */}

            <div className="col-lg-8">
                <div className="mb-4">
                <h6 className="fw-bold mb-3">
                    <i className="bi bi-bar-chart me-2 text-primary"></i>
                    Resumen académico
                </h6>

                <TranscriptStatistics transcript={transcript} />
                </div>

                <hr />

                <div>
                <small className="text-muted d-block mb-1">
                    <i className="bi bi-calendar-event me-2"></i>
                    Fecha de emisión
                </small>

                <span className="fw-semibold">
                    {formatTranscriptDate(transcript.issuedAt)}
                </span>
                </div>
            </div>

            {/* BLOCKCHAIN */}

            <div className="col-lg-4">
                <h6 className="fw-bold mb-3">
                <i className="bi bi-link-45deg me-2 text-primary"></i>
                Integridad del documento
                </h6>

                <TranscriptBlockchainCard transcript={transcript} />
            </div>
            </div>
        </div>
        </div>
    );
}
