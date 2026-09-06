import {
    timelineEventLabels,
    timelineReferenceLabels,
    timelineSourceLabels,
} from "../utils/timelineEventUtils";

export default function TimelineEventFilters({ 
    filters, 
    onChange, 
    onClear,
}) {

    const handleChange = (event) => {
        const { name, value } = event.target;

        onChange({
        ...filters,
        [name]: value,
        });
    };

    const hasFilters = Object.values(filters).some((value) => value !== "");

    const isDateRangeInvalid =
        filters.fromDate && 
        filters.toDate && 
        filters.fromDate > filters.toDate;

    return (
        <section className="timeline-filters">
        {/* HEADER */}

        <div className="timeline-filters-header">
            <div>
            <div className="d-flex align-items-center gap-2">
                <i className="bi bi-funnel text-primary"></i>

                <span className="fw-semibold">Filtrar actividad</span>
                
            </div>

            {/* <small className="text-muted">
                Refina los eventos mostrados en la trazabilidad.
            </small> */}
            </div>

            {hasFilters && (
            <span className="timeline-filter-active">Filtros activos</span>
            )}
        </div>

        {/* FILTROS */}

        <div className="row g-3 align-items-end">
            {/* BUSCAR */}
            {/*
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

            <small className="text-muted">
                La búsqueda se ejecuta automáticamente.
            </small> 
            </div>
                */}
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

            {/* RELACIONADO CON */}

            <div className="col-12 col-md-6 col-xl-2">
            <label className="form-label small fw-semibold">
                Relacionado con
            </label>

            <select
                name="referenceType"
                value={filters.referenceType}
                onChange={handleChange}
                className="form-select"
            >
                <option value="">Todos</option>

                {Object.entries(timelineReferenceLabels).map(([value, label]) => (
                <option key={value} value={value}>
                    {label}
                </option>
                ))}
            </select>
            </div>

            {/* DESDE */}

            <div className="col-12 col-md-6 col-xl-2">
            <label className="form-label small fw-semibold">Desde</label>

            <input
                type="date"
                name="fromDate"
                value={filters.fromDate}
                onChange={handleChange}
                className="form-control"
                max={filters.toDate || undefined}
            />
            </div>

            {/* HASTA */}

            <div className="col-12 col-md-6 col-xl-2">
            <label className="form-label small fw-semibold">Hasta</label>

            <input
                type="date"
                name="toDate"
                value={filters.toDate}
                onChange={handleChange}
                className="form-control"
                min={filters.fromDate || undefined}
            />
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

        {/* ERROR FECHAS */}

        {isDateRangeInvalid && (
            <div className="timeline-filter-date-error mt-3">
            <i className="bi bi-exclamation-circle"></i>

            <span>
                La fecha "Desde" no puede ser posterior a la fecha "Hasta".
            </span>
            </div>
        )}

        {/* FILTROS ACTIVOS 

            {hasFilters && (
                <div className="timeline-active-filters">
                <span className="timeline-active-filters-label">Filtros:</span>

                {filters.keyword && (
                    <span className="timeline-filter-chip">
                    Búsqueda: {filters.keyword}
                    </span>
                )}

                {filters.type && (
                    <span className="timeline-filter-chip">
                    Tipo: {timelineEventLabels[filters.type]?.label ?? filters.type}
                    </span>
                )}

                {filters.source && (
                    <span className="timeline-filter-chip">
                    Origen: {timelineSourceLabels[filters.source] ?? filters.source}
                    </span>
                )}

                {filters.referenceType && (
                    <span className="timeline-filter-chip">
                    Relacionado:{" "}
                    {timelineReferenceLabels[filters.referenceType] ??
                        filters.referenceType}
                    </span>
                )}

                {filters.fromDate && (
                    <span className="timeline-filter-chip">
                    Desde: {filters.fromDate}
                    </span>
                )}

                {filters.toDate && (
                    <span className="timeline-filter-chip">
                    Hasta: {filters.toDate}
                    </span>
                )}
                </div>
            )}
                */}
        </section>
    );
}
