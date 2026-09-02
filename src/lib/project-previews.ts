import type { MediaSummary, ProjectSummary } from "./cms";

export type ProjectCardItem = Pick<
  ProjectSummary,
  "clientName" | "id" | "projectName" | "year"
> & {
  heroImage: MediaSummary;
  href: string | null;
};

export const reviewProjectPreviews: ProjectCardItem[] = [
  {
    clientName: "Postbank",
    heroImage: {
      alt: "ETÉRA editorial work layout preview",
      url: "/media/etera-work-detail.webp",
    },
    href: null,
    id: "review-preview-01",
    projectName: "Finance Under CTRL",
    year: "2025",
  },
  {
    clientName: "COCOSOLIS",
    heroImage: {
      alt: "Abstract ETÉRA motion study used as a work layout preview",
      url: "/design/assets/aether-motion.webp",
    },
    href: null,
    id: "review-preview-02",
    projectName: "Self-Care Pop-Up Sofia",
    year: "2025",
  },
  {
    clientName: "PM Mentality",
    heroImage: {
      alt: "ETÉRA atelier image used as a work layout preview",
      url: "/media/etera-atelier-team.webp",
    },
    href: null,
    id: "review-preview-03",
    projectName: "Season 2 Launch",
    year: "2025",
  },
  {
    clientName: "COCOSOLIS",
    heroImage: {
      alt: "Abstract ETÉRA hero study used as a work layout preview",
      url: "/design/assets/aether-hero.webp",
    },
    href: null,
    id: "review-preview-04",
    projectName: "Amazon Content Ecosystem",
    year: "2026",
  },
  {
    clientName: "Postbank",
    heroImage: {
      alt: "ETÉRA founders image used as a work layout preview",
      url: "/media/etera-founders.webp",
    },
    href: null,
    id: "review-preview-05",
    projectName: "Business Simulation",
    year: "2024",
  },
  {
    clientName: "Albumite.bg",
    heroImage: {
      alt: "Abstract ETÉRA atelier study used as a work layout preview",
      url: "/design/assets/aether-atelier.webp",
    },
    href: null,
    id: "review-preview-06",
    projectName: "Limited-Edition Product Drops",
    year: "2025",
  },
];

export function projectCardItem(project: ProjectSummary): ProjectCardItem | null {
  if (!project.heroImage) {
    return null;
  }

  return {
    clientName: project.clientName,
    heroImage: project.heroImage,
    href: `/work/${project.slug}`,
    id: project.id,
    projectName: project.projectName,
    year: project.year,
  };
}

export function fillProjectPreview(
  projects: ProjectCardItem[],
  limit: number,
): ProjectCardItem[] {
  const existingIds = new Set(projects.map((project) => project.id));
  const previews = reviewProjectPreviews.filter(
    (project) => !existingIds.has(project.id),
  );

  return [...projects, ...previews].slice(0, limit);
}
