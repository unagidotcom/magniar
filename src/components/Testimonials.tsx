import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { TESTIMONIALS } from "../data";

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const total = TESTIMONIALS.length;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  useEffect(() => {
    if (isPaused) {
      if (timeoutRef.current) clearInterval(timeoutRef.current);
      return;
    }

    // Set 6s slowly auto slide interval
    timeoutRef.current = setInterval(() => {
      handleNext();
    }, 6000);

    return () => {
      if (timeoutRef.current) clearInterval(timeoutRef.current);
    };
  }, [isPaused, currentIndex]);

  const activeReview = TESTIMONIALS[currentIndex];

  return (
    <section className="relative overflow-hidden bg-brand-dark py-24 border-t border-white/5" id="testimonials">
      {/* Background visual lighting */}
      <div className="absolute top-[30%] left-10 h-[280px] w-[280px] rounded-full bg-brand-blue/5 blur-[90px]" />
      <div className="absolute top-[60%] right-[-10%] h-[320px] w-[320px] rounded-full bg-brand-pink/5 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-6 md:px-12">
        
        {/* Title Heading */}
        <div className="mb-16 text-center">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-brand-blue">
            PARTNER TESTIMONIALS
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
            Trusted by Modern <span className="text-gradient">Founders.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl font-sans text-base leading-relaxed text-gray-300">
            What digital executives say about our direct performance and bespoke growth execution channels. 
          </p>
        </div>

        {/* Sliding card layout container */}
        <div 
          className="relative mx-auto max-w-3xl"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          id="testimonials-slider-deck"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeReview.id}
              initial={{ opacity: 0, scale: 0.98, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.98, x: -25 }}
              transition={{ duration: 0.5 }}
              className="relative rounded-3xl border border-white/5 bg-black/40 p-8 md:p-12 backdrop-blur-md"
            >
              {/* Giant quote decorator */}
              <Quote className="absolute top-6 right-8 h-12 w-12 text-white/[0.02]" />

              <div className="flex flex-col gap-6" id={`testimonial-slide-${activeReview.id}`}>
                {/* Review ratings */}
                <div className="flex gap-1 text-brand-blue">
                  {Array.from({ length: activeReview.rating }).map((_, rIdx) => (
                    <Star key={rIdx} className="h-4 w-4 fill-brand-blue" />
                  ))}
                </div>

                {/* Review Message Text */}
                <p className="font-sans text-base md:text-lg lg:text-xl leading-relaxed text-gray-200 md:leading-loose">
                  “{activeReview.review}”
                </p>

                {/* Divider */}
                <span className="h-[1px] w-full bg-white/5" />

                {/* User author profile */}
                <span className="flex items-center gap-4">
                  
                  {/* Neon Initials Avatar Shield */}
                  <span className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-tr from-brand-blue to-brand-pink p-[1px]">
                    <span className="flex h-full w-full items-center justify-center rounded-[11px] bg-brand-dark font-display text-sm font-bold text-white">
                      {activeReview.name.split(" ").map((n) => n[0]).join("")}
                    </span>
                  </span>

                  <div>
                    <span className="block font-display text-sm font-bold text-white uppercase tracking-wider">
                      {activeReview.name}
                    </span>
                    <span className="block font-sans text-xs text-gray-500">
                      {activeReview.role} • <span className="text-brand-blue font-semibold">{activeReview.company}</span>
                    </span>
                  </div>

                </span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Nav buttons below */}
          <div className="mt-8 flex items-center justify-between">
            
            {/* Index indicator */}
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  onClick={() => setCurrentIndex(dotIdx)}
                  className={`h-2 transition-all duration-300 rounded-full cursor-pointer ${
                    currentIndex === dotIdx ? "w-8 bg-brand-blue" : "w-2 bg-white/10"
                  }`}
                  aria-label={`Go to slide ${dotIdx + 1}`}
                />
              ))}
            </div>

            {/* Manual step navigators */}
            <div className="flex gap-2" id="testimonial-nav-arrows">
              <button
                onClick={handlePrev}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/5 bg-white/5 text-gray-400 transition-colors hover:bg-white/10 hover:text-white cursor-pointer"
                id="testimonial-prev-btn"
                aria-label="Previous Testimonial"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              
              <button
                onClick={handleNext}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/5 bg-white/5 text-gray-400 transition-colors hover:bg-white/10 hover:text-white cursor-pointer"
                id="testimonial-next-btn"
                aria-label="Next Testimonial"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
