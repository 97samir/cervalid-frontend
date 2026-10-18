import { useQuery } from "@tanstack/react-query";
import { certificateService } from "../services/certificateService";

export function useCertificateDashboardList({
    page,
    size,
    filters,
}) {
    const params = {
        page,
        size,
        certificateNumber: filters.certificateNumber || undefined,
        studentCode: filters.studentCode || undefined,
        program: filters.program || undefined,
        type: filters.type || undefined,
        status: filters.status || undefined,
        fromDate: filters.fromDate || undefined,
        toDate: filters.toDate || undefined,
    };

    return useQuery({
        queryKey: ["certificate-dashboard-list", params],
        queryFn: () =>
            certificateService.getCertificateDashboardCertificates(params),
        placeholderData: (previousData) => previousData,
    });
}