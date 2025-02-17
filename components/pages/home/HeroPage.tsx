"use client";

import { Button } from "@/components/ui/button";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  pulse: number;
};

const animations: {
  container: Variants;
  item: Variants;
  floating: Variants;
  shine: Variants;
} = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  },
  item: {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  },
  floating: {
    initial: { y: 0 },
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  },
  shine: {
    initial: { backgroundPosition: "200% 0" },
    animate: {
      backgroundPosition: ["-200% 0", "200% 0"],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "linear",
      },
    },
  },
};

export default function HeroPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const setCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    const stars: Star[] = Array.from({ length: 200 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * (canvas.height * 0.8),
      size: Math.random() * 1,
      speed: 0.1 + Math.random() * 0.2,
      opacity: Math.random() * 0.5 + 0.5,
      pulse: Math.random() * Math.PI,
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      stars.forEach((star) => {
        star.pulse += 0.02;
        const currentOpacity = star.opacity * (0.7 + 0.3 * Math.sin(star.pulse));

        ctx.beginPath();
        const gradient = ctx.createRadialGradient(
          star.x,
          star.y,
          0,
          star.x,
          star.y,
          star.size * 3
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${currentOpacity})`);
        gradient.addColorStop(
          0.5,
          `rgba(200, 220, 255, ${currentOpacity * 0.5})`
        );
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

        ctx.fillStyle = gradient;
        ctx.arc(star.x, star.y, star.size * 3, 0, Math.PI * 2);
        ctx.fill();

        star.x -= star.speed;
        if (star.x < 0) {
          star.x = canvas.width;
          star.y = Math.random() * (canvas.height * 0.8);
        }
      });

      const time = Date.now() * 0.0008;
      const centerX = canvas.width / 3.9;
      const centerY = canvas.height * 1.55;
      const baseRadius = canvas.width * 0.8;
      const radius = baseRadius + Math.sin(time) * 80;

      const glow = ctx.createRadialGradient(
        centerX,
        centerY,
        0,
        centerX,
        centerY,
        radius
      );

      glow.addColorStop(0, "rgba(96, 165, 250, 0.4)");
      glow.addColorStop(0.3, "rgba(59, 130, 246, 0.0)");
      glow.addColorStop(0.5, "rgba(0, 0, 0, 0)");
      glow.addColorStop(0.6, "rgba(37, 99, 235, 0.6)");
      glow.addColorStop(0.8, "rgba(0, 0, 0, 0)");
      glow.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.beginPath();
      ctx.fillStyle = glow;
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fill();

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", setCanvasSize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div className="relative flex flex-col justify-center overflow-hidden text-zinc-800 dark:text-white">
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full opacity-20 dark:opacity-100"
        style={{ touchAction: "none" }}
      />

      <motion.div
        className="relative z-10 mx-auto w-full max-w-screen-xl px-4 py-6 md:py-12 min-h-screen flex flex-col items-center justify-start md:mt-0 lg:mt-0"
        variants={animations.container}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="max-w-4xl w-full space-y-6 md:space-y-8 flex flex-col items-center justify-center sm:mt-20 md:mt-0 lg:mt-4 mt-10"
          variants={animations.item}
        >
          <div className="text-center space-y-4 md:space-y-6">
            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight font-sans bg-gradient-to-b from-white via-blue-300 to-blue-600 text-transparent bg-clip-text pb-2"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Ready-to-Use Components & Code
              <br />
              <motion.span
                className="font-serif font-light italic"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Copy, Paste, and Relax
              </motion.span>
            </motion.h1>

            <motion.p
              className="text-base md:text-xl text-zinc-600 dark:text-gray-400 max-w-2xl mx-auto px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              Accelerate your project&apos;s growth with ready-to-use UI components
              that save time and elevate quality.
            </motion.p>
          </div>

          <div className="space-y-6 md:space-y-8 w-full backdrop-blur-sm bg-transparent dark:bg-transparent p-8 rounded-2xl border border-zinc-200 dark:border-gray-800/10">
            <div className="text-center">
              <motion.h2
                className="text-lg md:text-xl font-semibold text-zinc-700 dark:text-gray-400 mb-4 md:mb-6"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Built With
              </motion.h2>
              <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                {["nextjs", "shadcn", "tailwind"].map((tech) => (
                  <motion.div
                    key={tech}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Image
                      src={`/${tech}.svg`}
                      alt={`${tech} logo`}
                      width={tech === "shadcn" ? 140 : tech === "tailwind" ? 120 : 90}
                      height={40}
                      className="transition-transform filter dark:brightness-100 brightness-75"
                      loading="lazy"
                      sizes="(max-width: 768px) 100px, 150px"
                    />
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center px-4">
              <Link href="/docs" className="w-full sm:w-auto">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    size="lg"
                    className="w-full rounded-2xl bg-zinc-800 hover:bg-zinc-900 dark:bg-blue-500/80 dark:hover:bg-blue-500 border border-zinc-700 dark:border-blue-500/70 shadow-lg shadow-zinc-200 hover:shadow-zinc-300 dark:shadow-blue-500/20 dark:hover:shadow-blue-500/50 transition-all text-white"
                  >
                    Explore Components
                  </Button>
                </motion.div>
              </Link>

              <Link
                href="https://github.com/rohitk131/luminaui"
                className="w-full sm:w-auto"
              >
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    className="w-full gap-3 rounded-2xl group hover:bg-zinc-100 dark:hover:bg-white/20 transition-colors border border-zinc-200 dark:border-gray-800/10 bg-white/80 dark:bg-transparent backdrop-blur-sm"
                    variant="secondary"
                    size="lg"
                  >
                    <span>GitHub</span>
                  </Button>
                </motion.div>
              </Link>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}