import { SITE } from '../config/site';
import { faqs, offerIncludes } from '../data/content';

export function buildStructuredData(): string {
  const pageUrl = `${SITE.url}/`;
  const orgId = `${SITE.mainSiteUrl}/#organization`;
  const personId = `${SITE.mainSiteUrl}/#peter-lehocky`;

  const graph = [
    {
      '@type': 'ProfessionalService',
      '@id': orgId,
      name: SITE.name,
      legalName: SITE.company.legalName,
      url: SITE.mainSiteUrl,
      email: SITE.email,
      taxID: SITE.company.dic,
      vatID: SITE.company.icDph,
      identifier: { '@type': 'PropertyValue', propertyID: 'IČO', value: SITE.company.ico },
      logo: `${SITE.url}/icon-512.png`,
      image: `${SITE.url}${SITE.ogImage}`,
      founder: { '@id': personId },
      areaServed: { '@type': 'Country', name: 'Slovensko' },
      address: {
        '@type': 'PostalAddress',
        streetAddress: SITE.company.street,
        postalCode: SITE.company.postalCode,
        addressLocality: SITE.company.city,
        addressCountry: 'SK',
      },
    },
    {
      '@type': 'Person',
      '@id': personId,
      name: SITE.author,
      jobTitle: 'Webový vývojár',
      worksFor: { '@id': orgId },
      url: SITE.mainSiteUrl,
    },
    {
      '@type': 'WebPage',
      '@id': `${pageUrl}#webpage`,
      url: pageUrl,
      name: SITE.title,
      description: SITE.description,
      inLanguage: 'sk-SK',
      isPartOf: { '@type': 'WebSite', name: SITE.name, url: SITE.mainSiteUrl },
      about: { '@id': `${pageUrl}#service` },
      primaryImageOfPage: { '@type': 'ImageObject', url: `${SITE.url}${SITE.ogImage}` },
    },
    {
      '@type': 'Service',
      '@id': `${pageUrl}#service`,
      name: 'Audit webu a Google profilu zadarmo',
      serviceType: 'Audit webu',
      description: offerIncludes.join('. '),
      provider: { '@id': orgId },
      areaServed: { '@type': 'Country', name: 'Slovensko' },
      audience: { '@type': 'BusinessAudience', name: 'Malé a stredné firmy a živnostníci' },
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'EUR',
        availability: 'https://schema.org/InStock',
        url: `${pageUrl}#formular`,
      },
    },
    {
      '@type': 'FAQPage',
      '@id': `${pageUrl}#faq`,
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    },
  ];

  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c');
}
