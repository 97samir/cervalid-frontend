import InstitutionStatusToggle from "./InstitutionStatusToggle";
import useInstitutionContext from "@/core/hooks/useInstitutionContext";

const InstitutionsTable = ({ institutions, refresh }) => {

    const { enterInstitution } = useInstitutionContext();

    if (!institutions || institutions.length === 0) {
        return (
        <div className="text-center text-muted py-5">
            <i className="bi bi-building fs-2 d-block mb-2"></i>
            <p className="mb-0">No se encontraron instituciones.</p>
        </div>
        );
    }

    return (
        <div className="card border-0 shadow-sm">
        <div className="card-body p-0">
            <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                <tr>
                    <th className="text-nowrap py-3 px-4">Institución</th>

                    <th className="text-nowrap py-3">RUC</th>

                    <th className="text-nowrap py-3">Estado</th>

                    <th className="text-nowrap py-3" style={{ minWidth: "220px" }}>
                    Acciones
                    </th>
                </tr>
                </thead>

                <tbody>
                {institutions.map((inst) => (
                    <tr key={inst.id}>
                    {/* Institución */}
                    <td className="py-3 px-4">
                        <div className="d-flex align-items-center">
                        <div
                            className="d-flex align-items-center justify-content-center rounded-3 bg-primary bg-opacity-10 text-primary me-3"
                            style={{
                            width: "42px",
                            height: "42px",
                            minWidth: "42px",
                            }}
                        >
                            <i className="bi bi-building fs-5"></i>
                        </div>

                        <div>
                            <div className="fw-semibold">{inst.name || "-"}</div>

                            {inst.city && (
                            <small className="text-muted">{inst.city}</small>
                            )}
                        </div>
                        </div>
                    </td>

                    {/* RUC */}
                    <td className="text-nowrap py-3">{inst.ruc || "-"}</td>

                    {/* Estado */}
                    <td className="py-3">
                        <span
                        className={`badge rounded-pill ${
                            inst.active ? "text-bg-success" : "text-bg-secondary"
                        }`}
                        >
                        {inst.active ? "Activa" : "Inactiva"}
                        </span>
                    </td>

                    {/* Acciones */}
                    <td className="py-3">
                        <div className="d-flex flex-wrap gap-2">
                        <InstitutionStatusToggle
                            institution={inst}
                            refresh={refresh}
                        />

                        <button
                            type="button"
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => enterInstitution(inst)}
                            disabled={!inst.active}
                        >
                            <i className="bi bi-box-arrow-in-right me-1"></i>
                            Entrar
                        </button>
                        </div>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        </div>
        </div>
    );
};

export default InstitutionsTable;
