import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, TrendingUp, Coins, BookOpen, Briefcase, Award, ArrowRight, X } from 'lucide-react';
import { CAREER_DATA } from '../data/careers';

export const CareerGalaxy: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string | null>("ai-engineer");

  const careers = Object.values(CAREER_DATA);
  const selectedCareer = selectedId ? CAREER_DATA[selectedId] : null;

  // Layout node coordinates for the interactive Galaxy SVG
  const nodePositions: Record<string, { x: number; y: number }> = {
    "ai-engineer": { x: 300, y: 100 },
    "ml-engineer": { x: 150, y: 220 },
    "data-scientist": { x: 450, y: 220 },
    "data-analyst": { x: 300, y: 350 },
    "mlops-engineer": { x: 100, y: 80 }
  };

  // Node connections representing career transitions/relations
  const connections = [
    { from: "ml-engineer", to: "ai-engineer" },
    { from: "data-scientist", to: "ai-engineer" },
    { from: "data-analyst", to: "ml-engineer" },
    { from: "data-analyst", to: "data-scientist" },
    { from: "ml-engineer", to: "mlops-engineer" }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
      {/* Galaxy Node Chart (Left 7 Columns on Large Screens) */}
      <div className="lg:col-span-7 border border-slate-800 bg-slate-950/40 rounded-3xl p-6 relative flex flex-col justify-between overflow-hidden min-h-[450px]">
        {/* Ambient Grid Background */}
        <div className="absolute inset-0 cyber-grid opacity-30 pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-500/5 blur-[80px] rounded-full pointer-events-none"></div>
        <div className="absolute top-1/4 left-1/3 w-60 h-60 bg-cyan-500/5 blur-[60px] rounded-full pointer-events-none"></div>

        {/* Constellation Header */}
        <div className="relative z-10 flex justify-between items-center mb-4">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-cyan-400" />
              Constellation Galaxy
            </h3>
            <p className="text-xs text-slate-400">Click a node to analyze career insights</p>
          </div>
          <span className="text-[10px] px-2.5 py-1 bg-slate-900 border border-slate-800 rounded-full text-slate-400 font-semibold tracking-wider uppercase">
            Interactive Node View
          </span>
        </div>

        {/* SVG Galaxy Map */}
        <div className="relative z-10 flex-1 flex items-center justify-center min-h-[350px]">
          <svg viewBox="0 0 600 420" className="w-full max-w-lg h-auto select-none">
            {/* Draw connection lines */}
            {connections.map((conn, idx) => {
              const fromPos = nodePositions[conn.from];
              const toPos = nodePositions[conn.to];
              const isSelectedPath = selectedId === conn.from || selectedId === conn.to;
              return (
                <g key={idx}>
                  {/* Glowing backup line */}
                  <motion.line
                    x1={fromPos.x}
                    y1={fromPos.y}
                    x2={toPos.x}
                    y2={toPos.y}
                    stroke={isSelectedPath ? "url(#purpleCyanGrad)" : "#334155"}
                    strokeWidth={isSelectedPath ? 2.5 : 1}
                    strokeOpacity={isSelectedPath ? 0.7 : 0.3}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                  />
                  {/* Glowing flow dots on lines */}
                  {isSelectedPath && (
                    <motion.circle
                      r="3"
                      fill="#06b6d4"
                      filter="url(#glow)"
                      animate={{
                        cx: [fromPos.x, toPos.x],
                        cy: [fromPos.y, toPos.y],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear",
                        delay: idx * 0.5
                      }}
                    />
                  )}
                </g>
              );
            })}

            {/* Definitions for gradients and glows */}
            <defs>
              <linearGradient id="purpleCyanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Draw Nodes */}
            {careers.map((career) => {
              const pos = nodePositions[career.id] || { x: 300, y: 200 };
              const isSelected = selectedId === career.id;
              
              // Colors based on career id
              let nodeColor = "#06b6d4"; // Cyan
              if (career.id === "data-scientist") nodeColor = "#a855f7"; // Purple
              if (career.id === "ml-engineer") nodeColor = "#ec4899"; // Pink
              if (career.id === "data-analyst") nodeColor = "#eab308"; // Yellow
              if (career.id === "mlops-engineer") nodeColor = "#ef4444"; // Red

              return (
                <g 
                  key={career.id}
                  className="cursor-pointer"
                  onClick={() => setSelectedId(career.id)}
                >
                  {/* Glowing outer aura for selected node */}
                  {isSelected && (
                    <motion.circle
                      cx={pos.x}
                      cy={pos.y}
                      r="30"
                      fill={nodeColor}
                      fillOpacity="0.12"
                      animate={{ r: [25, 35, 25] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}

                  {/* Outer circle */}
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r="16"
                    fill="#0f172a"
                    stroke={isSelected ? "#ffffff" : nodeColor}
                    strokeWidth={isSelected ? 3 : 1.5}
                    className="transition-all duration-300"
                  />

                  {/* Inner dot */}
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r="6"
                    fill={isSelected ? nodeColor : "#334155"}
                  />

                  {/* Label background text container */}
                  <foreignObject
                    x={pos.x - 70}
                    y={pos.y + 22}
                    width="140"
                    height="45"
                    className="overflow-visible pointer-events-none"
                  >
                    <div className="flex flex-col items-center justify-center text-center">
                      <span className={`text-[10px] font-bold tracking-wide transition-colors duration-300 ${
                        isSelected ? 'text-white font-extrabold' : 'text-slate-300'
                      }`}>
                        {career.name}
                      </span>
                      <span className="text-[8px] text-slate-500 font-medium mt-0.5">
                        {career.salaryRange}
                      </span>
                    </div>
                  </foreignObject>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Footer info tip */}
        <div className="relative z-10 text-[10px] text-slate-500 flex justify-center gap-4 border-t border-slate-900 pt-3">
          <div className="flex items-center gap-1.5">
            <div className="h-1.5 w-1.5 rounded-full bg-cyan-400"></div>
            <span>AI Pathways</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-1.5 w-1.5 rounded-full bg-purple-400"></div>
            <span>Data Sciences</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-1.5 w-1.5 rounded-full bg-pink-400"></div>
            <span>Engineering Roles</span>
          </div>
        </div>
      </div>

      {/* Analytics Insights panel (Right 5 Columns) */}
      <div className="lg:col-span-5 flex flex-col">
        <AnimatePresence mode="wait">
          {selectedCareer ? (
            <motion.div
              key={selectedCareer.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="flex-1 flex flex-col justify-between border border-slate-800 bg-slate-900/60 backdrop-blur-md rounded-3xl p-6 shadow-2xl relative"
            >
              {/* Close Button (clears selection, defaults back) */}
              <button 
                type="button"
                onClick={() => setSelectedId(null)}
                className="absolute top-4 right-4 p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-all"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Header */}
              <div>
                <span className="text-[9px] px-2.5 py-0.5 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 rounded-full font-bold uppercase tracking-wider">
                  Target Profile
                </span>
                <h3 className="text-2xl font-bold text-white mt-2 leading-tight">
                  {selectedCareer.title}
                </h3>
                <p className="text-xs text-slate-300 mt-2.5 leading-relaxed">
                  {selectedCareer.description}
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 my-6">
                <div className="p-3 bg-slate-950/40 border border-slate-800 rounded-xl">
                  <div className="flex items-center gap-1.5 text-slate-400 text-[10px] uppercase font-semibold">
                    <Coins className="h-3.5 w-3.5 text-amber-400" />
                    Salary Range
                  </div>
                  <div className="text-base font-bold text-white mt-1">
                    {selectedCareer.salaryRange}
                  </div>
                </div>
                <div className="p-3 bg-slate-950/40 border border-slate-800 rounded-xl">
                  <div className="flex items-center gap-1.5 text-slate-400 text-[10px] uppercase font-semibold">
                    <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />
                    Market Demand
                  </div>
                  <div className="text-base font-bold text-white mt-1 flex items-center gap-1.5">
                    {selectedCareer.cagr}
                  </div>
                </div>
              </div>

              {/* Core Skills List */}
              <div className="mb-6">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5 mb-3">
                  <BookOpen className="h-3.5 w-3.5 text-purple-400" />
                  Prerequisite Skills ({selectedCareer.requiredSkills.length})
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedCareer.requiredSkills.map((skill, idx) => (
                    <span 
                      key={idx} 
                      className="text-[10px] px-2.5 py-1 bg-slate-800/80 border border-slate-700/50 rounded-lg text-slate-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Projects suggestion */}
              <div className="mb-6">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5 mb-3">
                  <Briefcase className="h-3.5 w-3.5 text-pink-400" />
                  Recommended Project
                </h4>
                <div className="p-3.5 bg-slate-950/50 border border-slate-850 rounded-xl">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-cyan-400">{selectedCareer.projects[0].name}</span>
                    <span className="text-[8px] font-semibold px-2 py-0.5 bg-cyan-950/40 text-cyan-300 border border-cyan-500/20 rounded-full">
                      {selectedCareer.projects[0].difficulty}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1.5 leading-relaxed">
                    {selectedCareer.projects[0].desc}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <button
                type="button"
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-medium text-xs rounded-xl shadow-lg shadow-purple-500/15 flex items-center justify-center gap-2 border border-purple-500/20 transition-all duration-200"
              >
                Inspect Learning Roadmap
                <ArrowRight className="h-4 w-4" />
              </button>
            </motion.div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center border border-slate-800 bg-slate-900/20 backdrop-blur-md rounded-3xl p-6 min-h-[450px]">
              <div className="p-4 bg-slate-950/40 rounded-full border border-slate-800 mb-4 text-slate-500">
                <Award className="h-8 w-8" />
              </div>
              <h4 className="text-base font-bold text-white mb-2">No Profile Selected</h4>
              <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
                Click any career node in the constellation galaxy to load real-time market stats, salary forecasts, project templates, and customized learning roadmaps.
              </p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
