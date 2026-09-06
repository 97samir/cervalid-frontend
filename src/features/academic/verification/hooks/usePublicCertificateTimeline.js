import { useQuery } from "@tanstack/react-query";
import { getPublicCertificateTimeline } from "../api/verificationApi";

export default function usePublicCertificateTimeline(
    certificatePublicId
) {

    return useQuery({
        queryKey: [
            "public-certificate-timeline",
            certificatePublicId,
        ],

        queryFn: () =>
            getPublicCertificateTimeline(
                certificatePublicId
            ),

        enabled: Boolean(certificatePublicId),

        staleTime: 60 * 1000,
    });
}