import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';

import { MockDataService } from '../../data/mock-data.service';

@Component({
  selector: 'app-chi-siamo',
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf],
  template: `
    <section class="page-header">
      <div class="demo-container">
        <h1>Lo studio</h1>
        <p>Trent'anni di consulenza fiscale e contabile a Milano. Professionisti iscritti all'OdCEC.</p>
      </div>
    </section>

    <article class="demo-container content">
      <section class="story">
        <h2>Studio Bertoni dal 1992</h2>
        <p>
          Il Dott. Marco Bertoni fonda lo studio nel 1992, dopo dieci anni di esperienza presso
          una delle principali società di revisione internazionali. L'obiettivo fin dall'inizio è
          preciso: offrire alle PMI milanesi lo stesso livello di competenza fiscale e contabile
          delle grandi aziende, con la flessibilità e la prossimità di uno studio professionale
          indipendente.
        </p>
        <p>
          Oggi lo studio conta sei professionisti: tre dottori commercialisti iscritti all'albo,
          due junior e una responsabile di segreteria con quasi vent'anni di esperienza. La sede
          è in Via Vittor Pisani 12, nel cuore del centro direzionale di Milano, a due passi dalla
          Stazione Centrale e facilmente raggiungibile da tutta la città metropolitana.
        </p>
        <p>
          Serviamo oltre 500 clienti tra SRL, ditte individuali, professionisti e startup. Il 70%
          di essi ci ha scelti dopo il passaparola di clienti già seguiti — la nostra migliore
          testimonianza.
        </p>
      </section>

      <section class="values">
        <h2>I nostri valori</h2>
        <ul class="values-grid">
          <li>
            <h3>Competenza certificata</h3>
            <p>Tutti i commercialisti dello studio sono iscritti all'OdCEC di Milano e aggiornati ogni anno con 40 ore di formazione continua obbligatoria.</p>
          </li>
          <li>
            <h3>Trasparenza</h3>
            <p>Preventivi chiari, senza costi nascosti. I nostri contratti indicano esplicitamente servizi inclusi, esclusi e modalità di fatturazione.</p>
          </li>
          <li>
            <h3>Proattività</h3>
            <p>Non aspettiamo che il cliente chieda: segnaliamo scadenze, opportunità di risparmio fiscale e novità normative con anticipo sufficiente per agire.</p>
          </li>
          <li>
            <h3>Riservatezza</h3>
            <p>I dati dei clienti sono protetti con sistemi di cifratura conformi al GDPR. Accesso ai documenti solo ai professionisti assegnati al cliente.</p>
          </li>
        </ul>
      </section>

      <section class="team" *ngIf="team$ | async as teamData">
        <h2>Il team</h2>
        <ul class="team-grid">
          <li *ngFor="let m of teamData.team" class="team-card">
            <div class="team-card__avatar" aria-hidden="true">{{ m.nome.charAt(m.nome.lastIndexOf(' ') + 1) }}</div>
            <h3>{{ m.nome }}</h3>
            <p class="team-card__titolo">{{ m.titolo }}</p>
            <p class="team-card__ruolo">{{ m.ruolo }}</p>
            <p class="team-card__bio">{{ m.bio }}</p>
            <p class="team-card__exp">{{ m.anniEsperienza }} anni di esperienza</p>
            <p class="team-card__albo" *ngIf="m.albo">{{ m.albo }}</p>
            <ul class="team-card__skills">
              <li *ngFor="let s of m.specialita">{{ s }}</li>
            </ul>
          </li>
        </ul>
      </section>

      <section class="albo-note">
        <h2>Iscrizione all'Albo</h2>
        <p>
          Lo studio è iscritto all'Ordine dei Dottori Commercialisti ed Esperti Contabili di Milano
          (OdCEC Milano, n. MI-12847). I Dottori Commercialisti dello studio sono abilitati all'esercizio
          della revisione legale dei conti ai sensi del D.Lgs. 39/2010.
        </p>
        <p>
          La polizza RC professionale è stipulata con primaria compagnia assicurativa italiana e
          rinnovata annualmente secondo i massimali previsti dall'ordinamento professionale.
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
      }
      .content {
        padding: 3rem 1rem;
      }
      .story {
        max-width: 760px;
        margin: 0 auto 4rem;
      }
      .story h2 {
        margin-bottom: 1rem;
        font-size: 1.4rem;
      }
      .story p {
        line-height: 1.75;
        margin-bottom: 1rem;
        color: var(--color-fg-default);
      }
      .values {
        margin-bottom: 4rem;
      }
      .values h2 {
        text-align: center;
        margin-bottom: 2rem;
        font-size: 1.4rem;
      }
      .values-grid {
        list-style: none;
        padding: 0;
        margin: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
        gap: 1.5rem;
      }
      .values-grid li {
        padding: 1.5rem;
        background: var(--color-bg-subtle);
        border-radius: var(--radius-md);
        border: 1px solid var(--color-border);
      }
      .values-grid h3 {
        margin: 0 0 0.5rem;
        color: var(--color-accent);
        font-size: 1rem;
      }
      .values-grid p {
        margin: 0;
        color: var(--color-fg-muted);
        font-size: 0.92rem;
        line-height: 1.5;
      }
      .team {
        margin-bottom: 4rem;
      }
      .team h2 {
        text-align: center;
        margin-bottom: 2rem;
        font-size: 1.4rem;
      }
      .team-grid {
        list-style: none;
        padding: 0;
        margin: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(270px, 1fr));
        gap: 1.5rem;
      }
      .team-card {
        padding: 1.5rem;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        text-align: center;
        background: #ffffff;
      }
      .team-card__avatar {
        width: 72px;
        height: 72px;
        border-radius: 50%;
        background: var(--color-accent);
        color: #ffffff;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.75rem;
        font-weight: 700;
        margin: 0 auto 1rem;
      }
      .team-card h3 {
        margin: 0 0 0.15rem;
        font-size: 1.05rem;
      }
      .team-card__titolo {
        margin: 0 0 0.15rem;
        color: var(--color-accent);
        font-weight: 600;
        font-size: 0.85rem;
      }
      .team-card__ruolo {
        margin: 0 0 0.75rem;
        color: var(--color-fg-muted);
        font-size: 0.82rem;
      }
      .team-card__bio {
        font-size: 0.88rem;
        color: var(--color-fg-muted);
        margin-bottom: 0.5rem;
        text-align: left;
        line-height: 1.5;
      }
      .team-card__exp {
        font-size: 0.8rem;
        font-weight: 600;
        margin-bottom: 0.25rem;
        color: var(--color-fg-default);
      }
      .team-card__albo {
        font-size: 0.72rem;
        color: var(--color-fg-muted);
        margin-bottom: 0.75rem;
        font-style: italic;
      }
      .team-card__skills {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        gap: 0.4rem;
        flex-wrap: wrap;
        justify-content: center;
      }
      .team-card__skills li {
        font-size: 0.7rem;
        background: var(--color-bg-subtle);
        padding: 0.2rem 0.5rem;
        border-radius: 9999px;
        color: var(--color-fg-muted);
        border: 1px solid var(--color-border);
      }
      .albo-note {
        max-width: 760px;
        margin: 0 auto;
        padding: 2rem;
        background: var(--color-bg-subtle);
        border-radius: var(--radius-md);
        border: 1px solid var(--color-border);
      }
      .albo-note h2 {
        margin: 0 0 0.75rem;
        font-size: 1.1rem;
      }
      .albo-note p {
        font-size: 0.9rem;
        color: var(--color-fg-muted);
        line-height: 1.6;
        margin-bottom: 0.5rem;
      }
      .albo-note p:last-child {
        margin-bottom: 0;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChiSiamoComponent {
  private readonly mockData = inject(MockDataService);

  readonly team$ = this.mockData.team$;
}
