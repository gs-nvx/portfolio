import { useState } from "react";
import { useTranslation } from "react-i18next";
import { sendContactForm } from "../../api/cmsApi";

export default function ContactForm() {
  const { t } = useTranslation();
  const [form, setForm] = useState({ nome: "", email: "", messaggio: "" });
  const [status, setStatus] = useState(null); // 'ok' | 'error' | 'loading'

  const set = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
      <input
        type="text"
        placeholder={t("contatti.nome")}
        value={form.nome}
        onChange={set("nome")}
        required
        className="rounded-lg px-4 py-3 text-sm outline-none
          focus:ring-2 focus:ring-[#0b7a5a] focus:border-[#0b7a5a]
          placeholder-[#8ab8a8]"
        style={{
          background: "#ffffff",
          color: "#152820",
          border: "1px solid #dceae5",
        }}
      />
      <input
        type="email"
        placeholder={t("contatti.email")}
        value={form.email}
        onChange={set("email")}
        required
        className="rounded-lg px-4 py-3 text-sm outline-none
          focus:ring-2 focus:ring-[#0b7a5a] focus:border-[#0b7a5a]
          placeholder-[#8ab8a8]"
        style={{
          background: "#ffffff",
          color: "#152820",
          border: "1px solid #dceae5",
        }}
      />
      <textarea
        placeholder={t("contatti.messaggio")}
        value={form.messaggio}
        onChange={set("messaggio")}
        required
        rows={5}
        className="rounded-lg px-4 py-3 text-sm outline-none resize-none
          focus:ring-2 focus:ring-[#0b7a5a] focus:border-[#0b7a5a]
          placeholder-[#8ab8a8]"
        style={{
          background: "#ffffff",
          color: "#152820",
          border: "1px solid #dceae5",
        }}
      />
      {status === "ok" && (
        <p className="text-sm" style={{ color: "#0b7a5a" }}>
          {t("contatti.invio_ok")}
        </p>
      )}
      {status === "error" && (
        <p className="text-red-400 text-sm">{t("contatti.invio_errore")}</p>
      )}
      <button
        type="submit"
        disabled={status === "loading"}
        className="font-medium text-sm py-3 rounded-lg transition disabled:opacity-50"
        style={{ background: "#0b7a5a", color: "#ffffff" }}
      >
        {status === "loading" ? "..." : t("contatti.invia")}
      </button>
    </form>
  );
}
