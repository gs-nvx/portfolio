export default function AddOnCard({ addon, selected, onToggle }) {
  return (
    <div
      onClick={onToggle}
      className="rounded-xl p-4 flex items-start gap-3 transition cursor-pointer"
      style={{
        background: selected ? "#e8f5f0" : "#ffffff",
        border: selected ? "1.5px solid #0f9e7e" : "0.5px solid #dceae5",
      }}
    >
      {/* Checkbox */}
      <div
        className="mt-0.5 w-4 h-4 rounded flex-shrink-0 flex items-center justify-center"
        style={{
          background: selected ? "#0f9e7e" : "#f2f5f3",
          border: selected ? "none" : "0.5px solid #dceae5",
          marginTop: "2px",
        }}
      >
        {selected && (
          <span style={{ color: "#fff", fontSize: "10px", lineHeight: 1 }}>
            ✓
          </span>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm font-medium" style={{ color: "#1c2e24" }}>
            {addon.clientLabel || addon.name}
          </p>
          <div className="text-right flex-shrink-0">
            {addon.setupAmount > 0 && (
              <p className="text-xs" style={{ color: "#8ab8a8" }}>
                +€{addon.setupAmount}
              </p>
            )}
            {addon.monthlyAmount > 0 && (
              <p className="text-xs font-medium" style={{ color: "#0f9e7e" }}>
                +€{addon.monthlyAmount}/mese
              </p>
            )}
            {addon.setupAmount === 0 && addon.monthlyAmount === 0 && (
              <p className="text-xs" style={{ color: "#0b7a5a" }}>
                incluso
              </p>
            )}
          </div>
        </div>
        {addon.clientDescription && (
          <p className="text-xs mt-0.5" style={{ color: "#5a8a7a" }}>
            {addon.clientDescription}
          </p>
        )}
        {addon.exclusiveGroup && (
          <p className="text-xs mt-1 italic" style={{ color: "#8ab8a8" }}>
            Alternativo ad altri servizi SEO
          </p>
        )}
      </div>
    </div>
  );
}
