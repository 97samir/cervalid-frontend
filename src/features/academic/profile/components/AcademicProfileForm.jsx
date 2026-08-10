import { useState } from "react";

export default function AcademicProfileForm({
    initialValues,
    loading = false,
    submitLabel = "Guardar",
    onSubmit,
    onCancel,
}) {

    const [form, setForm] = useState({
        program: initialValues?.program || "",
        faculty: initialValues?.faculty || "",
        modality: initialValues?.modality || "",
        currentCycle: initialValues?.currentCycle || "",
        advisor: initialValues?.advisor || "",
        active: initialValues?.active ?? true,
    });

    const handleChange = (e) => {

        const {
            name,
            value,
            type,
            checked,
        } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox"
                ? checked
                : value,
        }));
    };

    const handleSubmit = (e) => {

        e.preventDefault();

        if (!onSubmit) return;

        onSubmit({
            ...form,
            currentCycle:
                form.currentCycle === ""
                    ? null
                    : Number(form.currentCycle),
        });
    };

    return (
        <form onSubmit={handleSubmit}>

            <div className="row g-4">

                {/* Programa */}

                <div className="col-md-6">
                    <label className="form-label">
                        Programa académico
                    </label>

                    <input
                        type="text"
                        name="program"
                        className="form-control"
                        value={form.program}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Facultad */}

                <div className="col-md-6">
                    <label className="form-label">
                        Facultad
                    </label>

                    <input
                        type="text"
                        name="faculty"
                        className="form-control"
                        value={form.faculty}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Modalidad */}

                <div className="col-md-6">
                    <label className="form-label">
                        Modalidad
                    </label>

                    <select
                        name="modality"
                        className="form-select"
                        value={form.modality}
                        onChange={handleChange}
                        required
                    >
                        <option value="">
                            Seleccione...
                        </option>

                        <option value="PRESENCIAL">
                            Presencial
                        </option>

                        <option value="SEMIPRESENCIAL">
                            Semipresencial
                        </option>

                        <option value="VIRTUAL">
                            Virtual
                        </option>
                    </select>
                </div>

                {/* Ciclo */}

                <div className="col-md-3">
                    <label className="form-label">
                        Ciclo actual
                    </label>

                    <input
                        type="number"
                        min="1"
                        name="currentCycle"
                        className="form-control"
                        value={form.currentCycle}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Tutor */}

                <div className="col-md-3">
                    <label className="form-label">
                        Tutor
                    </label>

                    <input
                        type="text"
                        name="advisor"
                        className="form-control"
                        value={form.advisor}
                        onChange={handleChange}
                    />
                </div>

                {/* Estado */}

                <div className="col-md-12">

                    <div className="form-check">

                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="active"
                            name="active"
                            checked={form.active}
                            onChange={handleChange}
                        />

                        <label
                            htmlFor="active"
                            className="form-check-label"
                        >
                            Perfil académico activo
                        </label>

                    </div>

                </div>

            </div>

            <div className="d-flex justify-content-end gap-2 mt-4">

                <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={onCancel}
                    disabled={loading}
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

        </form>
    );
}