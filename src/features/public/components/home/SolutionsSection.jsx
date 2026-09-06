import { Link } from "react-router-dom";

const solutions = [
    {
        type: "ESTUDIANTES",
        icon: "bi-mortarboard",
        title: "Tu trayectoria académica, siempre contigo.",
        description:
        "Accede a tus credenciales, logros y trayectoria académica desde un único lugar y compártela cuando la necesites.",
        benefits: [
        "Acceso a tus certificados",
        "Comparte tus credenciales",
        "Trayectoria académica verificable",
        ],
        link: "/students",
        action: "Conocer más",
    },
    {
        type: "INSTITUCIONES",
        icon: "bi-building",
        title: "Digitaliza y protege tus certificaciones.",
        description:
        "Centraliza la emisión y gestión de certificados académicos y ofrece a terceros una forma confiable de verificarlos.",
        benefits: [
        "Emisión de certificados",
        "Gestión centralizada",
        "Verificación pública",
        ],
        link: "/institutions",
        action: "Conocer más",
        featured: true,
    },
    {
        type: "EMPRESAS",
        icon: "bi-briefcase",
        title: "Contrata con información verificable.",
        description:
        "Comprueba las credenciales académicas de candidatos de forma rápida y reduce el riesgo asociado a documentos falsificados.",
        benefits: [
        "Verificación rápida",
        "Menos riesgo de fraude",
        "Información confiable",
        ],
        link: "/companies",
        action: "Conocer más",
    },
];

export default function SolutionsSection() {
    return (
        <section className="solutions-section">
        <div className="container">
            <div className="section-heading text-center">
            <span className="section-eyebrow">SOLUCIONES</span>

            <h2>
                Una plataforma para
                <span> todo el ecosistema.</span>
            </h2>

            <p>
                Cada usuario obtiene herramientas diseñadas para resolver sus
                necesidades específicas.
            </p>
            </div>

            <div className="row g-4 mt-2">
            {solutions.map((solution) => (
                <div className="col-12 col-lg-4" key={solution.type}>
                <article
                    className={`solution-card ${
                    solution.featured ? "solution-card-featured" : ""
                    }`}
                >
                    <div className="solution-card-top">
                    <div className="solution-card-icon">
                        <i className={`bi ${solution.icon}`}></i>
                    </div>

                    {solution.featured && (
                        <span className="solution-card-badge">Principal</span>
                    )}
                    </div>

                    <span className="solution-card-type">{solution.type}</span>

                    <h3>{solution.title}</h3>

                    <p>{solution.description}</p>

                    <ul>
                    {solution.benefits.map((benefit) => (
                        <li key={benefit}>
                        <i className="bi bi-check-circle-fill"></i>
                        {benefit}
                        </li>
                    ))}
                    </ul>

                    <Link to={solution.link} className="solution-card-link">
                    {solution.action}
                    <i className="bi bi-arrow-right"></i>
                    </Link>
                </article>
                </div>
            ))}
            </div>
        </div>
        </section>
    );
}
