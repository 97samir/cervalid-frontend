
import { useQuery } from "@tanstack/react-query";
import { getCredentialDashboardSummary } from "../api/credentialApi";

export function useCredentialDashboardSummary() {
    return useQuery({
        queryKey: ["credential-dashboard", "summary"],
        queryFn: getCredentialDashboardSummary,
    });
}
