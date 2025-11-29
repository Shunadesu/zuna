// SEO utility functions for generating structured data

const baseUrl = import.meta.env.VITE_SITE_URL || 'https://zunaweb.com'

export const generateOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Zuna Web',
  url: baseUrl,
  logo: `${baseUrl}/logo.png`,
  description: 'Premium Digital Marketplace for web templates, digital resources, and creative assets',
  sameAs: [
    // Add social media links here
    // 'https://twitter.com/zunaweb',
    // 'https://facebook.com/zunaweb',
    // 'https://instagram.com/zunaweb',
  ]
})

export const generateWebsiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Zuna Web',
  url: baseUrl,
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${baseUrl}/products?search={search_term_string}`
    },
    'query-input': 'required name=search_term_string'
  }
})

export const generateProductSchema = (product) => ({
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: product.title,
  description: product.description || product.shortDescription,
  image: product.coverImage ? [product.coverImage, ...(product.images || [])] : [],
  brand: {
    '@type': 'Brand',
    name: 'Zuna Web'
  },
  offers: {
    '@type': 'Offer',
    url: `${baseUrl}/products/${product.slug}`,
    priceCurrency: 'USD',
    price: product.salePrice || product.price,
    availability: 'https://schema.org/InStock',
    seller: {
      '@type': 'Organization',
      name: 'Zuna Web'
    }
  },
  aggregateRating: product.rating ? {
    '@type': 'AggregateRating',
    ratingValue: product.rating.average || 0,
    reviewCount: product.rating.count || 0
  } : undefined,
  category: product.category
})

export const generateArticleSchema = (story) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: story.title,
  description: story.excerpt || story.content?.substring(0, 200),
  image: story.coverImage ? [story.coverImage] : [],
  datePublished: story.createdAt,
  dateModified: story.updatedAt || story.createdAt,
  author: {
    '@type': 'Person',
    name: story.author?.username || 'Zuna Web Team'
  },
  publisher: {
    '@type': 'Organization',
    name: 'Zuna Web',
    logo: {
      '@type': 'ImageObject',
      url: `${baseUrl}/logo.png`
    }
  },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': `${baseUrl}/stories/${story.slug}`
  }
})

export const generateBreadcrumbSchema = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url
  }))
})

export const generateCollectionPageSchema = (items, pageType = 'ItemList') => ({
  '@context': 'https://schema.org',
  '@type': pageType,
  numberOfItems: items.length,
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    item: {
      '@type': item.type || 'Product',
      name: item.name || item.title,
      url: item.url || `${baseUrl}/${item.slug}`
    }
  }))
})

