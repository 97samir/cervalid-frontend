import { Link } from "react-router-dom";

export default function CompaniesHeroSection() {
    return (
        <section className="companies-hero">
        <div className="container">
            <div className="row align-items-center g-5">
            <div className="col-lg-7">
                <span className="companies-eyebrow">
                PARA EMPRESAS Y RECLUTADORES
                </span>

                <h1 className="companies-hero-title">
                Verifica credenciales académicas
                <span> en segundos.</span>
                </h1>

                <p className="companies-hero-description">
                Elimina la incertidumbre al contratar. Verifica certificados
                académicos de forma rápida, segura y confiable mediante Cervalid.
                </p>

                <div className="companies-hero-actions">
                <Link to="/verify" className="btn btn-primary btn-lg">
                    <i className="bi bi-patch-check me-2"></i>
                    Probar verificación
                </Link>

                <a href="#planes" className="btn btn-outline-secondary btn-lg">
                    Ver planes
                </a>
                </div>

                <div className="companies-hero-trust">
                <div>
                    <i className="bi bi-check-circle-fill"></i>
                    Verificación instantánea
                </div>

                <div>
                    <i className="bi bi-shield-check"></i>
                    Información verificable
                </div>

                <div>
                    <i className="bi bi-clock"></i>
                    Disponible 24/7
                </div>
                </div>
            </div>

            <div className="col-lg-5">
                <div className="companies-verification-card">
                <div className="verification-card-header">
                    <div className="verification-card-icon">
                    <i className="bi bi-patch-check"></i>
                    </div>

                    <div>
                    <span>VERIFICACIÓN</span>
                    <strong>Certificado académico</strong>
                    </div>
                </div>

                <div className="verification-card-body">
                    <div className="verification-field">
                    <small>Estudiante</small>
                    <strong>María López García</strong>
                    </div>

                    <div className="verification-field">
                    <small>Programa</small>
                    <strong>Ingeniería de Sistemas</strong>
                    </div>

                    <div className="verification-status">
                    <i className="bi bi-check-circle-fill"></i>

                    <div>
                        <strong>Certificado válido</strong>
                        <span>Información verificada</span>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        </section>
    );
}
