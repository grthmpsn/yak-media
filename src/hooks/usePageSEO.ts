import { useEffect } from 'react';

interface SEOProps {
    title: string;
    description: string;
    canonical?: string;
    ogImage?: string;
    ogType?: string;
    jsonLd?: Record<string, unknown>;
}

const BASE_URL = 'https://yak-media.vercel.app';
const DEFAULT_IMAGE = 'https://images.squarespace-cdn.com/content/v1/5db2f9bc79defe33dc53dce0/1c3725f4-d5c5-429a-b9cf-3fb2045436c1/Charley-Radcliffe-UTMG-small-3.jpg?format=1500w';

function setMeta(name: string, content: string, attribute = 'name') {
    let el = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement | null;
    if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attribute, name);
        document.head.appendChild(el);
    }
    el.setAttribute('content', content);
}

function setCanonical(href: string) {
    let el = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', 'canonical');
        document.head.appendChild(el);
    }
    el.setAttribute('href', href);
}

function setJsonLd(id: string, data: Record<string, unknown>) {
    let el = document.getElementById(id) as HTMLScriptElement | null;
    if (!el) {
        el = document.createElement('script');
        el.id = id;
        el.type = 'application/ld+json';
        document.head.appendChild(el);
    }
    el.textContent = JSON.stringify(data);
}

export function usePageSEO({ title, description, canonical, ogImage, ogType = 'website', jsonLd }: SEOProps) {
    useEffect(() => {
        const fullTitle = title.includes('Yak Media') ? title : `${title} | Yak Media`;
        document.title = fullTitle;

        setMeta('description', description);
        setCanonical(canonical || `${BASE_URL}${window.location.pathname}`);

        // Open Graph
        setMeta('og:title', fullTitle, 'property');
        setMeta('og:description', description, 'property');
        setMeta('og:url', canonical || `${BASE_URL}${window.location.pathname}`, 'property');
        setMeta('og:image', ogImage || DEFAULT_IMAGE, 'property');
        setMeta('og:type', ogType, 'property');

        // Twitter
        setMeta('twitter:title', fullTitle);
        setMeta('twitter:description', description);
        setMeta('twitter:image', ogImage || DEFAULT_IMAGE);

        // JSON-LD
        if (jsonLd) {
            setJsonLd('page-jsonld', jsonLd);
        }

        return () => {
            const pageJsonLd = document.getElementById('page-jsonld');
            if (pageJsonLd) pageJsonLd.remove();
        };
    }, [title, description, canonical, ogImage, ogType, jsonLd]);
}
