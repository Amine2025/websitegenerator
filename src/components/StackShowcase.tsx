import React, { useState } from 'react';
import { Server, Database, Shield, Globe, Lock, Cpu, CheckCircle2, ArrowRight, Layers, Key, ExternalLink } from 'lucide-react';

export const StackShowcase: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  const STACK_FEATURES = [
    {
      title: 'Backend et stockage, intégrés',
      subtitle: 'Une architecture de production complète sans configuration manuelle',
      description: 'Chaque application bénéficie d\'une base de données PostgreSQL ou Document, de fonctions serveur serverless et de stockage fichier S3/CDN prêt à l\'emploi sans provisioning préalable.',
      icon: Database,
      badge: 'Zéro DevOps',
      specs: [
        'PostgreSQL managé avec Row-Level Security (RLS)',
        'Endpoints API REST et GraphQL auto-générés',
        'Sauvegardes automatiques quotidiennes et historique 30 jours',
        'Isolation multi-tenant sécurisée'
      ]
    },
    {
      title: 'Intégrations en un clic',
      subtitle: 'Connectez directement votre écosystème d\'outils existants',
      description: 'OAuth 2.0 natif pour Gmail, Google Agenda, Slack, Notion, Salesforce, HubSpot et Stripe. Aucun secret API n\'est exposé au navigateur.',
      icon: Layers,
      badge: '50+ Connecteurs',
      specs: [
        'Connecteurs pré-autorisés en 1 clic',
        'Gestion sécurisée des jetons OAuth sans fuite client',
        'Webhooks bidirectionnels temps réel',
        'Compatibilité Zapier & Make pour 6 000+ services'
      ]
    },
    {
      title: 'Sécurité de niveau entreprise',
      subtitle: 'Conformité SOC 2, ISO 27001 et respect strict du RGPD',
      description: 'Chiffrement de bout en bout (TLS 1.2+ en transit, AES-256 au repos), scanner de sécurité pré-publication intégré et options de résidence des données en Europe.',
      icon: Shield,
      badge: 'SOC 2 Type II',
      specs: [
        'Chiffrement AES-256 au repos et TLS 1.2+ en transit',
        'Authentification SSO (Okta, Google Workspace, Azure AD)',
        'Exclusion garantie des données d\'entraînement IA',
        'Audit logs complets et surveillance 24/7'
      ]
    },
    {
      title: 'Domaine personnalisé & SEO/GEO',
      subtitle: 'Votre propre URL et visibilité maximale sur les moteurs de recherche et IA',
      description: 'Raccordez vos domaines en .fr ou .com avec certificats SSL générés automatiquement. Dashboard SEO/GEO intégré pour être référencé sur Google, ChatGPT et Gemini.',
      icon: Globe,
      badge: 'HTTPS Automatique',
      specs: [
        'Certificats SSL Let\'s Encrypt auto-renouvelés',
        'Score SEO technique (sitemaps, robots.txt, balises OG)',
        'Optimisation GEO pour moteurs de réponse IA générative',
        'Réseau CDN mondial pour des temps de chargement < 80ms'
      ]
    }
  ];

  return (
    <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Hero Section */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1E1E24] text-white text-xs font-mono font-bold tracking-wider uppercase">
          <Server className="w-3.5 h-3.5 text-[#FF6A00]" />
          <span>Batteries Included • Architecture</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-[#1E1E24] tracking-tight leading-[1.05]">
          Toute la stack. <br />
          Sans ralentissement de configuration.
        </h2>
        <p className="text-base sm:text-lg text-[#555] leading-relaxed">
          Ship something real with vibe coding — sans toucher à un serveur, brancher un prestataire de paiement ou configurer une base de données. Tout est déjà en place dès votre premier prompt.
        </p>
      </div>

      {/* Interactive Feature Tabs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left selector menu (5 cols) */}
        <div className="lg:col-span-5 space-y-2">
          {STACK_FEATURES.map((item, index) => {
            const isSelected = activeFeature === index;
            const Icon = item.icon;
            return (
              <button
                key={index}
                onClick={() => setActiveFeature(index)}
                className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all duration-200 flex items-start gap-4 ${
                  isSelected
                    ? 'bg-white border-[#FF6A00] shadow-md ring-1 ring-[#FF6A00]/20'
                    : 'bg-white/60 hover:bg-white border-[#E2DDD5] text-gray-700'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition ${
                    isSelected ? 'bg-[#FF6A00] text-white' : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-[#1E1E24]">{item.title}</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                      {item.badge}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">{item.subtitle}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right detailed display card (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-[#D8D4CC] p-6 sm:p-8 lg:p-10 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <span className="text-xs font-bold text-[#FF6A00] uppercase tracking-wider bg-[#FF6A00]/10 px-3 py-1 rounded-full">
              {STACK_FEATURES[activeFeature].badge}
            </span>
            <span className="text-xs font-mono text-gray-400">Infrastructure Base44</span>
          </div>

          <div>
            <h3 className="text-2xl font-black text-[#1E1E24]">
              {STACK_FEATURES[activeFeature].title}
            </h3>
            <p className="text-sm font-semibold text-gray-600 mt-1">
              {STACK_FEATURES[activeFeature].subtitle}
            </p>
          </div>

          <p className="text-sm text-gray-700 leading-relaxed">
            {STACK_FEATURES[activeFeature].description}
          </p>

          <div className="space-y-3 pt-2">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500 block">
              Garanties & Spécifications :
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {STACK_FEATURES[activeFeature].specs.map((spec, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-gray-800 bg-[#F8F7F4] p-3 rounded-xl border border-[#EBE8E1]">
                  <CheckCircle2 className="w-4 h-4 text-[#FF6A00] shrink-0 mt-0.5" />
                  <span>{spec}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Social Proof & Metrics - Yoav Hornung Testimonial */}
      <div className="rounded-3xl bg-[#E2DED7] p-8 sm:p-12 space-y-8 border border-[#D5D0C6]">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold text-gray-600 block mb-2">
            — Yoav Hornung · Fondateur, Gift My Book (ex-Fiverr)
          </span>
          <blockquote className="text-2xl sm:text-3xl font-bold text-[#1E1E24] leading-snug">
            « Il a fallu environ une semaine pour créer un produit qui fonctionne de bout en bout. Ce qu'on aurait payé 50 000 € à externaliser, on l'a développé nous-mêmes sur Base44. »
          </blockquote>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-black/10">
          <div className="space-y-1">
            <span className="text-3xl sm:text-4xl font-black text-[#1E1E24] font-mono">1 semaine</span>
            <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider">pour lancer en production</p>
          </div>
          <div className="space-y-1">
            <span className="text-3xl sm:text-4xl font-black text-[#1E1E24] font-mono">1M $ ARR</span>
            <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider">générés en 3 mois</p>
          </div>
          <div className="space-y-1">
            <span className="text-3xl sm:text-4xl font-black text-[#1E1E24] font-mono">6 - 8 %</span>
            <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider">taux de conversion global</p>
          </div>
        </div>
      </div>
    </div>
  );
};
