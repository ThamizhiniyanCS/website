import type { Metadata } from "next"
import { Josefin_Sans, Lavishly_Yours } from "next/font/google"
import { NextProvider } from "fumadocs-core/framework/next"

import "./globals.css"

import { siteConfig } from "@/lib/config"
import { BASE_URL } from "@/lib/constants"
import Lenis from "@/lib/lenis"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import ScrollToTop from "@/components/scroll-to-top"

import Providers from "./providers"

export const revalidate = 86400 // 24 hrs

const fontJosefinSans = Josefin_Sans({
  variable: "--var-font-josefin-sans",
  weight: "400",
  subsets: ["latin"],
})

const fontLavishlyYours = Lavishly_Yours({
  variable: "--var-font-lavishly-yours",
  weight: "400",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: {
    default: "Thamizhiniyan C S",
    template: `%s | Thamizhiniyan C S`,
  },
  metadataBase: new URL(BASE_URL),
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: siteConfig.authors,
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: BASE_URL,
    siteName: siteConfig.siteName,
    locale: siteConfig.locale,
    type: siteConfig.type,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    creator: "@ThamizhiniyanCS",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${fontJosefinSans.variable} dark`}>
      <Lenis />
      <body
        className={`${fontLavishlyYours.variable} grid min-h-svh w-full grid-rows-[auto-1fr-auto] scroll-smooth antialiased`}
      >
        <NextProvider>
          <Providers>
            <Navbar />
            <main className="bg-background z-10 min-h-svh">{children}</main>
            <Footer />
          </Providers>
        </NextProvider>

        <ScrollToTop />
      </body>
    </html>
  )
}
