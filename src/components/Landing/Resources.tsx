import {
  FileText,
  BookOpen,
  FolderOpen,
  Video,
} from "lucide-react";

const resources = [
  {
    icon: BookOpen,
    title: "React Best Practices",
    category: "Guide",
    downloads: "12.4K",
    description:
      "Comprehensive guide covering architecture patterns, performance optimization, and scalable React applications.",
  },
  {
    icon: FileText,
    title: "Startup Pitch Deck Template",
    category: "Template",
    downloads: "8.7K",
    description:
      "Investor-ready pitch deck template used by founders to present ideas, traction, and business models.",
  },
  {
    icon: FolderOpen,
    title: "Design System Kit",
    category: "Resource",
    downloads: "15.2K",
    description:
      "Reusable UI components, typography guidelines, color systems, and design documentation.",
  },
  {
    icon: Video,
    title: "AI Agent Workshop",
    category: "Recording",
    downloads: "6.9K",
    description:
      "Watch practical demonstrations of AI agents, workflows, automation tools, and integrations.",
  },
];

export default function Resources() {
  return (
    <section id="resources" className="bg-background px-6 py-20">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mx-auto mb-20 max-w-5xl text-center">
          <div className="mb-6 flex justify-center">
            <div className="rounded-full border border-border px-7 py-5">
              <span className="text-accent text-xl font-medium">
                Resource Library
              </span>
            </div>
          </div>

          <p className="text-muted mx-auto mt-8 max-w-3xl text-lg leading-relaxed">
            Share guides, templates, recordings, and community knowledge in a
            centralized, searchable resource hub.
          </p>
        </div>

        {/* Resources Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {resources.map((resource) => {
            const Icon = resource.icon;

            return (
              <div
                key={resource.title}
                className="
                  group
                  rounded-3xl
                  border
                  border-border
                  bg-background-secondary
                  p-8
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-accent
                "
              >
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border bg-white/2">
                    <Icon size={22} className="text-accent" />
                  </div>

                  <span className="text-accent rounded-full bg-white/3 px-3 py-1 text-xs font-medium">
                    {resource.category}
                  </span>
                </div>

                <h3 className="text-foreground mb-3 text-xl font-semibold">
                  {resource.title}
                </h3>

                <p className="text-muted mb-6 min-h-24 leading-relaxed">
                  {resource.description}
                </p>

                <div className="border-border flex items-center justify-between border-t pt-5">
                  <span className="text-muted text-sm">
                    {resource.downloads} downloads
                  </span>

                  <span className="text-accent text-sm font-medium">
                    View Resource
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}