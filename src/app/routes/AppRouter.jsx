// Define todas las rutas de la aplicación usando React Router

import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedLayout from "../../shared/layouts/ProtectedLayout";
import PrivateRoute from "./PrivateRoute";
import RoleGuard from "./RoleGuard";
import InstitutionGuard from "./InstitutionGuard";

// Páginas públicas
import HomePage from "../../pages/HomePage";

import LoginPage from "../../features/auth/pages/LoginPage";
import SelectInstitutionPage from "../../features/auth/pages/SelectInstitutionPage";
import ActivateAccountPage from "../../features/auth/pages/ActivateAccountPage";
//import PublicCertificatePage from "../../features/public/pages/PublicCertificatePage";

import UnauthorizedPage from "../../pages/UnauthorizedPage";

// Dashboards por rol
import SuperAdminDashboardPage from "../../features/superadmin/pages/SuperAdminDashboardPage";
import InstitutionsPage from "../../features/superadmin/institutions/pages/InstitutionsPage";

// institution
import InstitutionDashboardPage from "../../features/institution/pages/InstitutionDashboardPage";
import InstitutionProfilePage from "../../features/institution/pages/InstitutionProfilePage";
import InstitutionRequestPage from "../../features/institution-request/pages/InstitutionRequestPage";
import InstitutionRequestAdminPage from "../../features/institution-request/pages/InstitutionRequestAdminPage";

// academic student
import StudentListPage from "../../features/academic/student/pages/StudentListPage";
import StudentDetailPage from "../../features/academic/student/pages/StudentDetailPage";
import StudentRegisterPage from "../../features/academic/student/pages/StudentRegisterPage";
import StudentCreatePage from "../../features/academic/student/pages/StudentCreatePage";
//import StudentEditPage from "../../features/academic/student/pages/StudentEditPage";

// academic profile
import AcademicProfileCreatePage from "../../features/academic/profile/pages/AcademicProfileCreatePage";
//import AcademicProfileEditPage  from "../../features/academic/profile/pages/AcademicProfileEditPage";

// academic transcript
import TranscriptCreatePage from "@/features/academic/transcript/pages/TranscriptCreatePage";
import TranscriptListPage from "@/features/academic/transcript/pages/TranscriptListPage";
import TranscriptDetailPage from "@/features/academic/transcript/pages/TranscriptDetailPage";

// academic competency
import CompetencyListPage from "@/features/academic/competency/pages/CompetencyListPage";
import CompetencyCreatePage from "@/features/academic/competency/pages/CompetencyCreatePage";
import CompetencyDetailPage from "@/features/academic/competency/pages/CompetencyDetailPage";

// academic achievement
import AchievementListPage from "@/features/academic/achievement/pages/AchievementListPage";
import AchievementCreatePage from "@/features/academic/achievement/pages/AchievementCreatePage";
import AchievementDetailPage from "@/features/academic/achievement/pages/AchievementDetailPage";

// academic certificate
import CertificateListPage from "@/features/academic/certificate/pages/CertificateListPage";
import CertificateDetailPage from "@/features/academic/certificate/pages/CertificateDetailPage";

// Timeline 
import StudentTimelinePage from "@/features/academic/timeline/pages/StudentTimelinePage";

// historial institucional verification
import VerificationDashboardPage from "@/features/academic/verification/pages/VerificationDashboardPage";
import CertificateVerificationHistoryPage from "@/features/academic/verification/pages/CertificateVerificationHistoryPage";
import PublicCertificateVerificationPage from "@/features/academic/verification/pages/PublicCertificateVerificationPage";
import CertificateVerificationPage from "@/features/academic/verification/pages/CertificateVerificationPage";

// recruiter
//import RecruiterVerifyPage from "../../features/recruiter/pages/RecruiterVerifyPage";

// invitations
import InviteUserPage from "../../features/invitations/pages/InviteUserPage";
import InstitutionInvitationsPage from "../../features/invitations/pages/InstitutionInvitationsPage";

