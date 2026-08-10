import { useState } from "react";
import { Link, useParams } from "react-router-dom";

import CompetencySummaryCard from "../components/CompetencySummaryCard";
import CompetencyForm from "../components/CompetencyForm";
import CompetencyEditModal from "../components/CompetencyEditModal";

import { useCompetency } from "../hooks/useCompetency";
import { useUpdateCompetency } from "../hooks/useUpdateCompetency";
import { useDeactivateCompetency } from "../hooks/useDeactivateCompetency";

export default function CompetencyDetailPage() {

    const { competencyPublicId } = useParams();
    const [editing, setEditing] = useState(false);

    const {data: competency,isLoading,error,
    } = useCompetency(competencyPublicId);

    const updateMutation = useUpdateCompetency();
    const deactivateMutation = useDeactivateCompetency();

    if (isLoading) {
        return (
        <div className="text-center py-5">
            <div className="spinner-border text-primary" />
        </div>
        );
    }

    if (error) {
        return (
        <div className="alert alert-danger">
            No fue posible cargar la competencia.
        </div>
        );
    }

    const handleDeactivate = () => {
        if (!window.confirm("¿Desea desactivar esta competencia?")) return;

        deactivateMutation.mutate(competencyPublicId);
    };

    return (
        <div className="container-fluid">
        <div className="card shadow-sm border-0 mb-4">
            <div className="card-body d-flex justify-content-between">
            <div>
                <h2 className="fw-bold">Competencia</h2>

                <p className="text-muted">Información detallada.</p>
            </div>

            <Link to={-1} className="btn btn-outline-secondary">
                Volver
            </Link>
            </div>
        </div>

        <CompetencySummaryCard
            competency={competency}
            onEdit={() => {
                if (competency.status === "INACTIVE") {
                    alert (
                        "Esta competencia está inactiva y no puede editarse."
                    );
                    return;
                }
                setEditing(true);
            }}
            onDeactivate={handleDeactivate}
            deactivating={deactivateMutation.isPending}
        />

        {editing && (
            <CompetencyEditModal
                competency={competency}
                loading={updateMutation.isPending}
                onClose={() => setEditing(false)}
                onSubmit={(form) => {
                    updateMutation.mutate(
                        {
                            competencyPublicId,
                            //studentPublicId: competency.studentPublicId,
                            data: form,
                        },
                        {
                            onSuccess() {
                                setEditing(false);
                            },
                        }
                    );
                }}
            />
        )}

        </div>
    );
}
