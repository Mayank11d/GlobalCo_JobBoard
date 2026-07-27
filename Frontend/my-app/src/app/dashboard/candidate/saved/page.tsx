"use client";

import * as React from "react"
import Link from "next/link"
import toast from "react-hot-toast"

import { CandidateSidebar } from "@/components/dashboard/CandidateSidebar"
import { useSavedJobs, useRemoveSavedJob } from "@/hooks/useSavedJob"

export default function SavedJobsPage() {
  const { data, isLoading } = useSavedJobs();
  const removeJob = useRemoveSavedJob();

  const savedJobs = data?.data || [];

  const handleRemove = async (id: string) => {
    try {
      await removeJob.mutateAsync(id);
      toast.success("Job removed from saved list");
    } catch { }
  };

  return (
    <div className="flex min-h-screen bg-surface">
      <CandidateSidebar />

      <main className="flex-1 md:ml-64 p-md md:p-xl lg:p-xxl max-w-container-max mx-auto w-full mb-16 md:mb-0">
        <header className="mb-xl">
          <h2 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface">Saved Jobs</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mt-2">Jobs you've bookmarked to apply for later.</p>
        </header>

        {isLoading ? (
          <div className="flex items-center justify-center p-xxl">
            <span className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></span>
          </div>
        ) : savedJobs.length === 0 ? (
          <div className="bg-surface border border-outline-variant rounded-xl p-xxl flex flex-col items-center justify-center gap-md text-on-surface-variant">
            <span className="material-symbols-outlined text-5xl">bookmark_remove</span>
            <p className="font-body-md">No saved jobs yet.</p>
            <Link href="/jobs" className="bg-primary-container text-on-primary px-md py-sm rounded-lg font-label-md hover:bg-primary transition-colors">Browse Jobs</Link>
          </div>
        ) : (
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md">
            {savedJobs.map((saved: any) => {
              const job = saved.job || saved.jobId;
              if (!job) return null;
              return (
                <div key={saved._id} className="bg-surface border border-outline-variant rounded-xl p-md flex flex-col gap-sm hover:-translate-y-0.5 hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.05)] transition-all">
                  <div className="flex justify-between items-start">
                    <div className="flex gap-sm">
                      <div className="w-10 h-10 rounded-lg bg-surface-variant border border-outline-variant flex items-center justify-center font-bold text-on-surface-variant">
                        {typeof job.companyId === "object" ? job.companyId?.name?.[0] || "?" : "?"}
                      </div>
                      <div>
                        <h4 className="font-label-md text-label-md text-on-surface font-semibold">{job.title}</h4>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">{job.location}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemove(saved._id)}
                      disabled={removeJob.isPending}
                      className="text-primary hover:text-error transition-colors"
                      title="Remove saved job"
                    >
                      <span className="material-symbols-outlined fill-current">bookmark</span>
                    </button>
                  </div>
                  <div className="flex gap-xs mt-sm flex-wrap">
                    <span className="px-2 py-1 bg-surface-container-low rounded text-xs font-medium text-on-surface-variant border border-outline-variant capitalize">{job.workMode}</span>
                    {(job.salaryMin || job.salaryMax) && (
                      <span className="px-2 py-1 bg-surface-container-low rounded text-xs font-medium text-on-surface-variant border border-outline-variant">
                        {job.salaryMin && job.salaryMax ? `$${(job.salaryMin / 1000).toFixed(0)}k - $${(job.salaryMax / 1000).toFixed(0)}k` : job.salaryMin ? `From $${(job.salaryMin / 1000).toFixed(0)}k` : `Up to $${(job.salaryMax / 1000).toFixed(0)}k`}
                      </span>
                    )}
                    <span className="px-2 py-1 bg-surface-container-low rounded text-xs font-medium text-on-surface-variant border border-outline-variant capitalize">{job.jobType}</span>
                  </div>
                  <Link href={`/jobs/${job._id}`} className="mt-auto text-primary font-label-sm text-label-sm hover:underline flex items-center gap-1">
                    View Job <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </Link>
                </div>
              );
            })}
          </section>
        )}
      </main>
    </div>
  )
}
