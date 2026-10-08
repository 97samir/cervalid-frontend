import { useQuery } from "@tanstack/react-query";
import { verificationService } from "../services/verificationService";

export function useVerificationHistory(
    //resourcePublicId,
    page,
    size,
    filters,
) {

    const searchFilters = {
        ...filters,
       // resourcePublicId,
    };

    return useQuery({
        queryKey: [
            "verification-history",
            //resourcePublicId,
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

        //( desuso ) enabled: !!resourcePublicId,
        //enabled: Boolean(resourcePublicId),
        enabled: Boolean( filters?.resourcePublicId),
        placeholderData: (previous) => previous,
        staleTime: 0,
        refetchOnMount: "always",
        refetchOnWindowFocus: true,
    });
}
