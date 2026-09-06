import { getRoleLabel } from "@/shared/utils/roleUtils";

const AdminUserInfoCard = ({ user }) => {
    
    return (
        <div className="card border-0 shadow-sm mb-4">
        {/* HEADER */}
        <div className="card-header bg-white py-3 border-bottom">
            <h5 className="mb-0 fw-bold">
            <i className="bi bi-person-vcard me-2 text-primary"></i>
            Datos generales
            </h5>
        </div>

        {/* BODY */}
        <div className="card-body p-4">
            <div className="row g-4">
            {/* COLUMNA IZQUIERDA */}
            <div className="col-md-6">
                <div className="mb-3">
                <small className="text-muted d-block">Nombres</small>

                <span className="fw-semibold">{user?.name || "-"}</span>
                </div>

                <div className="mb-3">
                <small className="text-muted d-block">Apellidos</small>

                <span className="fw-semibold">{user?.lastName || "-"}</span>
                </div>

                <div>
                <small className="text-muted d-block">Documento</small>

                <span className="fw-semibold">{user?.document || "-"}</span>
                </div>
            </div>

            {/* COLUMNA DERECHA */}
            <div className="col-md-6">
                <div className="mb-3">
                <small className="text-muted d-block">Correo electrónico</small>

                <span className="fw-semibold text-break">
                    {user?.email || "-"}
                </span>
                </div>

                <div className="mb-3">
                <small className="text-muted d-block">Teléfono</small>

                <span className="fw-semibold">{user?.phone || "-"}</span>
                </div>

                <div>
                <small className="text-muted d-block">Rol</small>

                <span className="fw-semibold">{getRoleLabel(user?.role)}</span>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
};

export default AdminUserInfoCard;
