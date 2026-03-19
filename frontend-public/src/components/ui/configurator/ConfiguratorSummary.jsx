import { useState } from "react";
import { sendContactForm } from "../../../api/cmsApi";
import ValidatedInput from "../ValidatedInput";
import { useFormValidation } from "../../../hooks/useFormValidation";

export default function ConfiguratorSummary({
  selectedPackage,
  selectedAddOns,
  allServices,
}) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    nome: "",
    azienda: "",
    email: "",
    telefono: "",
    messaggio: "",
  });
  const [status, setStatus] = useState(null);

  const discountSetup = selectedPackage?.offerEnabled
    ? selectedPackage.offerDiscountSetup || 0
    : 0;
  const discountMonthly = selectedPackage?.offerEnabled
    ? selectedPackage.offerDiscountMonthly || 0
    : 0;

  const baseSetup = (selectedPackage?.setupAmount || 0) - discountSetup;
  const baseMonthly = (selectedPackage?.monthlyAmount || 0) - discountMonthly;
  const extrasSetup = selectedAddOns.reduce((acc, s) => acc + s.setupAmount, 0);
  const extrasMonthly = selectedAddOns.reduce(
    (acc, s) => acc + s.monthlyAmount,
    0,
  );
  const totalSetup = baseSetup + extrasSetup;
  const totalMonthly = baseMonthly + extrasMonthly;
  const [consenso, setConsenso] = useState(false);
  const [consensoError, setConsensoError] = useState(false);

  const RULES = [
    { field: "nome", required: true },
    { field: "azienda", required: true },
    { field: "email", required: true, type: "email" },
  ];
  const { errors, validate, clearError } = useFormValidation(RULES);

  const set = (f) => (e) =>
    setForm((prev) => ({ ...prev, [f]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!consenso) {
      setConsensoError(true);
      return;
    }

    if (!validate(form)) return;
    setStatus("loading");

    const technicalData = {
      pacchetto: selectedPackage?.name,
      tipoAttivita: selectedPackage?.activityType,
      addOn: selectedAddOns.map((s) => s.clientLabel || s.name),
      totaleSetup: totalSetup,
      totaleMensile: totalMonthly,
    };

    try {
      await sendContactForm({
        nome: form.nome,
        email: form.email,
        messaggio: `
Attività: ${form.azienda}
Telefono: ${form.telefono}
${form.messaggio ? `Messaggio: ${form.messaggio}` : ""}

--- Configurazione richiesta ---
Pacchetto: ${technicalData.pacchetto}
Add-on: ${technicalData.addOn.join(", ") || "nessuno"}
Setup totale: €${technicalData.totaleSetup}
Canone mensile: €${technicalData.totaleMensile}/mese
        `.trim(),
      });
      setStatus("ok");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div
      className="rounded-xl p-5 sticky top-20"
      style={{
        background: "#ffffff",
        border: "0.5px solid #dceae5",
        maxHeight: "calc(100vh - 6rem)", // altezza massima = viewport meno navbar
        overflowY: "auto",
      }}
    >
      <p
        className="text-xs uppercase tracking-widest mb-4"
        style={{ color: "#8ab8a8", fontFamily: "'DM Mono', monospace" }}
      >
        Riepilogo
      </p>

      {!selectedPackage ? (
        <p className="text-sm" style={{ color: "#8ab8a8" }}>
          Seleziona un tipo di attività per iniziare
        </p>
      ) : (
        <>
          {/* Pacchetto */}
          <div
            className="mb-3 pb-3"
            style={{ borderBottom: "0.5px solid #dceae5" }}
          >
            <p className="text-sm font-medium" style={{ color: "#152820" }}>
              {selectedPackage.name}
            </p>
            {selectedPackage.offerEnabled && selectedPackage.offerLabel && (
              <span
                className="text-[9px] px-2 py-0.5 rounded-full mt-1 inline-block"
                style={{
                  background: "#e8f5f0",
                  color: "#0b7a5a",
                  fontFamily: "'DM Mono', monospace",
                }}
              >
                {selectedPackage.offerLabel}
              </span>
            )}
            <div className="flex justify-between mt-2">
              <span className="text-xs" style={{ color: "#5e7d68" }}>
                Setup base
              </span>
              <span
                className="text-xs font-medium"
                style={{ color: "#8ab8a8" }}
              >
                €{baseSetup}
              </span>
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-xs" style={{ color: "#5e7d68" }}>
                Canone base
              </span>
              <span
                className="text-xs font-medium"
                style={{ color: "#0f9e7e" }}
              >
                €{baseMonthly}/mese
              </span>
            </div>
          </div>

          {/* Add-on */}
          {selectedAddOns.length > 0 && (
            <div
              className="mb-3 pb-3"
              style={{ borderBottom: "0.5px solid #dceae5" }}
            >
              {selectedAddOns.map((s) => (
                <div
                  key={s.id}
                  className="flex justify-between items-start mb-1"
                >
                  <p
                    className="text-xs"
                    style={{ color: "#6b7d69", maxWidth: "60%" }}
                  >
                    {s.clientLabel || s.name}
                  </p>
                  <div className="text-right">
                    {s.setupAmount > 0 && (
                      <p className="text-xs" style={{ color: "#8ab8a8" }}>
                        +€{s.setupAmount}
                      </p>
                    )}
                    {s.monthlyAmount > 0 && (
                      <p className="text-xs" style={{ color: "#0f9e7e" }}>
                        +€{s.monthlyAmount}/mese
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Totali */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs" style={{ color: "#5e7d68" }}>
                Setup totale
              </span>
              <span
                className="text-sm font-medium"
                style={{ color: "#8ab8a8" }}
              >
                €{totalSetup}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs" style={{ color: "#5e7d68" }}>
                Canone mensile
              </span>
              <span
                className="text-xl font-semibold"
                style={{ color: "#0f9e7e", letterSpacing: "-0.02em" }}
              >
                €{totalMonthly}
                <span
                  className="text-xs font-light ml-1"
                  style={{ color: "#0f9e7e" }}
                >
                  /mese
                </span>
              </span>
            </div>
          </div>

          {/* CTA */}
          {!showForm ? (
            <button
              onClick={() => setShowForm(true)}
              className="w-full py-3 rounded-lg text-sm font-medium transition"
              style={{
                background: "#0f9e7e",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              Richiedi un preventivo
            </button>
          ) : (
            <form
              onSubmit={handleSubmit}
              noValidate
              className="flex flex-col gap-3"
            >
              {[
                { f: "nome", p: "Nome *", t: "text" },
                { f: "azienda", p: "Nome attività *", t: "text" },
                { f: "email", p: "Email *", t: "email" },
                { f: "telefono", p: "Telefono", t: "tel" },
              ].map(({ f, p, t }) => (
                <ValidatedInput
                  key={f}
                  type={t}
                  placeholder={p}
                  value={form[f]}
                  onChange={(e) => {
                    setForm((prev) => ({ ...prev, [f]: e.target.value }));
                    clearError(f);
                  }}
                  error={errors[f]}
                />
              ))}
              <ValidatedInput
                multiline
                rows={3}
                placeholder="Messaggio (opzionale)"
                value={form.messaggio}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, messaggio: e.target.value }))
                }
              />
              {status === "ok" && (
                <p className="text-xs" style={{ color: "#0b7a5a" }}>
                  Messaggio inviato! Ti risponderò presto.
                </p>
              )}
              {status === "error" && (
                <p className="text-xs" style={{ color: "#e24b4a" }}>
                  Errore nell'invio. Riprova.
                </p>
              )}
              <div className="flex flex-col gap-1">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={consenso}
                    onChange={(e) => {
                      setConsenso(e.target.checked);
                      setConsensoError(false);
                    }}
                    style={{
                      marginTop: "3px",
                      accentColor: "#0b7a5a",
                      cursor: "pointer",
                    }}
                  />
                  <span
                    style={{
                      fontSize: "12px",
                      color: "#5a8a7a",
                      lineHeight: 1.6,
                    }}
                  >
                    Ho letto e accetto la{" "}
                    <a
                      href="https://www.iubenda.com/privacy-policy/XXXXXXX"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: "#0b7a5a",
                        textDecoration: "underline",
                      }}
                    >
                      Privacy Policy
                    </a>{" "}
                    e acconsento al trattamento dei miei dati personali.
                  </span>
                </label>
                {consensoError && (
                  <span
                    style={{
                      fontSize: "11px",
                      color: "#7a1a1a",
                      fontFamily: "'DM Mono', monospace",
                    }}
                  >
                    Devi accettare la privacy policy per inviare il messaggio
                  </span>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 py-2 rounded-lg text-xs transition"
                  style={{
                    background: "#fff",
                    border: "0.5px solid #dceae5",
                    color: "#5a8a7a",
                    cursor: "pointer",
                  }}
                >
                  Annulla
                </button>
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="flex-1 py-2 rounded-lg text-xs font-medium transition disabled:opacity-50"
                  style={{
                    background: "#0b7a5a",
                    color: "#fff",
                    cursor: "pointer",
                  }}
                >
                  {status === "loading" ? "..." : "Invia"}
                </button>
              </div>
            </form>
          )}
        </>
      )}
    </div>
  );
}
