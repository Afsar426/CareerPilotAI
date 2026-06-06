import { useState } from 'react';
import { 
  LayoutDashboard, BookOpen, Briefcase, MessageSquare, Bot, 
  BrainCircuit, LogOut, FileText, CheckCircle2, AlertTriangle, 
  Award, Compass
} from 'lucide-react';
import { ResumeParser } from '../components/ResumeParser';
import type { ParsedResumeData } from '../components/ResumeParser';
import { AIMentorChat } from '../components/AIMentorChat';
import { MockInterview } from '../components/MockInterview';
import { CAREER_DATA } from '../data/careers';

interface DashboardProps {
  initialResumeData?: ParsedResumeData | null;
  onLogout: () => void;
}

type TabType = 'home' | 'learning' | 'growth' | 'interview' | 'mentor';

export const Dashboard: React.FC<DashboardProps> = ({ initialResumeData, onLogout }) => {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [resumeData, setResumeData] = useState<ParsedResumeData | null>(initialResumeData || null);
  const [targetCareerId, setTargetCareerId] = useState<string>("ai-engineer");
  
  // Track completed roadmap steps
  const [completedRoadmapSteps, setCompletedRoadmapSteps] = useState<Record<string, string[]>>({
    "ai-engineer": ["Python Basics & OOP", "Mathematics (Linear Algebra, Calculus, Stats)"],
    "ml-engineer": ["Software Engineering & Clean Code (Python/C++)"],
    "data-scientist": ["Python / R Programming", "SQL Querying & Database Design"],
    "data-analyst": ["Advanced Microsoft Excel (VLOOKUP, Pivot Tables, PowerQuery)"],
    "mlops-engineer": ["Advanced Python & Linux Administration"]
  });

  const handleResumeParsed = (data: ParsedResumeData) => {
    setResumeData(data);
    // Auto-set target career to the highest match
    if (data.suggestedCareers && data.suggestedCareers.length > 0) {
      setTargetCareerId(data.suggestedCareers[0].id);
    }
  };

  const handleToggleRoadmapStep = (careerId: string, step: string) => {
    setCompletedRoadmapSteps(prev => {
      const current = prev[careerId] || [];
      const updated = current.includes(step)
        ? current.filter(s => s !== step)
        : [...current, step];
      return { ...prev, [careerId]: updated };
    });
  };

  const activeCareer = CAREER_DATA[targetCareerId] || CAREER_DATA["ai-engineer"];
  const careers = Object.values(CAREER_DATA);

  // Fallback default skills list if no resume uploaded
  const defaultSkills = ["Python", "SQL", "Machine Learning"];
  const currentSkills = resumeData ? resumeData.extractedSkills : defaultSkills;
  
  // Missing skills are skills required by target role that are not in current skills
  const missingSkills = activeCareer.requiredSkills.filter(s => !currentSkills.includes(s));
  const acquiredSkillsForTarget = activeCareer.requiredSkills.filter(s => currentSkills.includes(s));
  
  // Calculate dynamic match score based on current skills vs target skills
  const matchPercentage = Math.round((acquiredSkillsForTarget.length / activeCareer.requiredSkills.length) * 100);

  return (
    <div className="w-full min-h-screen bg-slate-950 flex flex-col md:flex-row">
      {/* SIDEBAR NAVIGATION */}
      <aside className="w-full md:w-64 bg-slate-900 border-r border-slate-800 p-5 flex flex-col justify-between shrink-0">
        <div className="space-y-8">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-gradient-to-tr from-cyan-500 to-purple-600 rounded-lg text-white">
              <BrainCircuit className="h-5 w-5" />
            </div>
            <span className="text-sm font-bold text-white">Career Advisor</span>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block px-3 mb-2">Workspace</span>
            {[
              { id: 'home', label: 'Dashboard Home', icon: <LayoutDashboard className="h-4.5 w-4.5" /> },
              { id: 'learning', label: 'Learning Roadmap', icon: <BookOpen className="h-4.5 w-4.5" /> },
              { id: 'growth', label: 'Career Growth', icon: <Briefcase className="h-4.5 w-4.5" /> },
              { id: 'interview', label: 'Mock Interviews', icon: <MessageSquare className="h-4.5 w-4.5" /> },
              { id: 'mentor', label: 'AI Career Mentor', icon: <Bot className="h-4.5 w-4.5" /> }
            ].map(item => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id as TabType)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === item.id 
                    ? 'bg-slate-800 text-white shadow-lg' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        {/* User Info / Logout */}
        <div className="mt-8 pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-cyan-400 to-purple-400 flex items-center justify-center font-bold text-slate-900 text-xs">
              U
            </div>
            <div>
              <h5 className="font-bold text-white">Developer User</h5>
              <p className="text-[9px] text-slate-500">Premium Account</p>
            </div>
          </div>
          <button 
            type="button"
            onClick={onLogout}
            className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
        {!resumeData && activeTab === 'home' ? (
          // Welcome / Resume Upload State
          <div className="max-w-4xl mx-auto space-y-8 py-8">
            <div className="text-center space-y-3">
              <h2 className="text-3xl font-extrabold text-white">Analyze Your Profile</h2>
              <p className="text-sm text-slate-400 max-w-md mx-auto">
                Upload your resume to calibrate match scores, parse skills, and automatically compile learning pathways.
              </p>
            </div>
            <ResumeParser onParseComplete={handleResumeParsed} />
            
            {/* Quick Bypass button for demo convenience */}
            <div className="text-center">
              <button
                type="button"
                onClick={() => handleResumeParsed({
                  fileName: "Mock_Resume.pdf",
                  fileSize: "0.24 MB",
                  extractedSkills: ["Python", "SQL", "Machine Learning", "Data Analysis", "Git", "Linear Algebra"],
                  suggestedCareers: [{ id: "ai-engineer", score: 94 }, { id: "ml-engineer", score: 89 }],
                  resumeScore: 75,
                  formattingScore: 80,
                  impactScore: 70,
                  suggestions: ["Quantify achievements", "Add MLOps framework mentions"]
                })}
                className="text-xs text-slate-500 hover:text-cyan-400 underline transition"
              >
                Or skip and load mock candidate profile
              </button>
            </div>
          </div>
        ) : (
          // Main Active Tabs Workspace
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Target Career Focus Banner */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-slate-900 border border-slate-800 rounded-2xl gap-4">
              <div className="flex items-center gap-3">
                <Compass className="h-5 w-5 text-cyan-400" />
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wide">Targeting Career Focus</h4>
                  <div className="text-sm font-bold text-white mt-0.5">{activeCareer.name}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-400 font-medium">Switch Target:</span>
                <select
                  value={targetCareerId}
                  onChange={(e) => setTargetCareerId(e.target.value)}
                  className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                >
                  {careers.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* TAB CONTENT: HOME / OVERVIEW */}
            {activeTab === 'home' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                {/* Left 2 columns: Scores, Skill Analysis */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Scores Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-5 border border-slate-800 bg-slate-900/40 rounded-2xl relative overflow-hidden">
                      <div className="absolute top-4 right-4 text-[9px] px-2 py-0.5 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 rounded-full font-bold">
                        Calculated
                      </div>
                      <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Career Match</span>
                      <div className="text-4xl font-extrabold text-white mt-3">{matchPercentage}%</div>
                      <p className="text-[10px] text-slate-400 mt-2">Prerequisite skill similarity</p>
                    </div>

                    <div className="p-5 border border-slate-800 bg-slate-900/40 rounded-2xl">
                      <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Resume Quality</span>
                      <div className="text-4xl font-extrabold text-cyan-400 mt-3">
                        {resumeData?.resumeScore || 70}<span className="text-xs text-slate-500">/100</span>
                      </div>
                      <p className="text-[10px] text-slate-400 mt-2">Overall ATS alignment score</p>
                    </div>

                    <div className="p-5 border border-slate-800 bg-slate-900/40 rounded-2xl">
                      <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Market Salary Range</span>
                      <div className="text-2xl font-extrabold text-white mt-3.5 leading-tight">{activeCareer.salaryRange}</div>
                      <p className="text-[10px] text-slate-400 mt-2">Average entry salary index</p>
                    </div>
                  </div>

                  {/* Skill Analysis Details */}
                  <div className="p-6 border border-slate-800 bg-slate-900/40 rounded-3xl space-y-6">
                    <h3 className="text-base font-bold text-white">Skills Matrix (Target Career: {activeCareer.name})</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-4 bg-slate-950/40 border border-slate-850 rounded-xl space-y-3">
                        <div className="flex items-center justify-between text-xs border-b border-slate-900 pb-2">
                          <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                            <CheckCircle2 className="h-4 w-4" />
                            Acquired Skills ({acquiredSkillsForTarget.length})
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {acquiredSkillsForTarget.map((skill, idx) => (
                            <span key={idx} className="text-[10px] px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-lg">
                              {skill}
                            </span>
                          ))}
                          {acquiredSkillsForTarget.length === 0 && (
                            <span className="text-[10px] text-slate-500">No matching skills found in resume.</span>
                          )}
                        </div>
                      </div>

                      <div className="p-4 bg-slate-950/40 border border-slate-850 rounded-xl space-y-3">
                        <div className="flex items-center justify-between text-xs border-b border-slate-900 pb-2">
                          <span className="font-bold text-red-400 flex items-center gap-1.5">
                            <AlertTriangle className="h-4 w-4 animate-pulse" />
                            Missing Skill Gaps ({missingSkills.length})
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {missingSkills.map((skill, idx) => (
                            <span key={idx} className="text-[10px] px-2.5 py-1 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg">
                              {skill}
                            </span>
                          ))}
                          {missingSkills.length === 0 && (
                            <span className="text-[10px] text-emerald-400">All target skills acquired! Excellent work.</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Alternative Recommendations */}
                  <div className="p-6 border border-slate-800 bg-slate-900/40 rounded-3xl space-y-4">
                    <h3 className="text-base font-bold text-white">Alternate Career Recommendations</h3>
                    <div className="space-y-2.5">
                      {careers.filter(c => c.id !== targetCareerId).map(c => {
                        const score = Math.round((c.requiredSkills.filter(s => currentSkills.includes(s)).length / c.requiredSkills.length) * 100);
                        return (
                          <div 
                            key={c.id} 
                            onClick={() => setTargetCareerId(c.id)}
                            className="flex items-center justify-between p-3.5 bg-slate-950/30 border border-slate-900 hover:border-slate-800 hover:bg-slate-950/60 rounded-xl cursor-pointer transition"
                          >
                            <span className="text-xs font-bold text-slate-300">{c.name}</span>
                            <div className="flex items-center gap-3">
                              <span className="text-xs text-slate-400">{score}% match</span>
                              <div className="h-1.5 w-16 bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full bg-purple-500" style={{ width: `${score}%` }}></div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Right 1 column: Resume Details & Suggestions */}
                <div className="space-y-6">
                  {/* File Info Card */}
                  {resumeData && (
                    <div className="p-5 border border-slate-800 bg-slate-900/40 rounded-2xl flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-cyan-950 border border-cyan-500/20 text-cyan-400 rounded-xl">
                          <FileText className="h-5 w-5" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-white truncate max-w-[120px]">{resumeData.fileName}</h4>
                          <p className="text-[10px] text-slate-500">{resumeData.fileSize}</p>
                        </div>
                      </div>
                      <button 
                        type="button"
                        onClick={() => setResumeData(null)}
                        className="text-[10px] text-cyan-400 hover:underline flex items-center gap-1"
                      >
                        Re-upload
                      </button>
                    </div>
                  )}

                  {/* ATS Suggestions */}
                  <div className="p-6 border border-slate-800 bg-slate-900/40 rounded-3xl space-y-4">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <Award className="h-4.5 w-4.5 text-cyan-400" />
                      ATS Optimization Advice
                    </h3>
                    <div className="space-y-3">
                      {(resumeData?.suggestions || [
                        "Include metrics: Replace general bullet points with quantified results.",
                        "Add target keywords: Profile lacks specific frameworks like PyTorch or Docker.",
                        "Use clean layout: Avoid double column grids for ATS parser readability."
                      ]).map((item, idx) => (
                        <div key={idx} className="flex gap-2.5 items-start text-xs leading-relaxed text-slate-400">
                          <span className="text-cyan-400 font-bold font-mono">•</span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: LEARNING & ROADMAP */}
            {activeTab === 'learning' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                {/* Roadmap checklist (Left 7 Columns) */}
                <div className="lg:col-span-7 border border-slate-800 bg-slate-900/40 rounded-3xl p-6 space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-white">Semester-Based Learning Path</h3>
                    <p className="text-xs text-slate-400">Mark milestones complete to update progress status</p>
                  </div>

                  <div className="space-y-4 relative pl-4 border-l border-slate-850">
                    {activeCareer.roadmap.map((milestone, idx) => {
                      const completed = (completedRoadmapSteps[targetCareerId] || []).includes(milestone);
                      return (
                        <div key={idx} className="relative flex items-start gap-4">
                          {/* Timeline dot */}
                          <div className={`absolute -left-[21px] top-1.5 h-3.5 w-3.5 rounded-full border-2 transition ${
                            completed ? 'bg-cyan-500 border-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.6)]' : 'bg-slate-950 border-slate-800'
                          }`}></div>

                          <div 
                            onClick={() => handleToggleRoadmapStep(targetCareerId, milestone)}
                            className={`flex-1 p-4 border rounded-2xl cursor-pointer flex items-center justify-between transition ${
                              completed 
                                ? 'bg-cyan-950/15 border-cyan-500/30 text-white' 
                                : 'bg-slate-950/40 border-slate-900 text-slate-400 hover:border-slate-800'
                            }`}
                          >
                            <div>
                              <span className="text-[9px] uppercase font-bold text-slate-500 tracking-wider">Milestone {idx + 1}</span>
                              <h4 className="text-xs font-bold mt-1 text-slate-300">{milestone}</h4>
                            </div>
                            <div className={`h-4.5 w-4.5 border rounded flex items-center justify-center transition ${
                              completed ? 'bg-cyan-500 border-cyan-500 text-slate-950' : 'border-slate-700'
                            }`}>
                              {completed && <span className="text-[10px] font-bold">✓</span>}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Courses & Certificates (Right 5 Columns) */}
                <div className="lg:col-span-5 space-y-6">
                  {/* Courses */}
                  <div className="p-6 border border-slate-800 bg-slate-900/40 rounded-3xl space-y-4">
                    <h3 className="text-sm font-bold text-white">Recommended Courses</h3>
                    <div className="space-y-3">
                      {activeCareer.courses.map((course, idx) => (
                        <div key={idx} className="p-3 bg-slate-950/50 border border-slate-900 rounded-xl space-y-2">
                          <div className="flex justify-between items-center text-xs">
                            <span className="font-bold text-slate-300">{course.name}</span>
                            <span className="text-[9px] px-2 py-0.5 bg-slate-900 border border-slate-800 text-slate-500 rounded-full font-bold">
                              {course.difficulty}
                            </span>
                          </div>
                          <div className="flex justify-between items-center text-[10px] text-slate-500">
                            <span>{course.platform}</span>
                            <span>{course.duration}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Certifications */}
                  <div className="p-6 border border-slate-800 bg-slate-900/40 rounded-3xl space-y-4">
                    <h3 className="text-sm font-bold text-white">Value Add Certifications</h3>
                    <div className="space-y-2">
                      {activeCareer.certifications.map((cert, idx) => (
                        <div key={idx} className="flex gap-3 items-center p-3 bg-slate-950/20 border border-slate-900 rounded-xl text-xs">
                          <Award className="h-4.5 w-4.5 text-amber-500 shrink-0" />
                          <span className="font-medium text-slate-300">{cert}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: CAREER GROWTH */}
            {activeTab === 'growth' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                {/* Left 2 columns: Market analytics, projects */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Market demand */}
                  <div className="p-6 border border-slate-800 bg-slate-900/40 rounded-3xl space-y-6">
                    <h3 className="text-base font-bold text-white">Market Demand & Forecast</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-slate-950/40 border border-slate-850 rounded-xl">
                        <span className="text-[10px] text-slate-500 uppercase font-semibold">Growth Speed</span>
                        <div className="text-2xl font-extrabold text-white mt-1">{activeCareer.demandGrowth}</div>
                      </div>
                      <div className="p-4 bg-slate-950/40 border border-slate-850 rounded-xl">
                        <span className="text-[10px] text-slate-500 uppercase font-semibold">CAGR Velocity</span>
                        <div className="text-2xl font-extrabold text-emerald-400 mt-1">{activeCareer.cagr}</div>
                      </div>
                    </div>
                  </div>

                  {/* Project recommendations */}
                  <div className="p-6 border border-slate-800 bg-slate-900/40 rounded-3xl space-y-4">
                    <h3 className="text-base font-bold text-white">Recommended GitHub Portfolio Projects</h3>
                    <div className="space-y-4">
                      {activeCareer.projects.map((proj, idx) => (
                        <div key={idx} className="p-4 bg-slate-950/50 border border-slate-900 rounded-xl space-y-3">
                          <div className="flex justify-between items-center text-xs">
                            <span className="font-bold text-cyan-400">{proj.name}</span>
                            <span className="text-[9px] px-2.5 py-0.5 bg-slate-900 border border-slate-800 text-slate-400 rounded-full font-bold">
                              {proj.difficulty}
                            </span>
                          </div>
                          <p className="text-xs text-slate-300 leading-relaxed">
                            {proj.desc}
                          </p>
                          <div className="flex flex-wrap gap-1.5 pt-2">
                            {proj.tech.map((t, i) => (
                              <span key={i} className="text-[9px] px-2 py-0.5 bg-slate-850 border border-slate-800 text-slate-400 rounded">
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right 1 column: Trending skills tracker */}
                <div className="p-6 border border-slate-800 bg-slate-900/40 rounded-3xl space-y-6">
                  <div>
                    <h3 className="text-sm font-bold text-white">Trending Skills Tracker</h3>
                    <p className="text-[10px] text-slate-500 mt-1">High-traction skills across current hiring demands</p>
                  </div>
                  <div className="space-y-3">
                    {[
                      { skill: "Generative AI", demand: 98, status: "Critical" },
                      { skill: "MLOps", demand: 94, status: "High Demand" },
                      { skill: "LangChain", demand: 89, status: "Growing" },
                      { skill: "Vector Search", demand: 85, status: "Growing" },
                      { skill: "Kubernetes", demand: 82, status: "Steady" },
                      { skill: "FastAPI serving", demand: 78, status: "Steady" },
                    ].map((s, idx) => (
                      <div key={idx} className="space-y-1.5">
                        <div className="flex justify-between text-xs font-semibold">
                          <span className="text-slate-300">{s.skill}</span>
                          <span className="text-slate-500 text-[10px]">{s.status}</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-900">
                          <div className="h-full bg-cyan-500" style={{ width: `${s.demand}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: INTERVIEW PRACTICE */}
            {activeTab === 'interview' && (
              <div className="space-y-6">
                <div className="text-left max-w-xl">
                  <h3 className="text-lg font-bold text-white">Mock Interview Arena</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Select a target technical domain, type detailed explanations, and review your grading cards.
                  </p>
                </div>
                <MockInterview />
              </div>
            )}

            {/* TAB CONTENT: AI MENTOR CHAT */}
            {activeTab === 'mentor' && (
              <div className="space-y-6">
                <div className="text-left max-w-xl">
                  <h3 className="text-lg font-bold text-white">AI Career Mentor Chatroom</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Ask your technical advisor about complex subject requirements, learning materials, or resume corrections.
                  </p>
                </div>
                <AIMentorChat initialMessage={`Hello! I see you are targetting a career as a ${activeCareer.name}. I've loaded your profile matching score (${matchPercentage}%). Ask me how you can acquire missing skills like ${missingSkills.slice(0, 3).join(', ')}!`} />
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};
