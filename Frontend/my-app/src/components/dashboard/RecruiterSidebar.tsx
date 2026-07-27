"use client";

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/hooks/useAuth"

export function RecruiterSidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const navItems = [
    { name: "Dashboard", href: "/dashboard/recruiter", icon: "dashboard" },
    { name: "Company", href: "/dashboard/recruiter/company", icon: "business" },
    { name: "My Jobs", href: "/dashboard/recruiter/jobs", icon: "work" },
    { name: "Applications", href: "/dashboard/recruiter/applications", icon: "description" },
    { name: "Candidates", href: "/dashboard/recruiter/candidates", icon: "group" },
    { name: "Analytics", href: "/dashboard/recruiter/analytics", icon: "monitoring" },
  ];

  return (
    <nav className="bg-[#131b2e] h-screen w-64 fixed left-0 top-0 flex flex-col justify-between border-r border-[#283044] z-40 transition-all duration-200 ease-in-out shadow-none">
      <div className="flex flex-col gap-sm p-md h-full overflow-y-auto">
        {/* Header */}
        <div className="mb-lg px-sm pt-sm flex items-center gap-md">
          <div className="w-10 h-10 rounded-lg bg-[#2563eb] text-white flex items-center justify-center font-bold text-lg uppercase">
            {user?.firstName?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || "R"}
          </div>
          <div className="overflow-hidden flex-1">
            <h1 className="font-headline-sm text-headline-sm text-white truncate w-full">{user ? `${user.firstName || ""} ${user.lastName || ""}`.trim() || "Recruiter" : "Recruiter"}</h1>
            <p className="font-label-sm text-label-sm text-[#737686]">Manage your hiring</p>
          </div>
        </div>
        
        {/* Navigation Links */}
        <div className="flex flex-col gap-xs flex-grow">
          {navItems.map((item) => {
            const isActive = 
              pathname === item.href || 
              (item.name === "Candidates" && (pathname.includes('/candidates') || pathname.includes('/applicants')));

            return (
              <Link 
                key={item.name}
                href={item.href} 
                className={`flex items-center gap-md px-md py-sm rounded-lg transition-all duration-200 ease-in-out border-l-4 ${
                  isActive 
                    ? "bg-[#2563eb]/20 text-[#2563eb] border-[#2563eb]" 
                    : "text-[#737686] hover:bg-[#283044] border-transparent"
                }`}
              >
                <span className={`material-symbols-outlined ${isActive ? "text-[#2563eb]" : ""}`}>
                  {item.icon}
                </span>
                <span className="font-label-md text-label-md">{item.name}</span>
              </Link>
            )
          })}
          
          <Link href="/dashboard/recruiter/settings" className="flex items-center gap-md px-md py-sm rounded-lg text-[#737686] hover:bg-[#283044] transition-all duration-200 ease-in-out border-l-4 border-transparent mt-auto">
            <span className="material-symbols-outlined">settings</span>
            <span className="font-label-md text-label-md">Settings</span>
          </Link>

          <button 
            onClick={() => logout()}
            className="flex items-center gap-md px-md py-sm rounded-lg text-error hover:bg-error-container/20 transition-all duration-200 ease-in-out border-l-4 border-transparent"
          >
            <span className="material-symbols-outlined">logout</span>
            <span className="font-label-md text-label-md">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  )
}
