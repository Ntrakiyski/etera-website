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
    clientName: "Review preview",
    heroImage: {
      alt: "ETÉRA editorial work layout preview",
      url: "/media/etera-work-detail.webp",
    },
    href: null,
    id: "review-preview-01",
    projectName: "Project preview 01",
    year: "01",
  },
  {
    clientName: "Review preview",
    heroImage: {
      alt: "Abstract ETÉRA motion study used as a work layout preview",
      url: "/design/assets/aether-motion.webp",
    },
    href: null,
    id: "review-preview-02",
    projectName: "Project preview 02",
    year: "02",
  },
  {
    clientName: "Review preview",
    heroImage: {
      alt: "ETÉRA atelier image used as a work layout preview",
      url: "/media/etera-atelier-team.webp",
    },
    href: null,
    id: "review-preview-03",
    projectName: "Project preview 03",
    year: "03",
  },
  {
    clientName: "Review preview",
    heroImage: {
      alt: "Abstract ETÉRA hero study used as a work layout preview",
      url: "/design/assets/aether-hero.webp",
    },
    href: null,
    id: "review-preview-04",
    projectName: "Project preview 04",
    year: "04",
  },
  {
    clientName: "Review preview",
    heroImage: {
      alt: "ETÉRA founders image used as a work layout preview",
      url: "/media/etera-founders.webp",
    },
    href: null,
    id: "review-preview-05",
    projectName: "Project preview 05",
    year: "05",
  },
  {
    clientName: "Review preview",
    heroImage: {
      alt: "Abstract ETÉRA atelier study used as a work layout preview",
      url: "/design/assets/aether-atelier.webp",
    },
    href: null,
    id: "review-preview-06",
    projectName: "Project preview 06",
    year: "06",
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
