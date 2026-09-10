import React, { useState, useEffect, useRef } from 'react';
import { AppCategory, BuildMode } from '../types';
import { ROTATING_PROMPT_PLACEHOLDERS, SUGGESTED_PROMPTS } from '../data/templates';
import { Plus, Mic, ArrowUpRight, Check, ChevronDown, Paperclip, Globe, FileText, Sparkles } from 'lucide-react';

interface PromptBoxProps {
  onGenerate: (prompt: string, category: AppCategory, mode: BuildMode) => void;
  isGenerating: boolean;
  activeCategory: AppCategory;
  onSelectCategory: (cat: AppCategory) => void;
}

export const PromptBox: React.FC<PromptBoxProps> = ({
  onGenerate,
  isGenerating,
  activeCategory,
  onSelectCategory,
}) => {
  const [prompt, setPrompt] = useState('');
  const [mode, setMode] = useState<BuildMode>('build');
  const [isModeOpen, setIsModeOpen] = useState(false);
  const [isPlusOpen, setIsPlusOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Rotate placeholder text smoothly
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % ROTATING_PROMPT_PLACEHOLDERS.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cleanPrompt = prompt.trim() || ROTATING_PROMPT_PLACEHOLDERS[placeholderIndex];
    if (!cleanPrompt || isGenerating) return;
    onGenerate(cleanPrompt, activeCategory, mode);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const toggleMic = () => {
    if (isListening) {
      setIsListening(false);
    } else {
      setIsListening(true);
      // Simulate speech recognition
      setTimeout(() => {
        setPrompt("Un CRM moderne pour suivre les leads d'une agence avec devis et relances automatiques");
        setIsListening(false);
      }, 2500);
    }
  };

  return (
    <div className="w-full max-w-[780px] mx-auto">
      {/* Category selector pills - Base44 signature style */}
      <div className="flex items-center justify-center gap-2 sm:gap-4 mb-4 text-xs sm:text-sm font-semibold tracking-tight">
        {(
          [
            { id: 'apps', label: 'Applications' },
            { id: 'websites', label: 'Sites web' },
            { id: 'games', label: 'Jeux' },
            { id: 'tools', label: 'Outils' },
          ] as const
        ).map((cat, idx) => {
          const isSelected = activeCategory === cat.id;
          return (
            <React.Fragment key={cat.id}>
              {idx > 0 && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#A3A09A]" aria-hidden="true" />
              )}
              <button
                type="button"
                onClick={() => onSelectCategory(cat.id)}
                className={`transition-all duration-200 py-1 px-1 sm:px-2 rounded ${
                  isSelected
                    ? 'text-[#1E1E24] font-bold underline decoration-2 decoration-[#FF6A00] underline-offset-4'
                    : 'text-[#6D6A67] hover:text-[#1E1E24]'
                }`}
              >
                <span>{cat.label}</span>
              </button>
            </React.Fragment>
          );
        })}
      </div>

      {/* Main Base44 styled Prompt Container */}
      <div className="relative rounded-2xl bg-white shadow-xl shadow-black/5 border border-[#E3DFD7] p-2 sm:p-3 transition-all focus-within:border-[#3950E6] focus-within:ring-2 focus-within:ring-[#3950E6]/10">
        <form onSubmit={handleSubmit} className="flex flex-col">
          {/* Text input area */}
          <div className="relative min-h-[90px] sm:min-h-[110px] p-2">
            <textarea
              ref={textareaRef}
              rows={3}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={ROTATING_PROMPT_PLACEHOLDERS[placeholderIndex]}
              className="w-full resize-none bg-transparent font-sans text-base sm:text-lg text-[#1E1E24] placeholder:text-[#8E8E8E] focus:outline-none leading-relaxed"
            />

            {/* Listening indicator */}
            {isListening && (
              <div className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-600 text-xs font-semibold animate-pulse border border-red-200">
                <span className="w-2 h-2 rounded-full bg-red-500" />
                <span>Écoute en cours...</span>
              </div>
            )}
          </div>

          {/* Action bar bottom */}
          <div className="flex items-center justify-between pt-2 border-t border-[#F2F0EC] px-1">
            {/* Plus menu */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsPlusOpen(!isPlusOpen)}
                className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-[#F3EFE9] text-[#1E1E24] transition"
                title="Ajouter du contexte ou des fichiers"
              >
                <Plus className="w-4 h-4" />
              </button>

              {isPlusOpen && (
                <div className="absolute bottom-full left-0 mb-2 w-56 rounded-xl bg-white border border-[#E5E2DC] shadow-xl p-1.5 z-40 text-xs font-medium text-[#2E2E32]">
                  <button
                    type="button"
                    onClick={() => {
                      setPrompt((p) => p + ' [Pièce jointe : Spécifications PDF intégrées]');
                      setIsPlusOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-[#F5F2ED] text-left"
                  >
                    <Paperclip className="w-4 h-4 text-gray-500" />
                    <span>Téléverser un document / spec</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setPrompt((p) => p + ' [Source: Analyser données e-commerce]');
                      setIsPlusOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-[#F5F2ED] text-left"
                  >
                    <Globe className="w-4 h-4 text-gray-500" />
                    <span>Capturer depuis une URL</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setPrompt((p) => p + ' avec schéma PostgreSQL et tables normalisées');
                      setIsPlusOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-[#F5F2ED] text-left"
                  >
                    <FileText className="w-4 h-4 text-gray-500" />
                    <span>Forcer schéma relationnel SQL</span>
                  </button>
                </div>
              )}
            </div>

            {/* Right actions: Mode selector, Mic, and Submit */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Mode switch dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsModeOpen(!isModeOpen)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-[#F3EFE9] text-xs sm:text-sm font-semibold text-[#1E1E24] transition"
                >
                  <span>{mode === 'build' ? 'Créer' : 'Planifier'}</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isModeOpen ? 'rotate-180' : ''}`} />
                </button>

                {isModeOpen && (
                  <div className="absolute bottom-full right-0 mb-2 w-64 rounded-xl bg-white border border-[#E5E2DC] shadow-xl p-1.5 z-40 text-left">
                    <button
                      type="button"
                      onClick={() => {
                        setMode('build');
                        setIsModeOpen(false);
                      }}
                      className="w-full flex items-start gap-2.5 p-2 rounded-lg hover:bg-[#F5F2ED]"
                    >
                      <div className="mt-0.5">
                        {mode === 'build' && <Check className="w-4 h-4 text-[#FF6A00]" />}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#1E1E24]">Mode Créer (Build)</div>
                        <div className="text-[11px] text-gray-500">Génère et lance l'application immédiatement</div>
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setMode('plan');
                        setIsModeOpen(false);
                      }}
                      className="w-full flex items-start gap-2.5 p-2 rounded-lg hover:bg-[#F5F2ED]"
                    >
                      <div className="mt-0.5">
                        {mode === 'plan' && <Check className="w-4 h-4 text-[#FF6A00]" />}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#1E1E24]">Mode Plan (Architecture)</div>
                        <div className="text-[11px] text-gray-500">Définit les entités & processus avant le déploiement</div>
                      </div>
                    </button>
                  </div>
                )}
              </div>

              {/* Mic button */}
              <button
                type="button"
                onClick={toggleMic}
                className={`w-9 h-9 flex items-center justify-center rounded-lg transition ${
                  isListening ? 'bg-red-50 text-red-600' : 'hover:bg-[#F3EFE9] text-[#6D6A67]'
                }`}
                title="Saisie vocale"
              >
                <Mic className="w-4 h-4" />
              </button>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isGenerating}
                className="w-10 h-10 rounded-xl bg-[#FF773C] hover:bg-[#FF6A00] active:scale-95 disabled:opacity-50 text-[#1E1E24] flex items-center justify-center shadow-md shadow-[#FF773C]/20 transition-all font-bold"
                title="Générer avec Base44"
              >
                {isGenerating ? (
                  <span className="w-4 h-4 border-2 border-[#1E1E24] border-t-transparent rounded-full animate-spin" />
                ) : (
                  <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
                )}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Suggested prompts chips */}
      <div className="mt-4">
        <div className="flex items-center gap-1.5 text-xs text-[#706D67] mb-2 font-medium">
          <Sparkles className="w-3.5 h-3.5 text-[#FF6A00]" />
          <span>Suggestions prêtes à l'emploi :</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {SUGGESTED_PROMPTS.slice(0, 4).map((preset, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                setPrompt(preset);
                if (textareaRef.current) {
                  textareaRef.current.focus();
                }
              }}
              className="text-xs text-left bg-white/70 hover:bg-white border border-[#E2DDD6] hover:border-[#FF6A00] px-3 py-1.5 rounded-full text-[#383734] transition truncate max-w-full sm:max-w-[360px]"
            >
              {preset}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
