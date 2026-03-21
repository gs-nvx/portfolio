import { useState } from "react";
import { Link } from "react-router-dom";

export default function CookieBanner({
  privacyPolicyPath = "/privacy-policy",
}) {
  const [visible, setVisible] = useState(
    () => !localStorage.getItem("cookie_notice_accepted"),
  );

  if (!visible) return null;

  const handleAccept = () => {
    localStorage.setItem("cookie_notice_accepted", "1");
    setVisible(false);
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: "1.5rem",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 1000,
        width: "calc(100% - 2rem)",
        maxWidth: "640px",
        background: "#0e1520",
        border: "0.5px solid #1a2e3a",
        borderRadius: "12px",
        padding: "1rem 1.25rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "1rem",
        boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
      }}
    >
      <p
        style={{
          fontSize: "12px",
          color: "#6e9aaa",
          margin: 0,
          lineHeight: 1.6,
          flex: 1,
        }}
      >
        Questo sito utilizza solo cookie tecnici necessari al funzionamento,
        inclusi quelli del servizio anti-spam hCaptcha. Nessun cookie di
        profilazione o tracciamento.{" "}
        <Link
          to={privacyPolicyPath}
          style={{
            color: "#34d5a8",
            textDecoration: "underline",
            whiteSpace: "nowrap",
          }}
        >
          Privacy Policy
        </Link>
      </p>
      <button
        onClick={handleAccept}
        style={{
          background: "#34d5a8",
          color: "#04281e",
          border: "none",
          borderRadius: "8px",
          padding: "8px 16px",
          fontSize: "12px",
          fontWeight: 500,
          cursor: "pointer",
          whiteSpace: "nowrap",
          flexShrink: 0,
          fontFamily: "'DM Mono', monospace",
        }}
      >
        Ho capito
      </button>
    </div>
  );
}
