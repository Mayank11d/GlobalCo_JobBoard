"use client";

import * as React from "react"
import { usePathname } from "next/navigation"
import { Navbar } from "./Navbar"
import { Footer } from "./Footer"

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith('/dashboard');

  return (
    <div className={`min-h-screen flex flex-col ${isDashboard ? '' : 'pt-16'}`}>
      {!isDashboard && <Navbar />}
      <main className="flex-1 flex flex-col w-full">{children}</main>
      {!isDashboard && <Footer />}
    </div>
  )
}
