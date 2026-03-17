import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import SectionWrapper from "../components/ui/SectionWrapper";
import SectionEyebrow from "../components/ui/SectionEyebrow";
import { useCmsSections } from "../hooks/useCms";
import ConfiguratorSection from "../components/ui/configurator/ConfiguratorSection";
import {
  getConfiguratorPackages,
  getConfiguratorServices,
} from "../api/configuratorApi";
import { ACTIVITY_ICONS } from "../components/ui/configurator/activityIcons";

export default function ServiziPage() {
  const { i18n } = useTranslation();
  const { getContent, loading } = useCmsSections(i18n.language);
  const [packages, setPackages] = useState([]);
  const [allServices, setAllServices] = useState([]);
  useEffect(() => {
    Promise.all([getConfiguratorPackages(), getConfiguratorServices()]).then(
      ([pkgs, svcs]) => {
        setPackages(pkgs.data);
        setAllServices(svcs.data);
      },
    );
  }, []);
  const servizi = getContent("servizi");
  const getIncludedServices = (pkg) =>
    allServices.filter((s) => pkg.includedServiceIds?.includes(s.id));

  if (loading)
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "#f4f8f7" }}
      >
        <span
          style={{ fontFamily: "'DM Mono', monospace" }}
          className="text-[#6e9aaa] text-xs tracking-widest"
        >
          Caricamento...
        </span>
      </div>
    );

  return (
    <>
      <Helmet>
        <title>Servizi — GST Code Lab</title>
      </Helmet>
      {/* Sezione 1 — Presentazione pacchetti */}
      <section
        style={{ background: "#f4f8f7", borderBottom: "0.5px solid #dceae5" }}
      >
        <SectionWrapper>
          <div className="text-center mb-10">
            <SectionEyebrow
              label={servizi?.titolo_sezione || "I nostri pacchetti"}
            />
            <h1
              className="text-4xl font-medium"
              style={{ color: "#152820", letterSpacing: "-0.02em" }}
            >
              {servizi?.titolo_sezione || "Pacchetti e prezzi"}
            </h1>
            <p className="mt-3 text-sm font-light" style={{ color: "#5a8a7a" }}>
              {servizi?.sottotitolo_sezione}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {packages.map((p) => {
              const finalSetup =
                p.offerEnabled && p.offerDiscountSetup
                  ? p.setupAmount - p.offerDiscountSetup
                  : p.setupAmount;
              const finalMonthly =
                p.offerEnabled && p.offerDiscountMonthly
                  ? p.monthlyAmount - p.offerDiscountMonthly
                  : p.monthlyAmount;
              const icon = ACTIVITY_ICONS[p.activityType] || "✨";
              const included = allServices.filter((s) =>
                p.includedServiceIds?.includes(s.id),
              );

              return (
                <div
                  key={p.id}
                  className="rounded-xl p-5 flex flex-col gap-3 relative"
                  style={{
                    background: "#ffffff",
                    border: p.offerEnabled
                      ? "1.5px solid #0b7a5a"
                      : "0.5px solid #dceae5",
                  }}
                >
                  {p.offerEnabled && p.offerLabel && (
                    <div className="absolute -top-3 left-4">
                      <span
                        className="text-[10px] px-3 py-1 rounded-full font-medium"
                        style={{
                          background: "#0b7a5a",
                          color: "#fff",
                          fontFamily: "'DM Mono', monospace",
                        }}
                      >
                        {p.offerLabel}
                      </span>
                    </div>
                  )}
                  <div className="text-2xl">{icon}</div>
                  <div>
                    <h3
                      className="font-medium text-sm"
                      style={{ color: "#152820" }}
                    >
                      {p.name}
                    </h3>
                    <p
                      className="text-xs mt-1 font-light"
                      style={{ color: "#5a8a7a" }}
                    >
                      {p.description}
                    </p>
                  </div>
                  <div>
                    {p.offerEnabled && p.offerDiscountMonthly > 0 && (
                      <p
                        className="text-xs line-through"
                        style={{ color: "#8ab8a8" }}
                      >
                        €{p.monthlyAmount}/mese
                      </p>
                    )}
                    <div
                      className="text-2xl font-semibold"
                      style={{ color: "#0b7a5a", letterSpacing: "-0.02em" }}
                    >
                      €{finalMonthly}
                      <span
                        className="text-xs font-light ml-1"
                        style={{ color: "#5a8a7a" }}
                      >
                        /mese
                      </span>
                    </div>
                    {p.offerEnabled && p.offerDiscountSetup > 0 ? (
                      <div className="flex items-center gap-2 mt-0.5">
                        <p
                          className="text-xs line-through"
                          style={{ color: "#8ab8a8" }}
                        >
                          Setup €{p.setupAmount}
                        </p>
                        <p
                          className="text-xs font-medium"
                          style={{ color: "#0b7a5a" }}
                        >
                          €{finalSetup}
                        </p>
                      </div>
                    ) : (
                      <p
                        className="text-xs mt-0.5"
                        style={{ color: "#8ab8a8" }}
                      >
                        {finalSetup === 0
                          ? "Nessun costo di setup"
                          : `Setup €${finalSetup}`}
                      </p>
                    )}
                  </div>
                  {included.length > 0 && (
                    <ul
                      className="flex flex-col gap-1 pt-3"
                      style={{ borderTop: "0.5px solid #dceae5" }}
                    >
                      {included.map((s) => (
                        <li
                          key={s.id}
                          className="text-xs flex gap-2"
                          style={{ color: "#5a8a7a" }}
                        >
                          <span style={{ color: "#0b7a5a" }}>↗</span>
                          {s.clientLabel || s.name}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        </SectionWrapper>
      </section>
      <ConfiguratorSection />
    </>
  );
}
