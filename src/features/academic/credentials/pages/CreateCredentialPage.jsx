import { Link, useNavigate, useParams } from "react-router-dom";

import { useCreateCredential } from "../hooks/useCreateCredential";
import CredentialForm from "../components/CredentialForm";

export default function CreateCredentialPage() {
    const { studentPublicId } = useParams();
    const navigate = useNavigate();

    const createMutation = useCreateCredential();

    const credentialsPath = `/institution/students/${studentPublicId}/credentials`;

    const handleSubmit = async (data) => {
        await createMutation.mutateAsync({
        studentPublicId,
        data,
        });

        navigate(credentialsPath);
    };

    const handleCancel = () => {
        navigate(credentialsPath);
    };

    return (
        <div className="container-fluid">
            
            {/* HEADER */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h4 className="fw-bold mb-1">
                        <i className="bi bi-mortarboard-fill text-primary me-2"></i>
                        Nueva credencial académica
                    </h4>

                    <p className="text-muted mb-0">
                        Registra un grado o título obtenido por el estudiante.
                    </p>
                </div>

                <Link to={credentialsPath} className="btn btn-outline-secondary">
                    <i className="bi bi-arrow-left me-2"></i>
                    Volver
                </Link>
            </div>

            {/* FORMULARIO */}
            <div className="card border-0 shadow-sm rounded-4">
                <div className="card-body p-4">
                    <CredentialForm
                        mode="create"
                        isSubmitting={createMutation.isPending}
                        onSubmit={handleSubmit}
                        onCancel={handleCancel}
                    />
                </div>
            </div>
        </div>
    );
}
