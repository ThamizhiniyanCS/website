import { Fragment } from "react"
import type { Metadata } from "next"

import { BASE_URL } from "@/lib/constants"

import AboutSection from "./AboutSection"
import HeroSection from "./HeroSection"
import ProfessionalCertificationsSection from "./professional-certifications"
import SkillsSection from "./SkillsSection"

export const metadata: Metadata = {
  title: "Home",
  alternates: {
    canonical: BASE_URL,
  },
}

export default function Page() {
  return (
    <Fragment>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProfessionalCertificationsSection />
    </Fragment>
  )
}
