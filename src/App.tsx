import React, { useState } from 'react';
import { Header } from './components/Header';
import { PromptBox } from './components/PromptBox';
import { LiveAppSandbox } from './components/LiveAppSandbox';
import { SuperagentsHub } from './components/SuperagentsHub';
import { TemplatesGallery } from './components/TemplatesGallery';
import { StackShowcase } from './components/StackShowcase';
import { PricingSection } from './components/PricingSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { TEMPLATES } from './data/templates';
import { AppBlueprint, AppCategory, BuildMode, TemplateApp, ViewTab } from './types';
import { 
  Sparkles, Terminal, ArrowRight, Play, CheckCircle2, 
  Layers, Bot, Database, Shield, Zap, Globe, TrendingUp,
  Cpu, Rocket, Code
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ViewTab>('studio');
  const [activeCategory, setActiveCategory] = useState<AppCategory>('apps');
  const [activeApp, setActiveApp] = useState<AppBlueprint>(TEMPLATES[0].blueprint);
  const [hasActiveApp, setHasActiveApp] = useState(true);

  // Generation state
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationSteps, setGenerationSteps] = useState<string[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  // Handle generating from prompt
  const handleGenerateApp = async (prompt: string, category: AppCategory, mode: BuildMode) => {
    setIsGenerating(true);
    setGenerationSteps([
      'Analyse de l\'intention & spécification fonctionnelle...',
      'Modélisation des tables et schéma de base de données...',
      'Génération des composants d\'interface & logique métier...',
      'Configuration du flux autonome Superagent 24/7...',
      'Compilation et déploiement dans le sandbox...',
    ]);
    setCurrentStepIndex(0);

    const stepInterval = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev < 4) return prev + 1;
        return prev;
      });
    }, 900);

    try {
      const res = await fetch('/api/generate-app', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, category, mode }),
      });

      const data = await res.json();
      clearInterval(stepInterval);

      if (data.success && data.app) {
        setActiveApp(data.app);
        setHasActiveApp(true);
        setTimeout(() => {
          setIsGenerating(false);
          setActiveTab('sandbox');
        }, 800);
      } else {
        throw new Error('Génération échouée');
      }
    } catch (err) {
      clearInterval(stepInterval);
      // Fallback app setup
      const fallback = TEMPLATES.find((t) => t.category === category)?.blueprint || TEMPLATES[0].blueprint;
      const customized = {
        ...fallback,
        name: prompt.length > 25 ? prompt.slice(0, 24) + ' App' : prompt,
        summary: `Application générée en mode Vibe pour : "${prompt}"`,
      };
      setActiveApp(customized);
      setHasActiveApp(true);
      setTimeout(() => {
        setIsGenerating(false);
        setActiveTab('sandbox');
      }, 800);
    }
  };

  // Handle selecting from marketplace
  const handleSelectTemplate = (template: TemplateApp) => {
    setActiveApp(template.blueprint);
    setHasActiveApp(true);
    setActiveTab('sandbox');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F4F0] text-[#1E1E24] font-sans antialiased selection:bg-[#bababa] selection:text-[#1e1e24]">
      {/* Global Base44 Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        activeAppName={activeApp?.name}
        hasActiveApp={hasActiveApp}
      />

      {/* Main View Switcher */}
      <main className="flex-1">
        {/* 1. STUDIO VIEW */}
        {activeTab === 'studio' && (
          <div className="space-y-16 sm:space-y-24">
            {/* HERO SECTION with iconic Base44 typography & prompt box */}
            <section className="relative px-4 sm:px-6 lg:px-8 pt-12 sm:pt-20 pb-12 overflow-hidden text-center">
              <div className="max-w-4xl mx-auto space-y-6">
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-[#1E1E24] tracking-tight leading-[1.04]">
                  Chaque créateur a besoin d'une base
                </h1>
                <p className="text-base sm:text-xl text-[#3A3935] max-w-2xl mx-auto leading-relaxed font-normal">
                  Créez vos propres applications, sites web, produits et agents IA sur Base44 avec vos propres mots. Prenez une longueur d'avance — et gardez-la.
                </p>

                {/* Prompt Box */}
                <div className="pt-2">
                  <PromptBox
                    onGenerate={handleGenerateApp}
                    isGenerating={isGenerating}
                    activeCategory={activeCategory}
                    onSelectCategory={setActiveCategory}
                  />
                </div>

                {/* Generating Loading Card */}
                {isGenerating && (
                  <div className="max-w-lg mx-auto bg-white border border-[#E0DBD2] rounded-2xl p-6 shadow-2xl space-y-4 text-left animate-fadeIn">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-[#FF6A00] animate-ping" />
                        <span className="font-bold text-xs uppercase tracking-wider text-[#1E1E24]">
                          Moteur Vibe Coding en cours d'exécution
                        </span>
                      </div>
                      <span className="text-xs font-mono font-bold text-[#FF6A00]">
                        {Math.min(100, (currentStepIndex + 1) * 20)}%
                      </span>
                    </div>

                    <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-[#FF6A00] h-full transition-all duration-500"
                        style={{ width: `${(currentStepIndex + 1) * 20}%` }}
                      />
                    </div>

                    <div className="space-y-2 pt-1 font-mono text-xs">
                      {generationSteps.map((step, idx) => (
                        <div
                          key={idx}
                          className={`flex items-center gap-2 transition-all ${
                            idx <= currentStepIndex ? 'text-gray-900 font-semibold' : 'text-gray-300'
                          }`}
                        >
                          {idx < currentStepIndex ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                          ) : idx === currentStepIndex ? (
                            <span className="w-3 h-3 rounded-full border-2 border-[#FF6A00] border-t-transparent animate-spin shrink-0" />
                          ) : (
                            <span className="w-3 h-3 rounded-full bg-gray-200 shrink-0" />
                          )}
                          <span>{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* SECTION 2: "Que souhaitez-vous créer ?" - Base44 3 Pillars */}
            <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
              <div className="space-y-4 mb-8">
                <h2 className="text-3xl sm:text-5xl font-black text-[#1E1E24] tracking-tight">
                  Que souhaitez-vous créer ?
                </h2>
                <p className="text-base sm:text-lg text-gray-600 max-w-xl">
                  Quelle que soit votre idée, le vibe coding vous permet de la créer sur Base44.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* 1. Applications */}
                <div className="bg-[#FAF9F7] rounded-3xl p-8 border-b-[8px] border-[#FF6A00] border-t border-x border-[#E5E1D8] flex flex-col justify-between min-h-[380px] shadow-sm hover:shadow-xl transition-all duration-300 group">
                  <div className="space-y-3">
                    <h3 className="text-2xl sm:text-3xl font-black text-[#1E1E24] group-hover:text-[#FF6A00] transition">
                      Applications
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Transformez n'importe quelle idée en une application pleinement fonctionnelle — avec backend, authentification, paiements et hébergement déjà intégrés. Aucune configuration, aucun ingénieur, aucune attente.
                    </p>
                  </div>

                  <div className="pt-6">
                    <button
                      onClick={() => handleSelectTemplate(TEMPLATES[0])}
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#312F2F] hover:bg-black text-white text-xs font-bold shadow transition"
                    >
                      <span>Créer une application</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* 2. Sites web */}
                <div className="bg-[#FAF9F7] rounded-3xl p-8 border-b-[8px] border-[#FF6A00] border-t border-x border-[#E5E1D8] flex flex-col justify-between min-h-[380px] shadow-sm hover:shadow-xl transition-all duration-300 group">
                  <div className="space-y-3">
                    <h3 className="text-2xl sm:text-3xl font-black text-[#1E1E24] group-hover:text-[#FF6A00] transition">
                      Sites web
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Créez un site web pour tous vos besoins. Design généré par IA, domaine personnalisé, outils SEO intégrés — prêt à être mis en ligne dès le premier jour.
                    </p>
                  </div>

                  <div className="pt-6">
                    <button
                      onClick={() => handleSelectTemplate(TEMPLATES[1])}
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#312F2F] hover:bg-black text-white text-xs font-bold shadow transition"
                    >
                      <span>Créer un site web</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* 3. Agents IA */}
                <div className="bg-[#FAF9F7] rounded-3xl p-8 border-b-[8px] border-[#FF6A00] border-t border-x border-[#E5E1D8] flex flex-col justify-between min-h-[380px] shadow-sm hover:shadow-xl transition-all duration-300 group">
                  <div className="space-y-3">
                    <h3 className="text-2xl sm:text-3xl font-black text-[#1E1E24] group-hover:text-[#3950E6] transition">
                      Agents IA (Superagents)
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Créez un agent disponible 24h/24 qui se connecte à vos outils, agit concrètement et travaille pendant que vous dormez. Aucun casse-tête d'intégration.
                    </p>
                  </div>

                  <div className="pt-6">
                    <button
                      onClick={() => setActiveTab('superagents')}
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#3950E6] hover:bg-[#2B3FB8] text-white text-xs font-bold shadow transition"
                    >
                      <span>Découvrir les Superagents</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 3: "Beau sans effort. Unique par conception." */}
            <section className="w-full bg-[#EEECEB] py-16 sm:py-24 border-y border-[#E2DDD5]">
              <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left Blue Box */}
                <div className="lg:col-span-5 bg-[#3950E6] text-white p-8 sm:p-12 rounded-3xl space-y-6 shadow-xl">
                  <h2 className="text-4xl sm:text-5xl font-black tracking-tight leading-[1.02]">
                    Beau sans effort. <br />
                    Unique par conception.
                  </h2>
                  <p className="text-base sm:text-lg text-white/90 leading-relaxed font-normal">
                    Base44 démarre avec des designs déjà aboutis — et qui le restent, même quand vous les modifiez.
                  </p>
                  <div className="pt-4 flex flex-wrap gap-2 text-xs font-semibold text-white/80">
                    <span className="px-3 py-1 bg-white/10 rounded-full">Responsive Mobile & Desktop</span>
                    <span className="px-3 py-1 bg-white/10 rounded-full">Typographie soignée</span>
                    <span className="px-3 py-1 bg-white/10 rounded-full">Micro-interactions</span>
                  </div>
                </div>

                {/* Right Feature List */}
                <div className="lg:col-span-7 space-y-6 pl-0 lg:pl-6">
                  {[
                    {
                      title: 'Collaborez en toute fluidité',
                      desc: 'Visualisez chaque page d\'un coup d\'œil. Laissez des notes, esquissez des idées et envoyez vos instructions directement à l\'IA — le tout sur un seul tableau.',
                    },
                    {
                      title: 'Générez des interfaces interactives de haute qualité',
                      desc: 'Formulaires, tableaux de données, calendriers et graphiques générés instantanément avec des données réalistes prêtes à être testées.',
                    },
                    {
                      title: 'Obtenez des recommandations de refonte',
                      desc: 'Demandez des options de design, choisissez celle que vous voulez. L\'IA affiche des aperçus avant de toucher à quoi que ce soit.',
                    },
                    {
                      title: 'Maîtrisez le design global',
                      desc: 'Définissez les couleurs et les polices de toute votre application depuis un seul endroit. Toute votre application — mise à jour partout en une seule fois.',
                    },
                  ].map((feat, i) => (
                    <div key={i} className="space-y-1.5 pb-4 border-b border-gray-300/80 last:border-b-0">
                      <h3 className="text-xl font-bold text-[#1E1E24]">{feat.title}</h3>
                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed max-w-xl">{feat.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Quick Live Preview Banner of active app */}
            {hasActiveApp && (
              <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="rounded-3xl bg-white border border-[#DDD8D0] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-emerald-600 text-xs font-bold uppercase tracking-wider">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span>Application prête dans la Sandbox</span>
                    </div>
                    <h3 className="text-2xl font-bold text-[#1E1E24]">{activeApp.name}</h3>
                    <p className="text-xs sm:text-sm text-gray-500 max-w-xl">
                      {activeApp.summary}
                    </p>
                  </div>

                  <button
                    onClick={() => setActiveTab('sandbox')}
                    className="whitespace-nowrap px-6 py-3 rounded-xl bg-[#FF6A00] hover:bg-[#FF773C] text-white font-bold text-sm shadow transition flex items-center gap-2"
                  >
                    <span>Lancer la Sandbox interactive</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </section>
            )}

            {/* SECTION 4: Marketing tools to grow */}
            <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
              <div className="space-y-4 mb-8">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500 block">
                  Des outils marketing intégrés pour développer votre activité après le lancement
                </span>
                <h2 className="text-3xl sm:text-5xl font-black text-[#1E1E24] tracking-tight">
                  Base44 ne s'arrête pas quand vous publiez votre création.
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2DDD5] shadow-sm flex flex-col justify-between min-h-[260px]">
                  <div>
                    <h3 className="text-xl font-bold text-[#1E1E24]">Tableau de bord SEO/GEO</h3>
                    <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                      Soyez visible là où les gens cherchent vraiment — Google, ChatGPT, Gemini et plus. Lancez un scan, obtenez vos correctifs classés par priorité, et laissez l'IA faire le reste.
                    </p>
                  </div>
                  <div className="pt-4 text-xs font-bold text-[#FF6A00] flex items-center gap-1">
                    <span>Audit automatique</span> →
                  </div>
                </div>

                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2DDD5] shadow-sm flex flex-col justify-between min-h-[260px]">
                  <div>
                    <h3 className="text-xl font-bold text-[#1E1E24]">Présence sur les réseaux sociaux</h3>
                    <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                      Base44 analyse ce que vous créez, choisit les bons réseaux sociaux et génère du contenu prêt à publier – dans votre voix.
                    </p>
                  </div>
                  <div className="pt-4 text-xs font-bold text-[#FF6A00] flex items-center gap-1">
                    <span>Génération multicanal</span> →
                  </div>
                </div>

                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2DDD5] shadow-sm flex flex-col justify-between min-h-[260px]">
                  <div>
                    <h3 className="text-xl font-bold text-[#1E1E24]">Analytique de l'application</h3>
                    <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                      Suivez le trafic et les ventes, personnalisez votre tableau de bord et mesurez les actions les plus importantes dans votre application Base44.
                    </p>
                  </div>
                  <div className="pt-4 text-xs font-bold text-[#FF6A00] flex items-center gap-1">
                    <span>Métriques en direct</span> →
                  </div>
                </div>
              </div>
            </section>

            {/* Frequently Asked Questions */}
            <FaqSection />
          </div>
        )}

        {/* 2. LIVE SANDBOX VIEW */}
        {activeTab === 'sandbox' && (
          <LiveAppSandbox
            blueprint={activeApp}
            onUpdateBlueprint={(updated) => setActiveApp(updated)}
            onBackToStudio={() => setActiveTab('studio')}
          />
        )}

        {/* 3. SUPERAGENTS HUB VIEW */}
        {activeTab === 'superagents' && <SuperagentsHub />}

        {/* 4. TEMPLATES MARKETPLACE VIEW */}
        {activeTab === 'templates' && (
          <TemplatesGallery onSelectTemplate={handleSelectTemplate} />
        )}

        {/* 5. STACK SHOWCASE VIEW */}
        {activeTab === 'stack' && <StackShowcase />}

        {/* 6. PRICING VIEW */}
        {activeTab === 'pricing' && <PricingSection />}
      </main>

      {/* Global Base44 Footer */}
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}
