import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { AsyncPipe, NgFor, NgIf, NgClass } from '@angular/common';

import { MockDataService } from '../../data/mock-data.service';

const TIPO_LABEL: Record<string, string> = {
  iva: 'IVA',
  lavoro: 'Lavoro',
  imposte: 'Imposte',
  dichiarativi: 'Dichiarativi',
  societario: 'Societario'
};

@Component({
  selector: 'app-risorse',
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf, NgClass],
  template: `
    <section class="page-header">
      <div class="demo-container">
        <h1>Risorse fiscali</h1>
        <p>Calendario scadenze 2026 e guide PDF scaricabili — sempre aggiornati alle ultime normative.</p>
      </div>
    </section>

    <article class="demo-container content" *ngIf="risorse$ | async as risorse">

      <section class="scadenze-section">
        <h2>Calendario scadenze fiscali 2026</h2>
        <p class="section-intro">
          Le principali scadenze fiscali per PMI, professionisti e persone fisiche. Aggiornato a normativa 2026.
        </p>

        <div class="filter-bar" role="group" aria-label="Filtra per tipo scadenza">
          <button
            *ngFor="let tipo of tipiScadenza"
            class="filter-btn"
            [class.is-active]="filtroAttivo() === tipo.id"
            (click)="setFiltro(tipo.id)"
          >
            {{ tipo.label }}
          </button>
        </div>

        <ul class="scadenze-list">
          <li
            *ngFor="let s of risorse.scadenze"
            class="scadenza-item"
            [class.hidden]="filtroAttivo() !== 'tutti' && s.tipo !== filtroAttivo()"
          >
            <div class="scadenza-item__date">
              <span class="scadenza-item__mese">{{ s.mese }}</span>
              <span class="scadenza-item__giorno">{{ s.data | slice: 8:10 }}</span>
            </div>
            <div class="scadenza-item__body">
              <div class="scadenza-item__head">
                <h3>{{ s.titolo }}</h3>
                <span class="badge badge--tipo badge--{{ s.tipo }}">{{ tipoLabel(s.tipo) }}</span>
              </div>
              <p class="scadenza-item__desc">{{ s.descrizione }}</p>
              <div class="scadenza-item__soggetti">
                <span *ngFor="let sg of s.soggetti" class="badge badge--soggetto">{{ sg }}</span>
              </div>
            </div>
          </li>
        </ul>
        <p class="disclaimer">
          Le scadenze sono indicative e possono variare per proroghe ministeriali. Consultare sempre lo
          studio per conferma. Dati aggiornati a maggio 2026.
        </p>
      </section>

      <section class="guide-section">
        <h2>Guide e approfondimenti</h2>
        <p class="section-intro">
          Guide pratiche scaricabili in PDF. Redatte dai professionisti dello studio su normativa italiana aggiornata.
        </p>
        <ul class="guide-grid">
          <li *ngFor="let g of risorse.guide" class="guida-card">
            <span class="guida-card__icon" aria-hidden="true">{{ g.icona }}</span>
            <div class="guida-card__body">
              <h3>{{ g.titolo }}</h3>
              <p class="guida-card__desc">{{ g.descrizione }}</p>
              <div class="guida-card__meta">
                <span class="badge badge--livello">{{ g.livello }}</span>
                <span class="guida-card__pagine">{{ g.pagine }} pagine</span>
              </div>
            </div>
            <div class="guida-card__action">
              <button class="btn btn-download" (click)="showDemoAlert()" aria-label="Scarica guida {{ g.titolo }}">
                Scarica PDF (demo)
              </button>
            </div>
          </li>
        </ul>
        <p class="disclaimer">
          Demo non funzionale: le guide non sono realmente scaricabili in questo ambiente di anteprima.
          In un sito reale sarebbero PDF generati dallo studio e distribuiti tramite link protetto o form di contatto.
        </p>
      </section>

    </article>
  `,
  styles: [
    `
      .page-header {
        padding: 4rem 1rem 3rem;
        background: var(--color-bg-subtle);
        text-align: center;
        border-bottom: 1px solid var(--color-border);
      }
      .page-header h1 {
        margin: 0 0 0.5rem;
      }
      .page-header p {
        color: var(--color-fg-muted);
        margin: 0;
        max-width: 600px;
        margin-left: auto;
        margin-right: auto;
      }
      .content {
        padding: 3rem 1rem;
      }
      .scadenze-section {
        margin-bottom: 4rem;
      }
      .scadenze-section h2,
      .guide-section h2 {
        font-size: 1.4rem;
        margin: 0 0 0.5rem;
      }
      .section-intro {
        color: var(--color-fg-muted);
        font-size: 0.95rem;
        margin: 0 0 1.5rem;
      }
      .filter-bar {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-bottom: 1.5rem;
      }
      .filter-btn {
        padding: 0.35rem 0.85rem;
        border-radius: 9999px;
        border: 1px solid var(--color-border);
        background: #ffffff;
        font-size: 0.82rem;
        font-weight: 600;
        color: var(--color-fg-muted);
        cursor: pointer;
        transition: all 0.15s;
      }
      .filter-btn:hover {
        border-color: var(--color-accent);
        color: var(--color-accent);
      }
      .filter-btn.is-active {
        background: var(--color-accent);
        color: #ffffff;
        border-color: var(--color-accent);
      }
      .scadenze-list {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
      }
      .scadenza-item {
        display: flex;
        gap: 1.25rem;
        padding: 1.25rem;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        background: #ffffff;
        align-items: flex-start;
      }
      .scadenza-item.hidden {
        display: none;
      }
      .scadenza-item__date {
        display: flex;
        flex-direction: column;
        align-items: center;
        min-width: 56px;
        padding: 0.5rem;
        background: var(--color-bg-subtle);
        border-radius: var(--radius-sm);
        text-align: center;
        flex-shrink: 0;
      }
      .scadenza-item__mese {
        font-size: 0.7rem;
        font-weight: 600;
        color: var(--color-fg-muted);
        text-transform: uppercase;
        letter-spacing: 0.05em;
      }
      .scadenza-item__giorno {
        font-size: 1.6rem;
        font-weight: 700;
        color: var(--color-accent);
        line-height: 1;
      }
      .scadenza-item__body {
        flex: 1;
        min-width: 0;
      }
      .scadenza-item__head {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 0.75rem;
        margin-bottom: 0.4rem;
        flex-wrap: wrap;
      }
      .scadenza-item__head h3 {
        margin: 0;
        font-size: 1rem;
      }
      .scadenza-item__desc {
        font-size: 0.88rem;
        color: var(--color-fg-muted);
        margin: 0 0 0.5rem;
        line-height: 1.5;
      }
      .scadenza-item__soggetti {
        display: flex;
        flex-wrap: wrap;
        gap: 0.35rem;
      }
      .badge {
        font-size: 0.7rem;
        padding: 0.15rem 0.5rem;
        border-radius: 9999px;
        font-weight: 600;
      }
      .badge--soggetto {
        background: var(--color-bg-subtle);
        color: var(--color-fg-muted);
        border: 1px solid var(--color-border);
      }
      .badge--tipo {
        flex-shrink: 0;
      }
      .badge--iva { background: #dbeafe; color: #1e40af; }
      .badge--lavoro { background: #dcfce7; color: #166534; }
      .badge--imposte { background: #fef9c3; color: #854d0e; }
      .badge--dichiarativi { background: #f3e8ff; color: #6b21a8; }
      .badge--societario { background: #fee2e2; color: #991b1b; }
      .badge--livello {
        background: #ccfbf1;
        color: #0f766e;
      }
      .guide-section {
        margin-bottom: 2rem;
      }
      .guide-grid {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
      .guida-card {
        display: flex;
        gap: 1.25rem;
        padding: 1.25rem;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        background: #ffffff;
        align-items: flex-start;
      }
      .guida-card__icon {
        font-size: 2rem;
        line-height: 1;
        flex-shrink: 0;
      }
      .guida-card__body {
        flex: 1;
        min-width: 0;
      }
      .guida-card__body h3 {
        margin: 0 0 0.35rem;
        font-size: 1rem;
      }
      .guida-card__desc {
        font-size: 0.88rem;
        color: var(--color-fg-muted);
        margin: 0 0 0.5rem;
        line-height: 1.5;
      }
      .guida-card__meta {
        display: flex;
        align-items: center;
        gap: 0.75rem;
      }
      .guida-card__pagine {
        font-size: 0.78rem;
        color: var(--color-fg-muted);
      }
      .guida-card__action {
        flex-shrink: 0;
      }
      .btn {
        padding: 0.5rem 1rem;
        border-radius: var(--radius-md);
        font-weight: 600;
        font-size: 0.85rem;
        border: none;
        cursor: pointer;
        transition: all 0.15s;
      }
      .btn-download {
        background: var(--color-accent);
        color: #ffffff;
      }
      .btn-download:hover {
        background: #0d5f57;
      }
      .disclaimer {
        font-size: 0.8rem;
        color: var(--color-fg-muted);
        font-style: italic;
        text-align: center;
        margin: 2rem auto 0;
        max-width: 720px;
        padding: 1rem;
        border: 1px dashed var(--color-border);
        border-radius: var(--radius-md);
      }
      @media (max-width: 600px) {
        .scadenza-item,
        .guida-card {
          flex-direction: column;
          gap: 0.75rem;
        }
        .scadenza-item__date {
          flex-direction: row;
          gap: 0.5rem;
          align-items: center;
          padding: 0.4rem 0.75rem;
        }
        .scadenza-item__giorno {
          font-size: 1.2rem;
        }
        .guida-card__action {
          width: 100%;
        }
        .btn-download {
          width: 100%;
        }
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RisorseComponent {
  private readonly mockData = inject(MockDataService);

  readonly risorse$ = this.mockData.risorse$;
  readonly filtroAttivo = signal<string>('tutti');

  readonly tipiScadenza = [
    { id: 'tutti', label: 'Tutti' },
    { id: 'iva', label: 'IVA' },
    { id: 'imposte', label: 'Imposte' },
    { id: 'lavoro', label: 'Lavoro' },
    { id: 'dichiarativi', label: 'Dichiarativi' },
    { id: 'societario', label: 'Societario' }
  ];

  setFiltro(tipo: string): void {
    this.filtroAttivo.set(tipo);
  }

  tipoLabel(tipo: string): string {
    return TIPO_LABEL[tipo] ?? tipo;
  }

  showDemoAlert(): void {
    alert('Demo: in un sito reale qui si scaricherebbe il PDF dal server.');
  }
}
