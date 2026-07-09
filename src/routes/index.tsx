import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { MapPin, Navigation, Calendar, Clock } from "lucide-react";

import floralTL from "@/assets/floral-tl.png";
import floralBR from "@/assets/floral-br.png";
import heroBg from "@/assets/hero-bg.jpg";
import rose from "@/assets/rose.png";

import { FloatingPetals } from "@/components/wedding/FloatingPetals";
import { Ornament } from "@/components/wedding/Ornament";
import { Reveal } from "@/components/wedding/Reveal";
import { Countdown } from "@/components/wedding/Countdown";
import { Gallery } from "@/components/wedding/Gallery";
import { RsvpForm } from "@/components/wedding/RsvpForm";
import { MusicToggle } from "@/components/wedding/MusicToggle";

const MAP_URL =
  "https://www.google.com/maps?q=11.202179908752441,75.80118560791016&z=17&hl=en";
const MAP_EMBED =
  "https://www.google.com/maps?q=11.202179908752441,75.80118560791016&z=17&hl=en&output=embed";

const family = [
  "Naju", "Anu", "Sabaniya", "Shamsiya", "Naufan", "Faabi", "Faaz",
  "Hamilaan", "Faiza", "Falyn", "Hanym", "Heizaan", "Neva",
];

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Suhana & Midlaj — Wedding · 9 August 2026" },
      { name: "description", content: "The Shasa Family invites you to the wedding of Dr. Suhana Suaibu & Mohammed Midlaj." },
    ],
  }),
});

function Index() {
  const [loading, setLoading] = useState(true);
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1600);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background">
      <AnimatePresence>{loading && <Loader />}</AnimatePresence>
      <MusicToggle />

      <Hero opened={opened} onOpen={() => setOpened(true)} />

      <AnimatePresence>
        {opened && (
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
          >
            <Invitation />
            <CountdownSection />
            <EventSection />
            <VenueSection />
            <GallerySection />
            <Blessing />
            <FamilySection />
            <RsvpSection />
            <Footer />
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------------- Loader ---------------- */
function Loader() {
  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-cream"
    >
      <div className="text-center">
        <motion.img
          src={rose}
          alt=""
          className="mx-auto h-24 w-24"
          initial={{ scale: 0.6, opacity: 0, rotate: -15 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-6 font-script text-4xl text-gold-gradient"
        >
          Suhana & Midlaj
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-3 text-[10px] tracking-luxury text-muted-foreground uppercase"
        >
          A luxury wedding experience
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ---------------- Hero ---------------- */
function Hero({ opened, onOpen }: { opened: boolean; onOpen: () => void }) {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 800], [0, -120]);
  const y2 = useTransform(scrollY, [0, 800], [0, 80]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-cream/60 via-cream/40 to-cream" />
      </div>

      <FloatingPetals count={18} />

      {/* Corner florals */}
      <motion.img
        style={{ y: y1 }}
        src={floralTL}
        alt=""
        className="pointer-events-none absolute -top-10 -left-10 w-[45vw] max-w-[520px] opacity-90 sm:w-[32vw]"
      />
      <motion.img
        style={{ y: y2 }}
        src={floralBR}
        alt=""
        className="pointer-events-none absolute -right-16 -bottom-16 w-[55vw] max-w-[600px] opacity-90 sm:w-[38vw]"
      />

      <motion.div style={{ opacity }} className="relative z-10 px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 1.2 }}
          className="font-arabic text-2xl text-ink/80 sm:text-3xl"
          dir="rtl"
        >
          بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
        </motion.p>

        <Ornament className="mt-8" />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.4, duration: 1 }}
          className="mt-10 text-[10px] tracking-luxury text-muted-foreground uppercase sm:text-xs"
        >
          The Wedding of
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.6, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="font-script mt-6 text-6xl leading-[0.9] text-gold-gradient sm:text-8xl md:text-9xl"
        >
          Suhana
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 3.1, duration: 0.8 }}
          className="my-3 font-serif-display text-xl font-light text-ink/70 italic sm:text-2xl"
        >
          &amp;
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.3, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="font-script text-6xl leading-[0.9] text-gold-gradient sm:text-8xl md:text-9xl"
        >
          Midlaj
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.8, duration: 1 }}
          className="mt-10"
        >
          <div className="mx-auto inline-flex items-center gap-4 rounded-full border border-gold/30 bg-white/40 px-6 py-3 backdrop-blur-md">
            <Calendar size={14} className="text-gold" />
            <span className="font-serif-display text-sm tracking-[0.25em] text-ink uppercase sm:text-base">
              09 · 08 · 2026
            </span>
          </div>
        </motion.div>

        {!opened && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 4.2, duration: 1 }}
            onClick={onOpen}
            className="group relative mt-12 overflow-hidden rounded-full bg-gradient-to-r from-gold via-gold-soft to-gold px-10 py-4 text-[11px] font-medium tracking-luxury text-white uppercase shadow-luxury transition hover:shadow-[0_25px_60px_-10px_oklch(0.62_0.11_70/0.55)]"
          >
            <span className="relative z-10">Open Invitation</span>
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
          </motion.button>
        )}

        <Ornament className="mt-12" />
      </motion.div>

      {/* scroll cue */}
      {opened && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ opacity: { delay: 1 }, y: { duration: 2, repeat: Infinity } }}
          className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-[10px] tracking-luxury text-muted-foreground uppercase"
        >
          Scroll
        </motion.div>
      )}
    </section>
  );
}

