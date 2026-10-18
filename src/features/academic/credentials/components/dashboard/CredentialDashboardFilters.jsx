import { academicProgramLabels } from "@/shared/utils/enumUtils";

const credentialTypeLabels = {
    BACHELOR_DEGREE: "Grado de bachiller",
    PROFESSIONAL_TITLE: "Título profesional",
    MASTER_DEGREE: "Maestría",
    DOCTORATE: "Doctorado",
};

const credentialStatusLabels = {
    DRAFT: "Borrador",
    ISSUED: "Emitida",
    REVOKED: "Revocada",
};

export default function CredentialDashboardFilters({
    filters,
    onFilterChange,
    onSearch,
    onClear,
}) {
    const programs = Object.entries(academicProgramLabels);

    return (
        <form
        className="card credential-dashboard-filters mb-4"
        onSubmit={(event) => {
            event.preventDefault();
            onSearch();
        }}
        >
        <div className="card-body">
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
            <h2 className="h6 mb-0">Filtros de búsqueda</h2>

            {/* <button
                type="button"
                className="btn btn-link btn-sm text-decoration-none"
                onClick={onClear}
            >
                Limpiar filtros
            </button> */}
            </div>

            <div className="row g-3">
            <div className="col-12 col-md-6 col-xl-4">
                <label className="form-label">Número de Título o grado</label>
                <input
                className="form-control"
                value={filters.search}
                onChange={(event) => onFilterChange("search", event.target.value)}
                placeholder="Buscar por número"
                />
            </div>

            <div className="col-12 col-md-6 col-xl-4">
                <label htmlFor="credential-student-code" className="form-label">
                Código de estudiante
                </label>

                <input
                id="credential-student-code"
                className="form-control"
                value={filters.studentCode}
                onChange={(event) =>
                    onFilterChange("studentCode", event.target.value)
                }
                placeholder="Ej. EST-001"
                />
            </div>

            <div className="col-12 col-md-6 col-xl-4">
                <label htmlFor="credential-program" className="form-label">
                Programa académico
                </label>

                <select
                id="credential-program"
                className="form-select"
                value={filters.program}
                onChange={(event) =>
                    onFilterChange("program", event.target.value)
                }
                >
                <option value="">Todos los programas</option>

                {programs.map(([value, label]) => (
                    <option key={value} value={value}>
                    {label}
                    </option>
                ))}
                </select>
            </div>

            <div className="col-12 col-md-6 col-xl-4">
                <label htmlFor="credential-type" className="form-label">
                Tipo de credencial
                </label>

                <select
                id="credential-type"
                className="form-select"
                value={filters.type}
                onChange={(event) => onFilterChange("type", event.target.value)}
                >
                <option value="">Todos los tipos</option>

                {Object.entries(credentialTypeLabels).map(([value, label]) => (
                    <option key={value} value={value}>
                    {label}
                    </option>
                ))}
                </select>
            </div>

            <div className="col-12 col-md-6 col-xl-4">
                <label htmlFor="credential-status" className="form-label">
                Estado
                </label>

                <select
                id="credential-status"
                className="form-select"
                value={filters.status}
                onChange={(event) => onFilterChange("status", event.target.value)}
                >
                <option value="">Todos los estados</option>

                {Object.entries(credentialStatusLabels).map(([value, label]) => (
                    <option key={value} value={value}>
                    {label}
                    </option>
                ))}
                </select>
            </div>

            <div className="col-12 col-md-6 col-xl-4">
                <label htmlFor="credential-from-date" className="form-label">
                Emitidas desde
                </label>

                <input
                id="credential-from-date"
                type="date"
                className="form-control"
                value={filters.fromDate}
                max={filters.toDate || undefined}
                onChange={(event) =>
                    onFilterChange("fromDate", event.target.value)
                }
                />
            </div>

            {/* <div className="col-12 col-md-6 col-xl-4">
                <label htmlFor="credential-to-date" className="form-label">
                Emitidas hasta
                </label>

                <input
                id="credential-to-date"
                type="date"
                className="form-control"
                value={filters.toDate}
                min={filters.fromDate || undefined}
                onChange={(event) => onFilterChange("toDate", event.target.value)}
                />
            </div> */}
            </div>

            <div className="d-flex justify-content-end gap-4 mt-3">
                <button
                    type="button"
                    className="btn btn-link btn-sm text-decoration-none"
                    onClick={onClear}
                >
                    Limpiar filtros
                </button>
                
                <button type="submit" className="btn btn-primary">
                    <i className="bi bi-search me-2" aria-hidden="true" />
                    Buscar credenciales
                </button>
            </div>
        </div>
        </form>
    );
}
