import { Link, Outlet } from "react-router-dom";

export default function AuthLayout() {
    
    const currentYear = new Date().getFullYear();

    return (
        <div className="auth-layout">
        <header className="auth-header">
            <div className="container">
            <Link to="/" className="auth-brand" aria-label="Cervalid - Inicio">
                <span className="public-brand-mark">
                <i className="bi bi-patch-check-fill"></i>
                </span>

                <span>Cervalid</span>
            </Link>
            </div>
        </header>

        <main className="auth-main">
            <Outlet />
        </main>

        <footer className="auth-footer">
            <div className="container">
            <span>© {currentYear} Cervalid. Todos los derechos reservados.</span>

            <nav className="auth-footer-links" aria-label="Enlaces legales">
                <Link to="/sitemap">Mapa del sitio</Link>

                <span>Privacidad</span>
                <span>Términos</span>
            </nav>
            </div>
        </footer>
        </div>
    );
}
