export default function IncludedServices({ services, onNext }) {
  return (
    <div
      className="rounded-xl p-5"
      style={{ background: "#ffffff", border: "0.5px solid #dceae5" }}
    >
      <div className="flex items-center justify-between mb-4">
        <p
          className="text-xs uppercase tracking-widest"
          style={{ color: "#0f9e7e", fontFamily: "'DM Mono', monospace" }}
        >
          2. Incluso nel pacchetto
        </p>
        <button
          onClick={onNext}
          className="text-xs font-medium transition"
          style={{
            color: "#0f9e7e",
            fontFamily: "'DM Mono', monospace",
            cursor: "pointer",
          }}
        >
          Aggiungi extra →
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {services.map((s) => (
          <div key={s.id} className="flex items-start gap-2">
            <span
              style={{ color: "#0b7a5a", fontSize: "12px", marginTop: "1px" }}
            >
              ↗
            </span>
            <div>
              <p className="text-sm font-medium" style={{ color: "#152820" }}>
                {s.clientLabel || s.name}
              </p>
              {s.clientDescription && (
                <p className="text-xs" style={{ color: "#5a8a7a" }}>
                  {s.clientDescription}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
