import { useState } from 'react';
import { LandingPage } from './pages/LandingPage';
import { Dashboard } from './pages/Dashboard';
import type { ParsedResumeData } from './components/ResumeParser';

export default function App() {
  const [view, setView] = useState<'landing' | 'dashboard'>('landing');
  const [resumeData, setResumeData] = useState<ParsedResumeData | null>(null);

  const handleStartJourney = (data?: ParsedResumeData) => {
    if (data) {
      setResumeData(data);
    }
    setView('dashboard');
  };

  const handleLogout = () => {
    setResumeData(null);
    setView('landing');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-cyan-500/30 selection:text-white">
      {view === 'landing' ? (
        <LandingPage onStartJourney={handleStartJourney} />
      ) : (
        <Dashboard initialResumeData={resumeData} onLogout={handleLogout} />
      )}
    </div>
  );
}
