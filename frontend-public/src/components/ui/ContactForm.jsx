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
        className="bg-[#161b22] text-white border border-gray-700
          rounded-lg px-4 py-3 text-sm outline-none
          focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
      />
      <input
        type="email"
        placeholder={t("contatti.email")}
        value={form.email}
        onChange={set("email")}
        required
        className="bg-[#161b22] text-white border border-gray-700
          rounded-lg px-4 py-3 text-sm outline-none
          focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
      />
      <textarea
        placeholder={t("contatti.messaggio")}
        value={form.messaggio}
        onChange={set("messaggio")}
        required
        rows={5}
        className="bg-[#161b22] text-white border border-gray-700
          rounded-lg px-4 py-3 text-sm outline-none resize-none
          focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
      />
      {status === "ok" && (
        <p className="text-teal-400 text-sm">{t("contatti.invio_ok")}</p>
      )}
      {status === "error" && (
        <p className="text-red-400 text-sm">{t("contatti.invio_errore")}</p>
      )}
      <button
        type="submit"
        disabled={status === "loading"}
        className="bg-teal-600 hover:bg-teal-500 text-white font-medium
          text-sm py-3 rounded-lg transition disabled:opacity-50"
      >
        {status === "loading" ? "..." : t("contatti.invia")}
      </button>
    </form>
  );
}
