import { Route } from "react-router-dom";

// Student
import StudentListPage from "@/features/academic/student/pages/StudentListPage";
import StudentDetailPage from "@/features/academic/student/pages/StudentDetailPage";
import StudentRegisterPage from "@/features/academic/student/pages/StudentRegisterPage";
import StudentCreatePage from "@/features/academic/student/pages/StudentCreatePage";

// Profile
import AcademicProfileCreatePage from "@/features/academic/profile/pages/AcademicProfileCreatePage";

// Transcript
import TranscriptCreatePage from "@/features/academic/transcript/pages/TranscriptCreatePage";
import TranscriptListPage from "@/features/academic/transcript/pages/TranscriptListPage";
import TranscriptDetailPage from "@/features/academic/transcript/pages/TranscriptDetailPage";

// Competency
import CompetencyListPage from "@/features/academic/competency/pages/CompetencyListPage";
import CompetencyCreatePage from "@/features/academic/competency/pages/CompetencyCreatePage";
import CompetencyDetailPage from "@/features/academic/competency/pages/CompetencyDetailPage";

// Achievement
import AchievementListPage from "@/features/academic/achievement/pages/AchievementListPage";
import AchievementCreatePage from "@/features/academic/achievement/pages/AchievementCreatePage";
import AchievementDetailPage from "@/features/academic/achievement/pages/AchievementDetailPage";

// Certificate
import CertificateListPage from "@/features/academic/certificate/pages/CertificateListPage";
import CertificateDetailPage from "@/features/academic/certificate/pages/CertificateDetailPage";

// Timeline
import StudentTimelinePage from "@/features/academic/timeline/pages/StudentTimelinePage";

// Verification
import VerificationDashboardPage from "@/features/academic/verification/pages/VerificationDashboardPage";
import CertificateVerificationHistoryPage from "@/features/academic/verification/pages/CertificateVerificationHistoryPage";

export const academicRoutes = (
    <>
        {/*  STUDENTS*/}
        <Route path="/institution/students" 
            element={<StudentListPage />} />

        <Route
        path="/institution/students/register"
        element={<StudentRegisterPage />}
        />

        <Route
        path="/institution/students/create"
        element={<StudentCreatePage />}
        />

        <Route
        path="/institution/students/:publicId"
        element={<StudentDetailPage />}
        />

        {/* PROFILE*/}
        <Route
        path="/institution/students/:studentPublicId/profile/create"
        element={<AcademicProfileCreatePage />}
        />

        {/* TRANSCRIPTS*/}
        <Route
        path="/institution/students/:studentPublicId/transcripts/create"
        element={<TranscriptCreatePage />}
        />

        <Route
        path="/institution/students/:studentPublicId/transcripts"
        element={<TranscriptListPage />}
        />

        <Route
        path="/institution/transcripts/:transcriptPublicId"
        element={<TranscriptDetailPage />}
        />

        {/* COMPETENCIES */}

        <Route
        path="/institution/students/:studentPublicId/competencies"
        element={<CompetencyListPage />}
        />

        <Route
        path="/institution/students/:studentPublicId/competencies/create"
        element={<CompetencyCreatePage />}
        />

        <Route
        path="/institution/competencies/:competencyPublicId"
        element={<CompetencyDetailPage />}
        />

        {/*  ACHIEVEMENTS */}
        <Route
        path="/institution/students/:studentPublicId/achievements"
        element={<AchievementListPage />}
        />

        <Route
        path="/institution/students/:studentPublicId/achievements/create"
        element={<AchievementCreatePage />}
        />

        <Route
        path="/institution/achievements/:achievementPublicId"
        element={<AchievementDetailPage />}
        />

        {/*  CERTIFICATES*/}
        <Route
        path="/institution/students/:studentPublicId/certificates"
        element={<CertificateListPage />}
        />

        <Route
        path="/institution/certificates/:certificatePublicId"
        element={<CertificateDetailPage />}
        />

        {/* TIMELINE*/}
        <Route
        path="/institution/students/:publicId/timeline"
        element={<StudentTimelinePage />}
        />

        {/* VERIFICATION */}
        <Route
        path="/institution/verification"
        element={<VerificationDashboardPage />}
        />

        <Route
        path="/institution/verification/history/:certificatePublicId"
        element={<CertificateVerificationHistoryPage />}
        />
    </>
);
