import { useState } from "react";
import { Link } from "react-router-dom";

import { 
    modalityLabels,
    academicProgramLabels,
    academicFacultyLabels,
 } from "@/shared/utils/enumUtils";

import AcademicProfileEditModal from "./AcademicProfileEditModal";
import { useUpdateProfile } from "../hooks/useUpdateProfile";

export default function AcademicProfileCard({ 
    profile, 
    studentPublicId 
}) {

    const [showEditModal, setShowEditModal] = useState(false);
    const updateMutation = useUpdateProfile();

    if (!profile) {
        return (
        <div className="card border-0 shadow-sm mb-4">
            <div className="card-body text-center py-5">
            <div className="display-6 text-warning mb-3">
                <i className="bi bi-person-vcard"></i>
            </div>

            <h5 className="fw-bold">Perfil Académico</h5>

            <p className="text-muted mb-4">
                Este estudiante todavía no posee un perfil académico registrado.
            </p>

            <Link
                to={`/institution/students/${studentPublicId}/profile/create`}
                className="btn btn-primary"
            >
                <i className="bi bi-plus-circle me-2"></i>
                Crear perfil académico
            </Link>
            </div>
        </div>
        );
    }

    return (
        <>
            <div className="card border-0 shadow-sm mb-4">

                {/* HEADER */}
                <div className="card-header bg-white border-0 py-3">
                    <div className="d-flex justify-content-between align-items-center">
                    <div>
                        <h5 className="fw-bold mb-1">
                        <i className="bi bi-person-vcard me-2 text-primary"></i>
                        Perfil Académico
                        </h5>

                        <small className="text-muted">
                        Información académica principal del estudiante
                        </small>
                    </div>

                    <button
                        type="button"
                        className="btn btn-outline-primary"
                        onClick={() => setShowEditModal(true)}
                    >
                        <i className="bi bi-pencil me-2"></i>
                        Editar
                    </button>
                    </div>
                </div>

                {/* BODY */}
                <div className="card-body">
                    <div className="row g-4">
                    {/* Columna izquierda */}

                    <div className="col-lg-6">
                        <div className="mb-4">
                        <small className="text-muted d-block">Programa académico</small>

                        <div className="fw-semibold">
                            <i className="bi bi-mortarboard me-2 text-primary"></i>
                            {/* {profile.program} */}
                            {academicProgramLabels[profile.program] ?? "-"}
                        </div>
                        </div>

                        <div className="mb-4">
                        <small className="text-muted d-block">Facultad</small>

                        <div className="fw-semibold">
                            <i className="bi bi-building me-2 text-primary"></i>
                            {/* {profile.faculty} */}
                            {academicFacultyLabels[profile.faculty] ?? "-"}
                        </div>
                        </div>

                        <div>
                        <small className="text-muted d-block">Modalidad</small>

                        <div className="fw-semibold">
                            <i className="bi bi-laptop me-2 text-primary"></i>
                            {/* {profile.modality} */}
                            {modalityLabels[profile.modality] ?? "-"}
                        </div>
                        </div>
                    </div>

                    {/* Columna derecha */}

                    <div className="col-lg-6">
                        <div className="mb-4">
                        <small className="text-muted d-block">Ciclo actual</small>

                        <div className="fw-semibold">
                            <i className="bi bi-123 me-2 text-primary"></i>
                            {profile.currentCycle}
                        </div>
                        </div>

                        <div className="mb-4">
                        <small className="text-muted d-block">Tutor académico</small>

                        <div className="fw-semibold">
                            <i className="bi bi-person-workspace me-2 text-primary"></i>
                            {profile.advisor || "-"}
                        </div>
                        </div>

                        <div>
                        <small className="text-muted d-block">Estado</small>

                        {profile.active ? (
                            <span className="badge bg-success-subtle text-success border">
                            <i className="bi bi-check-circle me-1"></i>
                            Activo
                            </span>
                        ) : (
                            <span className="badge bg-danger-subtle text-danger border">
                            <i className="bi bi-x-circle me-1"></i>
                            Inactivo
                            </span>
                        )}
                        </div>
                    </div>
                    </div>
                </div>
            </div>

            <AcademicProfileEditModal
                profile={profile}
                show={showEditModal}
                loading={updateMutation.isPending}
                onClose={() => setShowEditModal(false)}
                onSubmit={(form) => {

                    updateMutation.mutate({
                        publicId: profile.publicId,
                        studentPublicId,
                        data: form,
                    }, {
                        onSuccess: () => {
                            setShowEditModal(false);
                        },
                    });

                }}
            />
        </>
    );
}
