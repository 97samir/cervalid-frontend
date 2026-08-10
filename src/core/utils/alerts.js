import Swal from "sweetalert2";

export const confirmAction = async (text) => {

    const result = await Swal.fire({
        title: "¿Estás seguro?",
        text,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, continuar"
    });

    return result.isConfirmed;
};

export const successAlert = (text) => {
    Swal.fire("Éxito", text, "success");
};

export const errorAlert = (text) => {
    Swal.fire("Error", text, "error");
};