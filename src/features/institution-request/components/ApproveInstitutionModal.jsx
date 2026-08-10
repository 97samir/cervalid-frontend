import { useState } from "react";

const ApproveInstitutionModal = ({
    show,
    onClose,
    onConfirm,
    loading
}) => {

    const [walletAddress, setWalletAddress] = useState("");

    if (!show) return null;

    const handleSubmit = () => {

        if (!walletAddress.trim()) {
            alert("Ingrese una wallet");
            return;
        }

        onConfirm(walletAddress);
    };

    return (
        <div className="modal d-block" tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">
                            Aprobar institución
                        </h5>

                        <button
                            type="button"
                            className="btn-close"
                            onClick={onClose}
                        />
                    </div>

                    <div className="modal-body">

                        <label className="form-label">
                            Wallet institucional
                        </label>

                        <input
                            type="text"
                            className="form-control"
                            placeholder="0x..."
                            value={walletAddress}
                            onChange={(e) =>
                                setWalletAddress(e.target.value)
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
                            className="btn btn-success"
                            onClick={handleSubmit}
                            disabled={loading}
                        >
                            {loading
                                ? "Procesando..."
                                : "Aprobar"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ApproveInstitutionModal;