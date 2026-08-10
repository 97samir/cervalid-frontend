import { Link, useParams } from "react-router-dom";
import { useStudentCompetencies } from "../hooks/useStudentCompetencies";
import CompetencyStatusBadge from "../components/CompetencyStatusBadge";
import CompetencyLevelBadge from "../components/CompetencyLevelBadge";

export default function CompetencyListPage() {
    
    const { studentPublicId } = useParams();

    const {
        data: competencies = [],
        isLoading,
        error,
    } = useStudentCompetencies(studentPublicId);

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
            No fue posible cargar las competencias.
        </div>
        );
    }

    return (
        <div className="container-fluid">
        {/* HEADER */}

        <div className="card shadow-sm border-0 rounded-4 mb-4">
            <div className="card-body d-flex justify-content-between align-items-center">
            <div>
                <h2 className="fw-bold mb-1">
                <i className="bi bi-lightbulb me-2 text-primary"></i>
                Competencias
                </h2>

                <p className="text-muted mb-0">
                {competencies.length} competencia
                {competencies.length !== 1 && "s"}
                </p>
            </div>

            <Link
                className="btn btn-primary"
                to={`/institution/students/${studentPublicId}/competencies/create`}
            >
                <i className="bi bi-plus-lg me-2" />
                Nueva competencia
            </Link>
            </div>
        </div>

        {/* TABLA */}

        <div className="card shadow-sm border-0 rounded-4">
            {competencies.length === 0 ? (
            <div className="card-body text-center py-5">
                <i
                className="bi bi-lightbulb text-secondary"
                style={{ fontSize: "3rem" }}
                />

                <h5 className="mt-3">No existen competencias registradas</h5>

                <p className="text-muted mb-4">
                Registre la primera competencia del estudiante.
                </p>

                <Link
                className="btn btn-primary"
                to={`/institution/students/${studentPublicId}/competencies/create`}
                >
                Crear competencia
                </Link>
            </div>
            ) : (
            <div className="table-responsive">
                <table className="table align-middle mb-0">
                <thead className="table-light">
                    <tr>
                    <th>Competencia</th>
                    <th>Nivel</th>
                    <th>Estado</th>
                    <th>Origen</th>
                    <th>Adquirida</th>
                    <th style={{ width: 140 }} />
                    </tr>
                </thead>

                <tbody>
                    {competencies.map((c) => (
                    <tr key={c.publicId}>
                        <td className="fw-semibold">{c.name}</td>

                        <td>
                        <CompetencyLevelBadge level={c.level} />
                        </td>

                        <td>
                        <CompetencyStatusBadge status={c.status} />
                        </td>

                        <td>{c.source}</td>

                        <td>{c.acquiredDate ?? "-"}</td>

                        <td className="text-end">
                        <Link
                            className="btn btn-outline-primary btn-sm"
                            to={`/institution/competencies/${c.publicId}`}
                        >
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
