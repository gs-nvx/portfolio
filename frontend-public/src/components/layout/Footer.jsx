import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer
      className="py-8 mt-16"
      style={{
        background: "#0a0f0d",
        borderTop: "0.5px solid #1a2e24",
      }}
    >
      <div
        className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row
        items-center justify-between gap-2"
      >
        <span className="text-sm" style={{ color: "#4d7060" }}>
          {t("footer.copy")}
        </span>
        <span
          className="text-sm"
          style={{
            color: "#4d7060",
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
