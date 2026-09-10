import React from 'react';
import { ViewTab } from '../types';
import { Sparkles, ArrowUpRight, Github, Twitter, Linkedin } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: ViewTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  return (
    <footer className="w-full bg-[#1E1E24] text-white pt-16 pb-12 border-t border-gray-800">
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Col 1: Brand & Bio */}
          <div className="md:col-span-2 space-y-4 max-w-md">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#FF6A00]" />
              <span className="font-extrabold tracking-tight text-xl text-white">Base44 Vibe Studio</span>
            </div>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
              Base44 est la plateforme de vibe coding propulsée par l'IA qui permet de concevoir, générer et exécuter des applications complètes en quelques minutes. Décrivez vos besoins, et l'IA produit le frontend, le backend, la base de données et les Superagents.
            </p>
            <div className="flex items-center gap-4 text-gray-400 pt-2">
              <span className="text-xs font-mono">Infrastructure Cloud sécurisée • SOC 2 & RGPD</span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-3 text-xs sm:text-sm">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs">Produit</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <button onClick={() => setActiveTab('studio')} className="hover:text-white transition">
                  Créateur Studio (Vibe Coding)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('sandbox')} className="hover:text-white transition">
                  Sandbox & Exécuteur d'apps
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('templates')} className="hover:text-white transition">
                  Modèles & Galerie d'apps
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('superagents')} className="hover:text-white transition text-[#3950E6] font-semibold">
                  Superagents 24/7
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('stack')} className="hover:text-white transition">
                  Architecture & Base de données
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('pricing')} className="hover:text-white transition">
                  Tarifs & Forfaits
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Legal & Community */}
          <div className="space-y-3 text-xs sm:text-sm">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs">Conformité & Légal</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <span className="hover:text-white cursor-pointer transition">Politique de confidentialité</span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer transition">Conditions d'utilisation</span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer transition">Sécurité & Certifications SOC 2</span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer transition">Déclaration d'accessibilité</span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer transition">Documentation technique</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div>
            © 2026 Base44 / Wix.com Ltd. Tous droits réservés. Vibe Coding Platform.
          </div>
          <div className="flex items-center gap-6">
            <span>Propulsé par Google Gemini & Antigravity</span>
            <span>Hébergé en Europe (FR/EU)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
