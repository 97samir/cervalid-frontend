import { useQuery } from "@tanstack/react-query";
import { getCredential } from "../api/credentialApi";

export const useCredential = (credentialPublicId) => {
  return useQuery({
    queryKey: ["credential", credentialPublicId],
    queryFn: () => getCredential(credentialPublicId),
    enabled: Boolean(credentialPublicId),
  });
};
