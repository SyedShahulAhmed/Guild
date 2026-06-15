"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

interface Profile {
  username: string;
  email: string;
  avatarUrl: string;
  bio: string;
  socialLinks: {
    github: string;
    linkedin: string;
    website: string;
    X: string;
  };
}
export default function SettingsPage() {
  const [loading, setLoading] = useState(false);

  const [profile, setProfile] = useState<Profile>({
    username: "",
    email: "",
    avatarUrl: "",
    bio: "",
    socialLinks: {
      github: "",
      linkedin: "",
      website: "",
      X: "",
    },
  });

  async function fetchProfile() {
    try {
      setLoading(true);
      const res = await fetch("/api/users/profile", {
        method: "GET",
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error("Profile fetching Failed");
        return;
      }
      setProfile(data.profile);
    } catch {
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  }

  async function handleAvatarUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload/avatar", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (!res.ok) {
        toast.error("Something went wrong");
      }
      setProfile((p) => ({
        ...p,
        avatarUrl: data.avatarUrl,
      }));

      toast.success("Avatar Uploaded");
    } catch {
      toast.error("Avatar upload Failed");
    }
  }

  async function handleSave() {
    try {
      const res = await fetch("/api/users/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          avatarUrl: profile.avatarUrl,
          bio: profile.bio,
          socialLinks: profile.socialLinks,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error("something went wrong");
      }
      toast.success("Profile Updated");
    } catch {
      toast.error("Failed to update profile");
    }
  }

  useEffect(() => {
    const loadProfile = async () => {
      await fetchProfile();
    };
    loadProfile();
  }, []);
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
        Loading...
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-background px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>

          <p className="mt-2 text-muted">
            Manage your profile and account settings.
          </p>
        </div>

        <div className="rounded-2xl border border-border  p-8">
          <h2 className="mb-8 text-2xl font-semibold text-foreground">
            Profile Settings
          </h2>

          {/* Avatar */}
          <div className="mb-10 flex items-center gap-6">
            {profile.avatarUrl ? (
              <Image
                src={profile.avatarUrl}
                alt="Avatar"
                width={96}
                height={96}
                className="h-24 w-24 rounded-full object-cover border border-border"
              />
            ) : (
              <div className="flex h-24 w-24 items-center justify-center rounded-full border border-border bg-background text-2xl font-bold text-accent">
                {profile.username?.charAt(0).toUpperCase()}
              </div>
            )}

            <div>
              <label className="cursor-pointer rounded-xl bg-accent px-5 py-3 font-medium text-black">
                Upload Avatar
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarUpload}
                />
              </label>

              <p className="pt-4 text-sm text-muted">
                JPG, PNG, WEBP up to 5MB
              </p>
            </div>
          </div>

          {/* Username */}
          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium text-foreground">
              Username
            </label>

            <input
              value={profile.username}
              disabled
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-muted"
            />
          </div>

          {/* Email */}
          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium text-foreground">
              Email
            </label>

            <input
              value={profile.email}
              disabled
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-muted"
            />
          </div>

          {/* Bio */}
          <div className="mb-8">
            <label className="mb-2 block text-sm font-medium text-foreground">
              Bio
            </label>

            <textarea
              rows={5}
              value={profile.bio}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  bio: e.target.value,
                })
              }
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-accent"
              placeholder="Tell us about yourself..."
            />
          </div>

          {/* Social Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-foreground">
              Social Links
            </h3>

            <div className="grid gap-4 md:grid-cols-2">
              <input
                placeholder="GitHub URL"
                value={profile.socialLinks.github}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    socialLinks: {
                      ...profile.socialLinks,
                      github: e.target.value,
                    },
                  })
                }
                className="rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-accent"
              />

              <input
                placeholder="LinkedIn URL"
                value={profile.socialLinks.linkedin}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    socialLinks: {
                      ...profile.socialLinks,
                      linkedin: e.target.value,
                    },
                  })
                }
                className="rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-accent"
              />

              <input
                placeholder="Website URL"
                value={profile.socialLinks.website}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    socialLinks: {
                      ...profile.socialLinks,
                      website: e.target.value,
                    },
                  })
                }
                className="rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-accent"
              />

              <input
                placeholder="Twitter/X URL"
                value={profile.socialLinks.X}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    socialLinks: {
                      ...profile.socialLinks,
                      X: e.target.value,
                    },
                  })
                }
                className="rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-accent"
              />
            </div>
          </div>

          <button
            onClick={handleSave}
            className="mt-10 rounded-xl bg-accent px-6 py-3 font-semibold text-black transition hover:opacity-90"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
