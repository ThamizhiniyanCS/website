import dynamic from "next/dynamic"
import Link from "next/link"
import getLinks from "@/actions/get-links"
import getSocials from "@/actions/get-socials"

import { BASE_URL } from "@/lib/constants"
import { cn } from "@/lib/utils"
import Logo from "@/components/logo"

const TextHoverEffect = dynamic(() =>
  import("../unizoy-ui/text-hover-effect").then((mod) => mod.TextHoverEffect)
)

const Footer = async () => {
  const links = await getLinks()
  const socials = await getSocials()

  const headingStyle = "text-lg font-bold"

  const date = new Date()

  return (
    <footer className="isolate z-0 flex flex-col items-center overflow-clip py-10 lg:sticky lg:bottom-0 lg:left-0 lg:min-h-screen lg:justify-end">
      <div className="z-10 mx-auto mb-[20vw] flex w-full max-w-7xl flex-col items-center gap-10 px-5">
        <div className="flex flex-col items-center gap-5">
          <p className="font-josefin-sans text-xs tracking-widest">
            Designed and Developed by
          </p>

          <Link href="/" className="font-lavishly-yours text-5xl">
            Thamizhiniyan C S
          </Link>

          <p className="font-josefin-sans mt-5 text-xs tracking-widest">
            Copyrights (c) {date.getFullYear()}
          </p>
        </div>

        <div className="grid w-full grid-cols-1 place-content-center justify-center gap-x-5 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          <div className="flex flex-col gap-4">
            <Link href={BASE_URL} className={cn(headingStyle)}>
              Home
            </Link>
            <Link href={`${BASE_URL}#about-me`}>About Me</Link>
            <Link href={`${BASE_URL}#skills`}>Skills</Link>
            <Link href={`${BASE_URL}#certifications`}>Certifications</Link>
          </div>

          {links &&
            links.map(({ title, href, children }, index) => (
              <div
                className="flex flex-col gap-4"
                key={`footer-link-${title}-${index}`}
              >
                <Link href={href} className={cn(headingStyle)}>
                  {title}
                </Link>

                {children.map(({ title, href }, index) => (
                  <Link href={href} key={index}>
                    {title}
                  </Link>
                ))}
              </div>
            ))}

          {socials && (
            <div className="flex flex-col gap-4">
              <p className={cn(headingStyle)}>Socials</p>

              {socials.map(({ title, href, logo }, index) => (
                <Link
                  href={href}
                  key={`footer-socials-link-${title}-${index}`}
                  className="flex gap-2"
                >
                  <Logo src={logo.src} alt={logo.alt} size={20} />
                  {title}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      <TextHoverEffect
        text="Thamizhiniyan C S"
        fontSize={33}
        className="absolute -bottom-[10vw] -z-10 hidden h-[40vw] lg:block"
      />
    </footer>
  )
}

export default Footer
