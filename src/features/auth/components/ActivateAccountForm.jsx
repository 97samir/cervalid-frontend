import { useState } from "react";
import { activateAccount } from "../api/authApi";
import { useNavigate, useSearchParams } from "react-router-dom";

const ActivateAccountForm = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        lastName: "",
        password: "",
        confirmPassword: "",
        documentType: "",
        document: "",
        phone: "",
    });

    const resetForm = () => {
        setForm({
            name: "",
            lastName: "",
            password: "",
            confirmPassword: "",
            documentType: "",
            document: "",
            phone: "",
        });
    };

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);

    const handleChange = (e) => {
        setForm({
        ...form,
        [e.target.name]: e.target.value,
        });
    };

    const validate = () => {
        if (!token) return "Token inválido o ausente";

        if (
        !form.name ||
        !form.lastName ||
        !form.password ||
        !form.confirmPassword||
        !form.document ||
        !form.phone
        ) {
        return "Todos los campos son obligatorios";
        }

        if (form.password.length < 6) {
        return "La contraseña debe tener al menos 6 caracteres";
        }

        if (form.password !== form.confirmPassword) {
        return "Las contraseñas no coinciden";
        }

        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formElement = e.currentTarget;

        setError(null);
        setMessage(null);

        // Validación Bootstrap
        if (!formElement.checkValidity()) {
            e.stopPropagation();
            formElement.classList.add("was-validated");
            return;
        }

        // Validaciones propias
        const validationError = validate();
        if (validationError) {
            setError(validationError);
            return;
        }

        try {
        setLoading(true);

        await activateAccount({
            token,
            name: form.name,
            lastName: form.lastName,
            password: form.password,
            documentType: form.documentType,
            document: form.document,
            phone: form.phone,
        });

        setMessage("Cuenta activada correctamente");

        // limpiar Form
        resetForm();
        formElement.classList.remove("was-validated");

        setTimeout(() => {
            navigate("/login");
        }, 2000);
        } catch (err) {
        setError(err.response?.data?.message || "Error al activar cuenta");
        } finally {
        setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="card p-4 shadow-sm needs-validation" noValidate>
            {/* si se quita noValidate, validara un campo a la vez */}
            
            <h4 className="mb-3">Activar cuenta</h4>

            {error && <div className="alert alert-danger">{error}</div>}
            {message && <div className="alert alert-success">{message}</div>}

            <div className="mb-3">
                <label>Nombre</label>
                <input
                type="text"
                name="name"
                className="form-control"
                value={form.name}
                onChange={handleChange}
                required
                />
            </div>
            {/* <div className="invalid-feedback">
                Este campo es obligatorio
            </div> */}

            <div className="mb-3">
                <label>Apellido</label>
                <input
                type="text"
                name="lastName"
                className="form-control"
                value={form.lastName}
                onChange={handleChange}
                required
                />
            </div>

            <div className="mb-3">
                <label>Contraseña</label>
                <input
                type="password"
                name="password"
                className="form-control"
                value={form.password}
                onChange={handleChange}
                required
                />
            </div>

            <div className="mb-3">
                <label>Confirmar contraseña</label>
                <input
                type="password"
                name="confirmPassword"
                className="form-control"
                value={form.confirmPassword}
                onChange={handleChange}
                required
                />
            </div>

            <div className="mb-3">
                <label>Tipo de documento</label>
                <select name="documentType" className="form-select" value={form.documentType} onChange={handleChange} required>
                    <option value="">Seleccione</option>
                    <option value="DNI">DNI</option>
                    <option value="CE">Carné de extranjería</option>
                </select>
            </div>

            <div className="mb-3">
                <label>Documento</label>
                <input type="text" name="document" className="form-control" placeholder={ form.documentType === "DNI"
                            ? "DNI (8 dígitos)" : "CE (9 dígitos)" }
                    maxLength={form.documentType === "DNI" ? 8 : 9}
                    value={form.document}
                    onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, ""); // solo números
                        setForm({ ...form, document: value }); }}
                required/>
            </div>

            <div className="mb-3">
                <label>Teléfono</label>
                <input
                    type="text"
                    name="phone"
                    className="form-control"
                    value={form.phone}
                    onChange= {(e) => {
                        const value = e.target.value.replace(/\D/g, "");
                        setForm({ ...form, phone: value });
                    }}
                required/>
            </div>

            <button
                type="submit"
                className="btn btn-success w-100"
                disabled={loading}
            >
                {loading ? "Activando..." : "Activar cuenta"}
            </button>
        </form>
    );
};

export default ActivateAccountForm;
