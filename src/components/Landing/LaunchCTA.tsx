import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function LaunchCTA() {
  return (
    <section className="bg-background px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div
          className="
            rounded-[40px]
            border
            border-border
            bg-background-secondary
            px-8
            py-14
            text-center
            md:px-16
          "
        >
          <div className="mb-4 flex justify-center">
            <div className="rounded-full border border-border px-6 py-3">
              <span className="text-accent text-sm font-medium">
                Ready to Get Started?
              </span>
            </div>
          </div>

          <h2 className="text-foreground mx-auto max-w-4xl text-4xl font-black tracking-[-0.04em] md:text-6xl">
            Build the community
            <span className="text-accent block">
              you&rsquo;ve always wanted.
            </span>
          </h2>

          <p className="text-muted mx-auto mt-8 max-w-2xl text-lg leading-relaxed">
            Launch discussions, host events, share resources, and grow your
            community from a single platform.
          </p>

          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/signup"
              className="
                bg-accent
                flex
                items-center
                gap-2
                rounded-full
                px-8
                py-4
                font-semibold
                text-black
                transition-all
                duration-300
                hover:scale-105
              "
            >
              Launch Guild
              <ArrowRight size={18} />
            </Link>

            <Link
              href="/communities"
              className="
                text-foreground
                rounded-full
                border
                border-border
                px-8
                py-4
                font-semibold
                transition-all
                duration-300
                hover:border-accent
              "
            >
              Explore Communities
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}