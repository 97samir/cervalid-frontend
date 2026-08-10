import { useQuery } from "@tanstack/react-query";
import { certificateService } from "../services/certificateService";

export const useCertificate = (certificatePublicId) => {

    return useQuery({

        queryKey: ["certificate", certificatePublicId],

        queryFn: () => certificateService.getCertificateDetail(
            certificatePublicId),

        enabled: !!certificatePublicId,
    });
};
