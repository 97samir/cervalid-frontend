import { useState } from "react";
import { credentialTypeLabels } from "../utils/credentialUtils";

const EMPTY_FORM = {
    type: "",
    title: "",
    description: "",
    awardedAt: "",
};

export default function CredentialForm({
    mode = "create",
    credential = null,
    isSubmitting = false,
    onSubmit,
    onCancel,
}) {
    const isEditMode = mode === "edit";

    const [formData, setFormData] = useState(() => {
        if (isEditMode && credential) {
        return {
            type: credential.type || "",
            title: credential.title || "",
            description: credential.description || "",
            awardedAt: credential.awardedAt || "",
        };
        }

        return EMPTY_FORM;
    });

    const [error, setError] = useState("");

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((previous) => ({
        ...previous,
        [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setError("");

        if (!formData.title.trim()) {
        setError("El título académico es obligatorio.");
        return;
        }

        if (!isEditMode) {
        if (!formData.type) {
            setError("El tipo de credencial es obligatorio.");
            return;
        }

        if (!formData.awardedAt) {
            setError("La fecha de otorgamiento es obligatoria.");
            return;
        }
        }

        const payload = isEditMode
        ? {
            title: formData.title.trim(),
            description: formData.description.trim() || null,
            }
        : {
            type: formData.type,
            title: formData.title.trim(),
            description: formData.description.trim() || null,
            awardedAt: formData.awardedAt,
            };

        try {
        await onSubmit(payload);
        } catch (submitError) {
        setError(
            submitError?.response?.data?.message ||
            "No se pudo guardar la credencial.",
        );
        }
    };

    return (
        <form onSubmit={handleSubmit}>
        {error && (
            <div className="alert alert-danger" role="alert">
            {error}
            </div>
        )}

        <div className="row g-4">
            {/* TIPO */}
            <div className="col-md-6">
            <label htmlFor="credentialType" className="form-label fw-semibold">
                Tipo de credencial
            </label>

            <select
                id="credentialType"
                name="type"
                className="form-select"
                value={formData.type}
                onChange={handleChange}
                disabled={isEditMode || isSubmitting}
                required={!isEditMode}
            >
                <option value="">Seleccionar tipo</option>

                {Object.entries(credentialTypeLabels).map(([value, label]) => (
                <option key={value} value={value}>
                    {label}
                </option>
                ))}
            </select>
            </div>

            {/* FECHA */}
            <div className="col-md-6">
            <label
                htmlFor="credentialAwardedAt"
                className="form-label fw-semibold"
            >
                Fecha de otorgamiento
            </label>

            <input
                id="credentialAwardedAt"
                type="date"
                name="awardedAt"
                className="form-control"
                value={formData.awardedAt}
                onChange={handleChange}
                disabled={isSubmitting}
                required={!isEditMode}
            />
            </div>

            {/* TÍTULO */}
            <div className="col-12">
            <label htmlFor="credentialTitle" className="form-label fw-semibold">
                Grado o título académico
            </label>

            <input
                id="credentialTitle"
                type="text"
                name="title"
                className="form-control"
                value={formData.title}
                onChange={handleChange}
                disabled={isSubmitting}
                maxLength={255}
                placeholder="Ej. Bachiller en Ingeniería de Sistemas"
                required
            />
            </div>

            {/* DESCRIPCIÓN */}
            <div className="col-12">
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
                value={formData.description}
                onChange={handleChange}
                disabled={isSubmitting}
                maxLength={1000}
                rows={4}
                placeholder="Información adicional de la credencial..."
            />
            </div>
        </div>

        <div className="d-flex justify-content-end gap-2 mt-4 pt-4 border-top">
            {onCancel && (
            <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={onCancel}
                disabled={isSubmitting}
            >
                Cancelar
            </button>
            )}

            <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
            >
            {isSubmitting ? (
                <>
                <span
                    className="spinner-border spinner-border-sm me-2"
                    aria-hidden="true"
                />
                Guardando...
                </>
            ) : isEditMode ? (
                <>
                <i className="bi bi-check-lg me-2"></i>
                Guardar cambios
                </>
            ) : (
                <>
                <i className="bi bi-check-lg me-2"></i>
                Registrar credencial
                </>
            )}
            </button>
        </div>
        </form>
    );
}
