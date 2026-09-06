import { Link } from "react-router-dom";

export default function StudentsHeroSection() {
    return (
        <section className="students-hero">
        <div className="container">
            <div className="row align-items-center g-5">
            {/* CONTENIDO */}
            <div className="col-12 col-lg-7">
                <span className="students-hero-badge">
                <i className="bi bi-mortarboard-fill me-2"></i>
                Para estudiantes
                </span>

                <h1 className="students-hero-title">
                Tus Certificados,
                <span> Siempre Accesibles y Verificables</span>
                </h1>

                <p className="students-hero-description">
                Con Cervalid, tus logros académicos están protegidos mediante
                tecnología blockchain y disponibles cuando los necesites.
                </p>

                <div className="students-hero-actions">
                <Link to="/login" className="btn btn-primary btn-lg">
                    <i className="bi bi-box-arrow-in-right me-2"></i>
                    Acceder a mi Dashboard
                </Link>

                <Link
                    to="/how-it-works"
                    className="btn btn-outline-primary btn-lg"
                >
                    Cómo funciona
                </Link>
                </div>
            </div>

            {/* ILUSTRACIÓN */}
            <div className="col-12 col-lg-5">
                <div className="students-hero-visual">
                <div className="students-certificate-card">
                    <div className="certificate-header">
                    <div className="certificate-icon">
                        <i className="bi bi-award-fill"></i>
                    </div>

                    <span>Certificado académico</span>
                    </div>

                    <div className="certificate-body">
                    <small>CERTIFICADO VERIFICABLE</small>

                    <h3>Logro Académico</h3>

                    <p>Certificado registrado y protegido</p>
                    </div>

                    <div className="certificate-footer">
                    <div>
                        <i className="bi bi-shield-check me-1"></i>
                        Verificado
                    </div>

                    <div>
                        <i className="bi bi-link-45deg me-1"></i>
                        Blockchain
                    </div>
                    </div>
                </div>

                <div className="students-floating-badge students-floating-badge-top">
                    <i className="bi bi-patch-check-fill"></i>
                    <span>Autenticidad verificada</span>
                </div>

                <div className="students-floating-badge students-floating-badge-bottom">
                    <i className="bi bi-qr-code"></i>
                    <span>QR verificable</span>
                </div>
                </div>
            </div>
            </div>
        </div>
        </section>
    );
}
