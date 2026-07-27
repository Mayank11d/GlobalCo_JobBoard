"use client";

import * as React from "react"
import Link from "next/link"

import { CandidateSidebar } from "@/components/dashboard/CandidateSidebar"
import { useAuth } from "@/hooks/useAuth"
import { useDashboardStats } from "@/hooks/useDashboard"
import { useUserApplications } from "@/hooks/useApplication"
import { useSavedJobs } from "@/hooks/useSavedJob"
import { useJobs } from "@/hooks/useJob"
import { useSaveJob } from "@/hooks/useSavedJob"
import toast from "react-hot-toast"

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

export default function CandidateDashboardPage() {
  const { user } = useAuth();
  const { data: appsData, isLoading: appsLoading } = useUserApplications();
  const { data: savedData } = useSavedJobs();
  const { data: jobsData } = useJobs();
  const saveJob = useSaveJob();

  const applications = appsData?.data || [];
  const savedJobs = savedData?.data || [];
  const recentJobs = jobsData?.data?.filter((j: any) => j.status === "published").slice(0, 3) || [];
  const savedJobIds = new Set(savedJobs.map((s: any) => (s.job || s.jobId)?._id));

  const interviewingCount = applications.filter((a: any) => a.status === "interviewing").length;

  const handleSave = async (jobId: string) => {
    try {
      await saveJob.mutateAsync({ jobId });
      toast.success("Job saved!");
    } catch { }
  };

  const getGreeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 17) return "Good afternoon";
    return "Good evening";
  };

  const displayName = user ? `${user.firstName || ""} ${user.lastName || ""}`.trim() || user.email : "Candidate";

  // Profile strength calculation
  const profileFields = [user?.firstName, user?.lastName, user?.headline, user?.bio, user?.skills?.length, user?.avatarUrl];
  const filledFields = profileFields.filter(Boolean).length;
  const profileStrength = Math.round((filledFields / profileFields.length) * 100);

  return (
    <div className="flex min-h-screen bg-surface">
      <CandidateSidebar />

      <main className="flex-1 md:ml-64 p-md md:p-xl lg:p-xxl max-w-container-max mx-auto w-full mb-16 md:mb-0">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-md mb-xl">
          <div>
            <h2 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface">
              {getGreeting()}, {displayName}.
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant mt-2">Here's a quick overview of your job search progress.</p>
          </div>

          <div className="bg-surface border border-outline-variant rounded-xl p-md flex items-center gap-md w-full md:w-auto shadow-sm">
            <div className="flex-1 min-w-[200px]">
              <div className="flex justify-between items-center mb-1">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">Profile Strength</span>
                <span className="font-label-sm text-label-sm text-primary">{profileStrength}%</span>
              </div>
              <div className="w-full bg-surface-container-high rounded-full h-2">
                <div className="bg-primary-container h-2 rounded-full transition-all" style={{ width: `${profileStrength}%` }}></div>
              </div>
            </div>
            <Link href="/dashboard/candidate/profile" className="bg-primary-container text-white px-md py-sm rounded-lg font-label-md text-label-md hover:bg-primary transition-colors whitespace-nowrap">
              {profileStrength < 100 ? "Complete Profile" : "View Profile"}
            </Link>
          </div>
        </header>

        {/* Stats */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-lg mb-xxl">
          <div className="bg-surface border border-outline-variant rounded-xl p-lg flex flex-col gap-sm hover:-translate-y-0.5 hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.05)] transition-all">
            <div className="flex items-center gap-sm text-primary">
              <span className="material-symbols-outlined bg-primary-container/10 p-sm rounded-lg text-[24px]">description</span>
              <span className="font-label-sm text-label-sm uppercase tracking-wider">Applied</span>
            </div>
            <div className="font-headline-md text-headline-md text-on-surface mt-sm">
              {appsLoading ? "—" : applications.length}
            </div>
            <div className="font-body-sm text-body-sm text-on-surface-variant">
              {interviewingCount > 0 ? `${interviewingCount} active interview${interviewingCount > 1 ? "s" : ""}` : "No active interviews"}
            </div>
          </div>

          <div className="bg-surface border border-outline-variant rounded-xl p-lg flex flex-col gap-sm hover:-translate-y-0.5 hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.05)] transition-all">
            <div className="flex items-center gap-sm text-secondary">
              <span className="material-symbols-outlined bg-secondary-container/10 p-sm rounded-lg text-[24px]">bookmark</span>
              <span className="font-label-sm text-label-sm uppercase tracking-wider">Saved</span>
            </div>
            <div className="font-headline-md text-headline-md text-on-surface mt-sm">{savedJobs.length}</div>
            <div className="font-body-sm text-body-sm text-on-surface-variant">
              {savedJobs.length > 0 ? "Ready to apply" : "Save jobs to apply later"}
            </div>
          </div>

          <div className="bg-surface border border-outline-variant rounded-xl p-lg flex flex-col gap-sm hover:-translate-y-0.5 hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.05)] transition-all">
            <div className="flex items-center gap-sm text-tertiary">
              <span className="material-symbols-outlined bg-tertiary-container/10 p-sm rounded-lg text-[24px]">verified_user</span>
              <span className="font-label-sm text-label-sm uppercase tracking-wider">Profile</span>
            </div>
            <div className="font-headline-md text-headline-md text-on-surface mt-sm">{profileStrength}%</div>
            <div className="font-body-sm text-body-sm text-on-surface-variant">
              {profileStrength === 100 ? "Profile complete!" : "Complete your profile"}
            </div>
          </div>
        </section>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-lg">
          {/* Recent Applications */}
          <section className="lg:col-span-2 bg-surface border border-outline-variant rounded-xl overflow-hidden flex flex-col">
            <div className="p-lg border-b border-outline-variant flex justify-between items-center bg-surface">
              <h3 className="font-title-lg text-title-lg text-on-surface">Recent Applications</h3>
              <Link href="/dashboard/candidate/applied" className="text-primary font-label-md text-label-md hover:underline">View All</Link>
            </div>
            {appsLoading ? (
              <div className="flex items-center justify-center p-xxl">
                <span className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></span>
              </div>
            ) : applications.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-xxl gap-md text-on-surface-variant">
                <span className="material-symbols-outlined text-4xl">inbox</span>
                <p className="font-body-md">No applications yet.</p>
                <Link href="/jobs" className="text-primary font-label-md hover:underline">Browse Jobs</Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-surface-container-low border-b border-outline-variant font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                      <th className="p-md font-medium">Role</th>
                      <th className="p-md font-medium">Status</th>
                      <th className="p-md font-medium text-right">Date Applied</th>
                    </tr>
                  </thead>
                  <tbody className="font-body-sm text-body-sm text-on-surface divide-y divide-outline-variant">
                    {applications.slice(0, 5).map((app: any) => {
                      const job = app.jobId;
                      return (
                        <tr key={app._id} className="hover:bg-surface-container-lowest transition-colors cursor-pointer">
                          <td className="p-md font-medium hover:text-primary transition-colors">{job?.title || "Unknown Job"}</td>
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
            )}
          </section>

          {/* Recommended Jobs */}
          <section className="lg:col-span-1 flex flex-col gap-md">
            <div className="flex justify-between items-center mb-xs">
              <h3 className="font-title-lg text-title-lg text-on-surface">Recommended for you</h3>
            </div>

            {recentJobs.length === 0 ? (
              <div className="bg-surface border border-outline-variant rounded-xl p-lg flex flex-col items-center justify-center gap-sm text-on-surface-variant">
                <span className="material-symbols-outlined text-4xl">work_off</span>
                <p className="font-body-sm">No jobs available.</p>
              </div>
            ) : recentJobs.map((job: any) => (
              <div key={job._id} className="bg-surface border border-outline-variant rounded-xl p-md flex flex-col gap-sm hover:-translate-y-0.5 hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.05)] transition-all cursor-pointer">
                <div className="flex justify-between items-start">
                  <div className="flex gap-sm">
                    <div className="w-10 h-10 rounded-lg bg-surface-variant border border-outline-variant flex items-center justify-center font-bold text-on-surface-variant uppercase">
                      {job.title?.[0] || "?"}
                    </div>
                    <div>
                      <h4 className="font-label-md text-label-md text-on-surface font-semibold">{job.title}</h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">{job.location}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleSave(job._id)}
                    disabled={saveJob.isPending || savedJobIds.has(job._id)}
                    className={`transition-colors ${savedJobIds.has(job._id) ? "text-primary" : "text-outline hover:text-primary"}`}
                    title={savedJobIds.has(job._id) ? "Already saved" : "Save job"}
                  >
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: savedJobIds.has(job._id) ? "'FILL' 1" : "'FILL' 0" }}>bookmark</span>
                  </button>
                </div>
                <div className="flex gap-xs mt-sm flex-wrap">
                  <span className="px-2 py-1 bg-surface-container-low rounded text-xs font-medium text-on-surface-variant border border-outline-variant capitalize">{job.workMode}</span>
                  {(job.salaryMin || job.salaryMax) && (
                    <span className="px-2 py-1 bg-surface-container-low rounded text-xs font-medium text-on-surface-variant border border-outline-variant">
                      {job.salaryMin && job.salaryMax ? `$${(job.salaryMin / 1000).toFixed(0)}k–$${(job.salaryMax / 1000).toFixed(0)}k` : ""}
                    </span>
                  )}
                </div>
              </div>
            ))}

            <Link href="/jobs" className="text-primary font-label-sm text-label-sm hover:underline flex items-center gap-1 justify-center">
              Browse all jobs <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
          </section>
        </div>
      </main>
    </div>
  )
}
