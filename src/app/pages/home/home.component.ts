import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { map } from 'rxjs';

import { MockDataService } from '../../data/mock-data.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf, RouterLink],
  template: `
    <section class="hero">
      <div class="demo-container">
        <div class="hero__badge">Iscritti OdCEC Milano · Dal 1992</div>
        <h1>Consulenza fiscale e contabile<br>per PMI a Milano</h1>
        <p class="hero-tagline">
          Studio Bertoni affianca imprenditori e professionisti con un approccio diretto,
          senza intermediari inutili. Prima consulenza gratuita.
        </p>
        <div class="hero-actions">
          <a routerLink="/contatti" class="btn btn-primary">Prima consulenza gratuita</a>
          <a routerLink="/servizi" class="btn btn-secondary">I nostri servizi</a>
        </div>
      </div>
    </section>

    <section class="stats">
      <div class="demo-container">
        <ul class="stats-grid">
          <li class="stat-item">
            <span class="stat-item__number">34+</span>
            <span class="stat-item__label">anni di esperienza</span>
          </li>
          <li class="stat-item">
            <span class="stat-item__number">6</span>
            <span class="stat-item__label">professionisti dedicati</span>
          </li>
          <li class="stat-item">
            <span class="stat-item__number">8</span>
            <span class="stat-item__label">aree di servizio</span>
          </li>
          <li class="stat-item">
            <span class="stat-item__number">500+</span>
            <span class="stat-item__label">clienti PMI seguiti</span>
          </li>
        </ul>
      </div>
    </section>

    <section class="features demo-container">
      <h2>Perché scegliere Studio Bertoni</h2>
      <ul class="feature-grid">
        <li>
          <span class="feature-icon" aria-hidden="true">🎓</span>
          <h3>Professionisti iscritti all'Albo</h3>
          <p>Tutti i commercialisti dello studio sono iscritti all'OdCEC di Milano e aggiornati obbligatoriamente ogni anno.</p>
        </li>
        <li>
          <span class="feature-icon" aria-hidden="true">🔒</span>
          <h3>Approccio preventivo</h3>
          <p>Non aspettiamo le scadenze. Pianifichiamo con anticipo per ottimizzare il carico fiscale legalmente.</p>
        </li>
        <li>
          <span class="feature-icon" aria-hidden="true">📞</span>
          <h3>Referente dedicato</h3>
          <p>Ogni cliente ha un professionista di riferimento diretto, non un call center. Risposta entro 24 ore lavorative.</p>
        </li>
        <li>
          <span class="feature-icon" aria-hidden="true">💻</span>
          <h3>Gestione digitale</h3>
          <p>Portale clienti per la condivisione documenti, firma digitale, e accesso h24 alla propria situazione contabile.</p>
        </li>
      </ul>
    </section>

    <section class="featured demo-container" *ngIf="featuredServizi$ | async as servizi">
      <div class="section-header">
        <h2>I servizi principali</h2>
        <a routerLink="/servizi" class="link-more">Tutti i servizi →</a>
      </div>
      <ul class="servizi-grid">
        <li *ngFor="let s of servizi" class="servizio-card">
          <span class="servizio-card__icon" aria-hidden="true">{{ s.icona }}</span>
          <h3>{{ s.nome }}</h3>
          <p class="servizio-card__desc">{{ s.descrizione }}</p>
          <span class="servizio-card__freq">{{ s.frequenza }}</span>
        </li>
      </ul>
    </section>

    <section class="cta-band">
      <div class="demo-container">
        <h2>Prima consulenza gratuita — senza impegno</h2>
        <p>
          Analizziamo insieme la vostra situazione fiscale e contabile.
          30 minuti di colloquio, in studio o in videochiamata, completamente gratuiti.
        </p>
        <div class="hero-actions">
          <a routerLink="/contatti" class="btn btn-primary">Prenota ora</a>
          <a routerLink="/risorse" class="btn btn-secondary-inv">Scadenze fiscali 2026</a>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .hero {
        padding: 5rem 1rem;
        text-align: center;
        background: linear-gradient(180deg, #f0fdf9 0%, #ffffff 100%);
        border-bottom: 1px solid var(--color-border);
      }
      .hero__badge {
        display: inline-block;
        background: #ccfbf1;
        color: #0f766e;
        font-size: 0.8rem;
        font-weight: 600;
        padding: 0.3rem 0.75rem;
        border-radius: 9999px;
        margin-bottom: 1.5rem;
        letter-spacing: 0.02em;
      }
      .hero h1 {
        font-size: clamp(1.8rem, 4.5vw, 3rem);
        margin: 0 0 1rem;
        color: var(--color-fg-default);
        line-height: 1.2;
      }
      .hero-tagline {
        font-size: 1.1rem;
        color: var(--color-fg-muted);
        margin: 0 0 2rem;
        max-width: 560px;
        margin-left: auto;
        margin-right: auto;
      }
      .hero-actions {
        display: flex;
        gap: 0.75rem;
        justify-content: center;
        flex-wrap: wrap;
      }
      .btn {
        display: inline-block;
        padding: 0.7rem 1.5rem;
        border-radius: var(--radius-md);
        text-decoration: none;
        font-weight: 600;
        transition: all 0.15s ease;
      }
      .btn:hover {
        text-decoration: none;
      }
      .btn-primary {
        background: var(--color-accent);
        color: #ffffff;
      }
      .btn-primary:hover {
        background: #0d5f57;
      }
      .btn-secondary {
        background: #ffffff;
        color: var(--color-fg-default);
        border: 1px solid var(--color-border);
      }
      .btn-secondary:hover {
        background: var(--color-bg-subtle);
      }
      .btn-secondary-inv {
        background: transparent;
        color: #ffffff;
        border: 1px solid rgba(255,255,255,0.35);
        padding: 0.7rem 1.5rem;
        border-radius: var(--radius-md);
        text-decoration: none;
        font-weight: 600;
      }
      .btn-secondary-inv:hover {
        background: rgba(255,255,255,0.1);
        text-decoration: none;
      }
      .stats {
        background: var(--color-accent);
        padding: 2.5rem 1rem;
      }
      .stats-grid {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
        gap: 1rem;
        text-align: center;
      }
      .stat-item {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .stat-item__number {
        font-size: 2.5rem;
        font-weight: 700;
        color: #ffffff;
        line-height: 1;
      }
      .stat-item__label {
        font-size: 0.85rem;
        color: rgba(255,255,255,0.8);
        margin-top: 0.4rem;
      }
      .features {
        padding: 4rem 1rem;
      }
      .features h2 {
        text-align: center;
        margin-bottom: 2.5rem;
        font-size: 1.75rem;
      }
      .feature-grid {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
        gap: 1.5rem;
      }
      .feature-grid li {
        text-align: center;
        padding: 1.5rem;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
      }
      .feature-icon {
        font-size: 2.25rem;
        display: block;
        margin-bottom: 0.75rem;
      }
      .feature-grid h3 {
        margin: 0 0 0.5rem;
        font-size: 1.05rem;
      }
      .feature-grid p {
        margin: 0;
        color: var(--color-fg-muted);
        font-size: 0.92rem;
        line-height: 1.5;
      }
      .featured {
        padding: 4rem 1rem;
        background: var(--color-bg-subtle);
        border-radius: var(--radius-lg);
        margin: 0 1rem 4rem;
      }
      .section-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.75rem;
        flex-wrap: wrap;
        gap: 0.5rem;
      }
      .section-header h2 {
        margin: 0;
        font-size: 1.5rem;
      }
      .link-more {
        color: var(--color-accent);
        text-decoration: none;
        font-weight: 600;
        font-size: 0.95rem;
      }
      .link-more:hover {
        text-decoration: underline;
      }
      .servizi-grid {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 1.25rem;
      }
      .servizio-card {
        background: #ffffff;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        padding: 1.5rem;
      }
      .servizio-card__icon {
        font-size: 2rem;
        display: block;
        margin-bottom: 0.75rem;
      }
      .servizio-card h3 {
        margin: 0 0 0.5rem;
        font-size: 1.05rem;
        color: var(--color-fg-default);
      }
      .servizio-card__desc {
        color: var(--color-fg-muted);
        font-size: 0.88rem;
        margin: 0 0 0.75rem;
        line-height: 1.5;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      .servizio-card__freq {
        font-size: 0.75rem;
        background: #ccfbf1;
        color: #0f766e;
        padding: 0.2rem 0.6rem;
        border-radius: 9999px;
        font-weight: 600;
      }
      .cta-band {
        padding: 4.5rem 1rem;
        background: var(--color-fg-default);
        color: #ffffff;
        text-align: center;
      }
      .cta-band h2 {
        margin: 0 0 1rem;
        color: #ffffff;
        font-size: 1.75rem;
      }
      .cta-band p {
        color: rgba(255,255,255,0.8);
        margin: 0 auto 2rem;
        max-width: 560px;
        line-height: 1.6;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  private readonly mockData = inject(MockDataService);

  readonly featuredServizi$ = this.mockData.servizi$.pipe(
    map((data) => data.servizi.slice(0, 4))
  );
}
