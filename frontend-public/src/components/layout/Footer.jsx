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
      <div
        className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row
    items-center justify-between gap-3"
      >
        <img
          src="/svg-logo.svg"
          alt="GST Code Lab"
          style={{ height: "28px", width: "auto", opacity: 0.85 }}
        />
        <div className="flex items-center gap-4">
          <a
            href="https://www.iubenda.com/privacy-policy/XXXXXXX"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#0f9e7e",
              fontSize: "11px",
              fontFamily: "'DM Mono', monospace",
            }}
          >
            Privacy Policy
          </a>
          <a
            href="https://www.iubenda.com/privacy-policy/XXXXXXX/cookie-policy"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#0f9e7e",
              fontSize: "11px",
              fontFamily: "'DM Mono', monospace",
            }}
          >
            Cookie Policy
          </a>
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
      </div>
    </footer>
  );
}
