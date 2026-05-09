# Commercialista / Studio Fiscale — Tier Features & Pricing 2026

## Panoramica

Sito professionale + portale clienti per studi fiscali (730/770, IVA, bilanci, RUI). Mercato: ~45.000 studi OdCEC, insoddisfazione SW standard 35%. Pain: decine scadenze sparse, documenti non centralizzati.

---

## Tier Base — €500–800 (80 ore)

**Per chi**: Studio 1-3 commercialisti, primo sito web.

### Incluso
- Home hero + proposizione unica (es. "Dichiarazioni 730 in 48h senza stress")
- Servizi specializzati: 730, 770, bilanci, IVA, RUI, CCIA, successioni
- Team commercialisti: foto, certificazioni (DF, EA), specializzazioni (PMI/startup/persone fisiche)
- News compliance: novità fiscali, scadenze, comunicazioni AgID (aggiornate settimanalmente)
- Blog 8-10 articoli (come compilare 730, detrazioni 2026, split payment)
- Calendario scadenze pubblico (grigliato mese: IVA liquidazione, versamenti F24)
- Schema JSON-LD: AccountingService + LocalBusiness
- Contact form email
- SEO base

### NON incluso
- Portale clienti
- Upload documenti
- Scadenziario intelligente
- OCR estrazione
- Integrazioni Agenzia Entrate
- Analytics

### Manutenzione
**€50/mese**: update news compliance, blog, backup.

### Add-on
- News automation (€200 setup + €50/mese)
- Blog extra (€300/4 articoli)
- Calendar personalizzato studio (€150)

---

## Tier Intermedio — €1.500–2.200 (250 ore)

**Per chi**: Studio 4-8 commercialisti, gestione clienti centralizzata, compliance documentale.

### Incluso (Base + )
- Portale clienti autenticato
  - Documenti: caricamento organizzato (dichiarazioni, bilancini, modelli)
  - Modelli scaricare template: F24, RUI, CUD, 770
  - Storico dichiarazioni (2024, 2025, archivio)
  - Stato elaborazione dichiarazione in tempo reale (bozza → ultimata → trasmessa)
- Scadenziario fiscale intelligente
  - Alert notifiche 2 settimane prima (IVA mensi, F24, dichiarazioni periodiche)
  - Customizzabile per profilo cliente (PMI vs persona fisica vs libero professionista)
  - Calendar sync Google Workspace + Outlook
  - SMS reminder 3gg prima
- Upload documenti + OCR
  - Scannerizza ricevute/fatture → OCR estrae data/importo/fornitore
  - Classificazione automatica (costo materiale, affitti, consulenze)
  - Tag intelligente per ricerca (anno, tipo costo)
- F24 builder
  - Form semi-auto: inserisci importi imposte → genera F24 stampabile/PEC
  - Calcolo automatico interessi/sanzioni
  - Storico versamenti versati
- IVA ricalc
  - Carica fatture attive/passive → dashboard IVA liquidazione automatica
  - Esportazione riepilogativa (allegati A/B per dichiarazione)
- 730 preview
  - Genera anteprima dichiarazione 730 da dati caricati
  - Calcolo detrazioni automatico (figli, mutuo, donazioni)
  - Export PDF scaricabile pre-sottoscrizione
- Comunicazioni tracciate
  - Log accessi commercialista a dati cliente (audit trail)
  - Attestazione "dichiarazione comunicata al cliente [data]"
- Pagamenti Stripe
  - Depositi anticipati dichiarazioni (es. 730 € 150 pre-trattamento)
  - Rateizzazione consulenze multiennali
  - Ricevute PDF automatiche
- Dashboard redditività studio
  - Clienti per specializzazione (quanti 730, quanti bilanci)
  - Revenue per servizio (margine lordo 730, bilanci)
  - Tempo medio per pratica
- Template lettere standard
  - Comunicazioni conformi Privacy (informativa)
  - Lettere impegni tariffari, attestati
- Multi-lingua IT/EN
- SEO avanzato (hreflang, JSON-LD Service)

### NON incluso
- Integrazione diretta Agenzia Entrate
- AI tax savings advisor
- Firma digitale
- ML classificazione avanzata
- Analytics predittive

### Manutenzione
**€100/mese**: gestione portale, OCR tuning, compliance updates.

### Add-on
- Firma digitale CNF (€500 setup + €60/mese)
- OCR avanzato per ricevute complesse (€100/mese)
- Traduzioni lingue extra (€200 lingua)
- SMS reminder premium (€30/mese + €0.05/SMS)

---

## Tier Avanzato — €4.000–6.000 (500 ore)

