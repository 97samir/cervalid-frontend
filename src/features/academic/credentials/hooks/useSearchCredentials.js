import { useQuery } from "@tanstack/react-query";
import { searchCredentials } from "../api/credentialApi";

export const useSearchCredentials = (params = {}) => {
    return useQuery({
        queryKey: ["credentials", "search", params],
        queryFn: () => searchCredentials(params),
    });
};
