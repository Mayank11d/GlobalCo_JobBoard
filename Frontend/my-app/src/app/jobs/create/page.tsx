"use client";

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/useAuth"

export default function CreateJobRedirect() {
  const { user, isUserLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoading) {
      if (!user) {
        router.replace("/login");
      } else {
        // Redirect to the recruiter jobs page where the modal can be opened
        router.replace("/dashboard/recruiter/jobs");
      }
    }
  }, [user, isUserLoading, router]);

  return (
    <div className="flex h-screen w-full items-center justify-center bg-surface">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
  );
}
