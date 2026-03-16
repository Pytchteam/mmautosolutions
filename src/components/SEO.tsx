import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
}

export const SEO = ({ 
  title = "M&M Auto Solutions | Jamaica's Premier Asset-Backed Financing", 
  description = "Drive Now, Pay Later. Access premium vehicles, parts, and emergency repairs with M² Solutions' structured monthly payment plans. Insurance for the unforeseen.",
  image = "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=1200",
  url = "https://ais-pre-g5djnld6oaqzv2pbj3tcpf-286442532303.us-east1.run.app",
  type = "website"
}: SEOProps) => {
  const siteTitle = title.includes("M&M Auto Solutions") ? title : `${title} | M&M Auto Solutions`;

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{siteTitle}</title>
      <meta name='description' content={description} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};
