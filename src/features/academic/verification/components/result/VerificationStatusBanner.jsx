import VerificationLevelBadge from "../VerificationLevelBadge";

const getStatusConfig = (status) => {
    switch (status) {
        case "VALID":
        return {
            className: "verification-banner-success",
            icon: "bi-patch-check-fill",
        };

        case "REVOKED":
        return {
            className: "verification-banner-warning",
            icon: "bi-exclamation-triangle-fill",
        };

        default:
        return {
            className: "verification-banner-danger",
            icon: "bi-x-circle-fill",
        };
    }
};

const getStatusTitle = (status, verificationType) => {
    const resource =
        verificationType === 
        "CREDENTIAL" ? 
        "Credencial" : 
        "Certificado";

    switch (status) {
        case "VALID":
        return `${resource} válida`;

        case "REVOKED":
        return `${resource} revocada`;

        case "NOT_FOUND":
        return `${resource} no encontrada`;

        default:
        return `${resource} no válida`;
    }
};

const getStatusMessage = (status, verificationType) => {
    const resource =
        verificationType === "CREDENTIAL" ? "credencial" : "certificado";

    switch (status) {
        case "VALID":
        return `El ${resource} se encuentra registrado y sus datos coinciden con la información almacenada en CERVALID.`;

        case "REVOKED":
        return `El ${resource} fue registrado anteriormente, pero actualmente se encuentra revocado por la institución.`;

        case "NOT_FOUND":
        return `No se encontró un ${resource} válido que coincida con los datos proporcionados.`;

        default:
        return `No se pudo validar el ${resource} con la información proporcionada.`;
    }
};

export default function VerificationStatusBanner({ 
    result 
}) {

    const { 
        status, 
        verificationType, 
        verificationLevel 
    } = result;

    const config = getStatusConfig(status);
    const title = getStatusTitle(status, verificationType);
    const message = getStatusMessage(status, verificationType);

    return (
        <div className={`verification-banner ${config.className}`}>
        <div className="verification-status-icon">
            <i className={`bi ${config.icon}`} aria-hidden="true" />
        </div>

        <div className="flex-grow-1">
            <div className="d-flex flex-wrap align-items-center gap-2 mb-1">
            <h4 className="verification-result-title mb-0">{title}</h4>

            {verificationLevel && (
                <VerificationLevelBadge level={verificationLevel} />
            )}
            </div>

            <p className="mb-0">{message}</p>
        </div>
        </div>
    );
}
