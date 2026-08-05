import React, { useState, useEffect } from 'react';
import { motion, animate } from 'framer-motion';

const RiskGauge = ({
  score = 68,
  riskLevel = "Medium Risk",
  subtitle = "Based on 7,043 customer records",
  isCustomPrediction = false,
  onReset
}) => {
  const clampedScore = Math.max(0, Math.min(100, score));
  const [displayScore, setDisplayScore] = useState(0);

  // Smooth ease-in-out count-up animation over 1.4s
  useEffect(() => {
    const controls = animate(0, clampedScore, {
      duration: 1.4,
      ease: "easeInOut",
      onUpdate: (latest) => setDisplayScore(Math.round(latest))
    });
    return () => controls.stop();
  }, [clampedScore]);

  // Needle rotation calculation: 0% -> -90 deg (left), 50% -> 0 deg (top), 100% -> 90 deg (right)
  const needleAngle = -90 + (clampedScore / 100) * 180;

  const getRiskInfo = (val) => {
    if (val <= 25) return { label: 'Safe Customers', bg: 'bg-emerald-50 text-emerald-600 border-emerald-200/80 shadow-emerald-500/10' };
    if (val <= 50) return { label: 'Low Risk', bg: 'bg-amber-50 text-amber-600 border-amber-200/80 shadow-amber-500/10' };
    if (val <= 75) return { label: 'Medium Risk', bg: 'bg-orange-50 text-orange-600 border-orange-200/80 shadow-orange-500/10' };
    return { label: 'High Risk', bg: 'bg-rose-50 text-rose-600 border-rose-200/80 shadow-rose-500/10' };
  };

  const currentRisk = getRiskInfo(displayScore);

  return (
    <div className="relative w-full max-w-[440px] sm:max-w-[480px] flex flex-col items-center justify-center py-4 px-2 select-none">
      
      {/* LAYER 1: SVG GAUGE GRAPHICS (z-0: Arc -> Needle -> Needle Hub with Zero Label Overlap) */}
      <div className="relative w-full aspect-[2/1.05] flex items-center justify-center z-0">
        <svg viewBox="0 0 260 135" className="w-full h-full overflow-visible">
          <defs>
            <linearGradient id="v11GaugeArcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#22c55e" />
              <stop offset="28%" stopColor="#84cc16" />
              <stop offset="55%" stopColor="#eab308" />
              <stop offset="80%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#ef4444" />
            </linearGradient>

            {/* Subtle Drop Shadow for Needle */}
            <filter id="v11NeedleShadow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#0f172a" floodOpacity="0.25" />
            </filter>

            <filter id="v11GlowFilter" x="-15%" y="-15%" width="130%" height="130%">
              <feDropShadow dx="0" dy="5" stdDeviation="6" floodColor="#f97316" floodOpacity="0.18" />
            </filter>
          </defs>

          {/* Outer Dash Ring */}
          <path
            d="M 32 120 A 98 98 0 0 1 228 120"
            fill="none"
            stroke="#e2e8f0"
            strokeWidth="1.5"
            strokeDasharray="3 3"
          />

          {/* Background Arc Track */}
          <path
            d="M 40 120 A 90 90 0 0 1 220 120"
            fill="none"
            stroke="#f1f5f9"
            strokeWidth="18"
            strokeLinecap="round"
          />

          {/* Multi-color Arc */}
          <path
            d="M 40 120 A 90 90 0 0 1 220 120"
            fill="none"
            stroke="url(#v11GaugeArcGrad)"
            strokeWidth="18"
            strokeLinecap="round"
            filter="url(#v11GlowFilter)"
          />

          {/* SCALE MARKINGS (Positioned completely outside arc to guarantee 0% overlap) */}
          <text x="22" y="124" textAnchor="end" className="text-[11px] fill-slate-400 font-bold font-mono">0%</text>
          <text x="130" y="14" textAnchor="middle" className="text-[11px] fill-slate-400 font-bold font-mono">50%</text>
          <text x="238" y="124" textAnchor="start" className="text-[11px] fill-slate-400 font-bold font-mono">100%</text>

          {/* NEEDLE & PIVOT HUB */}
          <g transform="translate(130, 120)">
            <motion.g
              initial={{ rotate: -90 }}
              animate={{ rotate: needleAngle }}
              transition={{
                type: "spring",
                stiffness: 45,
                damping: 12,
                restDelta: 0.001
              }}
              filter="url(#v11NeedleShadow)"
            >
              {/* Slender Tapered Needle */}
              <polygon points="-1.8,0 0,-76 1.8,0" fill="#0f172a" />
              {/* Glossy Tip Accent */}
              <polygon points="-1.2,-58 0,-76 1.2,-58" fill="#f97316" />
              {/* Glossy Reflection Highlight */}
              <line x1="0" y1="-10" x2="0" y2="-68" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" />
            </motion.g>

            {/* Small Minimal Hub Pivot */}
            <circle cx="0" cy="0" r="4.5" fill="#0f172a" />
            <circle cx="0" cy="0" r="2" fill="#ffffff" />
          </g>
        </svg>
      </div>

      {/* LAYER 2: HTML TEXT & BADGES (Clean, generous vertical spacing, zero overlap) */}
      <div className="z-10 flex flex-col items-center justify-center text-center mt-7 space-y-3.5">
        
        {/* LARGE PERCENTAGE */}
        <motion.div
          key={clampedScore}
          initial={{ scale: 0.95, opacity: 0.8 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="text-6xl sm:text-7xl font-black text-slate-900 font-['Outfit'] tracking-tight leading-none"
        >
          {displayScore}%
        </motion.div>

        {/* RISK BADGE */}
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className={`px-4 py-1.5 rounded-full text-xs font-extrabold border tracking-wide uppercase shadow-2xs transition-colors duration-300 ${currentRisk.bg}`}
        >
          {riskLevel === 'Very Low Risk' ? 'Safe Customers' : (riskLevel || currentRisk.label)}
        </motion.div>

        {/* SUBTITLE */}
        <p className="text-xs font-semibold text-slate-500 tracking-wide pt-1">
          {subtitle}
        </p>

        {/* RESET BUTTON */}
        {isCustomPrediction && onReset && (
          <motion.button
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={onReset}
            className="mt-3 px-4 py-2 rounded-xl bg-orange-50 hover:bg-orange-100 text-orange-700 font-bold text-xs border border-orange-200 shadow-2xs transition-all duration-200 flex items-center space-x-1.5 hover:scale-[1.02]"
          >
            <span>↺ Reset to Dataset Overview</span>
          </motion.button>
        )}
      </div>

    </div>
  );
};

export default RiskGauge;
