import AchievementForm from "./AchievementForm";

export default function AchievementEditModal({

    achievement,
    loading,
    show,
    onClose,
    onSubmit,
    
}) {

    if (!show || !achievement) return null;

    return (
        <div
        className="modal fade show"
        style={{
            display: "block",
            background: "rgba(0,0,0,.45)",
        }}
        >
        <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content border-0 shadow">
            <div className="modal-header">
                <h5 className="modal-title">Editar logro</h5>

                <button className="btn-close" onClick={onClose} />
            </div>

            <div className="modal-body">
                <AchievementForm
                initialValues={achievement}
                embedded
                submitLabel="Actualizar"
                loading={loading}
                onCancel={onClose}
                onSubmit={onSubmit}
                />
            </div>
            </div>
        </div>
        </div>
    );
}
