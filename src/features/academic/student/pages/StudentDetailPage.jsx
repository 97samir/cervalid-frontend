import { Link, useParams } from "react-router-dom";
import { useState } from "react";

import { useStudent } from "../hooks/useStudent";

import StudentDetailCard from "../components/StudentDetailCard";
import AcademicProfileCard from "../../profile/components/AcademicProfileCard";
import TranscriptCard from "../../transcript/components/TranscriptCard";
import CompetencyCard from "../../competency/components/CompetencyCard";
import AchievementCard from "../../achievement/components/AchievementCard";
import CertificateCard from "../../certificate/components/CertificateCard";
import StudentEditModal from "../components/StudentEditModal";

export default function StudentDetailPage() {

    const { publicId } = useParams();
    const { data, isLoading, error } = useStudent(publicId);
    const [showEditModal, setShowEditModal] = useState(false);

    if (isLoading) {
        return (
        <div className="d-flex justify-content-center align-items-center py-5">
            <div
            className="spinner-border text-primary"
            role="status"
            aria-label="Cargando estudiante"
            />
        </div>
        );
    }

    if (error) {
        return (
        <div className="alert alert-danger border-0 shadow-sm">
            <div className="d-flex align-items-center">
            <i className="bi bi-exclamation-circle me-2"></i>

            <span>No fue posible cargar la información del estudiante.</span>
            </div>
        </div>
        );
    }

    if (!data) {
        return (
        <div className="alert alert-warning border-0 shadow-sm">
            No se encontró información del estudiante.
        </div>
        );
    }

    return (
        <div className="student-overview">
        {/*  ACCIONES */}

        <div className="d-flex justify-content-end align-items-center gap-2 mb-4">
            <Link
            to={`/institution/students/${data.publicId}/timeline`}
            className="btn btn-outline-primary"
            >
            <i className="bi bi-clock-history me-2"></i>
            Ver trazabilidad
            </Link>

            <Link to="/institution/students" className="btn btn-outline-secondary">
            <i className="bi bi-arrow-left me-2"></i>
            Volver
            </Link>
        </div>

        {/* IDENTIDAD DEL ESTUDIANTE */}

        <StudentDetailCard student={data} onEdit={() => setShowEditModal(true)} />

        {/*  INFORMACIÓN ACADÉMICA PRINCIPAL */}

        <section className="mb-4">
            <div className="d-flex align-items-center mb-3">
            <div>
                <h6 className="fw-bold mb-1">Información académica</h6>

                <p className="text-muted small mb-0">
                Perfil e historial académico del estudiante.
                </p>
            </div>
            </div>

            <div className="row g-4">
            <div className="col-lg-6">
                <AcademicProfileCard
                profile={data.profile}
                studentPublicId={data.publicId}
                />
            </div>

            <div className="col-lg-6">
                <TranscriptCard studentPublicId={data.publicId} />
            </div>
            </div>
        </section>

        {/* LOGROS Y COMPETENCIAS */}

        <section className="mb-4">
            <div className="d-flex align-items-center mb-3">
            <div>
                <h6 className="fw-bold mb-1">Desarrollo académico</h6>

                <p className="text-muted small mb-0">
                Competencias y logros obtenidos durante la trayectoria.
                </p>
            </div>
            </div>

            <div className="row g-4">
            <div className="col-lg-6">
                <CompetencyCard studentPublicId={data.publicId} />
            </div>

            <div className="col-lg-6">
                <AchievementCard studentPublicId={data.publicId} />
            </div>
            </div>
        </section>

        {/* CERTIFICADOS */}

        <section className="mb-4">
            <div className="d-flex align-items-center mb-3">
            <div>
                <h6 className="fw-bold mb-1">Certificación académica</h6>

                <p className="text-muted small mb-0">
                Certificados emitidos y disponibles para verificación.
                </p>
            </div>
            </div>

            <CertificateCard studentPublicId={data.publicId} />
        </section>

        {/* MODAL EDICIÓN */}

        {showEditModal && (
            <StudentEditModal
            key={data.publicId}
            student={data}
            onClose={() => setShowEditModal(false)}
            />
        )}
        </div>
    );
}
