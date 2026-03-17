import AddOnCard from "./AddOnCard";

export default function AddOnSelector({ addOns, selected, onToggle }) {
  return (
    <div>
      <p
        className="text-xs uppercase tracking-widest mb-3"
        style={{ color: "#8ab8a8", fontFamily: "'DM Mono', monospace" }}
      >
        3. Aggiungi servizi extra
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {addOns.map((addon) => (
          <AddOnCard
            key={addon.id}
            addon={addon}
            selected={selected.has(addon.id)}
            onToggle={() => onToggle(addon)}
          />
        ))}
      </div>
    </div>
  );
}
