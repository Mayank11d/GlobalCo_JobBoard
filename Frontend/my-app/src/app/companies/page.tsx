"use client";

import * as React from "react"
import Link from "next/link"
import { useCompanies } from "@/hooks/useCompany"

export default function BrowseCompaniesPage() {
  const { data: companiesResponse, isLoading, error } = useCompanies();
  const companies = companiesResponse?.data || [];

  return (
    <main className="max-w-container-max mx-auto px-md md:px-lg py-xl md:py-xxl min-h-screen pt-[96px]">
      {/* Hero Section */}
      <section className="mb-xxl text-center max-w-3xl mx-auto">
        <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface mb-md">
          Work with the best engineering teams.
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant">
          Discover top-tier tech companies hiring right now. Explore culture, benefits, and open roles to find your next great opportunity.
        </p>
      </section>

      {/* Filters Section */}
      <section className="mb-lg flex flex-col md:flex-row gap-md items-center justify-between bg-surface-container-lowest p-md rounded-xl border border-outline-variant/50">
        <div className="flex flex-wrap gap-sm w-full md:w-auto">
          {/* Search Input */}
          <div className="relative flex-grow md:flex-grow-0">
            <span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-outline text-[24px]">search</span>
            <input 
              className="w-full md:w-64 pl-[36px] pr-md py-sm border border-outline-variant rounded-lg font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary-container/30 bg-surface-container-lowest" 
              placeholder="Search companies..." 
              type="text"
            />
          </div>
          
          {/* Dropdown Filters */}
          <div className="relative">
            <select className="appearance-none pl-md pr-xl py-sm border border-outline-variant rounded-lg font-body-md text-body-md text-on-surface bg-surface-container-lowest focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary-container/30 cursor-pointer">
              <option value="">Industry</option>
              <option value="software">Software</option>
              <option value="fintech">FinTech</option>
              <option value="healthtech">HealthTech</option>
            </select>
            <span className="material-symbols-outlined absolute right-sm top-1/2 -translate-y-1/2 pointer-events-none text-outline text-[24px]">arrow_drop_down</span>
          </div>
          <div className="relative">
            <select className="appearance-none pl-md pr-xl py-sm border border-outline-variant rounded-lg font-body-md text-body-md text-on-surface bg-surface-container-lowest focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary-container/30 cursor-pointer">
              <option value="">Size</option>
              <option value="1-50">1-50</option>
              <option value="51-200">51-200</option>
              <option value="201-1000">201-1000</option>
              <option value="1000+">1000+</option>
            </select>
            <span className="material-symbols-outlined absolute right-sm top-1/2 -translate-y-1/2 pointer-events-none text-outline text-[24px]">arrow_drop_down</span>
          </div>
          <div className="relative">
            <select className="appearance-none pl-md pr-xl py-sm border border-outline-variant rounded-lg font-body-md text-body-md text-on-surface bg-surface-container-lowest focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary-container/30 cursor-pointer">
              <option value="">Location</option>
              <option value="remote">Remote</option>
              <option value="sf">San Francisco</option>
              <option value="nyc">New York</option>
              <option value="ldn">London</option>
            </select>
            <span className="material-symbols-outlined absolute right-sm top-1/2 -translate-y-1/2 pointer-events-none text-outline text-[24px]">arrow_drop_down</span>
          </div>
        </div>
        
        {/* Toggle View */}
        <div className="hidden md:flex gap-xs bg-surface-container p-xs rounded-lg border border-outline-variant/30">
          <button className="p-xs bg-white rounded shadow-sm text-primary flex items-center justify-center">
            <span className="material-symbols-outlined text-[24px]">grid_view</span>
          </button>
          <button className="p-xs text-on-surface-variant hover:text-on-surface transition-colors flex items-center justify-center">
            <span className="material-symbols-outlined text-[24px]">list</span>
          </button>
        </div>
      </section>

      {/* Company Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
        {isLoading && <p>Loading companies...</p>}
        {error && <p className="text-error">Failed to load companies.</p>}
        {!isLoading && companies.length === 0 && <p>No companies found.</p>}

        {companies.map((company: any) => (
          <div key={company._id} className="bg-surface-container-lowest border border-outline-variant/50 rounded-xl overflow-hidden flex flex-col hover:-translate-y-[2px] hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.05)] transition-all">
            <div className="h-32 bg-surface-variant relative">
              {/* Logo Avatar Overlay */}
              <div className="absolute -bottom-6 left-md w-12 h-12 rounded-lg bg-white border border-outline-variant shadow-sm flex items-center justify-center overflow-hidden font-bold text-xl text-on-surface-variant">
                {company.name.charAt(0)}
              </div>
            </div>
            <div className="p-md pt-lg flex-grow flex flex-col">
              <div className="flex justify-between items-start mb-sm">
                <h3 className="font-title-lg text-title-lg text-on-surface">{company.name}</h3>
              </div>
              <div className="flex gap-sm mb-md text-on-surface-variant font-label-md text-label-md">
                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">location_on</span> {company.location || "Remote"}</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2 mb-lg flex-grow">
                {company.description || "No description available."}
              </p>
              <Link className="mt-auto block w-full text-center py-sm border border-outline-variant rounded-lg font-label-md text-label-md text-on-surface hover:bg-surface-container-low transition-colors" href={`/companies/${company._id}`}>
                View Company
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {companies.length > 0 && (
        <div className="mt-xl flex justify-center gap-sm">
          <button className="w-10 h-10 rounded-lg border border-outline-variant flex items-center justify-center text-on-surface hover:bg-surface-container-low transition-colors">
            <span className="material-symbols-outlined text-[20px]">chevron_left</span>
          </button>
          <button className="w-10 h-10 rounded-lg bg-primary-container text-white font-label-md text-label-md flex items-center justify-center">1</button>
          <button className="w-10 h-10 rounded-lg border border-outline-variant flex items-center justify-center text-on-surface hover:bg-surface-container-low transition-colors">
            <span className="material-symbols-outlined text-[20px]">chevron_right</span>
          </button>
        </div>
      )}
    </main>
  )
}
