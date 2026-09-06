import { getRoleLabel } from "@/shared/utils/roleUtils";

const UsersFilters = ({
    activeFilter,
    roleFilter,
    institutionFilter,
    institutions,
    isSuperAdminGlobal,
    onActiveChange,
    onRoleChange,
    onInstitutionChange,
}) => {
    return (
        <div className="card border-0 shadow-sm mb-4">
        <div className="card-body p-4">
            <div className="d-flex align-items-center mb-3">
            <div
                className="d-flex align-items-center justify-content-center rounded-3 bg-primary bg-opacity-10 text-primary me-3"
                style={{
                width: "40px",
                height: "40px",
                }}
            >
                <i className="bi bi-funnel"></i>
            </div>

            <div>
                <h6 className="fw-bold mb-0">Filtros</h6>

                <small className="text-muted">
                Filtra los usuarios que deseas consultar
                </small>
            </div>
            </div>

            <div className="row g-3">

            {/* INSTITUCIÓN - SOLO SUPER ADMIN */}
            {isSuperAdminGlobal && (
                <div className="col-12 col-md-4">
                <label className="form-label small fw-semibold">
                    Institución
                </label>

                <select
                    className="form-select"
                    value={institutionFilter}
                    onChange={(e) => onInstitutionChange(e.target.value)}
                >
                    <option value="">Todas las instituciones</option>

                    {institutions.map((institution) => (
                    <option key={institution.id} value={institution.id}>
                        {institution.name}
                    </option>
                    ))}
                </select>
                </div>
            )}

            {/* ROL */}
            <div
                className={
                isSuperAdminGlobal ? "col-12 col-md-4" : "col-12 col-md-6"
                }
            >
                <label className="form-label small fw-semibold">Rol</label>

                <select
                className="form-select"
                value={roleFilter}
                onChange={(e) => onRoleChange(e.target.value)}
                >
                    <option value="">Todos los roles</option>

                    <option value="STUDENT">
                        {getRoleLabel("STUDENT")}
                    </option>

                    <option value="INSTITUTION_ADMIN">
                        {getRoleLabel("INSTITUTION_ADMIN")}
                    </option>

                    <option value="INSTITUTION_SUBADMIN">
                        {getRoleLabel("INSTITUTION_SUBADMIN")}
                    </option>
                </select>
            </div>

            {/* ESTADO */}
            <div
                className={
                isSuperAdminGlobal ? "col-12 col-md-4" : "col-12 col-md-6"
                }
            >
                <label className="form-label small fw-semibold">Estado</label>

                <select
                className="form-select"
                value={activeFilter === "" ? "" : String(activeFilter)}
                onChange={(e) => {
                    const value = e.target.value;

                    onActiveChange(value === "" ? "" : value === "true");
                }}
                >
                <option value="">Todos</option>
                <option value="true">Activos</option>
                <option value="false">Inactivos</option>
                </select>
            </div>
            </div>
        </div>
        </div>
    );
};

export default UsersFilters;
