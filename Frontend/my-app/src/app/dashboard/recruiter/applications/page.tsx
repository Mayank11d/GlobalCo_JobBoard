"use client";

import * as React from "react"
import Link from "next/link"
import toast from "react-hot-toast"

import { RecruiterSidebar } from "@/components/dashboard/RecruiterSidebar"
import { useRecruiterApplications, useUpdateApplicationStatus } from "@/hooks/useApplication"

const statusOptions = ["pending", "reviewing", "interviewing", "hired", "rejected"];

const statusBadge = (status: string) => {
  const map: Record<string, string> = {
    pending: "bg-surface-container-highest text-on-surface-variant",
    reviewing: "bg-secondary-fixed text-secondary",
    interviewing: "bg-tertiary-fixed text-tertiary",
    hired: "bg-primary-fixed text-primary",
    rejected: "bg-error-container text-on-error-container",
  };
  return map[status] || "bg-surface-container-highest text-on-surface-variant";
};

export default function ApplicationsPage() {
  const { data: appsData, isLoading } = useRecruiterApplications();
  const updateStatus = useUpdateApplicationStatus();

  const [search, setSearch] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("all");

  const applications = appsData?.data || [];

  const filtered = applications.filter((app: any) => {
    const candidate = app.candidateId;
    const name = candidate ? `${candidate.firstName || ""} ${candidate.lastName || ""}`.toLowerCase() : "";
    const matchSearch = !search || name.includes(search.toLowerCase()) || (app.jobId?.title || "").toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || app.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleStatusChange = async (id: string, status: string) => {
    try {
      await updateStatus.mutateAsync({ id, status });
      toast.success(`Status updated to ${status}`);
    } catch { }
  };

  return (
    <div className="flex min-h-screen bg-surface-bright">
      <RecruiterSidebar />

      <main className="md:ml-64 flex-1 flex flex-col min-h-screen pt-16 md:pt-0">
        <div className="max-w-container-max mx-auto w-full p-xxl flex flex-col gap-xl">
          <header className="flex flex-wrap justify-between items-center gap-md w-full">
            <div>
              <h2 className="font-display-lg-mobile text-display-lg-mobile text-on-surface">Applications</h2>
              <p className="font-body-md text-body-md text-on-surface-variant mt-unit">Review and manage incoming applications.</p>
            </div>
            <div className="flex items-center gap-sm flex-wrap">
              <div className="relative">
                <span className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-outline text-[20px]">search</span>
                <input
                  className="pl-xl pr-md py-sm rounded-lg border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary bg-surface outline-none font-body-md"
                  placeholder="Search applicants..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <select
                className="border border-outline-variant rounded-lg px-md py-sm font-body-md text-on-surface bg-surface outline-none focus:border-primary"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Statuses</option>
                {statusOptions.map(s => <option key={s} value={s} className="capitalize">{s}</option>)}
              </select>
            </div>
          </header>

          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm">
            {isLoading ? (
              <div className="flex items-center justify-center p-xxl">
                <span className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></span>
              </div>
            ) : filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-xxl gap-md text-on-surface-variant">
                <span className="material-symbols-outlined text-5xl">inbox</span>
                <p className="font-body-md">{search || statusFilter !== "all" ? "No applications match your filters." : "No applications yet."}</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-surface-container-high border-b border-outline-variant">
                      <th className="p-md font-label-md text-label-md text-on-surface-variant">Applicant</th>
                      <th className="p-md font-label-md text-label-md text-on-surface-variant">Role</th>
                      <th className="p-md font-label-md text-label-md text-on-surface-variant">Status</th>
                      <th className="p-md font-label-md text-label-md text-on-surface-variant hidden lg:table-cell">Applied</th>
                      <th className="p-md font-label-md text-label-md text-on-surface-variant text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((app: any) => {
                      const candidate = app.candidateId;
                      const job = app.jobId;
                      const name = candidate ? `${candidate.firstName || ""} ${candidate.lastName || ""}`.trim() : "Unknown Candidate";
                      return (
                        <tr key={app._id} className="border-b border-outline-variant hover:bg-surface-container-low transition-colors">
                          <td className="p-md">
                            <div className="flex items-center gap-sm">
                              <div className="w-10 h-10 rounded-full bg-primary-fixed text-primary flex items-center justify-center font-bold uppercase flex-shrink-0">
                                {name.charAt(0) || "?"}
                              </div>
                              <span className="font-label-md text-on-surface">{name}</span>
                            </div>
                          </td>
                          <td className="p-md font-body-sm text-on-surface-variant">{job?.title || "Unknown Job"}</td>
                          <td className="p-md">
                            <select
                              className={`px-sm py-xs rounded-full font-label-sm capitalize border-none outline-none cursor-pointer ${statusBadge(app.status)}`}
                              value={app.status}
                              onChange={(e) => handleStatusChange(app._id, e.target.value)}
                              disabled={updateStatus.isPending}
                            >
                              {statusOptions.map(s => <option key={s} value={s} className="capitalize">{s}</option>)}
                            </select>
                          </td>
                          <td className="p-md hidden lg:table-cell font-body-sm text-on-surface-variant">
                            {new Date(app.createdAt).toLocaleDateString()}
                          </td>
                          <td className="p-md text-right">
                            <Link
                              href={`/dashboard/recruiter/applicants/${app._id}`}
                              className="text-primary font-label-sm hover:underline"
                            >
                              Review
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
