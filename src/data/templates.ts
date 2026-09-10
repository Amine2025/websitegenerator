import { TemplateApp } from '../types';

export const TEMPLATES: TemplateApp[] = [
  {
    id: 'accupro',
    name: 'AccuPro Finance',
    category: 'apps',
    categoryLabel: 'Applications',
    tagline: 'SaaS de comptabilité & prévisions de trésorerie',
    description: 'Gestion multi-sociétés, facturation automatique, balances en direct et prévisions de cash-flow basées sur l\'IA.',
    badge: 'Populaire',
    color: '#FF6A00',
    metrics: { value: '1 sem.', label: 'pour lancer en production' },
    blueprint: {
      id: 'accupro',
      name: 'AccuPro Finance',
      tagline: 'Comptabilité en temps réel et prédiction de trésorerie',
      category: 'apps',
      accentColor: '#FF6A00',
      theme: 'light',
      summary: 'Plateforme financière complète connectée à Stripe & banques européennes.',
      features: [
        'Grand livre comptable automatisé et lettrage bancaire',
        'Prédiction de flux de trésorerie à 90 jours par IA',
        'Facturation conforme TVA et portail client sécurisé',
        'Export comptable FEC et intégration expert-comptable'
      ],
      database: {
        tables: [
          {
            name: 'Factures',
            description: 'Registre des factures émises et reçues',
            columns: ['id', 'client', 'montant', 'echeance', 'statut'],
            records: [
              { id: 'FAC-2026-001', client: 'Acme Technologies', montant: '4 850 €', echeance: '15/09/2026', statut: 'Payée' },
              { id: 'FAC-2026-002', client: 'Studio Lumina', montant: '1 200 €', echeance: '20/09/2026', statut: 'En attente' },
              { id: 'FAC-2026-003', client: 'Boulangerie Artisanale', montant: '890 €', echeance: '10/09/2026', statut: 'Payée' },
              { id: 'FAC-2026-004', client: 'Nexus Conseil', montant: '3 400 €', echeance: '30/09/2026', statut: 'Relance envoyée' }
            ]
          },
          {
            name: 'Transactions_Bancaires',
            description: 'Flux de synchronisation bancaire Open Banking',
            columns: ['id', 'libelle', 'compte', 'montant', 'categorie'],
            records: [
              { id: 'TRX-941', libelle: 'Virement Stripe Payout', compte: 'Compte Pro BNP', montant: '+8 420 €', categorie: 'Revenu' },
              { id: 'TRX-942', libelle: 'Abonnement AWS Cloud', compte: 'Compte Pro BNP', montant: '-340 €', categorie: 'Infrastructure' },
              { id: 'TRX-943', libelle: 'Honoraires Graphiste', compte: 'Compte Pro BNP', montant: '-750 €', categorie: 'Prestation' }
            ]
          }
        ]
      },
      routes: ['/tresorerie', '/factures', '/banque', '/rapports'],
      integrations: ['Stripe', 'BNP OpenBanking', 'Slack', 'Resend'],
      superagentFlow: {
        trigger: 'Facture impayée depuis plus de 3 jours après échéance',
        action: 'Génération automatique d\'un mail cordial avec lien de paiement Stripe direct',
        status: 'Actif 24/7'
      },
      interactiveState: {
        title: 'Tableau de Bord Trésorerie & Facturation',
        metrics: [
          { label: 'Trésorerie disponible', value: '48 720 €', change: '+12.4%' },
          { label: 'Factures en attente', value: '4 600 €', change: '-240 €' },
          { label: 'Runway estimé', value: '14 mois', change: '+2 mois' }
        ],
        items: [
          { id: 'acc-1', title: 'Rapprochement bancaire du mois d\'août', status: 'Terminé', priority: 'Haute', category: 'Clôture' },
          { id: 'acc-2', title: 'Relance automatique Studio Lumina (1 200 €)', status: 'En cours', priority: 'Haute', category: 'Recouvrement' },
          { id: 'acc-3', title: 'Calcul de la provision TVA T3', status: 'Prêt', priority: 'Moyenne', category: 'Fiscalité' },
          { id: 'acc-4', title: 'Intégration du compte Stripe européen', status: 'Actif', priority: 'Basse', category: 'Banque' }
        ]
      }
    }
  },
  {
    id: 'fitstudio',
    name: 'FitTrack Studio',
    category: 'websites',
    categoryLabel: 'Sites web',
    tagline: 'Site de studio fitness avec réservations en direct',
    description: 'Planning interactif des cours, gestion des instructeurs, formulaires d\'adhésion et paiements en un clic.',
    badge: 'Vibe Design',
    color: '#3950E6',
    metrics: { value: '98%', label: 'de conversion mobile' },
    blueprint: {
      id: 'fitstudio',
      name: 'FitTrack Studio & Wellness',
      tagline: 'Espace bien-être, réservation de cours et gestion des adhérents',
      category: 'websites',
      accentColor: '#3950E6',
      theme: 'light',
      summary: 'Site vitrine et portail client pour salle de sport ou studio yoga.',
      features: [
        'Planning interactif des créneaux hebdomadaires',
        'Réservation et liste d\'attente automatisée',
        'Paiement d\'abonnements mensuels et carnets de cours',
        'Fiches profils des coachs avec avis vérifiés'
      ],
      database: {
        tables: [
          {
            name: 'Cours_Planning',
            description: 'Séances disponibles pour les adhérents',
            columns: ['id', 'cours', 'coach', 'horaire', 'places_restantes'],
            records: [
              { id: 'CRS-01', cours: 'Vinyasa Flow Yoga', coach: 'Camille R.', horaire: 'Mar 18:30', places_restantes: '3 / 16' },
              { id: 'CRS-02', cours: 'Cross Training Intensif', coach: 'Marc L.', horaire: 'Mer 12:15', places_restantes: 'Complet' },
              { id: 'CRS-03', cours: 'Pilates Core & Posture', coach: 'Sarah D.', horaire: 'Jeu 19:00', places_restantes: '7 / 14' },
              { id: 'CRS-04', cours: 'Spinning & Cardio Beats', coach: 'Théo M.', horaire: 'Ven 18:00', places_restantes: '5 / 20' }
            ]
          },
          {
            name: 'Adherents',
            description: 'Membres actifs du club',
            columns: ['id', 'nom', 'formule', 'statut', 'derniere_seance'],
            records: [
              { id: 'MBR-101', nom: 'Élodie Bernard', formule: 'Illimité Annuel', statut: 'Actif', derniere_seance: 'Aujourd\'hui' },
              { id: 'MBR-102', nom: 'Julien Perrot', formule: 'Pass 10 cours', statut: 'Actif', derniere_seance: 'Il y a 2 jours' }
            ]
          }
        ]
      },
      routes: ['/planning', '/abonnements', '/coachs', '/contact'],
      integrations: ['Stripe', 'Google Calendar', 'WhatsApp', 'Mailchimp'],
      superagentFlow: {
        trigger: 'Désistement d\'un adhérent sur un cours complet',
        action: 'Notification push immédiate au 1er sur liste d\'attente avec confirmation auto',
        status: 'Actif 24/7'
      },
      interactiveState: {
        title: 'Planning & Présences en Salle',
        metrics: [
          { label: 'Réservations du jour', value: '84', change: '+18%' },
          { label: 'Taux de remplissage', value: '91.2%', change: '+6.5%' },
          { label: 'Nouveaux inscrits semaine', value: '19', change: '+4' }
        ],
        items: [
          { id: 'fit-1', title: 'Séance Vinyasa Yoga 18h30 - Salle Zen', status: 'Confirmé', priority: 'Haute', category: 'Cours' },
          { id: 'fit-2', title: 'Validation certificat médical Julien P.', status: 'En attente', priority: 'Moyenne', category: 'Admin' },
          { id: 'fit-3', title: 'Atelier Nutrition & Récupération Samedi', status: 'Ouvert', priority: 'Basse', category: 'Événement' }
        ]
      }
    }
  },
  {
    id: 'retroarcade',
    name: 'Neon Horizon Arcade 2D',
    category: 'games',
    categoryLabel: 'Jeux',
    tagline: 'Mini-jeu rétro cyberpunk avec collectibles & leaderboard',
    description: 'Contrôlez un vaisseau néon dans un espace procédural, collectez des orbes d\'énergie et grimpez dans le classement.',
    badge: 'Interactif',
    color: '#10B981',
    metrics: { value: '60 FPS', label: 'moteur fluide en canvas' },
    blueprint: {
      id: 'retroarcade',
      name: 'Neon Horizon Arcade',
      tagline: 'Mini-jeu rétro cyberpunk jouable dans le navigateur',
      category: 'games',
      accentColor: '#10B981',
      theme: 'dark',
      summary: 'Moteur de jeu 2D réactif avec classement multijoueur en temps réel.',
      features: [
        'Contrôle clavier (Flèches / ZQSD) et tactile réactif',
        'Génération procédurale d\'obstacles et particules néon',
        'Classement live avec sauvegarde des meilleurs scores',
        'Système de combo et multiplicateurs d\'XP'
      ],
      database: {
        tables: [
          {
            name: 'Classement_Global',
            description: 'Top scores des joueurs',
            columns: ['rang', 'pseudo', 'score', 'vague', 'date'],
            records: [
              { rang: 1, pseudo: 'CyberViper', score: '24 850 pts', vague: 'Vague 14', date: 'Aujourd\'hui' },
              { rang: 2, pseudo: 'NeoCoder', score: '19 400 pts', vague: 'Vague 11', date: 'Hier' },
              { rang: 3, pseudo: 'PixelQueen', score: '16 200 pts', vague: 'Vague 9', date: 'Il y a 2 jours' },
              { rang: 4, pseudo: 'VibeBuilder', score: '12 950 pts', vague: 'Vague 7', date: 'Il y a 3 jours' }
            ]
          }
        ]
      },
      routes: ['/jouer', '/classement', '/succes', '/parametres'],
      integrations: ['Discord Webhooks', 'Cloud Sync', 'Audio Synth Engine'],
      superagentFlow: {
        trigger: 'Nouveau record battu dans le top 3',
        action: 'Publication instantanée d\'un trophée animé sur le salon Discord',
        status: 'Actif 24/7'
      },
      interactiveState: {
        title: 'Statistiques de Partie & Classement',
        metrics: [
          { label: 'Meilleur score', value: '24,850', change: '+15%' },
          { label: 'Parties jouées', value: '1,420', change: '+320' },
          { label: 'Précision tir', value: '88.4%', change: '+3.2%' }
        ],
        items: [
          { id: 'gm-1', title: 'Débloquer le vaisseau Vibe Phantom', status: 'Complété', priority: 'Haute', category: 'Succès' },
          { id: 'gm-2', title: 'Survivre à la vague 10 sans dégât', status: 'En cours', priority: 'Haute', category: 'Défi' },
          { id: 'gm-3', title: 'Atteindre un multiplicateur combo x8', status: 'Complété', priority: 'Moyenne', category: 'Gameplay' }
        ]
      }
    }
  },
  {
    id: 'companyhub',
    name: 'CompanyHub Portal',
    category: 'tools',
    categoryLabel: 'Outils',
    tagline: 'Portail interne RH, congés et gestion des assets',
    description: 'Espace d\'équipe avec gestion des demandes de congés, annuaire d\'entreprise, inventaire de matériel et annonces.',
    badge: 'Entreprise',
    color: '#312F2F',
    metrics: { value: 'SOC 2', label: 'sécurité & conformité RGPD' },
    blueprint: {
      id: 'companyhub',
      name: 'CompanyHub Intranet',
      tagline: 'Portail collaborateur unifié pour l\'organisation moderne',
      category: 'tools',
      accentColor: '#312F2F',
      theme: 'light',
      summary: 'Espace sécurisé pour simplifier la vie de vos équipes sans friction.',
      features: [
        'Gestion des demandes de congés & RTT avec circuit de validation',
        'Annuaire des collaborateurs et organigramme interactif',
        'Inventaire du matériel IT et affectation par collaborateur',
        'Fil d\'actualités interne et base de connaissances (Wiki)'
      ],
      database: {
        tables: [
          {
            name: 'Demandes_Conges',
            description: 'Demandes soumises par les collaborateurs',
            columns: ['id', 'employe', 'type', 'dates', 'statut'],
            records: [
              { id: 'PTO-41', employe: 'Léa Morel', type: 'Congés Payés', dates: '22/09 - 29/09 (5j)', statut: 'Validé' },
              { id: 'PTO-42', employe: 'Antoine Roux', type: 'RTT', dates: '18/09 (1j)', statut: 'En attente N+1' },
              { id: 'PTO-43', employe: 'Sonia Khelif', type: 'Télétravail ponctuel', dates: '16/09 (1j)', statut: 'Validé' }
            ]
          },
          {
            name: 'Inventaire_IT',
            description: 'Parc informatique et licences logicielles',
            columns: ['code', 'equipement', 'utilisateur', 'etat'],
            records: [
              { code: 'IT-MAC-88', equipement: 'MacBook Pro M3 16"', utilisateur: 'Léa Morel', etat: 'Assigné' },
              { code: 'IT-MAC-91', equipement: 'MacBook Air M2 13"', utilisateur: 'Antoine Roux', etat: 'Assigné' },
              { code: 'IT-MON-12', equipement: 'Écran Dell 4K 27"', utilisateur: 'En stock IT', etat: 'Disponible' }
            ]
          }
        ]
      },
      routes: ['/annuaire', '/conges', '/materiel', '/wiki'],
      integrations: ['Google Workspace', 'Slack', 'Okta SSO', 'Notion'],
      superagentFlow: {
        trigger: 'Validation d\'une demande de congé par le manager',
        action: 'Mise à jour du calendrier partagé Google Agenda et message de confirmation Slack',
        status: 'Actif 24/7'
      },
      interactiveState: {
        title: 'Tableau des Demandes & Présences Équipe',
        metrics: [
          { label: 'Effectif actif', value: '42 membres', change: '+2 ce mois' },
          { label: 'En congés aujourd\'hui', value: '3 personnes', change: 'Normal' },
          { label: 'Demandes à valider', value: '1 en attente', change: '-3' }
        ],
        items: [
          { id: 'ch-1', title: 'Valider le RTT d\'Antoine Roux du 18/09', status: 'En attente', priority: 'Haute', category: 'RH' },
          { id: 'ch-2', title: 'Onboarding nouvelle recrue UX Design le 01/10', status: 'En cours', priority: 'Haute', category: 'Recrutement' },
          { id: 'ch-3', title: 'Commande nouveau stock casques anti-bruit', status: 'Terminé', priority: 'Basse', category: 'Office' }
        ]
      }
    }
  }
];

