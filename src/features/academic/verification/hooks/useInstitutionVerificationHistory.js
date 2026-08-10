import { useQuery } from "@tanstack/react-query";
import { verificationService } from "../services/verificationService";

export const useInstitutionVerificationHistory = (
    page, size, filters) => {

    return useQuery({
        
        queryKey: ["institution-verification-history", page, size, filters],

        queryFn: () =>
        verificationService.searchInstitutionVerificationHistory(
            page,
            size,
            filters,
        ),

        placeholderData: (previous) => previous,

        staleTime: 0,
        gcTime: 0,
        refetchOnMount: "always",
        refetchOnWindowFocus: true,
    });
};
