import type { Metadata } from "next"
import { Josefin_Sans, Lavishly_Yours } from "next/font/google"
import { NextProvider } from "fumadocs-core/framework/next"

import "./globals.css"

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
  title: "Thamizhiniyan C S",
  description: "Ethical Hacker | Web Developer",
  metadataBase: new URL("https://thamizhiniyancs.me"),
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
