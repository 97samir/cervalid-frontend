import { useState } from "react";

export default function TranscriptBlockchainCard({ transcript }) {

    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {

        if (!transcript.hash) return;

        try {

            await navigator.clipboard.writeText(transcript.hash);
            setCopied(true);
            setTimeout(() => {
                setCopied(false);
            }, 2500);

        } catch (error) {

            console.error(
                "Error copiando hash:",
                error
            );
        }
    };

    return (
        <div className="card border-0 bg-light mt-4">
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-start">
                    <div>
                        <div className="fw-semibold">
                            <i className="bi bi-link-45deg me-2 text-primary"></i>
                            Blockchain
                        </div>

                        <small className="text-muted">Hash del historial académico</small>
                    </div>

                    {transcript.hash && (
                        <button
                            className={
                                    copied
                                    ? "btn btn-success btn-sm"
                                    : "btn btn-outline-secondary btn-sm"
                                }
                            onClick={handleCopy}
                        >

                            {copied ? (
                                    <>
                                        <i className="bi bi-check-circle me-2"></i>
                                        Copiado
                                    </>
                                ) : (
                                    <>
                                        <i className="bi bi-copy me-2"></i>
                                        Copiar
                                    </>
                            )}

                        </button>
                    )}
                </div>

                <div className="mt-3">
                    <code className="text-break">
                        {transcript.hash
                        ? `${transcript.hash.substring(0, 32)}...`
                        : "Pendiente de emisión"}
                    </code>
                </div>
            </div>
        </div>
    );
}

