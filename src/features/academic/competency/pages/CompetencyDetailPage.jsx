import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import CompetencySummaryCard from "../components/CompetencySummaryCard";
import CompetencyEditModal from "../components/CompetencyEditModal";

import { useCompetency } from "../hooks/useCompetency";
import { useUpdateCompetency } from "../hooks/useUpdateCompetency";
import { useDeactivateCompetency } from "../hooks/useDeactivateCompetency";

import { useStudentTranscripts } from "../../transcript/hooks/useStudentTranscripts";

export default function CompetencyDetailPage() {

    const { competencyPublicId } = useParams();

    const navigate = useNavigate();

    const [editing, setEditing] = useState(false);

    const {
        data: competency,
        isLoading,
        error,
    } = useCompetency(competencyPublicId);

    const updateMutation = useUpdateCompetency();
    const deactivateMutation = useDeactivateCompetency();

    const { data: transcripts = [] } = useStudentTranscripts(
        competency?.studentPublicId,
    );

    const academicPeriods = useMemo(() => {
        return [
        ...new Set(
            transcripts
            .map((transcript) => transcript.academicPeriod)
            .filter(Boolean),
        ),
        ];
    }, [transcripts]);

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
        if (!window.confirm("¿Desea desactivar esta competencia?")) {
        return;
        }

        deactivateMutation.mutate(competencyPublicId);
    };

    const handleEdit = () => {
        if (competency.status === "INACTIVE") {
        alert("Esta competencia está inactiva y no puede editarse.");

        return;
        }

        setEditing(true);
    };

    const handleUpdate = (form) => {
        updateMutation.mutate(
        {
            competencyPublicId,
            data: form,
        },
        {
            onSuccess: () => {
            setEditing(false);
            },
        },
        );
    };

    return (
        <div className="container-fluid">
        {/*  HEADER*/}

        <div className="card shadow-sm border-0 mb-4">
            <div className="card-body d-flex justify-content-between align-items-center">
            <div>
                <h2 className="fw-bold mb-1">Competencia</h2>

                <p className="text-muted mb-0">Información detallada.</p>
            </div>

            <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => navigate(-1)}
            >
                Volver
            </button>
            </div>
        </div>

        {/*   RESUMEN*/}

        <CompetencySummaryCard
            competency={competency}
            onEdit={handleEdit}
            onDeactivate={handleDeactivate}
            deactivating={deactivateMutation.isPending}
        />

        {/* EDITAR */}

        {editing && (
            <CompetencyEditModal
            competency={competency}
            academicPeriods={academicPeriods}
            loading={updateMutation.isPending}
            onClose={() => setEditing(false)}
            onSubmit={handleUpdate}
            />
        )}
        </div>
    );
}
