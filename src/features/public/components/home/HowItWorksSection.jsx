import { Link } from "react-router-dom";

import { howItWorksOverview } from "../../utils/howItWorksContent";

export default function HowItWorksSection() {
    return (
        <section className="how-it-works-section">
        <div className="container">
            <div className="section-heading text-center">
            <span className="section-eyebrow">CÓMO FUNCIONA</span>

            <h2>
                De la emisión a la verificación
                <span> en tres pasos.</span>
            </h2>

            <p>
                Un proceso sencillo para instituciones y una experiencia de
                verificación rápida para terceros.
            </p>
            </div>

            <div className="how-it-works-overview">
            {howItWorksOverview.map((step, index) => (
                <div className="overview-step" key={step.number}>
                <div className="overview-step-number">{step.number}</div>

                <div className="overview-step-icon">
                    <i className={`bi ${step.icon}`} aria-hidden="true"></i>
                </div>

                <h3>{step.title}</h3>

                <p>{step.description}</p>

                {index < howItWorksOverview.length - 1 && (
                    <div className="overview-step-connector" aria-hidden="true">
                    <i className="bi bi-arrow-right"></i>
                    </div>
                )}
                </div>
            ))}
            </div>

            <div className="how-it-works-section-action">
            <Link to="/how-it-works" className="btn public-btn-outline">
                Conoce el proceso completo
                <i className="bi bi-arrow-right ms-2" aria-hidden="true"></i>
            </Link>
            </div>
        </div>
        </section>
    );
}
