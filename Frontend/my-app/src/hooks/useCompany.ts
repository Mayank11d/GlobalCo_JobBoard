import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { companyService } from "../services/company.service";
import { QUERY_KEYS } from "../lib/constant";

export const useCompanies = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.COMPANIES],
        queryFn: companyService.getCompanies,
    });
};

export const useMyCompany = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.MY_COMPANY],
        queryFn: companyService.getMyCompany,
    });
};

export const useCompany = (id: string) => {
    return useQuery({
        queryKey: [QUERY_KEYS.COMPANY, id],
        queryFn: () => companyService.getCompanyById(id),
        enabled: !!id,
    });
};

export const useCreateCompany = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: companyService.createCompany,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.COMPANIES] });
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.MY_COMPANY] });
        },
    });
};

export const useUpdateCompany = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: companyService.updateCompany,
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.COMPANIES] });
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.MY_COMPANY] });
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.COMPANY, variables.id] });
        },
    });
};

export const useDeleteCompany = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: companyService.deleteCompany,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.COMPANIES] });
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.MY_COMPANY] });
        },
    });
};
