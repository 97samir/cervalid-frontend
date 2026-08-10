import { updateUserRole } from "../api/userApi";
import { confirmAction, successAlert } from "../../../core/utils/alerts";

const UserRoleSelect = ({ user, refresh }) => {

    const handleChange = async (e) => {

        const selectedRole = e.target.value;

        const confirmed = await confirmAction(
            `¿Cambiar rol a ${selectedRole}?`
        );

        if (!confirmed) return;
        
        try {

            await updateUserRole(
                user.id, 
                selectedRole, 
                user.institutionId);

            successAlert("Rol actualizado");
            refresh();
            
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <select
            className="form-select"
            value={user.role}
            onChange={handleChange}
        >
            <option value="STUDENT">Student</option>
            <option value="INSTITUTION_ADMIN">Admin</option>
            <option value="INSTITUTION_SUBADMIN">SubAdmin</option>
        </select>
    );
};

export default UserRoleSelect;