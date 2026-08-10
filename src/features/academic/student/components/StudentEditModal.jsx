import { useState } from "react";
import { useUpdateStudent } from "../hooks/useUpdateStudent";
import { studentStatusLabels } from "@/shared/utils/enumUtils";

export default function StudentEditModal({ 
    student, onClose }) {

    const mutation = useUpdateStudent();

    const [form, setForm] = useState(() => ({
        status: student?.status || "ACTIVE",
        graduationDate: student?.graduationDate || "",
    }));

    if (!student) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
        ...prev,
        [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        mutation.mutate(
        {
            publicId: student.publicId,
            data: form,
        },
        {
            onSuccess: () => {
            onClose();
            },
        },
        );
    };

    return (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-modal="true"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)",}} >

        <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow">
            {/* HEADER */}

            <div className="modal-header">
                <div>
                <h5 className="modal-title fw-bold mb-1">
                    <i className="bi bi-pencil-square text-primary me-2"></i>
                    Editar estudiante
                </h5>

                <small className="text-muted">
                    Actualiza la información académica del estudiante.
                </small>
                </div>

                <button
                type="button"
                className="btn-close"
                onClick={onClose}
                disabled={mutation.isPending}
                aria-label="Cerrar"
                />
            </div>

            {/* BODY */}

            <form onSubmit={handleSubmit}>
                <div className="modal-body">
                {/* IDENTIDAD */}

                <div className="bg-light rounded p-3 mb-4">
                    <div className="d-flex align-items-center">
                    <div className="me-3">
                        <i className="bi bi-person-circle fs-2 text-primary"></i>
                    </div>

                    <div>
                        <div className="fw-semibold">
                        {student.fullName || "Estudiante"}
                        </div>

                        <small className="text-muted">
                        Código: {student.studentCode}
                        </small>
                    </div>
                    </div>
                </div>

                {/* ESTADO */}

                <div className="mb-4">
                    <label
                    htmlFor="student-status"
                    className="form-label fw-semibold"
                    >
                    Estado académico
                    </label>

                    <select
                    id="student-status"
                    name="status"
                    className="form-select"
                    value={form.status}
                    onChange={handleChange}
                    disabled={mutation.isPending}
                    >
                    <option value="ACTIVE">
                        {studentStatusLabels.ACTIVE ?? "Activo"}
                    </option>

                    <option value="INACTIVE">
                        {studentStatusLabels.INACTIVE ?? "Inactivo"}
                    </option>

                    <option value="PENDING_ACTIVATION">
                        {studentStatusLabels.PENDING_ACTIVATION ??
                        "Pendiente de activación"}
                    </option>
                    </select>

                    <div className="form-text">
                    Define el estado actual de la identidad académica.
                    </div>
                </div>

                {/* GRADUACIÓN */}

                <div className="mb-2">
                    <label
                    htmlFor="student-graduation-date"
                    className="form-label fw-semibold"
                    >
                    Fecha de graduación
                    </label>

                    <input
                    id="student-graduation-date"
                    type="date"
                    name="graduationDate"
                    className="form-control"
                    value={form.graduationDate}
                    onChange={handleChange}
                    disabled={mutation.isPending}
                    />

                    <div className="form-text">
                    Déjalo vacío si el estudiante todavía está en formación.
                    </div>
                </div>
                </div>

                {/* FOOTER */}

                <div className="modal-footer">
                <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={onClose}
                    disabled={mutation.isPending}
                >
                    Cancelar
                </button>

                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={mutation.isPending}
                >
                    {mutation.isPending ? (
                    <>
                        <span
                        className="spinner-border spinner-border-sm me-2"
                        aria-hidden="true"
                        ></span>
                        Actualizando...
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
