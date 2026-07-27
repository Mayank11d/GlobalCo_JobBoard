"use client";

import * as React from "react"
import Link from "next/link"
import { useAuth } from "@/hooks/useAuth"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"

function ResetPasswordForm() {
  const { resetPassword, isResetPassLoading } = useAuth();
  const searchParams = useSearchParams();
  const tokenFromUrl = searchParams.get("token") || "";

  const [form, setForm] = React.useState({
    token: tokenFromUrl,
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.token.trim()) newErrors.token = "Reset token is required";
    if (!form.newPassword) newErrors.newPassword = "Password is required";
    else if (form.newPassword.length < 8) newErrors.newPassword = "Password must be at least 8 characters";
    if (form.newPassword !== form.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    try {
      await resetPassword({ token: form.token, newPassword: form.newPassword });
    } catch {
      // Error handled by useAuth toast
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) {
      setErrors(prev => ({ ...prev, [e.target.name]: "" }));
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-surface text-on-surface h-screen w-full flex items-center justify-center">
      <div className="w-full max-w-md px-md py-xxl sm:px-xxl flex flex-col gap-xl">
        <div className="text-center">
          <div className="flex items-center justify-center gap-sm mb-lg">
            <div className="w-10 h-10 rounded-xl bg-primary-container flex items-center justify-center">
              <span className="material-symbols-outlined text-on-primary text-2xl">key</span>
            </div>
          </div>
          <h1 className="font-headline-md text-headline-md text-on-surface tracking-tight mb-sm">Set new password</h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Your new password must be at least 8 characters.
          </p>
        </div>

        <form className="flex flex-col gap-md" onSubmit={handleSubmit}>
          {!tokenFromUrl && (
            <div className="flex flex-col gap-xs">
              <label className="font-label-sm text-label-sm text-on-surface" htmlFor="token">Reset Token</label>
              <input
                className={`w-full px-md py-3 rounded-xl border ${errors.token ? "border-error" : "border-outline-variant"} bg-surface-container-lowest text-on-surface font-body-md focus:outline-none focus:border-primary-container focus:ring-2 focus:ring-primary-fixed transition-all`}
                id="token"
                name="token"
                placeholder="Paste your reset token"
                value={form.token}
                onChange={handleChange}
              />
              {errors.token && <span className="text-error font-label-sm text-label-sm">{errors.token}</span>}
            </div>
          )}

          <div className="flex flex-col gap-xs">
            <label className="font-label-sm text-label-sm text-on-surface" htmlFor="newPassword">New Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-outline-variant text-[20px]">lock</span>
              </div>
              <input
                className={`w-full pl-10 pr-4 py-3 rounded-xl border ${errors.newPassword ? "border-error" : "border-outline-variant"} bg-surface-container-lowest text-on-surface font-body-md focus:outline-none focus:border-primary-container focus:ring-2 focus:ring-primary-fixed transition-all`}
                id="newPassword"
                name="newPassword"
                placeholder="Min. 8 characters"
                type="password"
                value={form.newPassword}
                onChange={handleChange}
              />
            </div>
            {errors.newPassword && <span className="text-error font-label-sm text-label-sm">{errors.newPassword}</span>}
          </div>

          <div className="flex flex-col gap-xs">
            <label className="font-label-sm text-label-sm text-on-surface" htmlFor="confirmPassword">Confirm Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-outline-variant text-[20px]">lock_reset</span>
              </div>
              <input
                className={`w-full pl-10 pr-4 py-3 rounded-xl border ${errors.confirmPassword ? "border-error" : "border-outline-variant"} bg-surface-container-lowest text-on-surface font-body-md focus:outline-none focus:border-primary-container focus:ring-2 focus:ring-primary-fixed transition-all`}
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm your new password"
                type="password"
                value={form.confirmPassword}
                onChange={handleChange}
              />
            </div>
            {errors.confirmPassword && <span className="text-error font-label-sm text-label-sm">{errors.confirmPassword}</span>}
          </div>

          <button
            className="w-full py-3 rounded-xl bg-primary-container text-on-primary font-label-md text-label-md hover:bg-primary transition-all active:scale-[0.98] flex items-center justify-center shadow-sm disabled:opacity-50 mt-sm"
            type="submit"
            disabled={isResetPassLoading}
          >
            {isResetPassLoading ? (
              <>
                <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-on-primary mr-2"></span>
                Resetting...
              </>
            ) : "Reset Password"}
          </button>

          <Link
            href="/login"
            className="text-center font-label-sm text-label-sm text-on-surface-variant hover:text-on-surface transition-colors flex items-center justify-center gap-1"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            Back to login
          </Link>
        </form>
      </div>
    </div>
  )
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordForm />
    </Suspense>
  )
}
