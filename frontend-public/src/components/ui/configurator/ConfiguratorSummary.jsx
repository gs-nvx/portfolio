import { useState } from "react";
import { sendContactForm } from "../../../api/cmsApi";

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

  const set = (f) => (e) =>
    setForm((prev) => ({ ...prev, [f]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      style={{ background: "#f4f8f7", border: "0.5px solid #dceae5" }}
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
              <span className="text-xs" style={{ color: "#8ab8a8" }}>
                Setup base
              </span>
              <span
                className="text-xs font-medium"
                style={{ color: "#152820" }}
              >
                €{baseSetup}
              </span>
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-xs" style={{ color: "#8ab8a8" }}>
                Canone base
              </span>
              <span
                className="text-xs font-medium"
                style={{ color: "#0b7a5a" }}
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
                    style={{ color: "#5a8a7a", maxWidth: "60%" }}
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
                      <p className="text-xs" style={{ color: "#0b7a5a" }}>
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
              <span className="text-xs" style={{ color: "#8ab8a8" }}>
                Setup totale
              </span>
              <span
                className="text-sm font-medium"
                style={{ color: "#152820" }}
              >
                €{totalSetup}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs" style={{ color: "#8ab8a8" }}>
                Canone mensile
              </span>
              <span
                className="text-xl font-semibold"
                style={{ color: "#0b7a5a", letterSpacing: "-0.02em" }}
              >
                €{totalMonthly}
                <span
                  className="text-xs font-light ml-1"
                  style={{ color: "#8ab8a8" }}
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
              style={{ background: "#0b7a5a", color: "#fff" }}
            >
              Richiedi un preventivo
            </button>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              {[
                { f: "nome", p: "Nome *", t: "text", r: true },
                { f: "azienda", p: "Nome attività *", t: "text", r: true },
                { f: "email", p: "Email *", t: "email", r: true },
                { f: "telefono", p: "Telefono", t: "tel", r: false },
              ].map(({ f, p, t, r }) => (
                <input
                  key={f}
                  type={t}
                  placeholder={p}
                  required={r}
                  value={form[f]}
                  onChange={set(f)}
                  className="rounded-lg px-3 py-2 text-xs outline-none"
                  style={{
                    background: "#fff",
                    border: "0.5px solid #dceae5",
                    color: "#152820",
                  }}
                />
              ))}
              <textarea
                placeholder="Messaggio (opzionale)"
                rows={3}
                value={form.messaggio}
                onChange={set("messaggio")}
                className="rounded-lg px-3 py-2 text-xs outline-none resize-none"
                style={{
                  background: "#fff",
                  border: "0.5px solid #dceae5",
                  color: "#152820",
                }}
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
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 py-2 rounded-lg text-xs transition"
                  style={{
                    background: "#fff",
                    border: "0.5px solid #dceae5",
                    color: "#5a8a7a",
                  }}
                >
                  Annulla
                </button>
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="flex-1 py-2 rounded-lg text-xs font-medium transition disabled:opacity-50"
                  style={{ background: "#0b7a5a", color: "#fff" }}
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
