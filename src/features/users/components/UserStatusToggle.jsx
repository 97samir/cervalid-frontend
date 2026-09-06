import { changeUserStatus } from "../api/userApi";
import { confirmAction, successAlert } from "@/core/utils/alerts";

const UserStatusToggle = ({ user, refresh }) => {
    const handleToggle = async () => {
        const newStatus = !user.active;

        const confirmed = await confirmAction(
        newStatus
            ? `¿Activar a ${user.name} ${user.lastName}?`
            : `¿Desactivar a ${user.name} ${user.lastName}?`,
        );

        if (!confirmed) return;

        try {
        await changeUserStatus(user.institutionUserId, newStatus);

        successAlert(
            newStatus
            ? "Usuario activado correctamente"
            : "Usuario desactivado correctamente",
        );

        refresh();
        } catch (error) {
        console.error("Error actualizando estado:", error);
        }
    };

    return (
        <button
        type="button"
        className={`btn btn-sm ${
            user.active ? "btn-success" : "btn-outline-secondary"
        }`}
        onClick={handleToggle}
        title={user.active ? "Desactivar usuario" : "Activar usuario"}
        >
        <i
            className={`bi ${user.active ? "bi-check-circle" : "bi-circle"} me-1`}
        ></i>

        {user.active ? "Activo" : "Inactivo"}
        </button>
    );
};

export default UserStatusToggle;
