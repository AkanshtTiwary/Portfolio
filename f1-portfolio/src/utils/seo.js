/**
 * SEO metadata configuration
 */
export const seoConfig = {
  title: 'Akansh Tiwary | F1 Portfolio',
  description: 'An F1-inspired portfolio showcasing projects, skills, and experience with racing aesthetics and smooth animations.',
  keywords: 'developer, portfolio, F1, racing, React, web development, full stack, Akansh Tiwary',
  author: 'Akansh Tiwary',
  siteUrl: 'https://akanshtiwary.com',
  image: '/og-image.png',
};

/**
 * Generate meta tags for SEO
 */
export const generateMetaTags = () => {
  return [
    { name: 'description', content: seoConfig.description },
    { name: 'keywords', content: seoConfig.keywords },
    { name: 'author', content: seoConfig.author },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: seoConfig.siteUrl },
    { property: 'og:title', content: seoConfig.title },
    { property: 'og:description', content: seoConfig.description },
    { property: 'og:image', content: seoConfig.image },
    { property: 'twitter:card', content: 'summary_large_image' },
    { property: 'twitter:url', content: seoConfig.siteUrl },
    { property: 'twitter:title', content: seoConfig.title },
    { property: 'twitter:description', content: seoConfig.description },
    { property: 'twitter:image', content: seoConfig.image },
  ];
};
