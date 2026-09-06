/*
Page reutilizable para:

Cómo funciona
Estudiantes
Instituciones
Empresas
Contacto
*/

export default function PublicPageHero({
    eyebrow,
    title,
    description,
}) {
    return (
        <section className="public-page-hero">
            <div className="container">
                <div className="public-page-hero-content">

                    {eyebrow && (
                        <span className="public-page-hero-eyebrow">
                            {eyebrow}
                        </span>
                    )}

                    <h1>{title}</h1>

                    <p>{description}</p>

                </div>
            </div>
        </section>
    );
}