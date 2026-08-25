import configPromise from "@payload-config";
import { getPayload } from "payload";

type PayloadClient = Awaited<ReturnType<typeof getPayload>>;

type QueryPayload = {
  find: (args: {
    collection: string;
    depth?: number;
    draft?: boolean;
    limit?: number;
    sort?: string;
    where?: Record<string, unknown>;
  }) => Promise<{ docs: Record<string, unknown>[] }>;
  findGlobal: (args: {
    draft?: boolean;
    slug: string;
  }) => Promise<Record<string, unknown>>;
};

export type HomeContent = {
  heroAdditionalCopy: string;
  heroCTA: string;
  heroHeadline: string;
  heroKicker: string;
  heroSupportingCopy: string;
  methodSteps: string[];
};

export type PageContent = {
  headline: string;
  intro: string;
  kicker: string;
};

export type AtelierContent = PageContent & {
  aetherNarrative: string;
};

export type ContactContent = PageContent & {
  email: string;
  successMessage: string;
};

export type ServiceSummary = {
  area: string;
  id: string;
  name: string;
  summary: string;
};

export type MediaSummary = {
  alt: string;
  height?: number;
  url: string;
  width?: number;
};

export type ProjectSummary = {
  clientName: string;
  heroImage?: MediaSummary;
  id: string;
  overview: string;
  projectName: string;
  slug: string;
  year: string;
};

export type PersonSummary = {
  bio: string;
  id: string;
  name: string;
  role: string;
};

export type PartnerSummary = {
  id: string;
  logo?: MediaSummary;
  name: string;
  summary: string;
  url: string;
};

export type SiteSettingsContent = {
  contactEmail: string;
  footerTagline: string;
  socialLinks: Array<{
    label: string;
    url: string;
  }>;
};

let payloadPromise: Promise<PayloadClient> | null = null;

const serviceAreaLabels: Record<string, string> = {
  "brand-culture": "Brand Culture",
  "content-influence": "Content & Influence",
  "creative-visual": "Creative & Visual",
  "digital-growth": "Digital & Growth",
  "experiences-partnerships": "Experiences & Partnerships",
};

export const fallbackHomePage: HomeContent = {
  heroAdditionalCopy:
    "Strategy, creativity, cultural context and execution come together across brands, campaigns, content and experiences.",
  heroCTA: "Discover ETÉRA",
  heroHeadline: "Define your era.",
  heroKicker: "Creative Atelier",
  heroSupportingCopy:
    "ETÉRA is a creative atelier that builds presence and shapes culture.",
  methodSteps: ["Discover", "Define", "Create", "Elevate"],
};

export const fallbackWorkPage: PageContent = {
  headline: "Selected Work",
  intro:
    "A selection of projects, campaigns, and brand work. Final project content and visuals are pending from ETÉRA.",
  kicker: "Work",
};

export const fallbackAtelierPage: AtelierContent = {
  aetherNarrative:
    "The Aether narrative and founder/team content will be shaped once the final brand materials arrive.",
  headline: "Strategy, creativity and attention to every detail.",
  intro:
    "ETÉRA is an independent creative atelier built around the belief that strong brands are shaped through the right balance of strategy, creativity, cultural context, and effort.",
  kicker: "The Atelier",
};

export const fallbackServicesPage: PageContent = {
  headline: "A compact services structure for launch.",
  intro:
    "Services are grouped into clear editorial areas so the first version stays focused and visual.",
  kicker: "Services",
};

export const fallbackContactPage: ContactContent = {
  email: "hello@eteracreative.com",
  headline: "Let's define your era.",
  intro:
    "The project inquiry form, booking path, and success state will be wired after the preferred workflow and booking tool are confirmed.",
  kicker: "Contact",
  successMessage:
    "Thank you. We've received your inquiry and will get back to you once we've reviewed the project details.",
};

export const fallbackSiteSettings: SiteSettingsContent = {
  contactEmail: "hello@eteracreative.com",
  footerTagline: "Define your era.",
  socialLinks: [],
};

