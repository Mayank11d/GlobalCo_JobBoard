"use client";

import * as React from "react"
import Link from "next/link"
import { useCompany } from "@/hooks/useCompany"

export default function CompanyDetailsPage({ params }: { params: { id: string } }) {
  const { data: companyResponse, isLoading, error } = useCompany(params.id);

  if (isLoading) {
    return (
      <main className="flex-grow pt-[64px] min-h-screen flex items-center justify-center">
        <p>Loading company details...</p>
      </main>
    );
  }

  if (error || !companyResponse?.data) {
    return (
      <main className="flex-grow pt-[64px] min-h-screen flex flex-col items-center justify-center">
        <p className="text-error mb-4">Company not found.</p>
        <Link href="/companies" className="text-primary hover:underline">Back to companies</Link>
      </main>
    );
  }

  const company = companyResponse.data;

  return (
    <main className="flex-grow pt-[64px]">
      {/* Hero Banner Section */}
      <section className="relative w-full h-[400px] md:h-[500px]">
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center" 
          style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBlyVVB_2GcXndDwNIcSuQ7N3TSxcYlQXhz0Nd5EIj7xnicFjKWl4Jrco81p0qehOyttlEDOxw3ov2QZ5mFWcl3IoL6s5j4TrhRFzkDNggLHicOqKctkpsY8_aCCtQT1ASZs1CNQhdIAvAICGcyVBUoGuI8Rg7qMAHH70ce26GH3pJCcxRhQ32aTttO6pCC3qnAq9rifw0MDoXkvzPgicEprb9QZY1mK6i2tUCV1vTDOdEm5Jgyu2xktILuPdxZolcBpyV-gps-ZI0')" }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-on-surface/80 to-transparent"></div>
        
        <div className="absolute bottom-0 w-full max-w-container-max mx-auto px-lg pb-xl flex items-end gap-lg">
          <div className="w-32 h-32 md:w-40 md:h-40 bg-white rounded-xl border border-outline-variant p-sm shadow-sm flex items-center justify-center shrink-0 font-bold text-4xl text-on-surface-variant">
            {company.name.charAt(0)}
          </div>
          <div className="text-white pb-sm">
            <h1 className="font-display-lg text-display-lg-mobile mb-xs">{company.name}</h1>
            <div className="flex flex-wrap items-center gap-md text-surface-dim font-body-md">
              <span className="flex items-center gap-xs">
                <span className="material-symbols-outlined text-[18px]">location_on</span> {company.location || "Remote"}
              </span>
            </div>
          </div>
          <div className="ml-auto pb-sm flex gap-sm">
            {company.website && (
              <a className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center backdrop-blur-sm transition-colors text-white" href={company.website} target="_blank" rel="noreferrer">
                <span className="material-symbols-outlined">language</span>
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <div className="bg-surface border-b border-outline-variant sticky top-[64px] z-40">
        <div className="max-w-container-max mx-auto px-lg">
          <div className="flex gap-lg">
            <a className="py-md text-primary border-b-2 border-primary font-title-lg font-bold" href="#">About</a>
            <a className="py-md text-on-surface-variant hover:text-primary transition-colors font-title-lg" href="#">Jobs</a>
          </div>
        </div>
      </div>

      <div className="max-w-container-max mx-auto px-lg py-xxl grid grid-cols-1 lg:grid-cols-12 gap-xxl">
        {/* Main Content Area */}
        <div className="lg:col-span-8 space-y-xxl">
          
          {/* Mission Section */}
          <section>
            <h2 className="font-headline-md text-headline-md mb-lg">About {company.name}</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed whitespace-pre-wrap">
              {company.description || "No description provided."}
            </p>
          </section>

        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4">
          <div className="bg-surface-bright border border-outline-variant rounded-xl p-lg sticky top-[130px]">
            <h3 className="font-title-lg text-title-lg mb-lg border-b border-outline-variant pb-sm">Company Facts</h3>
            <ul className="space-y-md">
              <li className="flex flex-col gap-xs">
                <span className="text-on-surface-variant font-label-sm uppercase tracking-wider">Location</span>
                <span className="font-body-md">{company.location || "Remote"}</span>
              </li>
              {company.website && (
                <li className="flex flex-col gap-xs">
                  <span className="text-on-surface-variant font-label-sm uppercase tracking-wider">Website</span>
                  <a className="font-body-md text-primary hover:underline flex items-center gap-xs" href={company.website} target="_blank" rel="noreferrer">
                    {company.website.replace(/^https?:\/\//, '')} <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

      </div>
    </main>
  )
}
