export default function TranscriptItemModal({

    show,
    onClose,
    onSubmit,
    form,
    setForm,
    editingItem = null,
    loading = false,

}) {

    if (!show) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
        ...prev,
        [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        onSubmit({
            courseCode: form.courseCode.trim(),
            courseName: form.courseName.trim(),
            credits: Number(form.credits),
            grade: Number(form.grade),
        });
    };

    return (
        <>
        <div className="modal fade show d-block">
            <div className="modal-dialog modal-lg">
                <div className="modal-content shadow">
                    <div className="modal-header">
                        <h5 className="modal-title">
                            {editingItem ? "Editar Curso" : "Agregar Curso"}
                        </h5>

                        <button type="button" className="btn-close" onClick={onClose} />
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="modal-body">
                            <div className="row g-3">
                                <div className="col-md-4">
                                    <label className="form-label">Código</label>

                                    <input
                                    className="form-control"
                                    name="courseCode"
                                    value={form.courseCode}
                                    onChange={handleChange}
                                    required
                                    />
                                </div>

                                <div className="col-md-8">
                                    <label className="form-label">Curso</label>

                                    <input
                                    className="form-control"
                                    name="courseName"
                                    value={form.courseName}
                                    onChange={handleChange}
                                    required
                                    />
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label">Créditos</label>

                                    <input
                                    type="number"
                                    min="1"
                                    className="form-control"
                                    name="credits"
                                    value={form.credits}
                                    onChange={handleChange}
                                    required
                                    />
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label">Nota</label>

                                    <input
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    max="20"
                                    className="form-control"
                                    name="grade"
                                    value={form.grade}
                                    onChange={handleChange}
                                    required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-outline-secondary"
                                onClick={onClose}
                                >
                                Cancelar
                            </button>

                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={loading}
                                >
                                {loading ? "Guardando..." : "Guardar"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <div className="modal-backdrop fade show"></div>
        </>
    );
}
