import { useState } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const items = Array.from({ length: 9 }, (_, i) => ({
  id: i,
  h: [280, 380, 320, 420, 300, 360, 340, 400, 300][i],
  hue: [80, 85, 75, 90, 70, 82, 78, 88, 72][i],
}));

export function Gallery() {
  const [active, setActive] = useState<number | null>(null);
  return (
    <>
      <div className="columns-2 gap-4 sm:columns-3 sm:gap-6">
        {items.map((it) => (
          <button
            key={it.id}
            onClick={() => setActive(it.id)}
            className="group mb-4 block w-full overflow-hidden rounded-2xl shadow-soft sm:mb-6"
            style={{ height: it.h }}
          >
            <div
              className="h-full w-full transition-transform duration-700 group-hover:scale-110"
              style={{
                background: `linear-gradient(135deg, oklch(0.94 0.03 ${it.hue}), oklch(0.85 0.06 ${it.hue + 10}) 60%, oklch(0.75 0.08 ${it.hue - 5}))`,
              }}
            />
          </button>
        ))}
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink/80 p-6 backdrop-blur-xl"
            onClick={() => setActive(null)}
          >
            <button
              onClick={() => setActive(null)}
              className="absolute top-6 right-6 text-white/80 hover:text-white"
              aria-label="Close"
            >
              <X size={28} />
            </button>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="h-[70vh] w-full max-w-3xl rounded-3xl"
              style={{
                background: `linear-gradient(135deg, oklch(0.94 0.03 ${items[active].hue}), oklch(0.78 0.08 ${items[active].hue + 10}))`,
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
