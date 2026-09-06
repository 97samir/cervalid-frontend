import SitemapSection from "../components/sitemap/SitemapSection";

import "../styles/sitemap.css";

export default function SitemapPage() {
    const sections = [
        {
        title: "Páginas públicas",
        icon: "bi-globe2",
        description: "Conoce Cervalid y descubre cómo funciona.",
        links: [
            {
            label: "Inicio",
            path: "/",
            icon: "bi-house",
            },
            {
            label: "Cómo funciona",
            path: "/how-it-works",
            icon: "bi-diagram-3",
            },
            {
            label: "Para estudiantes",
            path: "/students",
            icon: "bi-mortarboard",
            },
            {
            label: "Para instituciones",
            path: "/institutions",
            icon: "bi-building",
            },
            {
            label: "Para empresas",
            path: "/companies",
            icon: "bi-briefcase",
            },
            {
            label: "Contacto",
            path: "/contact",
            icon: "bi-envelope",
            },
        ],
        },

        {
        title: "Verificación",
        icon: "bi-patch-check",
        description: "Comprueba la autenticidad de un certificado académico.",
        links: [
            {
            label: "Verificar certificado",
            path: "/verify",
            icon: "bi-shield-check",
            },
        ],
        },

        {
        title: "Autenticación",
        icon: "bi-person-lock",
        description: "Accede y administra tu cuenta de Cervalid.",
        links: [
            {
            label: "Iniciar sesión",
            path: "/login",
            icon: "bi-box-arrow-in-right",
            },
            {
            label: "Activar cuenta",
            path: "/activate",
            icon: "bi-person-check",
            },
        ],
        },

        {
        title: "Instituciones",
        icon: "bi-building-check",
        description: "Incorpora tu institución a Cervalid.",
        links: [
            {
            label: "Solicitar incorporación",
            path: "/institution-requests",
            icon: "bi-send",
            },
        ],
        },
    ];

    return (
        <div className="sitemap-page">
        {/*  HERO*/}
        <section className="sitemap-hero">
            <div className="container">
            <div className="sitemap-hero-content">
                <span className="sitemap-eyebrow">Navegación</span>

                <h1>Mapa del sitio</h1>

                <p>
                Encuentra rápidamente las principales páginas y funcionalidades de
                Cervalid.
                </p>
            </div>
            </div>
        </section>

        {/* SECCIONES */}
        <section className="sitemap-section">
            <div className="container">
            <div className="row g-4">
                {sections.map((section) => (
                <div key={section.title} className="col-12 col-md-6">
                    <SitemapSection section={section} />
                </div>
                ))}
            </div>
            </div>
        </section>

        {/*  PRIVATE AREA NOTICE */}
        <section className="sitemap-private">
            <div className="container">
            <div className="sitemap-private-card">
                <div className="sitemap-private-icon">
                <i className="bi bi-lock"></i>
                </div>

                <div>
                <h2>Áreas privadas</h2>

                <p>
                    Los dashboards de estudiantes, instituciones, empresas y
                    administradores requieren autenticación y permisos según el rol
                    de cada usuario.
                </p>

                <a href="/login" className="btn btn-primary">
                    Iniciar sesión
                    <i className="bi bi-arrow-right"></i>
                </a>
                </div>
            </div>
            </div>
        </section>
        </div>
    );
}
