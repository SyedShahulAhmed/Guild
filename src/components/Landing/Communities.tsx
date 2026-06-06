import { Bot, Code2, Gamepad2, Palette, Rocket, Tv } from "lucide-react";

const communities = [
  {
    icon: Code2,
    name: "Frontend Engineers",
    category: "Engineering",
    members: "24,820",
    online: "1,284",
    description:
      "Discuss React, Next.js, TypeScript, frontend architecture, performance optimization, and modern web development practices.",
  },
  {
    icon: Tv,
    name: "Anime Hub",
    category: "Entertainment",
    members: "58,210",
    online: "4,120",
    description:
      "Discover new series, join discussions, share recommendations, and connect with fellow anime enthusiasts.",
  },
  {
    icon: Gamepad2,
    name: "Game Developers",
    category: "Gaming",
    members: "12,490",
    online: "612",
    description:
      "Share projects, receive feedback, discuss game design, and collaborate with developers worldwide.",
  },
  {
    icon: Rocket,
    name: "Startup Network",
    category: "Business",
    members: "18,760",
    online: "902",
    description:
      "Exchange growth strategies, fundraising insights, product ideas, and startup building experiences.",
  },
  {
    icon: Palette,
    name: "Design Community",
    category: "Design",
    members: "9,320",
    online: "488",
    description:
      "Explore UI/UX design, branding, design systems, research methods, and professional feedback.",
  },
  {
    icon: Bot,
    name: "AI Community",
    category: "AI",
    members: "31,420",
    online: "2,104",
    description:
      "Discuss AI tools, language models, automation workflows, and emerging industry developments.",
  },
];

export default function Communities() {
  return (
    <section id="communities" className="bg-background px-6 py-24">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mx-auto mb-20 max-w-5xl text-center">
          <div className="mb-6 flex justify-center">
            <div className="rounded-full border border-border px-7 py-5">
              <span className="text-xl font-medium text-accent">
                Powering Modern Communities
              </span>
            </div>
          </div>

          {/* <h2 className="text-foreground text-4xl font-black tracking-[-0.04em] md:text-6xl lg:text-7xl">
            One platform.
            <br />
            <span className="text-accent">Endless communities.</span>
          </h2> */}

          <p className="text-muted mx-auto mt-8 max-w-3xl text-lg leading-relaxed">
            Whether you&apos;re building a developer network, startup hub,
            learning community, gaming guild, or creator ecosystem, Guild gives
            you everything needed to bring people together.
          </p>
        </div>

        {/* Communities Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {communities.map((community) => {
            const Icon = community.icon;

            return (
              <div
                key={community.name}
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
                {/* Top */}
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border bg-white/2">
                    <Icon size={22} className="text-accent" />
                  </div>

                  <span className="text-accent rounded-full bg-white/3 px-3 py-1 text-xs font-medium">
                    {community.category}
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-foreground mb-3 text-xl font-semibold">
                  {community.name}
                </h3>

                <p className="text-muted mb-6 min-h-28 leading-relaxed">
                  {community.description}
                </p>

                {/* Stats */}
                <div className="flex items-center justify-between border-t border-border pt-5">
                  <span className="text-muted text-sm">
                    {community.members} members
                  </span>

                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    <span className="text-muted text-sm">
                      {community.online} online
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
