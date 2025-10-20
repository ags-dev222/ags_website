import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';

const SEO = ({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
  author,
  publishedTime,
  modifiedTime,
  section,
  tags
}) => {
  const defaultTitle = 'Association of Ghana Startups - Empowering Innovation';
  const defaultDescription = 'Join Ghana\'s premier startup ecosystem. Access resources, events, networking opportunities, and support to grow your startup in Ghana and across Africa.';
  const defaultKeywords = 'Ghana startups, entrepreneurship, innovation, startup ecosystem, business development, venture capital, startup accelerator, Ghana tech, African startups';
  const defaultImage = '/images/ags-og-image.jpg';
  const baseUrl = import.meta.env.VITE_FRONTEND_URL || 'http://localhost:5174';
  
  const fullTitle = title ? `${title} | ${defaultTitle}` : defaultTitle;
  const finalDescription = description || defaultDescription;
  const finalKeywords = keywords ? `${keywords}, ${defaultKeywords}` : defaultKeywords;
  const finalImage = image ? `${baseUrl}${image}` : `${baseUrl}${defaultImage}`;
  const finalUrl = url ? `${baseUrl}${url}` : baseUrl;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={finalKeywords} />
      <meta name="author" content={author || 'Association of Ghana Startups'} />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta charSet="utf-8" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={finalUrl} />
      
      {/* Open Graph Tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={finalImage} />
      <meta property="og:url" content={finalUrl} />
      <meta property="og:site_name" content="Association of Ghana Startups" />
      <meta property="og:locale" content="en_US" />
      
      {/* Article specific tags */}
      {type === 'article' && (
        <>
          {author && <meta property="article:author" content={author} />}
          {publishedTime && <meta property="article:published_time" content={publishedTime} />}
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
          {section && <meta property="article:section" content={section} />}
          {tags && tags.map(tag => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
        </>
      )}
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@agsghana" />
      <meta name="twitter:creator" content="@agsghana" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={finalImage} />
      
      {/* Additional SEO Tags */}
      <meta name="geo.region" content="GH" />
      <meta name="geo.placename" content="Accra, Ghana" />
      <meta name="geo.position" content="5.6037;-0.1870" />
      <meta name="ICBM" content="5.6037, -0.1870" />
      
      {/* Business/Organization Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Association of Ghana Startups",
          "alternateName": "AGS",
          "url": baseUrl,
          "logo": `${baseUrl}/images/ags-logo.png`,
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+233-XXX-XXX-XXX",
            "contactType": "customer service",
            "availableLanguage": ["English"]
          },
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Accra",
            "addressCountry": "GH"
          },
          "sameAs": [
            "https://facebook.com/agsghana",
            "https://twitter.com/agsghana",
            "https://linkedin.com/company/agsghana",
            "https://instagram.com/agsghana"
          ]
        })}
      </script>
      
      {/* Favicon and App Icons */}
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <meta name="theme-color" content="#10B981" />
      
      {/* Performance Optimization */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      <link rel="preconnect" href="//fonts.googleapis.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="//fonts.gstatic.com" crossOrigin="anonymous" />
    </Helmet>
  );
};

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  keywords: PropTypes.string,
  image: PropTypes.string,
  url: PropTypes.string,
  type: PropTypes.oneOf(['website', 'article', 'profile']),
  author: PropTypes.string,
  publishedTime: PropTypes.string,
  modifiedTime: PropTypes.string,
  section: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string)
};

export default SEO;
