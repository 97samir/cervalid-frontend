import { Route } from "react-router-dom";

import PublicLayout from "@/features/public/layouts/PublicLayout";

import HomePage from "@/features/public/pages/HomePage";
import HowItWorksPage from "@/features/public/pages/HowItWorksPage";
import StudentsPage from "@/features/public/pages/StudentsPage";
import InstitutionsLandingPage from "@/features/public/pages/InstitutionsLandingPage";
import CompaniesPage from "@/features/public/pages/CompaniesPage";
import ContactPage from "@/features/public/pages/ContactPage";
import SitemapPage from "@/features/public/pages/SitemapPage";

import CertificateVerificationPage from "@/features/academic/verification/pages/CertificateVerificationPage";
import PublicCertificateVerificationPage from "@/features/academic/verification/pages/PublicCertificateVerificationPage";
import PublicTimelinePage from "@/features/academic/verification/pages/PublicTimelinePage";

import UnauthorizedPage from "@/pages/UnauthorizedPage";

export const publicRoutes = (
    <>
        <Route element={<PublicLayout />}>

            <Route path="/" element={<HomePage />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/students" element={<StudentsPage />} />
            <Route path="/institutions" element={<InstitutionsLandingPage />} />
            <Route path="/companies" element={<CompaniesPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/sitemap" element={<SitemapPage />} />
            
            {/* VERIFICACIÓN PÚBLICA */}
            <Route path="/verify" 
                element={<CertificateVerificationPage />} 
            />

            <Route path="/verify/:certificatePublicId"
                element={<PublicCertificateVerificationPage />}
            />

            <Route path="/verify/:certificatePublicId/timeline"
                element={<PublicTimelinePage />}
            />

        </Route>

        {/* GENERAL */}
        <Route path="/unauthorized" 
            element={<UnauthorizedPage />} 
        />
    </>
);
