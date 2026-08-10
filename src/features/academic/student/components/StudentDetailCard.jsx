import StudentStatusBadge from "./StudentStatusBadge";
import { formatTranscriptDate } from "../../transcript/utils/transcriptDateUtils";
import { studentStatusLabels } from "@/shared/utils/enumUtils";

export default function StudentDetailCard({ student, onEdit }) {

    if (!student) return null;

    return (
        <div className="card border-0 shadow-sm mb-4">

            {/* HEADER */}
            <div className="card-header bg-white border-0 py-3">

                <div className="d-flex justify-content-between align-items-center">

                    <div>
                    <h5 className="fw-bold mb-1">
                        <i className="bi bi-mortarboard-fill me-2 text-primary"></i>
                        Identidad Académica
                    </h5>

                    <small className="text-muted">
                        Información institucional del estudiante
                    </small>
                </div>

                <button 
                    type="button" 
                    className="btn btn-outline-warning btn-md" 
                    onClick={() => onEdit?.(student)} 
                > 
                    <i className="bi bi-pencil me-1"></i> 
                    Editar 
                </button>

                </div>
                
            </div>

            {/* BODY */}
            <div className="card-body">
                <div className="row g-4">

                    {/* Columna izquierda */}
                    <div className="col-lg-6">

                        <div className="mb-4">
                            <small className="text-muted d-block">
                                Nombre completo
                            </small>

                            {/* <div className="fw-semibold fs-5"> */}
                            <div className="fw-semibold">
                                <i className="bi bi-person-fill me-2 text-primary"></i>
                                {student.fullName}
                            </div>
                        </div>


                        <div className="mb-4">
                            <small className="text-muted d-block">
                                Código de estudiante
                            </small>

                            <div className="fw-semibold">
                                <i className="bi bi-upc-scan me-2 text-primary"></i>
                                {student.studentCode}
                            </div>
                    
                        </div>

                        <div className="mb-4">
                            <small className="text-muted d-block">
                                Estado académico
                            </small>

                            <div className="mt-0">
                                {/* <StudentStatusBadge status={student.status} /> */}
                                <StudentStatusBadge status={studentStatusLabels[student.status] ?? "-"}
                                />
                                {/* {modalityLabels[profile.modality] ?? "-"} */}
                            </div>
                        </div>

                        <div>
                            <small className="text-muted d-block">
                                Correo electrónico
                            </small>

                            <div className="fw-semibold">
                                <i className="bi bi-envelope me-2 text-primary"></i>
                                {student.email || "-"}
                            </div>
                        </div>

                    </div>

                    {/* Columna derecha */}
                    <div className="col-lg-6">

                        <div className="mb-4">
                            <small className="text-muted d-block">
                                Documento de identidad
                            </small>

                            <div className="fw-semibold">
                                <i className="bi bi-person-vcard me-2 text-primary"></i>
                                {student.document || "-"}
                            </div>
                        </div>

                        <div className="mb-4">
                            <small className="text-muted d-block">
                                Teléfono
                            </small>

                            <div className="fw-semibold">
                                <i className="bi bi-telephone me-2 text-primary"></i>
                                {student.phone || "-"}
                            </div>
                        </div>

                        <div className="mb-4">
                            <small className="text-muted d-block">
                                Fecha de ingreso
                            </small>

                            <div className="fw-semibold">
                                <i className="bi bi-calendar-check me-2 text-primary"></i>
                                {formatTranscriptDate(student.admissionDate)}
                            </div>
                        </div>

                        <div>
                            <small className="text-muted d-block">
                                Fecha de graduación
                            </small>

                            <div className="fw-semibold">
                                <i className="bi bi-award me-2 text-primary"></i>
                                {student.graduationDate
                                ? formatTranscriptDate(student.graduationDate)
                                : "En formación"}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
