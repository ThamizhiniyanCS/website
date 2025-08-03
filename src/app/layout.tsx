import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

import { NuqsAdapter } from "nuqs/adapters/next/app";

import { ReactLenis } from "@/lib/lenis";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";

import "lenis/dist/lenis.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Thamizhiniyan C S",
  description: "Ethical Hacker | Web Developer",
  metadataBase: new URL("https://thamizhiniyancs.me"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.16.22/dist/katex.min.css"
          integrity="sha384-5TcZemv2l/9On385z///+d7MSYlvIEw9FuZTIdZ14vJLqWphw7e7ZPuOiCHJcFCP"
          crossOrigin="anonymous"
        />
      </head>
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
          className={`${geistSans.variable} ${geistMono.variable} grid min-h-screen w-full grid-rows-[auto-1fr-auto] scroll-smooth antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <NuqsAdapter>
              <Navbar />
              {children}
              <Footer />
            </NuqsAdapter>
          </ThemeProvider>
        </body>
      </ReactLenis>
    </html>
  );
}
