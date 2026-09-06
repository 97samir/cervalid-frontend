import { Link } from "react-router-dom";

export default function CallToActionSection() {
    return (
        <section className="cta-section">
        <div className="container">
            <div className="cta-card">
            <div className="cta-decoration cta-decoration-one"></div>
            <div className="cta-decoration cta-decoration-two"></div>

            <div className="cta-content">
                <span className="section-eyebrow">COMIENZA CON CERVALID</span>

                <h2>
                Construyamos juntos
                <span> credenciales más confiables.</span>
                </h2>

                <p>
                Conecta tu institución con una plataforma preparada para la
                certificación, verificación y trazabilidad académica.
                </p>

                <div className="cta-actions">
                <Link to="/institucion-request" className="btn cta-primary-btn">
                    Registrar institución
                    <i className="bi bi-arrow-right ms-2"></i>
                </Link>

                <Link to="/contacto" className="btn cta-secondary-btn">
                    Contactar a Cervalid
                </Link>
                </div>
            </div>
            </div>
        </div>
        </section>
    );
}
