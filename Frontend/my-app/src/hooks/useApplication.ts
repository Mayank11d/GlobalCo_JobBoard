import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { applicationService } from "../services/application.service";
import { QUERY_KEYS } from "../lib/constant";

export const useUserApplications = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.APPLICATIONS],
        queryFn: applicationService.getUserApplications,
    });
};

export const useRecruiterApplications = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.RECRUITER_APPLICATIONS],
        queryFn: applicationService.getRecruiterApplications,
    });
};

export const useJobApplications = (jobId: string) => {
    return useQuery({
        queryKey: [QUERY_KEYS.JOB_APPLICATIONS, jobId],
        queryFn: () => applicationService.getApplicationsForJob(jobId),
        enabled: !!jobId,
    });
};

export const useCreateApplication = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: applicationService.createApplication,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.APPLICATIONS] });
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.SAVED_JOBS] });
        },
    });
};

export const useUpdateApplicationStatus = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: applicationService.updateApplicationStatus,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.APPLICATIONS] });
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.JOB_APPLICATIONS] });
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.RECRUITER_APPLICATIONS] });
        },
    });
};
