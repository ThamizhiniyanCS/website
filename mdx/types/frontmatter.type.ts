type Frontmatter = {
  title: string
  desciption: string
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
