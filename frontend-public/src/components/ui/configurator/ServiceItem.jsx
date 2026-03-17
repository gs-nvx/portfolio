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
        background: selected ? "#e8f5f0" : "#ffffff",
        border: selected ? "1px solid #0b7a5a" : "0.5px solid #dceae5",
        opacity: available || locked ? 1 : 0.4,
        cursor: locked ? "default" : available ? "pointer" : "not-allowed",
      }}
    >
      {/* Checkbox / badge incluso */}
      {locked ? (
        <div
          className="mt-0.5 px-2 py-0.5 rounded-full flex-shrink-0"
          style={{
            background: "#e8f5f0",
            border: "0.5px solid #0b7a5a",
          }}
        >
          <span
            style={{
              color: "#0b7a5a",
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
            background: selected ? "#0b7a5a" : "transparent",
            border: selected ? "1px solid #0b7a5a" : "0.5px solid #dceae5",
          }}
        >
          {selected && (
            <span style={{ color: "#04281e", fontSize: "10px", lineHeight: 1 }}>
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
            style={{ color: available || locked ? "#152820" : "#8ab8a8" }}
          >
            {service.name}
          </p>
          <div className="text-right flex-shrink-0">
            {locked ? (
              <p className="text-xs" style={{ color: "#0b7a5a" }}>
                incluso
              </p>
            ) : (
              <>
                {service.setupAmount > 0 && (
                  <p className="text-xs" style={{ color: "#8ab8a8" }}>
                    +€{service.setupAmount} setup
                  </p>
                )}
                {service.monthlyAmount > 0 && (
                  <p className="text-xs" style={{ color: "#0b7a5a" }}>
                    +€{service.monthlyAmount}/mese
                  </p>
                )}
                {service.setupAmount === 0 && service.monthlyAmount === 0 && (
                  <p className="text-xs" style={{ color: "#0b7a5a" }}>
                    incluso
                  </p>
                )}
              </>
            )}
          </div>
        </div>
        {service.description && (
          <p className="text-xs mt-0.5" style={{ color: "#8ab8a8" }}>
            {service.description}
          </p>
        )}
        {!locked && !available && service.requiresPackageId && (
          <p
            className="text-xs mt-1"
            style={{ color: "#5a8a7a", fontStyle: "italic" }}
          >
            Richiede un pacchetto superiore
          </p>
        )}
        {!locked && !available && service.requiresServiceId && (
          <p
            className="text-xs mt-1"
            style={{ color: "#5a8a7a", fontStyle: "italic" }}
          >
            Seleziona prima il servizio richiesto
          </p>
        )}
      </div>
    </div>
  );
}
