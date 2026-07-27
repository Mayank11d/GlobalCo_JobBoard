import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LayoutWrapper } from "@/components/common/LayoutWrapper";
import ReactQueryProvider from "@/lib/ReactQueryProvider";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Modern SaaS Job Board",
  description: "The premier job board for SaaS professionals.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet" />
      </head>
      <body className={inter.variable}>
        <ReactQueryProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
          <Toaster position="top-right" />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