// Users
import InstitutionUsersPage from "../../features/users/pages/InstitutionUsersPage";


export default function AppRouter() {
  
  return (
    <BrowserRouter>
      <Routes>

        {/* Públicas */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/select-institution" element={<SelectInstitutionPage />} />
        <Route path="/institution-requests" element={<InstitutionRequestPage />} />
        <Route path="/activate" element={<ActivateAccountPage />} /> 
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        <Route path="/verify" element={<CertificateVerificationPage  />} />

        {/* RUTAS PRIVADAS (PROTEGIDAS) */}
        <Route
          element={
            <PrivateRoute>
              <ProtectedLayout />
            </PrivateRoute>
          }
        >
        
          {/* SUPER ADMIN */}
          <Route
            path="/superadmin"
            element={
                <RoleGuard allowedRoles={["SUPER_ADMIN"]}>
                  <SuperAdminDashboardPage />
                </RoleGuard>
            }
          />

          <Route
            path="/superadmin/users"
            element={
                <RoleGuard allowedRoles={["SUPER_ADMIN"]}>
                    <InstitutionUsersPage />
                    
                </RoleGuard>
            }
          />

          <Route
            path="/superadmin/institution-requests"
            element={
                <RoleGuard allowedRoles={["SUPER_ADMIN"]}>
                  <InstitutionRequestAdminPage />
                </RoleGuard>
            }
          />

          <Route
            path="/superadmin/institutions"
            element={
                <RoleGuard allowedRoles={["SUPER_ADMIN"]}>
                  <InstitutionsPage />
                </RoleGuard>
            }
          />

          {/* ADMIN INSTITUCIONAL */}
          <Route
            path="/institution"
            element={
                <RoleGuard allowedRoles={["INSTITUTION_ADMIN", "INSTITUTION_SUBADMIN"]}>
                  <InstitutionGuard>
                    <InstitutionDashboardPage />
                  </InstitutionGuard>
                </RoleGuard>
            }
          />

          <Route
            path="/institution/profile"
            element={
                <RoleGuard allowedRoles={["INSTITUTION_ADMIN", "INSTITUTION_SUBADMIN"]}>
                  <InstitutionGuard>
                    <InstitutionProfilePage />
                  </InstitutionGuard>
                </RoleGuard>
            }
          />

          <Route
            path="/institution/invite-user"
            element={
                <RoleGuard allowedRoles={["INSTITUTION_ADMIN", "INSTITUTION_SUBADMIN"]}>
                  <InstitutionGuard>
                    <InviteUserPage />
                  </InstitutionGuard>
                </RoleGuard>
            }
          />

          <Route
            path="/institution/invitations"
            element={
                <RoleGuard allowedRoles={["INSTITUTION_ADMIN", "INSTITUTION_SUBADMIN"]}>
                  <InstitutionGuard>
                    <InstitutionInvitationsPage />
                  </InstitutionGuard>
                </RoleGuard>
            }
          />

          <Route
            path="/institution/users"
            element={
                <RoleGuard allowedRoles={["INSTITUTION_ADMIN", "INSTITUTION_SUBADMIN"]}>
                  <InstitutionGuard>
                    <InstitutionUsersPage />
                  </InstitutionGuard>
                </RoleGuard>
            }
          />

          {/* ACADEMIC ESTUDIANTE */}

          <Route
            path="/institution/students"
            element={
              <RoleGuard
                allowedRoles={[
                  "INSTITUTION_ADMIN",
                  "INSTITUTION_SUBADMIN"
                ]}
              >
                <InstitutionGuard>
                  <StudentListPage />
                </InstitutionGuard>
              </RoleGuard>
            }
          />

          <Route
            path="/institution/students/register"
            element={
              <RoleGuard
                allowedRoles={[
                  "INSTITUTION_ADMIN",
                  "INSTITUTION_SUBADMIN"
                ]}
              >
                <InstitutionGuard>
                  <StudentRegisterPage />
                </InstitutionGuard>
              </RoleGuard>
            }
          />

          <Route
            path="/institution/students/create"
            element={
              <RoleGuard
                allowedRoles={[
                    "INSTITUTION_ADMIN",
                    "INSTITUTION_SUBADMIN"
                ]}
              >
                <InstitutionGuard>
                    <StudentCreatePage />
                </InstitutionGuard>
              </RoleGuard>
            }
          />

          <Route
            path="/institution/students/:publicId"
            element={
              <RoleGuard
                allowedRoles={[
                  "INSTITUTION_ADMIN",
                  "INSTITUTION_SUBADMIN"
                ]}
              >
                <InstitutionGuard>
                  <StudentDetailPage />
                </InstitutionGuard>
              </RoleGuard>
            }
          />

          {/* <Route
            path="/institution/students/:publicId/edit"
            element={
              <RoleGuard
                allowedRoles={[
                  "INSTITUTION_ADMIN",
                  "INSTITUTION_SUBADMIN"
                ]}
              >
                <InstitutionGuard>
                  <StudentEditPage />
                </InstitutionGuard>
              </RoleGuard>
            }
          /> */}

          {/* ACADEMIC PROFILE */}
          <Route
            path="/institution/students/:studentPublicId/profile/create"
            element={
                <RoleGuard 
                  allowedRoles={[
                    "INSTITUTION_ADMIN","INSTITUTION_SUBADMIN"
                  ]}>
                    <InstitutionGuard>
                        <AcademicProfileCreatePage />
                    </InstitutionGuard>
                </RoleGuard>
            }
        />

        {/* <Route
            path="/institution/students/:studentPublicId/profile/:publicId/edit"
            element={
                <RoleGuard 
                  allowedRoles={[
                    "INSTITUTION_ADMIN","INSTITUTION_SUBADMIN"
                  ]}>
                    <InstitutionGuard>
                        <AcademicProfileEditPage />
                    </InstitutionGuard>
                </RoleGuard>
            }
        /> */}

        {/* ACADEMIC TRANSCRIPT */}
        <Route
            path="/institution/students/:studentPublicId/transcripts/create"
            element={
                <RoleGuard 
                  allowedRoles={[
                    "INSTITUTION_ADMIN","INSTITUTION_SUBADMIN"
                  ]}>
                    <InstitutionGuard>
                        <TranscriptCreatePage />
                    </InstitutionGuard>
                </RoleGuard>
            }
        />

        <Route
            path="/institution/students/:studentPublicId/transcripts"
            element={
                <RoleGuard 
                  allowedRoles={[
                    "INSTITUTION_ADMIN","INSTITUTION_SUBADMIN"
                  ]}>
                    <InstitutionGuard>
                        <TranscriptListPage />
                    </InstitutionGuard>
                </RoleGuard>
            }
        />

        <Route
            path="/institution/transcripts/:transcriptPublicId"
            element={
                <RoleGuard 
                  allowedRoles={[
                    "INSTITUTION_ADMIN","INSTITUTION_SUBADMIN"
                  ]}>
                    <InstitutionGuard>
                        <TranscriptDetailPage />
                    </InstitutionGuard>
                </RoleGuard>
            }
        />

        {/*COMPETENCIES*/}
        <Route
            path="/institution/students/:studentPublicId/competencies"
            element={
                <RoleGuard 
                  allowedRoles={[
                    "INSTITUTION_ADMIN","INSTITUTION_SUBADMIN"
                  ]}>
                    <InstitutionGuard>
                        <CompetencyListPage />
                    </InstitutionGuard>
                </RoleGuard>
            }
        />

        <Route
            path="/institution/students/:studentPublicId/competencies/create"
            element={
                <RoleGuard 
                  allowedRoles={[
                    "INSTITUTION_ADMIN","INSTITUTION_SUBADMIN"
                  ]}>
                    <InstitutionGuard>
                        <CompetencyCreatePage />
                    </InstitutionGuard>
                </RoleGuard>
            }
        />

        <Route
            path="/institution/competencies/:competencyPublicId"
            element={
                <RoleGuard 
                  allowedRoles={[
                    "INSTITUTION_ADMIN","INSTITUTION_SUBADMIN"
                  ]}>
                    <InstitutionGuard>
                        <CompetencyDetailPage />
                    </InstitutionGuard>
                </RoleGuard>
            }
        />

        {/* ACHIEVEMENTS */}
        <Route
            path="/institution/students/:studentPublicId/achievements"
            element={
                <RoleGuard 
                  allowedRoles={[
                    "INSTITUTION_ADMIN","INSTITUTION_SUBADMIN"
                  ]}>
                    <InstitutionGuard>
                        <AchievementListPage />
                    </InstitutionGuard>
                </RoleGuard>
            }
        />

        <Route
            path="/institution/students/:studentPublicId/achievements/create"
            element={
                <RoleGuard 
                  allowedRoles={[
                    "INSTITUTION_ADMIN","INSTITUTION_SUBADMIN"
                  ]}>
                    <InstitutionGuard>
                        <AchievementCreatePage />
                    </InstitutionGuard>
                </RoleGuard>
            }
        />

        <Route
            path="/institution/achievements/:achievementPublicId"
            element={
                <RoleGuard 
                  allowedRoles={[
                    "INSTITUTION_ADMIN","INSTITUTION_SUBADMIN"
                  ]}>
                    <InstitutionGuard>
                        <AchievementDetailPage />
                    </InstitutionGuard>
                </RoleGuard>
            }
        />

          {/* CERTIFICATES */}
          <Route
              path="/institution/students/:studentPublicId/certificates"
              element={
                  <RoleGuard
                      allowedRoles={[
                          "INSTITUTION_ADMIN",
                          "INSTITUTION_SUBADMIN"
                      ]}
                  >
                      <InstitutionGuard>
                          <CertificateListPage />
                      </InstitutionGuard>
                  </RoleGuard>
              }
          />

          <Route
              path="/institution/certificates/:certificatePublicId"
              element={
                  <RoleGuard
                      allowedRoles={[
                          "INSTITUTION_ADMIN",
                          "INSTITUTION_SUBADMIN"
                      ]}
                  >
                      <InstitutionGuard>
                          <CertificateDetailPage />
                      </InstitutionGuard>
                  </RoleGuard>
              }
          />

          {/* STUDENT TIMELINE*/} 
          <Route 
            path="/institution/students/:publicId/timeline" 
            element={
                  <RoleGuard
                      allowedRoles={[
                          "INSTITUTION_ADMIN",
                          "INSTITUTION_SUBADMIN"
                      ]}
                  >
                      <InstitutionGuard>
                          <StudentTimelinePage />
                      </InstitutionGuard>
                  </RoleGuard>
            }
          />

          {/* HISTORIAL INSTITUCIONAL VERIFICATION */}
          <Route
            path="/institution/verification"
            element={
                <RoleGuard
                    allowedRoles={[
                        "INSTITUTION_ADMIN",
                        "INSTITUTION_SUBADMIN",
                    ]}
                >   
                  <InstitutionGuard>
                      <VerificationDashboardPage />
                  </InstitutionGuard>
                </RoleGuard>
            }
          />

          <Route
            path="/institution/verification/history/:certificatePublicId"
            element={
                <RoleGuard
                    allowedRoles={[
                        "INSTITUTION_ADMIN",
                        "INSTITUTION_SUBADMIN",
                    ]}
                >   
                  <InstitutionGuard>
                      <CertificateVerificationHistoryPage />
                  </InstitutionGuard>
                </RoleGuard>
            }
          />

          <Route
              path="/verify/:certificatePublicId"
              element={
                  <PublicCertificateVerificationPage />
              }
          />

          {/* RECLUTADOR 
          <Route
            path="/recruiter"
            element={
                <RoleGuard allowedRoles={["RECRUITER"]}>
                  <RecruiterVerifyPage />
                </RoleGuard>
            }
          />
            */}
          {/* INVITACIÓN */}
          
        </Route>

      </Routes>
    </BrowserRouter>
  );
}
