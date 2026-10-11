import { useNavigate, useParams, Link } from "react-router-dom";

import AchievementForm from "../components/AchievementForm";

import { useCreateAchievement } from "../hooks/useCreateAchievement";
import { useStudentTranscripts } from "@/features/academic/transcript/hooks/useStudentTranscripts";

export default function AchievementCreatePage() {
    const navigate = useNavigate();
    const { studentPublicId } = useParams();

    const mutation = useCreateAchievement();

    const {
        data: transcripts = [],
        isLoading: transcriptsLoading,
        error: transcriptsError,
    } = useStudentTranscripts(studentPublicId);

    const academicPeriods = [
        ...new Set(
        transcripts
            .map((transcript) => transcript.academicPeriod)
            .filter(Boolean),
        ),
    ];

    const achievementsUrl = `/institution/students/${studentPublicId}/achievements`;

    const handleCancel = () => {
        if (mutation.isPending) {
        return;
        }

        navigate(achievementsUrl, { replace: true });
    };

    const handleSubmit = (form) => {
        mutation.mutate(
        {
            studentPublicId,
            data: form,
        },
        {
            onSuccess: () => {
            navigate(achievementsUrl, { replace: true });
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
                <div>
                <div className="d-flex align-items-center gap-2 mb-1">
                    <div
                    className="rounded-circle bg-warning-subtle text-warning d-flex align-items-center justify-content-center flex-shrink-0"
                    style={{
                        width: "42px",
                        height: "42px",
                    }}
                    >
                    <i className="bi bi-trophy"></i>
                    </div>

                    <h2 className="fw-bold mb-0">Registrar logro</h2>
                </div>

                <p className="text-muted mb-0 ms-lg-5">
                    Registra un reconocimiento o logro académico en la trayectoria
                    del estudiante.
                </p>
                </div>

                <div className="d-flex flex-column flex-sm-row gap-2">
                <Link to={achievementsUrl} className="btn btn-outline-secondary">
                    <i className="bi bi-arrow-left me-2"></i>
                    Volver
                </Link>
                </div>
            </div>
            </div>
        </div>

        {/* ERROR AL CARGAR PERIODOS */}

        {transcriptsError && (
            <div className="alert alert-danger" role="alert">
            No fue posible cargar los periodos académicos. Comprueba la conexión e
            inténtalo nuevamente.
            </div>
        )}

        {/* FORMULARIO */}

        {!transcriptsError && (
            <AchievementForm
            academicPeriods={academicPeriods}
            loading={mutation.isPending || transcriptsLoading}
            submitLabel="Guardar logro"
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            />
        )}

        {/* ERROR AL GUARDAR */}

        {mutation.isError && (
            <div className="alert alert-danger mt-3" role="alert">
            No fue posible registrar el logro. Revisa la información e inténtalo
            nuevamente.
            </div>
        )}
        </div>
    );
}
