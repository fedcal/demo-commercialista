import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { MockDataService } from '../../data/mock-data.service';

@Component({
  selector: 'app-contatti',
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf, ReactiveFormsModule],
  template: `
    <section class="page-header">
      <div class="demo-container">
        <h1>Contatti e prima consulenza</h1>
        <p>Prima consulenza gratuita di 30 minuti — in studio o in videochiamata, senza impegno.</p>
      </div>
    </section>

    <article class="demo-container content" *ngIf="info$ | async as info">
      <div class="contact-grid">

        <section class="info-block">
          <h2>Sede dello studio</h2>
          <address>
            <strong>{{ info.nomeCommerciale }}</strong><br />
            {{ info.indirizzo.via }}, {{ info.indirizzo.piano }}<br />
            {{ info.indirizzo.cap }} {{ info.indirizzo.citta }} ({{ info.indirizzo.provincia }})<br />
            {{ info.indirizzo.regione }}
          </address>

          <h2>Contatti diretti</h2>
          <ul class="contact-list">
            <li>
              <strong>Telefono:</strong>
              <a [href]="'tel:' + info.contatti.telefono">{{ info.contatti.telefono }}</a>
            </li>
            <li>
              <strong>Email:</strong>
              <a [href]="'mailto:' + info.contatti.email">{{ info.contatti.email }}</a>
            </li>
            <li>
              <strong>PEC:</strong>
              <a [href]="'mailto:' + info.contatti.pec">{{ info.contatti.pec }}</a>
            </li>
            <li *ngIf="info.contatti.social.linkedin">
              <strong>LinkedIn:</strong>
              <a [href]="info.contatti.social.linkedin" target="_blank" rel="noopener noreferrer">
                Studio Bertoni su LinkedIn
              </a>
            </li>
          </ul>

          <h2>Orari di ricevimento</h2>
          <ul class="hours-list">
            <li><span>Lunedì – Giovedì</span><span>{{ info.orari.lunedi }}</span></li>
            <li><span>Venerdì</span><span>{{ info.orari.venerdi }}</span></li>
            <li><span>Sabato – Domenica</span><span>{{ info.orari.sabato }}</span></li>
          </ul>
          <p class="hours-note">
            Appuntamenti fuori orario possono essere concordati per clienti con esigenze particolari.
          </p>

          <div class="iscrizione-badge">
            <span aria-hidden="true">🏛️</span>
            <span>{{ info.iscrizioni.odcec }}</span>
            <small>N. {{ info.iscrizioni.numeroIscrizione }}</small>
          </div>
        </section>

        <section class="form-block">
          <h2>Richiedi la prima consulenza</h2>
          <form [formGroup]="form" (ngSubmit)="onSubmit()" *ngIf="!submitted(); else thankyou">
            <div class="field">
              <label for="nome">Nome e cognome <span aria-hidden="true">*</span></label>
              <input
                id="nome"
                type="text"
                formControlName="nome"
                autocomplete="name"
                required
                [class.has-error]="isInvalid('nome')"
              />
              <span class="field-error" *ngIf="isInvalid('nome')" role="alert">
                Inserire nome e cognome (minimo 2 caratteri).
              </span>
            </div>

            <div class="field">
              <label for="email">Email <span aria-hidden="true">*</span></label>
              <input
                id="email"
                type="email"
                formControlName="email"
                autocomplete="email"
                required
                [class.has-error]="isInvalid('email')"
              />
              <span class="field-error" *ngIf="isInvalid('email')" role="alert">
                Inserire un indirizzo email valido.
              </span>
            </div>

            <div class="field">
              <label for="telefono">Telefono <span aria-hidden="true">*</span></label>
              <input
                id="telefono"
                type="tel"
                formControlName="telefono"
                autocomplete="tel"
                required
                [class.has-error]="isInvalid('telefono')"
              />
              <span class="field-error" *ngIf="isInvalid('telefono')" role="alert">
                Inserire un numero di telefono valido.
              </span>
            </div>

            <div class="field">
              <label for="tipologia">Tipologia cliente <span aria-hidden="true">*</span></label>
              <select id="tipologia" formControlName="tipologia" required [class.has-error]="isInvalid('tipologia')">
                <option value="">-- Selezionare --</option>
                <option value="ditta-individuale">Ditta individuale / Professionista</option>
                <option value="srl">SRL / Società di capitali</option>
                <option value="societa-persone">Società di persone</option>
                <option value="startup">Startup innovativa</option>
                <option value="privato">Privato / Persona fisica</option>
              </select>
              <span class="field-error" *ngIf="isInvalid('tipologia')" role="alert">
                Selezionare la tipologia.
              </span>
            </div>

            <div class="field">
              <label for="servizio">Servizio di interesse</label>
              <select id="servizio" formControlName="servizio">
                <option value="">-- Tutti i servizi --</option>
                <option value="contabilita-ordinaria">Contabilità ordinaria</option>
                <option value="contabilita-semplificata">Contabilità semplificata</option>
                <option value="dichiarativi">Dichiarativi fiscali</option>
                <option value="paghe">Gestione paghe</option>
                <option value="consulenza-fiscale">Consulenza fiscale</option>
                <option value="costituzione-srl">Costituzione SRL</option>
                <option value="audit">Revisione contabile</option>
                <option value="mediazione-tributaria">Contenzioso tributario</option>
              </select>
            </div>

            <div class="field">
              <label for="messaggio">Messaggio</label>
              <textarea
                id="messaggio"
                formControlName="messaggio"
                rows="4"
                placeholder="Descrivete brevemente la vostra situazione o necessità..."
              ></textarea>
            </div>

            <div class="privacy-block">
              <h3>Informativa Privacy (GDPR)</h3>
              <p class="privacy-text">
                I dati personali forniti saranno trattati da Studio Bertoni &amp; Associati s.r.l. (titolare
                del trattamento) ai sensi del Regolamento UE 2016/679 (GDPR) esclusivamente per rispondere
                alla vostra richiesta di consulenza e, previo consenso separato, per invio di comunicazioni
                informative. I dati non saranno ceduti a terzi né trasferiti extra-UE. Potete esercitare i
                diritti di accesso, rettifica, cancellazione e portabilità scrivendo a
                <a href="mailto:privacy@studiobertoni.it">privacy@studiobertoni.it</a>.
                Per maggiori informazioni consultate la nostra
                <a href="/privacy-policy">informativa completa</a>.
              </p>
              <div class="field field--checkbox">
                <input
                  id="privacy"
                  type="checkbox"
                  formControlName="privacy"
                  [class.has-error]="isInvalid('privacy')"
                />
                <label for="privacy">
                  Ho letto l'informativa privacy e acconsento al trattamento dei miei dati personali
                  per essere ricontattato dallo studio. <span class="required-mark">*</span>
                </label>
              </div>
              <span class="field-error" *ngIf="isInvalid('privacy')" role="alert">
                Il consenso alla privacy è obbligatorio.
              </span>
              <div class="field field--checkbox">
                <input id="marketing" type="checkbox" formControlName="marketing" />
                <label for="marketing">
                  Acconsento facoltativamente a ricevere newsletter fiscali, aggiornamenti normativi e
                  inviti a webinar dello studio (revocabile in qualsiasi momento).
                </label>
              </div>
            </div>

            <button type="submit" class="btn btn-primary" [disabled]="form.invalid">
              Invia richiesta di consulenza
            </button>
            <p class="form-disclaimer">
              Demo non funzionale: nessun dato è realmente inviato.
              In un sito reale la richiesta verrebbe inoltrata allo studio tramite server sicuro.
            </p>
          </form>

          <ng-template #thankyou>
            <div class="thankyou">
              <span class="thankyou__icon" aria-hidden="true">✅</span>
              <h3>Richiesta ricevuta, {{ form.value['nome'] }}!</h3>
              <p>
                Vi contatteremo entro 1 giorno lavorativo al numero o all'indirizzo email indicati
                per fissare la vostra consulenza gratuita.
              </p>
              <p>
                <strong>Nota:</strong> questa è una demo. In un sito reale ricevereste un'email
                di conferma automatica dallo studio.
              </p>
              <button type="button" class="btn btn-secondary" (click)="reset()">
                Nuova richiesta
              </button>
            </div>
          </ng-template>
        </section>

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
      }
      .content {
        padding: 3rem 1rem;
      }
      .contact-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        gap: 3rem;
      }
      .info-block h2 {
        margin: 1.5rem 0 0.75rem;
        font-size: 1.1rem;
      }
      .info-block h2:first-child {
        margin-top: 0;
      }
      address {
        font-style: normal;
        line-height: 1.7;
        color: var(--color-fg-default);
      }
      .contact-list {
        list-style: none;
        padding: 0;
        margin: 0;
      }
      .contact-list li {
        margin-bottom: 0.5rem;
        font-size: 0.95rem;
      }
      .hours-list {
        list-style: none;
        padding: 0;
        margin: 0;
      }
      .hours-list li {
        display: flex;
        justify-content: space-between;
        padding: 0.4rem 0;
        border-bottom: 1px dashed var(--color-border);
        font-size: 0.92rem;
      }
      .hours-note {
        font-size: 0.82rem;
        color: var(--color-fg-muted);
        margin-top: 0.5rem;
        font-style: italic;
      }
      .iscrizione-badge {
        margin-top: 1.5rem;
        display: flex;
        flex-direction: column;
        gap: 0.2rem;
        padding: 1rem;
        background: #ccfbf1;
        border-radius: var(--radius-md);
        font-size: 0.85rem;
        color: #0f5651;
      }
      .iscrizione-badge small {
        font-size: 0.75rem;
        color: #0d6b63;
      }
      .form-block {
        background: var(--color-bg-subtle);
        padding: 2rem;
        border-radius: var(--radius-lg);
        border: 1px solid var(--color-border);
      }
      .form-block h2 {
        margin: 0 0 1.5rem;
        font-size: 1.2rem;
      }
      .field {
        margin-bottom: 1.1rem;
        display: flex;
        flex-direction: column;
      }
      .field label {
        font-size: 0.85rem;
        font-weight: 600;
        margin-bottom: 0.3rem;
        color: var(--color-fg-default);
      }
      .required-mark {
        color: var(--color-danger);
      }
      .field input,
      .field textarea,
      .field select {
        padding: 0.5rem 0.75rem;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-sm);
        font-family: inherit;
        font-size: 0.95rem;
        background: #ffffff;
      }
      .field input:focus,
      .field textarea:focus,
      .field select:focus {
        outline: 2px solid var(--color-accent);
        outline-offset: 1px;
        border-color: var(--color-accent);
      }
      .field input.has-error,
      .field textarea.has-error,
      .field select.has-error {
        border-color: var(--color-danger);
      }
      .field-error {
        font-size: 0.78rem;
        color: var(--color-danger);
        margin-top: 0.2rem;
      }
      .field--checkbox {
        flex-direction: row;
        align-items: flex-start;
        gap: 0.5rem;
      }
      .field--checkbox input {
        margin-top: 0.15rem;
        flex-shrink: 0;
      }
      .field--checkbox label {
        font-weight: 400;
        font-size: 0.85rem;
        color: var(--color-fg-muted);
        cursor: pointer;
      }
      .privacy-block {
        background: #ffffff;
        border: 1px solid var(--color-border);
        border-radius: var(--radius-md);
        padding: 1.25rem;
        margin-bottom: 1.25rem;
      }
      .privacy-block h3 {
        margin: 0 0 0.75rem;
        font-size: 0.95rem;
        color: var(--color-fg-default);
      }
      .privacy-text {
        font-size: 0.8rem;
        color: var(--color-fg-muted);
        line-height: 1.55;
        margin: 0 0 1rem;
      }
      .btn {
        display: inline-block;
        padding: 0.7rem 1.5rem;
        border-radius: var(--radius-md);
        text-decoration: none;
        font-weight: 600;
        border: none;
        cursor: pointer;
        font-size: 0.95rem;
        transition: all 0.15s;
      }
      .btn-primary {
        background: var(--color-accent);
        color: #ffffff;
        width: 100%;
        text-align: center;
      }
      .btn-primary:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
      .btn-primary:not(:disabled):hover {
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
      .form-disclaimer {
        font-size: 0.78rem;
        color: var(--color-fg-muted);
        font-style: italic;
        margin-top: 0.75rem;
        text-align: center;
      }
      .thankyou {
        text-align: center;
        padding: 1rem;
      }
      .thankyou__icon {
        font-size: 3rem;
        display: block;
        margin-bottom: 0.75rem;
      }
      .thankyou h3 {
        color: var(--color-success);
        font-size: 1.25rem;
        margin: 0 0 0.75rem;
      }
      .thankyou p {
        color: var(--color-fg-muted);
        font-size: 0.92rem;
        line-height: 1.55;
        margin-bottom: 0.75rem;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContattiComponent {
  private readonly mockData = inject(MockDataService);
  private readonly fb = inject(FormBuilder);

  readonly info$ = this.mockData.info$;
  readonly submitted = signal(false);

  readonly form: FormGroup = this.fb.nonNullable.group({
    nome: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    telefono: ['', [Validators.required, Validators.pattern(/^[+0-9 ]{6,}$/)]],
    tipologia: ['', Validators.required],
    servizio: [''],
    messaggio: [''],
    privacy: [false, Validators.requiredTrue],
    marketing: [false]
  });

  isInvalid(field: string): boolean {
    const control = this.form.get(field);
    return control ? control.invalid && control.touched : false;
  }

  onSubmit(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.submitted.set(true);
    }
  }

  reset(): void {
    this.form.reset({ privacy: false, marketing: false });
    this.submitted.set(false);
  }
}
