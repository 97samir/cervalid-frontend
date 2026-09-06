import CompetencyForm from "./CompetencyForm";

export default function CompetencyEditModal({
    competency,
    academicPeriods = [],
    loading,
    onClose,
    onSubmit,
}) {
    if (!competency) return null;

    return (
        <div
        className="modal fade show"
        style={{
            display: "block",
            background: "rgba(0,0,0,.45)",
        }}
        tabIndex="-1"
        >
        <div className="modal-dialog modal-lg modal-dialog-scrollable">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title">Editar competencia</h5>

                <button type="button" className="btn-close" onClick={onClose} />
            </div>

            <div className="modal-body">
                <CompetencyForm
                key={competency.publicId}
                initialValues={competency}
                academicPeriods={academicPeriods}
                loading={loading}
                submitLabel="Guardar cambios"
                onSubmit={onSubmit}
                onCancel={onClose}
                />
            </div>
            </div>
        </div>
        </div>
    );
}
