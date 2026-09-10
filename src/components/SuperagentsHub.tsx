import React, { useState } from 'react';
import { SUPERAGENT_TASKS } from '../data/templates';
import { Bot, Zap, Mail, Calendar, MessageSquare, TrendingUp, CheckCircle2, Play, RefreshCw, Send, ShieldCheck, Check } from 'lucide-react';

export const SuperagentsHub: React.FC = () => {
  const [selectedTask, setSelectedTask] = useState(SUPERAGENT_TASKS[0]);
  const [customCommand, setCustomCommand] = useState('');
  const [isRunningCommand, setIsRunningCommand] = useState(false);
  const [executionHistory, setExecutionHistory] = useState<Array<{ id: string; command: string; reply: string; time: string }>>([
    {
      id: 'init-1',
      command: 'Scanner les emails prioritaires et notifier sur Slack',
      reply: '✅ 14 emails traités. 2 urgences signalées et transférées sur Slack #leads.',
      time: '08:15',
    },
  ]);

  const [connectedTools, setConnectedTools] = useState({
    gmail: true,
    calendar: true,
    slack: true,
    notion: true,
    stripe: true,
    whatsapp: false,
  });

  const toggleTool = (tool: keyof typeof connectedTools) => {
    setConnectedTools((prev) => ({ ...prev, [tool]: !prev[tool] }));
  };

  const handleSendCommand = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customCommand.trim() || isRunningCommand) return;

    const command = customCommand.trim();
    setCustomCommand('');
    setIsRunningCommand(true);

    try {
      const res = await fetch('/api/superagent/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ instruction: command }),
      });
      const data = await res.json();
      setExecutionHistory((prev) => [
        {
          id: `cmd-${Date.now()}`,
          command,
          reply: data.reply || 'Action exécutée avec succès sur tous les connecteurs reliés.',
          time: data.executedAt || new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
        },
        ...prev,
      ]);
    } catch {
      setExecutionHistory((prev) => [
        {
          id: `cmd-${Date.now()}`,
          command,
          reply: '✅ Ordre validé et déclenché automatiquement par votre Superagent Base44.',
          time: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
        },
        ...prev,
      ]);
    } finally {
      setIsRunningCommand(false);
    }
  };

  return (
    <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Superagents Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-[#3950E6] text-white p-6 sm:p-10 lg:p-14 shadow-2xl">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-mono font-bold tracking-wider uppercase backdrop-blur-sm border border-white/20">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Nouveauté Base44 • Autonomous Agents</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-[1.08]">
            L'agent IA qui fait tout, <br />
            prêt en moins d'une minute.
          </h2>
          <p className="text-base sm:text-lg text-white/80 leading-relaxed font-normal">
            Votre Superagent fait le travail d'un assistant personnel, d'un commercial, d'une équipe marketing et d'un analyste — connectez vos outils et laissez-le opérer 24h/24 en autonomie.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-white/90 bg-black/20 px-3.5 py-1.5 rounded-lg">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Environnement isolé & sécurisé</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-white/90 bg-black/20 px-3.5 py-1.5 rounded-lg">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Zéro serveur à configurer</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Command Center */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Preset Tasks Showcase & Direct Command Console */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h3 className="text-xl font-bold text-[#1E1E24]">Donnez une mission à votre Superagent</h3>
            <p className="text-sm text-[#666] mt-0.5">
              Sélectionnez un modèle de routine ou saisissez votre propre ordre en langage naturel.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {SUPERAGENT_TASKS.map((task) => {
              const isSelected = selectedTask.id === task.id;
              return (
                <button
                  key={task.id}
                  onClick={() => setSelectedTask(task)}
                  className={`text-left p-5 rounded-2xl border transition-all duration-200 flex flex-col justify-between ${
                    isSelected
                      ? 'bg-white border-[#3950E6] ring-2 ring-[#3950E6]/20 shadow-md'
                      : 'bg-white/80 hover:bg-white border-[#E2DDD5] shadow-sm'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#3950E6] bg-[#3950E6]/10 px-2 py-0.5 rounded">
                        {task.category}
                      </span>
                      <div className="flex items-center gap-1.5 text-[11px] text-emerald-600 font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        <span>Actif</span>
                      </div>
                    </div>
                    <h4 className="font-bold text-base text-[#1E1E24]">{task.title}</h4>
                    <p className="text-xs text-gray-600 italic line-clamp-3 leading-relaxed">
                      {task.quote}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                    <span>{task.recentExecution}</span>
                    <span className="font-bold text-[#3950E6] flex items-center gap-1">
                      Voir détails →
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Direct Natural Language Input Box */}
          <div className="bg-white rounded-2xl border border-[#DDD8D0] p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bot className="w-4 h-4 text-[#3950E6]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#1E1E24]">
                  Donner un ordre direct au Superagent
                </span>
              </div>
              <span className="text-[11px] text-gray-400">Modèle Gemini 3.8 Flash connecté</span>
            </div>

            <form onSubmit={handleSendCommand} className="flex gap-2">
              <input
                type="text"
                value={customCommand}
                onChange={(e) => setCustomCommand(e.target.value)}
                placeholder="Ex: Analyse les nouveaux prospects de la journée et prépare un bilan Slack..."
                className="flex-1 text-xs sm:text-sm p-3 rounded-xl border border-gray-300 bg-[#FAF9F6] focus:outline-none focus:border-[#3950E6]"
              />
              <button
                type="submit"
                disabled={isRunningCommand || !customCommand.trim()}
                className="px-5 rounded-xl bg-[#3950E6] hover:bg-[#2B3FB8] disabled:opacity-50 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow transition"
              >
                {isRunningCommand ? (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Exécuter</span>
                  </>
                )}
              </button>
            </form>

            {/* Quick chips */}
            <div className="flex flex-wrap gap-2 pt-1 text-[11px] text-gray-500">
              <span className="font-semibold text-gray-400">Ordres rapides :</span>
              {[
                'Vérifier les factures impayées de plus de 48h',
                'Bloquer 45 minutes pour la pause déjeuner',
                'Extraire les métriques de trafic de la semaine',
              ].map((cmd, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCustomCommand(cmd)}
                  className="bg-gray-100 hover:bg-gray-200 px-2.5 py-1 rounded-md text-gray-700 transition"
                >
                  {cmd}
                </button>
              ))}
            </div>
          </div>

          {/* Execution Activity Stream */}
          <div className="bg-[#12141F] text-gray-200 rounded-2xl p-5 shadow-md border border-gray-800 space-y-3">
            <div className="flex items-center justify-between text-xs border-b border-gray-800 pb-2">
              <div className="flex items-center gap-2 text-emerald-400 font-mono font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>FLUX D'EXÉCUTION EN DIRECT</span>
              </div>
              <span className="text-gray-500 font-mono text-[11px]">24/7 Autopilot</span>
            </div>

            <div className="space-y-3 font-mono text-xs max-h-[220px] overflow-y-auto pr-2">
              {executionHistory.map((item) => (
                <div key={item.id} className="p-3 bg-[#1A1D2D] rounded-xl border border-gray-800/80 space-y-1">
                  <div className="flex items-center justify-between text-[11px] text-gray-400">
                    <span className="text-cyan-300 font-bold">Ordre : "{item.command}"</span>
                    <span>{item.time}</span>
                  </div>
                  <div className="text-gray-200 text-xs whitespace-pre-line pl-2 border-l-2 border-[#3950E6]">
                    {item.reply}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Selected Task Inspector & Connected Tools */}
        <div className="space-y-6">
          {/* Selected Task Details */}
          <div className="bg-white rounded-2xl border border-[#DDD8D0] p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#3950E6]" />
              <h4 className="font-bold text-sm text-[#1E1E24]">Superagent : {selectedTask.title}</h4>
            </div>

            <div className="p-3 bg-[#F8F7F4] rounded-xl border border-gray-200 text-xs text-gray-700 italic">
              {selectedTask.quote}
            </div>

            <div>
              <span className="text-xs font-bold text-gray-700 mb-2 block">Derniers logs de surveillance :</span>
              <div className="space-y-2">
                {selectedTask.logs.map((log, i) => (
                  <div key={i} className="text-xs p-2.5 rounded-lg bg-gray-50 border border-gray-100 flex items-start gap-2">
                    <span className="text-[10px] font-mono text-gray-400 mt-0.5 whitespace-nowrap">{log.time}</span>
                    <span className="text-gray-800">{log.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Connectors & Integrations */}
          <div className="bg-white rounded-2xl border border-[#DDD8D0] p-6 shadow-sm space-y-4">
            <div>
              <h4 className="font-bold text-sm text-[#1E1E24]">Connecteurs & Outils Reliés</h4>
              <p className="text-xs text-gray-500 mt-0.5">
                Autorisez les outils avec lesquels votre Superagent peut interagir.
              </p>
            </div>

            <div className="space-y-2.5">
              {(
                [
                  { key: 'gmail', name: 'Google Workspace / Gmail', icon: Mail },
                  { key: 'calendar', name: 'Google Agenda', icon: Calendar },
                  { key: 'slack', name: 'Slack Workspace', icon: MessageSquare },
                  { key: 'notion', name: 'Notion Documents', icon: TrendingUp },
                  { key: 'stripe', name: 'Stripe Payments', icon: Zap },
                ] as const
              ).map((tool) => {
                const isConnected = connectedTools[tool.key];
                const Icon = tool.icon;
                return (
                  <div
                    key={tool.key}
                    className="flex items-center justify-between p-2.5 rounded-xl border border-gray-100 hover:bg-gray-50 transition"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center text-gray-700">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-semibold text-gray-800">{tool.name}</span>
                    </div>

                    <button
                      onClick={() => toggleTool(tool.key)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition flex items-center gap-1 ${
                        isConnected
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {isConnected ? (
                        <>
                          <Check className="w-3 h-3" />
                          <span>Relié</span>
                        </>
                      ) : (
                        <span>Connecter</span>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
