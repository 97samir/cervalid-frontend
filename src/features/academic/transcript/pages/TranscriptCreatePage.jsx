import { useNavigate, useParams } from "react-router-dom";
import TranscriptForm from "../components/TranscriptForm";
import { useCreateTranscript } from "../hooks/useCreateTranscript";
import { toCreateTranscriptRequest } from "../utils/transcriptMapper";

export default function TranscriptCreatePage() {
    
    const { studentPublicId } = useParams();
    const navigate = useNavigate();
    const createMutation = useCreateTranscript();

    const handleSubmit = (form) => {
        createMutation.mutate(
        {
            studentPublicId,
            data: toCreateTranscriptRequest(form),
        },

        {
            onSuccess: () => {
            navigate(`/institution/students/${studentPublicId}`);
            },
        },
        );
    };

    return (
        <div className="container-fluid">
        {/* HEADER */}

        <div className="card shadow-sm border-0 mb-4">
            <div className="card-body">
            <h2 className="fw-bold mb-1">Crear Historial Académico</h2>

            <p className="text-muted mb-0">
                Registre un nuevo historial académico para el estudiante.
            </p>
            </div>
        </div>

        {/* FORM */}

        <TranscriptForm
            onSubmit={handleSubmit}
            loading={createMutation.isPending}
            submitLabel="Guardar Historial"
            onCancel={() => navigate(-1)}
        />
        </div>
    );
}
