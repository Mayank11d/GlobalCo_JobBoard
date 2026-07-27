"use client";

import * as React from "react"
import { RecruiterSidebar } from "@/components/dashboard/RecruiterSidebar"

export default function AnalyticsPage() {
  return (
    <div className="flex min-h-screen bg-surface-bright">
      <RecruiterSidebar />

      <main className="md:ml-64 flex-1 flex flex-col min-h-screen pt-16 md:pt-0">
        <div className="max-w-container-max mx-auto w-full p-xxl flex flex-col gap-xl">
          <header className="flex justify-between items-center w-full">
            <div>
              <h2 className="font-display-lg-mobile text-display-lg-mobile text-on-surface">Analytics</h2>
              <p className="font-body-md text-body-md text-on-surface-variant mt-unit">Detailed insights into your hiring funnel.</p>
            </div>
            <select className="border border-outline-variant rounded-lg font-body-sm text-body-sm text-on-surface bg-surface-container-lowest px-md py-sm focus:ring-1 focus:ring-primary outline-none">
              <option>Last 30 Days</option>
              <option>Last 90 Days</option>
              <option>This Year</option>
            </select>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-lg">
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg flex flex-col h-full shadow-sm">
              <h3 className="font-title-lg text-on-surface mb-lg">Funnel Conversion</h3>
              <div className="flex flex-col gap-md">
                <div>
                  <div className="flex justify-between font-label-sm mb-1 text-on-surface-variant"><span>Views</span> <span>12,400</span></div>
                  <div className="h-2 w-full bg-surface-container-high rounded-full overflow-hidden"><div className="h-full bg-primary" style={{ width: '100%' }}></div></div>
                </div>
                <div>
                  <div className="flex justify-between font-label-sm mb-1 text-on-surface-variant"><span>Applications</span> <span>1,482</span></div>
                  <div className="h-2 w-full bg-surface-container-high rounded-full overflow-hidden"><div className="h-full bg-primary" style={{ width: '12%' }}></div></div>
                </div>
                <div>
                  <div className="flex justify-between font-label-sm mb-1 text-on-surface-variant"><span>Interviews</span> <span>340</span></div>
                  <div className="h-2 w-full bg-surface-container-high rounded-full overflow-hidden"><div className="h-full bg-tertiary" style={{ width: '3%' }}></div></div>
                </div>
                <div>
                  <div className="flex justify-between font-label-sm mb-1 text-on-surface-variant"><span>Offers Extended</span> <span>42</span></div>
                  <div className="h-2 w-full bg-surface-container-high rounded-full overflow-hidden"><div className="h-full bg-secondary" style={{ width: '0.5%' }}></div></div>
                </div>
              </div>
            </div>

            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg flex flex-col h-full shadow-sm">
              <h3 className="font-title-lg text-on-surface mb-lg">Source of Hire</h3>
              <div className="flex items-center justify-center flex-1 h-48 relative">
                <svg viewBox="0 0 100 100" className="h-full transform -rotate-90">
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#e2e7ff" strokeWidth="20" />
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#2563eb" strokeWidth="20" strokeDasharray="251.2" strokeDashoffset="62.8" />
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#0f69dc" strokeWidth="20" strokeDasharray="251.2" strokeDashoffset="180" />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="font-headline-md text-on-surface">42</span>
                  <span className="font-label-sm text-on-surface-variant">Total Hires</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
