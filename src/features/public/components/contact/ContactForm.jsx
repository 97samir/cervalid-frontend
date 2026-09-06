import { useState } from "react";

const initialForm = {
    name: "",
    email: "",
    organization: "",
    message: "",
};

export default function ContactForm() {
    const [form, setForm] = useState(initialForm);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (event) => {
        const { name, value } = event.target;

        setForm((previous) => ({
        ...previous,
        [name]: value,
        }));

        setSuccess(false);
        setError("");
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formElement = event.currentTarget;

        setSuccess(false);
        setError("");

        if (!formElement.checkValidity()) {
        event.stopPropagation();
        formElement.classList.add("was-validated");
        return;
        }

        try {
        setLoading(true);

        /*
        * TODO:
        * Conectar posteriormente con el endpoint
        * de contacto del backend.
        *
        * Ejemplo futuro:
        *
        * await sendContactMessage(form);
        */

        await new Promise((resolve) => setTimeout(resolve, 800));

        setSuccess(
            "Mensaje enviado correctamente. Nos pondremos en contacto contigo pronto.",
        );

        setForm(initialForm);
        formElement.classList.remove("was-validated");
        } catch (err) {
        console.error("Error enviando mensaje:", err);

        setError("No pudimos enviar tu mensaje. Inténtalo nuevamente.");
        } finally {
        setLoading(false);
        }
    };

    return (
        <div className="contact-form-card">
        <div className="contact-card-header">
            <div className="contact-card-icon">
            <i className="bi bi-chat-dots"></i>
            </div>

            <div>
            <h2>Envíanos un mensaje</h2>

            <p>Completa el formulario y nos pondremos en contacto contigo.</p>
            </div>
        </div>

        {success && (
            <div
            className="alert alert-success d-flex align-items-start gap-2"
            role="alert"
            >
            <i className="bi bi-check-circle-fill"></i>

            <span>{success}</span>
            </div>
        )}

        {error && (
            <div
            className="alert alert-danger d-flex align-items-start gap-2"
            role="alert"
            >
            <i className="bi bi-exclamation-circle-fill"></i>

            <span>{error}</span>
            </div>
        )}

        <form onSubmit={handleSubmit} className="needs-validation" noValidate>
            {/* NOMBRE */}
            <div className="mb-3">
            <label htmlFor="contact-name" className="form-label">
                Nombre completo
            </label>

            <input
                id="contact-name"
                type="text"
                name="name"
                className="form-control"
                placeholder="Tu nombre completo"
                value={form.name}
                onChange={handleChange}
                required
            />

            <div className="invalid-feedback">Ingresa tu nombre completo.</div>
            </div>

            {/* EMAIL */}
            <div className="mb-3">
            <label htmlFor="contact-email" className="form-label">
                Correo electrónico
            </label>

            <input
                id="contact-email"
                type="email"
                name="email"
                className="form-control"
                placeholder="tu@email.com"
                value={form.email}
                onChange={handleChange}
                required
            />

            <div className="invalid-feedback">
                Ingresa un correo electrónico válido.
            </div>
            </div>

            {/* ORGANIZACIÓN */}
            <div className="mb-3">
            <label htmlFor="contact-organization" className="form-label">
                Institución / Empresa
                <span className="text-muted"> (opcional)</span>
            </label>

            <input
                id="contact-organization"
                type="text"
                name="organization"
                className="form-control"
                placeholder="Nombre de tu institución o empresa"
                value={form.organization}
                onChange={handleChange}
            />
            </div>

            {/* MENSAJE */}
            <div className="mb-4">
            <label htmlFor="contact-message" className="form-label">
                Mensaje
            </label>

            <textarea
                id="contact-message"
                name="message"
                className="form-control"
                rows="6"
                placeholder="Cuéntanos cómo podemos ayudarte..."
                value={form.message}
                onChange={handleChange}
                required
            />

            <div className="invalid-feedback">Escribe un mensaje.</div>
            </div>

            {/* BOTÓN */}
            <button
            type="submit"
            className="btn btn-primary contact-submit-button"
            disabled={loading}
            >
            {loading ? (
                <>
                <span
                    className="spinner-border spinner-border-sm"
                    aria-hidden="true"
                />

                <span>Enviando...</span>
                </>
            ) : (
                <>
                <i className="bi bi-send"></i>
                <span>Enviar mensaje</span>
                </>
            )}
            </button>
        </form>
        </div>
    );
}
