import React, { useState, useRef } from 'react';
import { Upload, CheckCircle, AlertCircle, Loader2, RefreshCw } from 'lucide-react';
import { CAREER_DATA } from '../data/careers';

export interface ParsedResumeData {
  fileName: string;
  fileSize: string;
  extractedSkills: string[];
  suggestedCareers: { id: string; score: number }[];
  resumeScore: number;
  formattingScore: number;
  impactScore: number;
  suggestions: string[];
}

interface ResumeParserProps {
  onParseComplete: (data: ParsedResumeData) => void;
}

export const ResumeParser: React.FC<ResumeParserProps> = ({ onParseComplete }) => {
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadingSteps = [
    "Uploading document securely...",
    "Extracting text content...",
    "Running semantic AI parsing...",
    "Mapping skills against industry demands...",
    "Calibrating career compatibility scores..."
  ];

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const processFile = (file: File) => {
    // Basic verification
    const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
    if (!validTypes.includes(file.type) && !file.name.endsWith('.pdf') && !file.name.endsWith('.docx') && !file.name.endsWith('.txt')) {
      setError("Please upload a PDF, Word (.docx), or Text (.txt) file.");
      return;
    }

    setError(null);
    setLoading(true);
    setLoadingStep(0);

    // Simulate stepping through AI analysis
    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step < loadingSteps.length) {
        setLoadingStep(step);
      } else {
        clearInterval(interval);
        
        // Mock results - extract some skills but leave some missing for the ML/AI roadmap gap demonstration
        const mockSkills = ["Python", "SQL", "Machine Learning", "Data Analysis", "Git", "Linear Algebra", "Statistics", "HTML/CSS"];
        
        // Calculate scores based on the actual career database
        const suggestedCareers = Object.keys(CAREER_DATA).map(key => {
          const career = CAREER_DATA[key];
          // Simple overlap calculation
          const overlap = career.requiredSkills.filter(s => mockSkills.includes(s));
          const score = Math.round((overlap.length / career.requiredSkills.length) * 100);
          return { id: career.id, score };
        }).sort((a, b) => b.score - a.score);

        const result: ParsedResumeData = {
          fileName: file.name,
          fileSize: (file.size / 1024 / 1024).toFixed(2) + " MB",
          extractedSkills: mockSkills,
          suggestedCareers,
          resumeScore: 72,
          formattingScore: 85,
          impactScore: 68,
          suggestions: [
            "Quantify achievements: Replace generic tasks with metrics (e.g., 'Improved accuracy by 12%').",
            "Add core technologies: Your profile shows Machine Learning interest, but lacks modern framework mentions like 'PyTorch' or 'Docker'.",
            "Strengthen MLOps profile: If targeting AI/ML roles, include experience or projects mentioning 'CI/CD' and 'Model Serving'.",
            "Use active verbs: Begin bullet points with strong action verbs like 'Engineered', 'Optimized', 'Designed'."
          ]
        };

        setLoading(false);
        onParseComplete(result);
      }
    }, 1200);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const onButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {!loading ? (
        <div 
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={onButtonClick}
          className={`flex flex-col items-center justify-center border-2 border-dashed rounded-2xl p-10 cursor-pointer transition-all duration-300 backdrop-blur-md ${
            dragActive 
              ? 'border-cyan-400 bg-cyan-950/20 shadow-[0_0_20px_rgba(34,211,238,0.2)]' 
              : 'border-slate-700 hover:border-slate-500 bg-slate-900/40 hover:bg-slate-900/60'
          }`}
        >
          <input 
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept=".pdf,.docx,.txt"
            onChange={handleChange}
          />
          
          <div className="p-4 bg-slate-800/80 rounded-full border border-slate-700 shadow-inner mb-4">
            <Upload className="h-8 w-8 text-cyan-400 animate-pulse" />
          </div>

          <h3 className="text-xl font-bold text-white mb-2">Drag and drop your resume</h3>
          <p className="text-sm text-slate-400 mb-6 text-center max-w-sm">
            Supports PDF, DOCX, or TXT formats (Max 5MB). Your data is processed securely client-side.
          </p>

          <button 
            type="button"
            className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-medium rounded-xl shadow-lg shadow-cyan-500/25 border border-cyan-400/20 transition-all duration-200"
          >
            Select File
          </button>

          {error && (
            <div className="flex items-center gap-2 mt-4 text-red-400 text-sm bg-red-950/20 px-4 py-2 rounded-lg border border-red-500/20">
              <AlertCircle className="h-4 w-4" />
              <span>{error}</span>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-2xl p-10 border border-slate-800 bg-slate-900/60 backdrop-blur-md">
          <div className="relative flex items-center justify-center mb-6">
            <div className="absolute inset-0 rounded-full bg-cyan-500/20 blur-md animate-ping"></div>
            <Loader2 className="h-12 w-12 text-cyan-400 animate-spin" />
          </div>
          
          <h3 className="text-xl font-bold text-white mb-2">Parsing Resume</h3>
          <p className="text-sm text-cyan-400/90 font-medium mb-6 animate-pulse">
            {loadingSteps[loadingStep]}
          </p>

          {/* Progress bar */}
          <div className="w-full max-w-md bg-slate-800 rounded-full h-1.5 overflow-hidden border border-slate-700">
            <div 
              className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full transition-all duration-500 ease-out"
              style={{ width: `${((loadingStep + 1) / loadingSteps.length) * 100}%` }}
            ></div>
          </div>

          {/* Loading status items */}
          <div className="w-full max-w-md mt-6 space-y-2">
            {loadingSteps.map((stepName, idx) => (
              <div key={idx} className="flex items-center gap-3 text-xs">
                {idx < loadingStep ? (
                  <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" />
                ) : idx === loadingStep ? (
                  <RefreshCw className="h-4 w-4 text-cyan-400 animate-spin shrink-0" />
                ) : (
                  <div className="h-4 w-4 rounded-full border border-slate-700 shrink-0"></div>
                )}
                <span className={idx <= loadingStep ? 'text-slate-300 font-medium' : 'text-slate-600'}>
                  {stepName}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
