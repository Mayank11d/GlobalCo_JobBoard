"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function DashboardRedirect() {
  const { user, isUserLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoading) {
      if (!user) {
        router.replace("/login");
      } else if (user.role === "recruiter") {
        router.replace("/dashboard/recruiter");
      } else if (user.role === "admin") {
        router.replace("/dashboard/admin");
      } else {
        router.replace("/dashboard/candidate");
      }
    }
  }, [user, isUserLoading, router]);

  return (
    <div className="flex h-screen w-full items-center justify-center bg-surface">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
  );
}
