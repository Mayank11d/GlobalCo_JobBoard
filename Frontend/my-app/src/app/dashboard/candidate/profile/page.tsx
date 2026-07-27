"use client";

import * as React from "react"
import toast from "react-hot-toast"

import { CandidateSidebar } from "@/components/dashboard/CandidateSidebar"
import { useAuth } from "@/hooks/useAuth"

export default function CandidateProfilePage() {
  const { user, updateProfile, isUpdatingProfile } = useAuth();
  const [form, setForm] = React.useState({
    firstName: "",
    lastName: "",
    headline: "",
    bio: "",
    skills: "",
    avatarUrl: "",
  });
  const [initialized, setInitialized] = React.useState(false);

  React.useEffect(() => {
    if (user && !initialized) {
      setForm({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        headline: user.headline || "",
        bio: user.bio || "",
        skills: user.skills?.join(", ") || "",
        avatarUrl: user.avatarUrl || "",
      });
      setInitialized(true);
    }
  }, [user, initialized]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.firstName.trim()) { toast.error("First name is required"); return; }
    try {
      await updateProfile({
        firstName: form.firstName,
        lastName: form.lastName,
        headline: form.headline,
        bio: form.bio,
        avatarUrl: form.avatarUrl,
        skills: form.skills.split(",").map(s => s.trim()).filter(Boolean),
      });
    } catch { }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="flex min-h-screen bg-surface">
      <CandidateSidebar />

      <main className="flex-1 md:ml-64 p-md md:p-xl lg:p-xxl max-w-container-max mx-auto w-full mb-16 md:mb-0">
        <header className="mb-xl flex justify-between items-center">
          <div>
            <h2 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface">My Profile</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant mt-2">Manage your resume and professional details.</p>
          </div>
          <button
            form="profile-form"
            type="submit"
            disabled={isUpdatingProfile}
            className="bg-primary-container text-on-primary-container px-lg py-sm rounded-xl font-label-md text-label-md shadow-sm flex items-center gap-sm disabled:opacity-50 hover:-translate-y-px hover:shadow-md transition-all"
          >
            {isUpdatingProfile ? (
              <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-on-primary-container"></span>
            ) : (
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>save</span>
            )}
            Save Profile
          </button>
        </header>

        <form id="profile-form" onSubmit={handleSubmit}>
          <section className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg flex flex-col gap-lg shadow-sm">
            {/* Avatar */}
            <div className="flex items-center gap-lg border-b border-outline-variant pb-lg">
              <div className="w-24 h-24 rounded-full bg-surface-container-high border border-outline-variant overflow-hidden flex-shrink-0">
                {form.avatarUrl ? (
                  <img alt="Avatar" className="w-full h-full object-cover" src={form.avatarUrl} />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-on-surface-variant uppercase">
                    {form.firstName?.[0] || user?.email?.[0] || "?"}
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-xs flex-1">
                <h3 className="font-title-lg text-title-lg text-on-surface">Profile Photo</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">Paste an avatar URL below.</p>
                <input
                  name="avatarUrl"
                  className="w-full border border-outline-variant rounded-lg px-md py-sm font-body-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none mt-xs"
                  placeholder="https://example.com/avatar.png"
                  value={form.avatarUrl}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
              <div className="flex flex-col gap-xs">
                <label className="font-label-md text-label-md text-on-surface" htmlFor="firstName">First Name *</label>
                <input
                  id="firstName"
                  name="firstName"
                  required
                  className="w-full border border-outline-variant rounded-lg px-md py-sm font-body-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                  value={form.firstName}
                  onChange={handleChange}
                  placeholder="John"
                />
              </div>
              <div className="flex flex-col gap-xs">
                <label className="font-label-md text-label-md text-on-surface" htmlFor="lastName">Last Name</label>
                <input
                  id="lastName"
                  name="lastName"
                  className="w-full border border-outline-variant rounded-lg px-md py-sm font-body-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                  value={form.lastName}
                  onChange={handleChange}
                  placeholder="Doe"
                />
              </div>
              <div className="flex flex-col gap-xs md:col-span-2">
                <label className="font-label-md text-label-md text-on-surface" htmlFor="headline">Headline</label>
                <input
                  id="headline"
                  name="headline"
                  className="w-full border border-outline-variant rounded-lg px-md py-sm font-body-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                  value={form.headline}
                  onChange={handleChange}
                  placeholder="e.g. Senior Frontend Developer"
                />
              </div>
              <div className="flex flex-col gap-xs md:col-span-2">
                <label className="font-label-md text-label-md text-on-surface" htmlFor="bio">Professional Summary</label>
                <textarea
                  id="bio"
                  name="bio"
                  rows={4}
                  className="w-full border border-outline-variant rounded-lg px-md py-sm font-body-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none resize-y"
                  value={form.bio}
                  onChange={handleChange}
                  placeholder="Describe your background, expertise, and what you're looking for..."
                />
              </div>
              <div className="flex flex-col gap-xs md:col-span-2">
                <label className="font-label-md text-label-md text-on-surface" htmlFor="skills">Skills (comma separated)</label>
                <input
                  id="skills"
                  name="skills"
                  className="w-full border border-outline-variant rounded-lg px-md py-sm font-body-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                  value={form.skills}
                  onChange={handleChange}
                  placeholder="React, TypeScript, Node.js, Python..."
                />
              </div>
            </div>

            {/* Email (read-only) */}
            <div className="border-t border-outline-variant pt-lg">
              <div className="flex flex-col gap-xs">
                <label className="font-label-md text-label-md text-on-surface">Email Address</label>
                <input
                  readOnly
                  className="w-full border border-outline-variant rounded-lg px-md py-sm font-body-md text-on-surface-variant bg-surface-container-low outline-none cursor-not-allowed"
                  value={user?.email || ""}
                />
                <p className="font-body-sm text-body-sm text-on-surface-variant">Email cannot be changed.</p>
              </div>
            </div>
          </section>
        </form>
      </main>
    </div>
  )
}
