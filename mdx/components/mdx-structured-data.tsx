import type Frontmatter from "../types/frontmatter.type"

export default function MdxStructuredData({
  title,
  description,
  date,
  lastmod,
}: Frontmatter) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: description,
    author: {
      "@type": "Person",
      name: "Thamizhiniyan C S",
    },
    publisher: {
      "@type": "Person",
      name: "Thamizhiniyan C S",
      // logo: {
      //   "@type": "ImageObject",
      //   url: "https://myapp.com/logo.png",
      // },
    },
    datePublished: date,
    dateModified: lastmod,
    // image: image || "https://myapp.com/default-image.png",
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
