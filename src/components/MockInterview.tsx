import React, { useState } from 'react';
import { Play, CheckCircle, AlertCircle, ArrowRight, Loader2, Sparkles, MessageSquare, Award } from 'lucide-react';
import { CAREER_DATA } from '../data/careers';

interface EvaluationResult {
  score: number;
  strengths: string;
  gaps: string;
  matchedKeywords: string[];
  missingKeywords: string[];
}

export const MockInterview: React.FC = () => {
  const [selectedCareerId, setSelectedCareerId] = useState<string>("ai-engineer");
  const [isInterviewRunning, setIsInterviewRunning] = useState(false);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [evaluating, setEvaluating] = useState(false);
  const [evaluation, setEvaluation] = useState<EvaluationResult | null>(null);
  
  // Total session statistics
  const [totalScore, setTotalScore] = useState(0);
  const [completedQuestionsCount, setCompletedQuestionsCount] = useState(0);

  const activeCareer = CAREER_DATA[selectedCareerId];
  const questions = activeCareer?.questions || [];
  const currentQuestion = questions[currentQuestionIdx];

  const handleStartInterview = () => {
    setIsInterviewRunning(true);
    setCurrentQuestionIdx(0);
    setUserAnswer("");
    setEvaluation(null);
    setTotalScore(0);
    setCompletedQuestionsCount(0);
  };

  const handleEvaluateAnswer = () => {
    if (!userAnswer.trim()) return;

    setEvaluating(true);
    
    // Simulate parsing the answer and comparing against keywords
    setTimeout(() => {
      const keywords = currentQuestion.keywords;
      const lowercasedAnswer = userAnswer.toLowerCase();
      
      const matched = keywords.filter(keyword => lowercasedAnswer.includes(keyword.toLowerCase()));
      const missing = keywords.filter(keyword => !lowercasedAnswer.includes(keyword.toLowerCase()));
      
      // Calculate a dynamic score based on keyword match percentage
      // Base score is 5.0 (for effort), scaling up to 10.0
      const matchRatio = matched.length / keywords.length;
      const calculatedScore = parseFloat((5.0 + matchRatio * 5.0).toFixed(1));

      // Formulate mock detailed response
      let strengths = "Your answer outlines the basic concept correctly. ";
      let gaps = "Your answer could benefit from deeper technical vocabulary. ";

      if (calculatedScore >= 9.0) {
        strengths += "Excellent! You demonstrated deep technical mastery and used industry-standard terms.";
        gaps = "None. High-quality production-ready explanation.";
      } else if (calculatedScore >= 7.5) {
        strengths += "Good grasp of the core concepts and functional workflows.";
        gaps += `Try explicitly mentioning keywords such as: ${missing.slice(0, 2).join(', ')}.`;
      } else {
        strengths += "You have the right high-level intuition, but it needs technical backing.";
        gaps += `You missed several key concepts. Ensure you cover topics like: ${missing.join(', ')}.`;
      }

      const evalResult: EvaluationResult = {
        score: calculatedScore,
        strengths,
        gaps,
        matchedKeywords: matched,
        missingKeywords: missing
      };

      setEvaluation(evalResult);
      setTotalScore(prev => prev + calculatedScore);
      setCompletedQuestionsCount(prev => prev + 1);
      setEvaluating(false);
    }, 1500);
  };

  const handleNextQuestion = () => {
    setUserAnswer("");
    setEvaluation(null);
    if (currentQuestionIdx + 1 < questions.length) {
      setCurrentQuestionIdx(prev => prev + 1);
    } else {
      // Completed last question
      setIsInterviewRunning(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto border border-slate-800 bg-slate-900/60 backdrop-blur-md rounded-3xl overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="px-6 py-4 bg-slate-950/60 border-b border-slate-800 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-pink-500/10 border border-pink-500/20 text-pink-400 rounded-xl">
            <MessageSquare className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-1.5">
              AI Mock Interviewer
              <Sparkles className="h-3.5 w-3.5 text-pink-400" />
            </h3>
            <p className="text-[10px] text-slate-400">Evaluate your technical speaking skills</p>
          </div>
        </div>
        
        {isInterviewRunning && (
          <div className="text-xs text-slate-300 font-medium bg-slate-900 px-3 py-1 border border-slate-800 rounded-lg">
            Question {currentQuestionIdx + 1} of {questions.length}
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="p-6">
        {!isInterviewRunning ? (
          // Setup View
          <div className="text-center py-8">
            {completedQuestionsCount > 0 ? (
              // Show Results Summary from previous run
              <div className="mb-8 p-6 bg-slate-950/40 border border-slate-800 rounded-2xl max-w-md mx-auto">
                <Award className="h-12 w-12 text-pink-400 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-white">Interview Complete!</h4>
                <div className="text-3xl font-extrabold text-cyan-400 mt-2">
                  {(totalScore / completedQuestionsCount).toFixed(1)} <span className="text-xs text-slate-400">/ 10</span>
                </div>
                <p className="text-xs text-slate-400 mt-2">
                  Average score across {completedQuestionsCount} questions for {activeCareer.name}.
                </p>
              </div>
            ) : (
              <div className="p-4 bg-pink-950/10 border border-pink-500/10 rounded-full w-fit mx-auto mb-4 text-pink-400">
                <Play className="h-8 w-8" />
              </div>
            )}

            <h3 className="text-xl font-bold text-white mb-2">Practice for your Dream Job</h3>
            <p className="text-sm text-slate-400 mb-6 max-w-sm mx-auto">
              Select your career track and practice answering questions. Get instant score cards, strength audits, and sample answers.
            </p>

            <div className="max-w-xs mx-auto mb-8">
              <label className="block text-left text-xs text-slate-400 font-semibold uppercase tracking-wider mb-2">Target Career Path</label>
              <select
                value={selectedCareerId}
                onChange={(e) => setSelectedCareerId(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-pink-500 transition-all"
              >
                {Object.values(CAREER_DATA).map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <button
              type="button"
              onClick={handleStartInterview}
              className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white font-medium text-sm rounded-xl shadow-lg shadow-pink-500/20 border border-pink-400/20 transition-all duration-200"
            >
              {completedQuestionsCount > 0 ? "Start New Session" : "Start Mock Interview"}
            </button>
          </div>
        ) : (
          // Active Interview View
          <div className="space-y-6">
            {/* Question Panel */}
            <div className="p-5 bg-slate-950/60 border border-slate-850 rounded-2xl">
              <span className="text-[9px] px-2 py-0.5 bg-pink-500/10 border border-pink-500/20 text-pink-400 rounded-full font-bold uppercase tracking-wider">
                {currentQuestion.category} Question
              </span>
              <h4 className="text-base font-bold text-white mt-3 leading-relaxed">
                {currentQuestion.question}
              </h4>
            </div>

            {/* Answer Editor */}
            {!evaluation ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-slate-400 font-semibold uppercase tracking-wider mb-2">Your Answer</label>
                  <textarea
                    rows={6}
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    placeholder="Type your detailed explanation here... (Try to mention specific technical terms)"
                    disabled={evaluating}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-pink-500 focus:outline-none rounded-xl p-4 text-sm text-white placeholder-slate-600 transition-all"
                  />
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsInterviewRunning(false)}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-xs rounded-lg transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleEvaluateAnswer}
                    disabled={!userAnswer.trim() || evaluating}
                    className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:from-slate-800 disabled:to-slate-850 disabled:text-slate-600 text-white font-medium text-xs rounded-lg shadow-lg hover:shadow-cyan-500/20 flex items-center gap-2 transition-all duration-200"
                  >
                    {evaluating ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        Submit Answer
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            ) : (
              // Evaluation Results View
              <div className="space-y-6 animate-fadeIn">
                {/* Score Header */}
                <div className="flex items-center justify-between p-4 bg-slate-950/40 border border-slate-850 rounded-xl">
                  <div>
                    <span className="text-[9px] text-slate-500 uppercase font-semibold">Evaluation Score</span>
                    <div className="text-2xl font-extrabold text-cyan-400 mt-0.5">
                      {evaluation.score} <span className="text-xs text-slate-500">/ 10</span>
                    </div>
                  </div>
                  <div className="text-xs font-semibold px-3 py-1 bg-cyan-950/30 text-cyan-400 border border-cyan-500/20 rounded-lg">
                    {evaluation.score >= 8.5 ? "Outstanding" : evaluation.score >= 7.0 ? "Solid Answer" : "Needs Review"}
                  </div>
                </div>

                {/* Detailed Feedback */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-emerald-950/10 border border-emerald-500/10 rounded-xl">
                    <h5 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                      <CheckCircle className="h-4 w-4" />
                      Key Strengths
                    </h5>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {evaluation.strengths}
                    </p>
                  </div>
                  <div className="p-4 bg-amber-950/10 border border-amber-500/10 rounded-xl">
                    <h5 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                      <AlertCircle className="h-4 w-4" />
                      Improvement Areas
                    </h5>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {evaluation.gaps}
                    </p>
                  </div>
                </div>

                {/* Keyword Analysis */}
                <div className="p-4 bg-slate-950/40 border border-slate-850 rounded-xl">
                  <h5 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Vocabulary Check</h5>
                  <div className="flex flex-wrap gap-2">
                    {evaluation.matchedKeywords.map((kw, idx) => (
                      <span key={idx} className="text-[9px] px-2.5 py-0.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full font-medium">
                        ✓ {kw}
                      </span>
                    ))}
                    {evaluation.missingKeywords.map((kw, idx) => (
                      <span key={idx} className="text-[9px] px-2.5 py-0.5 bg-slate-800 border border-slate-700/50 text-slate-500 rounded-full font-medium line-through">
                        ✗ {kw}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Ideal Answer Showcase */}
                <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl">
                  <h5 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">AI Suggestion Answer</h5>
                  <p className="text-xs text-slate-400 leading-relaxed italic">
                    "{currentQuestion.idealAnswer}"
                  </p>
                </div>

                {/* Actions */}
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleNextQuestion}
                    className="px-6 py-2.5 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white font-medium text-xs rounded-lg shadow-lg flex items-center gap-2 transition-all duration-200"
                  >
                    {currentQuestionIdx + 1 < questions.length ? (
                      <>
                        Next Question
                        <ArrowRight className="h-4 w-4" />
                      </>
                    ) : (
                      <>
                        Finish Interview
                        <CheckCircle className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
