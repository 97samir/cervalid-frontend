import { useQuery } from "@tanstack/react-query";
import { verificationService } from "../services/verificationService";

export function useVerificationDashboard() {

    return useQuery({

        queryKey: ["verification-dashboard"],
        queryFn: verificationService.getVerificationDashboard,
        staleTime: 30000,
    });
}