import UserRoleSelect from "./UserRoleSelect";
import UserStatusToggle from "./UserStatusToggle";

const UsersTable = ({ users, refresh }) => {

    return (
        <table className="table table-bordered">
            <thead>
                <tr>
                    <th>Nombres y Apellidos</th>
                    <th>Email</th>
                    <th>DNI / CE</th>
                    <th>Teléfono</th>
                    <th>Rol</th>
                    <th>Estado</th>
                </tr>
            </thead>
            <tbody>
                {users.map(user => (
                    <tr key={user.institutionUserId}>
                        <td>{user.name} {user.lastName}</td>
                        <td>{user.email}</td>
                        <td>{user.document}</td>
                        <td>{user.phone}</td>

                        <td>
                            <UserRoleSelect user={user} refresh={refresh} />
                        </td>

                        <td>
                            <UserStatusToggle user={user} refresh={refresh} />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default UsersTable;