export const SUGGESTED_PROMPTS = [
  "Un dashboard de gestion de trésorerie avec prédictions et alertes de factures impayées",
  "Une application de réservation de séances fitness avec calendrier interactif et liste d'attente",
  "Un mini-jeu d'arcade rétro 2D en néon avec vaisseau spatial et tableau des scores",
  "Un CRM de suivi des leads commerciaux avec relances automatiques par e-mail",
  "Un portail collaborateur RH pour la gestion des congés et du matériel informatique",
  "Une boutique en ligne éco-responsable avec gestion de panier et paiement Stripe"
];

export const ROTATING_PROMPT_PLACEHOLDERS = [
  "Un tableau de bord admin pour piloter mes ventes et mes métriques...",
  "Une page de destination moderne avec formulaires connectés à Notion...",
  "Une application de suivi d'habitudes avec rappels et streaks...",
  "Une plateforme d'e-commerce avec gestion de stock en temps réel...",
  "Un assistant Superagent 24/7 qui scanne mes emails et prépare mes réponses..."
];

export const SUPERAGENT_TASKS = [
  {
    id: 'inbox',
    title: 'Votre boîte de réception, traitée',
    service: 'gmail' as const,
    category: 'Communication',
    status: 'active' as const,
    quote: '« Scanne ma boîte de réception cette nuit. Signale tout ce qui est urgent, rédige des réponses aux messages simples, et envoie-moi un résumé WhatsApp à 7h avec ce que tu as traité et ce qui demande encore mon attention. »',
    recentExecution: 'Exécuté à 07:00 aujourd\'hui',
    logs: [
      { time: '07:00', text: '18 emails analysés (14 newsletters archivées, 3 réponses pré-rédigées)', tag: 'Succès' },
      { time: '07:01', text: 'Alerte urgence : Devis client #4401 nécessite votre validation', tag: 'Action' },
      { time: '07:02', text: 'Résumé condensé expédié sur votre WhatsApp', tag: 'Info' }
    ]
  },
  {
    id: 'leads',
    title: 'Des prospects toujours contactés',
    service: 'crm' as const,
    category: 'Ventes',
    status: 'active' as const,
    quote: '« Dès qu\'un nouveau prospect arrive, envoie un suivi personnalisé dans les 10 minutes. Pas de réponse au bout de 3 jours ? Essaie une autre approche. »',
    recentExecution: 'Actif en surveillance continue',
    logs: [
      { time: '11:42', text: 'Nouveau lead détecté via formulaire site : Thomas V. (Budget 5k€)', tag: 'Info' },
      { time: '11:48', text: 'Email de présentation personnalisé expédié en 6 minutes', tag: 'Succès' },
      { time: '11:49', text: 'Lead créé dans la base PostgreSQL et notifié sur #sales', tag: 'Action' }
    ]
  },
  {
    id: 'business',
    title: 'Votre activité, en pilote automatique',
    service: 'slack' as const,
    category: 'Opérations',
    status: 'active' as const,
    quote: '« Chaque vendredi à 17h, récupère les chiffres de la semaine — ventes, support, marketing. Signale tout ce qui sort de l\'ordinaire. Envoie le résumé sur Slack. »',
    recentExecution: 'Programmé pour vendredi à 17:00',
    logs: [
      { time: 'Hier 17:00', text: 'Rapport hebdomadaire consolidé : CA +18%, 42 tickets résolus', tag: 'Succès' },
      { time: 'Hier 17:01', text: 'Anomalie détectée : Pic de trafic mobile le mercredi (+65%)', tag: 'Action' },
      { time: 'Hier 17:02', text: 'Posté sur le canal Slack #general-direction', tag: 'Info' }
    ]
  },
  {
    id: 'calendar',
    title: 'Votre agenda, remis en ordre',
    service: 'calendar' as const,
    category: 'Productivité',
    status: 'active' as const,
    quote: '« Si j\'ai des réunions enchaînées sans pause, décale quelque chose. Bloque 30 minutes pour le déjeuner. Envoie-moi le planning mis à jour. »',
    recentExecution: 'Vérifié ce matin à 08:30',
    logs: [
      { time: '08:30', text: 'Conflit détecté : Réunions continues de 11h à 14h', tag: 'Action' },
      { time: '08:31', text: 'Point d\'étape décalé de 30 min après accord automatique', tag: 'Succès' },
      { time: '08:32', text: 'Pause déjeuner 12h30-13h00 sanctuarisée dans l\'agenda', tag: 'Info' }
    ]
  }
];
