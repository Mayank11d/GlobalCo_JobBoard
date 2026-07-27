import * as React from "react"
import Link from "next/link"

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-xxl pb-huge px-md lg:px-gutter max-w-container-max mx-auto text-center">
        <div className="max-w-3xl mx-auto space-y-lg relative z-10">
          <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface leading-tight">
            Find your dream engineering job
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            Connect with top tech companies actively hiring for remote and on-site engineering roles.
          </p>
          
          <div className="bg-white/70 backdrop-blur-md border border-outline-variant/80 p-sm rounded-xl flex flex-col md:flex-row gap-sm mt-lg mx-auto max-w-2xl shadow-sm">
            <div className="flex-1 relative">
              <span className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-outline">search</span>
              <input 
                className="w-full pl-xl pr-md py-md rounded-lg border-outline-variant focus:border-primary focus:ring-2 focus:ring-primary-fixed-dim bg-surface outline-none transition-all font-body-md" 
                placeholder="Job title or keyword" 
                type="text"
              />
            </div>
            <div className="flex-1 relative">
              <span className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-outline">location_on</span>
              <input 
                className="w-full pl-xl pr-md py-md rounded-lg border-outline-variant focus:border-primary focus:ring-2 focus:ring-primary-fixed-dim bg-surface outline-none transition-all font-body-md" 
                placeholder="Location or Remote" 
                type="text"
              />
            </div>
            <button className="bg-primary-container text-on-primary rounded-lg px-xl py-md font-label-md text-label-md hover:bg-primary transition-colors whitespace-nowrap">
              Search Jobs
            </button>
          </div>
        </div>
        
        <div className="mt-huge pt-lg border-t border-surface-container-high max-w-4xl mx-auto opacity-70">
          <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mb-md">
            Trusted by engineering teams at
          </p>
          <div className="flex flex-wrap justify-center gap-xl items-center text-outline">
            <span className="font-headline-sm font-bold">Google</span>
            <span className="font-headline-sm font-bold">Meta</span>
            <span className="font-headline-sm font-bold">Vercel</span>
            <span className="font-headline-sm font-bold">Stripe</span>
            <span className="font-headline-sm font-bold">Linear</span>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-surface-container-low py-huge px-md lg:px-gutter">
        <div className="max-w-container-max mx-auto">
          <div className="flex justify-between items-end mb-xl">
            <div>
              <h2 className="font-headline-md text-headline-md text-on-surface">Explore Categories</h2>
              <p className="font-body-md text-body-md text-on-surface-variant mt-sm">
                Find roles that match your technical expertise.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-lg">
            {/* Category Card */}
            <div className="bg-surface border border-outline-variant rounded-xl p-lg flex items-center gap-md hover:-translate-y-[2px] hover:shadow-sm transition-all cursor-pointer group">
              <div className="bg-primary-fixed w-12 h-12 rounded-lg flex items-center justify-center text-primary-container group-hover:bg-primary-container group-hover:text-on-primary transition-colors">
                <span className="material-symbols-outlined">web</span>
              </div>
              <div>
                <h3 className="font-title-lg text-title-lg text-on-surface">Frontend</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">1,204 jobs</p>
              </div>
            </div>
            
            {/* Category Card */}
            <div className="bg-surface border border-outline-variant rounded-xl p-lg flex items-center gap-md hover:-translate-y-[2px] hover:shadow-sm transition-all cursor-pointer group">
              <div className="bg-primary-fixed w-12 h-12 rounded-lg flex items-center justify-center text-primary-container group-hover:bg-primary-container group-hover:text-on-primary transition-colors">
                <span className="material-symbols-outlined">dns</span>
              </div>
              <div>
                <h3 className="font-title-lg text-title-lg text-on-surface">Backend</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">2,530 jobs</p>
              </div>
            </div>
            
            {/* Category Card */}
            <div className="bg-surface border border-outline-variant rounded-xl p-lg flex items-center gap-md hover:-translate-y-[2px] hover:shadow-sm transition-all cursor-pointer group">
              <div className="bg-primary-fixed w-12 h-12 rounded-lg flex items-center justify-center text-primary-container group-hover:bg-primary-container group-hover:text-on-primary transition-colors">
                <span className="material-symbols-outlined">smart_toy</span>
              </div>
              <div>
                <h3 className="font-title-lg text-title-lg text-on-surface">AI & ML</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">892 jobs</p>
              </div>
            </div>
            
            {/* Category Card */}
            <div className="bg-surface border border-outline-variant rounded-xl p-lg flex items-center gap-md hover:-translate-y-[2px] hover:shadow-sm transition-all cursor-pointer group">
              <div className="bg-primary-fixed w-12 h-12 rounded-lg flex items-center justify-center text-primary-container group-hover:bg-primary-container group-hover:text-on-primary transition-colors">
                <span className="material-symbols-outlined">cloud</span>
              </div>
              <div>
                <h3 className="font-title-lg text-title-lg text-on-surface">DevOps</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">1,145 jobs</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
