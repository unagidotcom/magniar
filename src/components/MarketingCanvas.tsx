import React, { useEffect, useRef } from "react";

interface NodeParticle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  label?: string;
  type: "node" | "text" | "arrow" | "chart" | "burst";
  hue: number;
  life?: number;
  maxLife?: number;
}

const MARKETING_PHRASES = [
  "+480% ROAS",
  "LTV/CAC 4.5x",
  "CAPI Sync",
  "PMax Boost",
  "Conversions",
  "Scale Node",
  "+340% Traffic",
  "Market Capture",
  "Revenue Uplift",
  "Lead Velocity",
  "99/100 Speed",
  "Attribution Key",
];

export default function MarketingCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameId = useRef<number | null>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: 0,
    y: 0,
    active: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 800);

    // Track particles
    let particles: NodeParticle[] = [];
    let particleId = 0;

    // Initialize baseline drift particles
    const initParticles = () => {
      particles = [];
      const count = Math.min(Math.floor(width / 25), 45);
      for (let i = 0; i < count; i++) {
        const isText = Math.random() > 0.65;
        const index = Math.floor(Math.random() * MARKETING_PHRASES.length);
        const label = MARKETING_PHRASES[index];

        particles.push({
          id: particleId++,
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.35,
          vy: -Math.random() * 0.5 - 0.2, // always floating upwards to represent scaling growth
          size: isText ? 1 : Math.random() * 2.5 + 1.5,
          alpha: Math.random() * 0.3 + 0.15,
          label: isText ? label : undefined,
          type: isText ? "text" : "node",
          hue: Math.random() > 0.5 ? 217 : 200, // Matching slate/brand-blue hues (217 = Blue, 200 = Light blue)
        });
      }
    };

    initParticles();

    // Resize handler
    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    const resizeObserver = new ResizeObserver(() => handleResize());
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    // Capture global mouse movements relative to container
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    canvas.parentElement?.addEventListener("mouseleave", handleMouseLeave);

    // Handle custom word hover bursts
    const handleWordBurst = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (!detail) return;
      const { x, y } = detail;

      // Spawn 3 rapid growth nodes at target coordinate
      for (let i = 0; i < 3; i++) {
        const isText = Math.random() > 0.7;
        const wordText = isText ? MARKETING_PHRASES[Math.floor(Math.random() * MARKETING_PHRASES.length)] : undefined;
        
        particles.push({
          id: particleId++,
          x: x + (Math.random() - 0.5) * 20,
          y: y + (Math.random() - 0.5) * 10,
          vx: (Math.random() - 0.5) * 1.5,
          vy: -Math.random() * 1.8 - 0.8, // eject upwards nicely
          size: isText ? 1 : Math.random() * 4 + 2,
          alpha: 1.0, // highly visible initially
          label: wordText,
          type: "burst",
          hue: Math.random() > 0.4 ? 217 : 190, // brand-blue gradients
          life: 0,
          maxLife: 40 + Math.random() * 30, // live briefly (40-70 frames)
        });
      }
    };

    window.addEventListener("magniar-word-burst", handleWordBurst);

    // Draw functions
    const drawChart = (ctx: CanvasRenderingContext2D, x: number, y: number, alpha: number) => {
      // Small ascending line chart represent metrics
      ctx.beginPath();
      ctx.strokeStyle = `rgba(59, 130, 246, ${alpha * 0.75})`;
      ctx.lineWidth = 1;
      ctx.moveTo(x - 15, y + 8);
      ctx.lineTo(x - 5, y + 3);
      ctx.lineTo(x + 5, y + 10);
      ctx.lineTo(x + 15, y - 5);
      ctx.stroke();

      // Mini green peak dot
      ctx.beginPath();
      ctx.fillStyle = `rgba(16, 185, 129, ${alpha * 0.9})`;
      ctx.arc(x + 15, y - 5, 2.5, 0, Math.PI * 2);
      ctx.fill();
    };

    const drawPlus = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, alpha: number) => {
      ctx.beginPath();
      ctx.strokeStyle = `rgba(96, 165, 250, ${alpha * 0.6})`;
      ctx.lineWidth = 1;
      ctx.moveTo(x - size, y);
      ctx.lineTo(x + size, y);
      ctx.moveTo(x, y - size);
      ctx.lineTo(x, y + size);
      ctx.stroke();
    };

    // Animation Loop
    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Mouse Coordinates cache
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const isMouseActive = mouseRef.current.active;

      // Draw Connection lines before dots
      particles.forEach((p, idx) => {
        // Line linking to nearby particles
        for (let j = idx + 1; j < particles.length; j++) {
          const other = particles[j];
          const dx = p.x - other.x;
          const dy = p.y - other.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Connect nodes within 90px threshold
          if (dist < 90) {
            const connectAlpha = (1 - dist / 90) * p.alpha * other.alpha * (p.type === "burst" ? 1.5 : 1);
            ctx.beginPath();
            ctx.strokeStyle = `rgba(59, 130, 246, ${connectAlpha * 0.35})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        }

        // Move to the Mouse Cursor
        if (isMouseActive) {
          const mdx = p.x - mx;
          const mdy = p.y - my;
          const mDist = Math.sqrt(mdx * mdx + mdy * mdy);

          // Interactive magnetism bubble (160px hover)
          if (mDist < 160) {
            const interactAlpha = (1 - mDist / 160) * 0.8;
            
            // Connect line to cursor directly
            ctx.beginPath();
            ctx.strokeStyle = `rgba(96, 165, 250, ${interactAlpha * p.alpha * 0.4})`;
            ctx.lineWidth = 0.75;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mx, my);
            ctx.stroke();

            // Sucking gravity pull
            p.x -= mdx * 0.015;
            p.y -= mdy * 0.015;
          }
        }
      });

      // Update and draw each particle
      particles = particles.filter((p) => {
        // Drift movement
        p.x += p.vx;
        p.y += p.vy;

        // Custom state logic for bursts
        if (p.type === "burst" && p.life !== undefined && p.maxLife !== undefined) {
          p.life++;
          p.alpha = 1 - p.life / p.maxLife;
          p.size = (1 - p.life / p.maxLife) * 4 + 1.5;
          
          if (p.life >= p.maxLife) {
            return false; // delete dead particles
          }
        }

        // Loop baseline particles around screenspace borders
        if (p.type !== "burst") {
          if (p.x < -40) p.x = width + 40;
          if (p.x > width + 40) p.x = -40;
          if (p.y < -40) {
            p.y = height + 40;
            p.x = Math.random() * width;
          }
        }

        // Drawing details
        if (p.label) {
          // Label texts
          ctx.save();
          ctx.fillStyle = `rgba(243, 244, 246, ${p.alpha * 1.2})`;
          ctx.font = `600 10px var(--font-mono, "JetBrains Mono", monospace)`;
          ctx.shadowColor = `rgba(59, 130, 246, 0.4)`;
          ctx.shadowBlur = 4;
          ctx.fillText(p.label, p.x + 8, p.y + 3);
          
          // Draw small diagnostic growth ticker shape
          drawChart(ctx, p.x, p.y, p.alpha);
          ctx.restore();
        } else {
          // Standard structural plus vector / bubble node
          if (p.id % 4 === 0) {
            drawPlus(ctx, p.x, p.y, p.size + 1, p.alpha);
          } else {
            ctx.beginPath();
            ctx.fillStyle = `rgba(96, 165, 250, ${p.alpha})`;
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
          }
        }

        return true;
      });

      // Draw special real-time futuristic mouse reticle HUD
      if (isMouseActive) {
        ctx.save();
        
        // Double concentric glowing interactive rings
        ctx.beginPath();
        ctx.strokeStyle = "rgba(59, 130, 246, 0.25)";
        ctx.arc(mx, my, 8, 0, Math.PI * 2);
        ctx.stroke();

        ctx.beginPath();
        ctx.strokeStyle = "rgba(59, 130, 246, 0.08)";
        ctx.setLineDash([4, 4]);
        ctx.arc(mx, my, 22, 0, Math.PI * 2);
        ctx.stroke();

        // High-end agency overlay labels following cursor
        ctx.fillStyle = "rgba(96, 165, 250, 0.45)";
        ctx.font = "bold 8px var(--font-mono)";
        ctx.fillText("GROWTH ORBIT INDUCTION", mx + 16, my - 6);
        
        ctx.strokeStyle = "rgba(96, 165, 250, 0.3)";
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(mx, my);
        ctx.lineTo(mx + 12, my - 10);
        ctx.lineTo(mx + 35, my - 10);
        ctx.stroke();

        ctx.restore();
      }

      animationFrameId.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("magniar-word-burst", handleWordBurst);
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 h-full w-full pointer-events-none"
      id="hero-marketing-visual-canvas"
    />
  );
}
