"use client";

import * as React from "react"
import Link from "next/link"
import { useAuth } from "@/hooks/useAuth"

export default function ForgotPasswordPage() {
  const { forgotPassword, isForgotPassLoading } = useAuth();
  const [email, setEmail] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);
  const [error, setError] = React.useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError("Email is required");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email");
      return;
    }
    setError("");
    try {
      await forgotPassword({ email });
      setSubmitted(true);
    } catch {
      // Error handled by useAuth toast
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-surface text-on-surface h-screen w-full flex items-center justify-center">
      <div className="w-full max-w-md px-md py-xxl sm:px-xxl flex flex-col gap-xl">
        <div className="text-center">
          <div className="flex items-center justify-center gap-sm mb-lg">
            <div className="w-10 h-10 rounded-xl bg-primary-container flex items-center justify-center">
              <span className="material-symbols-outlined text-on-primary text-2xl">lock_open</span>
            </div>
          </div>
          <h1 className="font-headline-md text-headline-md text-on-surface tracking-tight mb-sm">Forgot your password?</h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            No worries. Enter your email and we'll send you reset instructions.
          </p>
        </div>

        {submitted ? (
          <div className="bg-tertiary-fixed border border-tertiary/20 rounded-xl p-lg text-center flex flex-col items-center gap-md">
            <span className="material-symbols-outlined text-tertiary text-5xl">mark_email_read</span>
            <div>
              <h2 className="font-title-lg text-title-lg text-on-surface mb-xs">Check your email</h2>
              <p className="font-body-md text-body-md text-on-surface-variant">
                We've sent a password reset link to <strong>{email}</strong>.
                Check your inbox and follow the instructions.
              </p>
            </div>
            <Link
              href="/login"
              className="font-label-md text-label-md text-primary hover:underline flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
              Back to login
            </Link>
          </div>
        ) : (
          <form className="flex flex-col gap-lg" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-xs">
              <label className="font-label-sm text-label-sm text-on-surface" htmlFor="email">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-outline-variant text-[20px]">mail</span>
                </div>
                <input
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border ${error ? "border-error" : "border-outline-variant"} bg-surface-container-lowest text-on-surface font-body-md focus:outline-none focus:border-primary-container focus:ring-2 focus:ring-primary-fixed transition-all`}
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError("");
                  }}
                />
              </div>
              {error && <span className="text-error font-label-sm text-label-sm">{error}</span>}
            </div>

            <button
              className="w-full py-3 rounded-xl bg-primary-container text-on-primary font-label-md text-label-md hover:bg-primary transition-all active:scale-[0.98] flex items-center justify-center shadow-sm disabled:opacity-50"
              type="submit"
              disabled={isForgotPassLoading}
            >
              {isForgotPassLoading ? (
                <>
                  <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-on-primary mr-2"></span>
                  Sending...
                </>
              ) : "Send Reset Link"}
            </button>

            <Link
              href="/login"
              className="text-center font-label-sm text-label-sm text-on-surface-variant hover:text-on-surface transition-colors flex items-center justify-center gap-1"
            >
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
              Back to login
            </Link>
          </form>
        )}
      </div>
    </div>
  )
}
