"use client";

import * as React from "react"
import toast from "react-hot-toast"

import { CandidateSidebar } from "@/components/dashboard/CandidateSidebar"
import { useAuth } from "@/hooks/useAuth"

export default function CandidateSettingsPage() {
  const { changePassword, isChangePassLoading, logout } = useAuth();
  const [passForm, setPassForm] = React.useState({ oldPassword: "", newPassword: "", confirmPassword: "" });
  const [passErrors, setPassErrors] = React.useState<Record<string, string>>({});
  const [deleteConfirm, setDeleteConfirm] = React.useState("");

  const handlePassChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (passErrors[e.target.name]) setPassErrors(prev => ({ ...prev, [e.target.name]: "" }));
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};
    if (!passForm.oldPassword) errors.oldPassword = "Current password is required";
    if (!passForm.newPassword || passForm.newPassword.length < 8) errors.newPassword = "New password must be at least 8 characters";
    if (passForm.newPassword !== passForm.confirmPassword) errors.confirmPassword = "Passwords do not match";
    if (Object.keys(errors).length > 0) { setPassErrors(errors); return; }

    try {
      await changePassword({ oldPassword: passForm.oldPassword, newPassword: passForm.newPassword });
      setPassForm({ oldPassword: "", newPassword: "", confirmPassword: "" });
    } catch { }
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirm !== "DELETE") {
      toast.error("Please type DELETE to confirm");
      return;
    }
    toast.error("Account deletion is currently disabled. Contact support.");
  };

  return (
    <div className="flex min-h-screen bg-surface">
      <CandidateSidebar />

      <main className="flex-1 md:ml-64 p-md md:p-xl lg:p-xxl max-w-container-max mx-auto w-full mb-16 md:mb-0">
        <header className="mb-xl">
          <h2 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface">Settings</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mt-2">Manage your account preferences and security.</p>
        </header>

        <div className="flex flex-col gap-lg">
          {/* Change Password */}
          <section className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg flex flex-col gap-lg shadow-sm">
            <h3 className="font-title-lg text-title-lg text-on-surface">Change Password</h3>
            <form className="flex flex-col gap-md" onSubmit={handleChangePassword}>
              <div className="flex flex-col gap-xs">
                <label className="font-label-md text-label-md text-on-surface" htmlFor="oldPassword">Current Password</label>
                <input
                  id="oldPassword"
                  name="oldPassword"
                  type="password"
                  className={`w-full border ${passErrors.oldPassword ? "border-error" : "border-outline-variant"} rounded-lg px-md py-sm font-body-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none`}
                  placeholder="Enter current password"
                  value={passForm.oldPassword}
                  onChange={handlePassChange}
                />
                {passErrors.oldPassword && <span className="text-error font-label-sm text-label-sm">{passErrors.oldPassword}</span>}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                <div className="flex flex-col gap-xs">
                  <label className="font-label-md text-label-md text-on-surface" htmlFor="newPassword">New Password</label>
                  <input
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    className={`w-full border ${passErrors.newPassword ? "border-error" : "border-outline-variant"} rounded-lg px-md py-sm font-body-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none`}
                    placeholder="Min. 8 characters"
                    value={passForm.newPassword}
                    onChange={handlePassChange}
                  />
                  {passErrors.newPassword && <span className="text-error font-label-sm text-label-sm">{passErrors.newPassword}</span>}
                </div>
                <div className="flex flex-col gap-xs">
                  <label className="font-label-md text-label-md text-on-surface" htmlFor="confirmPassword">Confirm New Password</label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    className={`w-full border ${passErrors.confirmPassword ? "border-error" : "border-outline-variant"} rounded-lg px-md py-sm font-body-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none`}
                    placeholder="Confirm new password"
                    value={passForm.confirmPassword}
                    onChange={handlePassChange}
                  />
                  {passErrors.confirmPassword && <span className="text-error font-label-sm text-label-sm">{passErrors.confirmPassword}</span>}
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isChangePassLoading}
                  className="bg-primary-container text-on-primary-container px-lg py-sm rounded-xl font-label-md shadow-sm hover:-translate-y-px transition-all flex items-center gap-sm disabled:opacity-50"
                >
                  {isChangePassLoading ? <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-on-primary-container"></span> : null}
                  Update Password
                </button>
              </div>
            </form>
          </section>

          {/* Danger Zone */}
          <section className="bg-surface-container-lowest border border-error/30 rounded-xl p-lg flex flex-col gap-lg shadow-sm">
            <h3 className="font-title-lg text-title-lg text-error">Danger Zone</h3>
            <div className="flex flex-col gap-sm">
              <p className="font-body-md text-body-md text-on-surface-variant">Permanently delete your account and all your data. This action cannot be undone.</p>
              <div className="flex flex-col gap-xs">
                <label className="font-label-md text-label-md text-on-surface" htmlFor="deleteConfirm">Type <strong>DELETE</strong> to confirm</label>
                <input
                  id="deleteConfirm"
                  className="w-full max-w-xs border border-error/50 rounded-lg px-md py-sm font-body-md text-on-surface focus:border-error focus:ring-1 focus:ring-error outline-none"
                  value={deleteConfirm}
                  onChange={(e) => setDeleteConfirm(e.target.value)}
                  placeholder="DELETE"
                />
              </div>
              <div className="flex gap-md">
                <button
                  onClick={handleDeleteAccount}
                  className="bg-error-container text-on-error-container px-md py-sm rounded-lg font-label-md text-label-md hover:bg-error hover:text-on-error transition-colors"
                >
                  Delete Account
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
