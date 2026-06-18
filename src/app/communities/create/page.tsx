"use client";

import { Globe, Lock, Upload, Users } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const categories = [
  "Technology",
  "Programming",
  "Gaming",
  "Education",
  "Business",
  "Startup",
  "Design",
  "AI",
];

const boards = [
  "Announcements",
  "General",
  "Questions",
  "Projects",
  "Resources",
];

export default function CreateCommunityPage() {
  const router = useRouter();

  const [logoUrl, setLogoUrl] = useState("");
  const [bannerUrl, setBannerUrl] = useState("");

  const [uploadingLogo, setUploadingLogo] = useState(false);

  const [uploadingBanner, setUploadingBanner] = useState(false);

  const [creating, setCreating] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [category, setCategory] = useState("");

  const [visibility, setVisibility] = useState<"PUBLIC" | "PRIVATE">("PUBLIC");
  async function uploadFile(file: File) {
    const formData = new FormData();

    formData.append("file", file);

    const res = await fetch("/api/upload/avatar", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Upload failed");
    }

    return data.url;
  }
  async function handleLogoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      setUploadingLogo(true);

      const url = await uploadFile(file);

      setLogoUrl(url);
    } catch (error) {
      console.error(error);
    } finally {
      setUploadingLogo(false);
    }
  }

  async function handleBannerUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      setUploadingBanner(true);

      const url = await uploadFile(file);

      setBannerUrl(url);
    } catch (error) {
      console.error(error);
    } finally {
      setUploadingBanner(false);
    }
  }

  async function createCommunity() {
    try {
      setCreating(true);

      const res = await fetch("/api/communities", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name,
          description,
          category,
          visibility,
          logo: logoUrl,
          banner: bannerUrl,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to create community");
      }

      router.push(`/communities/${data.community.slug}`);
    } catch (error) {
      console.error(error);
    } finally {
      setCreating(false);
    }
  }
  return (
    <main className="min-h-screen bg-background">
      {/* Background Glow */}

      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(230,213,168,0.08),transparent_40%)]" />

      <div className="mx-auto max-w-7xl px-6 py-12">
        {/* Header */}

        <div className="mb-14 text-center">
          <p className="mb-3 text-xs uppercase tracking-[0.4em] text-accent">
            Guild
          </p>

          <h1 className="text-5xl font-bold">Create Your Community</h1>

          <p className="mx-auto mt-4 max-w-2xl text-muted">
            Build a space for discussions, learning, events and collaboration.
          </p>
        </div>

        {/* Content */}

        <div className="grid gap-8 lg:grid-cols-5">
          {/* Form */}

          <div className="lg:col-span-3">
            <div className="rounded-3xl border border-border  p-8">
              <h2 className="mb-8 text-2xl font-semibold">Community Details</h2>

              <div className="space-y-8">
                {/* Name */}

                <div>
                  <label className="mb-2 block text-sm text-muted">
                    Community Name
                  </label>

                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Programming Hub"
                    className="
                    w-full
                    rounded-xl
                    border
                    border-border
                    bg-background
                    px-4
                    py-3
                    outline-none
                    transition-all
                    focus:border-accent
                    "
                  />
                </div>

                {/* Description */}

                <div>
                  <label className="mb-2 block text-sm text-muted">
                    Description
                  </label>

                  <textarea
                    rows={5}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Tell people what your community is about..."
                    className="
                    w-full
                    resize-none
                    rounded-xl
                    border
                    border-border
                    bg-background
                    px-4
                    py-3
                    outline-none
                    transition-all
                    focus:border-accent
                    "
                  />
                </div>

                {/* Categories */}

                <div>
                  <label className="mb-3 block text-sm text-muted">
                    Category
                  </label>

                  <div className="mb-4 flex flex-wrap gap-3">
                    {categories.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setCategory(item)}
                        className={`
          rounded-full
          border
          px-4
          py-2
          text-sm
          transition-all
          ${
            category === item
              ? "border-accent bg-accent text-black"
              : "border-border hover:border-accent"
          }
        `}
                      >
                        {item}
                      </button>
                    ))}
                  </div>

                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="Or enter a custom category..."
                    className="
      w-full
      rounded-xl
      border
      border-border
      bg-background
      px-4
      py-3
      outline-none
      transition-all
      focus:border-accent
    "
                  />
                </div>

                {/* Visibility */}

                <div>
                  <label className="mb-3 block text-sm text-muted">
                    Visibility
                  </label>

                  <div className="grid gap-4 md:grid-cols-2">
                    <button
                      type="button"
                      onClick={() => setVisibility("PUBLIC")}
                      className={`
                      rounded-2xl
                      border
                      p-5
                      text-left
                      transition-all
                      ${
                        visibility === "PUBLIC"
                          ? "border-accent"
                          : "border-border"
                      }
                    `}
                    >
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-accent" />

                        <p className="font-medium">Public</p>
                      </div>

                      <p className="mt-1 text-sm text-muted">
                        Anyone can find and join.
                      </p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setVisibility("PRIVATE")}
                      className={`
                      rounded-2xl
                      border
                      p-5
                      text-left
                      transition-all
                      ${
                        visibility === "PRIVATE"
                          ? "border-accent"
                          : "border-border"
                      }
                    `}
                    >
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <Lock className="h-4 w-4 text-accent" />

                          <p className="font-medium">Private</p>
                        </div>

                        <p className="text-sm text-muted">
                          Only invited members can join this community.
                        </p>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Logo */}

                <div>
                  <label className="mb-2 block text-sm text-muted">Logo</label>

                  <input
                    id="logo-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleLogoUpload}
                  />

                  <label
                    htmlFor="logo-upload"
                    className="
      flex
      h-32
      w-32
      cursor-pointer
      flex-col
      items-center
      justify-center
      overflow-hidden
      rounded-full
      border-2
      border-dashed
      border-border
    "
                  >
                    {logoUrl ? (
                      <Image
                        src={logoUrl}
                        alt="Logo"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <>
                        <Upload className="mb-2 h-5 w-5" />

                        <span className="text-xs">
                          {uploadingLogo ? "Uploading..." : "Upload Logo"}
                        </span>
                      </>
                    )}
                  </label>
                </div>

                {/* Banner */}

                <div>
                  <label className="mb-2 block text-sm text-muted">
                    Banner
                  </label>

                  <input
                    id="banner-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleBannerUpload}
                  />

                  <label
                    htmlFor="banner-upload"
                    className="
      flex
      h-40
      w-full
      cursor-pointer
      items-center
      justify-center
      overflow-hidden
      rounded-2xl
      border-2
      border-dashed
      border-border
    "
                  >
                    {bannerUrl ? (
                      <Image
                        src={bannerUrl}
                        alt="Banner"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="text-center">
                        <Upload className="mx-auto mb-2 h-6 w-6" />

                        <span>
                          {uploadingBanner ? "Uploading..." : "Upload Banner"}
                        </span>
                      </div>
                    )}
                  </label>
                </div>

                {/* Button */}

                <button
                  onClick={createCommunity}
                  disabled={creating}
                  className="
    w-full
    rounded-xl
    bg-accent
    py-4
    font-semibold
    text-black
    transition-all
    hover:scale-[1.01]
    disabled:opacity-50
  "
                >
                  {creating ? "Creating..." : "Create Community"}
                </button>
              </div>
            </div>
          </div>

          {/* Preview */}

          <div className="lg:col-span-2">
            <div className="sticky top-24 overflow-hidden rounded-3xl border border-border ">
              {/* Banner */}

              <div className="h-40 overflow-hidden">
                {bannerUrl ? (
                  <Image
                    src={bannerUrl}
                    alt="Banner"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full bg-linear-to-r from-accent/20 to-accent/5" />
                )}
              </div>

              {/* Logo */}

              <div className="px-6">
                <div className="-mt-12 flex h-24 w-24 items-center justify-center rounded-full border-4 border-background bg-background text-3xl">
                  {logoUrl ? (
                    <Image
                      src={logoUrl}
                      alt="Logo"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span>{name ? name[0] : "C"}</span>
                  )}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold">
                  {name || "Community Name"}
                </h3>

                <p className="mt-1 text-muted">{category || "Category"}</p>

                <div className="mt-4 flex gap-2">
                  <span className="rounded-full border border-border px-3 py-1 text-xs">
                    {visibility}
                  </span>

                  <div
                    className="
  flex
  items-center
  gap-2
  rounded-full
  border
  border-border
  px-3
  py-1
  text-xs
  "
                  >
                    <Users className="h-3 w-3" />1 Member
                  </div>
                </div>

                <p className="mt-6 text-sm text-muted">
                  {description ||
                    "Your community description will appear here."}
                </p>

                <div className="mt-8">
                  <h4 className="mb-3 font-medium">Default Boards</h4>

                  <div className="space-y-2">
                    {boards.map((board) => (
                      <div
                        key={board}
                        className="
                        rounded-xl
                        border
                        border-border
                        px-4
                        py-3
                        "
                      >
                        {board}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
