import { useState } from "react";

import {
    achievementTypes,
    achievementTypeLabels,
} from "@/shared/utils/enumUtils";

export default function AchievementForm({
    initialValues = {},
    academicPeriods = [],
    loading = false,
    submitLabel = "Guardar",
    onSubmit,
    onCancel,
}) {
    const [form, setForm] = useState(() => ({
        title: initialValues.title ?? "",
        description: initialValues.description ?? "",
        type: initialValues.type ?? "AWARD",
        issuer: initialValues.issuer ?? "",
        achievedDate: initialValues.achievedDate ?? "",
        academicPeriod: initialValues.academicPeriod ?? "",
    }));

    const handleChange = ({ target }) => {
        const { name, value } = target;

        setForm((prev) => ({
        ...prev,
        [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (loading) {
        return;
        }

        onSubmit({
        ...form,
        title: form.title.trim(),
        description: form.description.trim(),
        issuer: form.issuer.trim(),
        academicPeriod: form.academicPeriod.trim() || null,
        });
    };

    return (
        <form onSubmit={handleSubmit}>
        {/* INFORMACIÓN GENERAL */}

        <div className="card shadow-sm border-0 rounded-4 mb-4">
            <div className="card-body p-4">
            <h5 className="fw-semibold mb-4">
                <i className="bi bi-trophy me-2 text-warning"></i>
                Información general
            </h5>

            <div className="row g-3">
                {/* TÍTULO */}

                <div className="col-12 col-md-8">
                <label
                    htmlFor="achievement-title"
                    className="form-label fw-semibold"
                >
                    Título <span className="text-danger">*</span>
                </label>

                <input
                    id="achievement-title"
                    type="text"
                    className="form-control"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="Ej. Primer puesto Hackathon"
                    maxLength={255}
                    required
                    disabled={loading}
                />
                </div>

                {/* TIPO */}

                <div className="col-12 col-md-4">
                <label
                    htmlFor="achievement-type"
                    className="form-label fw-semibold"
                >
                    Tipo
                </label>

                <select
                    id="achievement-type"
                    className="form-select"
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                    disabled={loading}
                >
                    {achievementTypes.map((type) => (
                    <option key={type} value={type}>
                        {achievementTypeLabels[type]}
                    </option>
                    ))}
                </select>
                </div>

                {/* EMISOR */}

                <div className="col-12 col-md-6">
                <label
                    htmlFor="achievement-issuer"
                    className="form-label fw-semibold"
                >
                    Emisor
                </label>

                <input
                    id="achievement-issuer"
                    type="text"
                    className="form-control"
                    name="issuer"
                    value={form.issuer}
                    onChange={handleChange}
                    placeholder="IEEE, CONCYTEC, Microsoft..."
                    maxLength={255}
                    disabled={loading}
                />
                </div>

                {/* FECHA */}

                <div className="col-12 col-md-6">
                <label
                    htmlFor="achievement-date"
                    className="form-label fw-semibold"
                >
                    Fecha de obtención
                </label>

                <input
                    id="achievement-date"
                    type="date"
                    className="form-control"
                    name="achievedDate"
                    value={form.achievedDate}
                    onChange={handleChange}
                    disabled={loading}
                />
                </div>

                {/* PERIODO ACADÉMICO */}

                <div className="col-12 col-md-6">
                <label
                    htmlFor="achievement-period"
                    className="form-label fw-semibold"
                >
                    Periodo académico
                </label>

                <select
                    id="achievement-period"
                    className="form-select"
                    name="academicPeriod"
                    value={form.academicPeriod}
                    onChange={handleChange}
                    disabled={loading}
                >
                    <option value="">General / Sin periodo específico</option>

                    {academicPeriods.map((period) => (
                    <option key={period} value={period}>
                        {period}
                    </option>
                    ))}
                </select>

                <div className="form-text">
                    Opcional. Selecciona el periodo en el que se obtuvo este logro.
                </div>
                </div>
            </div>
            </div>
        </div>

        {/* DESCRIPCIÓN Y ACCIONES */}

        <div className="card shadow-sm border-0 rounded-4">
            <div className="card-body p-4">
            <h5 className="fw-semibold mb-4">
                <i className="bi bi-card-text me-2 text-primary"></i>
                Descripción
            </h5>

            <label
                htmlFor="achievement-description"
                className="form-label fw-semibold"
            >
                Detalles del logro
            </label>

            <textarea
                id="achievement-description"
                className="form-control"
                rows={3}
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Describe el logro obtenido..."
                maxLength={2000}
                disabled={loading}
            />
            </div>

            <div className="card-footer bg-white d-flex flex-column flex-sm-row justify-content-end gap-2">
            <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={onCancel}
                disabled={loading}
            >
                <i className="bi bi-x-lg me-2"></i>
                Cancelar
            </button>

            <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? (
                <>
                    <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                    />
                    Guardando...
                </>
                ) : (
                <>
                    <i className="bi bi-check-lg me-2"></i>
                    {submitLabel}
                </>
                )}
            </button>
            </div>
        </div>
        </form>
    );
}
