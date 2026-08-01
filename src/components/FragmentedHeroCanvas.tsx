import React, { useEffect, useRef, useState } from 'react';

interface FragmentedHeroCanvasProps {
  isLoaded: boolean;
}

interface Shard {
  id: number;
  x0: number; // Target X center
  y0: number; // Target Y center
  // Initial random offsets
  dx: number;
  dy: number;
  rot: number;
  scale: number;
  delay: number;
  points: { x: number; y: number }[]; // Polygon relative vertices
  color: string;
}

export const FragmentedHeroCanvas: React.FC<FragmentedHeroCanvasProps> = ({ isLoaded }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [assembled, setAssembled] = useState(false);

  useEffect(() => {
    if (!isLoaded) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas high resolution for crisp rendering
    const width = 480;
    const height = 440;
    canvas.width = width * 2;
    canvas.height = height * 2;
    ctx.scale(2, 2);

    // Generate ~42 geometric shards across a grid
    const cols = 7;
    const rows = 6;
    const cellW = width / cols;
    const cellH = height / rows;
    const shards: Shard[] = [];

    const colors = [
      '#ed2979', // Marasim Pink
      '#0091ad', // Teal
      '#0A0A0B', // Dark charcoal
      '#fdeaf1', // Soft pink tint
      '#2563eb', // Royal Blue
      '#1e293b', // Deep slate
      '#ec4899', // Bright pink
    ];

    let shardId = 0;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x0 = (c + 0.5) * cellW;
        const y0 = (r + 0.5) * cellH;

        // Split each cell into 2 irregular triangular/quad shards
        const angleFromCenter = Math.atan2(y0 - height / 2, x0 - width / 2);
        const distFromCenter = Math.hypot(x0 - width / 2, y0 - height / 2);

        // Scatter direction outwards
        const scatterDist = 120 + Math.random() * 180;
        const dx = Math.cos(angleFromCenter) * scatterDist + (Math.random() - 0.5) * 80;
        const dy = Math.sin(angleFromCenter) * scatterDist + (Math.random() - 0.5) * 80;

        const rot = (Math.random() - 0.5) * Math.PI * 1.5;
        const delay = (distFromCenter / (width / 2)) * 0.35 + Math.random() * 0.2;

        // Define shard polygon points relative to (x0, y0)
        const hw = cellW / 2;
        const hh = cellH / 2;
        const points = [
          { x: -hw + (Math.random() - 0.5) * 6, y: -hh + (Math.random() - 0.5) * 6 },
          { x: hw + (Math.random() - 0.5) * 6, y: -hh + (Math.random() - 0.5) * 6 },
          { x: hw + (Math.random() - 0.5) * 6, y: hh + (Math.random() - 0.5) * 6 },
          { x: -hw + (Math.random() - 0.5) * 6, y: hh + (Math.random() - 0.5) * 6 },
        ];

        const color = colors[(r + c) % colors.length];

        shards.push({
          id: shardId++,
          x0,
          y0,
          dx,
          dy,
          rot,
          scale: 0.4 + Math.random() * 0.5,
          delay,
          points,
          color,
        });
      }
    }

    let animFrame: number;
    let startTime: number | null = null;
    const duration = 1500; // 1.5s total fracture duration (matching report)

    // Cubic power3.inOut ease function
    const easeInOutCubic = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const render = (now: number) => {
      if (!startTime) startTime = now;
      const elapsed = now - startTime;

      ctx.clearRect(0, 0, width, height);

      let allDone = true;

      shards.forEach((shard) => {
        // Individual delayed progress
        const localTime = Math.max(0, elapsed - shard.delay * 1000);
        const rawProgress = Math.min(1, localTime / (duration - shard.delay * 500));
        const eased = easeInOutCubic(rawProgress);

        if (rawProgress < 1) allDone = false;

        // Current positions interpolating back home (dx -> 0, dy -> 0, rot -> 0, scale -> 1)
        const curX = shard.x0 + shard.dx * (1 - eased);
        const curY = shard.y0 + shard.dy * (1 - eased);
        const curRot = shard.rot * (1 - eased);
        const curScale = shard.scale + (1 - shard.scale) * eased;
        const curAlpha = 0.3 + eased * 0.7;

        ctx.save();
        ctx.translate(curX, curY);
        ctx.rotate(curRot);
        ctx.scale(curScale, curScale);

        // Draw Shard Polygon
        ctx.beginPath();
        ctx.moveTo(shard.points[0].x, shard.points[0].y);
        for (let i = 1; i < shard.points.length; i++) {
          ctx.lineTo(shard.points[i].x, shard.points[i].y);
        }
        ctx.closePath();

        // Shard Styling
        ctx.fillStyle = shard.color;
        ctx.globalAlpha = curAlpha;
        ctx.fill();

        // Subtle glowing border while assembling
        if (eased < 0.95) {
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        ctx.restore();
      });

      if (!allDone) {
        animFrame = requestAnimationFrame(render);
      } else {
        setAssembled(true);
      }
    };

    animFrame = requestAnimationFrame(render);

    return () => {
      if (animFrame) cancelAnimationFrame(animFrame);
    };
  }, [isLoaded]);

  return (
    <div className="relative w-full h-full flex items-center justify-center p-2 sm:p-4">
      {/* Canvas for Fracture Assemble Animation */}
      <canvas
        ref={canvasRef}
        className={`max-w-full h-auto max-h-[420px] object-contain transition-opacity duration-700 pointer-events-none ${
          assembled ? 'opacity-0' : 'opacity-100'
        }`}
      />

      {/* Final Assembled Interactive Hero Showcase Cards (revealed seamlessly when fragments lock into place) */}
      <div
        className={`absolute inset-0 transition-all duration-700 transform ${
          assembled ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        <div className="relative w-full max-w-[460px] h-full mx-auto flex items-center justify-center">
          {/* Background Shape & Floating Theme Icons (Microphone, Ticket, Camera) */}
          <div className="absolute w-72 h-72 rounded-full bg-[#e6f5f8] -z-10 top-4 left-6 blur-md" />
          <div className="absolute w-20 h-20 bg-[#ed2979]/15 rounded-3xl top-10 left-12 -z-10" />

          {/* Background Filler Icons: Microphone, Ticket, Camera */}
          <div className="absolute inset-0 pointer-events-none -z-10 overflow-visible">
            {/* Microphone: Top Right */}
            <div className="absolute -top-6 -right-4 text-slate-400/40 transform rotate-12">
              <svg className="w-9 h-9" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 016 0v6a3 3 0 01-3 3z" />
              </svg>
            </div>
            {/* Ticket: Left Edge */}
            <div className="absolute top-1/2 -left-8 text-amber-500/35 transform -rotate-45">
              <svg className="w-10 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
              </svg>
            </div>
            {/* Camera: Bottom Right */}
            <div className="absolute -bottom-6 right-10 text-[#ed2979]/35 transform rotate-12">
              <svg className="w-9 h-9" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
          </div>

          {/* Card 1: Main Dark Event Showcase Card (Graduation Card) */}
          <div className="absolute w-56 sm:w-64 h-[280px] sm:h-[300px] top-2 right-2 sm:right-6 bg-gradient-to-br from-[#0A0A0B] to-[#1c1c1f] rounded-2xl p-5 sm:p-6 text-white shadow-2xl transform -rotate-3 hover:rotate-0 transition-transform duration-500 flex flex-col justify-between border border-white/10 group cursor-pointer z-10">
            {/* Mortarboard Hat resting on top-left corner */}
            <div className="absolute -top-6 -left-5 z-20 pointer-events-none filter drop-shadow-lg transform -rotate-12">
              <svg className="w-14 h-14" viewBox="0 0 64 64" fill="none">
                <polygon points="32,8 60,22 32,36 4,22" fill="#1e293b" stroke="#e2e8f0" strokeWidth="1.5" />
                <polygon points="32,11 54,22 32,33 10,22" fill="#334155" />
                <path d="M18 28v13c0 4 14 7 14 7s14-3 14-7V28" fill="#1e293b" stroke="#0f172a" strokeWidth="1.5" />
                <circle cx="32" cy="22" r="2.5" fill="#f59e0b" />
                <path d="M32 22 Q46 24 48 37" stroke="#f59e0b" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                <polygon points="45,37 51,37 48,47" fill="#fbbf24" />
              </svg>
            </div>

            {/* Scroll tied with red ribbon emerging behind card from side */}
            <div className="absolute -left-9 top-20 -z-10 pointer-events-none transform rotate-45 filter drop-shadow-md">
              <svg className="w-16 h-12" viewBox="0 0 70 50" fill="none">
                <rect x="12" y="14" width="46" height="22" rx="3" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
                <ellipse cx="12" cy="25" rx="3" ry="11" fill="#fde68a" stroke="#d97706" strokeWidth="1.5" />
                <ellipse cx="58" cy="25" rx="3" ry="11" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
                <rect x="31" y="12" width="8" height="26" rx="2" fill="#dc2626" />
                <polygon points="35,38 30,48 35,45 40,48" fill="#b91c1c" />
              </svg>
            </div>

            {/* Floating Gold/Silver Confetti */}
            <div className="absolute inset-0 pointer-events-none overflow-visible">
              <span className="absolute -top-3 left-10 text-amber-300 text-xs animate-pulse">✦</span>
              <span className="absolute top-10 -right-4 text-amber-400 text-sm">✨</span>
              <span className="absolute bottom-12 -left-3 w-2 h-2 rounded-full bg-slate-300 opacity-90" />
              <span className="absolute -bottom-3 right-8 w-2.5 h-1.5 bg-amber-400 transform rotate-45 rounded-sm opacity-90" />
              <span className="absolute top-28 -right-3 text-amber-200 text-xs">✸</span>
            </div>

            <div>
              <span className="font-mono text-[10px] sm:text-[11px] tracking-widest text-[#ed2979] uppercase" dir="ltr">
                EVENT · 24 NOV
              </span>
              <div className="font-cairo text-xl sm:text-2xl font-black mt-3 sm:mt-4 leading-snug">
                حفل تخرج<br />فندق الريتز
              </div>
            </div>
            <div className="flex justify-between items-end text-xs text-gray-300">
              <span>عروض مستلمة</span>
              <b className="text-white text-lg sm:text-xl font-mono">07</b>
            </div>
          </div>

          {/* Card 2: Satisfaction Metric Badge (Blue Card) */}
          <div className="absolute w-40 sm:w-48 h-28 sm:h-30 bottom-6 right-0 sm:right-2 bg-[#0091ad] text-white rounded-2xl p-4 sm:p-5 shadow-xl transform rotate-3 hover:rotate-0 transition-transform duration-500 flex flex-col justify-center gap-1 z-20 overflow-visible">
            {/* VIP Event Wristband wrapped around top-right corner */}
            <div className="absolute -top-2.5 -right-2 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-900 text-[9px] font-black px-2 py-0.5 rounded-r-md shadow-md transform rotate-12 flex items-center gap-1 border-l-2 border-white">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-900" />
              <span>VIP ACCESSED</span>
            </div>

            {/* Conference Badge Lanyard partially showing behind card */}
            <div className="absolute -left-6 -bottom-5 bg-white text-slate-800 p-1.5 rounded-xl shadow-md border border-slate-200 w-16 text-[8px] font-bold text-center transform -rotate-12 -z-10">
              <div className="w-4 h-1 bg-sky-500 mx-auto rounded-full mb-1" />
              <div className="w-5 h-5 rounded-full bg-sky-100 text-sky-700 mx-auto mb-0.5 flex items-center justify-center text-[9px] font-black">
                ✓
              </div>
              <span className="text-[7px] text-slate-500">فعالية توثيق</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="font-cairo text-2xl sm:text-3xl font-extrabold leading-none">٩٨٪</div>
              {/* 3D Blue Verified Badge */}
              <div className="transform -rotate-6 filter drop-shadow-md">
                <svg className="w-8 h-8" viewBox="0 0 40 40" fill="none">
                  <path d="M20 3L24.5 5.5L29.5 4.5L32 9L37 11L36.5 16.2L40 20L36.5 23.8L37 29L32 31L29.5 35.5L24.5 34.5L20 37L15.5 34.5L10.5 35.5L8 31L3 29L3.5 23.8L0 20L3.5 16.2L3 11L8 9L10.5 4.5L15.5 5.5L20 3Z" fill="url(#blueBadgeGrad)" />
                  <path d="M12 20L17 25L28 14" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                  <defs>
                    <linearGradient id="blueBadgeGrad" x1="0" y1="0" x2="40" y2="40">
                      <stop offset="0%" stopColor="#38bdf8" />
                      <stop offset="100%" stopColor="#0284c7" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
            <div className="text-[11px] sm:text-xs opacity-90">رضا العملاء عن التجربة</div>
          </div>

          {/* Card 3: Verified Review Card (Pink Card) */}
          <div className="absolute w-40 sm:w-48 h-40 sm:h-44 bottom-2 left-0 sm:left-2 bg-[#fdeaf1] rounded-2xl p-4 sm:p-5 shadow-lg transform -rotate-3 hover:rotate-0 transition-transform duration-500 flex flex-col justify-between border border-[#ed2979]/20 z-20 overflow-visible">
            {/* Glassmorphism Chat Bubble emerging from side */}
            <div className="absolute -top-4 -right-4 bg-white/80 backdrop-blur-md border border-white p-1.5 px-2.5 rounded-2xl shadow-lg flex items-center gap-1 text-[10px] text-[#c81e63] font-bold transform rotate-6 z-30">
              <svg className="w-3.5 h-3.5 text-[#ed2979]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span>شات آمن</span>
            </div>

            {/* Party Glasses graphic */}
            <div className="absolute -bottom-3 -right-3 transform rotate-12 z-20 pointer-events-none filter drop-shadow-sm">
              <svg className="w-10 h-6 text-[#ed2979]" viewBox="0 0 60 30" fill="none">
                <polygon points="15,5 20,15 30,15 22,21 25,30 15,24 5,30 8,21 0,15 10,15" fill="#ed2979" />
                <polygon points="45,5 50,15 60,15 52,21 55,30 45,24 35,30 38,21 30,15 40,15" fill="#ed2979" />
                <path d="M28 15 Q30 11 32 15" stroke="#ed2979" strokeWidth="3" />
              </svg>
            </div>

            {/* Floating Hearts and Screen Icon */}
            <div className="absolute inset-0 pointer-events-none overflow-visible">
              <span className="absolute top-2 -left-3 text-[#ed2979] text-xs animate-bounce">♥</span>
              <span className="absolute -bottom-2 left-6 text-[#ed2979] text-sm animate-bounce">♥</span>
              <div className="absolute top-1/2 -right-3.5 -translate-y-1/2 text-amber-500 transform rotate-6">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <rect x="2" y="3" width="20" height="14" rx="2" fill="currentColor" fillOpacity={0.15} />
                  <line x1="8" y1="21" x2="16" y2="21" strokeLinecap="round" />
                  <line x1="12" y1="17" x2="12" y2="21" strokeLinecap="round" />
                </svg>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#ed2979] text-white flex items-center justify-center font-bold text-xs shrink-0">
                س
              </div>
              <div className="text-[#c81e63] text-xs sm:text-sm tracking-widest" dir="ltr">★★★★★</div>
            </div>
            <p className="text-[11px] sm:text-xs text-[#3A3A3D] font-medium leading-relaxed">
              "استلمنا عروض موثوقة خلال ساعات، ووقّعنا العقد بأمان."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
