"use client";

import * as React from "react"
import Link from "next/link"
import { useJob } from "@/hooks/useJob"
import { useAuth } from "@/hooks/useAuth"
import { useSaveJob } from "@/hooks/useSavedJob"
import { useCreateApplication } from "@/hooks/useApplication"
import toast from "react-hot-toast"

export default function JobDetailsPage({ params }: { params: { id: string } }) {
  const { data: jobResponse, isLoading, error } = useJob(params.id);
  const { user } = useAuth();
  const saveJob = useSaveJob();
  const createApplication = useCreateApplication();

  const [applyModal, setApplyModal] = React.useState(false);
  const [resumeUrl, setResumeUrl] = React.useState(user?.resumeUrl || "");
  const [coverLetter, setCoverLetter] = React.useState("");

  const handleSave = async () => {
    if (!user) { toast.error("Please login to save jobs."); return; }
    try {
      await saveJob.mutateAsync({ jobId: params.id });
      toast.success("Job saved!");
    } catch { }
  };

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) { toast.error("Please login to apply."); return; }
    if (!resumeUrl) { toast.error("Resume URL is required."); return; }
    try {
      await createApplication.mutateAsync({ jobId: params.id, resumeUrl, coverLetter });
      toast.success("Application submitted successfully!");
      setApplyModal(false);
    } catch { }
  };

  if (isLoading) {
    return (
      <main className="flex-grow max-w-container-max mx-auto w-full px-md md:px-lg py-xxl pt-[96px] flex items-center justify-center">
        <span className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></span>
      </main>
    );
  }

  if (error || !jobResponse?.data) {
    return (
      <main className="flex-grow max-w-container-max mx-auto w-full px-md md:px-lg py-xxl pt-[96px]">
        <p className="text-error font-body-md">Job not found.</p>
        <Link href="/jobs" className="text-primary hover:underline mt-sm inline-block">Back to jobs</Link>
      </main>
    );
  }

  const job = jobResponse.data;
  const company = typeof job.companyId === "object" ? job.companyId : null;

  return (
    <>
      {/* Apply Modal */}
      {applyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-md" onClick={() => setApplyModal(false)}>
          <div className="bg-surface rounded-2xl shadow-xl w-full max-w-md p-xl flex flex-col gap-lg" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center">
              <h2 className="font-headline-sm text-headline-sm text-on-surface">Apply for {job.title}</h2>
              <button onClick={() => setApplyModal(false)} className="text-on-surface-variant hover:text-on-surface"><span className="material-symbols-outlined">close</span></button>
            </div>
            <form className="flex flex-col gap-md" onSubmit={handleApply}>
              <div className="flex flex-col gap-xs">
                <label className="font-label-md text-label-md text-on-surface" htmlFor="resumeUrl">Resume URL *</label>
                <input
                  id="resumeUrl"
                  type="url"
                  required
                  className="w-full border border-outline-variant rounded-lg px-md py-sm font-body-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                  placeholder="https://drive.google.com/your-resume.pdf"
                  value={resumeUrl}
                  onChange={(e) => setResumeUrl(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-xs">
                <label className="font-label-md text-label-md text-on-surface" htmlFor="coverLetter">Cover Letter (optional)</label>
                <textarea
                  id="coverLetter"
                  rows={4}
                  className="w-full border border-outline-variant rounded-lg px-md py-sm font-body-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none resize-y"
                  placeholder="Tell the recruiter why you're a great fit..."
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                />
              </div>
              <div className="flex justify-end gap-md">
                <button type="button" onClick={() => setApplyModal(false)} className="px-lg py-sm rounded-lg border border-outline-variant text-on-surface font-label-md hover:bg-surface-container-high transition-colors">Cancel</button>
                <button type="submit" disabled={createApplication.isPending} className="px-lg py-sm rounded-lg bg-primary-container text-on-primary font-label-md hover:bg-primary transition-colors disabled:opacity-50 flex items-center gap-sm">
                  {createApplication.isPending && <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-on-primary"></span>}
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <main className="flex-grow max-w-container-max mx-auto w-full px-md md:px-lg py-xxl gap-xxl flex flex-col md:flex-row pt-[96px]">
        {/* Left Column */}
        <article className="flex-1 flex flex-col gap-xl">
          <header className="flex flex-col gap-md">
            <div className="flex items-start justify-between gap-md">
              <div>
                <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface mb-sm">{job.title}</h1>
                <div className="flex flex-wrap items-center gap-x-sm gap-y-xs font-body-md text-body-md text-on-surface-variant">
                  <span className="font-medium text-primary">{company?.name || "Company"}</span>
                  <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
                  <span className="flex items-center gap-xs"><span className="material-symbols-outlined text-[16px]">location_on</span> {job.location || "Remote"}</span>
                  <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
                  <span className="flex items-center gap-xs capitalize"><span className="material-symbols-outlined text-[16px]">schedule</span> {job.jobType}</span>
                  <span className="w-1 h-1 rounded-full bg-outline-variant"></span>
                  <span className="flex items-center gap-xs capitalize"><span className="material-symbols-outlined text-[16px]">home_work</span> {job.workMode}</span>
                </div>
              </div>
              <div className="hidden md:flex gap-sm shrink-0">
                <button
                  onClick={handleSave}
                  disabled={saveJob.isPending}
                  className="flex items-center justify-center gap-xs px-4 py-2 rounded-lg bg-surface-container-low text-on-surface border border-outline-variant hover:bg-surface-variant transition-colors shadow-sm disabled:opacity-50"
                >
                  <span className="material-symbols-outlined">bookmark_border</span> Save
                </button>
                <button
                  onClick={() => user ? setApplyModal(true) : toast.error("Please login to apply.")}
                  className="px-6 py-2 rounded-lg bg-primary text-on-primary font-medium hover:bg-primary-container transition-colors shadow-sm"
                >
                  Apply Now
                </button>
              </div>
            </div>
          </header>

          <hr className="border-t border-outline-variant"/>

          {/* Mobile Actions */}
          <div className="flex md:hidden gap-sm sticky top-[64px] bg-surface py-sm z-10 border-b border-outline-variant">
            <button
              onClick={() => user ? setApplyModal(true) : toast.error("Please login to apply.")}
              className="flex-1 px-4 py-2 rounded-lg bg-primary text-on-primary font-medium hover:bg-primary-container transition-colors shadow-sm text-center"
            >
              Apply Now
            </button>
            <button
              onClick={handleSave}
              disabled={saveJob.isPending}
              className="flex items-center justify-center gap-xs px-4 py-2 rounded-lg bg-surface-container-low text-on-surface border border-outline-variant hover:bg-surface-variant transition-colors shadow-sm"
            >
              <span className="material-symbols-outlined text-[20px]">bookmark_border</span>
            </button>
          </div>

          <section className="flex flex-col gap-lg font-body-md text-body-md text-on-surface-variant leading-relaxed">
            <div>
              <h2 className="font-title-lg text-title-lg text-on-surface mb-sm">About the Role</h2>
              <p className="whitespace-pre-wrap">{job.description}</p>
            </div>
            {job.requirements && job.requirements.length > 0 && (
              <div>
                <h2 className="font-title-lg text-title-lg text-on-surface mb-sm">Requirements</h2>
                <ul className="list-disc pl-md space-y-xs">
                  {job.requirements.map((req, idx) => (
                    <li key={idx}>{req}</li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        </article>

        {/* Right Column */}
        <aside className="w-full md:w-80 shrink-0 flex flex-col gap-lg">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-lg shadow-sm">
            <h3 className="font-title-lg text-title-lg text-on-surface mb-md">Job Overview</h3>
            <div className="flex flex-col gap-md">
              {(job.salaryMin || job.salaryMax) && (
                <div className="flex items-start gap-sm">
                  <span className="material-symbols-outlined text-primary mt-xs">payments</span>
                  <div>
                    <div className="font-label-md text-label-md text-on-surface-variant">Salary Range</div>
                    <div className="font-body-md text-body-md text-on-surface">
                      {job.salaryMin && job.salaryMax ? `$${(job.salaryMin/1000).toFixed(0)}k – $${(job.salaryMax/1000).toFixed(0)}k` : job.salaryMin ? `From $${(job.salaryMin/1000).toFixed(0)}k` : `Up to $${(job.salaryMax!/1000).toFixed(0)}k`}
                    </div>
                  </div>
                </div>
              )}
              <div className="flex items-start gap-sm">
                <span className="material-symbols-outlined text-primary mt-xs">calendar_today</span>
                <div>
                  <div className="font-label-md text-label-md text-on-surface-variant">Date Posted</div>
                  <div className="font-body-md text-body-md text-on-surface">{new Date(job.createdAt).toLocaleDateString()}</div>
                </div>
              </div>
              <div className="flex items-start gap-sm">
                <span className="material-symbols-outlined text-primary mt-xs">work</span>
                <div>
                  <div className="font-label-md text-label-md text-on-surface-variant">Job Type</div>
                  <div className="font-body-md text-body-md text-on-surface capitalize">{job.jobType}</div>
                </div>
              </div>
              <div className="flex items-start gap-sm">
                <span className="material-symbols-outlined text-primary mt-xs">home_work</span>
                <div>
                  <div className="font-label-md text-label-md text-on-surface-variant">Work Mode</div>
                  <div className="font-body-md text-body-md text-on-surface capitalize">{job.workMode}</div>
                </div>
              </div>
            </div>
          </div>

          {company && (
            <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-lg shadow-sm">
              <div className="flex items-center gap-sm mb-md">
                <div className="w-12 h-12 bg-surface-container-low rounded-lg border border-outline-variant flex items-center justify-center overflow-hidden font-bold text-xl text-on-surface-variant">
                  {company.name ? company.name.charAt(0) : "C"}
                </div>
                <div>
                  <h3 className="font-title-lg text-title-lg text-on-surface">{company.name}</h3>
                  {company.location && <p className="font-body-sm text-body-sm text-on-surface-variant">{company.location}</p>}
                </div>
              </div>
              {company.description && (
                <p className="font-body-sm text-body-sm text-on-surface-variant mb-md">
                  {company.description.substring(0, 150)}{company.description.length > 150 ? "..." : ""}
                </p>
              )}
              {company.website && (
                <a className="block text-center w-full py-2 border border-outline-variant rounded-lg font-label-md text-label-md text-on-surface hover:bg-surface-variant transition-colors" href={company.website} target="_blank" rel="noreferrer">
                  Visit Website
                </a>
              )}
            </div>
          )}

          <button
            onClick={() => user ? setApplyModal(true) : toast.error("Please login to apply.")}
            className="w-full px-6 py-3 rounded-xl bg-primary text-on-primary font-label-md text-label-md hover:bg-primary-container transition-colors shadow-sm"
          >
            Apply for this Position
          </button>
        </aside>
      </main>
    </>
  )
}
