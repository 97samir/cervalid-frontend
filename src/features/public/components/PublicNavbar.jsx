import { Link, NavLink } from "react-router-dom";

import cervalidLogo from "@/assets/img/cervalid-logo.svg";
import useAuthStore from "@/app/store/auth/useAuthStore";
import useRoleRedirect from "@/core/security/useRoleRedirect";

export default function PublicNavbar() {
    const { user, loading } = useAuthStore();
    const redirectByRole = useRoleRedirect();

    const navLinkClass = ({ isActive }) =>
        `public-nav-link ${isActive ? "active" : ""}`;

    return (
        <header className="public-navbar">
        <div className="container">
            <nav className="navbar navbar-expand-lg public-navbar-inner">
            {/* BRAND */}
            <Link
                to="/"
                className="navbar-brand public-navbar-brand"
                aria-label="Cervalid - Inicio"
            >
                <img
                src={cervalidLogo}
                alt=""
                className="public-navbar-logo"
                aria-hidden="true"
                />
            </Link>

            {/* MOBILE TOGGLER */}
            <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#publicNavbar"
                aria-controls="publicNavbar"
                aria-expanded="false"
                aria-label="Abrir navegación"
            >
                <span className="navbar-toggler-icon"></span>
            </button>

            {/* NAVIGATION */}
            <div
                className="collapse navbar-collapse public-navbar-collapse"
                id="publicNavbar"
            >
                <ul className="navbar-nav public-navbar-nav">
                <li className="nav-item">
                    <NavLink to="/" end className={navLinkClass}>
                    Inicio
                    </NavLink>
                </li>

                <li className="nav-item">
                    <NavLink to="/how-it-works" className={navLinkClass}>
                    Cómo funciona
                    </NavLink>
                </li>

                <li className="nav-item dropdown">
                    <button
                    className="public-nav-link public-nav-dropdown"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    >
                    <span>Soluciones</span>
                    <i className="bi bi-chevron-down" aria-hidden="true"></i>
                    </button>

                    <ul className="dropdown-menu public-dropdown-menu">
                    <li>
                        <Link to="/students" className="dropdown-item">
                        <i className="bi bi-mortarboard" aria-hidden="true"></i>
                        <span>
                            <strong>Para estudiantes</strong>
                            <small>Gestiona y comparte tus logros académicos</small>
                        </span>
                        </Link>
                    </li>

                    <li>
                        <Link to="/institutions" className="dropdown-item">
                        <i className="bi bi-building" aria-hidden="true"></i>
                        <span>
                            <strong>Para instituciones</strong>
                            <small>Emite y administra certificados</small>
                        </span>
                        </Link>
                    </li>

                    <li>
                        <Link to="/companies" className="dropdown-item">
                        <i className="bi bi-briefcase" aria-hidden="true"></i>
                        <span>
                            <strong>Para empresas</strong>
                            <small>Verifica credenciales académicas</small>
                        </span>
                        </Link>
                    </li>
                    </ul>
                </li>

                <li className="nav-item">
                    <NavLink to="/contact" className={navLinkClass}>
                    Contacto
                    </NavLink>
                </li>
                </ul>

                {/* ACTIONS */}
                <div className="public-navbar-actions">
                <Link to="/verify" className="btn public-btn-outline">
                    <i className="bi bi-patch-check me-2" aria-hidden="true"></i>
                    Verificar certificado
                </Link>

                {loading ? (
                    <button
                    type="button"
                    className="btn public-btn-primary"
                    disabled
                    aria-live="polite"
                    >
                    Comprobando sesión...
                    </button>
                ) : user ? (
                    <button
                    type="button"
                    className="btn public-btn-primary"
                    onClick={() => redirectByRole(user)}
                    >
                    Ir a mi panel
                    </button>
                ) : (
                    <Link to="/login" className="btn public-btn-primary">
                    Iniciar sesión
                    </Link>
                )}
                </div>
            </div>
            </nav>
        </div>
        </header>
    );
}
