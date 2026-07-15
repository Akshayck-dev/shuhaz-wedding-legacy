import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { MapPin, Navigation, Calendar, Clock, ZoomIn, Download, X } from "lucide-react";

import floralTL from "@/assets/floral-tl.png";
import floralBR from "@/assets/floral-br.png";
import heroBg from "@/assets/ChatGPT Image Jul 14, 2026, 10_09_24 PM.png";
import heroBgDesktop from "@/assets/ChatGPT Image Jul 14, 2026, 10_11_34 PM.png";
import eventBg from "@/assets/ChatGPT Image Jul 14, 2026, 09_39_54 AM.png";
import eventBgDesktop from "@/assets/ChatGPT Image Jul 14, 2026, 09_40_59 AM.png";
import rose from "@/assets/rose.png";
import cardImg from "@/assets/card.jpeg";

import { FloatingPetals } from "@/components/wedding/FloatingPetals";
import { FloatingButterflies } from "@/components/wedding/FloatingButterflies";
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
  "Naju", "Anu", "Sabaniya", "Shamsiya", "Naufan", "Fabi", "Faaz",
  "Hamilan", "Faiza", "Falyn", "Hanym", "Heizan", "Neva",
];

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Suhana & Midlaj — Wedding · 9 August 2026" },
      { name: "description", content: "The family invites you to the wedding of Dr. Suhana Suaibu & Mohammed Midlaj." },
    ],
  }),
});

function Index() {
  const [loading, setLoading] = useState(true);
  const { scrollY } = useScroll();
  const [showMarquee, setShowMarquee] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  function handleEnter() {
    // Dispatch event so MusicToggle starts audio on this real user interaction
    document.dispatchEvent(new Event("wedding:enter"));
    setLoading(false);
  }

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      // Show marquee if scrolled down past 400px
      if (latest > 400) {
        setShowMarquee(true);
      } else {
        setShowMarquee(false);
      }
      
      // Show scroll-to-top button if scrolled past 600px
      if (latest > 600) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    });
  }, [scrollY]);

  const [menuOpen, setMenuOpen] = useState(false);

  const handleOpen = () => {
    // Smooth scroll to the invitation section if they click the scroll indicator
    const invitationSection = document.getElementById("invitation");
    if (invitationSection) {
      invitationSection.scrollIntoView({ behavior: "smooth" });
    }
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
    <div className="relative min-h-screen bg-background">
      <AnimatePresence>{loading && <Loader onEnter={handleEnter} />}</AnimatePresence>
      <MusicToggle />



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

      <Hero onOpen={handleOpen} />

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.3 }}
      >
        <EventSection />
        <CountdownSection />
        <VenueSection />
        <Invitation />
        <Blessing />
        <FamilySection />
        <RsvpSection />
        <Footer />
      </motion.main>

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
function Loader({ onEnter }: { onEnter: () => void }) {
  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-cream"
    >
      <div className="text-center px-6">
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

        {/* Tap to Enter — required for browser audio autoplay */}
        <motion.button
          onClick={onEnter}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.7 }}
          className="mt-10 inline-flex items-center gap-2 rounded-full border border-gold/50 bg-gold/10 px-8 py-3 text-[10px] font-semibold tracking-[0.25em] text-ink uppercase backdrop-blur hover:bg-gold hover:text-white transition-all duration-300 shadow-sm"
        >
          <span>♪</span> Tap to Enter
        </motion.button>
      </div>
    </motion.div>
  );
}

