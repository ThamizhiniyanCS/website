export type Certificate = {
  title: string
  href: string
  validity: string
  badge: {
    src: string
    alt: string
  }
}

export type Certificates = Certificate[]
