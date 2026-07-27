import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { savedJobService } from "../services/savedJob.service";
import { QUERY_KEYS } from "../lib/constant";

export const useSavedJobs = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.SAVED_JOBS],
        queryFn: savedJobService.getUserSavedJobs,
    });
};

export const useSaveJob = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: savedJobService.saveJob,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.SAVED_JOBS] });
        },
    });
};

export const useRemoveSavedJob = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: savedJobService.removeSavedJob,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.SAVED_JOBS] });
        },
    });
};
