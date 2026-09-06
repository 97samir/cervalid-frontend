import { Link, useParams } from "react-router-dom";
import { useMemo, useState } from "react";

import usePublicCertificateTimeline from "../hooks/usePublicCertificateTimeline";

import PublicTimelineHeader from "../components/public-timeline/PublicTimelineHeader";
import PublicTimelineSummary from "../components/public-timeline/PublicTimelineSummary";
import PublicTimelinePeriodSelector from "../components/public-timeline/PublicTimelinePeriodSelector";
import PublicTimelinePeriod from "../components/public-timeline/PublicTimelinePeriod";
import PublicTimelineEmpty from "../components/public-timeline/PublicTimelineEmpty";
import PublicTimelineTrustFooter from "../components/public-timeline/PublicTimelineTrustFooter";

import { getTimelinePeriods } from "../utils/publicTimelineUtils";

import "../styles/publicTimeline.css";

export default function PublicTimelinePage() {
    const { certificatePublicId } = useParams();

    const {
        data: timeline = [],
        isLoading,
        isError,
    } = usePublicCertificateTimeline(certificatePublicId);

    const periods = useMemo(() => getTimelinePeriods(timeline), [timeline]);

    const [selectedPeriod, setSelectedPeriod] = useState(null);

    const activePeriod =
        selectedPeriod && periods.some((period) => period.key === selectedPeriod)
        ? selectedPeriod
        : (periods[0]?.key ?? null);

    /* PERIODO ACTIVO */

    const activePeriodData = periods.find(
        (period) => period.key === activePeriod,
    );

    /* ESTADOS*/

    if (isLoading) {
        return (
        <div className="container py-5">
            <div className="text-center py-5">
            <div className="spinner-border text-primary mb-3" role="status" />

            <p className="text-muted mb-0">Cargando trayectoria académica...</p>
            </div>
        </div>
        );
    }

    if (isError) {
        return (
        <div className="container py-5">
            <div className="alert alert-danger">
            <strong>No se pudo cargar la trayectoria.</strong>

            <div className="small mt-1">
                Verifica que el certificado exista y vuelve a intentarlo.
            </div>
            </div>
        </div>
        );
    }

    return (
        <div className="public-timeline-page">
            <div className="container py-4 py-lg-5">
                
                {/* NAVEGACIÓN  */}

                <div className="mb-4">
                    <Link
                        to={`/verify/${certificatePublicId}`}
                        className="public-timeline-back"
                    >
                        <i className="bi bi-arrow-left me-2" />
                        Volver a la verificación
                    </Link>
                </div>


                {/* INTRODUCCIÓN + RESUMEN */}

                <div className="row g-4 align-items-stretch">

                    <div className="col-12 col-lg-6">
                        <PublicTimelineHeader />
                    </div>

                    <div className="col-12 col-lg-6">
                        <PublicTimelineSummary
                            eventCount={timeline.length}
                            periodLabel={activePeriodData?.label ?? "-"}
                        />
                    </div>

                </div>

                {/* CONTENIDO*/}

                {timeline.length === 0 ? (
                <PublicTimelineEmpty />
                ) : (
                <>
                    {/* SELECTOR */}

                    <div className="mt-4">
                    <PublicTimelinePeriodSelector
                        periods={periods}
                        selectedPeriod={activePeriod}
                        onSelect={setSelectedPeriod}
                    />
                    </div>

                    {/* PERIODO ACTIVO */}

                    {activePeriodData && (
                    <div className="mt-4">
                        <PublicTimelinePeriod
                        period={activePeriodData}
                        events={activePeriodData.events}
                        />
                    </div>
                    )}
                </>
                )}

                {/* FOOTER */}

                <PublicTimelineTrustFooter />
            </div>
        </div>
    );
}
