import {
    timelineEventLabels,
    timelineReferenceLabels,
    timelineSourceLabels,
} from "../utils/timelineEventUtils";

export default function TimelineEventFilters({ filters, onChange, onClear }) {
    const handleChange = (event) => {
        const { name, value } = event.target;

        onChange({
        ...filters,
        [name]: value,
        });
    };

    const hasFilters = Object.values(filters).some((value) => value !== "");

    return (
        <section className="timeline-filters">
        <div className="timeline-filters-header">
            <div>
            <div className="d-flex align-items-center gap-2">
                <i className="bi bi-funnel text-primary"></i>

                <span className="fw-semibold">Filtrar actividad</span>
            </div>

            <small className="text-muted">
                Refina los eventos mostrados en la trazabilidad.
            </small>
            </div>

            {hasFilters && (
            <span className="timeline-filter-active">Filtros activos</span>
            )}
        </div>

        <div className="row g-3 align-items-end">
            {/* BUSCAR */}

            <div className="col-12 col-xl-4">
            <label className="form-label small fw-semibold">
                Buscar actividad
            </label>

            <div className="input-group">
                <span className="input-group-text bg-white">
                <i className="bi bi-search"></i>
                </span>

                <input
                type="text"
                name="keyword"
                value={filters.keyword}
                onChange={handleChange}
                className="form-control"
                placeholder="Descripción o actividad..."
                />
            </div>
            </div>

            {/* TIPO */}

            <div className="col-12 col-md-6 col-xl-2">
            <label className="form-label small fw-semibold">Tipo</label>

            <select
                name="type"
                value={filters.type}
                onChange={handleChange}
                className="form-select"
            >
                <option value="">Todos</option>

                {Object.entries(timelineEventLabels).map(([value, info]) => (
                <option key={value} value={value}>
                    {info.label}
                </option>
                ))}
            </select>
            </div>

            {/* ORIGEN */}

            <div className="col-12 col-md-6 col-xl-2">
            <label className="form-label small fw-semibold">Origen</label>

            <select
                name="source"
                value={filters.source}
                onChange={handleChange}
                className="form-select"
            >
                <option value="">Todos</option>

                {Object.entries(timelineSourceLabels).map(([value, label]) => (
                <option key={value} value={value}>
                    {label}
                </option>
                ))}
            </select>
            </div>

            {/* CATEGORÍA */}

            <div className="col-12 col-md-6 col-xl-2">
            <label className="form-label small fw-semibold">Categoría</label>

            <select
                name="referenceType"
                value={filters.referenceType}
                onChange={handleChange}
                className="form-select"
            >
                <option value="">Todas</option>

                {Object.entries(timelineReferenceLabels).map(([value, label]) => (
                <option key={value} value={value}>
                    {label}
                </option>
                ))}
            </select>
            </div>

            {/* LIMPIAR */}

            <div className="col-12 col-md-6 col-xl-2">
            <button
                type="button"
                className="btn btn-outline-secondary w-100"
                disabled={!hasFilters}
                onClick={onClear}
            >
                <i className="bi bi-x-circle me-2"></i>
                Limpiar
            </button>
            </div>
        </div>
        </section>
    );
}
