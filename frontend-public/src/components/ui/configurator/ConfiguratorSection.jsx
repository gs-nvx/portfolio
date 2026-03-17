import { useState, useEffect } from "react";
import {
  getConfiguratorPackages,
  getConfiguratorServices,
} from "../../../api/configuratorApi";
import PackageSelector from "./PackageSelector";
import ServiceCategory from "./ServiceCategory";
import ConfiguratorSummary from "./ConfiguratorSummary";
import SectionEyebrow from "../SectionEyebrow";

export default function ConfiguratorSection() {
  const [packages, setPackages] = useState([]);
  const [services, setServices] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [selectedServices, setSelectedServices] = useState(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getConfiguratorPackages(), getConfiguratorServices()])
      .then(([pkgs, svcs]) => {
        setPackages(pkgs.data);
        setServices(svcs.data);
      })
      .finally(() => setLoading(false));
  }, []);

  const isServiceAvailable = (service) => {
    if (service.requiresPackageId && selectedPackage) {
      const requiredPkg = packages.find(
        (p) => p.id === service.requiresPackageId,
      );
      if (!requiredPkg || selectedPackage.sortOrder < requiredPkg.sortOrder)
        return false;
    }
    if (service.requiresPackageId && !selectedPackage) return false;
    if (
      service.requiresServiceId &&
      !selectedServices.has(service.requiresServiceId)
    )
      return false;
    return true;
  };

  const toggleService = (service) => {
    if (!isServiceAvailable(service)) return;
    setSelectedServices((prev) => {
      const next = new Set(prev);
      if (next.has(service.id)) {
        next.delete(service.id);
        // rimuovi i servizi che dipendono da questo
        services.forEach((s) => {
          if (s.requiresServiceId === service.id) next.delete(s.id);
        });
      } else {
        next.add(service.id);
      }
      return next;
    });
  };

  const isServiceAvailableWith = (service, pkg, selectedSet) => {
    if (service.requiresPackageId) {
      if (!pkg) return false;
      const requiredPkg = packages.find(
        (p) => p.id === service.requiresPackageId,
      );
      if (!requiredPkg || pkg.sortOrder < requiredPkg.sortOrder) return false;
    }
    if (
      service.requiresServiceId &&
      !selectedSet.has(service.requiresServiceId)
    )
      return false;
    return true;
  };

  const categories = [
    ...new Set(
      services.filter((s) => s.category !== "Base").map((s) => s.category),
    ),
  ];
  const selectedServicesList = services.filter((s) =>
    selectedServices.has(s.id),
  );

  const handlePackageSelect = (pkg) => {
    setSelectedPackage(pkg);
    // pre-seleziona i servizi inclusi nel pacchetto
    const includedIds = new Set(pkg.includedServiceIds || []);
    // mantieni extra già selezionati compatibili + aggiungi inclusi
    setSelectedServices((prev) => {
      const next = new Set(includedIds);
      // mantieni extra precedenti se ancora disponibili
      prev.forEach((id) => {
        if (!includedIds.has(id)) {
          const svc = services.find((s) => s.id === id);
          if (svc && isServiceAvailableWith(svc, pkg, next)) next.add(id);
        }
      });
      return next;
    });
  };

  // servizio locked = incluso nel pacchetto selezionato
  const isServiceLocked = (service) =>
    selectedPackage?.includedServiceIds?.includes(service.id) ?? false;

  if (loading) return null;

  return (
    <section
      style={{ background: "#0d1510", borderTop: "0.5px solid #1a2e24" }}
    >
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-center mb-10">
          <SectionEyebrow label="Configura il tuo prodotto" />
          <h2
            className="text-3xl font-medium"
            style={{ color: "#e2ede8", letterSpacing: "-0.02em" }}
          >
            Costruisci la tua soluzione
          </h2>
          <p className="mt-2 text-sm font-light" style={{ color: "#4d7060" }}>
            Scegli un pacchetto base e aggiungi i servizi che ti servono
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Configuratore */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <PackageSelector
              packages={packages}
              selected={selectedPackage}
              onSelect={handlePackageSelect}
            />
            {selectedPackage &&
              categories.map((cat) => (
                <ServiceCategory
                  key={cat}
                  category={cat}
                  services={services.filter((s) => s.category === cat)}
                  selectedServices={selectedServices}
                  onToggle={toggleService}
                  isAvailable={isServiceAvailable}
                  isLocked={isServiceLocked}
                />
              ))}
            {!selectedPackage && (
              <p
                className="text-sm text-center py-8"
                style={{ color: "#4d7060" }}
              >
                Seleziona un pacchetto base per vedere i servizi disponibili
              </p>
            )}
          </div>

          {/* Riepilogo */}
          <div className="lg:col-span-1">
            <ConfiguratorSummary
              selectedPackage={selectedPackage}
              selectedServices={selectedServicesList}
              allServices={services}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
