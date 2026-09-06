import { useState } from "react";
import useAuthStore from "@/app/store/auth/useAuthStore";

import {
    academicProgramLabels,
    academicFacultyLabels,
    academicProgramFaculty,
    modalityLabels,
} from "@/shared/utils/enumUtils";

import { validateStudent } from "../utils/studentValidation";

export default function StudentForm({
    initialData = {},
    onSubmit,
    loading = false,
    mode = "register",
}) {
    const { user } = useAuthStore();

    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    const [form, setForm] = useState({
        email: "",
        institutionId: "",
        studentCode: "",
        program: "",
        faculty: "",
        modality: "",
        currentCycle: "",
        admissionDate: "",
        graduationDate: "",
        ...initialData,
    });

    const validationPreview = validateStudent(form, mode);

    const handleProgramChange = (e) => {
        const program = e.target.value;

        const faculty = academicProgramFaculty[program] || "";

        setForm((prev) => ({
        ...prev,
        program,
        faculty,
        }));

        setErrors((prev) => ({
        ...prev,
        program: undefined,
        faculty: undefined,
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
        ...prev,
        [name]: value,
        }));

        setErrors((prev) => ({
        ...prev,
        [name]: undefined,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const validationErrors = validateStudent(form, mode);

        if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);

        return;
        }

        onSubmit({
        ...form,
        institutionId: user?.institutionId,
        });
    };

    const handleBlur = (e) => {
        setTouched((prev) => ({
        ...prev,
        [e.target.name]: true,
        }));
    };

    return (
        <form onSubmit={handleSubmit}>
        {/*  DATOS DE USUARIO E IDENTIDAD ACADÉMICA */}

        <div className="row">
            {/* Correo */}
            <div className="col-md-6 mb-3">
            <h5 className="mb-3">Datos de Usuario</h5>

            <label className="form-label">Correo Electrónico</label>

            <input
                type="email"
                name="email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                placeholder="ej: ejemplo@institución.edu.pe"
                value={form.email}
                onChange={handleChange}
                required
            />

            {errors.email && (
                <div className="invalid-feedback">{errors.email}</div>
            )}
            </div>

            {/* Código */}
            <div className="col-md-6 mb-3">
            <h5 className="mb-3">Identidad Académica</h5>

            <label className="form-label">Código de Estudiante</label>

            <input
                type="text"
                name="studentCode"
                className={`form-control ${
                touched.studentCode && validationPreview.studentCode
                    ? "is-invalid"
                    : touched.studentCode && !validationPreview.studentCode
                    ? "is-valid"
                    : ""
                }`}
                placeholder="ej: STU-2026-0001"
                value={form.studentCode}
                onChange={handleChange}
                onBlur={handleBlur}
                required
            />
            </div>
        </div>

        <hr />

        {/*  PERFIL ACADÉMICO  */}

        {mode === "register" && (
            <>
            <h5 className="mb-3">Perfil Académico</h5>

            <div className="row">
                {/* Programa */}
                <div className="col-md-6 mb-3">
                <label className="form-label">Programa académico</label>

                <select
                    name="program"
                    className={`form-select ${errors.program ? "is-invalid" : ""}`}
                    value={form.program}
                    onChange={handleProgramChange}
                    required
                >
                    <option value="">Seleccione un programa...</option>

                    {Object.entries(academicProgramLabels).map(([value, label]) => (
                    <option key={value} value={value}>
                        {label}
                    </option>
                    ))}
                </select>

                {errors.program && (
                    <div className="invalid-feedback">{errors.program}</div>
                )}
                </div>

                {/* Facultad */}
                <div className="col-md-6 mb-3">
                <label className="form-label">Facultad</label>

                <select
                    name="faculty"
                    className={`form-select ${errors.faculty ? "is-invalid" : ""}`}
                    value={form.faculty}
                    disabled
                >
                    <option value="">Seleccione primero un programa...</option>

                    {Object.entries(academicFacultyLabels).map(([value, label]) => (
                    <option key={value} value={value}>
                        {label}
                    </option>
                    ))}
                </select>

                {errors.faculty && (
                    <div className="invalid-feedback">{errors.faculty}</div>
                )}
                </div>
            </div>

            <div className="row">
                {/* Modalidad */}
                <div className="col-md-6 mb-3">
                <label className="form-label">Modalidad</label>

                <select
                    name="modality"
                    className={`form-select ${errors.modality ? "is-invalid" : ""}`}
                    value={form.modality}
                    onChange={handleChange}
                    required
                >
                    <option value="">Seleccione una modalidad...</option>

                    {Object.entries(modalityLabels).map(([value, label]) => (
                    <option key={value} value={value}>
                        {label}
                    </option>
                    ))}
                </select>

                {errors.modality && (
                    <div className="invalid-feedback">{errors.modality}</div>
                )}
                </div>

                {/* Ciclo */}
                <div className="col-md-6 mb-3">
                <label className="form-label">Ciclo Actual</label>

                <input
                    type="number"
                    name="currentCycle"
                    min="1"
                    max="10"
                    className={`form-control ${
                    errors.currentCycle ? "is-invalid" : ""
                    }`}
                    placeholder="ej: 5"
                    value={form.currentCycle}
                    onChange={handleChange}
                    required
                />

                {errors.currentCycle && (
                    <div className="invalid-feedback">{errors.currentCycle}</div>
                )}
                </div>
            </div>

            <hr />
            </>
        )}

        {/*  FECHAS ACADÉMICAS */}

        <h5 className="mb-3">Fechas Académicas</h5>

        <div className="row">
            {/* Fecha de ingreso */}
            <div className="col-md-6 mb-3">
            <label className="form-label">Fecha de Ingreso</label>

            <input
                type="date"
                name="admissionDate"
                className={`form-control ${
                errors.admissionDate ? "is-invalid" : ""
                }`}
                value={form.admissionDate}
                onChange={handleChange}
                required
            />

            {errors.admissionDate && (
                <div className="invalid-feedback">{errors.admissionDate}</div>
            )}
            </div>

            {/* Fecha de graduación */}
            <div className="col-md-6 mb-3">
            <label className="form-label">Fecha de Graduación</label>

            <input
                type="date"
                name="graduationDate"
                className={`form-control ${
                errors.graduationDate ? "is-invalid" : ""
                }`}
                value={form.graduationDate}
                onChange={handleChange}
                required
            />

            {errors.graduationDate && (
                <div className="invalid-feedback">{errors.graduationDate}</div>
            )}
            </div>
        </div>

        {/*  ACCIONES */}

        <div className="d-flex justify-content-end mt-4">
            <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading
                ? "Guardando..."
                : mode === "register"
                ? "Registrar Estudiante"
                : "Crear Estudiante"}
            </button>
        </div>
        </form>
    );
}
