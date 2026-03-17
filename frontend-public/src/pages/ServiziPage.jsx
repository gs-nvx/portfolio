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

  if (loading) return null;

  return (
    <>
      <Helmet>
        <title>Servizi — GST Code Lab</title>
      </Helmet>
      <div style={{ background: "#f4f8f7" }} className="pt-14 min-h-screen">
        <SectionWrapper>
          <div className="text-center mb-12">
            <SectionEyebrow label="Servizi" />
            <h1
              className="text-4xl font-medium"
              style={{ color: "#152820", letterSpacing: "-0.02em" }}
            >
              {servizi?.titolo_sezione || "Pacchetti e prezzi"}
            </h1>
            <p
              className="mt-3 max-w-lg mx-auto text-sm font-light"
              style={{ color: "#8ab8a8" }}
            >
              {servizi?.sottotitolo_sezione}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {packages.map((p) => {
              const finalSetup =
                p.offerEnabled && p.offerDiscountSetup
                  ? p.setupAmount - p.offerDiscountSetup
                  : p.setupAmount;
              const finalMonthly =
                p.offerEnabled && p.offerDiscountMonthly
                  ? p.monthlyAmount - p.offerDiscountMonthly
                  : p.monthlyAmount;

              return (
                <div
                  key={p.id}
                  className="rounded-xl p-6 flex flex-col gap-4 relative"
                  style={{
                    background: "#ffffff",
                    border: p.offerEnabled
                      ? "1px solid #0b7a5a"
                      : "0.5px solid #dceae5",
                  }}
                >
                  {/* Badge offerta */}
                  {p.offerEnabled && p.offerLabel && (
                    <div className="absolute -top-3 left-4">
                      <span
                        className="text-[10px] px-3 py-1 rounded-full font-medium"
                        style={{
                          background: "#0b7a5a",
                          color: "#04281e",
                          fontFamily: "'DM Mono', monospace",
                        }}
                      >
                        {p.offerLabel}
                      </span>
                    </div>
                  )}

                  <h2
                    className="text-xl font-medium mt-1"
                    style={{ color: "#152820" }}
                  >
                    {p.name}
                  </h2>
                  <p
                    className="text-sm font-light"
                    style={{ color: "#8ab8a8" }}
                  >
                    {p.description}
                  </p>

                  {/* Prezzo mensile */}
                  <div>
                    {p.offerEnabled && p.offerDiscountMonthly > 0 && (
                      <p
                        className="text-sm line-through mb-0.5"
                        style={{ color: "#8ab8a8" }}
                      >
                        €{p.monthlyAmount}/mese
                      </p>
                    )}
                    <div
                      className="text-3xl font-semibold"
                      style={{ color: "#0b7a5a", letterSpacing: "-0.02em" }}
                    >
                      €{finalMonthly}
                      <span
                        className="text-sm font-light ml-1"
                        style={{ color: "#8ab8a8" }}
                      >
                        /mese
                      </span>
                    </div>
                  </div>

                  {/* Prezzo setup */}
                  <div>
                    {p.offerEnabled && p.offerDiscountSetup > 0 ? (
                      <div className="flex items-center gap-2">
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
                      <p className="text-xs" style={{ color: "#8ab8a8" }}>
                        Setup €{p.setupAmount} una tantum
                      </p>
                    )}
                  </div>

                  {/* Servizi inclusi */}
                  {getIncludedServices(p).length > 0 && (
                    <ul
                      className="flex flex-col gap-1.5 pt-3"
                      style={{ borderTop: "0.5px solid #dceae5" }}
                    >
                      {getIncludedServices(p).map((s) => (
                        <li
                          key={s.id}
                          className="text-sm flex gap-2"
                          style={{ color: "#5a8a7a" }}
                        >
                          <span style={{ color: "#0b7a5a" }}>↗</span> {s.name}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        </SectionWrapper>
        <ConfiguratorSection />
      </div>
    </>
  );
}
