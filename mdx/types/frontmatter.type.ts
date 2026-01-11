type Frontmatter = {
  title: string
  description: string
  date: Date
  lastmod: Date
  previousPage?: {
    title: string
    slug: string
  }
  nextPage?: {
    title: string
    slug: string
  }
}

export default Frontmatter
