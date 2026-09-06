import InstitutionsHeroSection from "../components/institutions/InstitutionsHeroSection";
import InstitutionBenefitsSection from "../components/institutions/InstitutionBenefitsSection";
import InstitutionProcessSection from "../components/institutions/InstitutionProcessSection";
import InstitutionCtaSection from "../components/institutions/InstitutionCtaSection";

import "../styles/institutions.css";

export default function InstitutionsLandingPage() {
    return (
        <>
            <InstitutionsHeroSection />
            <InstitutionBenefitsSection />
            <InstitutionProcessSection />
            <InstitutionCtaSection />
        </>
    );
}