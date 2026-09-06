import { blockchainBenefits } from "../../utils/howItWorksContent";

export default function BlockchainBenefits() {
    return (
        <section
        className="blockchain-benefits-section"
        aria-labelledby="blockchain-benefits-title"
        >
        <div className="container">
            <div className="public-section-heading">
            <span className="public-section-eyebrow">Tecnología</span>

            <h2 id="blockchain-benefits-title">¿Por qué Blockchain?</h2>

            <p>
                Cervalid utiliza blockchain como una capa de confianza para proteger
                la integridad de los registros y facilitar su verificación.
            </p>
            </div>

            <div className="row g-4">
            {blockchainBenefits.map((benefit) => (
                <div className="col-12 col-md-4" key={benefit.title}>
                <article className="blockchain-benefit-card">
                    <div className="blockchain-benefit-icon">
                    <i className={`bi ${benefit.icon}`} aria-hidden="true"></i>
                    </div>

                    <h3>{benefit.title}</h3>

                    <p>{benefit.description}</p>
                </article>
                </div>
            ))}
            </div>
        </div>
        </section>
    );
}
