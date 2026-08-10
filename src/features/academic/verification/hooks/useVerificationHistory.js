import { useQuery } from "@tanstack/react-query";
import { verificationService } from "../services/verificationService";

export function useVerificationHistory(
    certificatePublicId,
    page,
    size,
    filters,
) {
    return useQuery({
        queryKey: [
        "certificate-verification-history",
        certificatePublicId,
        page,
        size,
        filters,
        ],

        queryFn: () =>
        verificationService.getCertificateVerificationHistory(
            certificatePublicId,
            page,
            size,
            filters,
        ),

        enabled: !!certificatePublicId,
        placeholderData: (previous) => previous,
        staleTime: 0,
        refetchOnMount: "always",
        refetchOnWindowFocus: true,
    });
}
