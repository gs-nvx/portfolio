import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer
      className="py-6"
      style={{
        background: "#0e1520",
        borderTop: "0.5px solid #1a2e3a",
      }}
    >
      <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
        <img
          src="/svg-logo.svg"
          alt="GST Code Lab"
          style={{ height: "28px", width: "auto", opacity: 0.85 }}
        />
        <span
          style={{
            color: "#34d5a8",
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
