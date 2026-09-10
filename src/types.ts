export type AppCategory = 'apps' | 'websites' | 'games' | 'tools';
export type BuildMode = 'build' | 'plan';

export interface DatabaseTable {
  name: string;
  description: string;
  columns: string[];
  records: Record<string, any>[];
}

export interface InteractiveItem {
  id: string;
  title: string;
  status: string;
  priority: string;
  category: string;
}

export interface MetricItem {
  label: string;
  value: string;
  change: string;
}

export interface AppBlueprint {
  id: string;
  name: string;
  tagline: string;
  category: AppCategory;
  accentColor: string;
  theme: 'light' | 'dark';
  summary: string;
  features: string[];
  database: {
    tables: DatabaseTable[];
  };
  routes: string[];
  integrations: string[];
  superagentFlow: {
    trigger: string;
    action: string;
    status: string;
  };
  interactiveState: {
    title: string;
    metrics: MetricItem[];
    items: InteractiveItem[];
  };
}

export interface SuperagentTask {
  id: string;
  title: string;
  quote: string;
  service: 'gmail' | 'calendar' | 'slack' | 'crm' | 'whatsapp';
  category: string;
  status: 'active' | 'idle' | 'running';
  recentExecution?: string;
  logs: { time: string; text: string; tag: string }[];
}

export interface TemplateApp {
  id: string;
  name: string;
  category: AppCategory;
  categoryLabel: string;
  tagline: string;
  description: string;
  badge: string;
  color: string;
  metrics: { value: string; label: string };
  blueprint: AppBlueprint;
}

export type ViewTab = 'studio' | 'sandbox' | 'superagents' | 'templates' | 'stack' | 'pricing';
