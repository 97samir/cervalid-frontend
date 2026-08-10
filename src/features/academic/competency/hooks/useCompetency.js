import { useQuery } from "@tanstack/react-query";
import { competencyService } from "../services/competencyService";

export const useCompetency = (competencyPublicId) => {

    return useQuery({

        queryKey: ["competency", competencyPublicId],

        queryFn: () =>
            competencyService.getCompetency(
                competencyPublicId
            ),

        enabled: !!competencyPublicId,
    });
};