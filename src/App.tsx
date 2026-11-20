import { MotionConfig } from "framer-motion";
import { Benefits, Process } from "@/components/Benefits";
import { CTA } from "@/components/CTA";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { Pricing } from "@/components/Pricing";
import { Services } from "@/components/Services";
import { SocialProof } from "@/components/SocialProof";
import { Showcase } from "@/components/Showcase";
import { Testimonials } from "@/components/Testimonials";

export default function App() {
  return (
    // MotionConfig honours the user's reduced-motion preference for all Framer Motion animations.
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen overflow-x-clip bg-ink-950 font-sans text-white antialiased">
        <a
          href="#main"
          className="sr-only z-[90] rounded-full bg-white px-4 py-2 text-sm font-medium text-ink-950 focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>

        <div aria-hidden="true" className="noise pointer-events-none fixed inset-0 z-[70] opacity-[0.035]" />

        <Navbar />

        <main id="main">
          <Hero />
          <SocialProof />
          <Services />
          <Showcase />
          <Benefits />
          <Process />
          <Testimonials />
          <Pricing />
          <FAQ />
          <CTA />
        </main>

        <Footer />
      </div>
    </MotionConfig>
  );
}
