import { useRef } from "react";
import VerificationSearchCard from "../components/VerificationSearchCard";
import VerificationResultCard from "../components/VerificationResultCard";
import { useVerifyCertificate } from "../hooks/useVerifyCertificate";
import "../styles/verification.css";

export default function CertificateVerificationPage() {

    const { mutate, 
            data, 
            isPending 
        } = useVerifyCertificate();

    const formRef = useRef(null);
    const resultRef = useRef(null);

    const handleVerify = (form) => {
        mutate(form, {
        onSuccess: () => {
            requestAnimationFrame(() => {
            setTimeout(() => {
                resultRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "start",
                });
            }, 250);
            });
        },
        });
    };

    const handleVerifyAnother = () => {
        formRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
        });
    };

    return (
        <div className="container verification-page py-5">
        {/* HERO */}

        <div className="verification-hero mb-5">
            <h2>Verificación pública de certificados</h2>

            <p>
            Comprueba la autenticidad de certificados emitidos por instituciones
            registradas en Cervalid.
            </p>
        </div>

        {/* FORMULARIO */}

        <div ref={formRef}>
            <VerificationSearchCard loading={isPending} onVerify={handleVerify} />
        </div>

        {/* RESULTADO */}

        {data && (
            <div ref={resultRef} className="verification-result-wrapper mt-4">
            <VerificationResultCard result={data} />

            <div className="text-center mt-4">
                <button
                className="btn btn-outline-primary"
                onClick={handleVerifyAnother}
                >
                <i className="bi bi-arrow-up-circle me-2"></i>
                Verificar otro certificado
                </button>
            </div>
            </div>
        )}
        </div>
    );
}
