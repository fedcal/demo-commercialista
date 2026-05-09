// Tipi TypeScript per i dati mock di Studio Bertoni Commercialisti

export interface Indirizzo {
  via: string;
  piano: string;
  citta: string;
  provincia: string;
  cap: string;
  regione: string;
  paese: string;
  lat: number;
  lng: number;
}

export interface Contatti {
  telefono: string;
  fax: string;
  email: string;
  pec: string;
  social: {
    linkedin?: string;
  };
}

export interface OrariApertura {
  lunedi: string;
  martedi: string;
  mercoledi: string;
  giovedi: string;
  venerdi: string;
  sabato: string;
  domenica: string;
}

export interface IscrizioniAlbo {
  odcec: string;
  numeroIscrizione: string;
  revisoriLegali: boolean;
  consulentiLavoro: boolean;
}

export interface MetaSeo {
  title: string;
  description: string;
  keywords: string[];
}

export interface InfoAttivita {
  ragioneSociale: string;
  nomeCommerciale: string;
  tagline: string;
  fondazione: number;
  dipendenti: number;
  indirizzo: Indirizzo;
  contatti: Contatti;
  orari: OrariApertura;
  iscrizioni: IscrizioniAlbo;
  metaSeo: MetaSeo;
}

export interface Servizio {
  id: string;
  nome: string;
  descrizione: string;
  icona: string;
  categoria: string;
  destinatari: string[];
  frequenza: string;
  incluso: string[];
}

export interface CategoriaServizio {
  id: string;
  nome: string;
  ordine: number;
}

export interface ServiziData {
  servizi: Servizio[];
  categorie: CategoriaServizio[];
}

export interface MembroTeam {
  id: number;
  nome: string;
  ruolo: string;
  titolo: string;
  bio: string;
  anniEsperienza: number;
  albo: string;
  specialita: string[];
  email: string;
}

export interface TeamData {
  team: MembroTeam[];
}

export interface FaqItem {
  domanda: string;
  risposta: string;
}

export interface FaqData {
  faq: FaqItem[];
}

export interface ScadenzaFiscale {
  id: number;
  data: string;
  mese: string;
  titolo: string;
  descrizione: string;
  tipo: string;
  soggetti: string[];
}

export interface GuidaPdf {
  id: string;
  titolo: string;
  descrizione: string;
  categoria: string;
  livello: string;
  pagine: number;
  icona: string;
}

export interface RisorseData {
  scadenze: ScadenzaFiscale[];
  guide: GuidaPdf[];
}
