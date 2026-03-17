export default function PackageSelector({ packages, selected, onSelect }) {
  return (
    <div>
      <p
        className="text-xs uppercase tracking-widest mb-3"
        style={{ color: "#4d7060", fontFamily: "'DM Mono', monospace" }}
      >
        1. Scegli il pacchetto base
      </p>
      <div className="grid grid-cols-3 gap-3">
        {packages.map((pkg) => {
          const isSelected = selected?.id === pkg.id;
          const finalMonthly =
            pkg.offerEnabled && pkg.offerDiscountMonthly
              ? pkg.monthlyAmount - pkg.offerDiscountMonthly
              : pkg.monthlyAmount;
          const finalSetup =
            pkg.offerEnabled && pkg.offerDiscountSetup
              ? pkg.setupAmount - pkg.offerDiscountSetup
              : pkg.setupAmount;

          return (
            <button
              key={pkg.id}
              onClick={() => onSelect(pkg)}
              className="rounded-xl p-4 text-left transition relative"
              style={{
                background: isSelected ? "#0f2a1e" : "#0a0f0d",
                border: isSelected
                  ? "1px solid #2dd4a0"
                  : "0.5px solid #1a2e24",
                cursor: "pointer",
              }}
            >
              {pkg.offerEnabled && pkg.offerLabel && (
                <div className="absolute -top-2.5 left-3">
                  <span
                    className="text-[9px] px-2 py-0.5 rounded-full"
                    style={{
                      background: "#2dd4a0",
                      color: "#062318",
                      fontFamily: "'DM Mono', monospace",
                    }}
                  >
                    {pkg.offerLabel}
                  </span>
                </div>
              )}
              <p
                className="font-medium text-sm mb-1 mt-1"
                style={{ color: isSelected ? "#2dd4a0" : "#e2ede8" }}
              >
                {pkg.name}
              </p>
              {pkg.offerEnabled && pkg.offerDiscountMonthly > 0 && (
                <p
                  className="text-xs line-through"
                  style={{ color: "#4d7060" }}
                >
                  €{pkg.monthlyAmount}/mese
                </p>
              )}
              <p
                className="text-lg font-semibold"
                style={{ color: "#2dd4a0", letterSpacing: "-0.02em" }}
              >
                €{finalMonthly}
                <span
                  className="text-xs font-light ml-1"
                  style={{ color: "#4d7060" }}
                >
                  /mese
                </span>
              </p>
              {pkg.offerEnabled && pkg.offerDiscountSetup > 0 ? (
                <div className="flex items-center gap-1.5 mt-0.5">
                  <p
                    className="text-xs line-through"
                    style={{ color: "#4d7060" }}
                  >
                    €{pkg.setupAmount}
                  </p>
                  <p className="text-xs" style={{ color: "#2dd4a0" }}>
                    €{finalSetup}
                  </p>
                </div>
              ) : (
                <p className="text-xs mt-0.5" style={{ color: "#4d7060" }}>
                  Setup €{finalSetup}
                </p>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
