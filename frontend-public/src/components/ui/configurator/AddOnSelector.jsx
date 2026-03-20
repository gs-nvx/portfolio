import AddOnCard from "./AddOnCard";

export default function AddOnSelector({ addOns, selected, onToggle }) {
  // raggruppa per activityType
  const groups = addOns.reduce((acc, addon) => {
    const key = addon.serviceType || "Altro";
    if (!acc[key]) acc[key] = [];
    acc[key].push(addon);
    return acc;
  }, {});

  return (
    <div className="flex flex-col gap-6">
      <p
        className="text-xs uppercase tracking-widest"
        style={{ color: "#0f9e7e", fontFamily: "'DM Mono', monospace" }}
      >
        3. Aggiungi servizi extra
      </p>
      {Object.entries(groups).map(([group, items]) => (
        <div key={group}>
          <p
            className="text-xs uppercase tracking-widest mb-3"
            style={{
              color: "#8ab8a8",
              fontFamily: "'DM Mono', monospace",
              borderBottom: "0.5px solid #dceae5",
              paddingBottom: "6px",
            }}
          >
            {group}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {items.map((addon) => (
              <AddOnCard
                key={addon.id}
                addon={addon}
                selected={selected.has(addon.id)}
                onToggle={() => onToggle(addon)}
              />
            ))}
          </div>
        </div>
      ))}
      {Object.keys(groups).length === 0 && (
        <p className="text-sm" style={{ color: "#8ab8a8" }}>
          Nessun servizio extra disponibile per questo pacchetto.
        </p>
      )}
    </div>
  );
}
