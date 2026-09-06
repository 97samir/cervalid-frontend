const plans = [
    {
        name: "Gratuito",
        price: "$0",
        description: "Para comenzar a verificar credenciales.",
        features: [
        "10 verificaciones al mes",
        "Verificación básica",
        "Historial limitado",
        ],
        button: "Probar gratis",
        highlighted: false,
    },
    {
        name: "Profesional",
        price: "$49",
        description: "Para equipos de selección que verifican regularmente.",
        features: [
        "100 verificaciones al mes",
        "Verificación completa",
        "Historial ilimitado",
        "Reportes",
        "Soporte prioritario",
        ],
        button: "Empezar ahora",
        highlighted: true,
    },
    {
        name: "Enterprise",
        price: "Personalizado",
        description: "Para organizaciones con grandes volúmenes de verificación.",
        features: [
        "Verificaciones ilimitadas",
        "Todas las funcionalidades",
        "API",
        "Integraciones",
        "Account manager",
        ],
        button: "Contactar",
        highlighted: false,
    },
];

export default function CompanyPlansSection() {
    return (
        <section id="planes" className="companies-plans section-padding">
        <div className="container">
            <div className="section-heading text-center">
            <span className="section-eyebrow">PLANES</span>

            <h2>Elige el plan que necesitas.</h2>

            <p>
                Comienza verificando credenciales y escala cuando tu equipo lo
                necesite.
            </p>
            </div>

            <div className="row g-4 justify-content-center mt-4">
            {plans.map((plan) => (
                <div className="col-md-6 col-lg-4" key={plan.name}>
                <article
                    className={`plan-card ${
                    plan.highlighted ? "plan-card-highlighted" : ""
                    }`}
                >
                    {plan.highlighted && (
                    <span className="plan-badge">MÁS POPULAR</span>
                    )}

                    <h3>{plan.name}</h3>

                    <p className="plan-description">{plan.description}</p>

                    <div className="plan-price">{plan.price}</div>

                    <ul className="plan-features">
                    {plan.features.map((feature) => (
                        <li key={feature}>
                        <i className="bi bi-check-circle-fill"></i>
                        <span>{feature}</span>
                        </li>
                    ))}
                    </ul>

                    <a
                    href="#contact"
                    className={`btn w-100 ${
                        plan.highlighted ? "btn-primary" : "btn-outline-primary"
                    }`}
                    >
                    {plan.button}
                    </a>
                </article>
                </div>
            ))}
            </div>
        </div>
        </section>
    );
}