/* ---------------- Hero ---------------- */
function Hero({ onOpen }: { onOpen: () => void }) {
  return (
    <section className="relative h-[100svh] w-full overflow-hidden flex items-start justify-center">
      {/* Background */}
      <div className="absolute inset-0">
        <picture>
          <source media="(min-width: 640px)" srcSet={heroBgDesktop} />
          <img src={heroBg} alt="" className="h-full w-full object-cover animate-ken-burns" />
        </picture>
      </div>
      <FloatingButterflies count={12} />

      <div className="relative z-10 px-6 text-center w-full max-w-md mx-auto h-full flex flex-col items-center justify-start pt-[20vh]">
        <div className="relative overflow-hidden bg-transparent p-8 pb-10 text-center w-full">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.4, duration: 1 }}
            className="mb-6 inline-block mx-auto"
          >
            <span className="rounded-sm border border-gold/20 px-4 py-1.5 text-[8px] font-semibold tracking-[0.3em] text-ink/70 uppercase">
              Wedding
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.8, duration: 1, ease: "easeOut" }}
            className="font-serif-display text-2xl sm:text-3xl leading-[1.2] font-bold tracking-wide text-ink uppercase mt-2">
            DR. SUHANA SUAIBU
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 3.2, duration: 0.8 }}
            className="my-4 flex items-center justify-center gap-4"
          >
            <div className="h-[1px] w-12 bg-gold/40"></div>
            <span className="font-serif-display text-2xl font-light text-gold/80 italic">&amp;</span>
            <div className="h-[1px] w-12 bg-gold/40"></div>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.4, duration: 1, ease: "easeOut" }}
            className="font-serif-display text-2xl sm:text-3xl leading-[1.2] font-bold tracking-wide text-ink uppercase mt-2">
            MOHAMMED MIDLAJ
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.6, duration: 1 }}
            className="mt-6 text-[10px] tracking-[0.2em] font-medium text-gold uppercase"
          >
            Sunday, August 9, 2026
          </motion.p>
        </div>

        <div className="mt-auto absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center cursor-pointer select-none" onClick={onOpen}>
          <span className="text-[9px] font-bold tracking-[0.3em] text-gold uppercase mb-2">SCROLL</span>
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ repeat: Infinity, duration: 1.5, repeatType: "mirror" }}
            className="flex flex-col gap-0.5 text-gold/60"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
          </motion.div>
        </div>
      </div>
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
    <Section id="countdown" className="bg-[#FDFBF7] flex flex-col items-center justify-center py-10 sm:py-12 relative overflow-hidden">
      <Reveal className="text-center w-full z-10">
        <Ornament className="mb-4 rotate-180" />
        <SectionLabel>Counting Down</SectionLabel>
        
        <div className="mt-8">
          <Countdown />
        </div>

        <Ornament className="mt-12" />

        <div className="mt-12 text-center">
          <SectionLabel>We Welcome You</SectionLabel>
          <div className="text-gold/20 mt-4">
            <svg className="w-10 h-10 mx-auto" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
          </div>
          <p className="font-serif italic text-ink/90 text-[14px] sm:text-[15px] leading-relaxed max-w-md mx-auto mt-4 px-6 text-center">
            You have played a beautiful part in our love story. Now we invite you to be there as we write the most important chapter yet.
          </p>

          <div className="mt-8">
            <h4 className="font-serif-display text-lg sm:text-xl text-ink font-semibold">
              Mr. N. P. Shuhaib &amp; Mrs. K. V. Asmabi
            </h4>
            <p className="text-[9px] tracking-widest text-muted-foreground uppercase mt-4 max-w-xs mx-auto leading-loose">
              Request the pleasure of your presence and prayers at the
            </p>
            <h3 className="font-script text-4xl text-gold mt-4 mb-2">Wedding</h3>
            <p className="text-[9px] tracking-widest text-muted-foreground uppercase mb-6">
              Of their beloved daughter
            </p>

            <h4 className="font-serif-display text-2xl sm:text-3xl text-ink uppercase tracking-wide">
              Dr. Suhana Suaibu
            </h4>
            
            <div className="my-4 text-gold/40 flex items-center justify-center gap-4">
              <div className="h-[1px] w-12 bg-gold/40"></div>
              <span className="font-serif italic text-sm text-gold">with</span>
              <div className="h-[1px] w-12 bg-gold/40"></div>
            </div>

            <h4 className="font-serif-display text-2xl sm:text-3xl text-ink uppercase tracking-wide">
              Mohammed Midlaj
            </h4>
            <p className="font-serif italic text-[11px] sm:text-xs text-muted-foreground mt-3">
              S/o V. Imbichi Mammu and Fousiya PM
            </p>
          </div>
        </div>
      </Reveal>
      
      {/* Background floral hints */}
      <FloatingPetals count={10} />
    </Section>
  );
}

