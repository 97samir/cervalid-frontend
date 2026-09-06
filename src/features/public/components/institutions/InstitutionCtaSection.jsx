import { Link } from "react-router-dom";

export default function InstitutionCtaSection() {
    return (
        <section className="institutions-cta">
        <div className="container">
            <div className="institutions-cta-card">
            <div className="row align-items-center g-4">
                <div className="col-lg-8">
                <span className="institutions-cta-eyebrow">
                    ¿LISTO PARA COMENZAR?
                </span>

                <h2>
                    Lleva la certificación académica de tu institución al siguiente
                    nivel.
                </h2>

                <p>
                    Incorpora Cervalid y comienza a emitir certificados digitales
                    verificables y trazables.
                </p>
                </div>

                <div className="col-lg-4 text-lg-end">
                <Link to="/institution-requests" className="btn btn-light btn-lg">
                    Solicitar incorporación
                    <i className="bi bi-arrow-right ms-2"></i>
                </Link>
                </div>
            </div>
            </div>
        </div>
        </section>
    );
}
