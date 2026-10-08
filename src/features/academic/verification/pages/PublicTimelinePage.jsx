import { Link, useParams } from "react-router-dom";
import { useMemo, useState } from "react";

import usePublicTimeline from "../hooks/usePublicTimeline";

import PublicTimelineHeader from "../components/public-timeline/PublicTimelineHeader";
import PublicTimelineSummary from "../components/public-timeline/PublicTimelineSummary";
import PublicTimelinePeriodSelector from "../components/public-timeline/PublicTimelinePeriodSelector";
import PublicTimelinePeriod from "../components/public-timeline/PublicTimelinePeriod";
import PublicTimelineEmpty from "../components/public-timeline/PublicTimelineEmpty";
import PublicTimelineTrustFooter from "../components/public-timeline/PublicTimelineTrustFooter";

import { getTimelinePeriods } from "../utils/publicTimelineUtils";

import "../styles/publicTimelinePage.css";

export default function PublicTimelinePage() {

    const { certificatePublicId, credentialPublicId } = useParams();

    const isCredential = Boolean(credentialPublicId);

    const resourcePublicId = credentialPublicId || certificatePublicId;

    const verificationType = isCredential ? "CREDENTIAL" : "CERTIFICATE";

    const verificationPath = isCredential
        ? `/verify/credential/${credentialPublicId}`
        : `/verify/${certificatePublicId}`;

    const { data, isLoading, isError } = usePublicTimeline(
        verificationType,
        resourcePublicId,
    );

    /**
     * Normaliza las diferentes respuestas que podría
     * devolver el endpoint.
     *
     * Puede recibir:
     * - []
     * - { timeline: [] }
     * - { events: [] }
     */
    const timeline = useMemo(() => {
        if (Array.isArray(data)) {
        return data;
        }

        if (Array.isArray(data?.timeline)) {
        return data.timeline;
        }

        if (Array.isArray(data?.events)) {
        return data.events;
        }

        return [];
    }, [data]);

    const periods = useMemo(() => getTimelinePeriods(timeline), [timeline]);

    const [selectedPeriod, setSelectedPeriod] = useState(null);

    /**
     * Algunos periodos utilizan "key" y otros "id".
     * Normalizamos ambos para evitar inconsistencias.
     */
    const getPeriodIdentifier = (period) => 
        period?.key ?? 
        period?.id ?? 
        null;

    const activePeriod =
        selectedPeriod &&
        periods.some((period) => getPeriodIdentifier(period) === selectedPeriod)
        ? selectedPeriod
        : getPeriodIdentifier(periods[0]);

    const activePeriodData = periods.find(
        (period) => getPeriodIdentifier(period) === activePeriod,
    );

    /*
    * =====================================================
    * LOADING
    * =====================================================
    */

    if (isLoading) {
        return (
        <div className="verification-page">
            <div className="container">
            <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Cargando...</span>
                </div>

                <p className="text-muted mt-3 mb-0">
                Cargando trayectoria académica...
                </p>
            </div>
            </div>
        </div>
        );
    }

    if (isError) {
        return (
        <div className="verification-page">
            <div className="container">
            <div className="text-center py-5">
                <div className="verification-hero-icon text-danger mx-auto">
                <i className="bi bi-exclamation-circle" aria-hidden="true" />
                </div>

                <h1 className="verification-hero-title">
                No se pudo cargar la trayectoria
                </h1>

                <p className="verification-hero-description">
                Ocurrió un problema al consultar la trayectoria académica del
                documento.
                </p>

                <Link to={verificationPath} className="btn btn-primary mt-3">
                <i className="bi bi-arrow-left me-2" aria-hidden="true" />
                Volver a la verificación
                </Link>
            </div>
            </div>
        </div>
        );
    }

    /*
    * =====================================================
    * EMPTY
    * =====================================================
    */

    if (!timeline.length) {
        return (
        <div className="verification-page">
            <div className="container">
            <PublicTimelineHeader
                verificationType={verificationType}
                resourcePublicId={resourcePublicId}
            />

            <PublicTimelineEmpty />

            <div className="text-center mt-4">
                <Link to={verificationPath} className="btn btn-outline-primary">
                <i className="bi bi-arrow-left me-2" aria-hidden="true" />
                Volver a la verificación
                </Link>
            </div>

            <PublicTimelineTrustFooter />
            </div>
        </div>
        );
    }

    return (
        <div className="verification-page">
        <div className="container">
            {/* HEADER */}
            <PublicTimelineHeader
            verificationType={verificationType}
            resourcePublicId={resourcePublicId}
            />

            {/* SUMMARY */}

            <PublicTimelineSummary
            timeline={timeline}
            verificationType={verificationType}
            eventCount={timeline.length}
            periodLabel={activePeriodData?.label ?? "-"}
            />

            {/* PERIOD SELECTOR */}

            {periods.length > 0 && (
            <PublicTimelinePeriodSelector
                periods={periods}
                selectedPeriod={activePeriod}
                onSelect={setSelectedPeriod}
            />
            )}

            {/* ACTIVE PERIOD */}

            {activePeriodData ? (
            <PublicTimelinePeriod
                period={activePeriodData}
                events={activePeriodData.events}
                verificationType={verificationType}
            />
            ) : (
            <PublicTimelineEmpty />
            )}

            {/* BACK */}

            <div className="text-center mt-4">
            <Link to={verificationPath} className="btn btn-outline-primary">
                <i className="bi bi-arrow-left me-2" aria-hidden="true" />
                Volver a la verificación
            </Link>
            </div>

            {/* TRUST */}

            <PublicTimelineTrustFooter />
        </div>
        </div>
    );
}
