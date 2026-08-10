import { useQuery } from "@tanstack/react-query";
import { verificationService } from "../services/verificationService";

export function useVerificationSummary(page, size, filters) {
    return useQuery({
        queryKey: ["verification-summary", page, size, filters],

        queryFn: () =>
        verificationService.searchVerificationSummary(page, size, filters),

        placeholderData: (previousData) => previousData,

        staleTime: 0,

        refetchOnWindowFocus: true,
    });
}
