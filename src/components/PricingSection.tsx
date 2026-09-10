import React, { useState } from 'react';
import { Check, Sparkles, HelpCircle, Shield, ArrowRight } from 'lucide-react';

export const PricingSection: React.FC = () => {
  const [isAnnual, setIsAnnual] = useState(true);

  const PLANS = [
    {
      id: 'free',
      name: 'Gratuit (Free)',
      desc: 'Accédez gratuitement à toutes les fonctionnalités essentielles de Base44 et testez vos premières idées.',
      price: 0,
      highlight: false,
      badge: 'Pour démarrer',
      features: [
        'Toutes les fonctionnalités essentielles de Base44',
        'Jusqu\'à 5 applications complètes',
        'Base de données intégrée & authentification',
        'Tableau de bord d\'analytique de base',
        'Hébergement web gratuit inclus'
      ],
      cta: 'Commencer gratuitement',
    },
    {
      id: 'starter',
      name: 'Starter',
      desc: 'Pour vos applications et projets personnels, avec domaine personnalisé.',
      price: isAnnual ? 16 : 20,
      highlight: false,
      badge: 'Individuel',
      features: [
        'Nombre illimité d\'applications',
        'Modifications de code dans l\'application',
        'Connecter votre propre nom de domaine (.fr, .com)',
        'Support standard par email',
        '25 crédits de messages d\'IA mensuels'
      ],
      cta: 'Choisir Starter',
    },
    {
      id: 'builder',
      name: 'Builder',
      desc: 'Passez à la vitesse supérieure avec des outils adaptés à vos besoins professionnels.',
      price: isAnnual ? 32 : 40,
      highlight: true,
      badge: 'Le plus populaire',
      features: [
        'Tout ce qui est dans Starter',
        'Fonctions backend serverless personnalisées',
        'Sélection du modèle d\'IA (Gemini 3.8 Flash & Pro)',
        'Domaine personnalisé offert pendant 1 an',
        'Synchronisation bidirectionnelle GitHub',
        'Accès aux Superagents 24/7'
      ],
      cta: 'Choisir Builder',
    },
    {
      id: 'pro',
      name: 'Pro',
      desc: 'Accédez à des outils avancés et à un accompagnement pour développer des applications complexes.',
      price: isAnnual ? 64 : 80,
      highlight: false,
      badge: 'Équipes & Scale',
      features: [
        'Tout ce qui est dans Builder',
        'Crédits de messages et d\'intégrations étendus',
        'Accès anticipé aux fonctionnalités bêta',
        'Support client prioritaire',
        'Historique des versions étendu à 30 jours'
      ],
      cta: 'Choisir Pro',
    }
  ];

  return (
    <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <h2 className="text-3xl sm:text-5xl font-black text-[#1E1E24] tracking-tight">
          Choisissez votre forfait
        </h2>
        <p className="text-sm sm:text-base text-[#666]">
          Conçu pour là où vous êtes, et là où vous allez. Commencez gratuitement, évoluez quand vous êtes prêt.
        </p>

        {/* Annual / Monthly switch */}
        <div className="inline-flex items-center p-1.5 rounded-full bg-[#E5E2DC] border border-[#DDD8D0] mt-4">
          <button
            type="button"
            onClick={() => setIsAnnual(false)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition ${
              !isAnnual ? 'bg-white text-[#1E1E24] shadow-sm' : 'text-gray-600 hover:text-black'
            }`}
          >
            Mensuel
          </button>
          <button
            type="button"
            onClick={() => setIsAnnual(true)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition flex items-center gap-1.5 ${
              isAnnual ? 'bg-[#1E1E24] text-white shadow-sm' : 'text-gray-600 hover:text-black'
            }`}
          >
            <span>Annuel</span>
            <span className="bg-[#FF6A00] text-black text-[10px] px-1.5 py-0.5 rounded-full font-black">
              -20%
            </span>
          </button>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
        {PLANS.map((plan) => (
          <div
            key={plan.id}
            className={`rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 relative ${
              plan.highlight
                ? 'bg-[#FF6A00] text-[#1E1E24] shadow-xl ring-2 ring-[#FF6A00] scale-[1.02]'
                : 'bg-white text-[#1E1E24] border border-[#DDD8D0] shadow-sm hover:shadow-lg'
            }`}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-lg">{plan.name}</h3>
                <span
                  className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                    plan.highlight
                      ? 'bg-black text-white'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {plan.badge}
                </span>
              </div>

              <div className="flex items-baseline gap-1">
                <span className="text-4xl sm:text-5xl font-black font-mono tracking-tight">
                  {plan.price} €
                </span>
                <span className="text-xs font-semibold opacity-75">
                  / mois
                </span>
              </div>
              {isAnnual && plan.price > 0 && (
                <div className="text-[11px] opacity-80 font-medium">Facturation annuelle</div>
              )}

              <p className="text-xs leading-relaxed opacity-90 pb-3 border-b border-black/10">
                {plan.desc}
              </p>

              {/* Feature list */}
              <div className="space-y-2.5 pt-2">
                <span className="text-[11px] font-bold uppercase tracking-wider opacity-70 block">
                  Inclus dans ce forfait :
                </span>
                {plan.features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs leading-snug">
                    <Check
                      className={`w-4 h-4 shrink-0 mt-0.5 ${
                        plan.highlight ? 'text-black' : 'text-[#FF6A00]'
                      }`}
                    />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              className={`w-full mt-6 py-2.5 px-4 rounded-xl text-xs font-bold shadow transition text-center ${
                plan.highlight
                  ? 'bg-[#1E1E24] hover:bg-black text-white'
                  : 'bg-[#1E1E24] hover:bg-[#333] text-white'
              }`}
            >
              {plan.cta}
            </button>
          </div>
        ))}
      </div>

      {/* Enterprise callout */}
      <div className="rounded-2xl border border-gray-300 bg-white p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
        <div className="space-y-2 text-left">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-[#3950E6]" />
            <h4 className="font-bold text-lg text-[#1E1E24]">Vous cherchez des solutions Entreprise ?</h4>
          </div>
          <p className="text-xs sm:text-sm text-gray-600 max-w-2xl">
            Crédits sur mesure, architecte de solutions dédié, SSO (SAML / Okta), isolation de base de données, SLA garanti et revue de conformité IT.
          </p>
        </div>

        <button className="whitespace-nowrap px-6 py-3 rounded-xl bg-[#3950E6] hover:bg-[#2B3FB8] text-white font-bold text-xs sm:text-sm shadow transition flex items-center gap-2">
          <span>Contacter l'équipe commerciale</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
