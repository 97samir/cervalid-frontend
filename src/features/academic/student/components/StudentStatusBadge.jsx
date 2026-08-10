export default function StudentStatusBadge({ status }) {

    const color =
        status === "Activo" ? "success"
        : status === "Inactivo" ? "danger"
        : status === "Graduado"? "success"
        : status === "Suspendido"? "danger"
        : status === "Pendiente"? "warning"

        : "secondary";


        
    return (
        <span className={`badge bg-${color}`}>
        {status}
        </span>
    );
}