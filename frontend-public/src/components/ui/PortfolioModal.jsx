import { useEffect } from "react";

export default function PortfolioModal({ caso, onClose }) {
  useEffect(() => {
    if (!caso) return;
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [caso, onClose]);

  useEffect(() => {
    if (!caso) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [caso]);

  if (!caso) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: "rgba(14,21,32,0.8)" }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-2xl overflow-hidden"
        style={{
          background: "#ffffff",
          border: "0.5px solid #dceae5",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Immagine */}
        {caso.immagine ? (
          <img
            src={caso.immagine}
            alt={caso.titolo}
            className="w-full h-52 object-cover"
          />
        ) : (
          <div
            className="w-full h-52 flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #e8f5f0, #c8ead8)" }}
          />
        )}

        <div className="p-6 flex flex-col gap-4">
          {/* Intestazione */}
          <div>
            <h2
              className="text-xl font-medium"
              style={{ color: "#152820", letterSpacing: "-0.02em" }}
            >
              {caso.titolo}
            </h2>
            <p
              className="text-sm mt-1"
              style={{
                color: "#0b7a5a",
                fontFamily: "'DM Mono', monospace",
                fontSize: "11px",
              }}
            >
              {caso.tag}
            </p>
          </div>

          {/* Testo dettaglio */}
          {caso.testo_dettaglio && (
            <p
              className="text-sm leading-relaxed"
              style={{ color: "#5a8a7a", fontWeight: 300 }}
            >
              {caso.testo_dettaglio}
            </p>
          )}

          {/* Footer modale */}
          <div
            className="flex items-center justify-between pt-2"
            style={{ borderTop: "0.5px solid #dceae5" }}
          >
            {caso.link_esterno ? (
              <a
                href={caso.link_esterno}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium transition hover:opacity-70"
                style={{ color: "#0f9e7e" }}
              >
                Visita il sito →
              </a>
            ) : (
              <span />
            )}
            <button
              onClick={onClose}
              className="text-xs transition"
              style={{
                color: "#8ab8a8",
                fontFamily: "'DM Mono', monospace",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              chiudi ✕
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
