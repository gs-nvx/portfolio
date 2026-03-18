import { useState, useEffect } from "react";
import {
  getConfiguratorPackages,
  getConfiguratorServices,
} from "../../../api/configuratorApi";
import ActivitySelector from "./ActivitySelector";
import IncludedServices from "./IncludedServices";
import AddOnSelector from "./AddOnSelector";
import ConfiguratorSummary from "./ConfiguratorSummary";
import SectionEyebrow from "../SectionEyebrow";

export default function ConfiguratorSection() {
  const [packages, setPackages] = useState([]);
  const [services, setServices] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [selectedAddOns, setSelectedAddOns] = useState(new Set());
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getConfiguratorPackages(), getConfiguratorServices()])
      .then(([pkgs, svcs]) => {
        setPackages(pkgs.data);
        setServices(svcs.data);
      })
      .finally(() => setLoading(false));
  }, []);

  const addOns = services.filter((s) => s.category === "Add-on");
  const includedServices = selectedPackage
    ? services.filter((s) => selectedPackage.includedServiceIds?.includes(s.id))
    : [];

  const visibleAddOns = addOns
    .filter((s) => {
      if (!s.visibleFor) return true;
      return s.visibleFor.split(",").includes(selectedPackage?.activityType);
    })
    .filter((s) => {
      // shop non appare per ecommerce (già incluso)
      if (
        s.name === "Negozio online" &&
        selectedPackage?.activityType === "ecommerce"
      )
        return false;
      // members non appare se già incluso
      if (selectedPackage?.includedServiceIds?.includes(s.id)) return false;
      return true;
    });

  const toggleAddOn = (addon) => {
    setSelectedAddOns((prev) => {
      const next = new Set(prev);
      if (addon.exclusiveGroup) {
        addOns
          .filter(
            (a) =>
              a.exclusiveGroup === addon.exclusiveGroup && a.id !== addon.id,
          )
          .forEach((a) => next.delete(a.id));
      }
      next.has(addon.id) ? next.delete(addon.id) : next.add(addon.id);
      return next;
    });
  };

  const handlePackageSelect = (pkg) => {
    setSelectedPackage(pkg);
    setSelectedAddOns(new Set());
    setStep(2);
  };

  const selectedAddOnsList = addOns.filter((s) => selectedAddOns.has(s.id));

  if (loading) return null;

  return (
    <section
      style={{ background: "#f2f5f3", borderTop: "0.5px solid #dceae5" }}
    >
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-center mb-10">
          <SectionEyebrow label="Configura la tua soluzione" />
          <h2
            className="text-3xl font-medium"
            style={{ color: "#1c2e24", letterSpacing: "-0.02em" }}
          >
            Costruisci il tuo pacchetto
          </h2>
          <p className="mt-2 text-sm font-light" style={{ color: "#3d5c47" }}>
            Scegli il tipo di attività e personalizza con i servizi che ti
            servono
          </p>
        </div>

        {/* Indicatore step */}
        <div className="flex items-center justify-center gap-3 mb-10">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium transition"
                  style={{
                    background: step >= s ? "#0f9e7e" : "#e8eee9",
                    color: step >= s ? "#fff" : "#8ab8a8",
                    border: step >= s ? "none" : "0.5px solid #dceae5",
                  }}
                >
                  {s}
                </div>
                <span
                  className="text-xs hidden sm:block"
                  style={{ color: step >= s ? "#152820" : "#8ab8a8" }}
                >
                  {s === 1
                    ? "Tipo attività"
                    : s === 2
                      ? "Servizi inclusi"
                      : "Extra"}
                </span>
              </div>
              {s < 3 && (
                <div
                  className="w-8 h-px"
                  style={{ background: step > s ? "#0b7a5a" : "#dceae5" }}
                />
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Step 1 */}
            <ActivitySelector
              packages={packages}
              selected={selectedPackage}
              onSelect={handlePackageSelect}
            />

            {/* Step 2 */}
            {step >= 2 && selectedPackage && (
              <IncludedServices
                services={includedServices}
                onNext={() => setStep(3)}
              />
            )}

            {/* Step 3 */}
            {step >= 3 && (
              <AddOnSelector
                addOns={visibleAddOns}
                selected={selectedAddOns}
                onToggle={toggleAddOn}
              />
            )}
          </div>

          {/* Riepilogo */}
          <div className="lg:col-span-1">
            <ConfiguratorSummary
              selectedPackage={selectedPackage}
              selectedAddOns={selectedAddOnsList}
              allServices={services}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
