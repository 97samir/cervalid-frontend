import { Link, useNavigate, useParams } from "react-router-dom";

import AchievementForm from "../components/AchievementForm";

import { useCreateAchievement } from "../hooks/useCreateAchievement";

export default function AchievementCreatePage() {

    const navigate = useNavigate();
    const { studentPublicId } = useParams();
    const mutation = useCreateAchievement();

    return (
        <div className="container-fluid">
        <div className="card shadow-sm border-0 mb-4">
            <div className="card-body d-flex justify-content-between align-items-center">
            <div>
                <h2 className="fw-bold">Registrar logro</h2>

                <p className="text-muted mb-0">Agregue un nuevo logro académico.</p>
            </div>

            <Link
                to={`/institution/students/${studentPublicId}/achievements`}
                className="btn btn-outline-secondary"
            >
                Volver
            </Link>
            </div>
        </div>

        <AchievementForm
            loading={mutation.isPending}
            submitLabel="Guardar logro"
            onSubmit={(form) =>
            mutation.mutate(
                {
                studentPublicId,
                data: {
                    ...form,
                    studentPublicId,
                },
                },

                {
                onSuccess() {
                    navigate(
                    `/institution/students/${studentPublicId}/achievements`,
                    );
                },
                },
            )
            }
        />
        </div>
    );
}
