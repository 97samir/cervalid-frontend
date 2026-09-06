const benefits = [
    {
        icon: "bi-shield-lock-fill",
        title: "Protección contra Fraude",
        description:
        "Tus certificados están protegidos mediante tecnología blockchain, dificultando su falsificación o alteración.",
    },
    {
        icon: "bi-lightning-charge-fill",
        title: "Acceso Instantáneo",
        description:
        "Accede a tus certificados desde cualquier lugar y en cualquier momento desde tu dashboard personal.",
    },
    {
        icon: "bi-share-fill",
        title: "Fácil Compartir",
        description:
        "Comparte tus certificados mediante un enlace o código QR para que puedan ser verificados en segundos.",
    },
    {
        icon: "bi-person-check-fill",
        title: "Sin Costo",
        description:
        "El acceso para estudiantes es gratuito. Solo necesitas activar tu cuenta cuando tu institución te registre.",
    },
];

export default function StudentBenefitsSection() {
    return (
        <section className="students-benefits section-padding">
        <div className="container">
            <div className="section-heading text-center">
            <span className="section-eyebrow">BENEFICIOS</span>

            <h2>Todo lo que necesitas para respaldar tus logros</h2>

            <p>
                Cervalid te permite conservar, consultar y compartir tus
                credenciales académicas de manera sencilla.
            </p>
            </div>

            <div className="row g-4 mt-4">
            {benefits.map((benefit) => (
                <div className="col-12 col-md-6 col-lg-3" key={benefit.title}>
                <div className="student-benefit-card h-100">
                    <div className="student-benefit-icon">
                    <i className={`bi ${benefit.icon}`}></i>
                    </div>

                    <h3>{benefit.title}</h3>

                    <p>{benefit.description}</p>
                </div>
                </div>
            ))}
            </div>
        </div>
        </section>
    );
}
