import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Props {
  children: React.ReactNode;
  onReveal?: () => void;
}

export function ScratchToReveal({ children, onReveal }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const isDrawing = useRef(false);
  const lastPoint = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    // Small delay to ensure the container has rendered its full size
    const updateCanvasSize = () => {
      const rect = container.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) {
        requestAnimationFrame(updateCanvasSize);
        return;
      }
      
      const width = rect.width;
      const height = rect.height;
      
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      
      ctx.scale(dpr, dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      // Scroll parchment base
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, "#e6cda3"); 
      gradient.addColorStop(0.5, "#f7ebd5");
      gradient.addColorStop(1, "#e6cda3"); 
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.rect(0, 0, width, height); // Square corners for scroll body
      ctx.fill();

      // Top and bottom borders (scroll edges)
      ctx.fillStyle = "#c79d5e";
      ctx.fillRect(0, 0, width, 1);
      ctx.fillRect(0, height - 1, width, 1);

      // Scroll horizontal texture lines
      ctx.fillStyle = "rgba(140, 98, 48, 0.05)";
      for (let i = 0; i < width; i += 4) {
        ctx.fillRect(i, 0, 2, height);
      }

      // Decorative flourish (top and bottom)
      ctx.strokeStyle = "rgba(122, 90, 41, 0.3)";
      ctx.lineWidth = 1;
      
      const drawFlourish = (y: number) => {
        ctx.beginPath();
        ctx.moveTo(width / 2 - 40, y);
        ctx.quadraticCurveTo(width / 2 - 20, y - 6, width / 2, y);
        ctx.quadraticCurveTo(width / 2 + 20, y + 6, width / 2 + 40, y);
        ctx.stroke();
      };
      
      drawFlourish(20);
      drawFlourish(height - 20);

      // "SCRATCH TO REVEAL DATE" text
      ctx.fillStyle = "#5C4524";
      ctx.font = "bold 13px 'Georgia', 'Times New Roman', serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.letterSpacing = "2px";
      ctx.fillText("SCRATCH TO REVEAL DATE", width / 2, height / 2);

      // Subtle hand icon hint below text
      ctx.fillStyle = "rgba(122, 90, 41, 0.5)";
      ctx.font = "10px 'Georgia', serif";
      ctx.fillText("✦  ✦  ✦", width / 2, height / 2 + 18);
    };

    updateCanvasSize();
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    if (isRevealed) return;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    isDrawing.current = true;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    lastPoint.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDrawing.current || isRevealed) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || !lastPoint.current) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.globalCompositeOperation = "destination-out";
    ctx.lineWidth = 45;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    ctx.beginPath();
    ctx.moveTo(lastPoint.current.x, lastPoint.current.y);
    ctx.lineTo(x, y);
    ctx.stroke();

    lastPoint.current = { x, y };
    
    checkReveal();
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (isDrawing.current) {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    }
    isDrawing.current = false;
    lastPoint.current = null;
  };

  let checkThrottle = 0;
  const checkReveal = () => {
    checkThrottle++;
    if (checkThrottle % 4 !== 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || isRevealed) return;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparent = 0;
    
    const step = 64; 
    const totalPixelsChecked = Math.floor(pixels.length / 4 / step);
    
    for (let i = 3; i < pixels.length; i += 4 * step) {
      if (pixels[i] < 128) {
        transparent++;
      }
    }
    
    const percentage = transparent / totalPixelsChecked;
    if (percentage > 0.40) {
      setIsRevealed(true);
      if (onReveal) onReveal();
    }
  };

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-full select-none rounded-2xl" 
      style={{ touchAction: 'none' }}
    >
      {children}
      <motion.canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        animate={{ opacity: isRevealed ? 0 : 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className={`absolute inset-0 z-20 cursor-crosshair rounded-2xl ${isRevealed ? "pointer-events-none" : ""}`}
        style={{ touchAction: 'none' }}
      />
    </div>
  );
}
