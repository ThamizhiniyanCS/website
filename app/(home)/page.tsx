import { Fragment } from "react"
import type { Metadata } from "next"

import AboutSection from "./AboutSection"
import HeroSection from "./HeroSection"

export const metadata: Metadata = {
  title: "Home",
}

export default function Page() {
  return (
    <Fragment>
      <HeroSection />
      <AboutSection />
    </Fragment>
  )
}
