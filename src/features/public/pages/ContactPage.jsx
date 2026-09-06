import ContactForm from "../components/contact/ContactForm";
import ContactInfo from "../components/contact/ContactInfo";
import ContactInstitutionCta from "../components/contact/ContactInstitutionCta";

import "../styles/contact.css";

export default function ContactPage() {
    return (
        <div className="contact-page">
        {/* HERO */}
        <section className="contact-hero">
            <div className="container">
            <div className="contact-hero-content">
                <span className="contact-eyebrow">Estamos aquí para ayudarte</span>

                <h1 className="contact-title">Contáctanos</h1>

                <p className="contact-description">
                ¿Tienes alguna pregunta sobre Cervalid? Envíanos un mensaje y
                nuestro equipo estará encantado de ayudarte.
                </p>
            </div>
            </div>
        </section>

        {/* CONTACTO */}
        <section className="contact-section">
            <div className="container">
            <div className="row g-4 g-lg-5 align-items-stretch">
                {/* FORMULARIO */}
                <div className="col-12 col-lg-7">
                <ContactForm />
                </div>

                {/* INFORMACIÓN */}
                <div className="col-12 col-lg-5">
                <ContactInfo />
                </div>
            </div>
            </div>
        </section>

        {/* CTA INSTITUCIONES */}
        <ContactInstitutionCta />
        </div>
    );
}
