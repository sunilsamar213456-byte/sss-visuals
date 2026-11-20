import { ArrowUp, Clock, Globe2, Mail } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { footerLinks } from "@/data/content";

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M8 10.5V16M8 7.5v.01M12 16v-3.2a2.3 2.3 0 0 1 4.6 0V16M12 10.5V16" strokeLinecap="round" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
      <path d="M10.5 9.5v5l4-2.5-4-2.5z" fill="currentColor" stroke="none" />
    </svg>
  );
}

const socials = [
  { label: "SSSVISUALS on Instagram", href: "https://www.instagram.com/", Icon: InstagramIcon },
  { label: "SSSVISUALS on LinkedIn", href: "https://www.linkedin.com/", Icon: LinkedInIcon },
  { label: "SSSVISUALS on YouTube", href: "https://www.youtube.com/", Icon: YouTubeIcon },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.08] bg-ink-900/60 pt-20">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
        <div>
          <Logo />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-mist-300">
            Cinematic brand films, commercials, photography and motion design, produced remotely for ambitious brands
            worldwide.
          </p>
          <ul className="mt-6 flex gap-2">
            {socials.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-mist-300 transition duration-300 hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/10 hover:text-white"
                >
                  <Icon />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <FooterColumn title="Services" links={footerLinks.services} />
        <FooterColumn title="Studio" links={footerLinks.studio} />

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-mist-400">Contact</h3>
          <ul className="mt-5 space-y-3.5 text-sm text-mist-300">
            <li>
              <span className="inline-flex items-center gap-2.5 transition hover:text-white"
              >
                <Mail size={15} aria-hidden="true" />
                Add your business email before launch
              </span>
            </li>
            <li className="flex items-center gap-2.5">
              <Globe2 size={15} aria-hidden="true" />
              Remote-first, serving clients worldwide
            </li>
            <li className="flex items-center gap-2.5">
              <Clock size={15} aria-hidden="true" />
              Flexible across time zones
            </li>
          </ul>
          <a
            href="#contact"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white/[0.06] px-4 py-2 text-sm font-medium text-white ring-1 ring-inset ring-white/10 transition hover:bg-white/10"
          >
            Start a project
          </a>
        </div>
      </div>

      <div className="mx-auto mt-16 flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-white/[0.08] px-5 py-6 text-xs text-mist-400 sm:flex-row sm:px-8">
        <p>© {new Date().getFullYear()} SSSVISUALS. All rights reserved.</p>
        <a
          href="#top"
          className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3.5 py-2 transition hover:border-white/25 hover:text-white"
        >
          Back to top
          <ArrowUp size={14} aria-hidden="true" />
        </a>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none select-none whitespace-nowrap bg-gradient-to-b from-white/[0.1] to-transparent bg-clip-text pb-[2vw] text-center text-[15vw] font-semibold leading-[0.8] tracking-[-0.06em] text-transparent"
      >
        SSSVISUALS
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <nav aria-label={`${title} links`}>
      <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-mist-400">{title}</h3>
      <ul className="mt-5 space-y-3 text-sm text-mist-300">
        {links.map((link) => (
          <li key={link.label}>
            <a href={link.href} className="transition hover:text-white">
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
