import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://www.amulyaa.com';
const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`;
const SITE_NAME = 'Amulyaa';

export interface SEOMetaProps {
    /** Page-level title — will be formatted as "Title | Amulyaa" */
    title: string;
    /** Page description (≤ 160 chars recommended) */
    description: string;
    /** Absolute canonical URL for this page */
    canonical: string;
    /** Open Graph image URL (absolute). Falls back to default. */
    ogImage?: string;
    /** Open Graph type. Default: "website" */
    ogType?: 'website' | 'article' | 'product';
    /** Robots directive. Default: "index, follow" */
    robots?: string;
    /** Structured data JSON-LD object (optional) */
    structuredData?: object;
}

/**
 * Drop this component at the top of any page to inject SEO meta tags,
 * Open Graph, Twitter Card, and a canonical link into <head>.
 */
const SEOMeta = ({
    title,
    description,
    canonical,
    ogImage = DEFAULT_IMAGE,
    ogType = 'website',
    robots = 'index, follow',
    structuredData,
}: SEOMetaProps) => {
    const fullTitle = `${title} | ${SITE_NAME}`;
    const absoluteCanonical = canonical.startsWith('http') ? canonical : `${SITE_URL}${canonical}`;

    return (
        <Helmet>
            {/* ── Primary ── */}
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <meta name="robots" content={robots} />
            <link rel="canonical" href={absoluteCanonical} />

            {/* ── Open Graph ── */}
            <meta property="og:site_name" content={SITE_NAME} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:type" content={ogType} />
            <meta property="og:url" content={absoluteCanonical} />
            <meta property="og:image" content={ogImage} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:locale" content="en_US" />

            {/* ── Twitter Card ── */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={ogImage} />
            <meta name="twitter:site" content="@amulyaaart" />

            {/* ── JSON-LD Structured Data ── */}
            {structuredData && (
                <script type="application/ld+json">
                    {JSON.stringify(structuredData)}
                </script>
            )}
        </Helmet>
    );
};

export default SEOMeta;
