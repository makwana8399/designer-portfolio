import { notFound } from "next/navigation";
import { projects } from "@/content/site";
import { ProjectCaseStudy } from "@/components/sections/ProjectCaseStudy";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.id }));
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.id === slug);
  if (index === -1) notFound();

  const project = projects[index];
  const nextProject = projects[(index + 1) % projects.length];

  return (
    <>
      <Breadcrumb
        current={project.title}
        trail={[{ label: "Projects", href: "/projects" }]}
        hideOnMobile
      />
      <ProjectCaseStudy project={project} nextProject={nextProject} />
    </>
  );
}