export const fallbackServices: ServiceSummary[] = [
  {
    area: "Brand Culture",
    id: "brand-culture",
    name: "Brand Culture",
    summary:
      "Brand strategy, positioning, identity, creative strategy and market research.",
  },
  {
    area: "Creative & Visual",
    id: "creative-visual",
    name: "Creative & Visual",
    summary: "Creative direction, photography, videography and design.",
  },
  {
    area: "Content & Influence",
    id: "content-influence",
    name: "Content & Influence",
    summary:
      "Social strategy, content creation, UGC, influencer marketing, PR and communications.",
  },
  {
    area: "Experiences & Partnerships",
    id: "experiences-partnerships",
    name: "Experiences & Partnerships",
    summary:
      "Events, experiential marketing, partnerships and creative collaborations.",
  },
  {
    area: "Digital & Growth",
    id: "digital-growth",
    name: "Digital & Growth",
    summary:
      "Performance marketing, paid media, CRM, automation, website strategy and optimisation.",
  },
];

async function getPayloadClient() {
  if (!process.env.PAYLOAD_SECRET) {
    return null;
  }

  payloadPromise ??= getPayload({ config: configPromise });

  return payloadPromise;
}

async function queryPayload<T>(
  query: (payload: QueryPayload) => Promise<T>,
  fallback: T,
) {
  try {
    const payload = await getPayloadClient();

    if (!payload) {
      return fallback;
    }

    return await query(payload as unknown as QueryPayload);
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("Payload CMS unavailable; using fallback content.", error);
    }

    return fallback;
  }
}

function stringValue(value: unknown, fallback = "") {
  if (typeof value === "string" && value.trim().length > 0) {
    return value;
  }

  if (typeof value === "number") {
    return String(value);
  }

  return fallback;
}

function pageContent(
  doc: Record<string, unknown>,
  fallback: PageContent,
): PageContent {
  return {
    headline: stringValue(doc.headline, fallback.headline),
    intro: stringValue(doc.intro, fallback.intro),
    kicker: stringValue(doc.kicker, fallback.kicker),
  };
}

function serviceAreaLabel(value: unknown) {
  return typeof value === "string" && serviceAreaLabels[value]
    ? serviceAreaLabels[value]
    : stringValue(value);
}

function mediaSummary(value: unknown): MediaSummary | undefined {
  if (typeof value !== "object" || value === null) {
    return undefined;
  }

  const media = value as Record<string, unknown>;
  const url = stringValue(media.url);

  if (!url) {
    return undefined;
  }

  return {
    alt: stringValue(media.alt, "ETÉRA Creative"),
    height: typeof media.height === "number" ? media.height : undefined,
    url,
    width: typeof media.width === "number" ? media.width : undefined,
  };
}

export async function getHomePage() {
  return queryPayload<HomeContent>(async (payload) => {
    const page = await payload.findGlobal({
      draft: false,
      slug: "home-page",
    });

    const methodSteps = Array.isArray(page.methodSteps)
      ? page.methodSteps
          .map((step) =>
            typeof step === "object" && step !== null
              ? stringValue((step as Record<string, unknown>).label)
              : "",
          )
          .filter(Boolean)
      : fallbackHomePage.methodSteps;

    return {
      heroAdditionalCopy: stringValue(
        page.heroAdditionalCopy,
        fallbackHomePage.heroAdditionalCopy,
      ),
      heroCTA: stringValue(page.heroCTA, fallbackHomePage.heroCTA),
      heroHeadline: stringValue(
        page.heroHeadline,
        fallbackHomePage.heroHeadline,
      ),
      heroKicker: stringValue(page.heroKicker, fallbackHomePage.heroKicker),
      heroSupportingCopy: stringValue(
        page.heroSupportingCopy,
        fallbackHomePage.heroSupportingCopy,
      ),
      methodSteps:
        methodSteps.length > 0 ? methodSteps : fallbackHomePage.methodSteps,
    };
  }, fallbackHomePage);
}

export async function getWorkPage() {
  return queryPayload(
    async (payload) =>
      pageContent(
        await payload.findGlobal({
          draft: false,
          slug: "work-page",
        }),
        fallbackWorkPage,
      ),
    fallbackWorkPage,
  );
}

export async function getAtelierPage() {
  return queryPayload<AtelierContent>(async (payload) => {
    const page = await payload.findGlobal({
      draft: false,
      slug: "atelier-page",
    });

    return {
      ...pageContent(page, fallbackAtelierPage),
      aetherNarrative: stringValue(
        page.aetherNarrative,
        fallbackAtelierPage.aetherNarrative,
      ),
    };
  }, fallbackAtelierPage);
}

