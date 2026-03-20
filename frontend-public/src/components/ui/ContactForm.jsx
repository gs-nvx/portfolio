import { useState } from "react";
import { useTranslation } from "react-i18next";
import { sendContactForm } from "../../api/cmsApi";
import ValidatedInput from "./ValidatedInput";
import { useFormValidation } from "../../hooks/useFormValidation";

const RULES = [
  { field: "nome", required: true },
  { field: "email", required: true, type: "email" },
  { field: "messaggio", required: true },
];

export default function ContactForm() {
  const { t } = useTranslation();
  const [form, setForm] = useState({ nome: "", email: "", messaggio: "" });
  const [status, setStatus] = useState(null);
  const { errors, validate, clearError } = useFormValidation(RULES);
  const [consenso, setConsenso] = useState(false);
  const [consensoError, setConsensoError] = useState(false);

  const set = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    clearError(field);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!consenso) {
      setConsensoError(true);
      return;
    }
    if (!validate(form)) return;
    setStatus("loading");
    try {
      await sendContactForm(form);
      setStatus("ok");
      setForm({ nome: "", email: "", messaggio: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3">
      <ValidatedInput
        placeholder={t("contatti.nome")}
        value={form.nome}
        onChange={set("nome")}
        error={errors.nome}
      />
      <ValidatedInput
        type="email"
        placeholder={t("contatti.email")}
        value={form.email}
        onChange={set("email")}
        error={errors.email}
      />
      <ValidatedInput
        multiline
        rows={5}
        placeholder={t("contatti.messaggio")}
        value={form.messaggio}
        onChange={set("messaggio")}
        error={errors.messaggio}
      />
      {status === "ok" && (
        <p className="text-sm" style={{ color: "#0b7a5a" }}>
          {t("contatti.invio_ok")}
        </p>
      )}
      {status === "error" && (
        <p className="text-sm" style={{ color: "#db0f0f" }}>
          {t("contatti.invio_errore")}
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
          <span style={{ fontSize: "12px", color: "#5a8a7a", lineHeight: 1.6 }}>
            Ho letto e accetto la{" "}
            <a
              href="https://www.iubenda.com/privacy-policy/XXXXXXX"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#0b7a5a", textDecoration: "underline" }}
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
              color: "#db0f0f",
              fontFamily: "'DM Mono', monospace",
            }}
          >
            Devi accettare la privacy policy per inviare il messaggio
          </span>
        )}
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="py-3 rounded-lg text-sm font-medium transition disabled:opacity-50"
        style={{ background: "#0f9e7e", color: "#fff", cursor: "pointer" }}
      >
        {status === "loading" ? "..." : t("contatti.invia")}
      </button>
    </form>
  );
}
