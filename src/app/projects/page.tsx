import { ProjectsList } from "@/components/sections/ProjectsList";
import { ScrollRail } from "@/components/sections/ScrollRail";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

export default function ProjectsPage() {
  return (
    <>
      <Breadcrumb current="Projects" />
      <ScrollRail />

      {/* Desktop (lg:): one static screen that never scrolls — only the
          endless reel inside ProjectsList moves. Mobile: a normal scrolling
          page instead (see ProjectsList's own lg:hidden block) — matches
          the reference's mobile layout, which is just a regular list of big
          project cards, not the reel. */}
      <section className="flex flex-col px-6 pb-8 pt-28 sm:px-10 lg:h-screen lg:overflow-hidden lg:pl-24 lg:pt-32">
        <ProjectsList />
      </section>
    </>
  );
}