export async function getServicesPage() {
  return queryPayload(
    async (payload) =>
      pageContent(
        await payload.findGlobal({
          draft: false,
          slug: "services-page",
        }),
        fallbackServicesPage,
      ),
    fallbackServicesPage,
  );
}

export async function getContactPage() {
  return queryPayload<ContactContent>(async (payload) => {
    const page = await payload.findGlobal({
      draft: false,
      slug: "contact-page",
    });

    return {
      ...pageContent(page, fallbackContactPage),
      email: stringValue(page.email, fallbackContactPage.email),
      successMessage: stringValue(
        page.successMessage,
        fallbackContactPage.successMessage,
      ),
    };
  }, fallbackContactPage);
}

export async function getServices() {
  return queryPayload<ServiceSummary[]>(async (payload) => {
    const result = await payload.find({
      collection: "services",
      draft: false,
      limit: 100,
      sort: "sortOrder",
      where: {
        featured: {
          equals: true,
        },
      },
    });

    const services = result.docs
      .map((service) => ({
        area: serviceAreaLabel(service.area),
        id: stringValue(service.id),
        name: stringValue(service.name),
        summary: stringValue(service.summary),
      }))
      .filter((service) => service.id && service.name);

    return services.length > 0 ? services : fallbackServices;
  }, fallbackServices);
}

export async function getProjects() {
  return queryPayload<ProjectSummary[]>(async (payload) => {
    const result = await payload.find({
      collection: "projects",
      depth: 1,
      draft: false,
      limit: 50,
      sort: "sortOrder",
      where: {
        status: {
          equals: "published",
        },
      },
    });

    return result.docs
      .map((project) => ({
        clientName: stringValue(project.clientName),
        heroImage: mediaSummary(project.heroImage),
        id: stringValue(project.id),
        overview: stringValue(project.overview),
        projectName: stringValue(project.projectName),
        slug: stringValue(project.slug),
        year: stringValue(project.year),
      }))
      .filter((project) => project.id && project.projectName);
  }, []);
}

export async function getPartners() {
  return queryPayload<PartnerSummary[]>(async (payload) => {
    const result = await payload.find({
      collection: "partners",
      depth: 1,
      limit: 50,
      sort: "sortOrder",
      where: {
        featured: {
          equals: true,
        },
      },
    });

    return result.docs
      .map((partner) => ({
        id: stringValue(partner.id),
        logo: mediaSummary(partner.logo),
        name: stringValue(partner.name),
        summary: stringValue(partner.summary),
        url: stringValue(partner.url),
      }))
      .filter((partner) => partner.id && partner.name);
  }, []);
}

export async function getSiteSettings() {
  return queryPayload<SiteSettingsContent>(async (payload) => {
    const settings = await payload.findGlobal({
      slug: "site-settings",
    });
    const socialLinks = Array.isArray(settings.socialLinks)
      ? settings.socialLinks
          .map((link) => {
            if (typeof link !== "object" || link === null) {
              return null;
            }

            const record = link as Record<string, unknown>;
            const label = stringValue(record.label);
            const url = stringValue(record.url);

            return label && url ? { label, url } : null;
          })
          .filter((link): link is { label: string; url: string } => Boolean(link))
      : [];

    return {
      contactEmail: stringValue(
        settings.contactEmail,
        fallbackSiteSettings.contactEmail,
      ),
      footerTagline: stringValue(
        settings.footerTagline,
        fallbackSiteSettings.footerTagline,
      ),
      socialLinks,
    };
  }, fallbackSiteSettings);
}

export async function getPeople() {
  return queryPayload<PersonSummary[]>(async (payload) => {
    const result = await payload.find({
      collection: "people",
      limit: 50,
      sort: "sortOrder",
      where: {
        featured: {
          equals: true,
        },
      },
    });

    return result.docs
      .map((person) => ({
        bio: stringValue(person.bio),
        id: stringValue(person.id),
        name: stringValue(person.name),
        role: stringValue(person.role),
      }))
      .filter((person) => person.id && person.name);
  }, []);
}
