const steps = [
    {
        number: "01",
        icon: "bi-send",
        title: "Solicitud",
        description:
        "Completa el formulario de incorporación con la información básica de tu institución.",
    },
    {
        number: "02",
        icon: "bi-search",
        title: "Revisión",
        description:
        "Nuestro equipo revisa la información proporcionada y valida la solicitud institucional.",
    },
    {
        number: "03",
        icon: "bi-sliders",
        title: "Configuración",
        description:
        "Configuramos tu institución, usuarios, permisos y parámetros necesarios para comenzar.",
    },
    {
        number: "04",
        icon: "bi-rocket-takeoff",
        title: "Lanzamiento",
        description:
        "Tu institución queda lista para emitir certificados digitales verificables con Cervalid.",
    },
];

export default function InstitutionProcessSection() {
    return (
        <section className="institutions-process section-padding">
        <div className="container">
            <div className="section-heading text-center">
            <span className="section-eyebrow">INCORPORACIÓN</span>

            <h2>
                Comienza con Cervalid en
                <span> cuatro pasos</span>
            </h2>

            <p>
                Un proceso sencillo para llevar la certificación académica de tu
                institución al entorno digital.
            </p>
            </div>

            <div className="row g-4 mt-5">
            {steps.map((step, index) => (
                <div className="col-md-6 col-lg-3" key={step.title}>
                <div className="institution-process-card">
                    <div className="institution-process-number">{step.number}</div>

                    <div className="institution-process-icon">
                    <i className={`bi ${step.icon}`}></i>
                    </div>

                    <h3>{step.title}</h3>

                    <p>{step.description}</p>

                    {index < steps.length - 1 && (
                    <div className="institution-process-arrow">
                        <i className="bi bi-arrow-right"></i>
                    </div>
                    )}
                </div>
                </div>
            ))}
            </div>
        </div>
        </section>
    );
}
