const useCases = [
    {
        number: "01",
        icon: "bi-briefcase-fill",
        title: "Postulación a Empleos",
        description:
        "Comparte tus certificados verificables con reclutadores y demuestra tu formación académica de manera rápida.",
    },
    {
        number: "02",
        icon: "bi-building-fill",
        title: "Aplicación a Universidades",
        description:
        "Facilita procesos de admisión proporcionando certificados que pueden ser validados digitalmente.",
    },
    {
        number: "03",
        icon: "bi-mortarboard-fill",
        title: "Solicitud de Becas",
        description:
        "Presenta tus credenciales académicas verificables para procesos de becas nacionales e internacionales.",
    },
    {
        number: "04",
        icon: "bi-person-vcard-fill",
        title: "Portfolio Profesional",
        description:
        "Muestra tus logros académicos en LinkedIn, portafolios y otras plataformas mediante enlaces verificables.",
    },
];

export default function StudentUseCasesSection() {
    return (
        <section className="students-use-cases section-padding">
        <div className="container">
            <div className="row align-items-center g-5">
            {/* INTRODUCCIÓN */}
            <div className="col-12 col-lg-4">
                <span className="section-eyebrow">¿CUÁNDO USAR CERVALID?</span>

                <h2>Tus credenciales te acompañan donde las necesites</h2>

                <p>
                Desde una postulación laboral hasta una solicitud de beca, puedes
                compartir tus logros académicos y permitir que terceros comprueben
                su autenticidad.
                </p>
            </div>

            {/* CASOS */}
            <div className="col-12 col-lg-8">
                <div className="row g-4">
                {useCases.map((useCase) => (
                    <div className="col-12 col-md-6" key={useCase.number}>
                    <div className="student-use-case">
                        <div className="student-use-case-top">
                        <span className="student-use-case-number">
                            {useCase.number}
                        </span>

                        <div className="student-use-case-icon">
                            <i className={`bi ${useCase.icon}`}></i>
                        </div>
                        </div>

                        <h3>{useCase.title}</h3>

                        <p>{useCase.description}</p>
                    </div>
                    </div>
                ))}
                </div>
            </div>
            </div>
        </div>
        </section>
    );
}
