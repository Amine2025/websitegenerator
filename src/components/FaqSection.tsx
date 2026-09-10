import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const FAQS = [
    {
      q: "Qu'est-ce que Base44 ?",
      a: "Base44 est une plateforme d'IA sans code pour créer des applications, des sites web et des agents IA, sans aucune programmation. Décrivez ce que vous voulez, et Base44 génère pour vous la structure, le design, le code et la logique. La plateforme gère toute la partie technique pour que vous puissiez vous concentrer sur votre idée."
    },
    {
      q: "Comment fonctionne le vibe coding sur Base44 ?",
      a: "Le vibe coding consiste à décrire en langage naturel ce que vous souhaitez accomplir, le style recherché et les fonctionnalités attendues. Notre moteur IA interprète votre intention, modélise le schéma de données, écrit le code React/TypeScript et provisionne les routes d'API automatiquement."
    },
    {
      q: "Faut-il savoir coder pour créer une application ?",
      a: "Non. Décrivez simplement ce dont vous avez besoin en français ou en anglais, et Base44 s'occupe de l'ensemble de la pile technique (UI, base de données, authentification et fonctions d'automatisation)."
    },
    {
      q: "Qu'est-ce qu'un Superagent et comment fonctionne-t-il ?",
      a: "Un Superagent est un agent IA autonome qui agit en votre nom 24h/24. Il se connecte à vos applications Base44 et à vos outils du quotidien (Gmail, Agenda, Slack, Notion, Stripe) pour traiter des formulaires, relancer des prospects, surveiller des métriques et réagir aux événements sans intervention humaine."
    },
    {
      q: "Suis-je propriétaire de l'application et puis-je exporter le code ?",
      a: "Oui, totalement. Tout ce que vous concevez sur Base44 vous appartient. Vous pouvez à tout moment inspecter le code source, l'exporter vers votre dépôt GitHub ou télécharger une archive complète."
    },
    {
      q: "Comment les applications sont-elles déployées ?",
      a: "Base44 intègre un hébergement cloud natif : dès que votre application est générée, elle est immédiatement en ligne, dotée d'une URL sécurisée HTTPS et prête à être partagée avec vos utilisateurs ou collaborateurs."
    }
  ];

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="text-center max-w-xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-black text-[#1E1E24] tracking-tight">
          Questions fréquentes
        </h2>
        <p className="text-sm text-gray-600 mt-2">
          Tout ce que vous devez savoir pour démarrer le vibe coding en toute sérénité.
        </p>
      </div>

      <div className="divide-y divide-[#E2DDD5] border-y border-[#E2DDD5]">
        {FAQS.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={index} className="py-4 sm:py-5">
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full flex items-center justify-between text-left gap-4 group"
              >
                <span className="text-base sm:text-lg font-bold text-[#1E1E24] group-hover:text-[#FF6A00] transition">
                  {faq.q}
                </span>
                <div
                  className={`w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center shrink-0 text-gray-500 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 bg-[#1E1E24] text-white border-[#1E1E24]' : 'bg-white'
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {isOpen && (
                <div className="pt-3 text-sm sm:text-base text-gray-700 leading-relaxed max-w-3xl animate-fadeIn">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
