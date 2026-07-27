"use client";

import * as React from "react"
import { Checkbox } from "@/components/ui/Checkbox"
import { Select } from "@/components/ui/Select"
import { Pagination } from "@/components/ui/Pagination"
import { useJobs } from "@/hooks/useJob"
import Link from "next/link"

export default function BrowseJobsPage() {
  const [isFiltersOpen, setIsFiltersOpen] = React.useState(false);
  const { data: jobsResponse, isLoading, error } = useJobs();
  
  const jobs = jobsResponse?.data || [];
  const totalJobs = jobsResponse?.count || jobs.length || 0;

  return (
    <div className="flex-grow max-w-container-max mx-auto w-full px-md md:px-lg pt-[96px] pb-xxl grid grid-cols-1 lg:grid-cols-12 gap-gutter">
      
      {/* Mobile Filters Toggle */}
      <div className="lg:hidden mb-md">
        <button 
          onClick={() => setIsFiltersOpen(!isFiltersOpen)}
          className="w-full flex items-center justify-between p-md border border-outline-variant rounded-lg bg-surface-container-lowest"
        >
          <span className="font-title-lg text-title-lg text-on-surface">Filters</span>
          <span className="material-symbols-outlined text-on-surface-variant">
            {isFiltersOpen ? "expand_less" : "expand_more"}
          </span>
        </button>
      </div>

      {/* Left Column: Filter Panel */}
      <aside className={`lg:col-span-3 ${isFiltersOpen ? "block" : "hidden"} lg:block mb-lg lg:mb-0`}>
        <div className="lg:sticky lg:top-[96px] bg-surface-container-lowest border border-outline-variant rounded-lg p-lg flex flex-col gap-lg lg:h-[calc(100vh-120px)] overflow-y-auto">
          <div className="flex items-center justify-between">
            <h2 className="font-title-lg text-title-lg hidden lg:block">Filters</h2>
            <button className="font-label-sm text-label-sm text-primary hover:underline">Clear all</button>
          </div>
          
          {/* Search */}
          <div className="flex flex-col gap-sm">
            <label className="font-label-md text-label-md text-on-surface-variant">Keywords</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-outline">search</span>
              <input 
                className="w-full pl-xl pr-sm py-sm border border-outline-variant rounded-lg font-body-sm text-body-sm focus:border-primary focus:ring-2 focus:ring-primary-fixed outline-none transition-shadow" 
                placeholder="Job title, skills..." 
                type="text"
              />
            </div>
          </div>
          
          <hr className="border-outline-variant"/>
          
          {/* Work Mode */}
          <div className="flex flex-col gap-sm">
            <label className="font-label-md text-label-md text-on-surface-variant mb-xs">Work Mode</label>
            <Checkbox label="Remote" defaultChecked />
            <Checkbox label="Hybrid" />
            <Checkbox label="On-site" />
          </div>
          
          <hr className="border-outline-variant"/>
          
          {/* Experience */}
          <div className="flex flex-col gap-sm">
            <label className="font-label-md text-label-md text-on-surface-variant mb-xs">Experience Level</label>
            <Checkbox label="Entry Level" />
            <Checkbox label="Mid Level" />
            <Checkbox label="Senior Level" defaultChecked />
            <Checkbox label="Director+" />
          </div>
          
          <hr className="border-outline-variant"/>
          
          {/* Employment Type */}
          <div className="flex flex-col gap-sm">
            <label className="font-label-md text-label-md text-on-surface-variant mb-xs">Employment Type</label>
            <Checkbox label="Full-time" defaultChecked />
            <Checkbox label="Contract" />
          </div>
        </div>
      </aside>
      
      {/* Right Column: Job Listings */}
      <div className="lg:col-span-9 flex flex-col gap-lg">
        {/* Header & Sort */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-md">
          <div>
            <h1 className="font-headline-md text-headline-md">Available Jobs</h1>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-xs">Showing {totalJobs} open positions</p>
          </div>
          <div className="flex items-center gap-sm w-full sm:w-auto">
            <span className="font-label-sm text-label-sm text-on-surface-variant whitespace-nowrap">Sort by:</span>
            <Select className="w-full sm:w-48">
              <option>Most Relevant</option>
              <option>Newest First</option>
              <option>Highest Salary</option>
            </Select>
          </div>
        </div>
        
        {/* Job List */}
        <div className="flex flex-col gap-md">
          {isLoading && <p>Loading jobs...</p>}
          {error && <p className="text-error">Failed to load jobs. Please try again later.</p>}
          {!isLoading && jobs.length === 0 && <p>No jobs found.</p>}
          
          {jobs.map((job: any) => (
            <div key={job._id} className="bg-surface-container-lowest border border-outline-variant rounded-lg p-lg hover:-translate-y-[2px] hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.05)] transition-all flex flex-col gap-md">
              <div className="flex justify-between items-start gap-md">
                <div className="flex gap-md">
                  <div className="w-12 h-12 rounded-md border border-outline-variant bg-surface-variant flex items-center justify-center font-bold text-on-surface-variant text-xl">
                    {job.company?.name ? job.company.name.charAt(0) : "C"}
                  </div>
                  <div className="flex flex-col">
                    <Link href={`/jobs/${job._id}`} className="hover:underline">
                      <h3 className="font-title-lg text-title-lg">{job.title}</h3>
                    </Link>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      {job.company?.name || "Company"} • {job.location || "Remote"}
                    </p>
                  </div>
                </div>
                <button className="text-outline hover:text-primary transition-colors">
                  <span className="material-symbols-outlined text-[24px]">bookmark_border</span>
                </button>
              </div>
              
              <div className="flex flex-wrap gap-sm">
                <span className="bg-surface-container-high text-on-surface font-label-sm text-label-sm px-sm py-[2px] rounded-full">{job.jobType || job.type || "Full-time"}</span>
                <span className="bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm px-sm py-[2px] rounded-full">{job.workMode || "Remote"}</span>
                {job.salaryMin && job.salaryMax && (
                   <span className="bg-surface-container-high text-on-surface font-label-sm text-label-sm px-sm py-[2px] rounded-full">${(job.salaryMin/1000).toFixed(0)}k - ${(job.salaryMax/1000).toFixed(0)}k</span>
                )}
                {job.requirements && job.requirements.slice(0, 2).map((req: string, idx: number) => (
                  <span key={idx} className="bg-surface-container-high text-on-surface font-label-sm text-label-sm px-sm py-[2px] rounded-full">{req}</span>
                ))}
              </div>
              
              <div className="flex justify-between items-end mt-sm">
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  {new Date(job.createdAt).toLocaleDateString()}
                </span>
                <Link href={`/jobs/${job._id}`}>
                  <button className="bg-primary-container text-on-primary font-label-md text-label-md px-lg py-sm rounded-lg hover:bg-primary transition-colors">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        {/* Pagination */}
        <Pagination currentPage={1} totalPages={Math.max(1, Math.ceil(totalJobs / 10))} />
      </div>
    </div>
  )
}
