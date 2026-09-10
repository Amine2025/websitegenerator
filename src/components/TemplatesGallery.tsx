import React, { useState } from 'react';
import { TEMPLATES } from '../data/templates';
import { AppCategory, TemplateApp } from '../types';
import { Sparkles, ArrowRight, Play, CheckCircle, Search, ExternalLink, Code } from 'lucide-react';

interface TemplatesGalleryProps {
  onSelectTemplate: (tpl: TemplateApp) => void;
}

export const TemplatesGallery: React.FC<TemplatesGalleryProps> = ({ onSelectTemplate }) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | AppCategory>('all');
  const [search, setSearch] = useState('');

  const filtered = TEMPLATES.filter((tpl) => {
    const matchesCat = selectedCategory === 'all' || tpl.category === selectedCategory;
    const matchesSearch =
      tpl.name.toLowerCase().includes(search.toLowerCase()) ||
      tpl.description.toLowerCase().includes(search.toLowerCase()) ||
      tpl.tagline.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E2DDD5] pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF6A00]/10 text-[#FF6A00] text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Marketplace Base44</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#1E1E24] tracking-tight">
            Modèles d'applications prêts à l'emploi
          </h2>
          <p className="text-sm sm:text-base text-[#666] mt-1 max-w-2xl">
            Explorez des applications pratiques, interactives et entièrement modélisées par la communauté. Personnalisez-les en un clic.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher un modèle..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 bg-white text-xs sm:text-sm focus:outline-none focus:border-[#FF6A00] shadow-sm"
          />
        </div>
      </div>

      {/* Categories Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 text-xs font-semibold">
        {(
          [
            { id: 'all', label: 'Tous les modèles' },
            { id: 'apps', label: 'Applications SaaS' },
            { id: 'websites', label: 'Sites web & Portails' },
            { id: 'games', label: 'Jeux 2D interactifs' },
            { id: 'tools', label: 'Outils internes' },
          ] as const
        ).map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedCategory(tab.id)}
            className={`px-4 py-2 rounded-xl transition whitespace-nowrap ${
              selectedCategory === tab.id
                ? 'bg-[#1E1E24] text-white shadow-sm'
                : 'bg-white border border-[#E0DBD2] text-[#444] hover:bg-gray-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((tpl) => (
          <div
            key={tpl.id}
            className="bg-white rounded-2xl border border-[#E2DDD5] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
          >
            {/* Card Header & Preview Accent */}
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-[#FAF9F7] text-gray-700 border border-gray-200">
                  {tpl.categoryLabel}
                </span>
                <span
                  className="text-xs font-bold px-2.5 py-1 rounded-md text-white"
                  style={{ backgroundColor: tpl.color }}
                >
                  {tpl.badge}
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-[#1E1E24] group-hover:text-[#FF6A00] transition">
                  {tpl.name}
                </h3>
                <p className="text-xs font-medium text-gray-500 mt-0.5">{tpl.tagline}</p>
              </div>

              <p className="text-xs text-gray-600 leading-relaxed">{tpl.description}</p>

              {/* Blueprint features preview */}
              <div className="pt-2 border-t border-gray-100 space-y-1.5">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">Inclus :</span>
                {tpl.blueprint.features.slice(0, 2).map((feat, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-xs text-gray-700">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span className="truncate">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-6 pt-0">
              <div className="p-3 rounded-xl bg-[#FAF9F7] border border-gray-200 flex items-center justify-between mb-4">
                <span className="text-xs text-gray-500">{tpl.metrics.label}</span>
                <strong className="text-xs font-mono font-bold text-[#1E1E24]">{tpl.metrics.value}</strong>
              </div>

              <button
                onClick={() => onSelectTemplate(tpl)}
                className="w-full py-2.5 px-4 rounded-xl bg-[#1E1E24] hover:bg-[#FF6A00] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition"
              >
                <span>Ouvrir dans la Sandbox</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
