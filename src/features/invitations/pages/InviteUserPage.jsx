import InviteUserForm from "../components/InviteUserForm";

const InviteUserPage = () => {
    return (
        <div className="container-fluid px-4 py-0">
        {/* HEADER */}

        <div className="mb-4">
            <div className="d-flex align-items-center gap-3">
            <div
                className="d-flex align-items-center justify-content-center rounded-3 bg-primary bg-opacity-10 text-primary flex-shrink-0"
                style={{
                width: "48px",
                height: "48px",
                }}
            >
                <i className="bi bi-person-plus fs-4"></i>
            </div>

            <div>
                <h4 className="fw-bold mb-1">Invitar usuario</h4>

                <p className="text-muted mb-0">
                Invita nuevos usuarios para que formen parte de tu institución en
                Cervalid.
                </p>
            </div>
            </div>
        </div>

        {/* CONTENIDO */}

        <div className="row g-4">
            {/* FORMULARIO */}

            <div className="col-12 col-lg-7 col-xl-8">
            <div className="card border-0 shadow-sm">
                <div className="card-header bg-white border-bottom py-3">
                <h5 className="fw-semibold mb-0">Datos de la invitación</h5>
                </div>

                <div className="card-body p-4">
                <InviteUserForm />
                </div>
            </div>
            </div>

            {/* INFORMACIÓN LATERAL */}

            <div className="col-12 col-lg-5 col-xl-4">
            <div className="card border-0 shadow-sm">
                <div className="card-body p-4">
                <h5 className="fw-semibold mb-4">¿Cómo funciona?</h5>

                <div className="d-flex gap-3 mb-4">
                    <div
                    className="d-flex align-items-center justify-content-center rounded-circle bg-primary bg-opacity-10 text-primary flex-shrink-0"
                    style={{
                        width: "36px",
                        height: "36px",
                    }}
                    >
                    <strong>1</strong>
                    </div>

                    <div>
                    <h6 className="fw-semibold mb-1">Ingresa el correo</h6>

                    <p className="text-muted small mb-0">
                        Introduce el correo electrónico de la persona que deseas
                        invitar.
                    </p>
                    </div>
                </div>

                <div className="d-flex gap-3 mb-4">
                    <div
                    className="d-flex align-items-center justify-content-center rounded-circle bg-primary bg-opacity-10 text-primary flex-shrink-0"
                    style={{
                        width: "36px",
                        height: "36px",
                    }}
                    >
                    <strong>2</strong>
                    </div>

                    <div>
                    <h6 className="fw-semibold mb-1">Selecciona un rol</h6>

                    <p className="text-muted small mb-0">
                        Define los permisos que tendrá dentro de la institución.
                    </p>
                    </div>
                </div>

                <div className="d-flex gap-3">
                    <div
                    className="d-flex align-items-center justify-content-center rounded-circle bg-primary bg-opacity-10 text-primary flex-shrink-0"
                    style={{
                        width: "36px",
                        height: "36px",
                    }}
                    >
                    <strong>3</strong>
                    </div>

                    <div>
                    <h6 className="fw-semibold mb-1">
                        El usuario recibe la invitación
                    </h6>

                    <p className="text-muted small mb-0">
                        El usuario podrá aceptar la invitación y activar su cuenta.
                    </p>
                    </div>
                </div>
                </div>
            </div>

            {/* ROLES */}

            <div className="card border-0 shadow-sm mt-4">
                <div className="card-body p-4">
                <h6 className="fw-semibold mb-3">Roles disponibles</h6>

                <div className="d-flex flex-column gap-2">
                    <div className="d-flex align-items-center gap-2">
                    <i className="bi bi-person-badge text-primary"></i>

                    <span className="small">Administrador Institucional</span>
                    </div>

                    <div className="d-flex align-items-center gap-2">
                    <i className="bi bi-person-gear text-primary"></i>

                    <span className="small">Subadministrador</span>
                    </div>

                    <div className="d-flex align-items-center gap-2">
                    <i className="bi bi-mortarboard text-primary"></i>

                    <span className="small">Estudiante</span>
                    </div>

                    <div className="d-flex align-items-center gap-2">
                    <i className="bi bi-search text-primary"></i>

                    <span className="small">Reclutador</span>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
};

export default InviteUserPage;
