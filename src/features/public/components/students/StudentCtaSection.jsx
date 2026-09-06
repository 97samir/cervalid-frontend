import { Link } from "react-router-dom";

export default function StudentCtaSection() {
    return (
        <section className="students-cta">
        <div className="container">
            <div className="students-cta-card">
            <div className="students-cta-content">
                <span className="section-eyebrow">EMPIEZA CON CERVALID</span>

                <h2>Lleva tus logros académicos contigo</h2>

                <p>
                Accede a tus certificados, compártelos y permite que cualquier
                persona pueda verificar su autenticidad.
                </p>

                <div className="students-cta-actions">
                <Link to="/login" className="btn btn-light btn-lg">
                    <i className="bi bi-box-arrow-in-right me-2"></i>
                    Acceder a mi Dashboard
                </Link>

                <Link to="/verify" className="btn btn-outline-light btn-lg">
                    Verificar un certificado
                </Link>
                </div>
            </div>

            <div className="students-cta-icon">
                <i className="bi bi-patch-check-fill"></i>
            </div>
            </div>
        </div>
        </section>
    );
}
