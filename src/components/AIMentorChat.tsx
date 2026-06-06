import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Loader } from 'lucide-react';
import { getChatbotResponse } from '../data/chatbot';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: Date;
}

interface AIMentorChatProps {
  initialMessage?: string;
  embedded?: boolean;
}

export const AIMentorChat: React.FC<AIMentorChatProps> = ({ initialMessage, embedded = false }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [suggestedPrompts, setSuggestedPrompts] = useState<string[]>([
    "How do I become an AI Engineer?",
    "What are the trending skills in MLOps?",
    "Review my resume options",
    "Compare salaries of ML roles"
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load initial message if provided
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: 'welcome',
          sender: 'assistant',
          text: initialMessage || "Hi! I am your AI Career Mentor. I'm here to guide you on your journey to becoming a top AI, ML, or Data Science professional. Ask me anything about skills, roadmaps, salaries, or project recommendations!",
          timestamp: new Date()
        }
      ]);
    }
  }, [initialMessage]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = {
      id: Math.random().toString(36).substring(7),
      sender: 'user',
      text: textToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI thinking and typing response
    setTimeout(() => {
      const response = getChatbotResponse(textToSend);
      
      const assistantMsg: ChatMessage = {
        id: Math.random().toString(36).substring(7),
        sender: 'assistant',
        text: response.reply,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMsg]);
      setSuggestedPrompts(response.prompts);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage(inputText);
    }
  };

  return (
    <div className={`flex flex-col border border-slate-800 bg-slate-900/60 backdrop-blur-md rounded-2xl overflow-hidden shadow-2xl ${
      embedded ? 'h-[450px]' : 'h-[600px]'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-slate-950/60 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-cyan-500/20 blur-sm"></div>
            <div className="p-2 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-xl text-white">
              <Bot className="h-5 w-5" />
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400 border border-slate-900"></div>
          </div>
          <div>
            <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
              AI Career Mentor
              <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
            </h4>
            <p className="text-[10px] text-slate-400">Online & Ready to Guide</p>
          </div>
        </div>
      </div>

      {/* Message List */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
        {messages.map(msg => (
          <div 
            key={msg.id} 
            className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.sender === 'assistant' && (
              <div className="p-1.5 bg-slate-800 rounded-lg text-cyan-400 border border-slate-700 shrink-0 mt-0.5">
                <Bot className="h-4 w-4" />
              </div>
            )}

            <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
              msg.sender === 'user'
                ? 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white rounded-tr-none shadow-lg shadow-cyan-500/10'
                : 'bg-slate-800/80 text-slate-100 border border-slate-700/50 rounded-tl-none whitespace-pre-wrap'
            }`}>
              {msg.text}
              <div className={`text-[9px] mt-1.5 ${msg.sender === 'user' ? 'text-cyan-200' : 'text-slate-400'} text-right`}>
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>

            {msg.sender === 'user' && (
              <div className="p-1.5 bg-cyan-950/40 rounded-lg text-cyan-400 border border-cyan-500/20 shrink-0 mt-0.5">
                <User className="h-4 w-4" />
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex items-start gap-3 justify-start">
            <div className="p-1.5 bg-slate-800 rounded-lg text-cyan-400 border border-slate-700 shrink-0 mt-0.5">
              <Bot className="h-4 w-4 animate-bounce" />
            </div>
            <div className="bg-slate-800/80 rounded-2xl rounded-tl-none px-4 py-3 border border-slate-700/50 flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompts */}
      {suggestedPrompts.length > 0 && (
        <div className="px-6 py-2 bg-slate-950/30 border-t border-slate-850 flex items-center gap-2 overflow-x-auto whitespace-nowrap scrollbar-none">
          <span className="text-[10px] text-slate-500 uppercase font-semibold tracking-wider shrink-0">Suggestions:</span>
          {suggestedPrompts.map((prompt, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSendMessage(prompt)}
              className="text-[11px] px-3 py-1 bg-slate-800/40 hover:bg-slate-800 border border-slate-700/50 hover:border-cyan-500/40 rounded-full text-slate-300 hover:text-cyan-400 transition-all duration-200"
            >
              {prompt}
            </button>
          ))}
        </div>
      )}

      {/* Input Form */}
      <div className="p-4 bg-slate-950/60 border-t border-slate-800 flex items-center gap-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about careers, roadmaps, project ideas..."
          disabled={isTyping}
          className="flex-1 bg-slate-900 border border-slate-700/80 hover:border-slate-600 focus:border-cyan-500 focus:outline-none rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 transition-all duration-200"
        />
        <button
          type="button"
          onClick={() => handleSendMessage(inputText)}
          disabled={!inputText.trim() || isTyping}
          className="p-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:from-slate-800 disabled:to-slate-850 disabled:text-slate-600 text-white rounded-xl shadow-lg hover:shadow-cyan-500/20 transition-all duration-200 shrink-0"
        >
          {isTyping ? <Loader className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
        </button>
      </div>
    </div>
  );
};
