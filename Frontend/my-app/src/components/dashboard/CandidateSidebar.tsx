"use client";

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/hooks/useAuth"

export function CandidateSidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const navItems = [
    { name: "Dashboard", href: "/dashboard/candidate", icon: "grid_view" },
    { name: "Applied Jobs", href: "/dashboard/candidate/applied", icon: "check_circle" },
    { name: "Saved Jobs", href: "/dashboard/candidate/saved", icon: "bookmark" },
    { name: "Notifications", href: "/dashboard/candidate/notifications", icon: "notifications" },
    { name: "Profile", href: "/dashboard/candidate/profile", icon: "person" },
  ];

  return (
    <>
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex flex-col w-64 fixed inset-y-0 left-0 bg-surface border-r border-outline-variant z-40">
        <div className="p-lg border-b border-outline-variant">
          <div className="flex items-center gap-sm mb-xs">
            <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold">
              CE
            </div>
            <h1 className="font-headline-sm text-headline-sm text-primary">Candidate Portal</h1>
          </div>
          <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Track your applications</p>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-1 p-md flex-grow overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.name}
                href={item.href} 
                className={`flex items-center gap-md px-md py-sm rounded-lg transition-all duration-200 ease-in-out ${
                  isActive 
                    ? "bg-secondary-container/20 text-primary border-l-4 border-primary" 
                    : "text-on-surface-variant hover:bg-surface-container-high border-l-4 border-transparent"
                }`}
              >
                <span className={`material-symbols-outlined ${isActive ? "fill-current" : ""}`}>
                  {item.icon}
                </span>
                <span className="font-label-md text-label-md">{item.name}</span>
              </Link>
            )
          })}
          <Link href="/dashboard/candidate/settings" className={`flex items-center gap-md px-md py-sm rounded-lg transition-all duration-200 ease-in-out mt-auto mb-md border-l-4 ${pathname === '/dashboard/candidate/settings' ? "bg-secondary-container/20 text-primary border-primary" : "text-on-surface-variant hover:bg-surface-container-high border-transparent"}`}>
            <span className="material-symbols-outlined">settings</span>
            <span className="font-label-md text-label-md">Settings</span>
          </Link>
          <button 
            onClick={() => logout()}
            className="flex items-center gap-md px-md py-sm rounded-lg transition-all duration-200 ease-in-out border-l-4 border-transparent text-error hover:bg-error-container/20 w-full"
          >
            <span className="material-symbols-outlined">logout</span>
            <span className="font-label-md text-label-md">Logout</span>
          </button>
        </nav>

        {/* User Profile Snippet Bottom */}
        <div className="mt-auto border-t border-outline-variant p-md flex items-center gap-sm">
          <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-lg uppercase">
            {user?.firstName?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || "U"}
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="font-label-md text-label-md text-on-surface truncate w-full">{user ? `${user.firstName || ""} ${user.lastName || ""}`.trim() || "User" : "User"}
            </span>
            <span className="font-label-sm text-label-sm text-on-surface-variant truncate w-full">{user?.email}</span>
          </div>
        </div>
      </aside>

      {/* Bottom Nav Bar for Mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-surface border-t border-outline-variant h-16 flex justify-around items-center px-sm z-50">
        {navItems.slice(0, 4).map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.name} href={item.href} className={`flex flex-col items-center justify-center w-full h-full gap-1 ${isActive ? "text-primary" : "text-on-surface-variant hover:text-primary"}`}>
              <span className={`material-symbols-outlined ${isActive ? "fill-current" : ""} text-[24px]`}>{item.icon}</span>
              <span className="text-[10px] font-medium">{item.name.split(" ")[0]}</span>
            </Link>
          )
        })}
        <button onClick={() => logout()} className="flex flex-col items-center justify-center w-full h-full gap-1 text-on-surface-variant hover:text-error">
          <span className="material-symbols-outlined text-[24px]">logout</span>
          <span className="text-[10px] font-medium">Logout</span>
        </button>
      </nav>
    </>
  )
}
