"use client";

import * as React from "react"
import Link from "next/link"

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-on-surface/80 backdrop-blur-md shadow-sm border-b border-outline-variant dark:border-outline">
      <div className="max-w-container-max mx-auto px-lg h-16 flex items-center justify-between">
        <div className="flex items-center gap-xl">
          <Link href="/" className="font-display-lg text-display-lg-mobile tracking-tight text-primary dark:text-primary-fixed">
            CareerEngine
          </Link>
          <div className="hidden md:flex items-center gap-lg font-body-md text-body-md">
            <Link href="/jobs" className="text-primary dark:text-primary-fixed font-bold border-b-2 border-primary hover:text-primary dark:hover:text-primary-fixed transition-colors">
              Find Jobs
            </Link>
            <Link href="/companies" className="text-on-surface-variant dark:text-outline-variant hover:text-primary dark:hover:text-primary-fixed transition-colors">
              Companies
            </Link>
            <Link href="/pricing" className="text-on-surface-variant dark:text-outline-variant hover:text-primary dark:hover:text-primary-fixed transition-colors">
              Pricing
            </Link>
          </div>
        </div>
        
        <div className="hidden md:flex items-center gap-md">
          <Link href="/login" className="text-on-surface-variant font-label-md text-label-md px-md py-sm rounded-xl hover:bg-surface-variant transition-colors">
            Login
          </Link>
          <Link href="/post-job" className="bg-primary-container text-on-primary rounded-xl px-lg py-sm font-label-md text-label-md scale-95 active:scale-90 transition-transform inline-block">
            Post a Job
          </Link>
        </div>

        <button 
          className="md:hidden text-on-surface"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span className="material-symbols-outlined text-[24px]">
            {isMobileMenuOpen ? "close" : "menu"}
          </span>
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-surface border-b border-outline-variant px-lg py-md flex flex-col gap-md font-body-md text-body-md">
          <Link href="/jobs" className="text-primary dark:text-primary-fixed font-bold">Find Jobs</Link>
          <Link href="/companies" className="text-on-surface-variant dark:text-outline-variant">Companies</Link>
          <Link href="/pricing" className="text-on-surface-variant dark:text-outline-variant">Pricing</Link>
          <hr className="border-outline-variant" />
          <Link href="/login" className="text-on-surface-variant">Login</Link>
          <Link href="/post-job" className="text-primary font-bold">Post a Job</Link>
        </div>
      )}
    </nav>
  )
}
