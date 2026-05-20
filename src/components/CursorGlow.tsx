import { useEffect, useState } from "react";

export default function CursorGlow() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    // Check if device is desktop
    const checkViewportAndTouch = () => {
      const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
      setIsMobile(isTouch || window.innerWidth < 768);
    };

    checkViewportAndTouch();
    window.addEventListener("resize", checkViewportAndTouch);

    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);
    };

    const handleMouseLeave = () => {
      setVisible(false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", checkViewportAndTouch);
    };
  }, [isMobile, visible]);

  if (isMobile || !visible) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
      style={{ opacity: visible ? 1 : 0 }}
      id="cursor-glow-container"
    >
      <div
        className="absolute h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          background: "radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, rgba(236, 72, 153, 0.04) 50%, transparent 100%)",
          filter: "blur(20px)",
        }}
      />
      <div
        className="absolute h-[12px] w-[12px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-linear-to-r from-brand-blue to-brand-pink opacity-40 blur-xs"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />
    </div>
  );
}
