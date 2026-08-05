import React, { useState, useEffect } from 'react';
import { motion, animate } from 'framer-motion';

const RiskMeter = ({ score = 84, riskLevel = "High Risk", probability = 86.3 }) => {
  const clampedScore = Math.max(0, Math.min(100, score));
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    const controls = animate(0, clampedScore, {
      duration: 1.5,
      ease: "easeInOut",
      onUpdate: (latest) => setDisplayScore(Math.round(latest))
    });
    return () => controls.stop();
  }, [clampedScore]);

  const getMeterColor = (val) => {
    if (val <= 25) return { label: 'Very Low Risk', color: '#22c55e', text: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-200' };
    if (val <= 50) return { label: 'Low Risk', color: '#eab308', text: 'text-amber-600', bg: 'bg-amber-50 border-amber-200' };
    if (val <= 75) return { label: 'Medium Risk', color: '#f97316', text: 'text-orange-600', bg: 'bg-orange-50 border-orange-200' };
    return { label: 'High Risk', color: '#ef4444', text: 'text-rose-600', bg: 'bg-rose-50 border-rose-200' };
  };

  const currentCategory = getMeterColor(displayScore);

  return (
    <div className="w-full space-y-4 p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Animated Risk Meter</span>
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${currentCategory.bg} ${currentCategory.text}`}>
            {riskLevel || currentCategory.label}
          </span>
        </div>
        <div className="text-right">
          <span className="text-2xl font-black text-slate-900 font-['Outfit']">{displayScore}%</span>
        </div>
      </div>

      {/* Meter Bar Container */}
      <div className="relative pt-6 pb-2">
        {/* Pointer / Needle Indicator above bar */}
        <motion.div
          initial={{ left: '0%' }}
          animate={{ left: `${clampedScore}%` }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute top-0 transform -translate-x-1/2 flex flex-col items-center z-10"
        >
          <span className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold text-white shadow-xs ${
            clampedScore > 75 ? 'bg-rose-500' : clampedScore > 50 ? 'bg-orange-500' : clampedScore > 25 ? 'bg-amber-500' : 'bg-emerald-500'
          }`}>
            {displayScore}%
          </span>
          <div className="w-0 h-0 border-l-4 border-r-4 border-t-6 border-l-transparent border-r-transparent border-t-slate-800 mt-0.5"></div>
        </motion.div>

        {/* Multi-color Bar Track */}
        <div className="h-4 w-full rounded-full bg-slate-100 p-0.5 overflow-hidden border border-slate-200/80 relative">
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: `${clampedScore}%` }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-amber-400 via-orange-500 to-rose-500 relative"
          />
        </div>

        {/* Meter Scale Ticks */}
        <div className="flex justify-between text-[10px] font-semibold text-slate-400 mt-2 px-1">
          <span>0% (Safe)</span>
          <span>25%</span>
          <span>50% (Medium)</span>
          <span>75%</span>
          <span>100% (Critical)</span>
        </div>
      </div>
    </div>
  );
};

export default RiskMeter;
