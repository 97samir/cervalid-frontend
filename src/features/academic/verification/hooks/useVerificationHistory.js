import { useQuery } from "@tanstack/react-query";
import { verificationService } from "../services/verificationService";

export function useVerificationHistory(
    certificatePublicId,
    page,
    size,
    filters,
) {

    const searchFilters = {
        ...filters,
        certificatePublicId,
    };

    return useQuery({
        queryKey: [
            "certificate-verification-history",
            certificatePublicId,
            page,
            size,
            filters,
        ],

        queryFn: () =>
        verificationService.searchVerificationHistory(
            page,
            size,
            searchFilters,
        ),

        enabled: !!certificatePublicId,
        placeholderData: (previous) => previous,
        staleTime: 0,
        refetchOnMount: "always",
        refetchOnWindowFocus: true,
    });
}
