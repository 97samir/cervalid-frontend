import { useQuery } from "@tanstack/react-query";
import { getStudentCredentials } from "../api/credentialApi";

export const useStudentCredentials = (studentPublicId) => {
    
    return useQuery({
        queryKey: ["studentCredentials", studentPublicId],
        queryFn: () => getStudentCredentials(studentPublicId),
        enabled: Boolean(studentPublicId),
    });
};
