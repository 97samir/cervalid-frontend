import { Link, useParams } from "react-router-dom";
import { useState } from "react";

import { useStudent } from "../hooks/useStudent";
//import { useCreateProfile } from "../../academic/profile/hooks/useCreateProfile";

import StudentDetailCard from "../components/StudentDetailCard";
import AcademicProfileCard from "../../profile/components/AcademicProfileCard";
import TranscriptCard from "../../transcript/components/TranscriptCard";
import CompetencyCard from "../../competency/components/CompetencyCard";
import AchievementCard from "../../achievement/components/AchievementCard";
import CertificateCard from "../../certificate/components/CertificateCard";
import StudentEditModal from "../components/StudentEditModal";

export default function StudentDetailPage() {
    
    // se obtiene el publicId para la url
    const { publicId } = useParams();
    const { data, isLoading, error } = useStudent(publicId);
    const [showEditModal, setShowEditModal] = useState(false);

    if (isLoading) {

        return (
        <div className="d-flex justify-content-center py-5">
            <div className="spinner-border text-primary" />
        </div>
        );
    }

    if (error) {
        return (
        <div className="alert alert-danger shadow-sm">
            Error cargando estudiante
        </div>
        );
    }

    return (

        <div className="container-fluid py-0">
            <div className="d-flex justify-content-between align-items-right mb-4">
                <div>

                </div>

                <div className="d-flex gap-2"> 

                    {/* Ver trazabilidad */} 
                    <Link to={`/institution/students/${data.publicId}/timeline`} 
                    className="btn btn-outline-primary"> 
                        <i className="bi bi-clock-history me-2"></i> 
                        Ver trazabilidad 
                    </Link> 
                    
                    {/* Volver */} 
                    <Link to="/institution/students" 
                    className="btn btn-outline-secondary"> 
                        <i className="bi bi-arrow-left me-2"></i> 
                        Volver 
                    </Link> 
                    
                </div>

            </div>

            <StudentDetailCard 
                student={data}
                onEdit={() => setShowEditModal(true)}/>
            
            {/* se obtiene / se manda publicId del estudiante /> */}
            {/* <AcademicProfileCard profile={data?.profile}
                                studentPublicId={data?.publicId}/>

            <TranscriptCard studentPublicId={data?.publicId}/> */}

            <div className="row g-4">
                <div className="col-lg-6">
                    <AcademicProfileCard profile={data?.profile}
                                studentPublicId={data?.publicId}/>
                </div>
                <div className="col-lg-6">
                    <TranscriptCard studentPublicId={data?.publicId}/>
                </div>

            </div>

            <CompetencyCard studentPublicId={data?.publicId} />

            <AchievementCard studentPublicId={data?.publicId}/>

            <CertificateCard studentPublicId={data?.publicId}/>

            {/* <TimelineCard studentPublicId={data?.publicId}/> */}
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
