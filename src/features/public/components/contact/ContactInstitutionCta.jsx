import { Link } from "react-router-dom";

export default function ContactInstitutionCta() {
    return (
        <section className="contact-institution-cta">
        <div className="container">
            <div className="contact-cta-content">
            <div className="contact-cta-icon">
                <i className="bi bi-building"></i>
            </div>

            <div className="contact-cta-text">
                <span className="contact-cta-eyebrow">
                ¿Eres una institución educativa?
                </span>

                <h2>Moderniza la certificación de tu institución</h2>

                <p>
                Incorpora Cervalid y comienza a emitir certificados digitales
                verificables.
                </p>
            </div>

            <div className="contact-cta-action">
                <Link to="/institution-requests" className="btn btn-primary">
                Solicitar incorporación
                <i className="bi bi-arrow-right"></i>
                </Link>
            </div>
            </div>
        </div>
        </section>
    );
}
