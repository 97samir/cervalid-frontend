import { getRoleLabel } from "@/shared/utils/roleUtils";

const UserInfoCard = ({ user, institution }) => {
    return (
        <div className="card border-0 shadow-sm mb-4">

            {/* HEADER */}
            <div className="card-header bg-white py-3 border-bottom">
                <div className="d-flex align-items-center">

                    <div
                        className="d-flex align-items-center justify-content-center rounded-3 bg-primary bg-opacity-10 text-primary me-3"
                        style={{
                            width: "42px",
                            height: "42px",
                        }}
                    >
                        <i className="bi bi-person-vcard fs-5"></i>
                    </div>

                    <div>
                        <h5 className="mb-1 fw-bold">
                            Datos generales
                        </h5>

                        <small className="text-muted">
                            Información de tu cuenta y acceso
                        </small>
                    </div>

                </div>
            </div>

            {/* BODY */}
            <div className="card-body p-4">

                <div className="row g-4">

                    {/* COLUMNA IZQUIERDA */}
                    <div className="col-md-6">

                        <div className="mb-4">
                            <small className="text-muted d-block mb-1">
                                Nombres
                            </small>

                            <span className="fw-semibold">
                                {user?.name || "-"}
                            </span>
                        </div>

                        <div className="mb-4">
                            <small className="text-muted d-block mb-1">
                                Apellidos
                            </small>

                            <span className="fw-semibold">
                                {user?.lastName || "-"}
                            </span>
                        </div>

                        <div>
                            <small className="text-muted d-block mb-1">
                                Documento
                            </small>

                            <span className="fw-semibold">
                                {user?.document || "-"}
                            </span>
                        </div>

                    </div>

                    {/* COLUMNA DERECHA */}
                    <div className="col-md-6">

                        <div className="mb-4">
                            <small className="text-muted d-block mb-1">
                                Correo electrónico
                            </small>

                            <span className="fw-semibold text-break">
                                {user?.email || "-"}
                            </span>
                        </div>

                        <div className="mb-4">
                            <small className="text-muted d-block mb-1">
                                Teléfono
                            </small>

                            <span className="fw-semibold">
                                {user?.phone || "-"}
                            </span>
                        </div>

                        <div>
                            <small className="text-muted d-block mb-1">
                                Rol
                            </small>

                            <span className="badge bg-primary bg-opacity-10 text-primary fw-semibold">
                                {getRoleLabel(user?.role)}
                            </span>
                        </div>

                    </div>

                </div>

                {/* CONTEXTO INSTITUCIONAL */}
                <hr className="my-4" />

                <div>
                    <small className="text-muted d-block mb-2">
                        Institución
                    </small>

                    <div className="d-flex align-items-center">

                        <div
                            className="d-flex align-items-center justify-content-center rounded-3 bg-light me-3"
                            style={{
                                width: "42px",
                                height: "42px",
                            }}
                        >
                            <i className="bi bi-building text-secondary"></i>
                        </div>

                        <div>
                            <div className="fw-semibold">
                                {institution?.name ||
                                    user?.institutionName ||
                                    "-"}
                            </div>

                            <small className="text-muted">
                                Institución asociada a tu cuenta
                            </small>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default UserInfoCard;