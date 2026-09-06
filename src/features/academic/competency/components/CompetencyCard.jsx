import { Link } from "react-router-dom";
import { useStudentCompetencies } from "../hooks/useStudentCompetencies";
import CompetencyStatusBadge from "./CompetencyStatusBadge";
import CompetencyLevelBadge from "./CompetencyLevelBadge";
//import CompetencySourceBadge from "./CompetencySourceBadge";

export default function CompetencyCard({ studentPublicId }) {
    
    const {
        data: competencies = [],
        isLoading,
        error,
    } = useStudentCompetencies(studentPublicId);

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
            No fue posible cargar las competencias.
        </div>
        );
    }

    return (
        <div className="card border-0 shadow-sm rounded-4">
        <div className="card-body">
            {/* HEADER */}

            <div className="d-flex justify-content-between align-items-start mb-4">
            <div>
                <h5 className="fw-bold mb-1">
                <i className="bi bi-award me-2 text-primary"></i>
                Competencias
                </h5>

                <p className="text-muted mb-0">
                {competencies.length} competencia
                {competencies.length !== 1 ? "s" : ""} registrada
                {competencies.length !== 1 ? "s" : ""}.
                </p>
            </div>

            {competencies.length > 0 && (
                <Link
                to={`/institution/students/${studentPublicId}/competencies`}
                className="btn btn-outline-primary btn-sm"
                >
                Ver todas
                </Link>
            )}
            </div>

            {/* ESTADO VACÍO */}

            {competencies.length === 0 && (
            <div className="text-center py-5">
                <i
                className="bi bi-award text-secondary"
                style={{ fontSize: "3rem" }}
                />

                <h6 className="mt-3">Aún no existen competencias registradas</h6>

                <p className="text-muted mb-4">
                Registre la primera competencia del estudiante.
                </p>

                <Link
                to={`/institution/students/${studentPublicId}/competencies/create`}
                className="btn btn-primary"
                >
                <i className="bi bi-plus-lg me-2"></i>
                Crear competencia
                </Link>
            </div>
            )}

            {/* TABLA RESUMEN */}

            {competencies.length > 0 && (
            <div className="table-responsive">
                <table className="table align-middle mb-0">
                <thead className="table-light">
                    <tr>
                    <th>Competencia</th>
                    <th>Nivel</th>
                    {/* <th>Origen</th> */}
                    <th>Periodo</th>
                    <th>Estado</th>
                    <th style={{ width: 120 }}></th>
                    </tr>
                </thead>

                <tbody>
                    {competencies.slice(0, 3).map((competency) => (
                    <tr key={competency.publicId}>
                        <td className="fw-semibold">{competency.name}</td>

                        <td>
                        <CompetencyLevelBadge level={competency.level} />
                        </td>

                        {/* <td>
                        <CompetencySourceBadge source={competency.source} />
                        </td> */}

                        <td>
                            {competency.academicPeriod || "General"}
                        </td>

                        <td>
                        <CompetencyStatusBadge status={competency.status} />
                        </td>

                        <td className="text-end">
                        <Link
                            to={`/institution/competencies/${competency.publicId}`}
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
