/**
 * SEO metadata configuration
 */
export const seoConfig = {
  title: 'Akansh Tiwary | Full-Stack Developer Portfolio',
  description: 'Full-stack developer portfolio showcasing projects, technical skills, and professional experience with modern web technologies.',
  keywords: 'developer, portfolio, React, web development, full stack, Node.js, JavaScript, Akansh Tiwary',
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
