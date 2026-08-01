import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MarasimLogo } from './MarasimLogo';

interface AppLoadingScreenProps {
  onLoaded: () => void;
}

export const AppLoadingScreen: React.FC<AppLoadingScreenProps> = ({ onLoaded }) => {
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Smoothed loading progress emulation matching tech report parameters:
    // startDelay: 0.5s, followScale lerp, countup: 0.25s, fadeout: 1.0s blur+opacity
    let currentPercent = 0;
    let animationFrameId: number;
    let startTime: number | null = null;
    const startDelayMs = 400; // start progress after 0.4s
    const totalDurationMs = 1800; // 1.8s load time

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;

      if (elapsed < startDelayMs) {
        animationFrameId = requestAnimationFrame(step);
        return;
      }

      const activeTime = elapsed - startDelayMs;
      const rawProgress = Math.min(1, activeTime / (totalDurationMs - startDelayMs));

      // Ease curve for smooth acceleration & deceleration
      const easedProgress = rawProgress < 0.5
        ? 2 * rawProgress * rawProgress
        : 1 - Math.pow(-2 * rawProgress + 2, 2) / 2;

      currentPercent = Math.ceil(easedProgress * 100);
      setProgress(currentPercent);

      if (rawProgress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        // Reached 100%
        setProgress(100);

        // Countup hold delay (0.25s) before triggering fadeout
        setTimeout(() => {
          setIsFadingOut(true);

          // Fadeout duration (1.0s) with opacity: 0 and filter: blur(12px)
          setTimeout(() => {
            setIsComplete(true);
            onLoaded();
          }, 1000);
        }, 250);
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [onLoaded]);

  if (isComplete) return null;

  // SVG Circumference calculation for 1px stroke progress ring
  // SVG size: 260px, Radius: 120px
  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  // Leave a 5% gap until exact 100%
  const strokeDashoffset = circumference - (progress / 100) * (circumference * 0.96);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1, filter: 'blur(0px)' }}
          animate={
            isFadingOut
              ? { opacity: 0, filter: 'blur(12px)' }
              : { opacity: 1, filter: 'blur(0px)' }
          }
          transition={{ duration: 1.0, ease: 'easeOut' }}
          className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center select-none font-cairo"
        >
          {/* Centered Loading Container */}
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex flex-col items-center justify-center">
            
            {/* SVG Progress Ring */}
            <svg
              className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none"
              viewBox="0 0 260 260"
            >
              {/* Background Track Circle */}
              <circle
                cx="130"
                cy="130"
                r={radius}
                className="stroke-slate-100"
                strokeWidth="1"
                fill="none"
              />
              {/* Animated Thin Progress Stroke (1px) */}
              <circle
                cx="130"
                cy="130"
                r={radius}
                className={`transition-all duration-300 ${
                  isFadingOut ? 'stroke-slate-300' : 'stroke-slate-900'
                }`}
                strokeWidth="1.25"
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
              />
            </svg>

            {/* Inner Content */}
            <div className="flex flex-col items-center justify-center space-y-3 text-center z-10">
              {/* Brand Logo / Name */}
              <div className="transform scale-110">
                <MarasimLogo size="md" />
              </div>

              {/* Sub-label */}
              <p className="text-xs text-slate-400 font-medium tracking-wide">
                منصة تنظيم المناسبات
              </p>

              {/* Percentage Counter */}
              <div
                className={`text-sm font-mono tracking-widest font-semibold pt-1 transition-colors duration-200 ${
                  isFadingOut ? 'text-slate-300' : 'text-slate-700'
                }`}
              >
                {progress}%
              </div>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
