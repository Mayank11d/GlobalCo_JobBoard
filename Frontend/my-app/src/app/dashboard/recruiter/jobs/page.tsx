"use client";

import * as React from "react"
import toast from "react-hot-toast"

import { RecruiterSidebar } from "@/components/dashboard/RecruiterSidebar"
import { useJobs, useCreateJob, useUpdateJob, useDeleteJob } from "@/hooks/useJob"
import { useMyCompany } from "@/hooks/useCompany"
import { useAuth } from "@/hooks/useAuth"
import { Job } from "@/types/job.types"

const statusBadge = (status: string) => {
  const map: Record<string, string> = {
    published: "bg-tertiary-fixed text-tertiary",
    draft: "bg-surface-variant text-on-surface-variant",
    closed: "bg-error-container text-on-error-container",
  };
  return map[status] || "bg-surface-variant text-on-surface-variant";
};

function JobFormModal({ open, onClose, job, companyId }: {
  open: boolean; onClose: () => void; job?: Job | null; companyId: string;
}) {
  const createJob = useCreateJob();
  const updateJob = useUpdateJob();
  const { user } = useAuth();
  const [form, setForm] = React.useState({ title: "", description: "", location: "", jobType: "full-time", workMode: "remote", status: "draft", salaryMin: "", salaryMax: "", requirements: "" });

  React.useEffect(() => {
    if (job) {
      setForm({ title: job.title || "", description: job.description || "", location: job.location || "", jobType: job.jobType || "full-time", workMode: job.workMode || "remote", status: job.status || "draft", salaryMin: job.salaryMin?.toString() || "", salaryMax: job.salaryMax?.toString() || "", requirements: job.requirements?.join("\n") || "" });
    } else {
      setForm({ title: "", description: "", location: "", jobType: "full-time", workMode: "remote", status: "draft", salaryMin: "", salaryMax: "", requirements: "" });
    }
  }, [job, open]);

  const isLoading = createJob.isPending || updateJob.isPending;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyId) { toast.error("Please create a company profile first."); return; }
    const payload = { title: form.title, description: form.description, location: form.location, jobType: form.jobType, workMode: form.workMode, status: form.status, companyId, recruiterId: user?._id, salaryMin: form.salaryMin ? Number(form.salaryMin) : undefined, salaryMax: form.salaryMax ? Number(form.salaryMax) : undefined, requirements: form.requirements.split("\n").filter(Boolean) };
    try {
      if (job) { await updateJob.mutateAsync({ id: job._id, data: payload }); toast.success("Job updated!"); }
      else { await createJob.mutateAsync(payload); toast.success("Job posted!"); }
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
                {["full-time", "part-time", "contract", "freelance", "internship"].map(t => <option key={t} value={t} className="capitalize">{t}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-xs">
              <label className="font-label-md text-label-md text-on-surface">Work Mode *</label>
              <select required className="w-full border border-outline-variant rounded-lg px-md py-sm font-body-md text-on-surface focus:border-primary outline-none" value={form.workMode} onChange={(e) => setForm(p => ({ ...p, workMode: e.target.value as any }))}>
                {["remote", "onsite", "hybrid"].map(t => <option key={t} value={t} className="capitalize">{t}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-xs">
              <label className="font-label-md text-label-md text-on-surface">Status</label>
              <select className="w-full border border-outline-variant rounded-lg px-md py-sm font-body-md text-on-surface focus:border-primary outline-none" value={form.status} onChange={(e) => setForm(p => ({ ...p, status: e.target.value as any }))}>
                {["draft", "published", "closed"].map(t => <option key={t} value={t} className="capitalize">{t}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-xs">
              <label className="font-label-md text-label-md text-on-surface">Salary Min ($)</label>
              <input type="number" className="w-full border border-outline-variant rounded-lg px-md py-sm font-body-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none" value={form.salaryMin} onChange={(e) => setForm(p => ({ ...p, salaryMin: e.target.value }))} placeholder="80000" />
            </div>
            <div className="flex flex-col gap-xs">
              <label className="font-label-md text-label-md text-on-surface">Salary Max ($)</label>
              <input type="number" className="w-full border border-outline-variant rounded-lg px-md py-sm font-body-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none" value={form.salaryMax} onChange={(e) => setForm(p => ({ ...p, salaryMax: e.target.value }))} placeholder="120000" />
            </div>
            <div className="flex flex-col gap-xs md:col-span-2">
              <label className="font-label-md text-label-md text-on-surface">Description *</label>
              <textarea required rows={4} className="w-full border border-outline-variant rounded-lg px-md py-sm font-body-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none resize-y" value={form.description} onChange={(e) => setForm(p => ({ ...p, description: e.target.value }))} placeholder="Describe the role and responsibilities..." />
            </div>
            <div className="flex flex-col gap-xs md:col-span-2">
              <label className="font-label-md text-label-md text-on-surface">Requirements (one per line)</label>
              <textarea rows={3} className="w-full border border-outline-variant rounded-lg px-md py-sm font-body-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none resize-y" value={form.requirements} onChange={(e) => setForm(p => ({ ...p, requirements: e.target.value }))} placeholder="5+ years React&#10;TypeScript expertise" />
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

function DeleteModal({ open, onClose, onConfirm, title, isLoading }: { open: boolean; onClose: () => void; onConfirm: () => void; title: string; isLoading: boolean }) {
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
            <p className="font-body-md text-body-md text-on-surface-variant mt-1">Delete <strong>"{title}"</strong>? This cannot be undone.</p>
          </div>
        </div>
        <div className="flex justify-end gap-md">
          <button onClick={onClose} className="px-lg py-sm rounded-lg border border-outline-variant text-on-surface font-label-md hover:bg-surface-container-high transition-colors">Cancel</button>
          <button onClick={onConfirm} disabled={isLoading} className="px-lg py-sm rounded-lg bg-error text-on-error font-label-md disabled:opacity-50 flex items-center gap-sm">
            {isLoading && <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-on-error"></span>}
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default function RecruiterJobsPage() {
  const { data: jobsData, isLoading } = useJobs();
  const { data: myCompanyData } = useMyCompany();
  const deleteJob = useDeleteJob();

  const [search, setSearch] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [modalOpen, setModalOpen] = React.useState(false);
  const [editingJob, setEditingJob] = React.useState<Job | null>(null);
  const [deleteModal, setDeleteModal] = React.useState<{ open: boolean; job: Job | null }>({ open: false, job: null });

  const myCompany = myCompanyData?.data;
  const companyId = myCompany?._id || "";
  const allJobs = jobsData?.data || [];

  const filteredJobs = allJobs.filter(job => {
    const matchSearch = !search || job.title.toLowerCase().includes(search.toLowerCase()) || job.location.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || job.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleDeleteConfirm = async () => {
    if (!deleteModal.job) return;
    try {
      await deleteJob.mutateAsync(deleteModal.job._id);
      toast.success("Job deleted!");
      setDeleteModal({ open: false, job: null });
    } catch { }
  };

  return (
    <div className="flex min-h-screen bg-surface-bright">
      <RecruiterSidebar />
      <JobFormModal open={modalOpen} onClose={() => { setModalOpen(false); setEditingJob(null); }} job={editingJob} companyId={companyId} />
      <DeleteModal open={deleteModal.open} onClose={() => setDeleteModal({ open: false, job: null })} onConfirm={handleDeleteConfirm} title={deleteModal.job?.title || ""} isLoading={deleteJob.isPending} />

      <main className="md:ml-64 flex-1 flex flex-col min-h-screen pt-16 md:pt-0">
        <div className="max-w-container-max mx-auto w-full p-xxl flex flex-col gap-xl">
          <header className="flex flex-wrap justify-between items-center gap-md w-full">
            <div>
              <h2 className="font-display-lg-mobile text-display-lg-mobile text-on-surface">My Jobs</h2>
              <p className="font-body-md text-body-md text-on-surface-variant mt-unit">Manage and track your active job postings.</p>
            </div>
            <button
              onClick={() => { setEditingJob(null); setModalOpen(true); }}
              className="bg-primary-container text-on-primary-container px-lg py-sm rounded-xl font-label-md text-label-md shadow-sm hover:-translate-y-px hover:shadow-md transition-all flex items-center gap-sm"
            >
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>add</span>
              Post a New Job
            </button>
          </header>

          {/* Filters */}
          <div className="flex flex-wrap gap-md items-center">
            <div className="relative flex-1 min-w-[200px]">
              <span className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-outline text-[20px]">search</span>
              <input
                className="pl-xl pr-md py-sm w-full rounded-lg border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary bg-surface outline-none font-body-md"
                placeholder="Search jobs..."
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
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="closed">Closed</option>
            </select>
          </div>

          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm">
            {isLoading ? (
              <div className="flex items-center justify-center p-xxl">
                <span className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></span>
              </div>
            ) : filteredJobs.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-xxl gap-md text-on-surface-variant">
                <span className="material-symbols-outlined text-5xl">work_off</span>
                <p className="font-body-md">{search || statusFilter !== "all" ? "No jobs match your filters." : "No jobs posted yet."}</p>
                {!search && statusFilter === "all" && (
                  <button onClick={() => setModalOpen(true)} className="bg-primary-container text-on-primary px-md py-sm rounded-lg font-label-md hover:bg-primary transition-colors">Post Your First Job</button>
                )}
              </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-high border-b border-outline-variant">
                    <th className="p-md font-label-md text-label-md text-on-surface-variant">Job Title</th>
                    <th className="p-md font-label-md text-label-md text-on-surface-variant">Status</th>
                    <th className="p-md font-label-md text-label-md text-on-surface-variant hidden md:table-cell">Type</th>
                    <th className="p-md font-label-md text-label-md text-on-surface-variant hidden lg:table-cell">Posted</th>
                    <th className="p-md font-label-md text-label-md text-on-surface-variant text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredJobs.map((job) => (
                    <tr key={job._id} className="border-b border-outline-variant hover:bg-surface-container-low transition-colors">
                      <td className="p-md">
                        <p className="font-title-sm text-on-surface font-semibold">{job.title}</p>
                        <p className="font-body-sm text-on-surface-variant capitalize">{job.location} · {job.workMode}</p>
                      </td>
                      <td className="p-md">
                        <span className={`px-sm py-xs rounded-full font-label-sm capitalize ${statusBadge(job.status)}`}>{job.status}</span>
                      </td>
                      <td className="p-md hidden md:table-cell">
                        <span className="font-body-sm text-on-surface-variant capitalize">{job.jobType}</span>
                      </td>
                      <td className="p-md hidden lg:table-cell">
                        <span className="font-body-sm text-on-surface-variant">{new Date(job.createdAt).toLocaleDateString()}</span>
                      </td>
                      <td className="p-md text-right">
                        <button onClick={() => { setEditingJob(job); setModalOpen(true); }} className="p-sm text-on-surface-variant hover:text-primary transition-colors" title="Edit">
                          <span className="material-symbols-outlined">edit</span>
                        </button>
                        <button onClick={() => setDeleteModal({ open: true, job })} className="p-sm text-on-surface-variant hover:text-error transition-colors" title="Delete">
                          <span className="material-symbols-outlined">delete</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
