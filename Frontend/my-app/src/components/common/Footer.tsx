import * as React from "react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-surface-container-lowest dark:bg-on-surface w-full py-xl border-t border-outline-variant dark:border-outline mt-auto">
      <div className="max-w-container-max mx-auto px-lg grid grid-cols-2 md:grid-cols-4 gap-lg">
        <div className="col-span-2 md:col-span-1">
          <span className="font-headline-sm text-headline-sm text-on-surface dark:text-surface block mb-md">
            CareerEngine
          </span>
          <p className="font-body-sm text-body-sm text-on-surface-variant dark:text-outline-variant">
            © {new Date().getFullYear()} CareerEngine. Built for modern engineering.
          </p>
        </div>
        
        <div className="flex flex-col gap-sm">
          <span className="font-label-md text-label-md text-on-surface mb-sm">Candidates</span>
          <Link href="/jobs" className="font-body-sm text-body-sm text-on-surface-variant dark:text-outline-variant hover:text-primary dark:hover:text-primary-fixed">
            Browse Jobs
          </Link>
          <Link href="/companies" className="font-body-sm text-body-sm text-on-surface-variant dark:text-outline-variant hover:text-primary dark:hover:text-primary-fixed">
            Companies
          </Link>
        </div>
        
        <div className="flex flex-col gap-sm">
          <span className="font-label-md text-label-md text-on-surface mb-sm">Employers</span>
          <Link href="/pricing" className="font-body-sm text-body-sm text-on-surface-variant dark:text-outline-variant hover:text-primary dark:hover:text-primary-fixed">
            Pricing
          </Link>
          <Link href="/post-job" className="font-body-sm text-body-sm text-on-surface-variant dark:text-outline-variant hover:text-primary dark:hover:text-primary-fixed">
            Post a Job
          </Link>
        </div>
        
        <div className="flex flex-col gap-sm">
          <span className="font-label-md text-label-md text-on-surface mb-sm">Legal</span>
          <Link href="/privacy" className="font-body-sm text-body-sm text-on-surface-variant dark:text-outline-variant hover:text-primary dark:hover:text-primary-fixed">
            Privacy Policy
          </Link>
          <Link href="/terms" className="font-body-sm text-body-sm text-on-surface-variant dark:text-outline-variant hover:text-primary dark:hover:text-primary-fixed">
            Terms of Service
          </Link>
          <Link href="/support" className="font-body-sm text-body-sm text-on-surface-variant dark:text-outline-variant hover:text-primary dark:hover:text-primary-fixed">
            Support
          </Link>
        </div>
      </div>
    </footer>
  )
}
