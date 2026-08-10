import { useState } from "react";

export default function TranscriptForm({

    initialValues,
    loading = false,
    submitLabel = "Guardar",
    onSubmit,
    onCancel,

}) {

    const [academicPeriod, setAcademicPeriod] = useState(
        initialValues?.academicPeriod || "",
    );

    const [items, setItems] = useState(
        initialValues?.items || [
        {
            courseCode: "",
            courseName: "",
            credits: "",
            grade: "",
        },
        ],
    );

    const addItem = () => {
        setItems((prev) => [
        ...prev,

        {
            courseCode: "",
            courseName: "",
            credits: "",
            grade: "",
        },
        ]);
    };

    const removeItem = (index) => {
        setItems((prev) => prev.filter((_, i) => i !== index));
    };

    const updateItem = (index, field, value) => {
        const copy = [...items];

        copy[index][field] = value;

        setItems(copy);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        onSubmit({
            academicPeriod,

            items: items.map((item) => ({
                ...item,

                credits: Number(item.credits),

                grade: Number(item.grade),
            })),
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="card shadow-sm">
                <div className="card-body">
                    <h5 className="mb-4">Información General</h5>

                    <div className="row">
                        <div className="col-md-4">
                            <label className="form-label">Periodo Académico</label>

                            <input
                                className="form-control"
                                placeholder="2026-I"
                                value={academicPeriod}
                                onChange={(e) => setAcademicPeriod(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="card shadow-sm mt-4">
                <div className="card-header bg-white d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">Cursos</h5>

                    <button
                        type="button"
                        className="btn btn-primary btn-sm"
                        onClick={addItem}
                    >
                        + Agregar Curso
                    </button>
                </div>

                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0">
                            <thead className="table-light">
                                <tr>
                                    <th style={{ width: "15%" }}>Código</th>
                                    <th>Curso</th>
                                    <th style={{ width: "12%" }}>Créditos</th>
                                    <th style={{ width: "12%" }}>Nota</th>
                                    <th style={{ width: "10%" }}></th>
                                </tr>
                            </thead>

                            <tbody>
                                {items.map((item, index) => (
                                <tr key={index}>
                                    <td>
                                        <input
                                            className="form-control"
                                            value={item.courseCode}
                                            onChange={(e) =>
                                            updateItem(
                                                index,

                                                "courseCode",

                                                e.target.value,
                                            )
                                            }
                                            required
                                        />
                                    </td>

                                    <td>
                                        <input
                                            className="form-control"
                                            value={item.courseName}
                                            onChange={(e) =>
                                            updateItem(
                                                index,

                                                "courseName",

                                                e.target.value,
                                            )
                                            }
                                            required
                                        />
                                    </td>

                                    <td>
                                        <input
                                            type="number"
                                            min="1"
                                            className="form-control"
                                            value={item.credits}
                                            onChange={(e) =>
                                            updateItem(
                                                index,

                                                "credits",

                                                e.target.value,
                                            )
                                            }
                                            required
                                        />
                                    </td>

                                    <td>
                                        <input
                                            type="number"
                                            min="0"
                                            max="20"
                                            step="0.01"
                                            className="form-control"
                                            value={item.grade}
                                            onChange={(e) =>
                                            updateItem(
                                                index,

                                                "grade",

                                                e.target.value,
                                            )
                                            }
                                            required
                                        />
                                    </td>

                                    <td>
                                    <button
                                        type="button"
                                        className="btn btn-outline-danger btn-sm"
                                        onClick={() => removeItem(index)}
                                        disabled={items.length === 1}
                                    >
                                        <i className="bi bi-trash"></i>
                                    </button>
                                    </td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="card-footer bg-white d-flex justify-content-end gap-2">
                    <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={onCancel}
                    >
                        Cancelar
                    </button>

                    <button className="btn btn-primary" disabled={loading}>
                        {loading ? "Guardando..." : submitLabel}
                    </button>
                </div>
            </div>
        </form>
    );
}
