export default function DigitalPresenceFields({ 
    form, 
    handleChange 
}) {
    return (
        <div className="digital-presence-fields">
        <div className="row g-4">
            {/* SITIO WEB */}
            <div className="col-md-6">
            <label htmlFor="website" className="form-label">
                Sitio web
            </label>

            <input
                id="website"
                type="url"
                name="website"
                className="form-control"
                placeholder="https://www.institucion.edu.pe"
                value={form.website || ""}
                onChange={handleChange}
            />
            </div>

            {/* DOMINIO */}
            <div className="col-md-6">
            <label htmlFor="institutionalDominio" className="form-label">
                Dominio institucional
            </label>

            <input
                id="institutionalDominio"
                type="text"
                name="institutionalDominio"
                className="form-control"
                placeholder="institucion.edu.pe"
                value={form.institutionalDominio || ""}
                onChange={handleChange}
            />
            </div>

            {/* EMAIL */}
            <div className="col-12">
            <label htmlFor="institutionalEmail" className="form-label">
                Correo institucional
            </label>

            <input
                id="institutionalEmail"
                type="email"
                name="institutionalEmail"
                className="form-control"
                placeholder="contacto@institucion.edu.pe"
                value={form.institutionalEmail || ""}
                onChange={handleChange}
            />
            </div>

            {/* DESCRIPCIÓN */}
            <div className="col-12">
            <label htmlFor="description" className="form-label">
                Descripción
            </label>

            <textarea
                id="description"
                name="description"
                className="form-control"
                rows="4"
                placeholder="Describe brevemente la presencia digital de la institución..."
                value={form.description || ""}
                onChange={handleChange}
            />
            </div>
        </div>
        </div>
    );
}
