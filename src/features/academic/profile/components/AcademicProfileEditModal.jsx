import AcademicProfileForm from "./AcademicProfileForm";

export default function AcademicProfileEditModal({
    
    profile,
    show,
    loading = false,
    onSubmit,
    onClose,

}) {
    if (!show || !profile) {
        return null;
    }

    return (
        <>
        <div
            className="modal fade show d-block"
            tabIndex="-1"
            role="dialog"
            aria-modal="true"
        >
            <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
                <div className="modal-header">
                <div>
                    <h5 className="modal-title fw-bold">
                    <i className="bi bi-person-vcard me-2 text-primary"></i>
                    Editar Perfil Académico
                    </h5>

                    <small className="text-muted">
                    Actualice la información académica del estudiante.
                    </small>
                </div>

                <button
                    type="button"
                    className="btn-close"
                    onClick={onClose}
                    disabled={loading}
                ></button>
                </div>

                <div className="modal-body">
                <AcademicProfileForm
                    initialValues={profile}
                    onSubmit={onSubmit}
                    loading={loading}
                    submitLabel="Guardar cambios"
                    onCancel={onClose}
                />
                </div>
            </div>
            </div>
        </div>

        <div className="modal-backdrop fade show"></div>
        </>
    );
}
