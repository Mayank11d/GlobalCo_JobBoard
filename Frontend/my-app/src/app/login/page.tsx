"use client";

import * as React from "react"
import Link from "next/link"
import { useAuth } from "@/hooks/useAuth"

export default function LoginPage() {
  const { login, isLoggingIn } = useAuth();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login({ email, password });
    } catch (err: any) {
      // Error is handled by useAuth via toast
      console.error(err);
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
          <h2 className="font-display-lg md:text-display-lg mb-sm">Build your engineering team.</h2>
          <p className="font-body-lg text-body-lg opacity-90 max-w-md">
            Connect with top talent and streamline your hiring process with our modern tools.
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
            <h1 className="font-headline-md text-headline-md text-on-surface tracking-tight">Welcome back</h1>
            <p className="font-body-md text-body-md text-on-surface-variant">Please enter your details to sign in to your account.</p>
          </div>
          
          <form className="flex flex-col gap-lg" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-md">
              <div className="flex flex-col gap-xs">
                <label className="font-label-sm text-label-sm text-on-surface" htmlFor="email">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-outline-variant text-[20px]">mail</span>
                  </div>
                  <input 
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-outline-variant bg-surface-container-lowest text-on-surface font-body-md text-body-md focus:outline-none focus:border-primary-container focus:ring-2 focus:ring-primary-fixed transition-all" 
                    id="email" 
                    name="email" 
                    placeholder="Enter your email" 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col gap-xs">
                <label className="font-label-sm text-label-sm text-on-surface" htmlFor="password">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-outline-variant text-[20px]">lock</span>
                  </div>
                  <input 
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-outline-variant bg-surface-container-lowest text-on-surface font-body-md text-body-md focus:outline-none focus:border-primary-container focus:ring-2 focus:ring-primary-fixed transition-all" 
                    id="password" 
                    name="password" 
                    placeholder="••••••••" 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input className="w-4 h-4 rounded border-outline-variant text-primary-container focus:ring-primary-fixed cursor-pointer" type="checkbox"/>
                <span className="font-body-sm text-body-sm text-on-surface-variant group-hover:text-on-surface transition-colors">Remember me</span>
              </label>
              <Link className="font-label-sm text-label-sm text-primary-container hover:text-primary transition-colors" href="/forgot-password">
                Forgot Password?
              </Link>
            </div>
            
            <button 
              className="w-full py-3 rounded-xl bg-primary-container text-on-primary font-label-md text-label-md hover:bg-primary transition-all active:scale-[0.98] flex items-center justify-center shadow-sm disabled:opacity-50" 
              type="submit"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? "Signing in..." : "Sign In"}
            </button>
          </form>
          
          <div className="flex items-center gap-md">
            <div className="h-px bg-outline-variant flex-1"></div>
            <span className="font-body-sm text-body-sm text-outline">Or continue with</span>
            <div className="h-px bg-outline-variant flex-1"></div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-md">
            <button className="flex-1 py-3 px-4 rounded-xl border border-outline-variant bg-surface-container-lowest hover:bg-surface-container-low text-on-surface font-label-md text-label-md transition-colors flex items-center justify-center gap-2" type="button">
              <span className="material-symbols-outlined text-[20px]">login</span>
              Google
            </button>
            <button className="flex-1 py-3 px-4 rounded-xl border border-outline-variant bg-surface-container-lowest hover:bg-surface-container-low text-on-surface font-label-md text-label-md transition-colors flex items-center justify-center gap-2" type="button">
              <span className="material-symbols-outlined text-[20px]">code</span>
              GitHub
            </button>
          </div>
          
          <p className="text-center font-body-sm text-body-sm text-on-surface-variant mt-sm">
            Don't have an account? 
            <Link className="font-label-sm text-label-sm text-primary-container hover:text-primary transition-colors ml-1" href="/register">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
