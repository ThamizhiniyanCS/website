import { Fragment } from "react";

import AboutSection from "./AboutSection";
import HeroSection from "./HeroSection";

export default function Home() {
  return (
    <Fragment>
      <HeroSection />
      <AboutSection />
    </Fragment>
  );
}
