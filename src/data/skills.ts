export type SkillType = {
  title: string;
  href: string;
  description: string;
  icon: {
    src: string;
    alt: string;
  };
};

export const categories: Record<string, SkillType[]> = {
  "Operating Systems": [
    {
      title: "Linux",
      href: "https://kernel.org/",
      description:
        "Linux is a clone of the operating system Unix, written from scratch by Linus Torvalds with assistance from a loosely-knit team of hackers across the Net.",
      icon: {
        src: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/linux.svg",
        alt: "Linux Penguin Logo",
      },
    },
    {
      title: "Windows",
      href: "https://www.microsoft.com/en-in/windows/",
      description:
        "Microsoft Windows is a product line of proprietary graphical operating systems developed and marketed by Microsoft.",
      icon: {
        src: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/microsoft-windows.svg",
        alt: "Microsoft Windows Logo",
      },
    },
  ],
  "Programming / Scripting": [
    {
      title: "Bash",
      href: "https://www.gnu.org/software/bash/",
      description:
        "Bash is a free software shell that supports command-line editing, job control, shell functions, arrays, and more.",
      icon: {
        src: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/shell-light.svg",
        alt: "Bash Script Logo",
      },
    },
    {
      title: "Python",
      href: "https://www.python.org/",
      description:
        "Python is a programming language that lets you work quickly and integrate systems more effectively.",
      icon: {
        src: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/python.svg",
        alt: "Python Logo",
      },
    },
    {
      title: "Rust",
      href: "https://rust-lang.org/",
      description:
        "Rust is a general-purpose programming language. It is noted for its emphasis on performance, type safety, concurrency, and memory safety.",
      icon: {
        src: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/rust-dark.svg",
        alt: "Rust Logo",
      },
    },
    {
      title: "Javascript",
      href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
      description:
        "JavaScript (JS) is a lightweight interpreted (or just-in-time compiled) programming language with first-class functions.",
      icon: {
        src: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/javascript-light.svg",
        alt: "Javasript Logo",
      },
    },
    {
      title: "Typescript",
      href: "https://www.typescriptlang.org/",
      description:
        "TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.",
      icon: {
        src: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/typescript.svg",
        alt: "Typescript Logo",
      },
    },
  ],
  Security: [
    {
      title: "Burpsuite",
      href: "https://portswigger.net/burp",
      description: "",
      icon: {
        src: "",
        alt: "Burpsuite Logo",
      },
    },
    {
      title: "",
      href: "",
      description: "",
      icon: {
        src: "",
        alt: "",
      },
    },
    {
      title: "",
      href: "",
      description: "",
      icon: {
        src: "",
        alt: "",
      },
    },
    {
      title: "",
      href: "",
      description: "",
      icon: {
        src: "",
        alt: "",
      },
    },
    {
      title: "",
      href: "",
      description: "",
      icon: {
        src: "",
        alt: "",
      },
    },
  ],
  Frameworks: [
    {
      title: "Next.js",
      href: "https://nextjs.org/",
      description: "The React Framework for the Web.",
      icon: {
        src: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/nextjs-light.svg",
        alt: "Next.js Logo",
      },
    },
    {
      title: "Astro",
      href: "https://astro.build/",
      description: "The web-framework for content driven websites.",
      icon: {
        src: "/astro-icon-light-gradient.svg",
        alt: "Astro Logo",
      },
    },
  ],
  Frontend: [
    {
      title: "React.js",
      href: "https://react.dev/",
      description: "The library for web and native user interfaces.",
      icon: {
        src: "https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/reactjs.svg",
        alt: "React.js Logo",
      },
    },
    {
      title: "GSAP",
      href: "https://gsap.com/",
      description:
        "A wildly robust JavaScript animation library built for professionals",
      icon: {
        src: "",
        alt: "",
      },
    },
    {
      title: "",
      href: "",
      description: "",
      icon: {
        src: "",
        alt: "",
      },
    },
    {
      title: "",
      href: "",
      description: "",
      icon: {
        src: "",
        alt: "",
      },
    },
  ],
  Backend: [
    {
      title: "",
      href: "",
      description: "",
      icon: {
        src: "",
        alt: "",
      },
    },
    {
      title: "",
      href: "",
      description: "",
      icon: {
        src: "",
        alt: "",
      },
    },
    {
      title: "",
      href: "",
      description: "",
      icon: {
        src: "",
        alt: "",
      },
    },
    {
      title: "",
      href: "",
      description: "",
      icon: {
        src: "",
        alt: "",
      },
    },
    {
      title: "",
      href: "",
      description: "",
      icon: {
        src: "",
        alt: "",
      },
    },
  ],
  Databases: [
    {
      title: "",
      href: "",
      description: "",
      icon: {
        src: "",
        alt: "",
      },
    },
    {
      title: "",
      href: "",
      description: "",
      icon: {
        src: "",
        alt: "",
      },
    },
    {
      title: "",
      href: "",
      description: "",
      icon: {
        src: "",
        alt: "",
      },
    },
    {
      title: "",
      href: "",
      description: "",
      icon: {
        src: "",
        alt: "",
      },
    },
    {
      title: "",
      href: "",
      description: "",
      icon: {
        src: "",
        alt: "",
      },
    },
  ],
  Cloud: [
    {
      title: "",
      href: "",
      description: "",
      icon: {
        src: "",
        alt: "",
      },
    },
    {
      title: "",
      href: "",
      description: "",
      icon: {
        src: "",
        alt: "",
      },
    },
    {
      title: "",
      href: "",
      description: "",
      icon: {
        src: "",
        alt: "",
      },
    },
    {
      title: "",
      href: "",
      description: "",
      icon: {
        src: "",
        alt: "",
      },
    },
    {
      title: "",
      href: "",
      description: "",
      icon: {
        src: "",
        alt: "",
      },
    },
  ],
};
