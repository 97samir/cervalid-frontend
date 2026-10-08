export default function VerificationEmptyReference({
    title = "Sin información registrada",
    description = "No se encontró información para este apartado.",
}) {
    return (
        <div className="verification-empty-reference">
            <div className="verification-empty-reference-icon">
                <i
                    className="bi bi-info-circle"
                    aria-hidden="true"
                />
            </div>

            <div>
                <h6 className="verification-empty-reference-title">
                    {title}
                </h6>

                <p className="verification-empty-reference-description">
                    {description}
                </p>
            </div>
        </div>
    );
}