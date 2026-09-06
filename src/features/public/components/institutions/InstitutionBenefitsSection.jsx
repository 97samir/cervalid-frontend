const benefits = [
    {
        icon: "bi-shield-check",
        title: "Reduce el fraude académico",
        description:
        "Protege tus certificados mediante registros verificables y mecanismos de integridad que dificultan su falsificación o alteración.",
    },
    {
        icon: "bi-lightning-charge",
        title: "Agiliza la emisión",
        description:
        "Digitaliza el proceso de certificación y reduce tareas manuales relacionadas con emisión, almacenamiento y verificación.",
    },
    {
        icon: "bi-diagram-3",
        title: "Trazabilidad académica",
        description:
        "Mantén un historial estructurado de los eventos académicos relevantes asociados a cada estudiante.",
    },
    {
        icon: "bi-patch-check",
        title: "Verificación 24/7",
        description:
        "Permite que empresas y terceros comprueben la autenticidad de los certificados sin depender de procesos manuales.",
    },
    {
        icon: "bi-bar-chart",
        title: "Mayor visibilidad",
        description:
        "Obtén información centralizada sobre certificados, estudiantes, verificaciones y actividad académica.",
    },
    {
        icon: "bi-building-check",
        title: "Fortalece tu reputación",
        description:
        "Demuestra compromiso con la innovación, transparencia y transformación digital de tus procesos académicos.",
    },
];

export default function InstitutionBenefitsSection() {
    return (
        <section className="institutions-benefits section-padding">
        <div className="container">
            <div className="section-heading text-center">
            <span className="section-eyebrow">BENEFICIOS</span>

            <h2>
                Una plataforma pensada para
                <span> instituciones modernas</span>
            </h2>

            <p>
                Cervalid centraliza la gestión de certificados y facilita su
                verificación desde cualquier lugar.
            </p>
            </div>

            <div className="row g-4 mt-4">
            {benefits.map((benefit) => (
                <div className="col-md-6 col-xl-4" key={benefit.title}>
                <article className="institution-benefit-card">
                    <div className="institution-benefit-icon">
                    <i className={`bi ${benefit.icon}`}></i>
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
