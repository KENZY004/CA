import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
}

export default function SEO({ 
  title = "Challengers Volleyball Academy | Elite Training", 
  description = "Join Challengers Volleyball Academy for elite tiered training, high-performance coaching, and a community of dedicated athletes. Elevate your game today.",
  keywords = "volleyball academy, volleyball training, elite volleyball, athlete development, sports academy"
}: SEOProps) {
  const siteTitle = "Challengers Volleyball Academy";
  const fullTitle = title === siteTitle ? title : `${title} | ${siteTitle}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
}
