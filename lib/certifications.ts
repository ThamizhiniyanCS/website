import { Certificates } from "@/types/certifications.type"

export const certificationsData: Certificates = [
  {
    title: "Certified Ethical Hacker (Master)",
    validity: "2024 - 2027",
    href: "https://aspen.eccouncil.org/VerifyBadge?type=certification&a=lDUMGA02ZrQ5jP7bkbcoZfW3yjIB2u9cxFYTWc6XFuY=",
    badge: {
      src: "/certificates/ceh-master.png",
      alt: "Certified Ethical Hacker (Master) Badge",
    },
  },
  {
    title:
      "Microsoft Certified: Security, Compliance, and Identity Fundamentals",
    validity: "Lifetime",
    href: "https://learn.microsoft.com/api/credentials/share/en-gb/ThamizhiniyanCS-1631/CFF28567621E4E2D",
    badge: {
      src: "/certificates/microsoft-certified-fundamentals-badge.svg",
      alt: "Microsoft Certified: Security, Compliance, and Identity Fundamentals",
    },
  },
  {
    title: "Microsoft Certified: Azure Data Fundamentals",
    validity: "Lifetime",
    href: "https://learn.microsoft.com/api/credentials/share/en-gb/ThamizhiniyanCS-1631/A008F0B23CEF411E",
    badge: {
      src: "/certificates/microsoft-certified-fundamentals-badge.svg",
      alt: "Microsoft Certified: Azure Data Fundamentals",
    },
  },
]
