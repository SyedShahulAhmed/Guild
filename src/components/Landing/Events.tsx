import { Calendar, Users, Code2, Rocket, Palette, Bot } from "lucide-react";

const events = [
  {
    icon: Code2,
    title: "Next.js Build Sprint",
    category: "Engineering",
    date: "Jun 28, 2026",
    attendees: "248",
    type: "Online",
    description:
      "Build production-ready applications with Next.js and learn modern development workflows.",
  },
  {
    icon: Rocket,
    title: "Founder Roundtable",
    category: "Business",
    date: "Jul 02, 2026",
    attendees: "126",
    type: "Online",
    description:
      "Discuss fundraising, product strategy, growth challenges, and startup execution.",
  },
  {
    icon: Palette,
    title: "Design Critique Session",
    category: "Design",
    date: "Jul 05, 2026",
    attendees: "84",
    type: "Online",
    description:
      "Receive feedback on your designs and learn from experienced product designers.",
  },
  {
    icon: Bot,
    title: "AI Builders Meetup",
    category: "AI",
    date: "Jul 09, 2026",
    attendees: "312",
    type: "Online",
    description:
      "Explore agents, workflows, LLM applications, and the future of AI products.",
  },
];

export default function Events() {
  return (
    <section id="events" className="bg-background px-6 py-20">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mx-auto mb-20 max-w-5xl text-center">
          <div className="mb-6 flex justify-center">
            <div className="rounded-full border border-border px-7 py-5">
              <span className="text-accent text-xl font-medium">
                Events & Meetups
              </span>
            </div>
          </div>

          <p className="text-muted mx-auto mt-8 max-w-3xl text-lg leading-relaxed">
            Bring members together through workshops, discussions, networking
            sessions, and community-driven events.
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {events.map((event) => {
            const Icon = event.icon;

            return (
              <div
                key={event.title}
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
                    {event.category}
                  </span>
                </div>

                <h3 className="text-foreground mb-3 text-xl font-semibold">
                  {event.title}
                </h3>

                <p className="text-muted mb-6 min-h-24 leading-relaxed">
                  {event.description}
                </p>

                <div className="space-y-3 border-t border-border pt-5">
                  <div className="text-muted flex items-center gap-2 text-sm">
                    <Calendar size={16} />
                    {event.date}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-muted flex items-center gap-2 text-sm">
                      <Users size={16} />
                      {event.attendees} attending
                    </div>

                    <span className="text-accent text-sm font-medium">
                      {event.type}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
