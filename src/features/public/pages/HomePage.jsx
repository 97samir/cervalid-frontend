import HeroSection from "@/features/public/components/home/HeroSection";
import PlatformStats from "@/features/public/components/home/PlatformStats";
import WhatIsCervalidSection from "@/features/public/components/home/WhatIsCervalidSection";
import HowItWorksSection from "@/features/public/components/home/HowItWorksSection";
import SolutionsSection from "@/features/public/components/home/SolutionsSection";
import CallToActionSection from "@/features/public/components/home/CallToActionSection";

import "@/features/public/styles/public.css";
import "@/features/public/styles/home.css";

export default function HomePage() {
    return (
        <>
            <HeroSection />
            <PlatformStats />
            <WhatIsCervalidSection />
            <HowItWorksSection />
            <SolutionsSection />
            <CallToActionSection />
        </>
    );
}