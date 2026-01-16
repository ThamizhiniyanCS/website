export type SkillType = {
  title: string
  href: string
  description: string
  icon: {
    src: {
      dark: string
      light: string
    }
    alt: string
  }
}

export type SkillsCategoriesType = Record<string, SkillType[]>
