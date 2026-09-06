import UserRoleSelect from "./UserRoleSelect";
import UserStatusToggle from "./UserStatusToggle";

const UsersTable = ({ users, refresh }) => {

    if (!users || users.length === 0) {
        return (
            <div className="card border-0 shadow-sm">
                <div className="card-body text-center py-5">

                    <i className="bi bi-people fs-1 text-muted"></i>

                    <h5 className="mt-3 mb-1">
                        No hay usuarios
                    </h5>

                    <p className="text-muted mb-0">
                        No se encontraron usuarios para mostrar.
                    </p>

                </div>
            </div>
        );
    }

    return (
        <div className="card border-0 shadow-sm">

            <div className="card-body p-0">

                <div className="table-responsive">

                    <table className="table table-hover align-middle mb-0">

                        <thead className="table-light">

                            <tr>

                                <th className="px-4">
                                    Usuario
                                </th>

                                <th>
                                    Email
                                </th>

                                <th>
                                    Documento
                                </th>

                                <th>
                                    Teléfono
                                </th>

                                <th style={{ minWidth: "190px" }}>
                                    Rol
                                </th>

                                <th style={{ minWidth: "120px" }}>
                                    Estado
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {users.map((user) => (

                                <tr key={user.institutionUserId}>

                                    {/* USUARIO */}
                                    <td className="px-4">

                                        <div className="d-flex align-items-center gap-3">

                                            <div
                                                className="d-flex align-items-center justify-content-center rounded-circle bg-primary bg-opacity-10 text-primary fw-semibold"
                                                style={{
                                                    width: "40px",
                                                    height: "40px",
                                                    flexShrink: 0
                                                }}
                                            >
                                                {user.name?.charAt(0)}
                                            </div>

                                            <div>

                                                <div className="fw-semibold">
                                                    {user.name} {user.lastName}
                                                </div>

                                                <small className="text-muted">
                                                    ID: {user.institutionUserId}
                                                </small>

                                            </div>

                                        </div>

                                    </td>

                                    {/* EMAIL */}
                                    <td>

                                        <span className="text-break">
                                            {user.email || "-"}
                                        </span>

                                    </td>

                                    {/* DOCUMENTO */}
                                    <td>
                                        {user.document || "-"}
                                    </td>

                                    {/* TELÉFONO */}
                                    <td>
                                        {user.phone || "-"}
                                    </td>

                                    {/* ROL */}
                                    <td>

                                        <UserRoleSelect
                                            user={user}
                                            refresh={refresh}
                                        />

                                    </td>

                                    {/* ESTADO */}
                                    <td>

                                        <UserStatusToggle
                                            user={user}
                                            refresh={refresh}
                                        />

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    );
};

export default UsersTable;