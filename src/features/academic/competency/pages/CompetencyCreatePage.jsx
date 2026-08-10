import { useNavigate, useParams } from "react-router-dom";
import CompetencyForm from "../components/CompetencyForm";
import { useCreateCompetency } from "../hooks/useCreateCompetency";

export default function CompetencyCreatePage() {

    const { studentPublicId } = useParams();
    const navigate = useNavigate();
    const createMutation = useCreateCompetency();

    const handleSubmit = (form) => {
        createMutation.mutate(
        {
            studentPublicId,
            data: form,
        },
        {
            onSuccess() {
            navigate(`/institution/students/${studentPublicId}/competencies`);
            },
        },
        );
    };

    return (
        <div className="container-fluid">
        <div className="card shadow-sm border-0 mb-4">
            <div className="card-body">
            <h2 className="fw-bold">Crear Competencia</h2>

            <p className="text-muted">
                Registre una competencia adquirida por el estudiante.
            </p>
            </div>
        </div>

        <CompetencyForm
            onSubmit={handleSubmit}
            loading={createMutation.isPending}
            onCancel={() => navigate(-1)}
            submitLabel="Guardar Competencia"
        />
        </div>
    );
}
