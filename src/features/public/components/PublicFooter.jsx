import { Link } from "react-router-dom";

export default function PublicFooter() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="public-footer">
        <div className="container">
            <div className="row g-5">
            {/* BRAND*/}
            <div className="col-12 col-lg-4">
                <Link
                to="/"
                className="public-footer-brand"
                aria-label="Cervalid - Inicio"
                >
                <span className="public-brand-mark">
                    <i className="bi bi-patch-check-fill"></i>
                </span>

                <span>Cervalid</span>
                </Link>

                <p className="public-footer-description">
                Plataforma de certificación académica para emitir, verificar y
                consultar credenciales educativas de forma segura y confiable.
                </p>
            </div>

            {/* PRODUCTO */}
            <div className="col-6 col-md-3 col-lg-2">
                <h3>Producto</h3>

                <ul>
                <li>
                    <Link to="/how-it-works">Cómo funciona</Link>
                </li>

                <li>
                    <Link to="/verify">Verificar certificado</Link>
                </li>

                <li>
                    <Link to="/sitemap">Mapa del sitio</Link>
                </li>
                </ul>
            </div>

            {/*  SOLUCIONES */}
            <div className="col-6 col-md-3 col-lg-2">
                <h3>Soluciones</h3>

                <ul>
                <li>
                    <Link to="/students">Estudiantes</Link>
                </li>

                <li>
                    <Link to="/institutions">Instituciones</Link>
                </li>

                <li>
                    <Link to="/companies">Empresas</Link>
                </li>
                </ul>
            </div>

            {/*  SOPORTE  */}
            <div className="col-6 col-md-3 col-lg-2">
                <h3>Soporte</h3>

                <ul>
                <li>
                    <Link to="/contact">Contacto</Link>
                </li>

                <li>
                    <Link to="/institution-requests">Registrar institución</Link>
                </li>
                </ul>
            </div>

            {/*  CUENTA  */}
            <div className="col-6 col-md-3 col-lg-2">
                <h3>Cuenta</h3>

                <ul>
                <li>
                    <Link to="/login">Iniciar sesión</Link>
                </li>

                <li>
                    <Link to="/activate">Activar cuenta</Link>
                </li>
                </ul>
            </div>
            </div>

            {/* BOTTOM */}
            <div className="public-footer-bottom">
            <span>© {currentYear} Cervalid. Todos los derechos reservados.</span>

            <div className="public-footer-legal">
                <Link to="/sitemap">Mapa del sitio</Link>

                <span>Privacidad</span>

                <span>Términos</span>
            </div>
            </div>
        </div>
        </footer>
    );
}
