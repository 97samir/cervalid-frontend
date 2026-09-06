const features = [
    {
        icon: "bi-shield-lock",
        title: "Certificados seguros",
        description:
        "Protege las credenciales académicas y facilita comprobar su autenticidad.",
    },
    {
        icon: "bi-lightning-charge",
        title: "Verificación instantánea",
        description:
        "Comprueba un certificado en segundos mediante código, QR o documento.",
    },
    {
        icon: "bi-diagram-3",
        title: "Trazabilidad académica",
        description:
        "Consulta una trayectoria académica estructurada, verificable y fácil de comprender.",
    },
];

export default function WhatIsCervalidSection() {
    return (
        <section className="what-is-section">
        <div className="container">
            <div className="section-heading text-center">
            <span className="section-eyebrow">CONOCE CERVALID</span>

            <h2>
                Una nueva forma de confiar
                <span> en las credenciales académicas.</span>
            </h2>

            <p>
                Cervalid conecta instituciones, estudiantes y empresas mediante una
                plataforma que facilita la emisión, gestión, verificación y
                trazabilidad de credenciales académicas.
            </p>
            </div>

            <div className="row g-4 mt-2">
            {features.map((feature) => (
                <div className="col-12 col-md-4" key={feature.title}>
                <article className="value-card">
                    <div className="value-card-icon">
                    <i className={`bi ${feature.icon}`}></i>
                    </div>

                    <h3>{feature.title}</h3>

                    <p>{feature.description}</p>
                </article>
                </div>
            ))}
            </div>
        </div>
        </section>
    );
}
