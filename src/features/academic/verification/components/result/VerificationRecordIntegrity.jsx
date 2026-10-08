import VerificationHashValue from "../shared/VerificationHashValue";
import VerificationEmptyReference from "../shared/VerificationEmptyReference";

export default function VerificationRecordIntegrity({
    result 
}) {
    const { verificationType, integrity = {} } = result;

    const {
        verificationHash,
        certificateHash,
        credentialHash,
        blockchainTxHash,
        blockchainNetwork,
        blockNumber,
        anchoredAt,
    } = integrity;

    const isCredential = verificationType === "CREDENTIAL";

    const resourceHash = isCredential ? credentialHash : certificateHash;

    const resourceHashLabel = isCredential
        ? "Huella de la credencial"
        : "Huella del certificado";

    const hasVerificationHash = Boolean(verificationHash);

    const hasResourceHash = Boolean(resourceHash);

    const hasBlockchainReference = Boolean(
        blockchainTxHash || blockchainNetwork || blockNumber || anchoredAt,
    );

    return (
        <div className="verification-info-card h-100">
        <div className="card-header">
            <div className="verification-card-icon">
            <i className="bi bi-shield-check" aria-hidden="true" />
            </div>

            <div>
            <div className="verification-card-title">Integridad del registro</div>

            <div className="verification-card-subtitle">
                Información de validación registrada
            </div>
            </div>
        </div>

        <div className="card-body">
            {hasVerificationHash ? (
            <div className="verification-integrity-field">
                <span className="verification-integrity-label">
                Huella de verificación
                </span>

                <VerificationHashValue value={verificationHash} />
            </div>
            ) : (
            <VerificationEmptyReference
                title="Huella de verificación no disponible"
                description="No se registró una huella de verificación para este documento."
            />
            )}

            {hasResourceHash && (
            <div className="verification-integrity-field">
                <span className="verification-integrity-label">
                {resourceHashLabel}
                </span>

                <VerificationHashValue value={resourceHash} />
            </div>
            )}

            {hasBlockchainReference && (
            <BlockchainReference
                transactionHash={blockchainTxHash}
                network={blockchainNetwork}
                blockNumber={blockNumber}
                anchoredAt={anchoredAt}
            />
            )}
        </div>
        </div>
    );
}

function BlockchainReference({
    transactionHash,
    network,
    blockNumber,
    anchoredAt,
}) {
    return (
        <div className="verification-blockchain-reference">
            <div className="verification-blockchain-header">
                <div className="verification-blockchain-icon">
                    <i
                        className="bi bi-link-45deg"
                        aria-hidden="true"
                    />
                </div>

                <div>
                    <div className="verification-blockchain-title">
                        Registro blockchain
                    </div>

                    <div className="verification-blockchain-subtitle">
                        Referencia adicional de trazabilidad
                    </div>
                </div>
            </div>

            {network && (
                <div className="verification-blockchain-item">
                    <span>Red</span>
                    <strong>{network}</strong>
                </div>
            )}

            {blockNumber !== null &&
                blockNumber !== undefined &&
                blockNumber !== "" && (
                    <div className="verification-blockchain-item">
                        <span>Bloque</span>
                        <strong>{blockNumber}</strong>
                    </div>
                )}

            {anchoredAt && (
                <div className="verification-blockchain-item">
                    <span>Registro</span>
                    <strong>{anchoredAt}</strong>
                </div>
            )}

            {transactionHash && (
                <div className="verification-blockchain-field">
                    <span>Transacción</span>

                    <VerificationHashValue
                        value={transactionHash}
                    />
                </div>
            )}
        </div>
    );
}