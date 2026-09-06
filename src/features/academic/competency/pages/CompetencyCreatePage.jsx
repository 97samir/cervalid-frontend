import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";

import CompetencyForm from "../components/CompetencyForm";

import { useCreateCompetency } from "../hooks/useCreateCompetency";
import { useStudentTranscripts } from "../../transcript/hooks/useStudentTranscripts";

export default function CompetencyCreatePage() {

    const { studentPublicId } = useParams();
    const navigate = useNavigate();
    const createMutation = useCreateCompetency();

    const { 
        data: transcripts = [], 
        isLoading: transcriptsLoading } 
    = useStudentTranscripts(studentPublicId);

    const academicPeriods = useMemo(() => {
        return [
        ...new Set(
            transcripts
            .map((transcript) => transcript.academicPeriod)
            .filter(Boolean),
        ),
        ];
    }, [transcripts]);

    const handleSubmit = (form) => {
        createMutation.mutate(
        {
            studentPublicId,
            data: form,
        },
        {
            onSuccess: () => {
            navigate(`/institution/students/${studentPublicId}/competencies`);
            },
        },
        );
    };

    return (
        <div className="container-fluid">
        {/*   HEADER */}

        <div className="card shadow-sm border-0 mb-4">
            <div className="card-body">
            <h2 className="fw-bold mb-1">Crear Competencia</h2>

            <p className="text-muted mb-0">
                Registre una competencia adquirida por el estudiante.
            </p>
            </div>
        </div>

        {/* FORMULARIO */}

        <CompetencyForm
            academicPeriods={academicPeriods}
            onSubmit={handleSubmit}
            loading={createMutation.isPending || transcriptsLoading}
            onCancel={() => navigate(-1)}
            submitLabel="Guardar Competencia"
        />
        </div>
    );
}
