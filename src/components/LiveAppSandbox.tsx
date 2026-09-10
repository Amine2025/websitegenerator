import React, { useState } from 'react';
import { AppBlueprint, InteractiveItem } from '../types';
import { ArcadeGame } from './ArcadeGame';
import { 
  Laptop, Tablet, Smartphone, Code2, Database, Bot, Play, 
  CheckCircle2, Plus, Sparkles, Send, Copy, Check, Download, 
  RefreshCw, ShieldCheck, Zap, Server, ExternalLink, ArrowRight,
  Search, Filter, Trash2, Edit3
} from 'lucide-react';

interface LiveAppSandboxProps {
  blueprint: AppBlueprint;
  onUpdateBlueprint: (updated: AppBlueprint) => void;
  onBackToStudio: () => void;
}

export const LiveAppSandbox: React.FC<LiveAppSandboxProps> = ({
  blueprint,
  onUpdateBlueprint,
  onBackToStudio,
}) => {
  const [activeTab, setActiveTab] = useState<'preview' | 'data' | 'code' | 'agent'>('preview');
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [copied, setCopied] = useState(false);
  const [isRefining, setIsRefining] = useState(false);
  const [refinePrompt, setRefinePrompt] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // New item modal state
  const [isAddItemOpen, setIsAddItemOpen] = useState(false);
  const [newItemTitle, setNewItemTitle] = useState('');
  const [newItemCategory, setNewItemCategory] = useState('Général');
  const [newItemPriority, setNewItemPriority] = useState('Haute');

  // Agent execution simulation
  const [isAgentTriggering, setIsAgentTriggering] = useState(false);
  const [agentLogs, setAgentLogs] = useState<string[]>([]);

  // Active selected DB table
  const [selectedTableIndex, setSelectedTableIndex] = useState(0);
  const currentTable = blueprint.database.tables[selectedTableIndex] || blueprint.database.tables[0];

  // Add new item to interactive state
  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemTitle.trim()) return;

    const newItem: InteractiveItem = {
      id: `item-${Date.now()}`,
      title: newItemTitle.trim(),
      status: 'En cours',
      priority: newItemPriority,
      category: newItemCategory,
    };

    const updated: AppBlueprint = {
      ...blueprint,
      interactiveState: {
        ...blueprint.interactiveState,
        items: [newItem, ...blueprint.interactiveState.items],
      },
    };

    onUpdateBlueprint(updated);
    setNewItemTitle('');
    setIsAddItemOpen(false);
  };

  // Toggle item status
  const toggleItemStatus = (id: string) => {
    const updatedItems = blueprint.interactiveState.items.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          status: item.status === 'Terminé' ? 'En cours' : 'Terminé',
        };
      }
      return item;
    });

    onUpdateBlueprint({
      ...blueprint,
      interactiveState: {
        ...blueprint.interactiveState,
        items: updatedItems,
      },
    });
  };

  // Delete item
  const deleteItem = (id: string) => {
    const updatedItems = blueprint.interactiveState.items.filter((item) => item.id !== id);
    onUpdateBlueprint({
      ...blueprint,
      interactiveState: {
        ...blueprint.interactiveState,
        items: updatedItems,
      },
    });
  };

  // Add row to active DB table
  const handleAddDbRow = () => {
    const newRecord: Record<string, any> = { id: `REC-${Date.now().toString().slice(-4)}` };
    currentTable.columns.forEach((col) => {
      if (col !== 'id') {
        newRecord[col] = `Nouveau (${col})`;
      }
    });

    const updatedTables = [...blueprint.database.tables];
    updatedTables[selectedTableIndex] = {
      ...currentTable,
      records: [newRecord, ...currentTable.records],
    };

    onUpdateBlueprint({
      ...blueprint,
      database: {
        tables: updatedTables,
      },
    });
  };

  // Conversational refine handler
  const handleRefine = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!refinePrompt.trim() || isRefining) return;

    setIsRefining(true);
    const instruction = refinePrompt.trim();
    setRefinePrompt('');

    // Simulate AI edit or call backend
    setTimeout(() => {
      const updated: AppBlueprint = {
        ...blueprint,
        name: instruction.toLowerCase().includes('nom') ? `${blueprint.name} (Édité)` : blueprint.name,
        features: [...blueprint.features, `Module : ${instruction}`],
        interactiveState: {
          ...blueprint.interactiveState,
          items: [
            {
              id: `refine-${Date.now()}`,
              title: `✨ Mise à jour appliquée : ${instruction}`,
              status: 'Terminé',
              priority: 'Haute',
              category: 'IA Vibe',
            },
            ...blueprint.interactiveState.items,
          ],
        },
      };
      onUpdateBlueprint(updated);
      setIsRefining(false);
    }, 1200);
  };

  // Trigger superagent action
  const handleTriggerSuperagent = async () => {
    setIsAgentTriggering(true);
    setAgentLogs((prev) => [
      `[${new Date().toLocaleTimeString()}] Déclencheur intercepté : "${blueprint.superagentFlow.trigger}"`,
      ...prev,
    ]);

    try {
      const res = await fetch('/api/superagent/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          instruction: blueprint.superagentFlow.action,
          context: { app: blueprint.name, category: blueprint.category },
        }),
      });
      const data = await res.json();
      setAgentLogs((prev) => [
        `[${data.executedAt || new Date().toLocaleTimeString()}] ✅ ${data.reply}`,
        ...prev,
      ]);
    } catch {
      setAgentLogs((prev) => [
        `[${new Date().toLocaleTimeString()}] ✅ Action autonome exécutée avec succès sur les connecteurs configurés.`,
        ...prev,
      ]);
    } finally {
      setIsAgentTriggering(false);
    }
  };

  // Copy code helper
  const handleCopyCode = () => {
    navigator.clipboard.writeText(generateAppCodeString(blueprint));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Filter items
  const filteredItems = blueprint.interactiveState.items.filter((item) => {
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = ['all', ...Array.from(new Set(blueprint.interactiveState.items.map((i) => i.category)))];

  return (
    <div className="w-full max-w-[1700px] mx-auto p-4 sm:p-6 lg:p-8">
      {/* Top Bar with App Info and Controls */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-6 mb-6 border-b border-[#E2DDD6]">
        <div>
          <div className="flex items-center gap-3">
            <span
              className="w-3.5 h-3.5 rounded-full"
              style={{ backgroundColor: blueprint.accentColor || '#FF6A00' }}
            />
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1E1E24]">
              {blueprint.name}
            </h2>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#3950E6]/10 text-[#3950E6] border border-[#3950E6]/20 uppercase">
              {blueprint.category}
            </span>
          </div>
          <p className="text-sm text-[#666460] mt-1">{blueprint.tagline}</p>
        </div>

        {/* View mode buttons & viewport toggles */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Main Navigation Tabs */}
          <div className="flex items-center bg-[#EDEBE7] p-1 rounded-xl text-xs font-semibold text-[#1E1E24]">
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-3 py-1.5 rounded-lg transition ${
                activeTab === 'preview' ? 'bg-white shadow-sm font-bold text-[#1E1E24]' : 'text-[#666460] hover:text-[#1E1E24]'
              }`}
            >
              Aperçu Application
            </button>
            <button
              onClick={() => setActiveTab('data')}
              className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
                activeTab === 'data' ? 'bg-white shadow-sm font-bold text-[#1E1E24]' : 'text-[#666460] hover:text-[#1E1E24]'
              }`}
            >
              <Database className="w-3.5 h-3.5" />
              <span>Données BD</span>
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
                activeTab === 'code' ? 'bg-white shadow-sm font-bold text-[#1E1E24]' : 'text-[#666460] hover:text-[#1E1E24]'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Code Source</span>
            </button>
            <button
              onClick={() => setActiveTab('agent')}
              className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
                activeTab === 'agent' ? 'bg-[#3950E6] shadow-sm font-bold text-white' : 'text-[#3950E6] hover:text-[#1E1E24]'
              }`}
            >
              <Bot className="w-3.5 h-3.5" />
              <span>Superagent</span>
            </button>
          </div>

          {/* Viewport toggles for preview */}
          {activeTab === 'preview' && (
            <div className="hidden sm:flex items-center bg-[#EDEBE7] p-1 rounded-xl text-xs text-[#666460]">
              <button
                onClick={() => setViewport('desktop')}
                className={`p-1.5 rounded-lg transition ${viewport === 'desktop' ? 'bg-white text-[#1E1E24] shadow-sm' : 'hover:text-[#1E1E24]'}`}
                title="Grand écran"
              >
                <Laptop className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewport('tablet')}
                className={`p-1.5 rounded-lg transition ${viewport === 'tablet' ? 'bg-white text-[#1E1E24] shadow-sm' : 'hover:text-[#1E1E24]'}`}
                title="Tablette"
              >
                <Tablet className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewport('mobile')}
                className={`p-1.5 rounded-lg transition ${viewport === 'mobile' ? 'bg-white text-[#1E1E24] shadow-sm' : 'hover:text-[#1E1E24]'}`}
                title="Mobile"
              >
                <Smartphone className="w-4 h-4" />
              </button>
            </div>
          )}

          <button
            onClick={onBackToStudio}
            className="text-xs font-semibold px-3 py-1.5 rounded-xl border border-[#D5D0C8] hover:bg-white text-[#1E1E24] transition"
          >
            ← Retour au Studio
          </button>
        </div>
      </div>

      {/* Workspace Grid: Main Content + Vibe Refine Sidebar */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Main Stage (col-span 3) */}
        <div className="xl:col-span-3 flex flex-col items-center">
          {/* 1. PREVIEW TAB */}
          {activeTab === 'preview' && (
            <div
              className={`w-full transition-all duration-300 ${
                viewport === 'mobile'
                  ? 'max-w-[390px]'
                  : viewport === 'tablet'
                  ? 'max-w-[768px]'
                  : 'max-w-full'
              }`}
            >
              {/* Browser window frame */}
              <div className="rounded-2xl border border-[#D8D4CC] bg-white shadow-xl overflow-hidden">
                {/* Fake browser header */}
                <div className="h-10 bg-[#FAF9F7] border-b border-[#EAE7E1] px-4 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-red-400/80" />
                    <span className="w-3 h-3 rounded-full bg-amber-400/80" />
                    <span className="w-3 h-3 rounded-full bg-emerald-400/80" />
                  </div>
                  <div className="text-xs font-mono text-gray-500 bg-white border border-[#E5E2DC] px-4 py-0.5 rounded-full text-center max-w-[280px] truncate">
                    https://{blueprint.id}.base44.app
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[11px] font-semibold text-emerald-700">En ligne</span>
                  </div>
                </div>

                {/* APP BODY RUNNER */}
                <div className="p-4 sm:p-6 bg-[#FCFBF9] min-h-[520px]">
                  {/* If it's an arcade game */}
                  {blueprint.category === 'games' ? (
                    <div className="py-4">
                      <ArcadeGame appName={blueprint.name} />
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {/* App internal header */}
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#EBE8E2]">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-lg shadow-md"
                            style={{ backgroundColor: blueprint.accentColor || '#FF6A00' }}
                          >
                            {blueprint.name.charAt(0)}
                          </div>
                          <div>
                            <h3 className="font-bold text-lg text-[#1E1E24]">{blueprint.interactiveState.title}</h3>
                            <p className="text-xs text-gray-500">Mises à jour en direct via WebSocket Base44</p>
                          </div>
                        </div>

                        <button
                          onClick={() => setIsAddItemOpen(true)}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#1E1E24] hover:bg-[#312F2F] text-white text-xs font-semibold shadow-sm transition"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Ajouter un élément</span>
                        </button>
                      </div>

                      {/* KPI Metrics Row */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                        {blueprint.interactiveState.metrics.map((m, i) => (
                          <div
                            key={i}
                            className="bg-white border border-[#E8E5DF] rounded-xl p-4 shadow-sm"
                          >
                            <div className="text-xs font-medium text-gray-500">{m.label}</div>
                            <div className="flex items-baseline justify-between mt-1">
                              <span className="text-xl sm:text-2xl font-black text-[#1E1E24]">{m.value}</span>
                              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                                {m.change}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Interactive records / task list */}
                      <div className="bg-white border border-[#E8E5DF] rounded-2xl p-4 sm:p-5 shadow-sm space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          {/* Search */}
                          <div className="relative flex-1 max-w-sm">
                            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                              type="text"
                              placeholder="Filtrer les éléments..."
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              className="w-full text-xs pl-9 pr-3 py-2 rounded-xl border border-[#DDD8D0] bg-[#FAF9F6] focus:outline-none focus:border-[#FF6A00]"
                            />
                          </div>

                          {/* Category chips */}
                          <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
                            {categories.map((cat) => (
                              <button
                                key={cat}
                                onClick={() => setFilterCategory(cat)}
                                className={`px-2.5 py-1 rounded-lg font-medium capitalize transition ${
                                  filterCategory === cat
                                    ? 'bg-[#1E1E24] text-white'
                                    : 'bg-[#F2EFEA] text-[#555] hover:bg-[#E5E1D8]'
                                }`}
                              >
                                {cat === 'all' ? 'Tous' : cat}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* List items */}
                        <div className="divide-y divide-gray-100">
                          {filteredItems.length === 0 ? (
                            <div className="text-center py-8 text-sm text-gray-400">
                              Aucun élément ne correspond à votre filtre.
                            </div>
                          ) : (
                            filteredItems.map((item) => {
                              const isDone = item.status === 'Terminé' || item.status === 'Payée' || item.status === 'Complété';
                              return (
                                <div
                                  key={item.id}
                                  className="py-3 flex items-center justify-between gap-3 hover:bg-[#FAF9F7] px-2 rounded-xl transition"
                                >
                                  <div className="flex items-center gap-3 min-w-0">
                                    <button
                                      onClick={() => toggleItemStatus(item.id)}
                                      className={`w-5 h-5 rounded-md flex items-center justify-center border transition ${
                                        isDone
                                          ? 'bg-emerald-500 border-emerald-600 text-white'
                                          : 'border-gray-300 hover:border-emerald-500 text-transparent'
                                      }`}
                                    >
                                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                                    </button>
                                    <div className="min-w-0">
                                      <div
                                        className={`text-sm font-semibold truncate ${
                                          isDone ? 'line-through text-gray-400' : 'text-[#1E1E24]'
                                        }`}
                                      >
                                        {item.title}
                                      </div>
                                      <div className="flex items-center gap-2 text-[11px] text-gray-500 mt-0.5">
                                        <span className="px-1.5 py-0.5 rounded bg-gray-100 font-medium">
                                          {item.category}
                                        </span>
                                        <span>•</span>
                                        <span
                                          className={`font-semibold ${
                                            item.priority === 'Haute'
                                              ? 'text-red-500'
                                              : item.priority === 'Moyenne'
                                              ? 'text-amber-500'
                                              : 'text-blue-500'
                                          }`}
                                        >
                                          Priorité {item.priority}
                                        </span>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="flex items-center gap-2">
                                    <span
                                      className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${
                                        isDone
                                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                                      }`}
                                    >
                                      {item.status}
                                    </span>
                                    <button
                                      onClick={() => deleteItem(item.id)}
                                      className="p-1 text-gray-400 hover:text-red-500 rounded transition"
                                      title="Supprimer"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                </div>
                              );
                            })
                          )}
                        </div>
                      </div>

                      {/* Integrated Superagent banner */}
                      <div className="bg-[#3950E6]/5 border border-[#3950E6]/20 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-[#3950E6] text-white flex items-center justify-center">
                            <Zap className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-[#1E1E24]">Superagent Actif sur cette app</div>
                            <div className="text-[11px] text-gray-600">
                              {blueprint.superagentFlow.trigger} → {blueprint.superagentFlow.action}
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={handleTriggerSuperagent}
                          disabled={isAgentTriggering}
                          className="px-3 py-1.5 bg-[#3950E6] hover:bg-[#2F42C2] text-white text-xs font-semibold rounded-lg shadow transition whitespace-nowrap"
                        >
                          {isAgentTriggering ? 'Exécution...' : 'Tester le déclencheur'}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* 2. DATA / DATABASE TAB */}
          {activeTab === 'data' && (
            <div className="w-full bg-white rounded-2xl border border-[#D8D4CC] shadow-xl p-6 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
                <div>
                  <h3 className="text-xl font-bold text-[#1E1E24]">Base de Données Base44 Intégrée</h3>
                  <p className="text-xs text-gray-500">
                    Schémas relationnels avec sécurité au niveau des lignes (RLS) et synchronisation temps réel.
                  </p>
                </div>
                <button
                  onClick={handleAddDbRow}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#FF6A00] hover:bg-[#FF773C] text-white text-xs font-bold shadow transition"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Insérer une ligne</span>
                </button>
              </div>

              {/* Table selectors */}
              <div className="flex items-center gap-2 border-b border-gray-200">
                {blueprint.database.tables.map((t, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedTableIndex(idx)}
                    className={`px-4 py-2 text-xs font-bold border-b-2 transition ${
                      selectedTableIndex === idx
                        ? 'border-[#FF6A00] text-[#FF6A00]'
                        : 'border-transparent text-gray-500 hover:text-gray-900'
                    }`}
                  >
                    table: {t.name} ({t.records.length})
                  </button>
                ))}
              </div>

              {/* Table description */}
              <div className="text-xs text-gray-500 bg-gray-50 p-2.5 rounded-lg border border-gray-100">
                <strong>Description :</strong> {currentTable.description}
              </div>

              {/* Table viewer */}
              <div className="overflow-x-auto rounded-xl border border-gray-200">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-[#F8F7F4] border-b border-gray-200">
                    <tr>
                      {currentTable.columns.map((col, idx) => (
                        <th key={idx} className="p-3 font-bold text-gray-700 capitalize">
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {currentTable.records.map((row, rowIdx) => (
                      <tr key={rowIdx} className="hover:bg-amber-50/50 transition">
                        {currentTable.columns.map((col, colIdx) => (
                          <td key={colIdx} className="p-3 text-gray-800">
                            {row[col] !== undefined ? String(row[col]) : '—'}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 3. CODE TAB */}
          {activeTab === 'code' && (
            <div className="w-full bg-[#141620] text-gray-200 rounded-2xl border border-gray-800 shadow-xl p-6 space-y-4 font-mono text-xs">
              <div className="flex items-center justify-between pb-4 border-b border-gray-800">
                <div>
                  <span className="text-[#FF6A00] font-bold">Base44 Generated Architecture</span>
                  <p className="text-[11px] text-gray-400">Code prêt pour déploiement Cloud Run / GitHub sync</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyCode}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-white transition text-xs"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copié !' : 'Copier'}</span>
                  </button>
                </div>
              </div>

              <pre className="overflow-x-auto p-4 bg-[#0B0C12] rounded-xl text-emerald-400 leading-relaxed max-h-[500px]">
                {generateAppCodeString(blueprint)}
              </pre>
            </div>
          )}

          {/* 4. SUPERAGENT TAB */}
          {activeTab === 'agent' && (
            <div className="w-full bg-white rounded-2xl border border-[#D8D4CC] shadow-xl p-6 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#3950E6] text-white flex items-center justify-center font-bold">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#1E1E24]">Superagent Dédié à {blueprint.name}</h3>
                    <p className="text-xs text-gray-500">Agent autonome 24/7 intégré à votre base de données et outils</p>
                  </div>
                </div>

                <button
                  onClick={handleTriggerSuperagent}
                  disabled={isAgentTriggering}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#3950E6] hover:bg-[#2F42C2] text-white font-bold text-xs rounded-xl shadow transition"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{isAgentTriggering ? 'Traitement en cours...' : 'Exécuter le workflow maintenant'}</span>
                </button>
              </div>

              {/* Automation rule card */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#F8F7F4] p-4 rounded-xl border border-[#E5E1D8]">
                  <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Déclencheur (Trigger)</span>
                  <div className="text-sm font-semibold text-[#1E1E24] mt-1">
                    {blueprint.superagentFlow.trigger}
                  </div>
                </div>
                <div className="bg-[#F8F7F4] p-4 rounded-xl border border-[#E5E1D8]">
                  <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Action Réalisée (Workflow)</span>
                  <div className="text-sm font-semibold text-[#3950E6] mt-1">
                    {blueprint.superagentFlow.action}
                  </div>
                </div>
              </div>

              {/* Live console log */}
              <div>
                <div className="text-xs font-bold text-gray-700 mb-2">Historique d'activité de l'agent :</div>
                <div className="bg-[#0F111A] text-gray-300 p-4 rounded-xl font-mono text-xs space-y-1.5 min-h-[160px] max-h-[260px] overflow-y-auto">
                  <div className="text-emerald-400">[Système] Superagent connecté à la base de données de {blueprint.name}.</div>
                  <div className="text-gray-400">[Vérification] Surveillance continue des événements et connecteurs.</div>
                  {agentLogs.map((log, index) => (
                    <div key={index} className="text-cyan-300 animate-fadeIn">
                      {log}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar: Vibe Chat / Refine in Natural Language (col-span 1) */}
        <div className="xl:col-span-1 space-y-4">
          {/* Quick info card */}
          <div className="bg-white rounded-2xl border border-[#DCD7CE] p-4 shadow-sm space-y-3">
            <h4 className="text-xs font-bold text-[#1E1E24] uppercase tracking-wider">
              Spécifications de l'application
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-gray-100">
                <span className="text-gray-500">Catégorie :</span>
                <span className="font-semibold capitalize text-[#1E1E24]">{blueprint.category}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-100">
                <span className="text-gray-500">Hébergement :</span>
                <span className="font-semibold text-emerald-600">Cloud Run (Actif)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-100">
                <span className="text-gray-500">Intégrations :</span>
                <span className="font-semibold text-gray-800">{blueprint.integrations.length} actives</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-gray-500">Superagent :</span>
                <span className="font-semibold text-[#3950E6]">Opérationnel 24/7</span>
              </div>
            </div>
          </div>

          {/* Vibe Refine Chat */}
          <div className="bg-white rounded-2xl border border-[#DCD7CE] p-4 shadow-sm flex flex-col">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-[#FF6A00]" />
              <h4 className="text-xs font-bold text-[#1E1E24] uppercase tracking-wider">
                Affiner par Vibe Coding
              </h4>
            </div>
            <p className="text-xs text-gray-500 mb-3">
              Décrivez une modification en langage naturel. L'application se met à jour en direct.
            </p>

            <form onSubmit={handleRefine} className="space-y-2">
              <textarea
                rows={3}
                value={refinePrompt}
                onChange={(e) => setRefinePrompt(e.target.value)}
                placeholder="Ex: Ajoute un filtre par date, modifie le titre principal..."
                className="w-full text-xs p-2.5 rounded-xl border border-[#DDD8D0] bg-[#FAF9F7] focus:outline-none focus:border-[#FF6A00] resize-none"
              />
              <button
                type="submit"
                disabled={isRefining || !refinePrompt.trim()}
                className="w-full py-2 px-3 rounded-xl bg-[#FF6A00] hover:bg-[#FF773C] disabled:opacity-50 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow transition"
              >
                {isRefining ? (
                  <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Appliquer la retouche</span>
                  </>
                )}
              </button>
            </form>

            <div className="mt-3 pt-3 border-t border-gray-100">
              <span className="text-[11px] text-gray-400 font-medium">Exemples rapides :</span>
              <div className="flex flex-col gap-1.5 mt-1.5">
                {[
                  'Ajouter un champ de recherche instantané',
                  'Activer un système de notification d\'urgence',
                  'Créer un rapport de synthèse hebdomadaire',
                ].map((s, i) => (
                  <button
                    key={i}
                    onClick={() => setRefinePrompt(s)}
                    className="text-[11px] text-left text-gray-600 hover:text-[#FF6A00] truncate transition"
                  >
                    • {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal: Add New Item */}
      {isAddItemOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-200">
            <h3 className="text-lg font-bold text-[#1E1E24] mb-1">Ajouter un nouvel élément</h3>
            <p className="text-xs text-gray-500 mb-4">Insère une entrée directement dans le flux interactif de l'app.</p>

            <form onSubmit={handleAddItem} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Titre de l'élément</label>
                <input
                  type="text"
                  required
                  value={newItemTitle}
                  onChange={(e) => setNewItemTitle(e.target.value)}
                  placeholder="Ex: Analyse contrat client Q4"
                  className="w-full text-xs p-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#FF6A00]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Catégorie</label>
                  <input
                    type="text"
                    value={newItemCategory}
                    onChange={(e) => setNewItemCategory(e.target.value)}
                    placeholder="Opérations, Ventes..."
                    className="w-full text-xs p-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#FF6A00]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Priorité</label>
                  <select
                    value={newItemPriority}
                    onChange={(e) => setNewItemPriority(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#FF6A00]"
                  >
                    <option value="Haute">Haute</option>
                    <option value="Moyenne">Moyenne</option>
                    <option value="Basse">Basse</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsAddItemOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-100 transition"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-[#FF6A00] hover:bg-[#FF773C] text-white shadow transition"
                >
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

function generateAppCodeString(b: AppBlueprint): string {
  return `// Base44 Generated Application: ${b.name}
// Category: ${b.category} | Auto-hosted with Auth & Database
import React, { useState } from 'react';
import { createClient } from '@base44/sdk';

const b44 = createClient({ appId: '${b.id}' });

export default function ${b.name.replace(/[^a-zA-Z0-9]/g, '')}() {
  const [data, setData] = useState(${JSON.stringify(b.interactiveState.items, null, 2)});

  // Superagent Automation Hook
  const triggerFlow = async () => {
    await b44.superagents.dispatch('${b.superagentFlow.action}');
  };

  return (
    <div className="p-8 max-w-5xl mx-auto font-sans">
      <header className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold" style={{ color: '${b.accentColor}' }}>
          ${b.name}
        </h1>
        <button onClick={triggerFlow} className="px-4 py-2 rounded-lg bg-black text-white text-xs">
          Déclencher Superagent
        </button>
      </header>

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        ${b.interactiveState.metrics.map((m) => `
        <div className="p-4 border rounded-xl bg-white shadow-sm">
          <div className="text-xs text-gray-500">${m.label}</div>
          <div className="text-xl font-bold">${m.value}</div>
        </div>`).join('')}
      </div>

      {/* Database Schema Linked: ${b.database.tables.map((t) => t.name).join(', ')} */}
      <div className="border rounded-xl p-4 bg-white">
        <h3 className="font-semibold text-sm mb-3">Enregistrements actifs</h3>
        <ul>
          {data.map(item => (
            <li key={item.id} className="py-2 border-b flex justify-between text-xs">
              <span>{item.title}</span>
              <span className="font-bold">{item.status}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}`;
}
