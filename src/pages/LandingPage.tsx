import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, Bot, BookOpen, Briefcase, MessageSquare, BarChart3, 
  ArrowRight, Sparkles, Star, Users, BrainCircuit, Play
} from 'lucide-react';
import { Hero3DCanvas } from '../components/Hero3DCanvas';
import { CareerGalaxy } from '../components/CareerGalaxy';
import { AIMentorChat } from '../components/AIMentorChat';
import type { ParsedResumeData } from '../components/ResumeParser';

interface LandingPageProps {
  onStartJourney: (resumeData?: ParsedResumeData) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStartJourney }) => {
  const [showDemoVideo, setShowDemoVideo] = useState(false);
  const [activeFeatureTab, setActiveFeatureTab] = useState<'resume' | 'guidance' | 'skills' | 'growth' | 'interview' | 'analytics'>('resume');

  // Features dataset (20 features grouped in 6 categories)
  const features = {
    resume: {
      title: "Resume Intelligence",
      icon: <FileText className="h-5 w-5 text-cyan-400" />,
      items: [
        { name: "Resume Upload & Parsing", desc: "Instantly parse PDF, DOCX, and TXT resumes client-side using advanced rule patterns." },
        { name: "AI Resume Analyzer", desc: "Detailed quality score checking formatting, impact, and spelling errors." }
      ]
    },
    guidance: {
      title: "AI Career Guidance",
      icon: <Bot className="h-5 w-5 text-purple-400" />,
      items: [
        { name: "AI Career Prediction", desc: "Match your parsed experience against modern software profiles." },
        { name: "Multi-Career Recommendations", desc: "Alternative path mapping with comparative scores." },
        { name: "Career Match Percentage", desc: "Mathematical compatibility metrics updated in real-time." },
        { name: "AI Career Mentor Chatbot", desc: "Full conversant interface for career coaching questions." }
      ]
    },
    skills: {
      title: "Skills & Learning",
      icon: <BookOpen className="h-5 w-5 text-emerald-400" />,
      items: [
        { name: "Skill Gap Analysis", desc: "Identify missing frameworks and concepts required for target roles." },
        { name: "Personalized Career Roadmap", desc: "Milestone-by-milestone structured progression pathways." },
        { name: "Course Recommendation Engine", desc: "Direct links to Coursera, Udacity, and YouTube lectures." },
        { name: "Semester-Based Learning Plan", desc: "Distribute workload over time for realistic learning targets." },
        { name: "Skill Progress Tracker", desc: "Mark skills as completed to update your roadmap progress." }
      ]
    },
    growth: {
      title: "Career Growth",
      icon: <Briefcase className="h-5 w-5 text-pink-400" />,
      items: [
        { name: "Salary Prediction", desc: "Forecast salary expectations based on target role, experience, and skills." },
        { name: "Trending Skills Dashboard", desc: "Track high-velocity demands like Generative AI and MLOps." },
        { name: "Future Job Demand Predictor", desc: "Macro job market statistics showing CAGR and hiring volumes." },
        { name: "Job Market Analytics", desc: "Regional hiring maps and corporate demand index analytics." },
        { name: "Certification Suggestions", desc: "Vendor certificates (AWS, CKA) that maximize hiring probability." },
        { name: "Project Recommendations", desc: "Hand-curated, multi-difficulty portfolios to host on GitHub." }
      ]
    },
    interview: {
      title: "Interview Prep",
      icon: <MessageSquare className="h-5 w-5 text-rose-400" />,
      items: [
        { name: "AI Mock Interview", desc: "Type answers to technical questions and receive detailed assessments." },
        { name: "Interview Question Generator", desc: "Tailored question sets for system design and behaviorals." }
      ]
    },
    analytics: {
      title: "Analytics",
      icon: <BarChart3 className="h-5 w-5 text-amber-400" />,
      items: [
        { name: "Career Dashboard", desc: "Global telemetry workspace organizing resumes, roadmaps, and chats." }
      ]
    }
  };

  return (
    <div className="w-full relative bg-slate-950 overflow-hidden">
      {/* BACKGROUND GRAPHICS */}
      <div className="absolute inset-0 bg-mesh-cyan pointer-events-none"></div>
      <div className="absolute inset-0 bg-mesh-purple pointer-events-none"></div>
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"></div>

      {/* HEADER NAV */}
      <nav className="w-full max-w-7xl mx-auto px-6 py-5 flex items-center justify-between relative z-50 border-b border-slate-900/60 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-gradient-to-tr from-cyan-500 to-purple-600 rounded-xl text-white">
            <BrainCircuit className="h-6 w-6" />
          </div>
          <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            AI Career Path Advisor
          </span>
        </div>
        <div className="flex items-center gap-4">
          <button 
            type="button"
            onClick={() => onStartJourney()}
            className="px-5 py-2 text-xs font-semibold text-slate-300 hover:text-white transition"
          >
            Dashboard
          </button>
          <button 
            type="button"
            onClick={() => onStartJourney()}
            className="px-5 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-xs rounded-xl shadow-lg shadow-cyan-500/20 border border-cyan-400/20 transition-all duration-200"
          >
            Start Your Journey
          </button>
        </div>
      </nav>

      {/* SECTION 1: HERO SECTION */}
      <section className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-16 pb-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 space-y-6 text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="h-3.5 w-3.5 animate-spin" />
            AI Career Intelligence v1.0
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.15] tracking-tight">
            Your Personal <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 text-glow-cyan">
              AI Career Coach
            </span> <br />
            for the Future.
          </h1>
          <p className="text-base text-slate-400 max-w-xl leading-relaxed">
            Upload your resume, discover your ideal career path, analyze technical skill gaps, prepare for interviews, and build a personalized milestone roadmap to success.
          </p>
          <div className="flex flex-wrap gap-4">
            <button
              type="button"
              onClick={() => onStartJourney()}
              className="px-6 py-3 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-cyan-500/25 border border-cyan-400/20 flex items-center gap-2 transition-all duration-200"
            >
              Start Career Journey
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setShowDemoVideo(true)}
              className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white font-semibold text-xs rounded-xl border border-slate-800 flex items-center gap-2 transition-all duration-200"
            >
              <Play className="h-4 w-4 fill-current text-purple-400" />
              Watch Demo
            </button>
          </div>
        </div>

        {/* 3D Scene Container (WebGL or fallback) */}
        <div className="lg:col-span-6 relative w-full h-[450px] bg-slate-950/20 border border-slate-900/60 rounded-3xl overflow-hidden shadow-inner">
          <Hero3DCanvas />
        </div>
      </section>

      {/* SECTION 2: HOW IT WORKS */}
      <section className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20 border-t border-slate-900/60 text-center">
        <h2 className="text-3xl font-extrabold text-white mb-2">How It Works</h2>
        <p className="text-sm text-slate-400 max-w-md mx-auto mb-16">
          Your path from candidate to dream job in 7 automated AI-driven phases.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6 relative">
          {[
            { step: "01", label: "Resume Upload", desc: "Drag & drop secure parse" },
            { step: "02", label: "AI Analysis", desc: "Extract background skills" },
            { step: "03", label: "Career Matching", desc: "Rank 100+ pathways" },
            { step: "04", label: "Skill Gap Detection", desc: "Identify missing tech" },
            { step: "05", label: "Learning Roadmap", desc: "Semester milestone plan" },
            { step: "06", label: "Interview Prep", desc: "Practice voice/text bot" },
            { step: "07", label: "Dream Job", desc: "Land qualified offers" },
          ].map((item, idx) => (
            <div key={idx} className="relative group">
              <div className="p-5 border border-slate-800 bg-slate-900/40 hover:bg-slate-900/60 rounded-2xl transition-all duration-200 relative z-10 flex flex-col justify-between h-full min-h-[160px]">
                <div>
                  <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">{item.step}</span>
                  <h4 className="text-xs font-bold text-white mt-2">{item.label}</h4>
                </div>
                <p className="text-[10px] text-slate-500 mt-2">{item.desc}</p>
              </div>
              {idx < 6 && (
                <div className="hidden lg:block absolute top-1/2 left-[calc(100%-8px)] w-4 h-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 z-0"></div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: FEATURE SHOWCASE (20 Features Grid) */}
      <section className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20 border-t border-slate-900/60">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-white mb-2">Platform Features</h2>
          <p className="text-sm text-slate-400 max-w-md mx-auto">
            A comprehensive suite of 20 core tools engineered to guide your tech career progression.
          </p>
        </div>

        {/* Feature Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {Object.keys(features).map((key) => {
            const feat = features[key as keyof typeof features];
            const isActive = activeFeatureTab === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setActiveFeatureTab(key as any)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border text-xs font-bold transition-all duration-200 ${
                  isActive 
                    ? 'bg-slate-900 border-white text-white shadow-lg' 
                    : 'bg-slate-950 border-slate-850 text-slate-400 hover:text-white hover:border-slate-700'
                }`}
              >
                {feat.icon}
                {feat.title}
              </button>
            );
          })}
        </div>

        {/* Features Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features[activeFeatureTab].items.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: idx * 0.05 }}
              className="p-5 border border-slate-800 bg-slate-900/40 rounded-2xl glass-panel-hover flex flex-col justify-between"
            >
              <div>
                <span className="text-[9px] px-2 py-0.5 bg-slate-950 border border-slate-800 text-slate-400 rounded-full font-bold uppercase tracking-wider">
                  Feature {idx + 1}
                </span>
                <h4 className="text-sm font-bold text-white mt-3">{item.name}</h4>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">{item.desc}</p>
              </div>
              <button 
                type="button"
                onClick={() => onStartJourney()}
                className="mt-6 text-[10px] font-bold text-cyan-400 flex items-center gap-1 hover:text-cyan-300 hover:underline transition self-start"
              >
                Try feature
                <ArrowRight className="h-3 w-3" />
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECTION 4: INTERACTIVE CAREER GALAXY */}
      <section className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20 border-t border-slate-900/60">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-white mb-2">Interactive Career Galaxy</h2>
          <p className="text-sm text-slate-400 max-w-md mx-auto">
            Explore paths as nodes: hover for matching scores, click to load required skills, salary forecasts, and roadmaps.
          </p>
        </div>

        <CareerGalaxy />
      </section>

      {/* SECTION 5: AI MENTOR DEMO */}
      <section className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20 border-t border-slate-900/60 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5 text-left space-y-5">
          <span className="text-[10px] px-2.5 py-1 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 rounded-full font-bold uppercase tracking-wider">
            AI Assistant Preview
          </span>
          <h2 className="text-3xl font-extrabold text-white">Ask Your AI Mentor</h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            Need advice on which database to learn, how to start with MLOps, or what certifications are valued? Chat with our specialized AI agent in real-time.
          </p>
          <div className="p-4 bg-slate-950/40 border border-slate-900 rounded-2xl space-y-3">
            <div className="flex gap-2.5 items-start text-xs">
              <span className="font-bold text-white shrink-0">👤 You:</span>
              <span className="text-slate-300">How do I become an AI Engineer?</span>
            </div>
            <div className="flex gap-2.5 items-start text-xs border-t border-slate-900 pt-3">
              <span className="font-bold text-cyan-400 shrink-0">🤖 Mentor:</span>
              <div className="text-slate-300 space-y-1">
                <div>Learn: Python, Deep Learning, MLOps, Vector DBs.</div>
                <div className="text-[10px] text-slate-500 font-semibold">Estimated Time: 8-12 Months.</div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <AIMentorChat embedded={true} initialMessage="Ask me: 'How do I become an AI Engineer?', 'What is MLOps?', or 'What is the salary of a Data Scientist?' to test my capabilities." />
        </div>
      </section>

      {/* SECTION 6: DASHBOARD PREVIEW */}
      <section className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20 border-t border-slate-900/60 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-extrabold text-white mb-4">Dashboard Preview</h2>
          <p className="text-sm text-slate-400 leading-relaxed mb-6">
            Inside the platform, access your personal profile analytics. Check matching scores, compare salaries, and review the exact technical items you need to add to your stack.
          </p>
          <div className="space-y-4">
            <div className="flex justify-between items-center text-xs pb-3 border-b border-slate-900">
              <span className="text-slate-400">Target Role</span>
              <span className="font-bold text-white">Match Score</span>
            </div>
            {[
              { role: "AI Engineer", score: 94, color: "bg-cyan-500" },
              { role: "Data Scientist", score: 91, color: "bg-purple-500" },
              { role: "ML Engineer", score: 89, color: "bg-pink-500" }
            ].map((r, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-300">{r.role}</span>
                  <span className="text-white">{r.score}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className={`h-full ${r.color}`} style={{ width: `${r.score}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 border border-slate-800 bg-slate-900/40 rounded-3xl space-y-6">
          <div className="flex justify-between items-center">
            <h4 className="text-sm font-bold text-white">Skill Gaps (AI Engineer Target)</h4>
            <span className="text-[9px] px-2 py-0.5 bg-red-500/10 border border-red-500/20 text-red-400 rounded-full font-bold">4 Missing Skills</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-slate-950/40 border border-slate-850 rounded-xl">
              <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider block">Acquired Skills</span>
              <div className="flex flex-wrap gap-1 mt-2">
                {["Python", "SQL", "Machine Learning"].map((s, idx) => (
                  <span key={idx} className="text-[9px] px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-lg">
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <div className="p-3 bg-slate-950/40 border border-slate-850 rounded-xl">
              <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider block">Missing Skills</span>
              <div className="flex flex-wrap gap-1 mt-2">
                {["Transformers", "Vector DBs", "Docker", "MLOps"].map((s, idx) => (
                  <span key={idx} className="text-[9px] px-2 py-0.5 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center p-3 bg-slate-950/60 border border-slate-850 rounded-xl text-xs">
            <span className="text-slate-400">Market Value Trend</span>
            <span className="font-bold text-white text-emerald-400">₹8–18 LPA</span>
          </div>
        </div>
      </section>

      {/* SECTION 7: ROADMAP PREVIEW */}
      <section className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20 border-t border-slate-900/60 text-center">
        <h2 className="text-3xl font-extrabold text-white mb-2">Interactive Roadmap Preview</h2>
        <p className="text-sm text-slate-400 max-w-md mx-auto mb-16">
          Step-by-step milestones automatically mapped based on your current knowledge.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 max-w-4xl mx-auto">
          {[
            "Python Foundations", "Statistics", "Machine Learning", "Deep Learning", "MLOps", "AI Engineer Profile"
          ].map((milestone, idx) => (
            <React.Fragment key={idx}>
              <div className="px-5 py-3 border border-slate-800 bg-slate-900/40 rounded-xl text-xs font-bold text-slate-200">
                {milestone}
              </div>
              {idx < 5 && (
                <div className="text-cyan-400 text-xs font-bold font-mono rotate-90 md:rotate-0">→</div>
              )}
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* SECTION 8: INTERVIEW PREPARATION PREVIEW */}
      <section className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20 border-t border-slate-900/60 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5 text-left space-y-4">
          <h2 className="text-3xl font-extrabold text-white">Smart Interview Assessment</h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            Practice answering real mock questions and test your technical responses. Our analyzer calculates scoring metrics by evaluating critical topic vocabulary.
          </p>
          <div className="p-4 bg-slate-950/40 border border-slate-900 rounded-2xl text-xs">
            <span className="font-bold text-slate-400">Practice Question:</span>
            <div className="text-white mt-1.5 font-semibold leading-relaxed">
              "What is Overfitting, and how do you prevent it in Deep Learning?"
            </div>
          </div>
        </div>

        {/* Evaluation mockup */}
        <div className="lg:col-span-7 p-6 border border-slate-800 bg-slate-900/40 rounded-3xl space-y-4 text-left">
          <div className="flex justify-between items-center pb-3 border-b border-slate-850">
            <h4 className="text-sm font-bold text-white">Evaluation Feedback</h4>
            <div className="text-xs font-bold text-cyan-400">Score: 8.5/10</div>
          </div>
          <div className="space-y-3 text-xs leading-relaxed">
            <div className="p-3 bg-emerald-950/15 border border-emerald-500/10 rounded-xl">
              <span className="font-bold text-emerald-400 block mb-1">Key Strengths</span>
              Defined overfitting correctly and mentioned "regularization", "dropout", and "early stopping".
            </div>
            <div className="p-3 bg-amber-950/15 border border-amber-500/10 rounded-xl">
              <span className="font-bold text-amber-400 block mb-1">Missing Elements</span>
              Consider mentioning "data augmentation" to expand model training inputs.
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 9: TRENDING SKILLS SECTION */}
      <section className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20 border-t border-slate-900/60 text-center">
        <h2 className="text-3xl font-extrabold text-white mb-2">Trending Skills Tracker</h2>
        <p className="text-sm text-slate-400 max-w-md mx-auto mb-16">
          High-velocity tech skills gaining rapid traction across corporate hiring networks.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          {[
            { skill: "Generative AI", level: "Critical", color: "border-cyan-500/30 text-cyan-400" },
            { skill: "MLOps", level: "High Demand", color: "border-purple-500/30 text-purple-400" },
            { skill: "LangChain", level: "Growing", color: "border-pink-500/30 text-pink-400" },
            { skill: "Cloud AI", level: "Steady", color: "border-emerald-500/30 text-emerald-400" },
            { skill: "Cybersecurity", level: "Important", color: "border-amber-500/30 text-amber-400" },
          ].map((s, idx) => (
            <div 
              key={idx} 
              className={`px-5 py-3.5 bg-slate-900/40 border rounded-2xl text-xs font-bold hover:scale-105 transition-all duration-300 ${s.color}`}
            >
              <div>{s.skill}</div>
              <span className="text-[8px] text-slate-500 uppercase tracking-widest block mt-1 font-semibold">{s.level}</span>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 10: SUCCESS METRICS */}
      <section className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20 border-t border-slate-900/60">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: "50K+", label: "Career Analyses Run" },
            { value: "500+", label: "Skills Catalogued" },
            { value: "100+", label: "Career Paths Mapped" },
            { value: "95%", label: "Recommendation Accuracy" },
          ].map((stat, idx) => (
            <div key={idx} className="p-6 border border-slate-900 bg-slate-950/40 rounded-2xl">
              <div className="text-3xl sm:text-4xl font-extrabold text-white bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
                {stat.value}
              </div>
              <div className="text-[10px] text-slate-400 uppercase font-semibold tracking-wider mt-2">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 11: TESTIMONIALS */}
      <section className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20 border-t border-slate-900/60 text-center">
        <h2 className="text-3xl font-extrabold text-white mb-2">Student Success Stories</h2>
        <p className="text-sm text-slate-400 max-w-md mx-auto mb-16">
          Read how graduates leveraged AI career blueprints to land developer roles.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {[
            { name: "Rahul Sharma", role: "AI Engineer @ TechCorp", review: "The resume analyzer pinpointed exactly what I was missing. Adding LangChain and Docker projects based on the suggestion got me 5 interviews in 2 weeks!", stars: 5 },
            { name: "Sneha Patel", role: "ML Engineer @ FinTech", review: "The mock interview evaluator was incredibly helpful. Repeating the overfitting and RAG answers gave me the confidence to pass the technical rounds.", stars: 5 },
            { name: "Amit Kumar", role: "Data Scientist @ Analytics Inc", review: "The semester-based roadmap laid out a step-by-step path. It made learning stats and Pandas manageable while working my regular job.", stars: 5 }
          ].map((t, idx) => (
            <div key={idx} className="p-6 border border-slate-800 bg-slate-900/30 rounded-2xl flex flex-col justify-between">
              <div>
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star key={i} className="h-4.5 w-4.5 fill-current text-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed italic">
                  "{t.review}"
                </p>
              </div>
              <div className="flex items-center gap-3 mt-6 border-t border-slate-900 pt-4">
                <div className="p-2 bg-slate-850 rounded-full text-slate-400 border border-slate-800">
                  <Users className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">{t.name}</h4>
                  <p className="text-[9px] text-slate-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 12: FINAL CTA */}
      <section className="relative z-10 w-full max-w-5xl mx-auto px-6 py-20 text-center">
        <div className="p-8 sm:p-12 border border-slate-800 bg-gradient-to-tr from-slate-950 via-slate-900/80 to-slate-950 rounded-3xl relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-mesh-cyan opacity-40 pointer-events-none"></div>
          
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 relative z-10">
            Ready to Build Your Future?
          </h2>
          <p className="text-sm text-slate-400 max-w-md mx-auto mb-8 relative z-10 leading-relaxed">
            Get AI-powered career guidance, personalized learning roadmaps, technical interview preparation, and real-time skill analysis in one platform.
          </p>

          <button
            type="button"
            onClick={() => onStartJourney()}
            className="px-8 py-3.5 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-bold text-xs rounded-xl shadow-xl shadow-cyan-500/20 border border-cyan-400/20 relative z-10 transition-all duration-200"
          >
            Start Your Career Journey
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="w-full border-t border-slate-900/80 py-8 relative z-10 bg-slate-950/60">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] text-slate-500">
          <div className="flex items-center gap-2">
            <BrainCircuit className="h-4 w-4 text-cyan-400" />
            <span>© 2026 AI Career Path Advisor. All rights reserved.</span>
          </div>
          <div className="flex gap-6">
            <a href="#privacy" className="hover:text-slate-300">Privacy Policy</a>
            <a href="#terms" className="hover:text-slate-300">Terms of Service</a>
            <a href="#contact" className="hover:text-slate-300">Contact Support</a>
          </div>
        </div>
      </footer>

      {/* MOCK VIDEO MODAL */}
      {showDemoVideo && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-6">
          <div className="border border-slate-800 bg-slate-950 rounded-2xl overflow-hidden max-w-2xl w-full shadow-2xl relative">
            <button 
              type="button"
              onClick={() => setShowDemoVideo(false)}
              className="absolute top-4 right-4 p-2 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg transition"
            >
              ✕
            </button>
            <div className="p-8 text-center space-y-4">
              <Bot className="h-10 w-10 text-cyan-400 mx-auto animate-bounce" />
              <h3 className="text-xl font-bold text-white">AI Career Advisor Demo</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
                In this demo walkthrough, discover how the system analyzes resumes client-side, extracts skills, matches you with careers in the galaxy, builds roadmaps, and conducts mock assessments.
              </p>
              <div className="aspect-video bg-slate-900 rounded-xl flex items-center justify-center border border-slate-800 text-xs text-slate-500 font-mono">
                [ Demo Video Simulation - Interactive Dashboard Overview ]
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
