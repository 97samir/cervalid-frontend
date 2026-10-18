import { useQuery } from "@tanstack/react-query";
import { certificateService } from "../services/certificateService";

export function useCertificateDashboardSummary() {
    return useQuery({
        queryKey: ["certificate-dashboard-summary"],
        queryFn: certificateService.getCertificateDashboardSummary,
    });
}
