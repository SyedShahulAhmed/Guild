import Image from "next/image";
import { notFound } from "next/navigation";
import { getCommunityBySlug } from "@/lib/community";

export default async function CommunityPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const community = await getCommunityBySlug(slug);

  if (!community) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Banner */}
      {community.banner && (
        <div className="relative h-72 w-full">
          <Image
            src={community.banner}
            alt={community.name}
            fill
            className="object-cover"
          />

          <div className="absolute inset-0 bg-black/50" />
        </div>
      )}

      <div className="mx-auto max-w-7xl px-6 pb-10">
        {/* Header */}
        <div className="-mt-16 relative z-10 rounded-2xl border border-border bg-background-secondary p-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-5">
              {community.logo && (
                <Image
                  src={community.logo}
                  alt={community.name}
                  width={96}
                  height={96}
                  className="h-24 w-24 rounded-2xl border border-border object-cover"
                />
              )}

              <div>
                <h1 className="text-4xl font-bold text-foreground">
                  {community.name}
                </h1>
                <p className="mt-2 text-muted">{community.description}</p>
                <div className="mt-4 flex items-center gap-3">
                  <span className="rounded-full bg-accent px-3 py-1 text-sm font-medium text-black">
                    {community.category}
                  </span>

                  <span className="text-sm text-muted">
                    {community.memberCount} members
                  </span>
                </div>
              </div>
            </div>

            <button className="rounded-xl bg-accent px-6 py-3 font-semibold text-black transition hover:opacity-90">
              Join Community
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-border bg-background-secondary p-6">
            <p className="text-sm text-muted">Members</p>

            <h2 className="mt-2 text-3xl font-bold text-foreground">
              {community.memberCount}
            </h2>
          </div>

          <div className="rounded-2xl border border-border bg-background-secondary p-6">
            <p className="text-sm text-muted">Category</p>

            <h2 className="mt-2 text-xl font-semibold text-foreground">
              {community.category}
            </h2>
          </div>

          <div className="rounded-2xl border border-border bg-background-secondary p-6">
            <p className="text-sm text-muted">Visibility</p>

            <h2 className="mt-2 text-xl font-semibold text-foreground">
              {community.visibility}
            </h2>
          </div>
        </div>

        {/* About */}
        <div className="mt-8 rounded-2xl border border-border bg-background-secondary p-6">
          <h2 className="mb-4 text-2xl font-semibold text-foreground">
            About Community
          </h2>

          <p className="leading-7 text-muted">{community.description}</p>
        </div>

        {/* Coming Soon Sections */}
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-border bg-background-secondary p-6">
            <h3 className="mb-4 text-xl font-semibold text-foreground">
              Discussions
            </h3>

            <p className="text-muted">
              Community discussions will appear here.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-background-secondary p-6">
            <h3 className="mb-4 text-xl font-semibold text-foreground">
              Resources
            </h3>

            <p className="text-muted">Shared resources will appear here.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
