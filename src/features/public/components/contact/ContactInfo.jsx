export default function ContactInfo() {
    return (
        <div className="contact-info-card">
        <div className="contact-card-header">
            <div className="contact-card-icon">
            <i className="bi bi-info-circle"></i>
            </div>

            <div>
            <h2>Información de contacto</h2>

            <p>También puedes comunicarte directamente con nuestro equipo.</p>
            </div>
        </div>

        <div className="contact-info-list">
            {/* EMAIL */}
            <div className="contact-info-item">
            <div className="contact-info-item-icon">
                <i className="bi bi-envelope"></i>
            </div>

            <div>
                <span className="contact-info-label">Email</span>

                <a
                href="mailto:contacto@cervalid.com"
                className="contact-info-value"
                >
                contacto@cervalid.com
                </a>
            </div>
            </div>

            {/* TELÉFONO */}
            <div className="contact-info-item">
            <div className="contact-info-item-icon">
                <i className="bi bi-telephone"></i>
            </div>

            <div>
                <span className="contact-info-label">Teléfono</span>

                <span className="contact-info-value">Próximamente</span>
            </div>
            </div>

            {/* UBICACIÓN */}
            <div className="contact-info-item">
            <div className="contact-info-item-icon">
                <i className="bi bi-geo-alt"></i>
            </div>

            <div>
                <span className="contact-info-label">Ubicación</span>

                <span className="contact-info-value">Perú</span>
            </div>
            </div>
        </div>

        {/* HORARIO */}
        <div className="contact-availability">
            <div className="contact-availability-icon">
            <i className="bi bi-clock"></i>
            </div>

            <div>
            <strong>Atención</strong>

            <p>Nuestro equipo responderá tu consulta lo antes posible.</p>
            </div>
        </div>
        </div>
    );
}