/* ---------------- Add to Calendar Button ---------------- */
function AddToCalendarButton() {
  function handleAddToCalendar() {
    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Suhana & Midlaj Wedding//EN",
      "BEGIN:VEVENT",
      "UID:suhana-midlaj-wedding-2026@shuhaz",
      "DTSTART:20260809T063000Z",
      "DTEND:20260809T083000Z",
      "SUMMARY:Suhana & Midlaj Wedding",
      "DESCRIPTION:The family invites you to the wedding of Dr. Suhana Suaibu & Mohammed Midlaj",
      "LOCATION:Shasa\\, Behind Crystal Plaza\\, Arakkinar",
      "STATUS:CONFIRMED",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "suhana-midlaj-wedding.ics";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  return (
    <button
      onClick={handleAddToCalendar}
      className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-[#FDFBF7]/80 px-8 py-3 text-[9px] font-bold tracking-[0.2em] text-ink uppercase shadow-sm hover:bg-gold hover:text-white transition-all duration-300 backdrop-blur-md"
    >
      <Calendar size={12} className="-mt-0.5" /> Add to Calendar
    </button>
  );
}

/* ---------------- Event ---------------- */

function EventSection() {
  return (
    <section className="relative flex items-center justify-center py-12 sm:py-16 overflow-hidden" id="event">
      <div className="absolute inset-0 overflow-hidden">
        <picture>
          <source media="(min-width: 640px)" srcSet={eventBgDesktop} />
          <img src={eventBg} alt="" className="h-full w-full object-cover" />
        </picture>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="relative z-10 px-6 text-center w-full max-w-md mx-auto flex flex-col items-center">
        <div className="mb-8 sm:mb-12">
          <span className="rounded-sm border border-gold/20 px-5 py-2 text-[9px] font-semibold tracking-[0.3em] text-ink/70 uppercase bg-[#FDFBF7]/60 backdrop-blur-sm">
            Wedding
          </span>
        </div>
        
        {/* Spacer for where the rings are in the background image */}
        <div className="h-20 sm:h-28"></div>
        <h4 className="font-serif-display text-sm sm:text-base text-ink uppercase tracking-widest text-gold-gradient font-semibold">
          SUNDAY
        </h4>
        <h3 className="font-serif-display text-xl sm:text-2xl text-gold mt-2 tracking-wider">
          9 AUGUST 2026 12:00 PM - 02:00 PM
        </h3>

        <div className="my-6 text-gold/30 flex items-center justify-center gap-4">
          <div className="h-[1px] w-12 bg-gold/40"></div>
          <Ornament />
          <div className="h-[1px] w-12 bg-gold/40"></div>
        </div>

        <p className="text-[10px] tracking-[0.3em] font-medium text-muted-foreground uppercase mb-2">
          VENUE
        </p>
        <h4 className="font-serif-display text-lg sm:text-xl text-ink font-bold uppercase tracking-widest">
          Shasa
        </h4>
        <p className="text-[8px] sm:text-[9px] tracking-widest text-muted-foreground uppercase mt-3 leading-relaxed max-w-[280px] mx-auto font-medium">
          Behind Crystal Plaza, Arakkinar.
        </p>
        
        <div className="mt-8 mb-16">
          <AddToCalendarButton />
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center">
        <span className="text-[8px] font-bold tracking-[0.4em] text-gold/80 uppercase mb-2">Scroll</span>
        <div className="flex flex-col gap-0.5 text-gold/60">
          <svg className="w-4 h-4 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
          <svg className="w-4 h-4 animate-bounce" style={{ marginTop: "-12px", animationDelay: "0.2s" }} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Venue ---------------- */
function VenueSection() {
  return (
    <Section id="venue" className="bg-[#FDFBF7]">
      <Reveal className="text-center w-full">
        <SectionLabel>FIND US</SectionLabel>
        <h3 className="mt-4 font-serif-display text-2xl font-light text-ink uppercase tracking-wide">
          Shasa
        </h3>
        <p className="text-[8px] tracking-[0.2em] text-muted-foreground uppercase mt-3">
          Behind Crystal Plaza, Arakkinar
        </p>
      </Reveal>

      <Reveal delay={0.15} className="mt-8">
        <div className="relative mx-auto max-w-sm rounded-[1.5rem] bg-[#EBE7DF] overflow-hidden shadow-sm h-64 border border-gold/10">
          {/* Mock stylized map graphics */}
          <div className="absolute top-4 left-4 right-4 h-12 flex gap-4">
            <div className="w-1/3 bg-[#DCD8CD] rounded-lg"></div>
            <div className="w-2/3 flex flex-col gap-2">
              <div className="w-full h-4 bg-[#F5F2EB] rounded-full"></div>
              <div className="w-2/3 h-4 bg-[#F5F2EB] rounded-full"></div>
            </div>
          </div>
          <div className="absolute top-20 left-0 right-0 h-4 bg-[#F5F2EB]"></div>
          <div className="absolute top-28 left-1/3 w-4 h-full bg-[#F5F2EB]"></div>
          
          <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
             <div className="w-10 h-10 rounded-full border-2 border-gold/40 absolute scale-150"></div>
             <div className="w-8 h-8 rounded-full bg-gold/90 text-white flex items-center justify-center shadow-lg">
                <MapPin size={16} />
             </div>
          </div>

          <div className="absolute bottom-4 left-4 right-4 bg-white p-4 rounded-xl shadow-luxury flex items-center justify-between border border-gold/10">
             <div>
               <h4 className="font-bold text-[11px] text-ink">Shasa</h4>
               <p className="text-[8px] text-muted-foreground mt-1 line-clamp-1">Behind Crystal Plaza, Arakkinar</p>
             </div>
             <a
              href={MAP_URL}
              target="_blank"
              rel="noreferrer"
              className="bg-[#B98F45] text-white px-4 py-2 rounded-lg text-[9px] font-bold tracking-wider hover:bg-[#A37B3B] transition"
             >
               Directions &rarr;
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
          Shasa Family
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
        <p className="mt-4 font-serif-display text-2xl text-ink sm:text-3xl">Shasa Family</p>
        <p className="mt-10 text-[10px] tracking-luxury text-muted-foreground uppercase">
          Suhana &amp; Midlaj · 09 · 08 · 2026
        </p>
      </Reveal>
    </footer>
  );
}
