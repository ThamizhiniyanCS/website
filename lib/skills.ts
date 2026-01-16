import type { SkillsCategoriesType, SkillType } from "@/types/skills.type"

const operatingSystems: SkillType[] = [
  {
    title: "Linux",
    href: "https://kernel.org/",
    description:
      "Linux is a clone of the operating system Unix, written from scratch by Linus Torvalds with assistance from a loosely-knit team of hackers across the Net.",
    icon: {
      src: {
        dark: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/linux.svg",
        light:
          "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/linux.svg",
      },
      alt: "Linux Penguin Logo",
    },
  },
  {
    title: "Windows",
    href: "https://www.microsoft.com/en-in/windows/",
    description:
      "Microsoft Windows is a product line of proprietary graphical operating systems developed and marketed by Microsoft.",
    icon: {
      src: {
        dark: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/microsoft-windows.svg",
        light:
          "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/microsoft-windows.svg",
      },
      alt: "Microsoft Windows Logo",
    },
  },
]

const frameworks: SkillType[] = [
  {
    title: "Next.js",
    href: "https://nextjs.org/",
    description: "The React Framework for the Web.",
    icon: {
      src: {
        dark: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/nextjs.svg",
        light:
          "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/nextjs-light.svg",
      },
      alt: "Next.js Logo",
    },
  },
  {
    title: "Astro",
    href: "https://astro.build/",
    description: "The web-framework for content driven websites.",
    icon: {
      src: {
        dark: "/logos/astro/light.svg",
        light: "/logos/astro/dark-gradient.svg",
      },
      alt: "Astro Logo",
    },
  },
]

const frontend: SkillType[] = [
  {
    title: "Typescript",
    href: "https://www.typescriptlang.org/",
    description:
      "TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.",
    icon: {
      src: {
        dark: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/typescript.svg",
        light:
          "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/typescript.svg",
      },
      alt: "Typescript Logo",
    },
  },
  {
    title: "React.js",
    href: "https://react.dev/",
    description: "The library for web and native user interfaces.",
    icon: {
      src: {
        dark: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/reactjs.svg",
        light:
          "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/reactjs.svg",
      },
      alt: "React.js Logo",
    },
  },
  {
    title: "Tailwind CSS",
    href: "https://tailwindcss.com/",
    description:
      "Tailwind CSS is a utility-first CSS framework for rapidly building modern websites without ever leaving your HTML.",
    icon: {
      src: {
        dark: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/tailwind.svg",
        light:
          "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/tailwind.svg",
      },
      alt: "Tailwind CSS Logo",
    },
  },
  {
    title: "Shadcn/ui",
    href: "https://ui.shadcn.com/",
    description:
      "Beautifully designed components that you can copy and paste into your apps.",
    icon: {
      src: {
        dark: "/logos/shadcnui/dark.svg",
        light: "/logos/shadcnui/light.svg",
      },
      alt: "Shadcn UI Logo",
    },
  },
  {
    title: "GSAP",
    href: "https://gsap.com/",
    description:
      "A wildly robust JavaScript animation library built for professionals",
    icon: {
      src: {
        dark: "/logos/gsap/black.svg",
        light: "/logos/gsap/white.svg",
      },
      alt: "GSAP Logo",
    },
  },
]

const backend: SkillType[] = [
  {
    title: "Python",
    href: "https://www.python.org/",
    description:
      "Python is a programming language that lets you work quickly and integrate systems more effectively.",
    icon: {
      src: {
        dark: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/python.svg",
        light:
          "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/python.svg",
      },
      alt: "Python Logo",
    },
  },
  {
    title: "Rust",
    href: "https://rust-lang.org/",
    description:
      "Rust is a general-purpose programming language. It is noted for its emphasis on performance, type safety, concurrency, and memory safety.",
    icon: {
      src: {
        dark: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/rust.svg",
        light:
          "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/rust-dark.svg",
      },
      alt: "Rust Logo",
    },
  },
]

const scripting: SkillType[] = [
  {
    title: "Bash",
    href: "https://www.gnu.org/software/bash/",
    description:
      "Bash is a free software shell that supports command-line editing, job control, shell functions, arrays, and more.",
    icon: {
      src: {
        dark: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/shell.svg",
        light:
          "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/shell-light.svg",
      },
      alt: "Bash Logo",
    },
  },
  {
    title: "Powershell",
    href: "https://learn.microsoft.com/en-us/powershell/",
    description:
      "PowerShell is a cross-platform task automation solution made up of a command-line shell, a scripting language, and a configuration management framework.",
    icon: {
      src: {
        dark: "/logos/powershell.svg",
        light: "/logos/powershell.svg",
      },
      alt: "Powershell Logo",
    },
  },
]

const misc: SkillType[] = [
  {
    title: "Docker",
    href: "https://www.typescriptlang.org/",
    description:
      "TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.",
    icon: {
      src: {
        dark: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/docker.svg",
        light:
          "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/docker.svg",
      },
      alt: "Docker Logo",
    },
  },
  {
    title: "Vercel",
    href: "https://vercel.com/",
    description:
      "Vercel provides the developer tools and cloud infrastructure to build, scale, and secure a faster, more personalized web.",
    icon: {
      src: {
        dark: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/vercel.svg",
        light:
          "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/vercel-light.svg",
      },
      alt: "Vercel Logo",
    },
  },
  {
    title: "Cloudflare",
    href: "https://www.cloudflare.com/",
    description:
      "Cloudflare is a global internet infrastructure and security company that acts as a reverse proxy and content delivery network (CDN) between users and websites.",
    icon: {
      src: {
        dark: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/cloudflare.svg",
        light:
          "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/cloudflare.svg",
      },
      alt: "Cloudflare Logo",
    },
  },
]

const security: SkillType[] = [
  {
    title: "Burpsuite",
    href: "https://portswigger.net/burp",
    description: "The world's #1 web penetration testing toolkit.",
    icon: {
      src: {
        dark: "/logos/burpsuite.svg",
        light: "/logos/burpsuite.svg",
      },
      alt: "Burpsuite Logo",
    },
  },
]

const others: SkillType[] = [
  {
    title: "Javascript",
    href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    description:
      "JavaScript (JS) is a lightweight interpreted (or just-in-time compiled) programming language with first-class functions.",
    icon: {
      src: {
        dark: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/javascript.svg",
        light:
          "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/javascript-light.svg",
      },
      alt: "Javasript Logo",
    },
  },
]

export const skillsDataWithCategories: SkillsCategoriesType = {
  Backend: backend,
  Frameworks: frameworks,
  Frontend: frontend,
  Misc: misc,
  "Operating Systems": operatingSystems,
  Scripting: scripting,
  Security: security,
}

export const skillsData: SkillType[] = [
  ...others,
  ...frontend,
  ...backend,
  ...scripting,
  ...frameworks,
  ...misc,
  ...operatingSystems,
  ...security,
]
