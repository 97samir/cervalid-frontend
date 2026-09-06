import { useEffect, useState } from "react";
import { getMyInstitution } from "../api/institutionApi";

const InstitutionProfilePage = () => {
    const [institution, setInstitution] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
        try {
            const data = await getMyInstitution();

            if (isMounted) {
            setInstitution(data);
            }
        } catch (error) {
            console.error(error);

            if (isMounted) {
            setError("No se pudo cargar la información de la institución.");
            }
        } finally {
            if (isMounted) {
            setLoading(false);
            }
        }
        };

        fetchData();

        return () => {
        isMounted = false;
        };
    }, []);

    // Loading
    if (loading) {
        return (
        <div className="container-fluid py-4">
            <div className="d-flex justify-content-center align-items-center py-5">
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Cargando...</span>
            </div>
            </div>
        </div>
        );
    }

    // Error
    if (error) {
        return (
        <div className="container-fluid py-4">
            <div className="alert alert-danger border-0 shadow-sm">
            <i className="bi bi-exclamation-circle me-2"></i>
            {error}
            </div>
        </div>
        );
    }

    if (!institution) {
        return null;
    }

    return (
        <div className="container-fluid py-0">
        {/*  HEADER

        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
            <div>
                <div className="d-flex align-items-center gap-2 mb-1">
                    <i className="bi bi-building text-primary fs-4"></i>

                    <h2 className="fw-bold mb-0">Perfil de Institución</h2>
                </div>

                <p className="text-muted mb-0">
                    Información general y datos institucionales
                </p>
            </div>
        </div>*/}

        {/* =====================================================
                    INSTITUTION HEADER CARD
                ====================================================== */}

        <div className="card border-0 shadow-sm mb-4">
            <div className="card-body p-4">
            <div className="d-flex flex-column flex-md-row align-items-md-center gap-3">
                {/* ICONO */}

                <div
                className="d-flex align-items-center justify-content-center rounded-3 bg-primary bg-opacity-10 text-primary flex-shrink-0"
                style={{
                    width: "64px",
                    height: "64px",
                }}
                >
                <i className="bi bi-building fs-2"></i>
                </div>

                {/* INFORMACIÓN PRINCIPAL */}

                <div className="flex-grow-1">
                <h3 className="fw-bold mb-1">{institution.name}</h3>

                <div className="d-flex flex-wrap gap-2 align-items-center">
                    <span className="text-muted">
                    RUC: {institution.ruc || "-"}
                    </span>

                    {institution.type && (
                    <>
                        <span className="text-muted">•</span>

                        <span className="badge bg-light text-dark border">
                        {institution.type}
                        </span>
                    </>
                    )}
                </div>
                </div>
            </div>
            </div>
        </div>

        {/* =====================================================
                    INFORMATION
                ====================================================== */}

        <div className="row g-4">
            {/* =================================================
                        INFORMACIÓN GENERAL
                    ================================================== */}

            <div className="col-12 col-xl-6">
            <div className="card border-0 shadow-sm h-100">
                <div className="card-header bg-white border-bottom py-3">
                <div className="d-flex align-items-center">
                    <div
                    className="d-flex align-items-center justify-content-center rounded-3 bg-primary bg-opacity-10 text-primary me-3"
                    style={{
                        width: "40px",
                        height: "40px",
                    }}
                    >
                    <i className="bi bi-info-circle"></i>
                    </div>

                    <div>
                    <h5 className="fw-bold mb-0">Información general</h5>

                    <small className="text-muted">
                        Datos principales de la institución
                    </small>
                    </div>
                </div>
                </div>

                <div className="card-body p-4">
                <div className="row g-4">
                    {/* Nombre */}

                    <div className="col-sm-6">
                    <small className="text-muted d-block mb-1">Nombre</small>

                    <span className="fw-semibold">{institution.name || "-"}</span>
                    </div>

                    {/* RUC */}

                    <div className="col-sm-6">
                    <small className="text-muted d-block mb-1">RUC</small>

                    <span className="fw-semibold">{institution.ruc || "-"}</span>
                    </div>

                    {/* Tipo */}

                    <div className="col-sm-6">
                    <small className="text-muted d-block mb-1">
                        Tipo de institución
                    </small>

                    <span className="fw-semibold">{institution.type || "-"}</span>
                    </div>

                    {/* Email */}

                    <div className="col-sm-6">
                    <small className="text-muted d-block mb-1">
                        Email institucional
                    </small>

                    <span className="fw-semibold text-break">
                        {institution.institutionalEmail || "-"}
                    </span>
                    </div>
                </div>
                </div>
            </div>
            </div>

            {/* =================================================
                        UBICACIÓN
                    ================================================== */}

            <div className="col-12 col-xl-6">
            <div className="card border-0 shadow-sm h-100">
                <div className="card-header bg-white border-bottom py-3">
                <div className="d-flex align-items-center">
                    <div
                    className="d-flex align-items-center justify-content-center rounded-3 bg-primary bg-opacity-10 text-primary me-3"
                    style={{
                        width: "40px",
                        height: "40px",
                    }}
                    >
                    <i className="bi bi-geo-alt"></i>
                    </div>

                    <div>
                    <h5 className="fw-bold mb-0">Ubicación</h5>

                    <small className="text-muted">Ubicación registrada</small>
                    </div>
                </div>
                </div>

                <div className="card-body p-4">
                <div className="row g-4">
                    {/* País */}

                    <div className="col-sm-6">
                    <small className="text-muted d-block mb-1">País</small>

                    <span className="fw-semibold">
                        {institution.country || "-"}
                    </span>
                    </div>

                    {/* Ciudad */}

                    <div className="col-sm-6">
                    <small className="text-muted d-block mb-1">Ciudad</small>

                    <span className="fw-semibold">{institution.city || "-"}</span>
                    </div>

                    {/* Dirección */}

                    <div className="col-12">
                    <small className="text-muted d-block mb-1">Dirección</small>

                    <span className="fw-semibold">
                        {institution.address || "-"}
                    </span>
                    </div>
                </div>
                </div>
            </div>
            </div>

            {/* =================================================
                        PRESENCIA DIGITAL
                    ================================================== */}

            <div className="col-12">
            <div className="card border-0 shadow-sm">
                <div className="card-header bg-white border-bottom py-3">
                <div className="d-flex align-items-center">
                    <div
                    className="d-flex align-items-center justify-content-center rounded-3 bg-primary bg-opacity-10 text-primary me-3"
                    style={{
                        width: "40px",
                        height: "40px",
                    }}
                    >
                    <i className="bi bi-globe2"></i>
                    </div>

                    <div>
                    <h5 className="fw-bold mb-0">Presencia digital</h5>

                    <small className="text-muted">
                        Información pública y canales digitales
                    </small>
                    </div>
                </div>
                </div>

                <div className="card-body p-4">
                {/* SIN PRESENCIA DIGITAL */}

                {!institution.tienePresenciaDigital ? (
                    <div className="d-flex align-items-center gap-3">
                    <div
                        className="d-flex align-items-center justify-content-center rounded-3 bg-light text-muted flex-shrink-0"
                        style={{
                        width: "44px",
                        height: "44px",
                        }}
                    >
                        <i className="bi bi-globe2"></i>
                    </div>

                    <div>
                        <div className="fw-semibold">
                        Sin presencia digital registrada
                        </div>

                        <small className="text-muted">
                        La institución no tiene información digital registrada.
                        </small>
                    </div>
                    </div>
                ) : (
                    <div className="row g-4">
                    {/* Website */}

                    <div className="col-md-6 col-xl-3">
                        <small className="text-muted d-block mb-1">Sitio web</small>

                        {institution.website ? (
                        <a
                            href={institution.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-decoration-none fw-semibold text-break"
                        >
                            <i className="bi bi-box-arrow-up-right me-1"></i>
                            {institution.website}
                        </a>
                        ) : (
                        <span className="fw-semibold">-</span>
                        )}
                    </div>

                    {/* Email */}

                    <div className="col-md-6 col-xl-3">
                        <small className="text-muted d-block mb-1">
                        Email institucional
                        </small>

                        <span className="fw-semibold text-break">
                        {institution.institutionalEmail || "-"}
                        </span>
                    </div>

                    {/* Dominio */}

                    <div className="col-md-6 col-xl-3">
                        <small className="text-muted d-block mb-1">
                        Dominio institucional
                        </small>

                        <span className="fw-semibold text-break">
                        {institution.institutionalDominio || "-"}
                        </span>
                    </div>

                    {/* Estado */}

                    <div className="col-md-6 col-xl-3">
                        <small className="text-muted d-block mb-1">
                        Presencia digital
                        </small>

                        <span className="badge bg-success bg-opacity-10 text-success">
                        <i className="bi bi-check-circle me-1"></i>
                        Registrada
                        </span>
                    </div>

                    {/* Descripción */}

                    {institution.description && (
                        <div className="col-12">
                        <hr className="my-1" />

                        <small className="text-muted d-block mb-2">
                            Descripción
                        </small>

                        <p className="mb-0 text-secondary">
                            {institution.description}
                        </p>
                        </div>
                    )}
                    </div>
                )}
                </div>
            </div>
            </div>
        </div>
        </div>
    );
};

export default InstitutionProfilePage;
