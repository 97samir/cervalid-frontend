import { Link } from "react-router-dom";

export default function VerificationTimeline({ 
    result 
}) {
    const { verificationType, resourcePublicId } = result;

    if (!resourcePublicId) {
        return null;
    }

    const timelinePath =
        verificationType === "CREDENTIAL"
        ? `/verify/credential/${resourcePublicId}/timeline`
        : `/verify/${resourcePublicId}/timeline`;

    const resourceLabel =
        verificationType === "CREDENTIAL" ? "credencial" : "certificado";

    return (
        <div className="verification-timeline-link">
        <div className="verification-timeline-link-content">
            <div className="verification-timeline-link-icon">
            <i className="bi bi-clock-history" aria-hidden="true" />
            </div>

            <div>
            <h5>Consulta la trayectoria académica</h5>

            <p>
                Revisa los principales eventos registrados durante la trayectoria
                asociada a este {resourceLabel}.
            </p>
            </div>
        </div>

        <Link to={timelinePath} className="btn btn-outline-primary">
            Ver trayectoria
            <i className="bi bi-arrow-right ms-2" aria-hidden="true" />
        </Link>
        </div>
    );
}
