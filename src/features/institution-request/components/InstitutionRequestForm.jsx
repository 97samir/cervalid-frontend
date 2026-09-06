import { useState } from "react";

import { createInstitutionRequest } from "../api/institutionRequestApi";
import DigitalPresenceFields from "./DigitalPresenceFields";

const initialForm = {
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
    description: null,
};

export default function InstitutionRequestForm () {

    const [form, setForm] = useState(initialForm);

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === "checkbox") {
            setForm((prev) => ({
                ...prev,
                [name]: checked,

                ...(checked === false && {
                    website: null,
                    institutionalDominio: null,
                    institutionalEmail: null,
                    description: null,
                }),
            }));

            return;
        }

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleDocumentChange = (e) => {
        const value = e.target.value.replace(/\D/g, "");

        const maxLength =
            form.documentType === "DNI"
                ? 8
                : form.documentType === "CE"
                    ? 9
                    : 9;

        setForm((prev) => ({
            ...prev,
            document: value.slice(0, maxLength),
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formElement = e.currentTarget;

        setError(null);
        setMessage(null);

        if (!formElement.checkValidity()) {
            e.stopPropagation();

            formElement.classList.add("was-validated");

            return;
        }

        try {
            setLoading(true);

            await createInstitutionRequest(form);

            setMessage(
                "Solicitud enviada correctamente. Revisaremos la información proporcionada.",
            );

            setForm(initialForm);

            formElement.classList.remove("was-validated");

        } catch (err) {
            console.error(err);

            setError(
                err.response?.data?.message ||
                    "No se pudo enviar la solicitud. Inténtalo nuevamente.",
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="institution-request-form needs-validation"
            noValidate
        >
            {/* =====================================================
                            MENSAJES
            ====================================================== */}

            {error && (
                <div
                    className="alert institution-request-alert institution-request-alert-error"
                    role="alert"
                >
                    <i
                        className="bi bi-exclamation-circle"
                        aria-hidden="true"
                    ></i>

                    <span>{error}</span>
                </div>
            )}

            {message && (
                <div
                    className="alert institution-request-alert institution-request-alert-success"
                    role="alert"
                >
                    <i
                        className="bi bi-check-circle"
                        aria-hidden="true"
                    ></i>

                    <span>{message}</span>
                </div>
            )}

            {/* =====================================================
                    1. INFORMACIÓN DE LA INSTITUCIÓN
            ====================================================== */}

            <section className="institution-request-card">
                <div className="institution-request-card-header">
                    <div className="institution-request-section-icon">
                        <i
                            className="bi bi-building"
                            aria-hidden="true"
                        ></i>
                    </div>

                    <div>
                        <h2>Información de la institución</h2>

                        <p>
                            Datos generales de la institución educativa.
                        </p>
                    </div>
                </div>

                <div className="institution-request-card-body">
                    <div className="row g-4">

                        {/* Nombre */}
                        <div className="col-md-8">
                            <label
                                htmlFor="institutionName"
                                className="form-label"
                            >
                                Nombre de la institución
                            </label>

                            <input
                                id="institutionName"
                                type="text"
                                name="institutionName"
                                className="form-control"
                                placeholder="Ej. Universidad Tecnológica del Perú"
                                value={form.institutionName}
                                onChange={handleChange}
                                autoComplete="organization"
                                required
                            />

                            <div className="invalid-feedback">
                                Ingresa el nombre de la institución.
                            </div>
                        </div>

                        {/* RUC */}
                        <div className="col-md-4">
                            <label
                                htmlFor="ruc"
                                className="form-label"
                            >
                                RUC
                            </label>

                            <input
                                id="ruc"
                                type="text"
                                name="ruc"
                                className="form-control"
                                placeholder="20123456789"
                                value={form.ruc}
                                onChange={handleChange}
                                inputMode="numeric"
                                maxLength={11}
                                required
                            />

                            <div className="invalid-feedback">
                                Ingresa el RUC de la institución.
                            </div>
                        </div>

                        {/* Tipo */}
                        <div className="col-md-4">
                            <label
                                htmlFor="institutionType"
                                className="form-label"
                            >
                                Tipo de institución
                            </label>

                            <select
                                id="institutionType"
                                name="institutionType"
                                className="form-select"
                                value={form.institutionType}
                                onChange={handleChange}
                                required
                            >
                                <option value="">
                                    Seleccione...
                                </option>

                                <option value="UNIVERSIDAD">
                                    Universidad
                                </option>

                                <option value="INSTITUTO">
                                    Instituto
                                </option>

                                <option value="COLEGIO">
                                    Colegio
                                </option>
                            </select>

                            <div className="invalid-feedback">
                                Selecciona el tipo de institución.
                            </div>
                        </div>

                        {/* País */}
                        <div className="col-md-4">
                            <label
                                htmlFor="country"
                                className="form-label"
                            >
                                País
                            </label>

                            <input
                                id="country"
                                type="text"
                                name="country"
                                className="form-control"
                                placeholder="Ej. Perú"
                                value={form.country}
                                onChange={handleChange}
                                autoComplete="country-name"
                                required
                            />

                            <div className="invalid-feedback">
                                Ingresa el país.
                            </div>
                        </div>

                        {/* Ciudad */}
                        <div className="col-md-4">
                            <label
                                htmlFor="city"
                                className="form-label"
                            >
                                Ciudad
                            </label>

                            <input
                                id="city"
                                type="text"
                                name="city"
                                className="form-control"
                                placeholder="Ej. Lima"
                                value={form.city}
                                onChange={handleChange}
                                autoComplete="address-level2"
                                required
                            />

                            <div className="invalid-feedback">
                                Ingresa la ciudad.
                            </div>
                        </div>

                        {/* Dirección */}
                        <div className="col-12">
                            <label
                                htmlFor="address"
                                className="form-label"
                            >
                                Dirección
                            </label>

                            <input
                                id="address"
                                type="text"
                                name="address"
                                className="form-control"
                                placeholder="Dirección de la institución"
                                value={form.address}
                                onChange={handleChange}
                                autoComplete="street-address"
                                required
                            />

                            <div className="invalid-feedback">
                                Ingresa la dirección.
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* =====================================================
                    2. RESPONSABLE INSTITUCIONAL
            ====================================================== */}

            <section className="institution-request-card">
                <div className="institution-request-card-header">
                    <div className="institution-request-section-icon">
                        <i
                            className="bi bi-person-badge"
                            aria-hidden="true"
                        ></i>
                    </div>

                    <div>
                        <h2>Responsable institucional</h2>

                        <p>
                            Datos de la persona responsable de la solicitud.
                        </p>
                    </div>
                </div>

                <div className="institution-request-card-body">
                    <div className="row g-4">

                        {/* Nombres */}
                        <div className="col-md-6">
                            <label
                                htmlFor="name"
                                className="form-label"
                            >
                                Nombres
                            </label>

                            <input
                                id="name"
                                type="text"
                                name="name"
                                className="form-control"
                                placeholder="Nombres"
                                value={form.name}
                                onChange={handleChange}
                                autoComplete="given-name"
                                required
                            />

                            <div className="invalid-feedback">
                                Ingresa los nombres.
                            </div>
                        </div>

                        {/* Apellidos */}
                        <div className="col-md-6">
                            <label
                                htmlFor="lastName"
                                className="form-label"
                            >
                                Apellidos
                            </label>

                            <input
                                id="lastName"
                                type="text"
                                name="lastName"
                                className="form-control"
                                placeholder="Apellidos"
                                value={form.lastName}
                                onChange={handleChange}
                                autoComplete="family-name"
                                required
                            />

                            <div className="invalid-feedback">
                                Ingresa los apellidos.
                            </div>
                        </div>

                        {/* Tipo documento */}
                        <div className="col-md-4">
                            <label
                                htmlFor="documentType"
                                className="form-label"
                            >
                                Tipo de documento
                            </label>

                            <select
                                id="documentType"
                                name="documentType"
                                className="form-select"
                                value={form.documentType}
                                onChange={handleChange}
                                required
                            >
                                <option value="">
                                    Seleccione...
                                </option>

                                <option value="DNI">
                                    DNI
                                </option>

                                <option value="CE">
                                    Carné de extranjería
                                </option>
                            </select>

                            <div className="invalid-feedback">
                                Selecciona el tipo de documento.
                            </div>
                        </div>

                        {/* Documento */}
                        <div className="col-md-4">
                            <label
                                htmlFor="document"
                                className="form-label"
                            >
                                Documento
                            </label>

                            <input
                                id="document"
                                type="text"
                                name="document"
                                className="form-control"
                                placeholder={
                                    form.documentType === "DNI"
                                        ? "8 dígitos"
                                        : form.documentType === "CE"
                                            ? "9 dígitos"
                                            : "Número de documento"
                                }
                                maxLength={
                                    form.documentType === "DNI"
                                        ? 8
                                        : 9
                                }
                                value={form.document}
                                onChange={handleDocumentChange}
                                inputMode="numeric"
                                required
                            />

                            <div className="invalid-feedback">
                                Ingresa el número de documento.
                            </div>
                        </div>

                        {/* Teléfono */}
                        <div className="col-md-4">
                            <label
                                htmlFor="phone"
                                className="form-label"
                            >
                                Teléfono
                            </label>

                            <input
                                id="phone"
                                type="tel"
                                name="phone"
                                className="form-control"
                                placeholder="Número de teléfono"
                                value={form.phone}
                                onChange={handleChange}
                                autoComplete="tel"
                                required
                            />

                            <div className="invalid-feedback">
                                Ingresa un número de teléfono.
                            </div>
                        </div>

                        {/* Cargo */}
                        <div className="col-md-6">
                            <label
                                htmlFor="position"
                                className="form-label"
                            >
                                Cargo
                            </label>

                            <input
                                id="position"
                                type="text"
                                name="position"
                                className="form-control"
                                placeholder="Ej. Director Académico"
                                value={form.position}
                                onChange={handleChange}
                                required
                            />

                            <div className="invalid-feedback">
                                Ingresa el cargo.
                            </div>
                        </div>

                        {/* Email */}
                        <div className="col-md-6">
                            <label
                                htmlFor="contactEmail"
                                className="form-label"
                            >
                                Correo electrónico
                            </label>

                            <input
                                id="contactEmail"
                                type="email"
                                name="contactEmail"
                                className="form-control"
                                placeholder="correo@institucion.edu.pe"
                                value={form.contactEmail}
                                onChange={handleChange}
                                autoComplete="email"
                                required
                            />

                            <div className="invalid-feedback">
                                Ingresa un correo electrónico válido.
                            </div>
                        </div>

                        {/* Password */}
                        <div className="col-md-6">
                            <label
                                htmlFor="institutionPassword"
                                className="form-label"
                            >
                                Contraseña
                            </label>

                            <input
                                id="institutionPassword"
                                type="password"
                                name="password"
                                className="form-control"
                                placeholder="Contraseña de acceso"
                                value={form.password}
                                onChange={handleChange}
                                autoComplete="new-password"
                                required
                            />

                            <div className="invalid-feedback">
                                Ingresa una contraseña.
                            </div>

                            <div className="form-text">
                                Esta contraseña será utilizada para acceder
                                a Cervalid.
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* =====================================================
                    3. ACREDITACIÓN
            ====================================================== */}

            <section className="institution-request-card">
                <div className="institution-request-card-header">
                    <div className="institution-request-section-icon">
                        <i
                            className="bi bi-file-earmark-check"
                            aria-hidden="true"
                        ></i>
                    </div>

                    <div>
                        <h2>Acreditación institucional</h2>

                        <p>
                            Documento que respalda la información proporcionada.
                        </p>
                    </div>
                </div>

                <div className="institution-request-card-body">
                    <label
                        htmlFor="documentAcreditationUrl"
                        className="form-label"
                    >
                        URL del documento de acreditación
                    </label>

                    <input
                        id="documentAcreditationUrl"
                        type="url"
                        name="documentAcreditationUrl"
                        className="form-control"
                        placeholder="https://..."
                        value={form.documentAcreditationUrl}
                        onChange={handleChange}
                        required
                    />

                    <div className="invalid-feedback">
                        Ingresa una URL válida.
                    </div>

                    <div className="form-text">
                        Proporciona una URL donde pueda verificarse el
                        documento de acreditación.
                    </div>
                </div>
            </section>

            {/* =====================================================
                    4. PRESENCIA DIGITAL
            ====================================================== */}

            <section className="institution-request-card">
                <div className="institution-request-card-header">
                    <div className="institution-request-section-icon">
                        <i
                            className="bi bi-globe2"
                            aria-hidden="true"
                        ></i>
                    </div>

                    <div>
                        <h2>Presencia digital</h2>

                        <p>
                            Información pública de la institución.
                        </p>
                    </div>
                </div>

                <div className="institution-request-card-body">

                    <div className="digital-presence-toggle">
                        <div>
                            <label
                                htmlFor="tienePresenciaDigital"
                                className="digital-presence-title"
                            >
                                La institución cuenta con presencia digital
                            </label>

                            <p>
                                Puedes proporcionar información pública
                                como sitio web y correo institucional.
                            </p>
                        </div>

                        <div className="form-check form-switch">
                            <input
                                type="checkbox"
                                name="tienePresenciaDigital"
                                className="form-check-input"
                                id="tienePresenciaDigital"
                                checked={form.tienePresenciaDigital}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    {form.tienePresenciaDigital && (
                        <DigitalPresenceFields
                            form={form}
                            handleChange={handleChange}
                        />
                    )}
                </div>
            </section>

            {/* =====================================================
                    ACTIONS
            ====================================================== */}

            <div className="institution-request-actions">
                <button
                    type="submit"
                    className="btn institution-request-submit"
                    disabled={loading}
                >
                    {loading ? (
                        <>
                            <span
                                className="spinner-border spinner-border-sm"
                                aria-hidden="true"
                            ></span>

                            Enviando solicitud...
                        </>
                    ) : (
                        <>
                            <i
                                className="bi bi-send"
                                aria-hidden="true"
                            ></i>

                            Enviar solicitud
                        </>
                    )}
                </button>
            </div>
        </form>
    );
};

