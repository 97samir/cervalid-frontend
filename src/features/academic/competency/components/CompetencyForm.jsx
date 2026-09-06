import { useState } from "react";

import {
    competencyLevels,
    competencyLevelLabels,
} from "@/shared/utils/enumUtils";

export default function CompetencyForm({
    initialValues = {},
    loading = false,
    submitLabel = "Guardar",
    onSubmit,
    onCancel,
    academicPeriods = [],
}) {
    const [form, setForm] = useState(() => ({
        name: initialValues?.name ?? "",
        description: initialValues?.description ?? "",
        level: initialValues?.level ?? "BASIC",
        issuer: initialValues?.issuer ?? "",
        acquiredDate: initialValues?.acquiredDate ?? "",
        academicPeriod: initialValues?.academicPeriod ?? "",
    }));

    const handleChange = ({ target }) => {
        const { name, value } = target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        onSubmit({
            ...form,
            name: form.name.trim(),
            description: form.description.trim(),
            issuer: form.issuer.trim(),
            academicPeriod: form.academicPeriod.trim() || null,
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* =================================================
                INFORMACIÓN GENERAL
            ================================================== */}

            <div className="card shadow-sm border-0 mb-4">
                <div className="card-body">
                    <h5 className="mb-4">
                        <i className="bi bi-lightbulb me-2 text-primary"></i>
                        Información General
                    </h5>

                    <div className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">
                                Competencia
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Comunicación efectiva"
                                required
                            />
                        </div>

                        <div className="col-md-3">
                            <label className="form-label">
                                Nivel
                            </label>

                            <select
                                className="form-select"
                                name="level"
                                value={form.level}
                                onChange={handleChange}
                                required
                            >
                                {competencyLevels.map((level) => (
                                    <option
                                        key={level}
                                        value={level}
                                    >
                                        {competencyLevelLabels[level]}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="col-md-3">
                            <label className="form-label">
                                Fecha de adquisición
                            </label>

                            <input
                                type="date"
                                className="form-control"
                                name="acquiredDate"
                                value={form.acquiredDate}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">
                                Emisor
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                name="issuer"
                                value={form.issuer}
                                onChange={handleChange}
                                placeholder="Cisco, Microsoft, AWS, Google, etc."
                            />

                            <small className="text-muted">
                                Entidad que otorgó o certificó la
                                competencia.
                            </small>
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">
                                Periodo académico
                            </label>

                            <select
                                className="form-select"
                                name="academicPeriod"
                                value={form.academicPeriod}
                                onChange={handleChange}
                            >
                                <option value="">
                                    General / Sin periodo específico
                                </option>

                                {academicPeriods.map((period) => (
                                    <option
                                        key={period}
                                        value={period}
                                    >
                                        {period}
                                    </option>
                                ))}
                            </select>

                            <small className="text-muted">
                                Opcional. Úselo cuando la competencia
                                corresponda a un periodo académico
                                específico.
                            </small>
                        </div>
                    </div>
                </div>
            </div>

            {/* =================================================
                DESCRIPCIÓN
            ================================================== */}

            <div className="card shadow-sm border-0">
                <div className="card-body">
                    <h5 className="mb-4">
                        <i className="bi bi-card-text me-2 text-primary"></i>
                        Descripción
                    </h5>

                    <textarea
                        className="form-control"
                        rows={6}
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        placeholder="Describa la competencia adquirida..."
                    />
                </div>

                <div className="card-footer bg-white d-flex justify-content-end gap-2">
                    <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={onCancel}
                    >
                        Cancelar
                    </button>

                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={loading}
                    >
                        {loading
                            ? "Guardando..."
                            : submitLabel}
                    </button>
                </div>
            </div>
        </form>
    );
}