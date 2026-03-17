export default function ConfiguratorSummary({
  selectedPackage,
  selectedServices,
  allServices,
}) {
  const baseSetup = selectedPackage?.setupAmount || 0;
  const baseMonthly = selectedPackage?.monthlyAmount || 0;
  const discountSetup = selectedPackage?.offerEnabled
    ? selectedPackage.offerDiscountSetup || 0
    : 0;
  const discountMonthly = selectedPackage?.offerEnabled
    ? selectedPackage.offerDiscountMonthly || 0
    : 0;

  const extrasSetup = selectedServices.reduce(
    (acc, s) => acc + s.setupAmount,
    0,
  );
  const extrasMonthly = selectedServices.reduce(
    (acc, s) => acc + s.monthlyAmount,
    0,
  );

  const totalSetup = baseSetup - discountSetup + extrasSetup;
  const totalMonthly = baseMonthly - discountMonthly + extrasMonthly;

  return (
    <div
      className="rounded-xl p-5 sticky top-20"
      style={{ background: "#ffffff", border: "0.5px solid #dceae5" }}
    >
      <p
        className="text-xs uppercase tracking-widest mb-4"
        style={{ color: "#8ab8a8", fontFamily: "'DM Mono', monospace" }}
      >
        Riepilogo
      </p>

      {!selectedPackage ? (
        <p className="text-sm" style={{ color: "#8ab8a8" }}>
          Nessun pacchetto selezionato
        </p>
      ) : (
        <>
          {/* Pacchetto base */}
          <div
            className="mb-3 pb-3"
            style={{ borderBottom: "0.5px solid #dceae5" }}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium" style={{ color: "#152820" }}>
                  {selectedPackage.name}
                </p>
                <p className="text-xs" style={{ color: "#8ab8a8" }}>
                  Pacchetto base
                </p>
              </div>
              <div className="text-right">
                {discountSetup > 0 ? (
                  <div className="flex items-center gap-1.5">
                    <p
                      className="text-xs line-through"
                      style={{ color: "#8ab8a8" }}
                    >
                      €{baseSetup}
                    </p>
                    <p className="text-xs" style={{ color: "#0b7a5a" }}>
                      €{baseSetup - discountSetup}
                    </p>
                  </div>
                ) : (
                  <p className="text-xs" style={{ color: "#8ab8a8" }}>
                    €{baseSetup} setup
                  </p>
                )}
                {discountMonthly > 0 ? (
                  <div className="flex items-center gap-1.5">
                    <p
                      className="text-xs line-through"
                      style={{ color: "#8ab8a8" }}
                    >
                      €{baseMonthly}/mese
                    </p>
                    <p className="text-xs" style={{ color: "#0b7a5a" }}>
                      €{baseMonthly - discountMonthly}/mese
                    </p>
                  </div>
                ) : (
                  <p className="text-xs" style={{ color: "#0b7a5a" }}>
                    €{baseMonthly}/mese
                  </p>
                )}
              </div>
            </div>
            {selectedPackage.offerEnabled && selectedPackage.offerLabel && (
              <span
                className="text-[9px] px-2 py-0.5 rounded-full mt-1 inline-block"
                style={{
                  background: "#e8f5f0",
                  color: "#0b7a5a",
                  fontFamily: "'DM Mono', monospace",
                }}
              >
                {selectedPackage.offerLabel}
              </span>
            )}
          </div>

          {/* Servizi inclusi nel pacchetto */}
          {selectedPackage.includedServiceIds?.length > 0 && (
            <div className="flex flex-col gap-1 mt-2">
              <p
                className="text-[10px] uppercase tracking-widest mb-1"
                style={{ color: "#8ab8a8", fontFamily: "'DM Mono', monospace" }}
              >
                Inclusi
              </p>
              {allServices
                .filter((s) =>
                  selectedPackage.includedServiceIds.includes(s.id),
                )
                .map((s) => (
                  <div key={s.id} className="flex justify-between items-center">
                    <p className="text-xs" style={{ color: "#5a8a7a" }}>
                      {s.name}
                    </p>
                    <p className="text-xs" style={{ color: "#0b7a5a" }}>
                      incluso
                    </p>
                  </div>
                ))}
            </div>
          )}

          {/* Extra selezionati */}
          {selectedServices.length > 0 && (
            <div
              className="flex flex-col gap-2 mb-3 pb-3"
              style={{ borderBottom: "0.5px solid #dceae5" }}
            >
              {selectedServices.map((s) => (
                <div key={s.id} className="flex justify-between items-start">
                  <p
                    className="text-xs"
                    style={{ color: "#5a8a7a", maxWidth: "60%" }}
                  >
                    {s.name}
                  </p>
                  <div className="text-right">
                    {s.setupAmount > 0 && (
                      <p className="text-xs" style={{ color: "#8ab8a8" }}>
                        +€{s.setupAmount}
                      </p>
                    )}
                    {s.monthlyAmount > 0 && (
                      <p className="text-xs" style={{ color: "#0b7a5a" }}>
                        +€{s.monthlyAmount}/mese
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Totali */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <p className="text-xs" style={{ color: "#8ab8a8" }}>
                Setup totale
              </p>
              <p className="text-sm font-medium" style={{ color: "#152820" }}>
                €{totalSetup}
              </p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-xs" style={{ color: "#8ab8a8" }}>
                Canone mensile
              </p>
              <p
                className="text-xl font-semibold"
                style={{ color: "#0b7a5a", letterSpacing: "-0.02em" }}
              >
                €{totalMonthly}
                <span
                  className="text-xs font-light ml-1"
                  style={{ color: "#8ab8a8" }}
                >
                  /mese
                </span>
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
