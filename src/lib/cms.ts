import configPromise from "@payload-config";
import { getPayload } from "payload";
import { cache } from "react";

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
    depth?: number;
    draft?: boolean;
    slug: string;
  }) => Promise<Record<string, unknown>>;
};

export type HomeContent = {
  featuredPartners: PartnerSummary[];
  featuredProjects: ProjectSummary[];
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
  featuredPeople: PersonSummary[];
};

export type ContactContent = PageContent & {
  email: string;
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

export type RichTextContent = Record<string, unknown>;

export type ProjectCollaborator = {
  name: string;
  role: string;
};

export type ProjectGalleryItem = {
  asset: MediaSummary;
  caption: string;
};

export type ProjectResult = {
  label: string;
  value: string;
};

export type ProjectService = ServiceSummary & {
  details: RichTextContent | null;
};

export type ProjectDetail = ProjectSummary & {
  approach: RichTextContent | null;
  collaborators: ProjectCollaborator[];
  context: RichTextContent | null;
  gallery: ProjectGalleryItem[];
  results: ProjectResult[];
  services: ProjectService[];
};

export type PersonSummary = {
  bio: string;
  id: string;
  name: string;
  portrait?: MediaSummary;
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
  bookingURL: string;
  contactEmail: string;
  footerTagline: string;
  seoDescription: string;
  seoTitle: string;
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
  featuredPartners: [],
  featuredProjects: [],
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
    "A selection of projects, campaigns and brand work. Approved case materials will be added as they become available.",
  kicker: "Work",
};

export const fallbackAtelierPage: AtelierContent = {
  aetherNarrative:
    "Like Aether, ETÉRA is the missing element: the invisible thread connecting identity, communication, visual language and perception.",
  headline: "Strategy, creativity and attention to every detail.",
  featuredPeople: [],
  intro:
    "ETÉRA is an independent creative atelier built around the belief that strong brands are shaped through the right balance of strategy, creativity, cultural context, and effort.",
  kicker: "The Atelier",
};

export const fallbackServicesPage: PageContent = {
  headline: "Built around the brief.",
  intro:
    "ETÉRA connects strategy, creativity, culture and execution through a compact set of capabilities shaped for each project.",
  kicker: "Services",
};

export const fallbackContactPage: ContactContent = {
  email: "hello@eteracreative.com",
  headline: "Let's define your era.",
  intro:
    "Start with a project brief or a direct conversation. ETÉRA will shape the right approach from there.",
  kicker: "Contact",
};

export const fallbackSiteSettings: SiteSettingsContent = {
  bookingURL: "",
  contactEmail: "hello@eteracreative.com",
  footerTagline: "Define your era.",
  seoDescription:
    "ETÉRA is a creative atelier that builds presence and shapes culture.",
  seoTitle: "ETÉRA Creative Atelier",
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
    console.error("Payload CMS unavailable; using fallback content.", error);

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

function launchStringValue(
  value: unknown,
  fallback: string,
  legacyPlaceholders: string[],
) {
  const current = stringValue(value);

  return current && !legacyPlaceholders.includes(current) ? current : fallback;
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

function httpURL(value: unknown) {
  const url = stringValue(value);

  if (!url) {
    return "";
  }

  try {
    const parsed = new URL(url);
    return parsed.protocol === "http:" || parsed.protocol === "https:"
      ? url
      : "";
  } catch {
    return "";
  }
}

function relatedDocuments(value: unknown) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter(
    (document): document is Record<string, unknown> =>
      typeof document === "object" && document !== null,
  );
}

function richTextContent(value: unknown): RichTextContent | null {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return null;
  }

  const content = value as Record<string, unknown>;

  if (
    typeof content.root !== "object" ||
    content.root === null ||
    Array.isArray(content.root)
  ) {
    return null;
  }

  return content;
}

function serviceSummary(
  service: Record<string, unknown>,
): ServiceSummary | null {
  if (service._status && service._status !== "published") {
    return null;
  }

  const summary = {
    area: serviceAreaLabel(service.area),
    id: stringValue(service.id),
    name: stringValue(service.name),
    summary: stringValue(service.summary),
  };

  return summary.id && summary.name ? summary : null;
}

function projectService(
  service: Record<string, unknown>,
): ProjectService | null {
  const summary = serviceSummary(service);

  return summary
    ? {
        ...summary,
        details: richTextContent(service.details),
      }
    : null;
}

function projectSummary(
  project: Record<string, unknown>,
): ProjectSummary | null {
  if (project._status && project._status !== "published") {
    return null;
  }

  const summary = {
    clientName: stringValue(project.clientName),
    heroImage: mediaSummary(project.heroImage),
    id: stringValue(project.id),
    overview: stringValue(project.overview),
    projectName: stringValue(project.projectName),
    slug: stringValue(project.slug),
    year: stringValue(project.year),
  };

  return summary.id && summary.projectName ? summary : null;
}

function partnerSummary(
  partner: Record<string, unknown>,
): PartnerSummary | null {
  const summary = {
    id: stringValue(partner.id),
    logo: mediaSummary(partner.logo),
    name: stringValue(partner.name),
    summary: stringValue(partner.summary),
    url: httpURL(partner.url),
  };

  return summary.id && summary.name ? summary : null;
}

function personSummary(person: Record<string, unknown>): PersonSummary | null {
  const summary = {
    bio: stringValue(person.bio),
    id: stringValue(person.id),
    name: stringValue(person.name),
    portrait: mediaSummary(person.portrait),
    role: stringValue(person.role),
  };

  return summary.id && summary.name ? summary : null;
}

function projectDetail(
  project: Record<string, unknown>,
): ProjectDetail | null {
  const summary = projectSummary(project);

  if (!summary) {
    return null;
  }

  const collaborators = relatedDocuments(project.collaborators)
    .map((collaborator): ProjectCollaborator | null => {
      const name = stringValue(collaborator.name);

      return name
        ? {
            name,
            role: stringValue(collaborator.role),
          }
        : null;
    })
    .filter(
      (collaborator): collaborator is ProjectCollaborator =>
        Boolean(collaborator),
    );
  const gallery = relatedDocuments(project.gallery)
    .map((item): ProjectGalleryItem | null => {
      const asset = mediaSummary(item.asset);

      return asset
        ? {
            asset,
            caption: stringValue(item.caption),
          }
        : null;
    })
    .filter((item): item is ProjectGalleryItem => Boolean(item));
  const results = relatedDocuments(project.results)
    .map((result): ProjectResult | null => {
      const label = stringValue(result.label);
      const value = stringValue(result.value);

      return label && value ? { label, value } : null;
    })
    .filter((result): result is ProjectResult => Boolean(result));
  const services = relatedDocuments(project.services)
    .map(projectService)
    .filter((service): service is ProjectService => Boolean(service));

  return {
    ...summary,
    approach: richTextContent(project.approach),
    collaborators,
    context: richTextContent(project.context),
    gallery,
    results,
    services,
  };
}

export const getHomePage = cache(async () => {
  return queryPayload<HomeContent>(async (payload) => {
    const page = await payload.findGlobal({
      depth: 2,
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
      featuredPartners: relatedDocuments(page.featuredPartners)
        .map(partnerSummary)
        .filter((partner): partner is PartnerSummary => Boolean(partner)),
      featuredProjects: relatedDocuments(page.featuredProjects)
        .map(projectSummary)
        .filter((project): project is ProjectSummary => Boolean(project)),
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
});

export const getWorkPage = cache(async () => {
  return queryPayload(
    async (payload) => {
      const page = await payload.findGlobal({
        draft: false,
        slug: "work-page",
      });
      const content = pageContent(page, fallbackWorkPage);

      return {
        ...content,
        intro: launchStringValue(page.intro, fallbackWorkPage.intro, [
          "A selection of projects, campaigns, and brand work. Final project content and visuals are pending from ETÉRA.",
        ]),
      };
    },
    fallbackWorkPage,
  );
});

export const getAtelierPage = cache(async () => {
  return queryPayload<AtelierContent>(async (payload) => {
    const page = await payload.findGlobal({
      depth: 2,
      draft: false,
      slug: "atelier-page",
    });

    return {
      ...pageContent(page, fallbackAtelierPage),
      aetherNarrative: launchStringValue(
        page.aetherNarrative,
        fallbackAtelierPage.aetherNarrative,
        [
          "The Aether narrative and founder/team content will be shaped once the final brand materials arrive.",
        ],
      ),
      featuredPeople: relatedDocuments(page.featuredPeople)
        .map(personSummary)
        .filter((person): person is PersonSummary => Boolean(person)),
    };
  }, fallbackAtelierPage);
});

export const getServicesPage = cache(async () => {
  return queryPayload(
    async (payload) => {
      const page = await payload.findGlobal({
        draft: false,
        slug: "services-page",
      });
      const content = pageContent(page, fallbackServicesPage);

      return {
        ...content,
        headline: launchStringValue(
          page.headline,
          fallbackServicesPage.headline,
          ["A compact services structure for launch."],
        ),
        intro: launchStringValue(page.intro, fallbackServicesPage.intro, [
          "Services are grouped into clear editorial areas so the first version stays focused and visual.",
        ]),
      };
    },
    fallbackServicesPage,
  );
});

export const getContactPage = cache(async () => {
  return queryPayload<ContactContent>(async (payload) => {
    const page = await payload.findGlobal({
      draft: false,
      slug: "contact-page",
    });

    return {
      ...pageContent(page, fallbackContactPage),
      email: stringValue(page.email, fallbackContactPage.email),
      intro: launchStringValue(page.intro, fallbackContactPage.intro, [
        "The project inquiry form, booking path, and success state will be wired after the preferred workflow and booking tool are confirmed.",
      ]),
    };
  }, fallbackContactPage);
});

export const getServices = cache(async () => {
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
      .map(serviceSummary)
      .filter((service): service is ServiceSummary => Boolean(service));

    return services;
  }, fallbackServices);
});

export const getProjects = cache(async () => {
  return queryPayload<ProjectSummary[]>(async (payload) => {
    const result = await payload.find({
      collection: "projects",
      depth: 1,
      draft: false,
      limit: 50,
      sort: "sortOrder",
    });

    return result.docs
      .map(projectSummary)
      .filter((project): project is ProjectSummary => Boolean(project));
  }, []);
});

export const getProjectBySlug = cache(async (slug: string) => {
  const normalizedSlug = slug.trim();

  if (!normalizedSlug) {
    return null;
  }

  return queryPayload<ProjectDetail | null>(async (payload) => {
    const result = await payload.find({
      collection: "projects",
      depth: 2,
      draft: false,
      limit: 1,
      where: {
        and: [
          {
            slug: {
              equals: normalizedSlug,
            },
          },
          {
            _status: {
              equals: "published",
            },
          },
        ],
      },
    });
    const project = result.docs[0];

    return project ? projectDetail(project) : null;
  }, null);
});

export const getSiteSettings = cache(async () => {
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
            const url = httpURL(record.url);

            return label && url ? { label, url } : null;
          })
          .filter((link): link is { label: string; url: string } =>
            Boolean(link),
          )
      : [];

    return {
      bookingURL: httpURL(settings.bookingURL),
      contactEmail: stringValue(
        settings.contactEmail,
        fallbackSiteSettings.contactEmail,
      ),
      footerTagline: stringValue(
        settings.footerTagline,
        fallbackSiteSettings.footerTagline,
      ),
      seoDescription: stringValue(
        settings.seoDescription,
        fallbackSiteSettings.seoDescription,
      ),
      seoTitle: stringValue(settings.seoTitle, fallbackSiteSettings.seoTitle),
      socialLinks,
    };
  }, fallbackSiteSettings);
});
