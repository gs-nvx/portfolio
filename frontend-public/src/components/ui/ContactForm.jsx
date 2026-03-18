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

  const set = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    clearError(field);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
        <p className="text-sm" style={{ color: "#7a1a1a" }}>
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
