export default function Hero() {
  return (
    <section className="relative flex items-center justify-center overflow-hidden bg-background px-6 py-25">
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-[0.04]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `
              linear-gradient(to right, #334155 1px, transparent 1px),
              linear-gradient(to bottom, #334155 1px, transparent 1px)
            `,
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-5xl text-center">
        <h1 className="text-foreground text-5xl font-black leading-[0.9] tracking-[-0.06em] sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl">
          Build and grow
          <br />
          <span className="text-accent">
            communities.
          </span>
        </h1>

        <p className="text-muted mx-auto mt-8 max-w-2xl text-base leading-relaxed sm:text-lg md:text-xl">
          Discussions, events, resources, moderation,
          analytics, and AI-powered tools—all in one place.
        </p>

        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button className="bg-accent rounded-full px-8 py-4 font-semibold text-black transition-all hover:opacity-90">
            Get Started
          </button>

          <button className="text-foreground rounded-full border border-border px-8 py-4 font-semibold transition-all hover:border-accent hover:bg-white/3">
            Browse Communities
          </button>
        </div>
      </div>
    </section>
  );
}