import { changeInstitutionStatus } from "../api/institutionApi";
import { confirmAction, successAlert } from "@/core/utils/alerts";

const InstitutionStatusToggle = ({ institution, refresh }) => {

    const handleToggle = async () => {

        const confirmed = await confirmAction(
                `¿Desea cambiar el estado?`
                );

                if (!confirmed) return;

        await changeInstitutionStatus(
            institution.id,
            !institution.active
        );

        successAlert("Estado actualizado");
        refresh();
    };

    return (
        <button
            className={`btn btn-sm ${
                institution.active ? "btn-success" : "btn-secondary"
            }`}
            onClick={handleToggle}
        >
            {institution.active ? "Activa" : "Inactiva"}
        </button>
    );
};

export default InstitutionStatusToggle;