import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Clock, Pause, Play, Sparkles } from "lucide-react";
import { useRef, useState, type MouseEvent } from "react";
import { Button } from "@/components/ui/Button";
import { EASE } from "@/components/ui/Reveal";
import { heroVideo, pexels } from "@/data/content";
import { cn } from "@/utils/cn";

const headlineWords = ["Cinematic", "visuals", "for", "brands", "that"];
const accentWords = ["refuse", "to", "blend", "in."];
const trustAvatars = [40035691, 28442318, 40322798, 33799456];

export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden pb-24 pt-32 sm:pt-40 lg:pb-32 lg:pt-44">
      <Ambient />

      <div className="mx-auto grid max-w-7xl items-center gap-16 px-5 sm:px-8 lg:grid-cols-[1.02fr_1fr] lg:gap-12">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="glass inline-flex items-center gap-2.5 rounded-full py-1.5 pl-2.5 pr-4 text-xs text-mist-300 sm:text-sm"
          >
            <span className="relative flex h-2.5 w-2.5 items-center justify-center" aria-hidden="true">
              <span className="absolute h-full w-full animate-ping-slow rounded-full bg-emerald-400" />
              <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            Independent creative studio · Remote-ready worldwide
          </motion.div>

          <h1 className="mt-7 text-balance text-[2.6rem] font-semibold leading-[1.02] tracking-[-0.035em] sm:text-6xl lg:text-[4.25rem] xl:text-7xl">
            {headlineWords.map((word, i) => (
              <WordIn key={`${word}-${i}`} word={word} index={i} />
            ))}{" "}
            {accentWords.map((word, i) => (
              <WordIn key={`${word}-accent-${i}`} word={word} index={headlineWords.length + i} accent />
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.75 }}
            className="mt-7 max-w-xl text-pretty text-base leading-relaxed text-mist-300 sm:text-lg"
          >
            SSSVISUALS is a remote-first creative studio producing brand films, commercials, product
            photography and motion design for ambitious companies worldwide. One accountable team,
            from first concept to platform-ready master.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.9 }}
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Button href="#contact" size="lg" magnetic icon={<ArrowUpRight size={18} aria-hidden="true" />}>
              Hire Us
            </Button>
            <Button
              href="#work"
              variant="secondary"
              size="lg"
              icon={<Play size={15} className="fill-current" aria-hidden="true" />}
            >
              View Our Work
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.1 }}
            className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="flex -space-x-3">
                {trustAvatars.map((id) => (
                  <img
                    key={id}
                    src={pexels(id, 96, 96)}
                    alt=""
                    width={40}
                    height={40}
                    loading="lazy"
                    className="h-10 w-10 rounded-full border-2 border-ink-950 object-cover"
                  />
                ))}
              </div>
              <p className="text-sm text-mist-300">
                <span className="font-semibold text-white">Creative-first</span> editing and production
              </p>
            </div>
            <div className="hidden h-8 w-px bg-white/10 sm:block" aria-hidden="true" />
            <div className="flex items-center gap-2 text-sm text-mist-300">
              <p><span className="font-semibold text-white">Made to brief</span> · No one-size-fits-all edits</p>
            </div>
          </motion.div>
        </div>

        <ShowreelCard />
      </div>
    </section>
  );
}

function WordIn({ word, index, accent = false }: { word: string; index: number; accent?: boolean }) {
  return (
    <>
      <span className="inline-block overflow-hidden align-top pb-[0.12em]">
        <motion.span
          className={cn("inline-block", accent && "font-serif font-normal italic text-gradient")}
          initial={{ y: "105%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.2 + index * 0.075 }}
        >
          {word}
        </motion.span>
      </span>{" "}
    </>
  );
}

const springConfig = { stiffness: 140, damping: 20, mass: 0.6 };

function ShowreelCard() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateY = useSpring(useTransform(px, [0, 1], [-7, 7]), springConfig);
  const rotateX = useSpring(useTransform(py, [0, 1], [7, -7]), springConfig);

  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    px.set((event.clientX - rect.left) / rect.width);
    py.set((event.clientY - rect.top) / rect.height);
  };

  const handleLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => setPlaying(false));
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  return (
    <div className="relative [perspective:1400px]" onMouseMove={handleMove} onMouseLeave={handleLeave}>
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.1, ease: EASE, delay: 0.35 }}
        className="glass relative rounded-[28px] p-2.5 shadow-[0_50px_120px_-30px_rgb(124_58_237/0.45)]"
      >
        <div className="relative aspect-[4/3] overflow-hidden rounded-[20px] bg-ink-800 sm:aspect-[16/11]">
          <video
            ref={videoRef}
            src={heroVideo.src}
            poster={heroVideo.poster}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-label="Looping preview of the SSSVISUALS showreel"
            className="h-full w-full object-cover"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-ink-950/10 to-transparent" />

          <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-black/40 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-white/90 backdrop-blur-md">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-400" aria-hidden="true" />
            Showreel 2026
          </div>

          <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-white">Obsidian Motors · Brand film</p>
              <p className="mt-0.5 text-xs text-white/60">4K · 0:58 · Color graded in-house</p>
            </div>
            <button
              type="button"
              onClick={togglePlay}
              aria-label={playing ? "Pause showreel" : "Play showreel"}
              className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white text-ink-950 shadow-lg transition hover:scale-105 focus-visible:outline-offset-4"
            >
              {playing ? (
                <Pause size={16} className="fill-current" aria-hidden="true" />
              ) : (
                <Play size={16} className="ml-0.5 fill-current" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, ease: EASE, delay: 1.1 }}
        className="absolute -left-3 top-[42%] sm:-left-8"
      >
        <div className="glass flex animate-float items-center gap-3 rounded-2xl px-4 py-3">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-violet-500/20 text-violet-200">
            <Clock size={17} aria-hidden="true" />
          </span>
          <div>
            <p className="text-sm font-semibold">10 days</p>
            <p className="text-xs text-mist-400">Average turnaround</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, ease: EASE, delay: 1.25 }}
        className="absolute -right-3 bottom-20 sm:-right-8"
      >
        <div className="glass flex animate-float-slow items-center gap-3 rounded-2xl px-4 py-3">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-cyan-400/15 text-cyan-200">
            <Sparkles size={17} aria-hidden="true" />
          </span>
          <div>
            <p className="text-sm font-semibold">+41% engagement</p>
            <p className="text-xs text-mist-400">Average on paid social</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function Ambient() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute -top-48 left-1/2 h-[40rem] w-[40rem] -translate-x-1/2 animate-aurora rounded-full bg-violet-600/30 blur-[120px]" />
      <div className="absolute left-[-8rem] top-24 h-[24rem] w-[24rem] animate-aurora rounded-full bg-cyan-400/15 blur-[110px] [animation-delay:-7s]" />
      <div className="absolute right-[-8rem] top-[38%] h-[26rem] w-[26rem] animate-aurora rounded-full bg-amber-300/10 blur-[120px] [animation-delay:-13s]" />
      <div className="bg-grid grid-mask absolute inset-0 opacity-70" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-ink-950" />
    </div>
  );
}
