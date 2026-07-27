import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { jobService } from "../services/job.service";
import { QUERY_KEYS } from "../lib/constant";

export const useJobs = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.JOBS],
        queryFn: jobService.getJobs,
    });
};

export const useJob = (id: string) => {
    return useQuery({
        queryKey: [QUERY_KEYS.JOB, id],
        queryFn: () => jobService.getJobById(id),
        enabled: !!id,
    });
};

export const useCreateJob = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: jobService.createJob,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.JOBS] });
        },
    });
};

export const useUpdateJob = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: jobService.updateJob,
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.JOBS] });
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.JOB, variables.id] });
        },
    });
};

export const useDeleteJob = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: jobService.deleteJob,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.JOBS] });
        },
    });
};