/* ---------------- Section wrappers ---------------- */
function Section({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`relative px-6 py-24 sm:py-32 ${className}`}>
      <div className="mx-auto max-w-4xl">{children}</div>
    </section>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-center text-[10px] tracking-luxury text-gold uppercase">{children}</p>
  );
}

/* ---------------- Invitation ---------------- */
function Invitation() {
  return (
    <Section id="invitation">
      <Reveal className="text-center">
        <SectionLabel>Invitation</SectionLabel>
        <Ornament className="mt-6" />
        <p className="mt-10 font-serif-display text-xl font-light text-ink sm:text-2xl">
          Mr. N. P. Shuhaib
          <span className="mx-3 text-gold">&amp;</span>
          Mrs. K. V. Asmabi
        </p>
        <p className="mt-8 max-w-xl mx-auto text-sm leading-relaxed text-muted-foreground sm:text-base">
          request the pleasure of your presence and prayers
          <br />
          at the auspicious wedding
        </p>
        <p className="mt-6 text-[10px] tracking-luxury text-muted-foreground uppercase">
          of their beloved daughter
        </p>
        <h2 className="font-script mt-6 text-5xl leading-tight text-gold-gradient sm:text-7xl">
          Dr. Suhana Suaibu
        </h2>
        <div className="my-6 font-serif-display text-lg text-ink/60 italic">with</div>
        <h2 className="font-script text-5xl leading-tight sm:text-7xl" style={{ color: "oklch(0.42 0.05 145)" }}>
          Mohammed Midlaj
        </h2>
        <p className="mt-8 max-w-lg mx-auto text-sm text-muted-foreground">
          S/o V. Imbichi Mammu &amp; Fousiya PM
          <br />
          Meezab (Mappilakath House), Kollam, Koyilandy
        </p>
        <Ornament className="mt-12" />
      </Reveal>
    </Section>
  );
}

/* ---------------- Countdown ---------------- */
function CountdownSection() {
  return (
    <Section id="countdown" className="bg-gradient-to-b from-transparent via-white/40 to-transparent">
      <Reveal className="text-center">
        <SectionLabel>Counting the Moments</SectionLabel>
        <h3 className="mt-4 font-serif-display text-3xl font-light text-ink sm:text-5xl">
          Until we celebrate
        </h3>
      </Reveal>
      <Reveal delay={0.15} className="mt-12">
        <Countdown />
      </Reveal>
    </Section>
  );
}

