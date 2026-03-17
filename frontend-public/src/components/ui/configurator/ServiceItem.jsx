export default function ServiceItem({
  service,
  selected,
  available,
  locked,
  onToggle,
}) {
  return (
    <div
      onClick={!locked && available ? onToggle : undefined}
      className="rounded-xl p-4 flex items-start gap-3 transition"
      style={{
        background: selected ? "#0f2a1e" : "#0a0f0d",
        border: selected ? "1px solid #2dd4a0" : "0.5px solid #1a2e24",
        opacity: available || locked ? 1 : 0.4,
        cursor: locked ? "default" : available ? "pointer" : "not-allowed",
      }}
    >
      {/* Checkbox / badge incluso */}
      {locked ? (
        <div
          className="mt-0.5 px-2 py-0.5 rounded-full flex-shrink-0"
          style={{
            background: "#0f2a1e",
            border: "0.5px solid #2dd4a0",
          }}
        >
          <span
            style={{
              color: "#2dd4a0",
              fontSize: "9px",
              fontFamily: "'DM Mono', monospace",
              whiteSpace: "nowrap",
            }}
          >
            incluso
          </span>
        </div>
      ) : (
        <div
          className="mt-0.5 w-4 h-4 rounded flex-shrink-0 flex items-center justify-center"
          style={{
            background: selected ? "#2dd4a0" : "transparent",
            border: selected ? "1px solid #2dd4a0" : "0.5px solid #1a2e24",
          }}
        >
          {selected && (
            <span style={{ color: "#062318", fontSize: "10px", lineHeight: 1 }}>
              ✓
            </span>
          )}
        </div>
      )}

      {/* Contenuto */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <p
            className="text-sm font-medium"
            style={{ color: available || locked ? "#e2ede8" : "#4d7060" }}
          >
            {service.name}
          </p>
          <div className="text-right flex-shrink-0">
            {locked ? (
              <p className="text-xs" style={{ color: "#2dd4a0" }}>
                incluso
              </p>
            ) : (
              <>
                {service.setupAmount > 0 && (
                  <p className="text-xs" style={{ color: "#4d7060" }}>
                    +€{service.setupAmount} setup
                  </p>
                )}
                {service.monthlyAmount > 0 && (
                  <p className="text-xs" style={{ color: "#2dd4a0" }}>
                    +€{service.monthlyAmount}/mese
                  </p>
                )}
                {service.setupAmount === 0 && service.monthlyAmount === 0 && (
                  <p className="text-xs" style={{ color: "#2dd4a0" }}>
                    incluso
                  </p>
                )}
              </>
            )}
          </div>
        </div>
        {service.description && (
          <p className="text-xs mt-0.5" style={{ color: "#4d7060" }}>
            {service.description}
          </p>
        )}
        {!locked && !available && service.requiresPackageId && (
          <p
            className="text-xs mt-1"
            style={{ color: "#6b8f7d", fontStyle: "italic" }}
          >
            Richiede un pacchetto superiore
          </p>
        )}
        {!locked && !available && service.requiresServiceId && (
          <p
            className="text-xs mt-1"
            style={{ color: "#6b8f7d", fontStyle: "italic" }}
          >
            Seleziona prima il servizio richiesto
          </p>
        )}
      </div>
    </div>
  );
}
