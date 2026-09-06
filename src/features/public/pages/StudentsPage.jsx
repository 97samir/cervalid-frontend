import StudentsHeroSection from "../components/students/StudentsHeroSection";
import StudentBenefitsSection from "../components/students/StudentBenefitsSection";
import StudentUseCasesSection from "../components/students/StudentUseCasesSection";
import StudentCtaSection from "../components/students/StudentCtaSection";

import "../styles/students.css";

export default function StudentsPage() {
    return (
        <div className="students-page">

            <StudentsHeroSection />
            <StudentBenefitsSection />
            <StudentUseCasesSection />
            <StudentCtaSection />

        </div>
    );
}