/* ---------------- Event ---------------- */
function EventSection() {
  return (
    <Section id="event">
      <Reveal className="text-center">
        <SectionLabel>The Celebration</SectionLabel>
        <h3 className="mt-4 font-serif-display text-3xl font-light text-ink sm:text-5xl">
          Save the Date
        </h3>
      </Reveal>
      <Reveal delay={0.1} className="mt-12">
        <div className="glass mx-auto max-w-lg rounded-3xl p-10 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold/10 text-gold">
            <Calendar size={22} />
          </div>
          <div className="mt-6 text-[10px] tracking-luxury text-gold uppercase">Wedding</div>
          <div className="mt-3 font-serif-display text-2xl text-ink">Sunday</div>
          <div className="font-serif-display text-5xl font-light text-ink sm:text-6xl">
            9 August 2026
          </div>
          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Clock size={14} className="text-gold" />
            12:00 PM &mdash; 02:00 PM
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

/* ---------------- Venue ---------------- */
function VenueSection() {
  return (
    <Section id="venue">
      <Reveal className="text-center">
        <SectionLabel>Venue</SectionLabel>
        <h3 className="mt-4 font-script text-6xl text-gold-gradient sm:text-7xl">Shasa</h3>
        <p className="mt-4 text-sm text-muted-foreground sm:text-base">
          Behind Crystal Plaza, Arakkinar
        </p>
      </Reveal>

      <Reveal delay={0.15} className="mt-12">
        <div className="glass overflow-hidden rounded-3xl">
          <div className="aspect-[16/10] w-full">
            <iframe
              title="Venue Map"
              src={MAP_EMBED}
              className="h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="flex flex-col gap-3 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <MapPin size={18} className="text-gold" />
              <div className="text-sm text-ink">Shasa · Arakkinar</div>
            </div>
            <div className="flex gap-3">
              <a
                href={MAP_URL}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-gold/40 px-5 py-2.5 text-[11px] font-medium tracking-luxury text-gold uppercase transition hover:bg-gold/10"
              >
                Open Map
              </a>
              <a
                href={MAP_URL}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-full bg-gradient-to-r from-gold to-gold-soft px-5 py-2.5 text-[11px] font-medium tracking-luxury text-white uppercase shadow-soft"
              >
                <Navigation size={12} /> Navigate
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

/* ---------------- Gallery ---------------- */
function GallerySection() {
  return (
    <Section id="gallery">
      <Reveal className="text-center">
        <SectionLabel>Moments</SectionLabel>
        <h3 className="mt-4 font-serif-display text-3xl font-light text-ink sm:text-5xl">
          Their story in frames
        </h3>
      </Reveal>
      <Reveal delay={0.1} className="mt-12">
        <Gallery />
      </Reveal>
    </Section>
  );
}

/* ---------------- Blessing ---------------- */
function Blessing() {
  return (
    <Section id="blessing" className="text-center">
      <Reveal>
        <Ornament />
        <p className="mx-auto mt-10 max-w-2xl font-serif-display text-2xl leading-relaxed font-light text-ink italic sm:text-4xl">
          "Your presence and prayers will be a blessing as they begin their beautiful journey
          together."
        </p>
        <Ornament className="mt-10" />
      </Reveal>
    </Section>
  );
}

/* ---------------- Family ---------------- */
function FamilySection() {
  return (
    <Section id="family">
      <Reveal className="text-center">
        <SectionLabel>With Love From</SectionLabel>
        <h3 className="mt-4 font-serif-display text-3xl font-light text-ink sm:text-5xl">
          The Shasa Family
        </h3>
      </Reveal>
      <Reveal delay={0.1} className="mt-12">
        <div className="flex flex-wrap justify-center gap-3">
          {family.map((name, i) => (
            <motion.span
              key={name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04, duration: 0.6 }}
              className="glass rounded-full px-5 py-2.5 font-serif-display text-sm text-ink sm:text-base"
            >
              {name}
            </motion.span>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}

/* ---------------- RSVP ---------------- */
function RsvpSection() {
  return (
    <Section id="rsvp">
      <Reveal className="text-center">
        <SectionLabel>RSVP</SectionLabel>
        <h3 className="mt-4 font-serif-display text-3xl font-light text-ink sm:text-5xl">
          Kindly share your blessing
        </h3>
        <p className="mt-4 text-sm text-muted-foreground">Please respond at your earliest convenience.</p>
      </Reveal>
      <Reveal delay={0.1} className="mt-12">
        <RsvpForm />
      </Reveal>
    </Section>
  );
}

/* ---------------- Footer ---------------- */
function Footer() {
  return (
    <footer className="relative overflow-hidden px-6 pt-24 pb-16 text-center">
      <img
        src={floralTL}
        alt=""
        className="pointer-events-none absolute -bottom-16 -left-16 w-[45vw] max-w-[480px] rotate-180 opacity-80 sm:w-[28vw]"
        loading="lazy"
      />
      <img
        src={floralBR}
        alt=""
        className="pointer-events-none absolute -right-16 -bottom-16 w-[50vw] max-w-[520px] opacity-80 sm:w-[30vw]"
        loading="lazy"
      />
      <Reveal className="relative z-10">
        <Ornament />
        <p className="mt-8 font-script text-4xl text-gold-gradient sm:text-5xl">With Love,</p>
        <p className="mt-4 font-serif-display text-2xl text-ink sm:text-3xl">The Shasa Family</p>
        <p className="mt-10 text-[10px] tracking-luxury text-muted-foreground uppercase">
          Suhana &amp; Midlaj · 09 · 08 · 2026
        </p>
      </Reveal>
    </footer>
  );
}
