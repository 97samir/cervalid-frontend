import CompaniesHeroSection from "../components/companies/CompaniesHeroSection";
import FraudProblemSection from "../components/companies/FraudProblemSection";
import CompanyBenefitsSection from "../components/companies/CompanyBenefitsSection";
import VerificationProcessSection from "../components/companies/VerificationProcessSection";
import CompanyPlansSection from "../components/companies/CompanyPlansSection";
import CompaniesCtaSection from "../components/companies/CompaniesCtaSection";

import "../styles/companies.css";

export default function CompaniesPage() {
    return (
        <>
            <CompaniesHeroSection />
            <FraudProblemSection />
            <CompanyBenefitsSection />
            <VerificationProcessSection />
            <CompanyPlansSection />
            <CompaniesCtaSection />
        </>
    );
}