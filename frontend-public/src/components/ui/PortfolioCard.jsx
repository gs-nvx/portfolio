export default function PortfolioCard({ caso, showLink = false, onInfoClick }) {
  const isOnline = caso.stato === "online";

  return (
    <div
      className="rounded-xl overflow-hidden flex flex-col"
      style={{ background: "#ffffff", border: "1.5px solid #d4d9d2" }}
    >
      {/* Immagine */}
      {caso.immagine ? (
        <img
          src={caso.immagine}
          alt={caso.titolo}
          className="w-full h-44 object-cover"
        />
      ) : (
        <div
          className="w-full h-44 flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, #e8f5f0, #c8ead8)" }}
        >
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "10px",
              color: "#5e7d68",
              opacity: 0.5,
            }}
          >
            {caso.tag}
          </span>
        </div>
      )}

      <div className="p-5 flex flex-col gap-3 flex-1">
        {/* Tag + Stato */}
        <div className="flex items-center gap-2 flex-wrap">
          {caso.tag && (
            <span
              className="text-[10px] px-2 py-1 rounded-full"
              style={{ background: "#0f9e7e", color: "#ffffff" }}
            >
              {caso.tag}
            </span>
          )}
          <span
            className="text-[10px] px-2 py-1 rounded-full"
            style={{
              background: isOnline ? "#34d5a8" : "#e8eee9",
              color: isOnline ? "#ffffff" : "#34d5a8",
              border: `0.5px solid ${isOnline ? "#c2d0c5" : "#34d5a8"}`,
            }}
          >
            {isOnline ? "● online" : "◌ work in progress"}
          </span>
        </div>

        {/* Descrizione */}
        <p
          className="text-sm leading-relaxed flex-1"
          style={{ color: "#5e7d68", fontWeight: 300 }}
        >
          {caso.descrizione}
        </p>

        {/* Link info — solo se online e showLink=true */}
        {showLink && isOnline && (
          <div className="flex justify-end">
            <button
              onClick={() => onInfoClick(caso)}
              className="text-xs transition"
              style={{
                color: "#0f9e7e",
                fontFamily: "'DM Mono', monospace",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              info →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
