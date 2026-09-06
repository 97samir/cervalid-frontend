import { Link } from "react-router-dom";

export default function CompaniesCtaSection() {
    return (
        <section className="companies-cta section-padding">
        <div className="container">
            <div className="companies-cta-card">
            <div className="row align-items-center g-4">
                <div className="col-lg-8">
                <span className="section-eyebrow">COMIENZA HOY</span>

                <h2>Verifica credenciales con mayor confianza.</h2>

                <p>
                    Prueba la verificación de Cervalid y descubre una forma más
                    rápida de validar información académica durante tus procesos de
                    selección.
                </p>
                </div>

                <div className="col-lg-4 text-lg-end">
                <Link to="/verify" className="btn btn-light btn-lg">
                    <i className="bi bi-patch-check me-2"></i>
                    Probar verificación
                </Link>
                </div>
            </div>
            </div>
        </div>
        </section>
    );
}
