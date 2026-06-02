import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/demo', '/signup', '/login', '/terms', '/privacy'],
        disallow: ['/dashboard', '/exam', '/results/', '/api/', '/admin'],
      },
    ],
    sitemap: 'https://strataready.ca/sitemap.xml',
  }
}
