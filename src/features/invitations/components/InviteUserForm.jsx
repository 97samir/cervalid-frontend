import { useState } from "react";
import { sendInvitation } from "../api/invitationsApi";
import useAuthStore from "@/app/store/auth/useAuthStore";
import { getRoleLabel } from "@/shared/utils/roleUtils";

const InviteUserForm = () => {

    const { user } = useAuthStore();

    const [form, setForm] = useState({
        email: "",
        role: "",
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

    const roles = [
        "INSTITUTION_ADMIN",
        "INSTITUTION_SUBADMIN",
        "STUDENT",
        "RECRUITER",
    ];

    const resetForm = () => {
        setForm({
            email: "",
            role: "",
        });
    };

    const handleChange = (e) => {

        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Limpiar mensajes cuando el usuario vuelve a editar
        if (error) {
            setError(null);
        }

        if (message) {
            setMessage(null);
        }
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        const formElement = e.currentTarget;

        setError(null);
        setMessage(null);

        // Bootstrap validation
        if (!formElement.checkValidity()) {

            e.stopPropagation();

            formElement.classList.add("was-validated");

            return;
        }

        try {

            setLoading(true);

            const payload = {
                email: form.email.trim(),
                role: form.role,
                institutionId: user.institutionId,
            };

            await sendInvitation(payload);

            setMessage(
                "La invitación fue enviada correctamente."
            );

            resetForm();

            formElement.classList.remove("was-validated");

        } catch (err) {

            console.error(
                "Error enviando invitación:",
                err
            );

            setError(
                err.response?.data?.message ||
                "No fue posible enviar la invitación."
            );

        } finally {

            setLoading(false);

        }
    };

    return (

        <form
            onSubmit={handleSubmit}
            className="needs-validation"
            noValidate
        >

            {/* MENSAJES */}

            {error && (
                <div
                    className="alert alert-danger d-flex align-items-start gap-2"
                    role="alert"
                >
                    <i className="bi bi-exclamation-circle-fill"></i>

                    <div>
                        {error}
                    </div>
                </div>
            )}

            {message && (
                <div
                    className="alert alert-success d-flex align-items-start gap-2"
                    role="alert"
                >
                    <i className="bi bi-check-circle-fill"></i>

                    <div>
                        {message}
                    </div>
                </div>
            )}


            {/* INFORMACIÓN */}

            <div className="bg-light rounded-3 p-3 mb-4">

                <div className="d-flex align-items-start gap-3">

                    <div
                        className="d-flex align-items-center justify-content-center rounded-3 bg-primary bg-opacity-10 text-primary flex-shrink-0"
                        style={{
                            width: "42px",
                            height: "42px",
                        }}
                    >
                        <i className="bi bi-person-plus fs-5"></i>
                    </div>

                    <div>

                        <h6 className="fw-semibold mb-1">
                            Nueva invitación
                        </h6>

                        <p className="text-muted small mb-0">
                            Envía una invitación para que un usuario
                            pueda acceder y formar parte de la institución.
                        </p>

                    </div>

                </div>

            </div>


            {/* EMAIL */}

            <div className="mb-4">

                <label
                    htmlFor="email"
                    className="form-label fw-semibold"
                >
                    Correo electrónico
                </label>

                <div className="input-group">

                    <span className="input-group-text bg-white">
                        <i className="bi bi-envelope text-muted"></i>
                    </span>

                    <input
                        id="email"
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="usuario@ejemplo.com"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />

                </div>

                <div className="form-text">
                    Se enviará la invitación a este correo electrónico.
                </div>

                <div className="invalid-feedback">
                    Ingresa un correo electrónico válido.
                </div>

            </div>


            {/* ROL */}

            <div className="mb-4">

                <label
                    htmlFor="role"
                    className="form-label fw-semibold"
                >
                    Rol del usuario
                </label>

                <select
                    id="role"
                    name="role"
                    className="form-select"
                    value={form.role}
                    onChange={handleChange}
                    required
                >

                    <option value="">
                        Seleccionar rol
                    </option>

                    {roles.map((role) => (

                        <option
                            key={role}
                            value={role}
                        >
                            {getRoleLabel(role)}
                        </option>

                    ))}

                </select>

                <div className="form-text">
                    El rol determina los permisos que tendrá el usuario
                    dentro de la institución.
                </div>

                <div className="invalid-feedback">
                    Selecciona un rol.
                </div>

            </div>


            {/* ACCIONES */}

            <div className="d-flex justify-content-end gap-2 pt-2 border-top">

                <button
                    type="button"
                    className="btn btn-outline-secondary"
                    disabled={loading}
                    onClick={resetForm}
                >
                    Limpiar
                </button>

                <button
                    type="submit"
                    className="btn btn-primary px-4"
                    disabled={loading}
                >

                    {loading ? (

                        <>
                            <span
                                className="spinner-border spinner-border-sm me-2"
                                role="status"
                                aria-hidden="true"
                            />

                            Enviando...
                        </>

                    ) : (

                        <>
                            <i className="bi bi-send me-2"></i>
                            Enviar invitación
                        </>

                    )}

                </button>

            </div>

        </form>
    );
};

export default InviteUserForm;