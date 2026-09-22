import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function OpeningReveal({ onComplete }: { onComplete?: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    // Prevent scrolling
    document.body.style.overflow = "hidden";
    
    // Start opening after 1.5s as requested
    const openTimer = setTimeout(() => {
      setIsOpen(true);
    }, 1500);

    // Hide from DOM after animation completes (1.5s + 3.5s animation = 5.0s total)
    const hideTimer = setTimeout(() => {
      setIsHidden(true);
      document.body.style.overflow = "";
      if (onComplete) onComplete();
    }, 5000);

    return () => {
      clearTimeout(openTimer);
      clearTimeout(hideTimer);
      document.body.style.overflow = "";
    };
  }, [onComplete]);

  if (isHidden) return null;

  return (
    <div className="fixed inset-0 z-[250] flex" style={{ backgroundColor: isOpen ? 'transparent' : '#4A0715' }}>
      
      {/* Left Panel */}
      <motion.div
        initial={{ x: "0%" }}
        animate={{ x: isOpen ? "-100%" : "0%" }}
        transition={{ duration: 3.5, ease: [0.76, 0, 0.24, 1] }}
        className="w-1/2 h-full relative overflow-hidden"
        style={{ pointerEvents: isOpen ? "none" : "auto" }}
      >
        <img 
          src="/new-doors.png" 
          alt="" 
          className="absolute top-0 left-0 w-full max-w-none h-full object-cover object-center pointer-events-none"
        />
        {/* Subtle center seam overlay to ensure perfect edge */}
        <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-maroon-deep/30"></div>
      </motion.div>

      {/* Right Panel */}
      <motion.div
        initial={{ x: "0%" }}
        animate={{ x: isOpen ? "100%" : "0%" }}
        transition={{ duration: 3.5, ease: [0.76, 0, 0.24, 1] }}
        className="w-1/2 h-full relative overflow-hidden"
        style={{ pointerEvents: isOpen ? "none" : "auto" }}
      >
        <img 
          src="/new-doors.png" 
          alt="" 
          className="absolute top-0 right-0 w-full max-w-none h-full object-cover object-center pointer-events-none"
        />
        {/* Subtle center seam overlay to ensure perfect edge */}
        <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-maroon-deep/30"></div>
      </motion.div>
    </div>
  );
}
