"use client";

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

import { RecruiterSidebar } from "@/components/dashboard/RecruiterSidebar"
import { useDashboardStats } from "@/hooks/useDashboard"
import { useJobs, useDeleteJob, useCreateJob, useUpdateJob } from "@/hooks/useJob"
import { useMyCompany } from "@/hooks/useCompany"
import { useRecruiterApplications } from "@/hooks/useApplication"
import { useAuth } from "@/hooks/useAuth"
import { Job } from "@/types/job.types"

// --- Modal ---
function JobFormModal({ open, onClose, job, companyId }: {
  open: boolean;
  onClose: () => void;
  job?: Job | null;
  companyId: string;
}) {
  const createJob = useCreateJob();
  const updateJob = useUpdateJob();
  const { user } = useAuth();

  const [form, setForm] = React.useState({
    title: job?.title || "",
    description: job?.description || "",
    location: job?.location || "",
    jobType: job?.jobType || "full-time",
    workMode: job?.workMode || "remote",
    status: job?.status || "draft",
    salaryMin: job?.salaryMin?.toString() || "",
    salaryMax: job?.salaryMax?.toString() || "",
    requirements: job?.requirements?.join("\n") || "",
  });

  React.useEffect(() => {
    if (job) {
      setForm({
        title: job.title || "",
        description: job.description || "",
        location: job.location || "",
        jobType: job.jobType || "full-time",
        workMode: job.workMode || "remote",
        status: job.status || "draft",
        salaryMin: job.salaryMin?.toString() || "",
        salaryMax: job.salaryMax?.toString() || "",
        requirements: job.requirements?.join("\n") || "",
      });
    } else {
      setForm({ title: "", description: "", location: "", jobType: "full-time", workMode: "remote", status: "draft", salaryMin: "", salaryMax: "", requirements: "" });
    }
  }, [job, open]);

  const isLoading = createJob.isPending || updateJob.isPending;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyId) { toast.error("Please create a company profile first."); return; }
    const payload = {
      title: form.title,
      description: form.description,
      location: form.location,
      jobType: form.jobType,
      workMode: form.workMode,
      status: form.status,
      companyId,
      recruiterId: user?._id,
      salaryMin: form.salaryMin ? Number(form.salaryMin) : undefined,
      salaryMax: form.salaryMax ? Number(form.salaryMax) : undefined,
      requirements: form.requirements.split("\n").filter(Boolean),
    };
    try {
      if (job) {
        await updateJob.mutateAsync({ id: job._id, data: payload });
        toast.success("Job updated!");
      } else {
        await createJob.mutateAsync(payload);
        toast.success("Job posted!");
      }
      onClose();
    } catch { }
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-md" onClick={onClose}>
      <div className="bg-surface rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-xl flex flex-col gap-lg" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center">
          <h2 className="font-headline-sm text-headline-sm text-on-surface">{job ? "Edit Job" : "Post a New Job"}</h2>
          <button onClick={onClose} className="text-on-surface-variant hover:text-on-surface"><span className="material-symbols-outlined">close</span></button>
        </div>
        <form className="flex flex-col gap-md" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
            <div className="flex flex-col gap-xs md:col-span-2">
              <label className="font-label-md text-label-md text-on-surface">Job Title *</label>
              <input required className="w-full border border-outline-variant rounded-lg px-md py-sm font-body-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none" value={form.title} onChange={(e) => setForm(p => ({ ...p, title: e.target.value }))} placeholder="e.g. Senior Frontend Engineer" />
            </div>
            <div className="flex flex-col gap-xs">
              <label className="font-label-md text-label-md text-on-surface">Location *</label>
              <input required className="w-full border border-outline-variant rounded-lg px-md py-sm font-body-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none" value={form.location} onChange={(e) => setForm(p => ({ ...p, location: e.target.value }))} placeholder="e.g. San Francisco, CA" />
            </div>
            <div className="flex flex-col gap-xs">
              <label className="font-label-md text-label-md text-on-surface">Job Type *</label>
              <select required className="w-full border border-outline-variant rounded-lg px-md py-sm font-body-md text-on-surface focus:border-primary outline-none" value={form.jobType} onChange={(e) => setForm(p => ({ ...p, jobType: e.target.value as any }))}>
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
                <option value="contract">Contract</option>
                <option value="freelance">Freelance</option>
                <option value="internship">Internship</option>
              </select>
            </div>
            <div className="flex flex-col gap-xs">
              <label className="font-label-md text-label-md text-on-surface">Work Mode *</label>
              <select required className="w-full border border-outline-variant rounded-lg px-md py-sm font-body-md text-on-surface focus:border-primary outline-none" value={form.workMode} onChange={(e) => setForm(p => ({ ...p, workMode: e.target.value as any }))}>
                <option value="remote">Remote</option>
                <option value="onsite">Onsite</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>
            <div className="flex flex-col gap-xs">
              <label className="font-label-md text-label-md text-on-surface">Status</label>
              <select className="w-full border border-outline-variant rounded-lg px-md py-sm font-body-md text-on-surface focus:border-primary outline-none" value={form.status} onChange={(e) => setForm(p => ({ ...p, status: e.target.value as any }))}>
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="closed">Closed</option>
              </select>
            </div>
            <div className="flex flex-col gap-xs">
              <label className="font-label-md text-label-md text-on-surface">Salary Min</label>
              <input type="number" className="w-full border border-outline-variant rounded-lg px-md py-sm font-body-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none" value={form.salaryMin} onChange={(e) => setForm(p => ({ ...p, salaryMin: e.target.value }))} placeholder="e.g. 80000" />
            </div>
            <div className="flex flex-col gap-xs">
              <label className="font-label-md text-label-md text-on-surface">Salary Max</label>
              <input type="number" className="w-full border border-outline-variant rounded-lg px-md py-sm font-body-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none" value={form.salaryMax} onChange={(e) => setForm(p => ({ ...p, salaryMax: e.target.value }))} placeholder="e.g. 120000" />
            </div>
            <div className="flex flex-col gap-xs md:col-span-2">
              <label className="font-label-md text-label-md text-on-surface">Description *</label>
              <textarea required rows={4} className="w-full border border-outline-variant rounded-lg px-md py-sm font-body-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none resize-y" value={form.description} onChange={(e) => setForm(p => ({ ...p, description: e.target.value }))} placeholder="Describe the role, responsibilities, and your team..." />
            </div>
            <div className="flex flex-col gap-xs md:col-span-2">
              <label className="font-label-md text-label-md text-on-surface">Requirements (one per line)</label>
              <textarea rows={3} className="w-full border border-outline-variant rounded-lg px-md py-sm font-body-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none resize-y" value={form.requirements} onChange={(e) => setForm(p => ({ ...p, requirements: e.target.value }))} placeholder="5+ years of React experience&#10;TypeScript expertise&#10;..." />
            </div>
          </div>
          <div className="flex justify-end gap-md pt-sm">
            <button type="button" onClick={onClose} className="px-lg py-sm rounded-lg border border-outline-variant text-on-surface font-label-md hover:bg-surface-container-high transition-colors">Cancel</button>
            <button type="submit" disabled={isLoading} className="px-lg py-sm rounded-lg bg-primary-container text-on-primary font-label-md hover:bg-primary transition-colors disabled:opacity-50 flex items-center gap-sm">
              {isLoading && <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-on-primary"></span>}
              {job ? "Update Job" : "Post Job"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// --- Delete Confirm Modal ---
function DeleteConfirmModal({ open, onClose, onConfirm, title, isLoading }: {
  open: boolean; onClose: () => void; onConfirm: () => void; title: string; isLoading: boolean;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-md" onClick={onClose}>
      <div className="bg-surface rounded-2xl shadow-xl w-full max-w-md p-xl flex flex-col gap-lg" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-md">
          <div className="w-12 h-12 rounded-full bg-error-container flex items-center justify-center flex-shrink-0">
            <span className="material-symbols-outlined text-error">warning</span>
          </div>
          <div>
            <h2 className="font-title-lg text-title-lg text-on-surface">Delete Job</h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-1">Are you sure you want to delete <strong>"{title}"</strong>? This cannot be undone.</p>
          </div>
        </div>
        <div className="flex justify-end gap-md">
          <button onClick={onClose} className="px-lg py-sm rounded-lg border border-outline-variant text-on-surface font-label-md hover:bg-surface-container-high transition-colors">Cancel</button>
          <button onClick={onConfirm} disabled={isLoading} className="px-lg py-sm rounded-lg bg-error text-on-error font-label-md hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center gap-sm">
            {isLoading && <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-on-error"></span>}
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

const statusBadge = (status: string) => {
  const map: Record<string, string> = {
    published: "bg-tertiary-fixed text-tertiary",
    draft: "bg-surface-variant text-on-surface-variant",
    closed: "bg-error-container text-on-error-container",
  };
  return map[status] || "bg-surface-variant text-on-surface-variant";
};

export default function RecruiterDashboardPage() {
  const { data: statsData, isLoading: statsLoading } = useDashboardStats();
  const { data: jobsData, isLoading: jobsLoading } = useJobs();
  const { data: myCompanyData } = useMyCompany();
  const { data: applicationsData } = useRecruiterApplications();
  const deleteJob = useDeleteJob();

  const [modalOpen, setModalOpen] = React.useState(false);
  const [editingJob, setEditingJob] = React.useState<Job | null>(null);
  const [deleteModal, setDeleteModal] = React.useState<{ open: boolean; job: Job | null }>({ open: false, job: null });

  const stats = statsData?.data;
  const jobs = jobsData?.data || [];
  const myCompany = myCompanyData?.data;
  const companyId = myCompany?._id || "";
  const applications = applicationsData?.data || [];

  const handleDeleteConfirm = async () => {
    if (!deleteModal.job) return;
    try {
      await deleteJob.mutateAsync(deleteModal.job._id);
      toast.success("Job deleted successfully!");
      setDeleteModal({ open: false, job: null });
    } catch { }
  };

  const recentApplications = applications.slice(0, 4);

  const appStatusBadge = (status: string) => {
    const map: Record<string, string> = {
      pending: "bg-surface-container-highest text-on-surface-variant",
      reviewing: "bg-secondary-fixed text-secondary",
      interviewing: "bg-tertiary-fixed text-tertiary",
      hired: "bg-primary-fixed text-primary",
      rejected: "bg-error-container text-on-error-container",
    };
    return map[status] || "bg-surface-container-highest text-on-surface-variant";
  };

  return (
    <div className="flex min-h-screen bg-surface-bright">
      <RecruiterSidebar />
      <JobFormModal open={modalOpen} onClose={() => { setModalOpen(false); setEditingJob(null); }} job={editingJob} companyId={companyId} />
      <DeleteConfirmModal open={deleteModal.open} onClose={() => setDeleteModal({ open: false, job: null })} onConfirm={handleDeleteConfirm} title={deleteModal.job?.title || ""} isLoading={deleteJob.isPending} />

      <main className="md:ml-64 flex-1 flex flex-col min-h-screen bg-surface-bright pt-16 md:pt-0">
        <div className="max-w-container-max mx-auto w-full p-xxl flex flex-col gap-xl">
          {/* Header */}
          <header className="flex justify-between items-center w-full">
            <div>
              <h2 className="font-display-lg-mobile text-display-lg-mobile text-on-surface">Overview</h2>
              <p className="font-body-md text-body-md text-on-surface-variant mt-unit">Track your pipeline and performance.</p>
            </div>
            <button
              onClick={() => { setEditingJob(null); setModalOpen(true); }}
              className="bg-primary-container text-on-primary-container px-lg py-sm rounded-xl font-label-md text-label-md shadow-sm hover:-translate-y-px hover:shadow-md transition-all flex items-center gap-sm"
            >
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>add</span>
              Post a New Job
            </button>
          </header>

          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-lg">
            {[
              { label: "Active Jobs", value: statsLoading ? "—" : (jobs.filter(j => j.status === "published").length), icon: "work_outline", color: "bg-primary-fixed text-primary" },
              { label: "Total Applications", value: statsLoading ? "—" : (stats?.applications ?? applicationsData?.count ?? 0), icon: "description", color: "bg-tertiary-fixed text-tertiary" },
              { label: "Total Jobs", value: statsLoading ? "—" : (stats?.jobs ?? jobs.length), icon: "inventory_2", color: "bg-secondary-fixed text-secondary" },
              { label: "Companies", value: statsLoading ? "—" : (stats?.companies ?? (myCompany ? 1 : 0)), icon: "business", color: "bg-surface-container-highest text-on-surface" },
            ].map(({ label, value, icon, color }) => (
              <div key={label} className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg flex flex-col justify-between hover:-translate-y-xs hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.05)] transition-all">
                <div className="flex justify-between items-start mb-md">
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">{label}</span>
                  <div className={`${color} p-sm rounded-lg`}>
                    <span className="material-symbols-outlined">{icon}</span>
                  </div>
                </div>
                <div className="flex items-baseline gap-sm">
                  <span className="font-headline-md text-headline-md text-on-surface">{value}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Jobs Table + Recent Applications */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-lg">
            {/* Jobs Table */}
            <div className="lg:col-span-2 bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm">
              <div className="flex justify-between items-center p-lg border-b border-outline-variant">
                <h3 className="font-title-lg text-title-lg text-on-surface">My Jobs</h3>
                <Link href="/dashboard/recruiter/jobs" className="font-label-sm text-label-sm text-primary hover:underline">View All</Link>
              </div>
              {jobsLoading ? (
                <div className="flex items-center justify-center p-xxl">
                  <span className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></span>
                </div>
              ) : jobs.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-xxl gap-md text-on-surface-variant">
                  <span className="material-symbols-outlined text-5xl">work_off</span>
                  <p className="font-body-md">No jobs posted yet.</p>
                  <button onClick={() => setModalOpen(true)} className="bg-primary-container text-on-primary px-md py-sm rounded-lg font-label-md text-label-md hover:bg-primary transition-colors">Post Your First Job</button>
                </div>
              ) : (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-surface-container-high border-b border-outline-variant">
                      <th className="p-md font-label-md text-label-md text-on-surface-variant">Title</th>
                      <th className="p-md font-label-md text-label-md text-on-surface-variant">Status</th>
                      <th className="p-md font-label-md text-label-md text-on-surface-variant text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jobs.slice(0, 5).map((job) => (
                      <tr key={job._id} className="border-b border-outline-variant hover:bg-surface-container-low transition-colors">
                        <td className="p-md">
                          <p className="font-title-sm text-on-surface font-semibold">{job.title}</p>
                          <p className="font-body-sm text-on-surface-variant capitalize">{job.location} · {job.workMode}</p>
                        </td>
                        <td className="p-md">
                          <span className={`px-sm py-xs rounded-full font-label-sm capitalize ${statusBadge(job.status)}`}>{job.status}</span>
                        </td>
                        <td className="p-md text-right">
                          <button onClick={() => { setEditingJob(job); setModalOpen(true); }} className="p-sm text-on-surface-variant hover:text-primary transition-colors"><span className="material-symbols-outlined">edit</span></button>
                          <button onClick={() => setDeleteModal({ open: true, job })} className="p-sm text-on-surface-variant hover:text-error transition-colors"><span className="material-symbols-outlined">delete</span></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            {/* Recent Applications */}
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg flex flex-col shadow-sm overflow-hidden">
              <div className="flex justify-between items-center mb-lg">
                <h3 className="font-title-lg text-title-lg text-on-surface">Recent Applications</h3>
                <Link href="/dashboard/recruiter/applications" className="font-label-sm text-label-sm text-primary hover:underline">View All</Link>
              </div>
              {recentApplications.length === 0 ? (
                <div className="flex flex-col items-center justify-center flex-1 gap-md text-on-surface-variant py-xl">
                  <span className="material-symbols-outlined text-4xl">inbox</span>
                  <p className="font-body-sm">No applications yet.</p>
                </div>
              ) : (
                <div className="flex flex-col gap-md overflow-y-auto">
                  {recentApplications.map((app: any) => {
                    const candidate = app.candidateId;
                    const job = app.jobId;
                    const name = candidate ? `${candidate.firstName || ""} ${candidate.lastName || ""}`.trim() : "Unknown";
                    return (
                      <div key={app._id} className="flex items-center justify-between p-sm rounded-lg hover:bg-surface-container-low transition-colors cursor-pointer border border-transparent hover:border-outline-variant">
                        <div className="flex items-center gap-md">
                          <div className="w-10 h-10 rounded-full bg-primary-fixed text-primary flex items-center justify-center font-bold uppercase">
                            {name.charAt(0) || "?"}
                          </div>
                          <div>
                            <p className="font-label-md text-label-md text-on-surface">{name}</p>
                            <p className="font-body-sm text-body-sm text-on-surface-variant">{job?.title || "Unknown Job"}</p>
                          </div>
                        </div>
                        <span className={`px-sm py-xs rounded-full font-label-sm capitalize ${appStatusBadge(app.status)}`}>{app.status}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
