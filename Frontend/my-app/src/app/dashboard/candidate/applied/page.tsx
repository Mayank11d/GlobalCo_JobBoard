"use client";

import * as React from "react"
import Link from "next/link"
import toast from "react-hot-toast"

import { CandidateSidebar } from "@/components/dashboard/CandidateSidebar"
import { useUserApplications } from "@/hooks/useApplication"

const statusBadge = (status: string) => {
  const map: Record<string, string> = {
    pending: "bg-surface-container-highest text-on-surface-variant border border-outline-variant",
    reviewing: "bg-secondary-fixed text-secondary border border-secondary/20",
    interviewing: "bg-tertiary-fixed text-tertiary border border-tertiary/20",
    hired: "bg-primary-fixed text-primary border border-primary/20",
    rejected: "bg-error-container text-on-error-container border border-error/20",
  };
  return map[status] || "bg-surface-container-highest text-on-surface-variant border border-outline-variant";
};

export default function AppliedJobsPage() {
  const { data, isLoading } = useUserApplications();
  const applications = data?.data || [];

  return (
    <div className="flex min-h-screen bg-surface">
      <CandidateSidebar />

      <main className="flex-1 md:ml-64 p-md md:p-xl lg:p-xxl max-w-container-max mx-auto w-full mb-16 md:mb-0">
        <header className="mb-xl">
          <h2 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface">Applied Jobs</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mt-2">Track the status of your submitted applications.</p>
        </header>

        {isLoading ? (
          <div className="flex items-center justify-center p-xxl">
            <span className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></span>
          </div>
        ) : applications.length === 0 ? (
          <div className="bg-surface border border-outline-variant rounded-xl p-xxl flex flex-col items-center justify-center gap-md text-on-surface-variant">
            <span className="material-symbols-outlined text-5xl">work_off</span>
            <p className="font-body-md">No applications yet.</p>
            <Link href="/jobs" className="bg-primary-container text-on-primary px-md py-sm rounded-lg font-label-md hover:bg-primary transition-colors">Browse Jobs</Link>
          </div>
        ) : (
          <section className="bg-surface border border-outline-variant rounded-xl overflow-hidden flex flex-col">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-low border-b border-outline-variant font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                    <th className="p-md font-medium">Role & Company</th>
                    <th className="p-md font-medium">Type</th>
                    <th className="p-md font-medium">Status</th>
                    <th className="p-md font-medium text-right">Date Applied</th>
                  </tr>
                </thead>
                <tbody className="font-body-sm text-body-sm text-on-surface divide-y divide-outline-variant">
                  {applications.map((app: any) => {
                    const job = app.jobId;
                    return (
                      <tr key={app._id} className="hover:bg-surface-container-lowest transition-colors">
                        <td className="p-md">
                          <p className="font-label-md text-on-surface font-semibold">{job?.title || "Unknown Job"}</p>
                          <p className="text-on-surface-variant mt-0.5 capitalize">{job?.location || ""} {job?.workMode ? `· ${job.workMode}` : ""}</p>
                        </td>
                        <td className="p-md">
                          <span className="capitalize text-on-surface-variant">{job?.jobType || "—"}</span>
                        </td>
                        <td className="p-md">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full font-label-sm text-label-sm capitalize ${statusBadge(app.status)}`}>
                            {app.status}
                          </span>
                        </td>
                        <td className="p-md text-right text-on-surface-variant">
                          {new Date(app.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </main>
    </div>
  )
}
