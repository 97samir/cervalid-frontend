import { useState } from "react";
import { Link, useParams } from "react-router-dom";

import AchievementSummaryCard from "../components/AchievementSummaryCard";
import AchievementEditModal from "../components/AchievementEditModal";

import { useAchievement } from "../hooks/useAchievement";
import { useUpdateAchievement } from "../hooks/useUpdateAchievement";
import { useDeactivateAchievement } from "../hooks/useDeactivateAchievement";

import { useStudentTranscripts } from "@/features/academic/transcript/hooks/useStudentTranscripts";

export default function AchievementDetailPage() {
    const { achievementPublicId } = useParams();

    const [showEdit, setShowEdit] = useState(false);

    const {
        data: achievement,
        isLoading,
        error,
    } = useAchievement(achievementPublicId);

    const updateMutation = useUpdateAchievement();
    const deactivateMutation = useDeactivateAchievement();

    const { data: transcripts = [] } = useStudentTranscripts(
        achievement?.studentPublicId,
    );

    const academicPeriods = [
        ...new Set(
        transcripts
            .map((transcript) => transcript.academicPeriod)
            .filter(Boolean),
        ),
    ];

    if (isLoading) {
        return (
        <div className="d-flex justify-content-center py-5">
            <div
            className="spinner-border text-primary"
            role="status"
            aria-label="Cargando logro"
            />
        </div>
        );
    }

    if (error || !achievement) {
        return (
        <div className="alert alert-danger" role="alert">
            <div className="d-flex align-items-start gap-2">
            <i className="bi bi-exclamation-circle fs-5"></i>

            <div>
                <div className="fw-semibold">No fue posible cargar el logro.</div>

                <div className="small mt-1">
                Inténtalo nuevamente o vuelve a la página anterior.
                </div>
            </div>
            </div>
        </div>
        );
    }

    const handleDeactivate = () => {
        if (achievement.status !== "ACTIVE") {
        alert("Este logro ya se encuentra inactivo.");
        return;
        }

        const confirmed = window.confirm("¿Desea desactivar este logro?");

        if (!confirmed) {
        return;
        }

        deactivateMutation.mutate(achievementPublicId);
    };

    const handleEdit = () => {
        if (achievement.status !== "ACTIVE") {
        alert("No es posible editar un logro inactivo.");
        return;
        }

        setShowEdit(true);
    };

    const handleUpdate = (form) => {
        updateMutation.mutate(
        {
            achievementPublicId,
            data: form,
        },
        {
            onSuccess: () => {
            setShowEdit(false);
            },
        },
        );
    };

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
                                            bg-warning-subtle
                                            text-warning
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
                    <i className="bi bi-trophy"></i>
                    </div>

                    <h2 className="fw-bold mb-0">Detalle del logro</h2>
                </div>

                <p className="text-muted mb-0 ms-lg-5">
                    Consulta y administra la información del logro académico.
                </p>
                </div>

                {/* ACCIONES */}

                <div className="d-flex flex-column flex-sm-row gap-2">
                    <Link to={-1} className="btn btn-outline-secondary">
                        <i className="bi bi-arrow-left me-2"></i>
                        Volver
                    </Link>
                </div>
            </div>
            </div>
        </div>

        {/* INFORMACIÓN DEL LOGRO */}

        <AchievementSummaryCard
            achievement={achievement}
            onEdit={handleEdit}
            onDeactivate={handleDeactivate}
            deactivating={deactivateMutation.isPending}
        />

        {/* MODAL DE EDICIÓN */}

        <AchievementEditModal
            show={showEdit}
            achievement={achievement}
            academicPeriods={academicPeriods}
            loading={updateMutation.isPending}
            onClose={() => setShowEdit(false)}
            onSubmit={handleUpdate}
        />
        </div>
    );
}
