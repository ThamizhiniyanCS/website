import type { Metadata } from "next"
import { Josefin_Sans, Lavishly_Yours } from "next/font/google"
import { NextProvider } from "fumadocs-core/framework/next"

import "./globals.css"

import { siteConfig } from "@/lib/config"
import { BASE_URL } from "@/lib/constants"
import { ReactLenis } from "@/lib/lenis"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"

import Providers from "./providers"

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
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${fontJosefinSans.variable} dark`}>
      <ReactLenis
        root
        options={{
          anchors: {
            offset: -100,
          },
          allowNestedScroll: true,
        }}
      >
        <body
          className={`${fontLavishlyYours.variable} grid min-h-screen w-full grid-rows-[auto-1fr-auto] scroll-smooth antialiased`}
        >
          <NextProvider>
            <Providers>
              <Navbar />
              <main className="bg-background z-10 min-h-screen">
                {children}
              </main>
              <Footer />
            </Providers>
          </NextProvider>
        </body>
      </ReactLenis>
    </html>
  )
}
