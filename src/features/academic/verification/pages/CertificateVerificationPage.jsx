import { useRef } from "react";

import VerificationSearchCard from "../components/VerificationSearchCard";
import VerificationResultCard from "../components/VerificationResultCard";
import { useVerifyCertificate } from "../hooks/useVerifyCertificate";

import "../styles/certificateVerification.css";

export default function CertificateVerificationPage() {

    const { mutate, data, isPending } = useVerifyCertificate();

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
        <div className="verification-page">
        <div className="container">

            {/* HERO */}
            <section className="verification-hero">
                
                {/*  
                <div className="verification-hero-icon">
                    <i className="bi bi-shield-check" aria-hidden="true"></i>
                </div>

                <span className="verification-eyebrow">Verificación pública</span>
                */}
                <h1>Verifica un certificado</h1>

                {/* <p>
                    Comprueba la autenticidad de un certificado académico emitido por
                    una institución registrada en Cervalid.
                </p> */}

                <div className="verification-trust-points">
                    <span>
                    <i className="bi bi-check-circle-fill" aria-hidden="true"></i>
                    Verificación segura
                    </span>

                    <span>
                    <i className="bi bi-lightning-charge-fill" aria-hidden="true"></i>
                    Resultado rápido
                    </span>

                    <span>
                    <i className="bi bi-globe2" aria-hidden="true"></i>
                    Consulta pública
                    </span>
                </div>
            </section>

            {/* VERIFICATION FORM  */}

            <section
            ref={formRef}
            className="verification-form-section"
            aria-labelledby="verification-form-title"
            >
                <VerificationSearchCard loading={isPending} onVerify={handleVerify} />
            </section>

            {/* RESULT */}

            {data && (
            <section
                ref={resultRef}
                className="verification-result-section"
                aria-labelledby="verification-result-title"
            >
                <div className="verification-result-heading">
                <span className="verification-section-eyebrow">
                    Resultado de la consulta
                </span>

                <h2 id="verification-result-title">Resultado de verificación</h2>
                </div>

                <VerificationResultCard result={data} />

                <div className="verification-another-wrapper">
                <button
                    type="button"
                    className="btn verification-another-btn"
                    onClick={handleVerifyAnother}
                >
                    <i
                    className="bi bi-arrow-up-circle me-2"
                    aria-hidden="true"
                    ></i>
                    Verificar otro certificado
                </button>
                </div>
            </section>
            )}

            {/* HOW IT WORKS  */}

            <section
            className="verification-how-section"
            aria-labelledby="verification-how-title"
            >
            <div className="verification-section-heading">
                <span className="verification-section-eyebrow">
                Proceso de verificación
                </span>

                <h2 id="verification-how-title">¿Cómo funciona?</h2>

                <p>
                Cervalid permite comprobar la autenticidad de un certificado en
                pocos pasos.
                </p>
            </div>

            <div className="verification-steps">
                {/* STEP 1 */}

                <article className="verification-step">
                <div className="verification-step-number">1</div>

                <div className="verification-step-icon">
                    <i className="bi bi-search" aria-hidden="true"></i>
                </div>

                <h3>Ingresa los datos</h3>

                <p>
                    Introduce el número y código de verificación que aparecen en el
                    certificado.
                </p>
                </article>

                {/* STEP 2 */}

                <article className="verification-step">
                <div className="verification-step-number">2</div>

                <div className="verification-step-icon">
                    <i className="bi bi-shield-check" aria-hidden="true"></i>
                </div>

                <h3>Cervalid verifica</h3>

                <p>
                    El sistema comprueba la información registrada y la integridad
                    del certificado.
                </p>
                </article>

                {/* STEP 3 */}

                <article className="verification-step">
                <div className="verification-step-number">3</div>

                <div className="verification-step-icon">
                    <i className="bi bi-patch-check" aria-hidden="true"></i>
                </div>

                <h3>Obtén el resultado</h3>

                <p>
                    Conoce el estado del certificado y consulta su información de
                    verificación.
                </p>
                </article>
            </div>
            </section>

            {/*  DEMO */}

            <section className="verification-demo-section">
            <div className="verification-demo-card">
                <div className="verification-demo-icon">
                <i className="bi bi-stars" aria-hidden="true"></i>
                </div>

                <div className="verification-demo-content">
                <span className="verification-demo-label">
                    Prueba la verificación
                </span>

                <h2>Certificado de demostración</h2>

                <p>
                    Puedes utilizar un certificado de prueba para conocer cómo
                    funciona el proceso.
                </p>
                </div>

                <div className="verification-demo-code">CERT-2025-001</div>
            </div>
            </section>
        </div>
        </div>
    );
}
