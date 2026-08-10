import { useState } from "react";
import useAuthStore from "@/app/store/auth/useAuthStore";
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

    // para validacion tiempo real
    const handleBlur = (e) => {
        setTouched((prev) => ({
        ...prev,
        [e.target.name]: true,
        }));
    };

    return (

        <form onSubmit={handleSubmit}>
        {/* Datos de Usuario y Identidad Académica*/}

            <div className="row">
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

            {/* Perfil Académico */}
            {mode === "register" && (
                <>
                    <h5 className="mb-3">Perfil Académico</h5>

                    <div className="row">
                        <div className="col-md-6 mb-3">
                        <label className="form-label">Programa</label>

                        <select
                            name="program"
                            className={`form-select ${errors.program ? "is-invalid" : ""}`}
                            value={form.program}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Seleccione...</option>
                            <option value="Ingeniería de Software">
                            Ingeniería de Software
                            </option>
                            <option value="Administración de empresas">
                            Administración de empresas
                            </option>
                            <option value="Ingeniería en Ciencia de Datos">
                            Ingeniería en Ciencia de Datos
                            </option>
                            <option value="Ingeniería Ambiental">
                            Ingeniería Ambiental
                            </option>
                        </select>

                        {errors.program && (
                            <div className="invalid-feedback">{errors.program}</div>
                        )}
                        </div>

                        <div className="col-md-6 mb-3">
                        <label className="form-label">Facultad</label>

                        <select
                            name="faculty"
                            className={`form-select ${errors.faculty ? "is-invalid" : ""}`}
                            value={form.faculty}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Seleccione...</option>
                            <option value="Facultad de ingeniería">
                            Facultad de ingeniería
                            </option>
                            <option value="Facultad de Ciencias Económicas y Empresariales">
                            Facultad de Ciencias Económicas y Empresariales
                            </option>
                            <option value="Facultad de Educación">
                            Facultad de Educación
                            </option>
                            <option value="Facultad de Ciencias Humanas y Sociales">
                            Facultad de Ciencias Humanas y Sociales
                            </option>
                        </select>

                        {errors.faculty && (
                            <div className="invalid-feedback">{errors.faculty}</div>
                        )}
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6 mb-3">
                        <label className="form-label">Modalidad</label>

                        <select
                            name="modality"
                            className={`form-select ${errors.modality ? "is-invalid" : ""}`}
                            value={form.modality}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Seleccione...</option>
                            <option value="PRESENTIAL">Presencial</option>
                            <option value="VIRTUAL">Virtual</option>
                            <option value="SEMIPRESENCIAL">Semipresencial</option>
                        </select>

                        {errors.modality && (
                            <div className="invalid-feedback">{errors.modality}</div>
                        )}
                        </div>

                        <div className="col-md-6 mb-3">
                        <label className="form-label">Ciclo Actual</label>

                        <input
                            type="number"
                            name="currentCycle"
                            className={`form-select ${
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

            {/* Fechas */}

            <h5 className="mb-3">Fechas Académicas</h5>

            <div className="row">
                <div className="col-md-6 mb-3">
                <label className="form-label">Fecha de Ingreso</label>

                <input
                    type="date"
                    name="admissionDate"
                    className={`form-select ${
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

                <div className="col-md-6 mb-3">
                <label className="form-label">Fecha de Graduación</label>

                <input
                    type="date"
                    name="graduationDate"
                    className={`form-select ${
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

            {/* Acciones */}

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
