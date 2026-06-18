"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Community {
  _id: string;
  name: string;
  slug: string;
  description: string;
  banner?: string;
  logo?: string;
  category: string;
  memberCount: number;
}

export default function CommunitiesPage() {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        const res = await fetch("/api/communities");
        const data = await res.json();

        setCommunities(data.communities || []);
      } catch (error) {
        console.error("Failed to fetch communities:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCommunities();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background px-6 py-10">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-3xl font-bold text-foreground">
            Communities
          </h1>

          <p className="mt-2 text-muted">
            Loading communities...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">
            Communities
          </h1>

          <p className="mt-2 text-muted">
            Discover and join communities.
          </p>
        </div>

        {communities.length === 0 ? (
          <div className="rounded-2xl border border-border py-20 text-center">
            <h2 className="text-xl font-semibold text-foreground">
              No Communities Found
            </h2>

            <p className="mt-2 text-muted">
              Be the first to create one.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {communities.map((community) => (
              <div
                key={community._id}
                className="
                  overflow-hidden
                  rounded-2xl
                  border
                  border-border
                  transition-all
                  duration-300
                  hover:bg-background/50
                "
              >
                {community.banner && (
                  <Image
                    src={community.banner}
                    alt={community.name}
                    width={1200}
                    height={400}
                    className="h-48 w-full object-cover"
                  />
                )}

                <div className="p-5">
                  <div className="mb-4 flex items-center gap-3">
                    {community.logo && (
                      <Image
                        src={community.logo}
                        alt={community.name}
                        width={52}
                        height={52}
                        className="h-13 w-13 rounded-full border border-border object-cover"
                      />
                    )}

                    <div>
                      <h2 className="font-semibold text-foreground">
                        {community.name}
                      </h2>

                      <p className="text-sm text-accent">
                        {community.category}
                      </p>
                    </div>
                  </div>

                  <p className="mb-5 text-sm text-muted">
                    {community.description}
                  </p>

                  <div className="flex items-center justify-between border-t border-border pt-4">
                    <span className="text-sm text-muted">
                      {community.memberCount} members
                    </span>

                    <Link
                      href={`/communities/${community.slug}`}
                      className="
                        rounded-xl
                        bg-accent
                        px-4
                        py-2
                        text-sm
                        font-medium
                        text-black
                        transition
                        hover:opacity-90
                      "
                    >
                      View
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}