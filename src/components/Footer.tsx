import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import { InstagramIcon, LinkedInIcon, XIcon } from "@/components/SocialIcons";
import { Logo } from "@/components/Logo";
import { Container } from "@/components/ui";
import { siteConfig } from "@/config/site";

const footerNav = [
  {
    title: "Services",
    links: [
      { title: "Social media marketing", href: "/services#social-media" },
      { title: "AI automation", href: "/services#automation" },
      { title: "How it works", href: "/#how-it-works" },
      { title: "Pricing", href: "/services#pricing" },
    ],
  },
  {
    title: "Company",
    links: [
      { title: "About", href: "/about" },
      { title: "Blog", href: "/blog" },
      { title: "Contact", href: "/contact" },
      { title: "Privacy", href: "/privacy" },
    ],
  },
];

export function Footer() {
  const socialLinks = [
    {
      key: "instagram",
      href: siteConfig.socials.instagram,
      label: "Instagram",
      Icon: InstagramIcon,
    },
    {
      key: "linkedin",
      href: siteConfig.socials.linkedin,
      label: "LinkedIn",
      Icon: LinkedInIcon,
    },
    { key: "x", href: siteConfig.socials.x, label: "X", Icon: XIcon },
  ].filter((s) => s.href);

  return (
    <footer className="border-t border-line bg-bg-soft">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div className="max-w-sm">
            <Logo id="vd-footer" />
            <p className="mt-5 text-sm leading-relaxed text-muted">
              {siteConfig.tagline}. We help SMEs grow beyond word-of-mouth — and
              automate the busywork once they do.
            </p>
            {socialLinks.length > 0 ? (
              <div className="mt-6 flex items-center gap-3">
                {socialLinks.map(({ key, href, label, Icon }) => (
                  <SocialLink key={key} href={href} label={label}>
                    <Icon className="h-4.5 w-4.5" />
                  </SocialLink>
                ))}
              </div>
            ) : null}
          </div>

          {footerNav.map((group) => (
            <div key={group.title}>
              <h3 className="text-sm font-semibold tracking-wide text-fg">
                {group.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {group.links.map((link) => (
                  <li key={link.title}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted transition-colors hover:text-fg"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-line pt-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-6">
            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-flex items-center gap-2 transition-colors hover:text-fg"
            >
              <Mail className="h-4 w-4" />
              {siteConfig.email}
            </a>
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              {siteConfig.location}
            </span>
          </div>
        </div>
      </Container>
    </footer>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-white/25 hover:text-fg"
    >
      {children}
    </a>
  );
}
