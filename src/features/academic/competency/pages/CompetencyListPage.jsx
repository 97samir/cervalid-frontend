import { Link, useParams } from "react-router-dom";

import { useStudentCompetencies } from "../hooks/useStudentCompetencies";

import CompetencyStatusBadge from "../components/CompetencyStatusBadge";
import CompetencyLevelBadge from "../components/CompetencyLevelBadge";
import CompetencySourceBadge from "../components/CompetencySourceBadge";
import { formatCompetencyDate } from "../utils/competencyDateUtils";

export default function CompetencyListPage() {
    const { studentPublicId } = useParams();

    const {
        data: competencies = [],
        isLoading,
        error,
    } = useStudentCompetencies(studentPublicId);

    const createCompetencyUrl = `/institution/students/${studentPublicId}/competencies/create`;

    if (isLoading) {
        return (
        <div className="d-flex justify-content-center py-5">
            <div
            className="spinner-border text-primary"
            role="status"
            aria-label="Cargando competencias"
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
                No fue posible cargar las competencias.
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

        <div className="card shadow-sm border-0 rounded-4 mb-4">
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
                    <i className="bi bi-lightbulb"></i>
                    </div>

                    <h2 className="fw-bold mb-0">Competencias</h2>
                </div>

                <p className="text-muted mb-0 ms-lg-5">
                    {competencies.length} competencia
                    {competencies.length !== 1 ? "s" : ""} registrada
                    {competencies.length !== 1 ? "s" : ""}
                </p>
                </div>

                {/* ACCIONES */}

                <div className="d-flex flex-column flex-sm-row gap-2">
                <Link to={-1} className="btn btn-outline-secondary">
                    <i className="bi bi-arrow-left me-2"></i>
                    Volver
                </Link>

                <Link className="btn btn-primary" to={createCompetencyUrl}>
                    <i className="bi bi-plus-lg me-2"></i>
                    Nueva competencia
                </Link>
                </div>
            </div>
            </div>
        </div>

        {/* CONTENIDO */}

        <div className="card shadow-sm border-0 rounded-4">
            {competencies.length === 0 ? (
            /* ESTADO VACÍO */

            <div className="card-body text-center py-5">
                <div
                className="
                                    rounded-circle
                                    bg-primary-subtle
                                    text-primary
                                    d-inline-flex
                                    align-items-center
                                    justify-content-center
                                "
                style={{
                    width: "64px",
                    height: "64px",
                }}
                >
                <i className="bi bi-lightbulb fs-3" aria-hidden="true"></i>
                </div>

                <h5 className="fw-semibold mt-3 mb-2">
                No existen competencias registradas
                </h5>

                <p className="text-muted mb-4">
                Registra la primera competencia académica del estudiante para
                comenzar a construir su trazabilidad.
                </p>

                <Link className="btn btn-primary" to={createCompetencyUrl}>
                <i className="bi bi-plus-lg me-2"></i>
                Crear competencia
                </Link>
            </div>
            ) : (
            /* TABLA */

            <div className="table-responsive">
                <table className="table align-middle mb-0">
                <thead className="table-light">
                    <tr>
                    <th>Competencia</th>
                    <th>Nivel</th>
                    <th>Estado</th>
                    <th>Origen</th>
                    <th>Periodo</th>
                    <th>Adquirida</th>
                    <th className="text-end" style={{ width: 120 }}>
                        Acción
                    </th>
                    </tr>
                </thead>

                <tbody>
                    {competencies.map((competency) => (
                    <tr key={competency.publicId}>
                        <td className="fw-semibold">{competency.name}</td>

                        <td>
                        <CompetencyLevelBadge level={competency.level} />
                        </td>

                        <td>
                        <CompetencyStatusBadge status={competency.status} />
                        </td>

                        <td>
                        <CompetencySourceBadge source={competency.source} />
                        </td>

                        <td>{competency.academicPeriod || "General"}</td>

                        <td>{formatCompetencyDate(competency.acquiredDate)}</td>

                        <td className="text-end">
                        <Link
                            className="btn btn-outline-primary btn-sm"
                            to={`/institution/competencies/${competency.publicId}`}
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
