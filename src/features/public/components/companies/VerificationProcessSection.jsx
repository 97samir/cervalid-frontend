const steps = [
    {
        number: "01",
        icon: "bi-qr-code-scan",
        title: "Recibe el certificado",
        description:
        "El candidato comparte su certificado digital o código de verificación.",
    },
    {
        number: "02",
        icon: "bi-search",
        title: "Consulta la credencial",
        description:
        "Ingresa el código o escanea el QR para acceder a la página de verificación.",
    },
    {
        number: "03",
        icon: "bi-patch-check",
        title: "Verifica la información",
        description:
        "Cervalid comprueba la información y muestra el resultado de la verificación.",
    },
    {
        number: "04",
        icon: "bi-person-check",
        title: "Toma una decisión",
        description:
        "Utiliza información académica verificable como parte de tu proceso de selección.",
    },
];

export default function VerificationProcessSection() {
    return (
        <section className="companies-process section-padding">
        <div className="container">
            <div className="section-heading text-center">
            <span className="section-eyebrow">CÓMO FUNCIONA</span>

            <h2>Verificar es simple.</h2>

            <p>
                Desde el certificado hasta el resultado, el proceso está diseñado
                para ser rápido y claro.
            </p>
            </div>

            <div className="row g-4 mt-5">
            {steps.map((step) => (
                <div className="col-md-6 col-lg-3" key={step.number}>
                <article className="process-card">
                    <div className="process-number">{step.number}</div>

                    <div className="process-icon">
                    <i className={`bi ${step.icon}`}></i>
                    </div>

                    <h3>{step.title}</h3>

                    <p>{step.description}</p>
                </article>
                </div>
            ))}
            </div>
        </div>
        </section>
    );
}
