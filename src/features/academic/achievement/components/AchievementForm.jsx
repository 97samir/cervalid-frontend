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
    //embedded = false,

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

    const handleSubmit = (e) => {

        e.preventDefault();

        onSubmit({
            ...form,

            title: form.title.trim(),
            description: form.description.trim(),
            issuer: form.issuer.trim(),

            academicPeriod:
                form.academicPeriod.trim() || null,
        });
    };

    const content = (
        <>
            {/* INFORMACIÓN GENERAL*/}

            <div className="card shadow-sm border-0 mb-4">

                <div className="card-body">

                    <h5 className="mb-4">
                        <i className="bi bi-trophy me-2 text-warning"></i>
                        Información General
                    </h5>

                    <div className="row g-3">

                        {/* TÍTULO */}

                        <div className="col-md-8">

                            <label className="form-label">
                                Título
                            </label>

                            <input
                                className="form-control"
                                name="title"
                                value={form.title}
                                onChange={handleChange}
                                placeholder="Primer puesto Hackathon"
                                required
                            />

                        </div>

                        {/* TIPO */}

                        <div className="col-md-4">

                            <label className="form-label">
                                Tipo
                            </label>

                            <select
                                className="form-select"
                                name="type"
                                value={form.type}
                                onChange={handleChange}
                            >
                                {achievementTypes.map((type) => (
                                    <option
                                        key={type}
                                        value={type}
                                    >
                                        {achievementTypeLabels[type]}
                                    </option>
                                ))}
                            </select>

                        </div>

                        {/* EMISOR */}

                        <div className="col-md-6">

                            <label className="form-label">
                                Emisor
                            </label>

                            <input
                                className="form-control"
                                name="issuer"
                                value={form.issuer}
                                onChange={handleChange}
                                placeholder="IEEE, CONCYTEC, Microsoft..."
                            />

                        </div>

                        {/* FECHA */}

                        <div className="col-md-6">

                            <label className="form-label">
                                Fecha
                            </label>

                            <input
                                type="date"
                                className="form-control"
                                name="achievedDate"
                                value={form.achievedDate}
                                onChange={handleChange}
                            />

                        </div>

                        {/* PERIODO ACADÉMICO */}

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

                            <div className="form-text">
                                Opcional. Selecciona el periodo en el que
                                se obtuvo este logro.
                            </div>

                        </div>

                    </div>

                </div>

            </div>

            {/* DESCRIPCIÓN*/}
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
                        placeholder="Describe el logro obtenido..."
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
        </>
    );

    return (
        <form onSubmit={handleSubmit}>
            {content}
        </form>
    );
}