import { AnimatePresence, motion, useScroll } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { EASE } from "@/components/ui/Reveal";
import { Logo } from "@/components/ui/Logo";
import { navLinks } from "@/data/content";
import { cn } from "@/utils/cn";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeHref, setActiveHref] = useState("");
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the nav item for the section currently in the reading band.
  useEffect(() => {
    const targets = navLinks
      .map((link) => document.getElementById(link.href.slice(1)))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const href = `#${entry.target.id}`;
          if (entry.isIntersecting) {
            setActiveHref(href);
          } else {
            // Clear the highlight when the active section leaves the reading band.
            setActiveHref((prev) => (prev === href ? "" : prev));
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Escape closes the mobile menu and body scroll is locked while it is open.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <motion.div
        aria-hidden
        className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-violet-400 via-cyan-300 to-amber-300"
        style={{ scaleX: scrollYProgress }}
      />

      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4">
        <nav
          aria-label="Main"
          className={cn(
            "mx-auto flex max-w-6xl items-center justify-between rounded-2xl border px-4 py-2.5 transition-all duration-500 sm:px-5",
            scrolled
              ? "border-white/10 bg-ink-900/70 shadow-[0_20px_60px_-20px_rgb(0_0_0/0.8)] backdrop-blur-xl"
              : "border-transparent bg-transparent"
          )}
        >
          <a href="#top" aria-label="SSSVISUALS, back to top" className="rounded-lg">
            <Logo />
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => {
              const isActive = activeHref === link.href;
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "relative block rounded-full px-3.5 py-2 text-sm transition-colors duration-300",
                      isActive ? "text-white" : "text-mist-300 hover:text-white"
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full bg-white/[0.08]"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative">{link.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <div className="hidden md:block">
              <Button href="#work" variant="ghost" size="sm">
                View Our Work
              </Button>
            </div>
            <Button href="#contact" size="sm" magnetic>
              Hire Us
            </Button>
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="glass inline-flex h-9 w-9 items-center justify-center rounded-full text-white transition hover:bg-white/10 lg:hidden"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="glass-strong mx-auto mt-3 max-w-6xl origin-top rounded-3xl p-4 lg:hidden"
            >
              <ul className="grid gap-1">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 + i * 0.04, duration: 0.4, ease: EASE }}
                  >
                    <a
                      href={link.href}
                      onClick={closeMenu}
                      className="flex items-center justify-between rounded-2xl px-4 py-3.5 text-lg text-mist-300 transition hover:bg-white/5 hover:text-white"
                    >
                      {link.label}
                      <ArrowUpRight size={16} className="opacity-40" aria-hidden="true" />
                    </a>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <Button href="#work" variant="secondary" onClick={closeMenu}>
                  View Our Work
                </Button>
                <Button href="#contact" onClick={closeMenu}>
                  Hire Us
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
