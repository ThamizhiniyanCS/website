export interface Link {
  title: string
  description?: string
  href: string
  children: {
    title: string
    href: string
  }[]
}

export type Links = Link[]
