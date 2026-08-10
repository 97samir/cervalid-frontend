//import { Link } from "react-router-dom";

export default function TranscriptItemsTable({ 
    transcript,
    onCreate,
    onEdit,
    onDelete }) {

    const items = transcript?.items ?? [];

    return (
        <div className="card shadow-sm border-0 mt-4">
        <div className="card-header bg-white">
            <div className="d-flex justify-content-between align-items-center">
            <div>
                <h5 className="mb-1">Cursos registrados</h5>

                <small className="text-muted">
                Cursos pertenecientes a este historial académico.
                </small>
            </div>

                <button
                    className="btn btn-primary btn-sm"
                    onClick={onCreate}
                >
                    <i className="bi bi-plus-lg me-2"></i>
                    Agregar curso
                </button>
            </div>
        </div>

        <div className="card-body p-0">
            {items.length === 0 ? (
            <div className="text-center py-5">
                <i
                className="bi bi-journal-x text-secondary"
                style={{ fontSize: "3rem" }}
                />

                <h6 className="mt-3">No existen cursos registrados</h6>

                <p className="text-muted mb-0">
                Agregue el primer curso para comenzar a construir el historial
                académico.
                </p>
            </div>
            ) : (
            <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                    <thead className="table-light">
                        <tr>
                            <th>Código</th>
                            <th>Curso</th>
                            <th>Créditos</th>
                            <th>Nota</th>
                            <th style={{ width: 180 }}>Acciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {items.map((item) => (
                        <tr key={item.publicId}>
                            <td className="fw-semibold">{item.courseCode}</td>

                            <td>{item.courseName}</td>

                            <td>{item.credits}</td>

                            <td>
                            <span
                                className={`badge ${
                                item.grade >= 11 ? "bg-success" : "bg-danger"
                                }`}
                            >
                                {item.grade}
                            </span>
                            </td>

                            <td>
                            <div className="d-flex gap-2">
                                <button
                                    className="btn btn-outline-warning btn-sm"
                                    onClick={() => onEdit(item)}
                                >
                                    Editar
                                </button>

                                <button
                                    className="btn btn-outline-danger btn-sm"
                                    onClick={() => onDelete(item.publicId)}
                                >
                                    Eliminar
                                </button>
                            </div>
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
