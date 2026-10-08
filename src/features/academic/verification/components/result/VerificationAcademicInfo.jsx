import VerificationSummaryItem from "../shared/VerificationSummaryItem";

import {
    academicProgramLabels,
    academicFacultyLabels,
    modalityLabels,
} from "@/shared/utils/enumUtils";

export default function VerificationAcademicInfo({ 
    result 
}) {
    const { academic = {} } = result;

    const { program, faculty, modality, currentCycle } = academic;

    return (
        <div className="verification-info-card h-100">
        <div className="card-header">
            <div className="verification-card-icon">
            <i className="bi bi-mortarboard" aria-hidden="true" />
            </div>

            <div>
            <div className="verification-card-title">Información académica</div>

            <div className="verification-card-subtitle">
                Datos académicos asociados
            </div>
            </div>
        </div>

        <div className="card-body">
            <VerificationSummaryItem
            label="Programa"
            value={academicProgramLabels[program] ?? program}
            />

            <VerificationSummaryItem
            label="Facultad"
            value={academicFacultyLabels[faculty] ?? faculty}
            />

            <VerificationSummaryItem
            label="Modalidad"
            value={modalityLabels[modality] ?? modality}
            />

            <VerificationSummaryItem 
                label="Ciclo actual" 
                value={currentCycle || "No correponde"} 
            />
        </div>
        </div>
    );
}
