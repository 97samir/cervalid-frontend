import { Link } from "react-router-dom";
import StudentStatusBadge from "./StudentStatusBadge";
import { studentStatusLabels } from "@/shared/utils/enumUtils";

export default function StudentTable({ 
    students, 
    onDelete,
    onEdit 
}) {

    return (

        <div className="card border-0 shadow-sm">
            <div className="card-body p-0">
                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="table-light">
                        <tr>
                            <th className="text-nowrap py-3">Código</th>
                            <th className="text-nowrap py-3">Estudiante</th>
                            <th className="text-nowrap py-3">Correo electrónico</th>
                            <th className="text-nowrap py-3">Estado</th>
                            {/* <th className="text-nowrap py-3">Institución</th> */}
                            <th className="text-nowrap py-3" style={{ minWidth: "240px" }}>
                            Acciones
                            </th>
                        </tr>
                        </thead>

                        <tbody>
                            {students?.length > 0 ? (
                            students.map((student) => (
                                <tr key={student.publicId}>

                                    <td className="fw-semibold text-nowrap py-3">
                                        {student.studentCode}
                                    </td>

                                    <td className="text-nowrap py-3">
                                        {student.fullName}
                                    </td>

                                    <td className="text-nowrap py-3">
                                        {/* {student.admissionDate} */}
                                        {student.email}
                                    </td>

                                    <td className="text-nowrap py-3">
                                        {/* {student.graduationDate || "-"} */}
                                        <StudentStatusBadge status={studentStatusLabels[student.status] ?? "-"} />
                                    </td>

                                    {/* <td className="text-nowrap py-3">{student.institutionId}</td> */}

                                    <td className="py-3">
                                        <div className="d-flex flex-wrap gap-2">
                                            <Link
                                                to={`/institution/students/${student.publicId}`}
                                                className="btn btn-sm btn-outline-primary"
                                            >   
                                                <i className="bi bi-eye me-1"></i>
                                                Ver
                                            </Link>

                                            {/* <Link
                                                to={`/institution/students/${student.publicId}/edit`}
                                                className="btn btn-sm btn-outline-warning"
                                            >
                                                Editar
                                            </Link> */}

                                            {/* <button
                                                type="button"
                                                className="btn btn-sm btn-outline-warning"
                                                onClick={() =>
                                                    onEdit?.(student)
                                                }
                                            >
                                                    <i className="bi bi-pencil me-1"></i>
                                                Editar
                                            </button> */}

                                            <button
                                                className="btn btn-sm btn-outline-danger"
                                                onClick={() => onDelete(student.publicId)}
                                            >   
                                                <i className="bi bi-person-x me-1"></i>
                                                Desactivar
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (

                            <tr>
                                <td colSpan="5" className="text-center text-muted py-5">
                                    <i className="bi bi-people fs-3 d-block mb-2"></i>
                                        No se encontraron estudiantes.
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
