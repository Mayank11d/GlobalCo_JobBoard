"use client";

import * as React from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import toast from "react-hot-toast"

import { RecruiterSidebar } from "@/components/dashboard/RecruiterSidebar"
import { useUpdateApplicationStatus } from "@/hooks/useApplication"
import { useRecruiterApplications } from "@/hooks/useApplication"

const statusOptions = [
  { value: "pending", label: "Pending Review" },
  { value: "reviewing", label: "Reviewing" },
  { value: "interviewing", label: "Interviewing" },
  { value: "hired", label: "Hired" },
  { value: "rejected", label: "Rejected" },
];

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

export default function ApplicantDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const { data: appsData, isLoading } = useRecruiterApplications();
  const updateStatus = useUpdateApplicationStatus();

  const application = appsData?.data?.find((a: any) => a._id === id);
  const candidate = application?.candidateId;
  const job = application?.jobId;
  const name = candidate ? `${candidate.firstName || ""} ${candidate.lastName || ""}`.trim() : "Unknown";

  const handleStatusChange = async (status: string) => {
    try {
      await updateStatus.mutateAsync({ id, status });
      toast.success(`Status updated to ${status}`);
    } catch { }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen">
        <RecruiterSidebar />
        <main className="flex-1 md:ml-64 flex items-center justify-center">
          <span className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></span>
        </main>
      </div>
    );
  }

  if (!application) {
    return (
      <div className="flex min-h-screen">
        <RecruiterSidebar />
        <main className="flex-1 md:ml-64 flex flex-col items-center justify-center gap-md text-on-surface-variant">
          <span className="material-symbols-outlined text-5xl">search_off</span>
          <p className="font-body-md">Application not found.</p>
          <button onClick={() => router.back()} className="text-primary font-label-md hover:underline flex items-center gap-1">
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            Go Back
          </button>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      <RecruiterSidebar />

      <main className="flex-1 md:ml-64 pt-[96px] md:pt-lg px-md md:px-gutter pb-xxl max-w-container-max mx-auto w-full">
        {/* Back */}
        <div className="flex items-center gap-sm mb-lg text-on-surface-variant font-label-md text-label-md">
          <button onClick={() => router.back()} className="hover:text-primary transition-colors flex items-center gap-1">
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            Back to Applications
          </button>
        </div>

        {/* Header Panel */}
        <div className="bg-white/70 backdrop-blur-md border border-outline-variant/80 rounded-xl p-lg mb-lg flex flex-col md:flex-row md:items-center justify-between gap-lg">
          <div className="flex items-center gap-lg">
            <div className="w-20 h-20 rounded-full bg-primary-fixed text-primary flex items-center justify-center font-bold text-3xl uppercase border-2 border-surface shadow-sm">
              {name.charAt(0) || "?"}
            </div>
            <div>
              <h1 className="font-headline-md text-headline-md text-on-surface mb-1">{name}</h1>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-body-sm text-body-sm text-on-surface-variant">
                {job && <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">work</span> Applied for: {job.title}</span>}
                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">schedule</span> Applied {new Date(application.createdAt).toLocaleDateString()}</span>
                {candidate?.email && <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">mail</span> {candidate.email}</span>}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-md">
            <select
              value={application.status}
              onChange={(e) => handleStatusChange(e.target.value)}
              disabled={updateStatus.isPending}
              className={`appearance-none rounded-lg px-md py-2 pr-8 font-label-md text-label-md capitalize focus:outline-none focus:ring-1 focus:ring-primary shadow-sm cursor-pointer border border-outline-variant bg-surface text-on-surface`}
            >
              {statusOptions.map(({ value, label }) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
            {candidate?.email && (
              <a
                href={`mailto:${candidate.email}`}
                className="bg-primary-container text-white px-lg py-2 rounded-lg font-label-md text-label-md hover:bg-primary transition-colors flex items-center gap-2 shadow-sm"
              >
                <span className="material-symbols-outlined text-[18px]">mail</span>
                Email
              </a>
            )}
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-lg">
          {/* Left: Resume / Cover Letter */}
          <div className="lg:col-span-8 flex flex-col gap-lg">
            {application.resumeUrl ? (
              <div className="bg-white border border-outline-variant rounded-xl p-0 overflow-hidden shadow-sm">
                <div className="bg-surface border-b border-outline-variant p-sm px-md flex items-center justify-between">
                  <span className="font-label-md text-label-md text-on-surface flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">description</span>
                    Resume
                  </span>
                  <a href={application.resumeUrl} target="_blank" rel="noopener noreferrer" className="p-1 text-on-surface-variant hover:text-primary transition-colors rounded hover:bg-surface-container-high" title="Open Resume">
                    <span className="material-symbols-outlined text-[20px]">open_in_new</span>
                  </a>
                </div>
                <div className="p-lg bg-surface-container-low flex flex-col items-center justify-center min-h-[200px] gap-md">
                  <span className="material-symbols-outlined text-5xl text-outline">picture_as_pdf</span>
                  <p className="font-body-md text-on-surface-variant">Resume uploaded by candidate.</p>
                  <a href={application.resumeUrl} target="_blank" rel="noopener noreferrer" className="bg-primary-container text-on-primary px-md py-sm rounded-lg font-label-md hover:bg-primary transition-colors">View Resume</a>
                </div>
              </div>
            ) : (
              <div className="bg-white border border-outline-variant rounded-xl p-lg flex items-center justify-center min-h-[200px] text-on-surface-variant">
                <div className="flex flex-col items-center gap-md">
                  <span className="material-symbols-outlined text-4xl">description_off</span>
                  <p className="font-body-md">No resume provided.</p>
                </div>
              </div>
            )}

            {application.coverLetter && (
              <div className="bg-white border border-outline-variant rounded-xl p-lg shadow-sm">
                <h3 className="font-title-lg text-title-lg text-on-surface mb-md flex items-center gap-2">
                  <span className="material-symbols-outlined">edit_note</span>
                  Cover Letter
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed whitespace-pre-line">{application.coverLetter}</p>
              </div>
            )}
          </div>

          {/* Right: Candidate Info */}
          <div className="lg:col-span-4 flex flex-col gap-lg">
            {/* Status Card */}
            <div className="bg-white border border-outline-variant rounded-xl p-lg shadow-sm">
              <h3 className="font-title-lg text-title-lg text-on-surface mb-md">Application Status</h3>
              <div className={`inline-flex px-md py-sm rounded-full font-label-md capitalize ${statusBadge(application.status)}`}>
                {application.status}
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-md">
                Applied on {new Date(application.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
              </p>
            </div>

            {/* Skills */}
            {candidate?.skills && candidate.skills.length > 0 && (
              <div className="bg-white border border-outline-variant rounded-xl p-lg shadow-sm">
                <h3 className="font-title-lg text-title-lg text-on-surface mb-md">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {candidate.skills.map((skill: string) => (
                    <span key={skill} className="bg-surface-container-highest text-on-surface px-3 py-1 rounded-full font-label-sm text-label-sm">{skill}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Candidate Headline */}
            {candidate?.headline && (
              <div className="bg-white border border-outline-variant rounded-xl p-lg shadow-sm">
                <h3 className="font-title-lg text-title-lg text-on-surface mb-md">Headline</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">{candidate.headline}</p>
              </div>
            )}

            {/* Contact Info */}
            <div className="bg-white border border-outline-variant rounded-xl p-lg shadow-sm">
              <h3 className="font-title-lg text-title-lg text-on-surface mb-md">Contact Info</h3>
              <div className="space-y-3 font-body-sm text-body-sm text-on-surface-variant">
                {candidate?.email && (
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-outline">mail</span>
                    <a className="hover:text-primary hover:underline" href={`mailto:${candidate.email}`}>{candidate.email}</a>
                  </div>
                )}
                {job && (
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-outline">work</span>
                    <span>{job.title} · <span className="capitalize">{job.workMode}</span></span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
