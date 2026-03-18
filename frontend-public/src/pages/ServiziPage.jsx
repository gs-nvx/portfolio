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

  if (loading)
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "#f2f5f3" }}
      >
        <span
          style={{ fontFamily: "'DM Mono', monospace" }}
          className="text-[#5e7d68] text-xs tracking-widest"
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

      {/* Sezione 0 — Intro discorsiva */}
      <section
        style={{ background: "#f2f5f3", borderBottom: "0.5px solid #dceae5" }}
        className="pt-14"
      >
        <div className="max-w-5xl mx-auto px-6 py-20 text-center">
          <SectionEyebrow label="Come lavoro" />
          <h1
            className="text-4xl font-medium mb-6"
            style={{
              color: "#1c2e24",
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
            }}
          >
            Sviluppo applicazioni web su misura
            <br />
            per piccole e medie imprese
          </h1>
          <div className="max-w-2xl mx-auto flex flex-col gap-4">
            <p
              style={{
                color: "#5e7d68",
                fontSize: "15px",
                lineHeight: 1.8,
                fontWeight: 300,
              }}
            >
              Mi occupo di progettare e sviluppare siti web e gestionali
              personalizzati per attività locali — dal negozio di quartiere allo
              studio professionale, dalla palestra al ristorante. Ogni progetto
              parte da una conversazione: capisco le tue esigenze, ti propongo
              una soluzione concreta e la costruisco su misura, senza template
              preconfezionati.
            </p>
            <p
              style={{
                color: "#5a8a7a",
                fontSize: "15px",
                lineHeight: 1.8,
                fontWeight: 300,
              }}
            >
              Il canone mensile include hosting, backup, manutenzione ordinaria
              e supporto tecnico — così non devi preoccuparti
              dell'infrastruttura e puoi concentrarti sulla tua attività.
            </p>
            <p style={{ color: "#0f9e7e", fontSize: "13px", lineHeight: 1.7 }}>
              I prezzi indicati nelle sezioni seguenti{" "}
              <b>
                sono orientativi e variano in base alla complessità del
                progetto.
              </b>{" "}
              Contattami per un preventivo personalizzato senza impegno.
            </p>
          </div>
        </div>
      </section>

      {/* Sezione 1 — Presentazione pacchetti */}
      <section style={{ background: "#e8eee9" }} className="pt-14 min-h-screen">
        <SectionWrapper>
          <div className="text-center mb-10">
            <SectionEyebrow
              label={servizi?.titolo_sezione || "I nostri pacchetti"}
            />
            <h1
              className="text-4xl font-medium"
              style={{ color: "#1c2e24", letterSpacing: "-0.02em" }}
            >
              {"Pacchetti e prezzi"}
            </h1>
            <p className="mt-3 text-sm font-light" style={{ color: "#3d5c47" }}>
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
                      ? "1.5px solid #0f9e7e"
                      : "0.5px solid #c2d0c5",
                  }}
                >
                  {p.offerEnabled && p.offerLabel && (
                    <div className="absolute -top-3 left-4">
                      <span
                        className="text-[10px] px-3 py-1 rounded-full font-medium"
                        style={{
                          background: "#0f9e7e",
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
                      style={{ color: "#1c2e24" }}
                    >
                      {p.name}
                    </h3>
                    <p
                      className="text-xs mt-1 font-light"
                      style={{ color: "#3d5c47" }}
                    >
                      {p.description}
                    </p>
                  </div>
                  <div>
                    {p.offerEnabled && p.offerDiscountMonthly > 0 && (
                      <p
                        className="text-xs line-through"
                        style={{ color: "#0f9e7e" }}
                      >
                        €{p.monthlyAmount}/mese
                      </p>
                    )}
                    <div
                      className="text-2xl font-semibold"
                      style={{ color: "#0f9e7e", letterSpacing: "-0.02em" }}
                    >
                      €{finalMonthly}
                      <span
                        className="text-xs font-light ml-1"
                        style={{ color: "#0f9e7e" }}
                      >
                        /mese
                      </span>
                    </div>
                    {p.offerEnabled && p.offerDiscountSetup > 0 ? (
                      <div className="flex items-center gap-2 mt-0.5">
                        <p
                          className="text-xs line-through"
                          style={{ color: "#0f9e7e" }}
                        >
                          Setup €{p.setupAmount}
                        </p>
                        <p
                          className="text-xs font-medium"
                          style={{ color: "#0f9e7e" }}
                        >
                          €{finalSetup}
                        </p>
                      </div>
                    ) : (
                      <p
                        className="text-xs mt-0.5"
                        style={{ color: "#0f9e7e" }}
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
                          style={{ color: "#5e7d68" }}
                        >
                          <span style={{ color: "#5e7d68" }}>↗</span>
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
