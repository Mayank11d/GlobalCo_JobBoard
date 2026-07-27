"use client";

import * as React from "react"
import Link from "next/link"

export default function SupportPage() {
  return (
    <main className="flex-grow pt-[112px] pb-xxl px-gutter md:px-xxl max-w-container-max mx-auto w-full flex flex-col gap-huge">
      {/* Header Section */}
      <section className="text-center max-w-3xl mx-auto space-y-md">
        <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface">How can we help?</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant">Search our knowledge base or get in touch with our support team.</p>
        <div className="relative mt-lg max-w-xl mx-auto">
          <span className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-outline">search</span>
          <input 
            className="w-full pl-[48px] pr-md py-[14px] rounded-lg border border-outline-variant focus:border-primary focus:ring-4 focus:ring-primary-fixed-dim/30 bg-surface outline-none transition-all font-body-md text-body-md placeholder:text-outline" 
            placeholder="Search for articles, guides, and more..." 
            type="text"
          />
        </div>
      </section>

      {/* Main Content Area: Bento-style Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-lg">
        {/* Left Column: FAQ Categories & Contact Form */}
        <div className="lg:col-span-7 flex flex-col gap-lg">
          {/* FAQ Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
            <Link href="#" className="block bg-surface border border-outline-variant rounded-lg p-lg hover:-translate-y-[2px] hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.05)] transition-all group">
              <div className="bg-surface-container-high w-12 h-12 rounded-lg flex items-center justify-center mb-md group-hover:bg-primary-fixed transition-colors">
                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>manage_accounts</span>
              </div>
              <h3 className="font-title-lg text-title-lg text-on-surface mb-sm">Account &amp; Billing</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Manage your profile, subscriptions, and payment methods.</p>
            </Link>

            <Link href="#" className="block bg-surface border border-outline-variant rounded-lg p-lg hover:-translate-y-[2px] hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.05)] transition-all group">
              <div className="bg-surface-container-high w-12 h-12 rounded-lg flex items-center justify-center mb-md group-hover:bg-primary-fixed transition-colors">
                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>work</span>
              </div>
              <h3 className="font-title-lg text-title-lg text-on-surface mb-sm">Job Posting</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Learn how to create, edit, and optimize your job listings.</p>
            </Link>

            <Link href="#" className="block bg-surface border border-outline-variant rounded-lg p-lg hover:-translate-y-[2px] hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.05)] transition-all group">
              <div className="bg-surface-container-high w-12 h-12 rounded-lg flex items-center justify-center mb-md group-hover:bg-primary-fixed transition-colors">
                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>shield</span>
              </div>
              <h3 className="font-title-lg text-title-lg text-on-surface mb-sm">Trust &amp; Safety</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Guidelines for a secure and respectful marketplace experience.</p>
            </Link>

            <Link href="#" className="block bg-surface border border-outline-variant rounded-lg p-lg hover:-translate-y-[2px] hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.05)] transition-all group">
              <div className="bg-surface-container-high w-12 h-12 rounded-lg flex items-center justify-center mb-md group-hover:bg-primary-fixed transition-colors">
                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>api</span>
              </div>
              <h3 className="font-title-lg text-title-lg text-on-surface mb-sm">Integrations</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Connect CareerEngine with your favorite ATS and HR tools.</p>
            </Link>
          </div>

          {/* Contact Form */}
          <div className="bg-surface border border-outline-variant rounded-lg p-lg md:p-xl mt-lg">
            <h2 className="font-headline-md text-headline-md text-on-surface mb-sm">Contact Support</h2>
            <p className="font-body-md text-body-md text-on-surface-variant mb-xl">Can&apos;t find what you&apos;re looking for? Send us a message.</p>
            <form className="space-y-md" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                <div className="space-y-sm">
                  <label className="font-label-md text-label-md text-on-surface" htmlFor="name">Name</label>
                  <input className="w-full px-md py-sm rounded-lg border border-outline-variant focus:border-primary focus:ring-4 focus:ring-primary-fixed-dim/30 bg-surface outline-none transition-all font-body-md text-body-md" id="name" type="text" />
                </div>
                <div className="space-y-sm">
                  <label className="font-label-md text-label-md text-on-surface" htmlFor="email">Email</label>
                  <input className="w-full px-md py-sm rounded-lg border border-outline-variant focus:border-primary focus:ring-4 focus:ring-primary-fixed-dim/30 bg-surface outline-none transition-all font-body-md text-body-md" id="email" type="email" />
                </div>
              </div>
              <div className="space-y-sm">
                <label className="font-label-md text-label-md text-on-surface" htmlFor="subject">Subject</label>
                <input className="w-full px-md py-sm rounded-lg border border-outline-variant focus:border-primary focus:ring-4 focus:ring-primary-fixed-dim/30 bg-surface outline-none transition-all font-body-md text-body-md" id="subject" type="text" />
              </div>
              <div className="space-y-sm">
                <label className="font-label-md text-label-md text-on-surface" htmlFor="message">Message</label>
                <textarea className="w-full px-md py-sm rounded-lg border border-outline-variant focus:border-primary focus:ring-4 focus:ring-primary-fixed-dim/30 bg-surface outline-none transition-all font-body-md text-body-md resize-y" id="message" rows={5}></textarea>
              </div>
              <div className="pt-sm">
                <button className="w-full md:w-auto bg-primary-container text-white font-label-md text-label-md px-xl py-[12px] rounded-lg hover:opacity-90 transition-opacity" type="button">
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Column: Privacy Policy Snapshot */}
        <div className="lg:col-span-5 bg-[#F8FAFC] border border-outline-variant rounded-lg p-lg md:p-xl flex flex-col h-full max-h-[800px] overflow-y-auto">
          <div className="flex items-center justify-between mb-xl pb-md border-b border-outline-variant">
            <h2 className="font-headline-md text-headline-md text-on-surface">Privacy Policy</h2>
            <span className="font-label-sm text-label-sm text-on-surface-variant bg-surface-container-high px-sm py-xs rounded-full">Updated Oct 2024</span>
          </div>
          <div className="space-y-lg font-body-md text-body-md text-on-surface-variant">
            <p>At CareerEngine, we take your privacy seriously. This document outlines how we collect, use, and protect your data.</p>
            <div className="space-y-sm">
              <h3 className="font-title-lg text-title-lg text-on-surface">1. Information Collection</h3>
              <p>We collect information you provide directly to us when you create an account, update your profile, or communicate with us. This includes your name, email, and professional history.</p>
            </div>
            <div className="space-y-sm">
              <h3 className="font-title-lg text-title-lg text-on-surface">2. Data Usage</h3>
              <p>Your data is used to provide, maintain, and improve our services, including matching you with relevant job opportunities and facilitating communication with employers.</p>
            </div>
            <div className="space-y-sm">
              <h3 className="font-title-lg text-title-lg text-on-surface">3. Information Sharing</h3>
              <p>We do not sell your personal data. Information is shared with prospective employers only when you explicitly apply for a position or opt-in to our recruiter discovery program.</p>
            </div>
            <div className="space-y-sm">
              <h3 className="font-title-lg text-title-lg text-on-surface">4. Security Measures</h3>
              <p>We implement robust technical and organizational measures to safeguard your personal data against unauthorized access, disclosure, alteration, or destruction.</p>
            </div>
            <div className="mt-xl pt-lg border-t border-outline-variant">
              <Link href="#" className="inline-flex items-center gap-xs text-primary font-label-md text-label-md hover:underline">
                Read full Privacy Policy
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
