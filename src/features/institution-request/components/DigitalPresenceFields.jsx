const DigitalPresenceFields = ({ form, handleChange }) => {
    return (
        <>
        <div className="mb-3">
            <label>Sitio web</label>
            <input
            type="text"
            name="website"
            className="form-control"
            value={form.website || ""}
            onChange={handleChange}
            />
        </div>

        <div className="mb-3">
            <label>Dominio institucional</label>
            <input
            type="text"
            name="institutionalDominio"
            className="form-control"
            value={form.institutionalDominio || ""}
            onChange={handleChange}
            />
        </div>

        <div className="mb-3">
            <label>Email institucional</label>
            <input
            type="email"
            name="institutionalEmail"
            className="form-control"
            value={form.institutionalEmail || ""}
            onChange={handleChange}
            />
        </div>

        <div className="mb-3">
            <label>Descripción</label>
            <textarea
            name="description"
            className="form-control"
            value={form.description || ""}
            onChange={handleChange}
            />
        </div>
        </>
    );
};

export default DigitalPresenceFields;