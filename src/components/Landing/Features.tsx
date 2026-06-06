import {
  Users,
  MessageSquare,
  Calendar,
  FolderOpen,
  BarChart3,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Community Management",
    description:
      "Create and manage communities with roles, permissions, branding, and member controls.",
  },
  {
    icon: MessageSquare,
    title: "Discussion Forums",
    description:
      "Structured discussions with categories, posts, comments, reactions, polls, and bookmarks.",
  },
  {
    icon: Calendar,
    title: "Events & Meetups",
    description:
      "Host events, manage RSVPs, track attendance, and keep members engaged.",
  },
  {
    icon: FolderOpen,
    title: "Resource Library",
    description:
      "Share documents, guides, templates, and learning resources in one organized space.",
  },
  {
    icon: BarChart3,
    title: "Community Analytics",
    description:
      "Track engagement, growth, retention, activity, and community health in real time.",
  },
  {
    icon: Sparkles,
    title: "AI-Powered Tools",
    description:
      "AI moderation, smart search, summaries, and personalized recommendations.",
  },
];

export default function Features() {
  return (
    <section id="features" className="bg-background px-6 py-20">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mx-auto mb-20 max-w-3xl text-center">
          <div className="mb-6 flex justify-center">
            <div className="rounded-full border border-border/30 bg-white/2 px-5 py-3">
              <span className="text-xl font-medium text-accent">
                Everything in One Platform
              </span>
            </div>
          </div>

          <p className="mt-6 text-lg text-muted">
            Replace fragmented tools with a single platform for discussions,
            events, resources, analytics, and AI-powered community management.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
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
                  hover:border-accent/40
                "
              >
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-white/3">
                  <Icon size={24} className="text-accent" />
                </div>

                <h3 className="mb-3 text-xl font-semibold text-foreground">
                  {feature.title}
                </h3>

                <p className="leading-relaxed text-muted">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
