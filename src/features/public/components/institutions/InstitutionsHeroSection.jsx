import { Link } from "react-router-dom";

export default function InstitutionsHeroSection() {
    return (
        <section className="institutions-hero">
        <div className="container">
            <div className="row align-items-center g-5">
            <div className="col-lg-7">
                <span className="institutions-hero-badge">
                <i className="bi bi-building-check me-2"></i>
                Certificación académica digital
                </span>

                <h1 className="institutions-hero-title">
                Moderniza la certificación
                <span> de tu institución</span>
                </h1>

                <p className="institutions-hero-description">
                Emite certificados digitales verificables, protege la información
                académica y ofrece trazabilidad completa de los logros de tus
                estudiantes.
                </p>

                <div className="institutions-hero-actions">
                <Link
                    to="/institution-requests"
                    className="btn btn-primary btn-lg"
                >
                    Solicitar incorporación
                    <i className="bi bi-arrow-right ms-2"></i>
                </Link>

                <Link to="/contact" className="btn btn-outline-secondary btn-lg">
                    Solicitar una demo
                </Link>
                </div>

                <div className="institutions-hero-trust">
                <div>
                    <i className="bi bi-shield-check"></i>
                    Certificados verificables
                </div>

                <div>
                    <i className="bi bi-diagram-3"></i>
                    Trazabilidad académica
                </div>

                <div>
                    <i className="bi bi-clock-history"></i>
                    Verificación 24/7
                </div>
                </div>
            </div>

            <div className="col-lg-5">
                <div className="institutions-hero-card">
                <div className="institution-dashboard-preview">
                    <div className="institution-preview-header">
                    <div className="preview-logo">C</div>

                    <div>
                        <strong>Panel institucional</strong>
                        <small>Gestión académica</small>
                    </div>

                    <i className="bi bi-three-dots"></i>
                    </div>

                    <div className="institution-preview-stats">
                    <div className="preview-stat">
                        <span>Certificados</span>
                        <strong>1,248</strong>
                        <small>
                        <i className="bi bi-arrow-up"></i>
                        12% este mes
                        </small>
                    </div>

                    <div className="preview-stat">
                        <span>Verificaciones</span>
                        <strong>3,642</strong>
                        <small>
                        <i className="bi bi-check-circle"></i>
                        Activas
                        </small>
                    </div>
                    </div>

                    <div className="preview-verification">
                    <div className="preview-verification-icon">
                        <i className="bi bi-patch-check-fill"></i>
                    </div>

                    <div>
                        <strong>Certificado verificado</strong>
                        <small>Registro autenticado correctamente</small>
                    </div>

                    <span className="badge bg-success-subtle text-success">
                        Válido
                    </span>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        </section>
    );
}
