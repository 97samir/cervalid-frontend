export default function HowItWorksStep({
    number,
    icon,
    title,
    description,
    highlights,
}) {
    return (
        <article className="how-it-works-step">
        <div className="how-it-works-step-number">{number}</div>

        <div className="how-it-works-step-icon">
            <i className={`bi ${icon}`} aria-hidden="true"></i>
        </div>

        <div className="how-it-works-step-content">
            <h3>{title}</h3>

            <p className="how-it-works-step-description">{description}</p>

            <ul className="how-it-works-highlights">
            {highlights.map((highlight) => (
                <li key={highlight}>
                <i className="bi bi-check-circle-fill" aria-hidden="true"></i>

                <span>{highlight}</span>
                </li>
            ))}
            </ul>
        </div>
        </article>
    );
}
