import PublicPageHero from "../components/how-it-works/PublicPageHero";
import HowItWorksStep from "../components/how-it-works/HowItWorksStep";
import BlockchainBenefits from "../components/how-it-works/BlockchainBenefits";
import PublicCtaSection from "../components/how-it-works/PublicCtaSection";

import { certificationSteps } from "../utils/howItWorksContent";

import "../styles/howItWorks.css";

export default function HowItWorksPage() {
    return (
        <div className="public-page">
        <PublicPageHero
            eyebrow="Cómo funciona Cervalid"
            title="El proceso de certificación con Blockchain"
            description="Cervalid utiliza tecnología blockchain para aportar integridad, trazabilidad y verificabilidad al proceso de certificación académica."
        />

        <main>
            <section className="how-it-works-process-section">
            <div className="container">
                <div className="public-section-heading">
                <span className="public-section-eyebrow">Proceso</span>

                <h2>Del registro a la verificación</h2>

                <p>
                    Un proceso diseñado para que instituciones, estudiantes y
                    empresas puedan confiar en la información académica.
                </p>
                </div>

                <div className="how-it-works-process">
                {certificationSteps.map((step, index) => (
                    <HowItWorksStep key={step.number} {...step} />
                ))}
                </div>
            </div>
            </section>

            <BlockchainBenefits />

            <PublicCtaSection
            title="¿Listo para comenzar?"
            description="Descubre cómo Cervalid puede ayudarte a verificar y gestionar certificaciones académicas."
            primaryLabel="Probar verificación"
            primaryTo="/verify"
            secondaryLabel="Solicitar incorporación"
            secondaryTo="/institution-requests"
            />
        </main>
        </div>
    );
}
