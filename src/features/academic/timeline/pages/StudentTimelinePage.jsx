import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useDebounce } from "../hooks/useDebounce";
import { useStudentTimeline } from "../hooks/useStudentTimeline";
import { useStudentTimelineSummary } from "../hooks/useStudentTimelineSummary";

import TimelineEventHeaders from "../components/TimelineEventHeaders";
import TimelineEventFilters from "../components/TimelineEventFilters";
import TimelineEventPagination from "../components/TimelineEventPagination";
import TimelineItem from "../components/TimelineItem";
import TimelineEventDetailModal from "../components/TimelineEventDetailModal";
import TimelineSummary from "../components/TimelineSummary";

import "../styles/timeline.css";

const createDefaultFilters = () => ({
    keyword: "",
    type: "",
    source: "",
    referenceType: "",
    fromDate: "",
    toDate: "",
});



export default function StudentTimelinePage() {
    const { publicId: studentPublicId } = useParams();
    const [page, setPage] = useState(0);
    const [filters, setFilters] = useState(createDefaultFilters);
    const [selectedEventId, setSelectedEventId] = useState(null);

    const debouncedKeyword = useDebounce(filters.keyword, 500);

    const queryFilters = useMemo(
        () => ({
        ...filters,
        keyword: debouncedKeyword,
        }),
        [filters, debouncedKeyword],
    );

    const hasFilters = useMemo(
        () => Object.values(filters).some((value) => value !== ""),
        [filters],
    );

    const PAGE_SIZE = 5;

    const { data, isLoading, isFetching, error } = useStudentTimeline(
        studentPublicId,
        page,
        PAGE_SIZE,
        queryFilters,
    );

    const { data: summary } = useStudentTimelineSummary(studentPublicId);

    const events = data?.content ?? [];

    console.log("TIMELINE DATA:", data);

    /* EVENTOS AGRUPADOS POR AÑO */
    const eventsByYear = useMemo(() => {
        return events.reduce((groups, event) => {
        if (!event.eventDate) {
            const key = "Sin fecha";

            if (!groups[key]) {
            groups[key] = [];
            }

            groups[key].push(event);

            return groups;
        }

        const year = new Date(event.eventDate).getFullYear();

        const key = Number.isNaN(year) ? "Sin fecha" : String(year);

        if (!groups[key]) {
            groups[key] = [];
        }

        groups[key].push(event);

        return groups;
        }, {});
    }, [events]);

    const orderedYears = useMemo(() => {
        return Object.keys(eventsByYear).sort((a, b) => {
        if (a === "Sin fecha") {
            return 1;
        }

        if (b === "Sin fecha") {
            return -1;
        }

        return Number(b) - Number(a);
        });
    }, [eventsByYear]);

    /* HANDLERS*/
    const handleFilterChange = (nextFilters) => {
        setFilters(nextFilters);
        setPage(0);
    };

    const handleClearFilters = () => {
        setFilters(createDefaultFilters());
        setPage(0);
    };

    const handlePreviousPage = () => {
        setPage((current) => Math.max(current - 1, 0));
    };

    const handleNextPage = () => {
        if (data?.last || isFetching) {
        return;
        }

        setPage((current) => current + 1);
    };

    /*
            |--------------------------------------------------------------------------
            | LOADING INICIAL
            |--------------------------------------------------------------------------
            */

    if (isLoading) {
        return (
        <div className="container-fluid py-4 timeline-page">
            <div className="timeline-page-loading">
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Cargando trazabilidad...</span>
            </div>

            <p className="text-muted mt-3 mb-0">
                Cargando trazabilidad académica...
            </p>
            </div>
        </div>
        );
    }

    /*
            |--------------------------------------------------------------------------
            | ERROR
            |--------------------------------------------------------------------------
            */

    if (error) {
        return (
        <div className="container-fluid py-0 timeline-page">
            <div className="timeline-error">
            <div className="timeline-error-icon">
                <i className="bi bi-exclamation-triangle"></i>
            </div>

            <div>
                <h6 className="fw-bold mb-1">No se pudo cargar la trazabilidad</h6>

                <p className="text-muted mb-0">
                Ocurrió un problema al consultar el historial académico del
                estudiante.
                </p>
            </div>
            </div>
        </div>
        );
    }

    return (
        <div className="container-fluid py-0 timeline-page">
        {/* =========================================================
                        HEADER
                    ========================================================= */}

        <TimelineEventHeaders
            studentPublicId={studentPublicId}
            totalElements={data?.totalElements ?? 0}
        />

        {/* =========================================================
                        FILTROS
                    ========================================================= */}

        <TimelineEventFilters
            filters={filters}
            onChange={handleFilterChange}
            onClear={handleClearFilters}
        />

        {/* =========================================================
                        CONTENIDO PRINCIPAL
                    ========================================================= */}

        <div className="row g-4 align-items-start">
            {/* =====================================================
                            TIMELINE
                        ===================================================== */}

            <div className="col-12 col-xl-8">
            <div className="timeline-main-card">
                {/* HEADER */}

                <div className="timeline-main-header">
                <div>
                    <div className="d-flex align-items-center gap-2">
                    <div className="timeline-section-icon">
                        <i className="bi bi-clock-history"></i>
                    </div>

                    <div>
                        <h5 className="fw-bold mb-0">Historial académico</h5>

                        <small className="text-muted">
                        Actividad registrada cronológicamente
                        </small>
                    </div>
                    </div>
                </div>

                {isFetching && (
                    <div className="timeline-fetching">
                    <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                    />

                    <span>Actualizando...</span>
                    </div>
                )}
                </div>

                {/* BODY */}

                <div className="timeline-main-body">
                {events.length === 0 ? (
                    <div className="timeline-empty">
                    <div className="timeline-empty-icon">
                        <i className="bi bi-clock-history"></i>
                    </div>

                    <h5 className="fw-bold mt-3 mb-2">
                        No hay eventos registrados
                    </h5>

                    <p className="text-muted mb-0">
                        {hasFilters
                        ? "No encontramos eventos que coincidan con los filtros seleccionados."
                        : "La actividad académica del estudiante aparecerá aquí."}
                    </p>

                    {hasFilters && (
                        <button
                        type="button"
                        className="btn btn-outline-primary btn-sm mt-3"
                        onClick={handleClearFilters}
                        >
                        <i className="bi bi-x-circle me-1"></i>
                        Limpiar filtros
                        </button>
                    )}
                    </div>
                ) : (
                    <div className="timeline">
                    {orderedYears.map((year) => (
                        <section key={year} className="timeline-year-section">
                        <div className="timeline-year-label">{year}</div>

                        <div className="timeline-year-events">
                            {eventsByYear[year].map((event) => (
                            <TimelineItem
                                key={event.publicId}
                                event={event}
                                onViewDetail={setSelectedEventId}
                            />
                            ))}
                        </div>
                        </section>
                    ))}
                    </div>
                )}
                </div>
            </div>

            {/* =================================================
                                PAGINACIÓN
                            ================================================= */}

            <TimelineEventPagination
                data={data}
                isFetching={isFetching}
                onPrevious={handlePreviousPage}
                onNext={handleNextPage}
            />
            </div>

            {/* =====================================================
                            SIDEBAR
                        ===================================================== */}

            <div className="col-12 col-xl-4">
            <TimelineSummary summary={summary} hasFilters={hasFilters} />
            </div>
        </div>

        {/* =========================================================
                        MODAL
                    ========================================================= */}

        {selectedEventId && (
            <TimelineEventDetailModal
            publicId={selectedEventId}
            onClose={() => setSelectedEventId(null)}
            />
        )}
        </div>
    );
}
