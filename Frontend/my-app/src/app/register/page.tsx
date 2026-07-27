"use client";

import * as React from "react"
import Link from "next/link"
import { useAuth } from "@/hooks/useAuth"

export default function RegisterPage() {
  const { register, isRegistering } = useAuth();
  const [form, setForm] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "candidate" as "candidate" | "recruiter",
  });
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.firstName.trim()) newErrors.firstName = "First name is required";
    if (!form.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Invalid email";
    if (!form.password) newErrors.password = "Password is required";
    else if (form.password.length < 8) newErrors.password = "Password must be at least 8 characters";
    if (form.password !== form.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
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
      const { confirmPassword, ...payload } = form;
      await register(payload);
    } catch {
      // Error handled by useAuth toast
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) {
      setErrors(prev => ({ ...prev, [e.target.name]: "" }));
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-surface text-on-surface h-screen w-full flex overflow-hidden">
      <div
        className="hidden lg:flex w-1/2 h-full relative bg-surface-container-low"
        style={{
          backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuATr94Ri7Iug7EVXpJfmryH5eckPhtsjyp6UVF_VAJSwV4GXMe1p1gTJn8PTt3-PmNQvdRhbXnmC20xKDocDPpVenhhltUptFAHq-xE_vfFAVW90w2svGCH9IH0qp4DFQD1wrF7SoeCmf37-dE0Yukg8Rn-hDdA_ieQYEL3QPU4aiEWlKa-QaSBpY1qhwpC52mK6YFaQExLLFXv5BxnuRgxhFLtu9A7xuX3DBOfgwViD1fKMQA_jVn3HoaQkjkuL-T-U3hF8yAfT_4')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-on-surface/40 to-transparent"></div>
        <div className="absolute bottom-xxl left-xxl right-xxl text-on-primary">
          <h2 className="font-display-lg md:text-display-lg mb-sm">Join CareerEngine.</h2>
          <p className="font-body-lg text-body-lg opacity-90 max-w-md">
            Create your account and start connecting with top opportunities today.
          </p>
        </div>
      </div>

      <div className="w-full lg:w-1/2 h-full flex items-center justify-center overflow-y-auto px-md py-xl sm:px-xxl bg-surface">
        <div className="w-full max-w-[440px] flex flex-col gap-xl">
          <div className="flex flex-col gap-sm">
            <div className="flex items-center gap-sm mb-md">
              <div className="w-8 h-8 rounded-lg bg-primary-container flex items-center justify-center">
                <span className="material-symbols-outlined text-on-primary text-xl">work</span>
              </div>
              <span className="font-title-lg text-title-lg text-on-surface">CareerEngine</span>
            </div>
            <h1 className="font-headline-md text-headline-md text-on-surface tracking-tight">Create your account</h1>
            <p className="font-body-md text-body-md text-on-surface-variant">Fill in your details to get started.</p>
          </div>

          <form className="flex flex-col gap-md" onSubmit={handleSubmit}>
            {/* Role Toggle */}
            <div className="flex bg-surface-container-low rounded-xl p-1 gap-1">
              {(["candidate", "recruiter"] as const).map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => setForm(prev => ({ ...prev, role }))}
                  className={`flex-1 py-2 px-md rounded-lg font-label-md text-label-md transition-all capitalize ${
                    form.role === role
                      ? "bg-primary-container text-on-primary shadow-sm"
                      : "text-on-surface-variant hover:text-on-surface"
                  }`}
                >
                  {role === "candidate" ? "Job Seeker" : "Recruiter"}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-md">
              <div className="flex flex-col gap-xs">
                <label className="font-label-sm text-label-sm text-on-surface" htmlFor="firstName">First Name</label>
                <input
                  className={`w-full px-md py-3 rounded-xl border ${errors.firstName ? "border-error" : "border-outline-variant"} bg-surface-container-lowest text-on-surface font-body-md focus:outline-none focus:border-primary-container focus:ring-2 focus:ring-primary-fixed transition-all`}
                  id="firstName"
                  name="firstName"
                  placeholder="John"
                  value={form.firstName}
                  onChange={handleChange}
                />
                {errors.firstName && <span className="text-error font-label-sm text-label-sm">{errors.firstName}</span>}
              </div>
              <div className="flex flex-col gap-xs">
                <label className="font-label-sm text-label-sm text-on-surface" htmlFor="lastName">Last Name</label>
                <input
                  className={`w-full px-md py-3 rounded-xl border ${errors.lastName ? "border-error" : "border-outline-variant"} bg-surface-container-lowest text-on-surface font-body-md focus:outline-none focus:border-primary-container focus:ring-2 focus:ring-primary-fixed transition-all`}
                  id="lastName"
                  name="lastName"
                  placeholder="Doe"
                  value={form.lastName}
                  onChange={handleChange}
                />
                {errors.lastName && <span className="text-error font-label-sm text-label-sm">{errors.lastName}</span>}
              </div>
            </div>

            <div className="flex flex-col gap-xs">
              <label className="font-label-sm text-label-sm text-on-surface" htmlFor="email">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-outline-variant text-[20px]">mail</span>
                </div>
                <input
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border ${errors.email ? "border-error" : "border-outline-variant"} bg-surface-container-lowest text-on-surface font-body-md focus:outline-none focus:border-primary-container focus:ring-2 focus:ring-primary-fixed transition-all`}
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>
              {errors.email && <span className="text-error font-label-sm text-label-sm">{errors.email}</span>}
            </div>

            <div className="flex flex-col gap-xs">
              <label className="font-label-sm text-label-sm text-on-surface" htmlFor="password">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-outline-variant text-[20px]">lock</span>
                </div>
                <input
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border ${errors.password ? "border-error" : "border-outline-variant"} bg-surface-container-lowest text-on-surface font-body-md focus:outline-none focus:border-primary-container focus:ring-2 focus:ring-primary-fixed transition-all`}
                  id="password"
                  name="password"
                  placeholder="Min. 8 characters"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                />
              </div>
              {errors.password && <span className="text-error font-label-sm text-label-sm">{errors.password}</span>}
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
                  placeholder="Repeat your password"
                  type="password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                />
              </div>
              {errors.confirmPassword && <span className="text-error font-label-sm text-label-sm">{errors.confirmPassword}</span>}
            </div>

            <button
              className="w-full py-3 rounded-xl bg-primary-container text-on-primary font-label-md text-label-md hover:bg-primary transition-all active:scale-[0.98] flex items-center justify-center shadow-sm disabled:opacity-50"
              type="submit"
              disabled={isRegistering}
            >
              {isRegistering ? (
                <>
                  <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-on-primary mr-2"></span>
                  Creating account...
                </>
              ) : "Create Account"}
            </button>
          </form>

          <p className="text-center font-body-sm text-body-sm text-on-surface-variant">
            Already have an account?{" "}
            <Link className="font-label-sm text-label-sm text-primary-container hover:text-primary transition-colors" href="/login">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
