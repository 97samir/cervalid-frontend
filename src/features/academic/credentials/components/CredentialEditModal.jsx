import { useState } from "react";

export default function CredentialEditModal({
    credential,
    onClose,
    onSubmit,
    submitting = false,
}) {
    const [form, setForm] = useState(() => ({
        title: credential?.title || "",
        description: credential?.description || "",
    }));

    if (!credential) {
        return null;
    }

    const handleChange = (event) => {
        const { name, value } = event.target;

        setForm((current) => ({
        ...current,
        [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!form.title.trim()) {
        return;
        }

        onSubmit({
        title: form.title.trim(),
        description: form.description.trim() || null,
        });
    };

    return (
        <div
        className="modal d-block"
        tabIndex="-1"
        role="dialog"
        style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
        >
        <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
            {/* HEADER */}

            <div className="modal-header">
                <div>
                <h5 className="modal-title fw-bold mb-1">Editar credencial</h5>

                <small className="text-muted">
                    Actualiza la información de la credencial académica.
                </small>
                </div>

                <button
                type="button"
                className="btn-close"
                onClick={onClose}
                disabled={submitting}
                aria-label="Cerrar"
                />
            </div>

            {/* FORM */}

            <form onSubmit={handleSubmit}>
                <div className="modal-body">
                {/* TÍTULO */}

                <div className="mb-3">
                    <label
                    htmlFor="credentialTitle"
                    className="form-label fw-semibold"
                    >
                    Título
                    </label>

                    <input
                    id="credentialTitle"
                    type="text"
                    name="title"
                    className="form-control"
                    value={form.title}
                    onChange={handleChange}
                    maxLength={255}
                    required
                    disabled={submitting}
                    />
                </div>

                {/* DESCRIPCIÓN */}

                <div className="mb-3">
                    <label
                    htmlFor="credentialDescription"
                    className="form-label fw-semibold"
                    >
                    Descripción
                    </label>

                    <textarea
                    id="credentialDescription"
                    name="description"
                    className="form-control"
                    value={form.description}
                    onChange={handleChange}
                    rows={4}
                    maxLength={2000}
                    disabled={submitting}
                    />
                </div>
                </div>

                {/* FOOTER */}

                <div className="modal-footer">
                <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={onClose}
                    disabled={submitting}
                >
                    Cancelar
                </button>

                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={submitting || !form.title.trim()}
                >
                    {submitting ? (
                    <>
                        <span
                        className="spinner-border spinner-border-sm me-2"
                        aria-hidden="true"
                        />
                        Guardando...
                    </>
                    ) : (
                    <>
                        <i className="bi bi-check-lg me-2"></i>
                        Guardar cambios
                    </>
                    )}
                </button>
                </div>
            </form>
            </div>
        </div>
        </div>
    );
}
