import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="text-accent text-3xl font-black tracking-wide"
            >
              Guild
            </Link>

            <p className="text-muted mt-6 max-w-xs leading-relaxed">
              The all-in-one platform for building, managing, and growing modern
              online communities.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-foreground mb-5 text-lg font-semibold">
              Product
            </h3>

            <div className="flex flex-col gap-3">
              <Link
                href="#features"
                className="text-muted transition-colors hover:text-accent"
              >
                Features
              </Link>

              <Link
                href="/communities"
                className="text-muted transition-colors hover:text-accent"
              >
                Communities
              </Link>

              <Link
                href="/events"
                className="text-muted transition-colors hover:text-accent"
              >
                Events
              </Link>

              <Link
                href="/resources"
                className="text-muted transition-colors hover:text-accent"
              >
                Resources
              </Link>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-foreground mb-5 text-lg font-semibold">
              Company
            </h3>

            <div className="flex flex-col gap-3">
              <Link
                href="/about"
                className="text-muted transition-colors hover:text-accent"
              >
                About
              </Link>

              <Link
                href="/careers"
                className="text-muted transition-colors hover:text-accent"
              >
                Careers
              </Link>

              <Link
                href="/blog"
                className="text-muted transition-colors hover:text-accent"
              >
                Blog
              </Link>

              <Link
                href="/contact"
                className="text-muted transition-colors hover:text-accent"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-foreground mb-5 text-lg font-semibold">
              Resources
            </h3>

            <div className="flex flex-col gap-3">
              <Link
                href="/docs"
                className="text-muted transition-colors hover:text-accent"
              >
                Documentation
              </Link>

              <Link
                href="/api"
                className="text-muted transition-colors hover:text-accent"
              >
                API Reference
              </Link>

              <Link
                href="/help"
                className="text-muted transition-colors hover:text-accent"
              >
                Help Center
              </Link>

              <Link
                href="/status"
                className="text-muted transition-colors hover:text-accent"
              >
                Status
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-border pt-8 md:flex-row">
          <p className="text-muted text-sm">
            © 2026 Guild Labs. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="text-muted text-sm transition-colors hover:text-accent"
            >
              Privacy
            </Link>

            <Link
              href="/terms"
              className="text-muted text-sm transition-colors hover:text-accent"
            >
              Terms
            </Link>

            <Link
              href="/security"
              className="text-muted text-sm transition-colors hover:text-accent"
            >
              Security
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}