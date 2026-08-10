import { useState } from "react";
import { sendInvitation } from "../api/invitationsApi";
import useAuthStore from "@/app/store/auth/useAuthStore";

const InviteUserForm = () => {

    const { user } = useAuthStore();

    const [form, setForm] = useState({
        email: "",
        role: "",
    });

    const resetForm = () => {
        setForm({
            email: "",
            role: "",
        });
    };

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

    const roles = [
        "INSTITUTION_ADMIN",
        "INSTITUTION_SUBADMIN",
        "STUDENT",
        "RECRUITER",
    ];

    const handleChange = (e) => {
        setForm({
        ...form,
        [e.target.name]: e.target.value,
        });
    };

    const validate = () => {
        if (!form.email || !form.role) {
        return "Todos los campos son obligatorios";
        }

        if (!form.email.includes("@")) {
        return "Email inválido";
        }

        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formElement = e.currentTarget;

        setError(null);
        setMessage(null);

        // bootstrap validation
        if (!formElement.checkValidity()) {
            e.stopPropagation();
            formElement.classList.add("was-validated");
            return;
        }

        // validación personalizada
        const validationError = validate();
        if (validationError) {
            setError(validationError);
            return;
        }

        try {
        setLoading(true);

        const payload = {
            email: form.email,
            role: form.role,
            institutionId: user.institutionId,
        };

        await sendInvitation(payload);

        setMessage("Invitación enviada correctamente");

        resetForm();
        formElement.classList.remove("was-validated");

        } catch (err) {
        setError(err.response?.data?.message || "Error al enviar invitación");
        } finally {
        setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="card p-4 shadow-sm needs-validation" noValidate>
        {/* si se quita noValidate, validara un campo a la vez */}

            <h4 className="mb-3">Invitar usuario</h4>

            {error && <div className="alert alert-danger">{error}</div>}
            {message && <div className="alert alert-success">{message}</div>}

            <div className="mb-3">
                <label>Email</label>
                <input
                type="email"
                name="email"
                className="form-control"
                value={form.email}
                onChange={handleChange}
                required
                />
            </div>

            <div className="mb-3">
                <label>Rol</label>
                <select
                name="role"
                className="form-select"
                value={form.role}
                onChange={handleChange}
                required
                >
                <option value="">Seleccionar rol</option>
                {roles.map((r) => (
                    <option key={r} value={r}>
                    {r}
                    </option>
                ))}
                </select>
            </div>

            <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={loading}
            >
                {loading ? "Enviando..." : "Enviar invitación"}
            </button>
        </form>
    );
};

export default InviteUserForm;
