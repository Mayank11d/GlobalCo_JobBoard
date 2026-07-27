import * as React from "react"
import Link from "next/link"

export default function PricingPage() {
  return (
    <main className="pt-32 pb-huge min-h-screen">
      {/* Hero Section */}
      <section className="max-w-container-max mx-auto px-lg text-center mb-huge">
        <h1 className="font-display-lg text-display-lg text-on-surface mb-md">Simple pricing for teams of all sizes.</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
          Transparent plans designed to scale with your hiring needs. No hidden fees, cancel anytime.
        </p>
      </section>

      {/* Pricing Grid */}
      <section className="max-w-container-max mx-auto px-lg">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-lg max-w-5xl mx-auto items-end">
          
          {/* Starter Plan */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-[12px] p-xl flex flex-col h-full hover:-translate-y-1 transition-transform duration-300">
            <div className="mb-lg">
              <h3 className="font-headline-sm text-headline-sm text-on-surface mb-xs">Starter</h3>
              <div className="flex items-baseline gap-1">
                <span className="font-display-lg text-display-lg text-on-surface">Free</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-sm">Perfect for individuals and very small teams starting to hire.</p>
            </div>
            <button className="w-full py-3 px-4 bg-surface-container-high text-on-surface font-label-md text-label-md rounded-[12px] hover:bg-surface-variant transition-colors mb-lg">
              Get Started
            </button>
            <div className="flex-grow">
              <ul className="flex flex-col gap-sm font-body-sm text-body-sm text-on-surface-variant">
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-primary text-[20px]">check</span>
                  Up to 3 active job postings
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-primary text-[20px]">check</span>
                  Basic applicant tracking
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-primary text-[20px]">check</span>
                  Standard company profile
                </li>
              </ul>
            </div>
          </div>

          {/* Pro Plan (Highlighted) */}
          <div className="bg-surface-container-lowest border-2 border-primary rounded-[12px] p-xl flex flex-col h-[105%] relative shadow-[0_10px_15px_-3px_rgba(0,0,0,0.05)] z-10 hover:-translate-y-1 transition-transform duration-300">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary-container text-on-primary-container font-label-sm text-label-sm px-3 py-1 rounded-full uppercase tracking-wider">
              Most Popular
            </div>
            <div className="mb-lg mt-2">
              <h3 className="font-headline-sm text-headline-sm text-on-surface mb-xs">Pro</h3>
              <div className="flex items-baseline gap-1">
                <span className="font-display-lg text-display-lg text-on-surface">$99</span>
                <span className="font-body-md text-body-md text-on-surface-variant">/mo</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-sm">For growing teams that need powerful sourcing tools.</p>
            </div>
            <button className="w-full py-3 px-4 bg-primary-container text-on-primary-container font-label-md text-label-md rounded-[12px] hover:bg-primary transition-colors mb-lg shadow-sm">
              Start Free Trial
            </button>
            <div className="flex-grow">
              <p className="font-label-sm text-label-sm text-on-surface uppercase mb-sm">Everything in Starter, plus:</p>
              <ul className="flex flex-col gap-sm font-body-sm text-body-sm text-on-surface">
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-primary text-[20px]">check</span>
                  Unlimited job postings
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-primary text-[20px]">check</span>
                  Advanced ATS integration
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-primary text-[20px]">check</span>
                  Featured company placement
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-primary text-[20px]">check</span>
                  Candidate matching AI
                </li>
              </ul>
            </div>
          </div>

          {/* Enterprise Plan */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-[12px] p-xl flex flex-col h-full hover:-translate-y-1 transition-transform duration-300">
            <div className="mb-lg">
              <h3 className="font-headline-sm text-headline-sm text-on-surface mb-xs">Enterprise</h3>
              <div className="flex items-baseline gap-1">
                <span className="font-display-lg text-display-lg text-on-surface">Custom</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-sm">Tailored solutions for large-scale hiring operations.</p>
            </div>
            <button className="w-full py-3 px-4 border border-outline-variant text-on-surface font-label-md text-label-md rounded-[12px] hover:bg-surface-container-low transition-colors mb-lg">
              Contact Sales
            </button>
            <div className="flex-grow">
              <p className="font-label-sm text-label-sm text-on-surface-variant uppercase mb-sm">Everything in Pro, plus:</p>
              <ul className="flex flex-col gap-sm font-body-sm text-body-sm text-on-surface-variant">
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-primary text-[20px]">check</span>
                  Dedicated account manager
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-primary text-[20px]">check</span>
                  Custom API access
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-primary text-[20px]">check</span>
                  Single Sign-On (SSO)
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-primary text-[20px]">check</span>
                  Advanced analytics & reporting
                </li>
              </ul>
            </div>
          </div>

        </div>
      </section>
    </main>
  )
}
