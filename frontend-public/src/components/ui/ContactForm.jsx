import { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { sendContactForm } from "../../api/cmsApi";
import ValidatedInput from "./ValidatedInput";
import { useFormValidation } from "../../hooks/useFormValidation";

const RULES = [
  { field: "nome", required: true },
  { field: "email", required: true, type: "email" },
  { field: "messaggio", required: true },
];

const HCAPTCHA_SITEKEY = import.meta.env.VITE_HCAPTCHA_SITE_KEY;

export default function ContactForm() {
  const { t } = useTranslation();
  const [form, setForm] = useState({ nome: "", email: "", messaggio: "" });
  const [status, setStatus] = useState(null);
  const [consenso, setConsenso] = useState(false);
  const [consensoError, setConsensoError] = useState(false);
  const [captchaToken, setCaptchaToken] = useState(null);
  const [captchaError, setCaptchaError] = useState(false);
  const captchaRef = useRef(null);
  const { errors, validate, clearError } = useFormValidation(RULES);
  const [website, setWebsite] = useState("");

  const set = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    clearError(field);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let hasError = false;

    if (!consenso) {
      setConsensoError(true);
      hasError = true;
    }
    if (!captchaToken) {
      setCaptchaError(true);
      hasError = true;
    }
    if (!validate(form)) hasError = true;
    if (hasError) return;

    setStatus("loading");
    try {
      await sendContactForm({ ...form, website, captchaToken });
      setStatus("ok");
      setForm({ nome: "", email: "", messaggio: "" });
      setConsenso(false);
      setCaptchaToken(null);
      captchaRef.current?.resetCaptcha();
    } catch {
      setStatus("error");
      captchaRef.current?.resetCaptcha();
      setCaptchaToken(null);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3">
      {/* Honeypot — non toccare */}
      <input
        type="text"
        name="website"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        style={{
          position: "absolute",
          left: "-9999px",
          opacity: 0,
          height: 0,
          width: 0,
        }}
        tabIndex="-1"
        autoComplete="off"
      />
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

      {/* hCaptcha */}
      <div className="flex flex-col gap-1">
        <HCaptcha
          sitekey={HCAPTCHA_SITEKEY}
          onVerify={(token) => {
            setCaptchaToken(token);
            setCaptchaError(false);
          }}
          onExpire={() => setCaptchaToken(null)}
          ref={captchaRef}
          theme="light"
        />
        {captchaError && (
          <span
            style={{
              fontSize: "11px",
              color: "#7a1a1a",
              fontFamily: "'DM Mono', monospace",
            }}
          >
            Completa la verifica anti-spam
          </span>
        )}
      </div>

      {/* Consenso privacy */}
      <div className="flex flex-col gap-1">
        <label className="flex items-start gap-3" style={{ cursor: "pointer" }}>
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
              href="/privacy-policy"
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
              color: "#7a1a1a",
              fontFamily: "'DM Mono', monospace",
            }}
          >
            Devi accettare la privacy policy per inviare il messaggio
          </span>
        )}
      </div>

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
