import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authService } from "../services/auth.service";
import { QUERY_KEYS } from "../lib/constant";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const useAuth = () => {
    const queryClient = useQueryClient();
    const router = useRouter();

    // getMe returns { success, message, data: { user } }
    const { data: authData, isLoading: isUserLoading } = useQuery({
        queryKey: [QUERY_KEYS.AUTH_USER],
        queryFn: authService.getMe,
        retry: false,
        staleTime: 5 * 60 * 1000,
    });

    const loginMutation = useMutation({
        mutationFn: authService.login,
        onSuccess: (data: any) => {
            // Backend returns { success, message, data: { user, token } }
            const token = data?.data?.token;
            const user = data?.data?.user;
            if (token) {
                localStorage.setItem("token", token);
            }
            if (user) {
                queryClient.setQueryData([QUERY_KEYS.AUTH_USER], { data: { user } });
            }
            toast.success("Successfully logged in!");
            router.push("/dashboard");
        },
        onError: (err: any) => {
            toast.error(err.response?.data?.message || "Failed to login. Please try again.");
        }
    });

    const registerMutation = useMutation({
        mutationFn: authService.register,
        onSuccess: (data: any) => {
            const token = data?.data?.token;
            const user = data?.data?.user;
            if (token) {
                localStorage.setItem("token", token);
            }
            if (user) {
                queryClient.setQueryData([QUERY_KEYS.AUTH_USER], { data: { user } });
            }
            toast.success("Successfully registered!");
            router.push("/dashboard");
        },
        onError: (err: any) => {
            toast.error(err.response?.data?.message || "Failed to register. Please try again.");
        }
    });

    const logoutMutation = useMutation({
        mutationFn: authService.logout,
        onSuccess: () => {
            queryClient.setQueryData([QUERY_KEYS.AUTH_USER], null);
            queryClient.clear();
            localStorage.removeItem("token");
            toast.success("Successfully logged out!");
            router.push("/login");
        },
        onError: () => {
            toast.error("Failed to log out.");
        }
    });

    const updateProfileMutation = useMutation({
        mutationFn: authService.updateProfile,
        onSuccess: (data: any) => {
            const user = data?.data?.user;
            if (user) {
                queryClient.setQueryData([QUERY_KEYS.AUTH_USER], { data: { user } });
            }
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.AUTH_USER] });
            toast.success("Profile updated successfully!");
        },
        onError: (err: any) => {
            toast.error(err.response?.data?.message || "Failed to update profile.");
        }
    });

    const forgotPasswordMutation = useMutation({
        mutationFn: authService.forgotPassword,
        onSuccess: () => {
            toast.success("Password reset link sent to your email!");
        },
        onError: (err: any) => {
            toast.error(err.response?.data?.message || "Failed to send reset link.");
        }
    });

    const resetPasswordMutation = useMutation({
        mutationFn: authService.resetPassword,
        onSuccess: () => {
            toast.success("Password has been reset successfully!");
            router.push("/login");
        },
        onError: (err: any) => {
            toast.error(err.response?.data?.message || "Failed to reset password.");
        }
    });

    const changePasswordMutation = useMutation({
        mutationFn: authService.changePassword,
        onSuccess: () => {
            toast.success("Password changed successfully!");
        },
        onError: (err: any) => {
            toast.error(err.response?.data?.message || "Failed to change password.");
        }
    });

    return {
        // getMe returns { success, message, data: { user } }
        user: (authData as any)?.data?.user || null,
        isUserLoading,
        login: loginMutation.mutateAsync,
        isLoggingIn: loginMutation.isPending,
        register: registerMutation.mutateAsync,
        isRegistering: registerMutation.isPending,
        logout: logoutMutation.mutateAsync,
        isLoggingOut: logoutMutation.isPending,
        updateProfile: updateProfileMutation.mutateAsync,
        isUpdatingProfile: updateProfileMutation.isPending,
        forgotPassword: forgotPasswordMutation.mutateAsync,
        isForgotPassLoading: forgotPasswordMutation.isPending,
        resetPassword: resetPasswordMutation.mutateAsync,
        isResetPassLoading: resetPasswordMutation.isPending,
        changePassword: changePasswordMutation.mutateAsync,
        isChangePassLoading: changePasswordMutation.isPending,
    };
};
