import { changeUserStatus } from "../api/userApi";
import { confirmAction, successAlert } from "../../../core/utils/alerts";

const UserStatusToggle = ({ user, refresh }) => {

    const handleToggle = async () => {

        const confirmed = await confirmAction(
            "¿Deseas cambiar el estado del usuario?"
        );

        if (!confirmed) return;

        try {
            await changeUserStatus(
                user.institutionUserId,
                !user.active
            );

            successAlert("Estado actualizado");
            refresh();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <button
            className={`btn ${user.active ? "btn-success" : "btn-secondary"}`}
            onClick={handleToggle}
        >
            {user.active ? "Activo" : "Inactivo"}
        </button>
    );
};

export default UserStatusToggle;