import { useNavigate, useParams } from "react-router-dom";
import AcademicProfileForm from "../components/AcademicProfileForm";
import { useCreateProfile } from "../hooks/useCreateProfile";

export default function AcademicProfileCreatePage() {

    const { studentPublicId } = useParams();
    const navigate = useNavigate();
    const createMutation = useCreateProfile();

    const handleSubmit = (form) => {

        createMutation.mutate(
            {
                studentPublicId,
                data: form,
            },
            {
                onSuccess: () => {
                    navigate(`/institution/students/${studentPublicId}`);
                },
            }
        );
    };

    return (
        <div className="container-fluid px-4 px-lg-5 py-4">

            {/* HEADER */}

            <div className="mb-4">

                <div className="d-flex align-items-center gap-2 mb-2">
                    <button
                        type="button"
                        className="btn btn-sm btn-light border"
                        onClick={() => navigate(-1)}
                        aria-label="Volver"
                    >
                        <i className="bi bi-arrow-left"></i>
                    </button>

                    <span className="text-muted small">
                        Estudiantes
                    </span>

                    <i className="bi bi-chevron-right text-muted small"></i>

                    <span className="text-muted small">
                        Perfil académico
                    </span>

                    <i className="bi bi-chevron-right text-muted small"></i>

                    <span className="small fw-semibold">
                        Crear
                    </span>
                </div>

                <div className="d-flex align-items-start justify-content-between gap-4">

                    <div>
                        <h2 className="fw-bold mb-2">
                            Crear perfil académico
                        </h2>

                        <p className="text-muted mb-0">
                            Registra la información académica inicial del estudiante.
                        </p>
                    </div>

                    <div className="d-none d-md-flex align-items-center gap-2 text-muted">
                        <i className="bi bi-person-vcard fs-4"></i>
                        <span className="small">
                            Información académica
                        </span>
                    </div>

                </div>

            </div>


            {/* FORMULARIO */}

            <div className="row">

                <div className="col-12">

                    <div className="card border-0 shadow-sm">

                        <div className="card-header bg-white border-bottom py-3 px-4">

                            <div className="d-flex align-items-center gap-3">

                                <div
                                    className="d-flex align-items-center justify-content-center bg-primary-subtle text-primary rounded"
                                    style={{
                                        width: "42px",
                                        height: "42px",
                                    }}
                                >
                                    <i className="bi bi-mortarboard fs-5"></i>
                                </div>

                                <div>
                                    <h5 className="fw-semibold mb-1">
                                        Información académica
                                    </h5>

                                    <small className="text-muted">
                                        Complete los datos principales del perfil.
                                    </small>
                                </div>

                            </div>

                        </div>

                        <div className="card-body p-4 p-lg-5">

                            <AcademicProfileForm
                                onSubmit={handleSubmit}
                                loading={createMutation.isPending}
                                onCancel={() => navigate(-1)}
                            />

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

