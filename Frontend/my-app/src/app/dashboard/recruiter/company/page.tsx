"use client";

import * as React from "react"
import toast from "react-hot-toast"

import { RecruiterSidebar } from "@/components/dashboard/RecruiterSidebar"
import { useMyCompany, useCreateCompany, useUpdateCompany } from "@/hooks/useCompany"

export default function RecruiterCompanyPage() {
  const { data: companyData, isLoading } = useMyCompany();
  const createCompany = useCreateCompany();
  const updateCompany = useUpdateCompany();

  const company = companyData?.data;

  const [form, setForm] = React.useState({
    name: "",
    website: "",
    description: "",
    location: "",
    logoUrl: "",
  });
  const [hasInitialized, setHasInitialized] = React.useState(false);

  React.useEffect(() => {
    if (company && !hasInitialized) {
      setForm({
        name: company.name || "",
        website: company.website || "",
        description: company.description || "",
        location: company.location || "",
        logoUrl: company.logoUrl || "",
      });
      setHasInitialized(true);
    }
  }, [company, hasInitialized]);

  const isSaving = createCompany.isPending || updateCompany.isPending;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) { toast.error("Company name is required"); return; }
    if (!form.description.trim()) { toast.error("Description is required"); return; }
    try {
      if (company) {
        await updateCompany.mutateAsync({ id: company._id, data: form });
        toast.success("Company profile saved!");
      } else {
        await createCompany.mutateAsync(form);
        toast.success("Company created!");
      }
    } catch { }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="flex min-h-screen bg-surface-bright">
      <RecruiterSidebar />

      <main className="md:ml-64 flex-1 flex flex-col min-h-screen pt-16 md:pt-0">
        <form onSubmit={handleSubmit}>
          <div className="max-w-container-max mx-auto w-full p-xxl flex flex-col gap-xl">
            <header className="flex justify-between items-center w-full">
              <div>
                <h2 className="font-display-lg-mobile text-display-lg-mobile text-on-surface">Company Profile</h2>
                <p className="font-body-md text-body-md text-on-surface-variant mt-unit">
                  {company ? "Manage your employer brand and details." : "Set up your company profile to start posting jobs."}
                </p>
              </div>
              <button
                type="submit"
                disabled={isSaving || isLoading}
                className="bg-primary-container text-on-primary-container px-lg py-sm rounded-xl font-label-md text-label-md shadow-sm hover:-translate-y-px hover:shadow-md transition-all flex items-center gap-sm disabled:opacity-50"
              >
                {isSaving ? (
                  <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-on-primary-container"></span>
                ) : (
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>save</span>
                )}
                {company ? "Save Changes" : "Create Company"}
              </button>
            </header>

            {isLoading ? (
              <div className="flex items-center justify-center p-xxl">
                <span className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></span>
              </div>
            ) : (
              <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg flex flex-col gap-lg shadow-sm">
                {/* Logo Section */}
                <div className="flex items-center gap-lg border-b border-outline-variant pb-lg">
                  <div className="w-24 h-24 rounded-xl bg-surface-container-high border border-outline-variant flex items-center justify-center overflow-hidden">
                    {form.logoUrl ? (
                      <img alt="Company Logo" className="w-full h-full object-cover" src={form.logoUrl} />
                    ) : (
                      <span className="material-symbols-outlined text-4xl text-outline-variant">business</span>
                    )}
                  </div>
                  <div className="flex flex-col gap-xs flex-1">
                    <h3 className="font-title-lg text-title-lg text-on-surface">Company Logo</h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">Paste a logo URL below.</p>
                    <input
                      name="logoUrl"
                      className="w-full border border-outline-variant rounded-lg px-md py-sm font-body-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none mt-sm"
                      placeholder="https://example.com/logo.png"
                      value={form.logoUrl}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
                  <div className="flex flex-col gap-xs">
                    <label className="font-label-md text-label-md text-on-surface">Company Name *</label>
                    <input
                      name="name"
                      required
                      className="w-full border border-outline-variant rounded-lg px-md py-sm font-body-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                      placeholder="e.g. TechNova Inc."
                      value={form.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex flex-col gap-xs">
                    <label className="font-label-md text-label-md text-on-surface">Website</label>
                    <input
                      name="website"
                      className="w-full border border-outline-variant rounded-lg px-md py-sm font-body-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                      placeholder="https://yourcompany.com"
                      value={form.website}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex flex-col gap-xs">
                    <label className="font-label-md text-label-md text-on-surface">Location</label>
                    <input
                      name="location"
                      className="w-full border border-outline-variant rounded-lg px-md py-sm font-body-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                      placeholder="e.g. San Francisco, CA"
                      value={form.location}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex flex-col gap-xs md:col-span-2">
                    <label className="font-label-md text-label-md text-on-surface">Company Description *</label>
                    <textarea
                      name="description"
                      required
                      rows={4}
                      className="w-full border border-outline-variant rounded-lg px-md py-sm font-body-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none resize-y"
                      placeholder="Tell candidates about your company culture, mission, and what makes you unique..."
                      value={form.description}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {!company && (
                  <div className="bg-primary-fixed/20 border border-primary/20 rounded-lg p-md flex items-center gap-sm">
                    <span className="material-symbols-outlined text-primary">info</span>
                    <p className="font-body-sm text-body-sm text-on-surface">You need to create a company profile before you can post jobs.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </form>
      </main>
    </div>
  )
}
