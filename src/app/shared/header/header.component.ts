import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="site-header">
      <div class="site-header__inner">
        <a routerLink="/" class="brand" aria-label="Home Studio Bertoni Commercialisti">
          <span class="brand__icon" aria-hidden="true">📊</span>
          <span class="brand__text">Bertoni Commercialisti</span>
        </a>
        <nav class="site-nav" aria-label="Navigazione principale">
          <a routerLink="/" routerLinkActive="is-active" [routerLinkActiveOptions]="{ exact: true }">Home</a>
          <a routerLink="/servizi" routerLinkActive="is-active">Servizi</a>
          <a routerLink="/chi-siamo" routerLinkActive="is-active">Chi siamo</a>
          <a routerLink="/risorse" routerLinkActive="is-active">Risorse</a>
          <a routerLink="/contatti" routerLinkActive="is-active" class="cta">Prima consulenza gratuita</a>
        </nav>
      </div>
    </header>
  `,
  styles: [
    `
      .site-header {
        position: sticky;
        top: 0;
        z-index: 100;
        background: var(--color-bg-default);
        border-bottom: 1px solid var(--color-border);
        backdrop-filter: blur(8px);
      }
      .site-header__inner {
        max-width: 1080px;
        margin: 0 auto;
        padding: 1rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
      }
      .brand {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        text-decoration: none;
        color: var(--color-fg-default);
        font-weight: 700;
        font-size: 1.1rem;
      }
      .brand:hover {
        text-decoration: none;
      }
      .brand__icon {
        font-size: 1.4rem;
      }
      .site-nav {
        display: flex;
        gap: 0.75rem;
        flex-wrap: wrap;
        align-items: center;
      }
      .site-nav a {
        color: var(--color-fg-muted);
        text-decoration: none;
        font-size: 0.9rem;
        padding: 0.4rem 0.6rem;
        border-radius: var(--radius-sm);
      }
      .site-nav a:hover {
        color: var(--color-fg-default);
        background: var(--color-bg-subtle);
        text-decoration: none;
      }
      .site-nav a.is-active {
        color: var(--color-accent);
        font-weight: 600;
      }
      .site-nav a.cta {
        background: var(--color-accent);
        color: #ffffff;
        padding: 0.5rem 1rem;
        font-size: 0.85rem;
      }
      .site-nav a.cta:hover {
        background: #0d5f57;
        color: #ffffff;
      }
      @media (max-width: 700px) {
        .site-header__inner {
          flex-direction: column;
          padding: 0.75rem;
          gap: 0.5rem;
        }
        .site-nav {
          gap: 0.4rem;
          font-size: 0.82rem;
          justify-content: center;
        }
        .site-nav a.cta {
          font-size: 0.82rem;
          padding: 0.4rem 0.75rem;
        }
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {}
