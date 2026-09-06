import { Link } from "react-router-dom";

export default function HeroSection() {
    return (
        <section className="hero-section">
            <div className="container">
                <div className="row align-items-center g-5">
                <div className="col-12 col-lg-6">
                    <div className="hero-badge">
                    <span className="hero-badge-dot"></span>
                    Certificación académica digital
                    </div>

                    <h1 className="hero-title">
                    Certificados académicos
                    <span> seguros y verificables.</span>
                    </h1>

                    <p className="hero-description">
                    Emite, verifica y consulta la trayectoria académica con una
                    plataforma diseñada para garantizar la autenticidad y trazabilidad
                    de cada credencial.
                    </p>

                    <div className="hero-actions">
                    <Link
                        to="/verify"
                        className="btn public-btn-primary hero-primary-btn"
                    >
                        <i className="bi bi-qr-code-scan me-2"></i>
                        Verificar certificado
                    </Link>

                    <Link
                        to="/institution-requests"
                        className="btn public-btn-outline hero-secondary-btn"
                    >
                        Solicitar incorporación
                        <i className="bi bi-arrow-right ms-2"></i>
                    </Link>
                    </div>

                    <div className="hero-trust">
                    <div className="hero-trust-item">
                        <i className="bi bi-shield-check"></i>
                        <span>Autenticidad verificable</span>
                    </div>

                    <div className="hero-trust-item">
                        <i className="bi bi-diagram-3"></i>
                        <span>Trazabilidad académica</span>
                    </div>

                    <div className="hero-trust-item">
                        <i className="bi bi-lock"></i>
                        <span>Información protegida</span>
                    </div>
                    </div>
                </div>
                
                {/* CARD - IMAGEN */}
                <div className="col-12 col-lg-6">
                    <div className="hero-visual">
                    <div className="hero-glow"></div>

                    <div className="hero-dashboard-card">
                        <div className="hero-card-header">
                        <div className="hero-card-brand">
                            <div className="hero-card-icon">
                            <i className="bi bi-patch-check-fill"></i>
                            </div>

                            <div>
                            <strong>Certificado académico</strong>
                            <small>Cervalid</small>
                            </div>
                        </div>

                        <span className="hero-verified-badge">
                            <i className="bi bi-check-circle-fill"></i>
                            Verificado
                        </span>
                        </div>

                        <div className="hero-certificate-preview">
                        <div className="hero-certificate-line large"></div>
                        <div className="hero-certificate-line"></div>
                        <div className="hero-certificate-line short"></div>

                        <div className="hero-certificate-content">
                            <div>
                            <span>Estudiante</span>
                            <strong>Nombre del estudiante</strong>
                            </div>

                            <div>
                            <span>Programa académico</span>
                            <strong>Ingeniería de Software</strong>
                            </div>
                        </div>

                        <div className="hero-certificate-footer">
                            <div className="hero-certificate-qr">
                            <i className="bi bi-qr-code"></i>
                            </div>

                            <div>
                            <span>Código de verificación</span>
                            <strong>CV-2026-XXXX</strong>
                            </div>
                        </div>
                        </div>

                        <div className="hero-blockchain-status">
                        <div className="hero-blockchain-icon">
                            <i className="bi bi-link-45deg"></i>
                        </div>

                        <div>
                            <span>Integridad del registro</span>
                            <strong>Registro verificable</strong>
                        </div>

                        <i className="bi bi-check-circle-fill ms-auto"></i>
                        </div>
                    </div>

                    <div className="hero-floating-card hero-floating-card-one">
                        <i className="bi bi-shield-check"></i>
                        <div>
                        <strong>100%</strong>
                        <span>Verificable</span>
                        </div>
                    </div>

                    <div className="hero-floating-card hero-floating-card-two">
                        <i className="bi bi-clock-history"></i>
                        <div>
                        <strong>Segundos</strong>
                        <span>para verificar</span>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </section>
    );
}