**Per chi**: Network studi, compliance rigorose, AI optimization detrazioni/risparmi, scegli KPI redditività.

### Incluso (Base + Intermedio + )
- AI Tax Savings Advisor (RAG Ollama on-prem locale)
  - Analizza profilo cliente (tipologia, redditi, spese) → suggerisce deduzioni dimenticate
  - Confronta riporti perdite anni precedenti vs anno corrente
  - Scenario planning: "se apro ditta, quali deduzioni cambiano?"
  - Context sorgenti: Agenzia Entrate circolari, giurisprudenza tributaria, CNDG linee guida
  - Modello llama3.1:8b (privacy zero cloud, dati su VPS studio)
- Dashboard analitiche avanzate
  - Trend fatturato per cliente (YoY) → early warning clienti a rischio
  - AT RISK clients: profili in calo, possibili audit AdE incoming
  - Marginalità per NACE: quale settore cliente è più redditizio per studio
  - Cashflow forecast (quando incassi versamenti, scadenze prossime)
  - KPI produttività: ore medie per dichiarazione, clienti per commercialista
- Integrazione Agenzia Entrate API (UNIEMENS + versamenti + comunicazioni)
  - Scarica data versamenti F24 reali (non dichiarati)
  - Dati UNIEMENS per liberi professionisti con dipendenti
  - Notifiche di riscossione in sospeso
  - Verifica CodiceFiscale, match dichiarazioni AdE
  - Compliance: log accessi API, consent GDPR per collegamento
- Firma digitale CNF + timestamp
  - Documenti sottoscritti 24/7
  - Archiviazione conforme CNDG (14 anni)
  - Ricevute di sottoscrizione trasmissibili
- ML classificazione fatture automatica
  - Analizza fatture caricate (descrizione, fornitore) → predice voce costo (materiale/servizi/affitti/utilities)
  - Training su precedenti classificazioni studio
  - Accuracy >95% dopo 3 mesi dati
- Preventivatore intelligente
  - Profilo cliente (PMI fatturato X, ha dipendenti, settore Y) → calcolo automatico tariffe 730/770/IVA
  - Genera PDF preventivo con parcella, note conformi
  - Opzione rateizzazione Stripe inclusa
- Report PDF auto-generati
  - Dichiarazione 730 + allegati A/B da dati sistema
  - Riepilogativo IVA annuale + documentale
  - Certificazione CoD (coordinamento dati) firmabile
- Search full-text
- Backup geo-redundato

### NON incluso
- Integrazione Cassazione/GIUR.IT
- Custom ML per deduzioni specifiche settore (consulting esterno)
- Whitepaper fiscal strategy (advisory esterno)

### Manutenzione
**€200/mese**: AI model tuning, API AgID compliance, 24/5 support.

### Add-on
- AI custom-training su clientela storica (€1.500 una tantum)
- Branded mobile app (€2.000 setup)
- Advanced analytics enterprise (€150/mese)
- Integration Visura CCIAA real-time (€400 setup + €50/mese)

---

## Confronto Tier

| Feature | Base | Intermedio | Avanzato |
|---------|------|-----------|----------|
| Servizi showcase | ✓ | ✓ | ✓ |
| News compliance auto | ✓ | ✓ | ✓ |
| Portale clienti | – | ✓ | ✓ |
| Documenti upload+OCR | – | ✓ | ✓ |
| Scadenziario intelligente | – | ✓ | ✓ |
| F24 builder | – | ✓ | ✓ |
| IVA ricalc | – | ✓ | ✓ |
| 730 preview | – | ✓ | ✓ |
| Pagamenti Stripe | – | ✓ | ✓ |
| Dashboard redditività | – | ✓ | ✓ |
| AI Tax Savings Advisor | – | – | ✓ |
| Analytics avanzate | – | – | ✓ |
| AgID API integration | – | – | ✓ |
| Firma digitale | – | opt-in | ✓ incl. |
| ML classificazione | – | – | ✓ |
| Preventivatore | – | – | ✓ |
| Report auto-generati | – | – | ✓ |
| Manutenzione/mese | €50 | €100 | €200 |

---

## Implementation Timeline

- **Base**: 2-3 settimane
- **Intermedio**: 5-7 settimane (portale, Stripe, OCR)
- **Avanzato**: 10-12 settimane (AI training, AgID API, firma digitale)

## Success Metrics

- Tier Base: local search clicks +20-30%
- Tier Intermedio: portale adoption 50%+ clienti, efficiency +25%
- Tier Avanzato: AI suggestions adoption 30%+, tax savings €2k-5k/cliente/anno
