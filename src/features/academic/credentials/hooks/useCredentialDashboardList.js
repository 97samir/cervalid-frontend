
import { useQuery } from "@tanstack/react-query";
import { getCredentialDashboardCredentials } from "../api/credentialApi";

export function useCredentialDashboardList(params) {
    return useQuery({
        queryKey: ["credential-dashboard", "credentials", params],
        queryFn: () => getCredentialDashboardCredentials(params),
        placeholderData: (previousData) => previousData,
    });
}
