import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { map } from 'rxjs';

import { MockDataService } from '../../data/mock-data.service';
import type { Servizio } from '../../data/types';

interface CategoriaView {
  id: string;
  nome: string;
  servizi: Servizio[];
}

@Component({
  selector: 'app-servizi',
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf, RouterLink],
  template: `
    <section class="page-header">
      <div class="demo-container">
        <h1>I nostri servizi</h1>
        <p>Consulenza fiscale, contabilità, paghe e assistenza societaria per PMI e professionisti a Milano.</p>
      </div>
    </section>

    <article class="demo-container content" *ngIf="categorieView$ | async as categorie">
      <section *ngFor="let cat of categorie" class="servizi-category" [id]="cat.id">
        <h2>{{ cat.nome }}</h2>
        <ul class="servizi-list">
          <li *ngFor="let s of cat.servizi" class="servizio-item">
            <div class="servizio-item__head">
              <span class="servizio-item__icon" aria-hidden="true">{{ s.icona }}</span>
              <div>
                <h3>{{ s.nome }}</h3>
                <span class="servizio-item__freq">{{ s.frequenza }}</span>
              </div>
            </div>
            <p class="servizio-item__desc">{{ s.descrizione }}</p>
            <div class="servizio-item__destinatari">
              <span class="label">Per:</span>
              <span *ngFor="let d of s.destinatari" class="badge badge--dest">{{ d }}</span>
            </div>
            <details class="servizio-item__incluso">
              <summary>Cosa include</summary>
              <ul>
                <li *ngFor="let voce of s.incluso">{{ voce }}</li>
              </ul>
            </details>
          </li>
        </ul>
      </section>

      <div class="cta-inline">
        <h2>Non trovate quello che cercate?</h2>
        <p>Contattate lo studio per una consulenza personalizzata. Prima sessione gratuita di 30 minuti.</p>
        <a routerLink="/contatti" class="btn btn-primary">Richiedi consulenza gratuita</a>
      </div>
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
      .servizi-category {
        margin-bottom: 3.5rem;
      }
      .servizi-category h2 {
        font-size: 1.4rem;
        margin: 0 0 1.5rem;
        padding-bottom: 0.5rem;
        border-bottom: 2px solid var(--color-accent);
        display: inline-block;
      }
      .servizi-list {
        list-style: none;
        padding: 0;
        margin: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
        gap: 1.25rem;
      }
      .servizio-item {
        padding: 1.5rem;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        background: #ffffff;
      }
      .servizio-item__head {
        display: flex;
        gap: 1rem;
        align-items: flex-start;
        margin-bottom: 0.75rem;
      }
      .servizio-item__icon {
        font-size: 2rem;
        line-height: 1;
        flex-shrink: 0;
      }
      .servizio-item__head h3 {
        margin: 0 0 0.3rem;
        font-size: 1.05rem;
      }
      .servizio-item__freq {
        font-size: 0.72rem;
        background: #ccfbf1;
        color: #0f766e;
        padding: 0.15rem 0.5rem;
        border-radius: 9999px;
        font-weight: 600;
      }
      .servizio-item__desc {
        color: var(--color-fg-muted);
        font-size: 0.9rem;
        line-height: 1.55;
        margin: 0 0 0.75rem;
      }
      .servizio-item__destinatari {
        display: flex;
        flex-wrap: wrap;
        gap: 0.4rem;
        align-items: center;
        margin-bottom: 0.75rem;
      }
      .label {
        font-size: 0.78rem;
        font-weight: 600;
        color: var(--color-fg-muted);
      }
      .badge {
        font-size: 0.72rem;
        padding: 0.15rem 0.5rem;
        border-radius: 9999px;
        font-weight: 600;
      }
      .badge--dest {
        background: var(--color-bg-subtle);
        color: var(--color-fg-default);
        border: 1px solid var(--color-border);
      }
      .servizio-item__incluso {
        font-size: 0.88rem;
        color: var(--color-fg-muted);
      }
      .servizio-item__incluso summary {
        cursor: pointer;
        font-weight: 600;
        color: var(--color-accent);
        list-style: none;
        padding: 0.25rem 0;
      }
      .servizio-item__incluso summary::-webkit-details-marker {
        display: none;
      }
      .servizio-item__incluso summary::before {
        content: '+ ';
      }
      details[open] .servizio-item__incluso summary::before {
        content: '− ';
      }
      .servizio-item__incluso ul {
        margin: 0.5rem 0 0;
        padding-left: 1.25rem;
      }
      .servizio-item__incluso li {
        margin-bottom: 0.25rem;
      }
      .cta-inline {
        margin-top: 2rem;
        padding: 2.5rem;
        background: var(--color-bg-subtle);
        border-radius: var(--radius-lg);
        text-align: center;
        border: 1px solid var(--color-border);
      }
      .cta-inline h2 {
        margin: 0 0 0.75rem;
        font-size: 1.4rem;
      }
      .cta-inline p {
        color: var(--color-fg-muted);
        margin: 0 0 1.5rem;
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
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServiziComponent {
  private readonly mockData = inject(MockDataService);

  readonly categorieView$ = this.mockData.servizi$.pipe(
    map((data) =>
      data.categorie
        .slice()
        .sort((a, b) => a.ordine - b.ordine)
        .map((cat): CategoriaView => ({
          id: cat.id,
          nome: cat.nome,
          servizi: data.servizi.filter((s) => s.categoria === cat.id)
        }))
        .filter((cat) => cat.servizi.length > 0)
    )
  );
}
