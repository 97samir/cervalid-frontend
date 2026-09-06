import { Link } from "react-router-dom";

export default function PublicCtaSection({
    title,
    description,
    primaryLabel,
    primaryTo,
    secondaryLabel,
    secondaryTo,
}) {
    return (
        <section className="public-cta-section">
        <div className="container">
            <div className="public-cta">
            <div className="public-cta-content">
                <h2>{title}</h2>

                <p>{description}</p>
            </div>

            <div className="public-cta-actions">
                {primaryLabel && primaryTo && (
                <Link to={primaryTo} className="btn btn-light">
                    {primaryLabel}
                </Link>
                )}

                {secondaryLabel && secondaryTo && (
                <Link to={secondaryTo} className="btn btn-outline-light">
                    {secondaryLabel}
                </Link>
                )}
            </div>
            </div>
        </div>
        </section>
    );
}
