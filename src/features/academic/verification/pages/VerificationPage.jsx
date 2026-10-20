
import { useMemo, useRef, useState } from "react";

import VerificationSearchCard from "../components/VerificationSearchCard";
import VerificationResultCard from "../components/VerificationResultCard";
import VerificationDemo from "../components/VerificationDemo";

import { normalizeVerificationResult } from "../mapper/verificationMapper";
import { useVerifyCertificate } from "../hooks/useVerifyCertificate";
import { useVerifyCredential } from "../hooks/useVerifyCredential";

import "../styles/verificationPage.css";

export default function VerificationPage() {
    const [formResetKey, setFormResetKey] = useState(0);
    const [verificationType, setVerificationType] = useState("CERTIFICATE");
    const [demoInitialValues, setDemoInitialValues] = useState(null);

    const {
        mutate: verifyCertificate,
        data: certificateResult,
        isPending: isCertificatePending,
    } = useVerifyCertificate();

    const {
        mutate: verifyCredential,
        data: credentialResult,
        isPending: isCredentialPending,
    } = useVerifyCredential();

    const formRef = useRef(null);
    const resultRef = useRef(null);

    const isCredential = verificationType === "CREDENTIAL";

    const rawData = isCredential
        ? credentialResult
        : certificateResult;

    const data = useMemo(
        () => normalizeVerificationResult(rawData),
        [rawData]
    );

    const isPending = isCredential
        ? isCredentialPending
        : isCertificatePending;

    const scrollToElement = (ref) => {
        requestAnimationFrame(() => {
            ref.current?.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        });
    };

    const handleTypeChange = (type) => {
        if (type === verificationType) {
            return;
        }

        setVerificationType(type);
        setDemoInitialValues(null);
        setFormResetKey((current) => current + 1);
    };

    const handleTryDemo = (demo) => {
        setVerificationType(demo.type);

        setDemoInitialValues({
            resourceNumber: demo.resourceNumber,
            verificationHash: demo.verificationHash,
        });

        setFormResetKey((current) => current + 1);

        scrollToElement(formRef);
    };

    const handleVerify = (payload) => {
        const options = {
            onSuccess: () => scrollToElement(resultRef),
        };

        if (isCredential) {
            verifyCredential(payload, options);
            return;
        }

        verifyCertificate(payload, options);
    };

    const handleVerifyAnother = () => {
        setDemoInitialValues(null);
        setFormResetKey((current) => current + 1);

        scrollToElement(formRef);
    };

    return (
        <div className="verification-page">
            <div className="container">
                <section className="verification-intro-section">
                    {/* INTRODUCCIÓN */}
                    <div className="verification-intro-content">
                        <div className="verification-hero-icon">
                            <i
                                className="bi bi-shield-check"
                                aria-hidden="true"
                            />
                        </div>

                        <span className="verification-section-eyebrow">
                            Verificación pública
                        </span>

                        <h1 className="verification-hero-title">
                            Verifica un documento académico
                        </h1>

                        <p className="verification-hero-description">
                            Comprueba la autenticidad de un documento académico
                            emitido por una institución educativa registrada
                            en Cervalid.
                        </p>

                        <div className="verification-trust-points">
                            <span>
                                <i
                                    className="bi bi-check-circle-fill"
                                    aria-hidden="true"
                                />
                                Verificación segura
                            </span>

                            <span>
                                <i
                                    className="bi bi-lightning-charge-fill"
                                    aria-hidden="true"
                                />
                                Resultado rápido
                            </span>

                            <span>
                                <i
                                    className="bi bi-globe2"
                                    aria-hidden="true"
                                />
                                Consulta pública
                            </span>
                        </div>

                        <div className="verification-trust-card">
                            <div className="verification-trust-card-icon">
                                <i
                                    className="bi bi-shield-check"
                                    aria-hidden="true"
                                />
                            </div>

                            <div className="verification-trust-card-content">
                                <strong>Información confiable</strong>

                                <p>
                                    Cervalid permite comprobar la información
                                    registrada por la institución educativa
                                    emisora y consultar el estado de verificación
                                    del documento.
                                </p>

                                <ul className="verification-trust-card-list">
                                    <li>
                                        <i
                                            className="bi bi-check2"
                                            aria-hidden="true"
                                        />
                                        Datos institucionales
                                    </li>

                                    <li>
                                        <i
                                            className="bi bi-check2"
                                            aria-hidden="true"
                                        />
                                        Integridad del documento
                                    </li>

                                    <li>
                                        <i
                                            className="bi bi-check2"
                                            aria-hidden="true"
                                        />
                                        Consulta pública
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="verification-security-note">
                            <i
                                className="bi bi-lock-fill"
                                aria-hidden="true"
                            />

                            <span>
                                La consulta es pública y no requiere iniciar sesión.
                            </span>
                        </div>
                    </div>

                    {/* FORMULARIO */}
                    <div
                        ref={formRef}
                        className="verification-form-section"
                        aria-labelledby="verification-form-title"
                    >
                        <div className="verification-type-selector">
                            <div className="verification-type-heading">
                                <span className="verification-section-eyebrow">
                                    Tipo de documento
                                </span>

                                <h2 id="verification-form-title">
                                    ¿Qué deseas verificar?
                                </h2>
                            </div>

                            <div
                                className="verification-type-options"
                                role="group"
                                aria-label="Tipo de documento"
                            >
                                <button
                                    type="button"
                                    className={`verification-type-option ${
                                        !isCredential ? "active" : ""
                                    }`}
                                    onClick={() =>
                                        handleTypeChange("CERTIFICATE")
                                    }
                                    aria-pressed={!isCredential}
                                >
                                    <span className="verification-type-icon">
                                        <i
                                            className="bi bi-file-earmark-text"
                                            aria-hidden="true"
                                        />
                                    </span>

                                    <span className="verification-type-content">
                                        <strong>Certificado</strong>
                                        <small>
                                            Documento obtenido durante la
                                            trayectoria académica.
                                        </small>
                                    </span>

                                    <span className="verification-type-check">
                                        <i
                                            className="bi bi-check-circle-fill"
                                            aria-hidden="true"
                                        />
                                    </span>
                                </button>

                                <button
                                    type="button"
                                    className={`verification-type-option ${
                                        isCredential ? "active" : ""
                                    }`}
                                    onClick={() =>
                                        handleTypeChange("CREDENTIAL")
                                    }
                                    aria-pressed={isCredential}
                                >
                                    <span className="verification-type-icon">
                                        <i
                                            className="bi bi-mortarboard"
                                            aria-hidden="true"
                                        />
                                    </span>

                                    <span className="verification-type-content">
                                        <strong>
                                            Título o grado académico
                                        </strong>
                                        <small>
                                            Documento que acredita la
                                            culminación de una formación.
                                        </small>
                                    </span>

                                    <span className="verification-type-check">
                                        <i
                                            className="bi bi-check-circle-fill"
                                            aria-hidden="true"
                                        />
                                    </span>
                                </button>
                            </div>
                        </div>

                        <VerificationSearchCard
                            key={`${verificationType}-${formResetKey}`}
                            loading={isPending}
                            onVerify={handleVerify}
                            verificationType={verificationType}
                            initialValues={demoInitialValues ?? {}}
                        />
                    </div>
                </section>

                {/* RESULTADO */}
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

                            <h2 id="verification-result-title">
                                Resultado de verificación
                            </h2>
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
                                />
                                Verificar otro documento
                            </button>
                        </div>
                    </section>
                )}

                {/* CÓMO FUNCIONA */}
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
                            Cervalid permite comprobar la autenticidad de un
                            documento académico en pocos pasos.
                        </p>
                    </div>

                    <div className="verification-steps">
                        <article className="verification-step">
                            <div className="verification-step-number">1</div>
                            <div className="verification-step-icon">
                                <i
                                    className="bi bi-search"
                                    aria-hidden="true"
                                />
                            </div>
                            <h3>Ingresa los datos</h3>
                            <p>
                                Introduce el número y código de verificación
                                que aparecen en el documento académico.
                            </p>
                        </article>

                        <article className="verification-step">
                            <div className="verification-step-number">2</div>
                            <div className="verification-step-icon">
                                <i
                                    className="bi bi-shield-check"
                                    aria-hidden="true"
                                />
                            </div>
                            <h3>Cervalid verifica</h3>
                            <p>
                                El sistema comprueba la información registrada
                                y la integridad del documento.
                            </p>
                        </article>

                        <article className="verification-step">
                            <div className="verification-step-number">3</div>
                            <div className="verification-step-icon">
                                <i
                                    className="bi bi-patch-check"
                                    aria-hidden="true"
                                />
                            </div>
                            <h3>Obtén el resultado</h3>
                            <p>
                                Conoce el estado del documento y consulta su
                                información de verificación.
                            </p>
                        </article>
                    </div>
                </section>

                {/* DEMOSTRACIÓN */}
                <VerificationDemo onTryDemo={handleTryDemo} />
            </div>
        </div>
    );
}
