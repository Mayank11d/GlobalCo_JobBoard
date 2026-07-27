"use client";

import * as React from "react"
import { RecruiterSidebar } from "@/components/dashboard/RecruiterSidebar"

export default function CandidatesPage() {
  return (
    <div className="flex min-h-screen bg-surface-bright">
      <RecruiterSidebar />

      <main className="md:ml-64 flex-1 flex flex-col min-h-screen pt-16 md:pt-0">
        <div className="max-w-container-max mx-auto w-full p-xxl flex flex-col gap-xl">
          <header className="flex justify-between items-center w-full">
            <div>
              <h2 className="font-display-lg-mobile text-display-lg-mobile text-on-surface">Candidate Database</h2>
              <p className="font-body-md text-body-md text-on-surface-variant mt-unit">Explore your talent pool and saved profiles.</p>
            </div>
            <div className="flex items-center gap-sm">
              <button className="bg-surface border border-outline-variant text-on-surface px-md py-sm rounded-lg hover:bg-surface-container-high transition-colors flex items-center gap-xs">
                <span className="material-symbols-outlined text-[20px]">sort</span>
                Sort
              </button>
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
            {/* Candidate Card 1 */}
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg flex flex-col gap-md shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <img alt="Profile" className="w-16 h-16 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCNLq3HMw9YtHmaw5wGYhgRKK1XeDNHVCdaHTbUfF5yN2u-nZFp2YOJAoC-8MGVuAcOFxiYv-Prq5QS-EyKy5BUPeryVbvZUh1IJMj8omAy_5yqMZgDslQt8jQbcOTs963Ot-18unFFvZ4Qm9qtPBCtminddy3_TP0hMuJaTOrSYapT1cg49gJNVEKn_egOrXnFNdrkONH0xxSvngHtwg9KUoM9TIKZgccr2iYZrWok0qcSLmac_rSNwaUZ9mZ6RR_o_v-O9ubk4s8" />
                <button className="text-outline-variant hover:text-primary transition-colors">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>bookmark</span>
                </button>
              </div>
              <div>
                <h3 className="font-title-lg text-title-lg text-on-surface">Sarah Jenkins</h3>
                <p className="font-body-sm text-on-surface-variant">Senior Frontend Engineer</p>
                <p className="font-body-sm text-outline mt-1">San Francisco, CA</p>
              </div>
              <div className="flex flex-wrap gap-2 mt-auto">
                <span className="bg-surface-container-highest px-sm py-xs rounded-full font-label-sm text-on-surface">React</span>
                <span className="bg-surface-container-highest px-sm py-xs rounded-full font-label-sm text-on-surface">TypeScript</span>
                <span className="bg-surface-container-highest px-sm py-xs rounded-full font-label-sm text-on-surface">Next.js</span>
              </div>
            </div>

            {/* Candidate Card 2 */}
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg flex flex-col gap-md shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <img alt="Profile" className="w-16 h-16 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuApwbqWecITMHi5wwFYT5_hZZknamGmHG795fFKLab07aHm1aNqAiMy4sN5Rxhd0jCP5xRa2NoLUHbcQx6IYvJt7bIrSXmcnM71OubcpSuKYRizgu-FwHDFXkLEv44Wy7aKpptdRZQIG8TDRCgml3bvAhl9CJszn1iECBbtiEVNI1-ifAMZayKVAUCoIMt8iC13lq9EzPoidr-39e3PHxvsQk1__G4XdAQEjrHxUKBacXZEqT2B1Z1FwTdsL6ndsdWZ1eGeeY5yTKE" />
                <button className="text-outline-variant hover:text-primary transition-colors">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>bookmark</span>
                </button>
              </div>
              <div>
                <h3 className="font-title-lg text-title-lg text-on-surface">David Chen</h3>
                <p className="font-body-sm text-on-surface-variant">UX/UI Designer</p>
                <p className="font-body-sm text-outline mt-1">New York, NY</p>
              </div>
              <div className="flex flex-wrap gap-2 mt-auto">
                <span className="bg-surface-container-highest px-sm py-xs rounded-full font-label-sm text-on-surface">Figma</span>
                <span className="bg-surface-container-highest px-sm py-xs rounded-full font-label-sm text-on-surface">Prototyping</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
