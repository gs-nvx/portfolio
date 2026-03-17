import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer
      className="py-8 mt-16"
      style={{
        background: "#0e1520",
        borderTop: "0.5px solid #1a2e3a",
      }}
    >
      <div
        className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row
        items-center justify-between gap-2"
      >
        <span className="text-sm" style={{ color: "#6e9aaa" }}>
          {t("footer.copy")}
        </span>
        <span
          className="text-sm"
          style={{
            color: "#6e9aaa",
            fontFamily: "'DM Mono', monospace",
            fontSize: "11px",
          }}
        >
          {t("footer.piva")}
        </span>
      </div>
    </footer>
  );
}
