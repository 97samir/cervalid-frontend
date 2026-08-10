const UserInfoCard = ({ user, institution }) => {
    return (
        <div className="card mb-4 shadow-sm">
        <div className="card-body">
            <h5 className="card-title">Datos generales</h5>

            <p className="mb-1">
            <strong>Nombres:</strong> {user?.name}
            </p>

            <p className="mb-1">
            <strong>Apellidos:</strong> {user?.lastName}
            </p>

            <p className="mb-1">
            <strong>Email:</strong> {user?.email}
            </p>

            <p className="mb-1">
            <strong>DNI / CE:</strong>{" "}
            {user?.documentType} - {user?.document}
            </p>

            <p className="mb-1">
            <strong>Teléfono:</strong> {user?.phone}
            </p>

            <p className="mb-1">
            <strong>Institución ID:</strong> {user?.institutionId}
            </p>

            <p className="mb-1">
            <strong>Institución:</strong>{" "}
            {institution?.name || "Cargando..."}
            </p>

            <p className="mb-1">
            <strong>Rol:</strong> {user?.role}
            </p>
        </div>
        </div>
    );
};

export default UserInfoCard;