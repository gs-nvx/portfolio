import { ACTIVITY_ICONS } from "./activityIcons";

export default function ActivitySelector({ packages, selected, onSelect }) {
  return (
    <div>
      <p
        className="text-xs uppercase tracking-widest mb-3"
        style={{ color: "#8ab8a8", fontFamily: "'DM Mono', monospace" }}
      >
        1. Che tipo di attività hai?
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {packages.map((pkg) => {
          const isSelected = selected?.id === pkg.id;
          return (
            <button
              key={pkg.id}
              onClick={() => onSelect(pkg)}
              className="rounded-xl p-4 text-left transition flex flex-col gap-2"
              style={{
                background: isSelected ? "#e8f5f0" : "#f4f8f7",
                border: isSelected
                  ? "1.5px solid #0b7a5a"
                  : "0.5px solid #dceae5",
                cursor: "pointer",
              }}
            >
              <span style={{ fontSize: "22px" }}>
                {ACTIVITY_ICONS[pkg.activityType] || "✨"}
              </span>
              <p
                className="text-xs font-medium leading-snug"
                style={{ color: isSelected ? "#0b7a5a" : "#152820" }}
              >
                {pkg.name}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
