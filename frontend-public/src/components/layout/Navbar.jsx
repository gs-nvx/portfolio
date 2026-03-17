import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { to: "/", label: t("nav.home") },
    { to: "/servizi", label: t("nav.servizi") },
    { to: "/portfolio", label: t("nav.portfolio") },
    { to: "/chi-sono", label: t("nav.chi_sono") },
    { to: "/blog", label: t("nav.blog") },
  ];

  const toggleLang = () =>
    i18n.changeLanguage(i18n.language === "it" ? "en" : "it");

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur"
      style={{
        background: "rgba(10,15,13,0.92)",
        borderBottom: "0.5px solid #1a2e24",
      }}
    >
      <div
        className="max-w-5xl mx-auto px-6 h-14 flex items-center
        justify-between"
      >
        <Link to="/">
          <span
            className="text-sm text-white tracking-wide"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            GST <span style={{ color: "#2dd4a0" }}>Code Lab</span>
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              style={({ isActive }) => ({
                fontSize: "13px",
                color: isActive ? "#2dd4a0" : "#6b8f7d",
                textDecoration: "none",
                transition: "color 0.2s",
              })}
            >
              {item.label}
            </NavLink>
          ))}
          <button
            onClick={toggleLang}
            className="transition"
            style={{
              fontSize: "11px",
              color: "#4d7060",
              border: "0.5px solid #1a2e24",
              padding: "4px 10px",
              borderRadius: "6px",
              background: "transparent",
              fontFamily: "'DM Mono', monospace",
              cursor: "pointer",
            }}
          >
            {i18n.language === "it" ? "EN" : "IT"}
          </button>
          <Link
            to="/contatti"
            className="transition"
            style={{
              fontSize: "13px",
              fontWeight: 500,
              padding: "8px 18px",
              borderRadius: "8px",
              background: "#2dd4a0",
              color: "#062318",
              textDecoration: "none",
            }}
          >
            {t("nav.contatti")}
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden transition"
          style={{ color: "#6b8f7d" }}
          onClick={() => setMenuOpen((o) => !o)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden px-6 py-4 flex flex-col gap-3"
          style={{
            background: "#0a0f0d",
            borderTop: "0.5px solid #1a2e24",
          }}
        >
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              onClick={() => setMenuOpen(false)}
              style={({ isActive }) => ({
                fontSize: "13px",
                color: isActive ? "#2dd4a0" : "#6b8f7d",
                textDecoration: "none",
                padding: "4px 0",
              })}
            >
              {item.label}
            </NavLink>
          ))}
          <Link
            to="/contatti"
            onClick={() => setMenuOpen(false)}
            className="text-center mt-1"
            style={{
              fontSize: "13px",
              fontWeight: 500,
              padding: "10px",
              borderRadius: "8px",
              background: "#2dd4a0",
              color: "#062318",
              textDecoration: "none",
            }}
          >
            {t("nav.contatti")}
          </Link>
        </div>
      )}
    </nav>
  );
}
