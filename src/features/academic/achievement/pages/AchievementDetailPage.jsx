import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import AchievementSummaryCard from "../components/AchievementSummaryCard";
import AchievementEditModal from "../components/AchievementEditModal";
import { useAchievement } from "../hooks/useAchievement";
import { useUpdateAchievement } from "../hooks/useUpdateAchievement";
import { useDeactivateAchievement } from "../hooks/useDeactivateAchievement";

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

    if (isLoading) {
        return (
        <div className="text-center py-5">
            <div className="spinner-border text-primary" />
        </div>
        );
    }

    if (error) {
        return (
        <div className="alert alert-danger">No fue posible cargar el logro.</div>
        );
    }

    const handleDeactivate = () => {
        if (achievement.status !== "ACTIVE") {
        return alert("Este logro ya se encuentra inactivo.");
        }

        if (!window.confirm("¿Desea desactivar este logro?")) {
        return;
        }

        deactivateMutation.mutate(achievementPublicId);
    };

    return (
        <div className="container-fluid">
        <div className="card shadow-sm border-0 mb-4">
            <div className="card-body d-flex justify-content-between">
            <div>
                <h2 className="fw-bold">Logro</h2>

                <p className="text-muted">Información detallada.</p>
            </div>

            <Link to={-1} className="btn btn-outline-secondary">
                Volver
            </Link>
            </div>
        </div>

        <AchievementSummaryCard
            achievement={achievement}
            onEdit={() => {
            if (achievement.status !== "ACTIVE") {
                return alert("No es posible editar un logro inactivo.");
            }

            setShowEdit(true);
            }}
            onDeactivate={handleDeactivate}
            deactivating={deactivateMutation.isPending}
        />

        <AchievementEditModal
            show={showEdit}
            achievement={achievement}
            loading={updateMutation.isPending}
            onClose={() => setShowEdit(false)}
            onSubmit={(form) =>
            updateMutation.mutate(
                {
                achievementPublicId,

                data: form,
                },

                {
                onSuccess() {
                    setShowEdit(false);
                },
                },
            )
            }
        />
        </div>
    );
}
