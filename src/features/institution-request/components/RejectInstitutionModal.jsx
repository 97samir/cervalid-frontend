import { useState } from "react";

const RejectInstitutionModal = ({
    show,
    onClose,
    onConfirm,
    loading
}) => {

    const [reason, setReason] = useState("");

    if (!show) return null;

    const handleSubmit = () => {

        if (!reason.trim()) {
            alert("Ingrese un motivo");
            return;
        }

        onConfirm(reason);
    };

    return (

        <div className="modal d-block" tabIndex="-1">

            <div className="modal-dialog">

                <div className="modal-content">

                    <div className="modal-header">

                        <h5 className="modal-title">
                            Rechazar institución
                        </h5>

                        <button
                            type="button"
                            className="btn-close"
                            onClick={onClose}
                        />

                    </div>

                    <div className="modal-body">

                        <label className="form-label">
                            Motivo del rechazo
                        </label>

                        <textarea
                            className="form-control"
                            rows="4"
                            value={reason}
                            onChange={(e) =>
                                setReason(e.target.value)
                            }
                        />

                    </div>

                    <div className="modal-footer">

                        <button
                            className="btn btn-secondary"
                            onClick={onClose}
                        >
                            Cancelar
                        </button>

                        <button
                            className="btn btn-danger"
                            onClick={handleSubmit}
                            disabled={loading}
                        >
                            {loading
                                ? "Procesando..."
                                : "Rechazar"}
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default RejectInstitutionModal;