import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { MapPin, Navigation, Calendar, Clock, ZoomIn, Download, X } from "lucide-react";

import floralTL from "@/assets/floral-tl.png";
import floralBR from "@/assets/floral-br.png";
import heroBg from "@/assets/hero-bg.jpg";
import rose from "@/assets/rose.png";
import cardImg from "@/assets/card.jpeg";

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
  const { scrollY } = useScroll();
  const [showMarquee, setShowMarquee] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1600);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    return scrollY.onChange((latest) => {
      // Show marquee if scrolled down past 400px and invitation is opened
      if (opened && latest > 400) {
        setShowMarquee(true);
      } else {
        setShowMarquee(false);
      }
      
      // Show scroll-to-top button if scrolled past 600px
      if (opened && latest > 600) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    });
  }, [opened, scrollY]);

  const [menuOpen, setMenuOpen] = useState(false);

  const handleOpen = () => {
    setOpened(true);
    // Smooth scroll to the invitation section after split door transition triggers
    setTimeout(() => {
      const invitationSection = document.getElementById("invitation");
      if (invitationSection) {
        invitationSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 600);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (id: string) => {
    setMenuOpen(false);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 300);
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background">
      <AnimatePresence>{loading && <Loader />}</AnimatePresence>
      <MusicToggle />

      {/* Split-door transition screen */}
      <AnimatePresence>
        {!opened && !loading && (
          <div className="fixed inset-0 z-0 pointer-events-none flex">
            {/* Left Door */}
            <motion.div 
              exit={{ x: "-100%" }}
              transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1] }}
              className="w-1/2 h-full bg-cream border-r border-gold/10 pointer-events-auto"
            />
            {/* Right Door */}
            <motion.div 
              exit={{ x: "100%" }}
              transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1] }}
              className="w-1/2 h-full bg-cream border-l border-gold/10 pointer-events-auto"
            />
          </div>
        )}
      </AnimatePresence>

      {/* Premium Sticky Top-bar Header */}
      <AnimatePresence>
        {showMarquee && (
          <motion.div
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -60, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed top-0 left-0 right-0 z-50 flex h-14 items-center justify-between border-b border-gold/10 bg-cream/90 px-6 backdrop-blur-md safe-top shadow-soft"
          >
            {/* Calligraphy Initials logo */}
            <div 
              onClick={() => scrollToSection("invitation")}
              className="font-script text-2xl text-gold-gradient tracking-wider pt-1 select-none cursor-pointer"
            >
              S &amp; M
            </div>
            
            {/* Decorative luxury menu lines */}
            <div 
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex flex-col gap-1 cursor-pointer p-2 relative z-[60]"
            >
              {menuOpen ? (
                <div className="relative h-5 w-5 flex items-center justify-center">
                  <span className="absolute h-[1.5px] w-5 bg-gold rotate-45" />
                  <span className="absolute h-[1.5px] w-5 bg-gold -rotate-45" />
                </div>
              ) : (
                <>
                  <span className="h-[1.5px] w-5 bg-gold" />
                  <span className="h-[1.5px] w-5 bg-gold" />
                  <span className="h-[1.5px] w-3 bg-gold align-self-end ml-auto" />
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full-Screen Overlay Slide Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-cream/95 backdrop-blur-lg"
          >
            {/* Decorative floral motifs background */}
            <div className="absolute inset-4 pointer-events-none rounded-[1.5rem] border border-gold/10" />
            <div className="absolute top-8 left-8 h-4 w-4 border-t border-l border-gold/20" />
            <div className="absolute top-8 right-8 h-4 w-4 border-t border-r border-gold/20" />
            <div className="absolute bottom-8 left-8 h-4 w-4 border-b border-l border-gold/20" />
            <div className="absolute bottom-8 right-8 h-4 w-4 border-b border-r border-gold/20" />

            <div className="flex flex-col items-center gap-8 text-center z-10">
              <span className="text-[10px] tracking-luxury text-gold uppercase">Invitation Menu</span>
              <Ornament />
              
              <button 
                onClick={() => scrollToSection("invitation")}
                className="font-serif-display text-2xl tracking-widest text-ink hover:text-gold transition duration-300 uppercase"
              >
                Invitation Card
              </button>
              <button 
                onClick={() => scrollToSection("countdown")}
                className="font-serif-display text-2xl tracking-widest text-ink hover:text-gold transition duration-300 uppercase"
              >
                Countdown
              </button>
              <button 
                onClick={() => scrollToSection("event")}
                className="font-serif-display text-2xl tracking-widest text-ink hover:text-gold transition duration-300 uppercase"
              >
                Event Details
              </button>
              <button 
                onClick={() => scrollToSection("venue")}
                className="font-serif-display text-2xl tracking-widest text-ink hover:text-gold transition duration-300 uppercase"
              >
                Location &amp; Venue
              </button>
              <button 
                onClick={() => scrollToSection("family")}
                className="font-serif-display text-2xl tracking-widest text-ink hover:text-gold transition duration-300 uppercase"
              >
                The Family
              </button>
              <button 
                onClick={() => scrollToSection("rsvp")}
                className="font-serif-display text-2xl tracking-widest text-ink hover:text-gold transition duration-300 uppercase"
              >
                RSVP
              </button>

              <Ornament className="mt-2" />
              <span className="font-script text-xl text-gold-gradient tracking-wide mt-2">Suhana &amp; Midlaj</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero card is always mounted, but contains the button */}
      <Hero opened={opened} onOpen={handleOpen} />

      <AnimatePresence>
        {opened && (
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
          >
            <Invitation />
            <CountdownSection />
            <EventSection />
            <VenueSection />
            <Blessing />
            <FamilySection />
            <RsvpSection />
            <Footer />
          </motion.main>
        )}
      </AnimatePresence>

      {/* Floating Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-gold/25 bg-white/70 text-gold shadow-luxury backdrop-blur transition hover:bg-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-4 w-4"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
            </svg>
          </motion.button>
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
      {/* Background with Cinematic Ken Burns scale pan */}
      <div className="absolute inset-0 overflow-hidden">
        <img src={heroBg} alt="" className="h-full w-full object-cover animate-ken-burns" />
        <div className="absolute inset-0 bg-gradient-to-b from-cream/60 via-cream/40 to-cream" />
      </div>

      <FloatingPetals count={18} />

      {/* Corner florals with parallax scroll & interactive subtle scaling */}
      <motion.img
        style={{ y: y1 }}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.9 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        src={floralTL}
        alt=""
        className="pointer-events-none absolute -top-10 -left-10 w-[45vw] max-w-[520px] sm:w-[32vw]"
      />
      <motion.img
        style={{ y: y2 }}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.9 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        src={floralBR}
        alt=""
        className="pointer-events-none absolute -right-16 -bottom-16 w-[55vw] max-w-[600px] sm:w-[38vw]"
      />

      <motion.div style={{ opacity }} className="relative z-10 px-6 text-center mt-[-2vh]">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 1.2 }}
          className="font-arabic text-2xl text-ink/80 sm:text-3xl mb-2"
          dir="rtl"
        >
          بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
        </motion.p>

        <Ornament className="mt-2" />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.4, duration: 1 }}
          className="mt-10 text-[10px] tracking-luxury text-muted-foreground uppercase sm:text-xs"
        >
          The Wedding of
        </motion.p>

        <h1 className="font-script mt-2 text-6xl leading-[1.2] py-2 text-gold-gradient sm:text-8xl md:text-9xl overflow-hidden flex justify-center flex-wrap">
          {"Suhana".split("").map((char, index) => (
            <motion.span
              key={index}
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                delay: 2.5 + index * 0.08,
                duration: 0.8,
                ease: [0.215, 0.61, 0.355, 1],
              }}
              className="inline-block"
            >
              {char}
            </motion.span>
          ))}
        </h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 3.2, duration: 0.8 }}
          className="my-1 font-serif-display text-xl font-light text-ink/70 italic sm:text-2xl"
        >
          &amp;
        </motion.div>

        <h1 className="font-script text-6xl leading-[1.2] py-2 text-gold-gradient sm:text-8xl md:text-9xl overflow-hidden flex justify-center flex-wrap">
          {"Midlaj".split("").map((char, index) => (
            <motion.span
              key={index}
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                delay: 3.3 + index * 0.08,
                duration: 0.8,
                ease: [0.215, 0.61, 0.355, 1],
              }}
              className="inline-block"
            >
              {char}
            </motion.span>
          ))}
        </h1>

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
          <div className="mt-12 flex flex-col items-center justify-center relative select-none">
            <span className="rounded-full border border-gold/30 bg-white/40 px-5 py-2 text-[9px] font-semibold tracking-[0.3em] text-gold uppercase backdrop-blur-sm">
              Pull down to Open
            </span>
            
            {/* Draggable Hanging Cord with Arrow */}
            <motion.div
              drag="y"
              dragConstraints={{ top: 0, bottom: 90 }}
              dragElastic={0.2}
              dragSnapToOrigin
              onDragEnd={(event, info) => {
                // If pulled down past 65px, trigger the open handler
                if (info.offset.y > 65) {
                  onOpen();
                }
              }}
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: [0, 8, 0] }}
              transition={{
                opacity: { delay: 4.2, duration: 1 },
                y: { duration: 2, repeat: Infinity, ease: "easeInOut", repeatType: "mirror" }
              }}
              className="mt-4 flex flex-col items-center cursor-grab active:cursor-grabbing z-30"
            >
              {/* String line */}
              <div className="w-[1.5px] h-14 bg-gradient-to-b from-gold/40 via-gold to-gold-soft" />
              {/* Golden Round Badge with Down Arrow */}
              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/60 bg-gradient-to-b from-gold-soft to-gold text-white shadow-luxury">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="h-4 w-4 animate-bounce"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </div>
            </motion.div>
          </div>
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
    <section id={id} className={`relative px-6 py-12 sm:py-16 ${className}`}>
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
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Section id="invitation" className="!pb-12">
      <Reveal className="text-center">
        <SectionLabel>Invitation</SectionLabel>
        <Ornament className="mt-6" />

        {/* Physical Invitation Card Display */}
        <div className="mt-12 max-w-md mx-auto">
          <div 
            onClick={() => setIsOpen(true)}
            className="group relative cursor-pointer overflow-hidden rounded-2xl border border-gold/15 bg-white/50 p-2.5 backdrop-blur-md shadow-luxury transition hover:-translate-y-0.5 duration-300"
          >
            <div className="relative aspect-[1/1.4] w-full overflow-hidden rounded-xl">
              <img 
                src={cardImg} 
                alt="Suhana & Midlaj Wedding Invitation Card" 
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
              {/* Overlay with Zoom Icon */}
              <div className="absolute inset-0 bg-ink/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-gold shadow-md">
                  <ZoomIn size={22} />
                </div>
              </div>
            </div>
            <div className="mt-3.5 flex items-center justify-between px-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5 font-medium tracking-[0.05em] uppercase text-[10px] text-gold">
                <ZoomIn size={12} /> Tap to view fullscreen
              </span>
              <a 
                href={cardImg} 
                download="Suhana-Midlaj-Wedding-Invitation-Card.jpeg"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1 hover:text-gold transition font-medium tracking-[0.05em] uppercase text-[10px]"
              >
                <Download size={12} /> Save Card
              </a>
            </div>
          </div>
        </div>

        {/* Lightbox / Zoom Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[110] flex items-center justify-center bg-ink/95 p-4 backdrop-blur-md"
            >
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition backdrop-blur"
              >
                <X size={20} />
              </button>
              
              <motion.div 
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                className="relative max-h-[85vh] max-w-[95vw] sm:max-w-md overflow-hidden rounded-2xl bg-white p-2 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <img 
                  src={cardImg} 
                  alt="Suhana & Midlaj Wedding Invitation Card" 
                  className="max-h-[80vh] w-auto rounded-xl object-contain"
                />
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                  <a 
                    href={cardImg} 
                    download="Suhana-Midlaj-Wedding-Invitation-Card.jpeg"
                    className="flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-[10px] font-semibold tracking-luxury text-white uppercase shadow-md transition hover:bg-gold-soft"
                  >
                    <Download size={12} /> Download Card
                  </a>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
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
        <div className="relative mx-auto max-w-sm overflow-hidden rounded-3xl border border-gold/15 bg-white/60 p-8 text-center backdrop-blur-md shadow-luxury">
          {/* Delicate inner decorative border */}
          <div className="absolute inset-3 pointer-events-none rounded-[1.25rem] border border-gold/10" />
          
          {/* Subtle gold corner accent ornaments */}
          <div className="absolute top-4 left-4 h-3 w-3 border-t border-l border-gold/30" />
          <div className="absolute top-4 right-4 h-3 w-3 border-t border-r border-gold/30" />
          <div className="absolute bottom-4 left-4 h-3 w-3 border-b border-l border-gold/30" />
          <div className="absolute bottom-4 right-4 h-3 w-3 border-b border-r border-gold/30" />

          {/* Month Header Badge */}
          <div className="mx-auto inline-block rounded-full bg-gold/10 px-4 py-1 text-[10px] font-semibold tracking-[0.25em] text-gold uppercase mb-5">
            August 2026
          </div>
          
          {/* Big Calendar Date Number */}
          <div className="font-serif-display text-7xl font-light text-ink leading-none tracking-tighter select-none">
            09
          </div>
          
          {/* Day of the Week with side ornaments */}
          <div className="flex items-center justify-center gap-3 my-4">
            <span className="h-[1px] w-8 bg-gold/25" />
            <span className="font-serif-display text-lg text-ink font-light tracking-widest uppercase">Sunday</span>
            <span className="h-[1px] w-8 bg-gold/25" />
          </div>

          {/* Time and details info */}
          <div className="mt-6 flex flex-col items-center justify-center gap-1.5 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5 font-medium text-ink/80">
              <Clock size={13} className="text-gold" />
              12:00 PM &mdash; 02:00 PM
            </div>
            <div className="tracking-wide text-[10px] text-muted-foreground uppercase mt-0.5">
              Wedding Reception
            </div>
          </div>
          
          {/* Calendar Sync Action */}
          <div className="mt-8 relative z-10">
            <a
              href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Suhana+%26+Midlaj+Wedding&dates=20260809T063000Z/20260809T083000Z&details=The+Shasa+Family+invites+you+to+the+wedding+of+Dr.+Suhana+Suaibu+%26+Mohammed+Midlaj+at+Shasa+Venue+Arakkinar.&location=Shasa+Venue,+Arakkinar,+Kozhikode,+Kerala"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold to-gold-soft px-6 py-3 text-[10px] font-semibold tracking-luxury text-white uppercase shadow-soft hover:shadow-luxury transition-all duration-300 hover:-translate-y-0.5"
            >
              <Calendar size={12} className="-mt-0.5" /> Add to Calendar
            </a>
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
        <SectionLabel>Location</SectionLabel>
        <h3 className="mt-4 font-serif-display text-3xl font-light text-ink sm:text-5xl">
          The Venue
        </h3>
      </Reveal>

      <Reveal delay={0.15} className="mt-10">
        <div className="relative mx-auto max-w-sm overflow-hidden rounded-3xl border border-gold/15 bg-white/60 p-8 text-center backdrop-blur-md shadow-luxury">
          {/* Delicate inner decorative border */}
          <div className="absolute inset-3 pointer-events-none rounded-[1.25rem] border border-gold/10" />
          
          {/* Subtle gold corner accent ornaments */}
          <div className="absolute top-4 left-4 h-3 w-3 border-t border-l border-gold/30" />
          <div className="absolute top-4 right-4 h-3 w-3 border-t border-r border-gold/30" />
          <div className="absolute bottom-4 left-4 h-3 w-3 border-b border-l border-gold/30" />
          <div className="absolute bottom-4 right-4 h-3 w-3 border-b border-r border-gold/30" />

          {/* Location pin badge icon */}
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gold/10 text-gold mb-5">
            <MapPin size={20} />
          </div>
          
          <h4 className="font-script text-5xl leading-tight text-gold-gradient mb-2 py-1">
            Shasa
          </h4>
          
          <p className="text-xs tracking-widest text-ink font-semibold uppercase mb-1">
            Arakkinar, Kozhikode
          </p>
          <p className="text-[11px] text-muted-foreground max-w-xs mx-auto leading-relaxed mb-8">
            Behind Crystal Plaza, Arakkinar, Kozhikode, Kerala
          </p>

          <div className="flex flex-col gap-3 relative z-10">
            <a
              href={MAP_URL}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-gold/35 bg-white/30 px-6 py-3 text-[10px] font-semibold tracking-luxury text-gold uppercase transition hover:bg-gold/10"
            >
              Open Map
            </a>
            <a
              href={MAP_URL}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold to-gold-soft px-6 py-3 text-[10px] font-semibold tracking-luxury text-white uppercase shadow-soft hover:shadow-luxury transition-all duration-300 hover:-translate-y-0.5"
            >
              <Navigation size={11} className="-mt-0.5" /> Navigate
            </a>
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
