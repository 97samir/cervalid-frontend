const benefits = [
    {
        icon: "bi-lightning-charge",
        title: "Verificación rápida",
        description:
        "Consulta la autenticidad de una credencial en cuestión de segundos.",
    },
    {
        icon: "bi-shield-check",
        title: "Mayor confianza",
        description: "Obtén información respaldada por registros verificables.",
    },
    {
        icon: "bi-qr-code-scan",
        title: "Verificación mediante QR",
        description:
        "Escanea el código QR del certificado para acceder directamente a su información.",
    },
    {
        icon: "bi-clock-history",
        title: "Disponible 24/7",
        description:
        "Verifica certificados sin depender del horario de atención de la institución.",
    },
    {
        icon: "bi-graph-up-arrow",
        title: "Procesos más eficientes",
        description:
        "Reduce tareas administrativas asociadas a la validación manual.",
    },
    {
        icon: "bi-database-check",
        title: "Información trazable",
        description:
        "Consulta información académica relacionada con el proceso de certificación.",
    },
];

export default function CompanyBenefitsSection() {
    return (
        <section className="companies-benefits section-padding">
        <div className="container">
            <div className="section-heading text-center">
            <span className="section-eyebrow">BENEFICIOS</span>

            <h2>Una forma más confiable de verificar.</h2>

            <p>
                Cervalid simplifica la validación de credenciales académicas durante
                tus procesos de selección.
            </p>
            </div>

            <div className="row g-4 mt-4">
            {benefits.map((benefit) => (
                <div className="col-md-6 col-lg-4" key={benefit.title}>
                <article className="benefit-card">
                    <div className="benefit-icon">
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
