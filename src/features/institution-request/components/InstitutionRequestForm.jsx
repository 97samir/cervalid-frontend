import { useState } from "react";
import { createInstitutionRequest } from "../api/institutionRequestApi";
import DigitalPresenceFields from "./DigitalPresenceFields";

const InstitutionRequestForm = () => {

    const [form, setForm] = useState({
        institutionName: "",
        ruc: "",
        institutionType: "",
        country: "",
        city: "",
        address: "",
        name: "",
        lastName: "",
        documentType: "",
        document: "",
        phone: "",
        position: "",
        contactEmail: "",
        password: "",
        documentAcreditationUrl: "",
        tienePresenciaDigital: false,

        website: null,
        institutionalDominio: null,
        institutionalEmail: null,
        description: null
    });

    const resetForm = () => {
        setForm({
            institutionName: "",
            ruc: "",
            institutionType: "",
            country: "",
            city: "",
            address: "",
            name: "",
            lastName: "",
            documentType: "",
            document: "",
            phone: "",
            position: "",
            contactEmail: "",
            password: "",
            documentAcreditationUrl: "",
            tienePresenciaDigital: false,

            website: null,
            institutionalDominio: null,
            institutionalEmail: null,
            description: null
        });
    };

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === "checkbox") {
        setForm({
            ...form,
            [name]: checked,
            ...(checked === false && {
            website: null,
            institutionalDominio: null,
            institutionalEmail: null,
            description: null
            })
        });
        } else {
        setForm({
            ...form,
            [name]: value
        });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // form validación
        const formElement = e.currentTarget;

        if (!formElement.checkValidity()) {
            e.stopPropagation();
            formElement.classList.add("was-validated");
            return;
        }

        try {
        setLoading(true);
        setError(null);

        await createInstitutionRequest(form);
        setMessage("Solicitud enviada correctamente");

        // limpiar form
        resetForm();
        formElement.classList.remove("was-validated");

        } catch (err) {
        setError(err.response?.data?.message || "Error al enviar solicitud");
        } finally {
        setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="card p-4 shadow needs-validation" noValidate>
            {/* si se quita noValidate, validara un campo a la vez */}

            <h4>Solicitud de institución</h4>

            {error && <div className="alert alert-danger">{error}</div>}
            {message && <div className="alert alert-success">{message}</div>}

            <input name="institutionName" placeholder="Nombre institución" onChange={handleChange} className="form-control mb-2" required/>
            <input name="ruc" placeholder="RUC" onChange={handleChange} className="form-control mb-2" required/>

            <select name="institutionType" className="form-select mb-2" value={form.institutionType} onChange={handleChange} required >
                <option value="">Tipo de institución</option>
                <option value="UNIVERSIDAD">Universidad</option>
                <option value="INSTITUTO">Instituto</option>
                <option value="COLEGIO">Colegio</option>
            </select>
            {/* <div className="invalid-feedback"> Este campo es obligatorio </div> */}

            <input name="country" placeholder="País" onChange={handleChange} className="form-control mb-2" required/>
            <input name="city" placeholder="Ciudad" onChange={handleChange} className="form-control mb-2" required/>
            <input name="address" placeholder="Dirección" onChange={handleChange} className="form-control mb-2" required/>

            <input name="name" placeholder="Nombre" onChange={handleChange} className="form-control mb-2" required/>
            <input name="lastName" placeholder="Apellido" onChange={handleChange} className="form-control mb-2" required/>
            

            {/* Tipo de documento */}
            <select name="documentType" className="form-select mb-2" value={form.documentType} onChange={handleChange} required>
                <option value="">Tipo de documento</option>
                <option value="DNI">DNI</option>
                <option value="CE">Carné de extranjería</option>
            </select>

            {/* Documento dinámico */}
            <input name="document" placeholder={ form.documentType === "DNI" ? "DNI (8 dígitos)" : "CE (9 dígitos)" }
                maxLength={form.documentType === "DNI" ? 8 : 9}
                value={form.document}
                onChange={(e) => { const value = e.target.value.replace(/\D/g, ""); // solo números
                                setForm({ ...form, document: value });
                        }} className="form-control mb-2"
            required />
            
            <input name="phone" placeholder="Teléfono" onChange={handleChange} className="form-control mb-2" required/>
            <input name="position" placeholder="Cargo" onChange={handleChange} className="form-control mb-2" required/>
            <input name="contactEmail" placeholder="Email" onChange={handleChange} className="form-control mb-2" required/>
            <input type="password" name="password" placeholder="Contraseña" onChange={handleChange} className="form-control mb-2" required/>
            <input name="documentAcreditationUrl" placeholder="URL documento" onChange={handleChange} className="form-control mb-2" required/>

            {/* checkbox clave */}
            <div className="form-check mb-3">
                <div>
                    <label className="form-check-label"> Tiene presencia digital </label>
                    <input type="checkbox" name="tienePresenciaDigital" className="form-check-input"
                        checked={form.tienePresenciaDigital} onChange={handleChange} required/>
                </div> 
            </div>

            {/* render condicional */}
            {form.tienePresenciaDigital && (
                <DigitalPresenceFields form={form} handleChange={handleChange} />
            )}

            <button className="btn btn-primary w-100" disabled={loading}>
                {loading ? "Enviando..." : "Enviar solicitud"}
            </button>

        </form>
    );
};

export default InstitutionRequestForm;