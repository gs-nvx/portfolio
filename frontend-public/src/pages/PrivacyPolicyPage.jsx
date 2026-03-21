import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function PrivacyPolicyPage() {
  useEffect(() => {
    document.title = "Privacy Policy — GST Code Lab";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ background: "#ffffff" }} className="pt-14 min-h-screen">
      <div
        style={{
          maxWidth: "720px",
          margin: "0 auto",
          padding: "3rem 1.5rem 5rem",
          fontFamily: "Georgia, serif",
          lineHeight: 1.8,
          color: "#1c2e24",
        }}
      >
        <Link
          to="/"
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "12px",
            color: "#0f9e7e",
            textDecoration: "none",
            display: "inline-block",
            marginBottom: "2rem",
          }}
        >
          ← Home
        </Link>

        <p
          style={{
            fontSize: "12px",
            color: "#5e7d68",
            fontFamily: "'DM Mono', monospace",
            marginBottom: "0.5rem",
          }}
        >
          Ultimo aggiornamento: 21 marzo 2026
        </p>
        <h1
          style={{
            fontSize: "28px",
            fontWeight: 700,
            marginBottom: "0.5rem",
            fontFamily: "'Outfit', sans-serif",
          }}
        >
          Privacy Policy
        </h1>
        <p style={{ fontSize: "15px", color: "#5e7d68", marginBottom: "3rem" }}>
          Informativa sul trattamento dei dati personali ai sensi degli artt. 13
          e 14 del Regolamento UE 2016/679 (GDPR).
        </p>

        <hr
          style={{
            border: "none",
            borderTop: "0.5px solid #d0dcd2",
            marginBottom: "3rem",
          }}
        />

        {/* 1 */}
        <section style={{ marginBottom: "2.5rem" }}>
          <h2 style={h2}>1. Titolare del trattamento</h2>
          <p style={p}>
            Il titolare del trattamento dei dati personali raccolti tramite
            questo sito è:
          </p>
          <p
            style={{
              ...p,
              paddingLeft: "1rem",
              borderLeft: "2px solid #c2d0c5",
            }}
          >
            <strong>Gioele Stropeni</strong>
            <br />
            Email:{" "}
            <a href="mailto:info@gstcodelab.it" style={link}>
              info@gstcodelab.it
            </a>
          </p>
          <p style={note}>
            Nota: questo sito è attualmente gestito a titolo personale.
            All'eventuale apertura di una posizione IVA, la presente informativa
            sarà aggiornata con i dati della ragione sociale.
          </p>
        </section>

        {/* 2 */}
        <section style={{ marginBottom: "2.5rem" }}>
          <h2 style={h2}>2. Dati raccolti e finalità</h2>
          <p style={p}>
            I dati personali raccolti da questo sito provengono da due fonti:
          </p>
          <ul style={ul}>
            <li>
              <strong>Modulo di contatto</strong> — nome, indirizzo email,
              messaggio libero.
            </li>
            <li>
              <strong>Configuratore pacchetti</strong> — nome, nome
              dell'attività, indirizzo email, numero di telefono (opzionale),
              messaggio libero, oltre ai dati tecnici della configurazione
              selezionata (tipo di pacchetto, servizi aggiuntivi, stima dei
              costi).
            </li>
          </ul>
          <p style={p}>I dati vengono trattati esclusivamente per:</p>
          <ul style={ul}>
            <li>
              <strong>Rispondere alla richiesta</strong> — base giuridica:
              esecuzione di misure precontrattuali su richiesta dell'interessato
              (art. 6 par. 1 lett. b GDPR).
            </li>
            <li>
              <strong>Conservare lo storico delle comunicazioni</strong> — base
              giuridica: legittimo interesse del titolare (art. 6 par. 1 lett. f
              GDPR), nei limiti di quanto necessario.
            </li>
          </ul>
          <p style={p}>
            Non viene effettuata alcuna profilazione, né i dati vengono
            utilizzati per finalità di marketing.
          </p>
        </section>

        {/* 3 */}
        <section style={{ marginBottom: "2.5rem" }}>
          <h2 style={h2}>3. Modalità di trattamento e conservazione</h2>
          <p style={p}>
            I dati sono trattati con strumenti informatici e conservati su
            server situati nell'Unione Europea (provider{" "}
            <strong>Hetzner Online GmbH</strong>, Germania —{" "}
            <a
              href="https://www.hetzner.com/legal/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              style={link}
            >
              Privacy Policy Hetzner
            </a>
            ).
          </p>
          <p style={p}>
            I dati non vengono ceduti, venduti o comunicati a terzi, salvo
            obblighi di legge.
          </p>
          <p style={p}>
            I messaggi ricevuti via form vengono conservati per un periodo
            massimo di <strong>2 anni</strong> dall'ultimo contatto, dopodiché
            vengono eliminati.
          </p>
        </section>

        {/* 4 */}
        <section style={{ marginBottom: "2.5rem" }}>
          <h2 style={h2}>4. Servizi di terze parti</h2>
          <p style={p}>
            Il modulo di contatto utilizza il servizio anti-spam{" "}
            <strong>hCaptcha</strong>, fornito da Intuition Machines, Inc.
            (USA). hCaptcha può raccogliere dati tecnici (indirizzo IP, browser,
            comportamento di interazione) per verificare che il mittente sia un
            essere umano.
          </p>
          <p style={p}>
            Per maggiori informazioni sul trattamento dei dati da parte di
            hCaptcha:
          </p>
          <ul style={ul}>
            <li>
              <a
                href="https://www.hcaptcha.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                style={link}
              >
                Privacy Policy hCaptcha
              </a>
            </li>
            <li>
              <a
                href="https://www.hcaptcha.com/terms"
                target="_blank"
                rel="noopener noreferrer"
                style={link}
              >
                Termini di servizio hCaptcha
              </a>
            </li>
          </ul>
        </section>

        {/* 5 */}
        <section style={{ marginBottom: "2.5rem" }}>
          <h2 style={h2}>5. Cookie</h2>
          <p style={p}>
            Questo sito utilizza esclusivamente <strong>cookie tecnici</strong>,
            necessari al funzionamento del sito stesso. Non vengono utilizzati
            cookie di profilazione, cookie di tracciamento o cookie di terze
            parti a fini pubblicitari.
          </p>
          <p style={p}>I cookie tecnici presenti sono:</p>
          <ul style={ul}>
            <li>
              <strong>Cookie di sessione</strong> — temporanei, eliminati alla
              chiusura del browser, necessari per il corretto funzionamento
              della navigazione.
            </li>
            <li>
              <strong>Cookie tecnici hCaptcha</strong> — utilizzati
              esclusivamente per il funzionamento del sistema anti-spam nel
              modulo di contatto.
            </li>
            <li>
              <strong>Cookie di preferenza</strong> — memorizzano scelte
              dell'utente (es. chiusura dell'avviso cookie), senza raccogliere
              dati personali.
            </li>
          </ul>
          <p style={p}>
            In conformità al Provvedimento del Garante Privacy dell'8 maggio
            2014 e alle Linee guida cookie del 10 giugno 2021, per i soli cookie
            tecnici <strong>non è richiesto il consenso dell'utente</strong>.
          </p>
        </section>

        {/* 6 */}
        <section style={{ marginBottom: "2.5rem" }}>
          <h2 style={h2}>6. Diritti dell'interessato</h2>
          <p style={p}>
            Ai sensi degli artt. 15–22 del GDPR, l'interessato ha il diritto di:
          </p>
          <ul style={ul}>
            <li>
              <strong>Accesso</strong> (art. 15) — ottenere conferma del
              trattamento e copia dei dati.
            </li>
            <li>
              <strong>Rettifica</strong> (art. 16) — correggere dati inesatti o
              incompleti.
            </li>
            <li>
              <strong>Cancellazione</strong> (art. 17) — ottenere la
              cancellazione dei dati ("diritto all'oblio").
            </li>
            <li>
              <strong>Opposizione</strong> (art. 21) — opporsi al trattamento
              basato su legittimo interesse.
            </li>
          </ul>
          <p style={p}>
            Le richieste possono essere inviate a{" "}
            <a href="mailto:info@gstcodelab.it" style={link}>
              info@gstcodelab.it
            </a>
            . Il titolare risponderà entro <strong>30 giorni</strong> dalla
            ricezione.
          </p>
          <p style={p}>
            È inoltre possibile proporre reclamo all'Autorità Garante per la
            protezione dei dati personali:{" "}
            <a
              href="https://www.garanteprivacy.it"
              target="_blank"
              rel="noopener noreferrer"
              style={link}
            >
              garanteprivacy.it
            </a>
            .
          </p>
        </section>

        {/* 7 */}
        <section style={{ marginBottom: "2.5rem" }}>
          <h2 style={h2}>7. Modifiche alla presente informativa</h2>
          <p style={p}>
            Il titolare si riserva il diritto di modificare la presente
            informativa in qualsiasi momento, in particolare in caso di
            variazioni normative o di aggiornamento dei servizi utilizzati. La
            data di ultimo aggiornamento è indicata in cima alla pagina. Si
            consiglia di consultare periodicamente questa pagina.
          </p>
        </section>

        <hr
          style={{
            border: "none",
            borderTop: "0.5px solid #d0dcd2",
            marginTop: "3rem",
            marginBottom: "2rem",
          }}
        />
        <p
          style={{
            fontSize: "12px",
            color: "#5e7d68",
            fontFamily: "'DM Mono', monospace",
          }}
        >
          GST Code Lab — gstcodelab.com
        </p>
      </div>
    </div>
  );
}

const h2 = {
  fontSize: "18px",
  fontWeight: 700,
  marginBottom: "1rem",
  marginTop: 0,
  fontFamily: "'Outfit', sans-serif",
  color: "#1c2e24",
};
const p = {
  fontSize: "15px",
  marginBottom: "1rem",
  marginTop: 0,
  color: "#3d5c47",
};
const ul = {
  fontSize: "15px",
  color: "#3d5c47",
  marginBottom: "1rem",
  paddingLeft: "1.5rem",
  lineHeight: 1.9,
};
const link = {
  color: "#0f9e7e",
  textDecoration: "underline",
};
const note = {
  fontSize: "13px",
  color: "#5e7d68",
  fontStyle: "italic",
  background: "#f2f5f3",
  padding: "0.75rem 1rem",
  borderRadius: "8px",
  marginTop: "1rem",
};
