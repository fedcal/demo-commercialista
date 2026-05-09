import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
    title: 'Studio Bertoni Commercialisti — Consulenza fiscale Milano dal 1992'
  },
  {
    path: 'servizi',
    loadComponent: () => import('./pages/servizi/servizi.component').then((m) => m.ServiziComponent),
    title: 'Servizi — Studio Bertoni Commercialisti'
  },
  {
    path: 'chi-siamo',
    loadComponent: () => import('./pages/chi-siamo/chi-siamo.component').then((m) => m.ChiSiamoComponent),
    title: 'Chi siamo — Studio Bertoni Commercialisti'
  },
  {
    path: 'risorse',
    loadComponent: () => import('./pages/risorse/risorse.component').then((m) => m.RisorseComponent),
    title: 'Risorse: scadenze fiscali e guide — Studio Bertoni'
  },
  {
    path: 'contatti',
    loadComponent: () => import('./pages/contatti/contatti.component').then((m) => m.ContattiComponent),
    title: 'Contatti e prima consulenza — Studio Bertoni Commercialisti'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
