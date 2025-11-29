import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const SEO = ({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
  siteName = 'Zuna Web',
  author,
  publishedTime,
  modifiedTime,
  structuredData
}) => {
  const location = useLocation()
  const baseUrl = import.meta.env.VITE_SITE_URL || 'https://zunaweb.com'
  const fullUrl = url || `${baseUrl}${location.pathname}`
  const ogImage = image || `${baseUrl}/og-image.jpg`
  const fullTitle = title ? `${title} | ${siteName}` : `${siteName} - Digital Solutions & Marketplace`

  useEffect(() => {
    // Update document title
    document.title = fullTitle

    // Update or create meta tags
    const updateMetaTag = (name, content, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name'
      let element = document.querySelector(`meta[${attribute}="${name}"]`)
      
      if (!element) {
        element = document.createElement('meta')
        element.setAttribute(attribute, name)
        document.head.appendChild(element)
      }
      
      element.setAttribute('content', content)
    }

    // Basic meta tags
    if (description) {
      updateMetaTag('description', description)
    }
    if (keywords) {
      updateMetaTag('keywords', keywords)
    }
    if (author) {
      updateMetaTag('author', author)
    }

    // Open Graph tags
    updateMetaTag('og:title', fullTitle, true)
    if (description) {
      updateMetaTag('og:description', description, true)
    }
    updateMetaTag('og:type', type, true)
    updateMetaTag('og:url', fullUrl, true)
    updateMetaTag('og:image', ogImage, true)
    updateMetaTag('og:site_name', siteName, true)
    if (publishedTime) {
      updateMetaTag('og:published_time', publishedTime, true)
    }
    if (modifiedTime) {
      updateMetaTag('og:modified_time', modifiedTime, true)
    }

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image')
    updateMetaTag('twitter:title', fullTitle)
    if (description) {
      updateMetaTag('twitter:description', description)
    }
    updateMetaTag('twitter:image', ogImage)

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', fullUrl)

    // Structured Data (JSON-LD)
    if (structuredData) {
      // Remove existing structured data scripts
      const existingScripts = document.querySelectorAll('script[type="application/ld+json"]')
      existingScripts.forEach(script => script.remove())
      
      // Handle array or single object
      const dataArray = Array.isArray(structuredData) ? structuredData : [structuredData]
      
      // Create script for each structured data object
      dataArray.forEach((data) => {
        const script = document.createElement('script')
        script.setAttribute('type', 'application/ld+json')
        script.textContent = JSON.stringify(data)
        document.head.appendChild(script)
      })
    }
  }, [title, description, keywords, image, url, type, siteName, author, publishedTime, modifiedTime, structuredData, fullTitle, fullUrl, ogImage, location.pathname])

  return null
}

export default SEO

