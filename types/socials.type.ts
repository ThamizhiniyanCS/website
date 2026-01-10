export interface Social {
  title: string
  href: string
  logo: {
    alt: string
    src: {
      light: string
      dark: string
    }
  }
}

export type Socials = Social[]
