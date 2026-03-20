import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";
import SectionWrapper from "../components/ui/SectionWrapper";
import SectionEyebrow from "../components/ui/SectionEyebrow";
import PortfolioCard from "../components/ui/PortfolioCard";
import ContactForm from "../components/ui/ContactForm";
import { useCmsSections } from "../hooks/useCms";
import CardCarousel from "../components/ui/CardCarousel";

export default function HomePage() {
  const { t, i18n } = useTranslation();
  const { getContent, loading } = useCmsSections(i18n.language);

  const hero = getContent("hero");
  const portfolio = getContent("portfolio");
  const testimonianze = getContent("testimonianze");

  if (loading)
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "#0e1520" }}
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
        <title>GST Code Lab — Sviluppo web per PMI</title>
        <meta
          name="description"
          content="Siti e gestionali su misura per PMI nella provincia di Varese."
        />
      </Helmet>

      {/* ── HERO ── */}
      <section
        className="min-h-screen flex items-center justify-center pt-14 relative"
        style={{
          background: "#0e1520",
          backgroundImage: `
    radial-gradient(circle at 15% 85%, rgba(52,213,168,0.1) 0%, transparent 45%),
    radial-gradient(circle at 85% 15%, rgba(52,213,168,0.1) 0%, transparent 45%),
    repeating-linear-gradient(
      45deg,
      transparent,
      transparent 28px,
      rgba(52,213,168,0.03) 28px,
      rgba(52,213,168,0.03) 29px
    ),
    repeating-linear-gradient(
      -45deg,
      transparent,
      transparent 28px,
      rgba(52,213,168,0.03) 28px,
      rgba(52,213,168,0.03) 29px
    )
  `,
        }}
      >
        {/* fade bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
          style={{ background: "linear-gradient(transparent, #0e1520)" }}
        />

        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <div
            className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full"
            style={{
              background: "#0d2a28",
              border: "0.5px solid #1d4a35",
              fontFamily: "'DM Mono', monospace",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full bg-teal-400
              animate-pulse"
            />
            <span className="text-teal-400 text-[10px] tracking-widest uppercase">
              {t("hero.badge")}
            </span>
          </div>

          <h1
            className="text-5xl md:text-6xl leading-tight mb-6
              max-w-2xl mx-auto"
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 600,
              letterSpacing: "-0.02em",
              color: "#e8f0ee",
            }}
          >
            {hero?.titolo_parte1 || "Siti e gestionali"}{" "}
            <span style={{ color: "#34d5a8", fontWeight: 300 }}>
              {hero?.titolo_em || "su misura"}
            </span>
            <br />
            {hero?.titolo_parte2 || "per la tua PMI"}
          </h1>

          <p
            className="text-base leading-relaxed max-w-md mx-auto mb-10"
            style={{ color: "#6b8f7d", fontWeight: 300 }}
          >
            {hero?.sottotitolo ||
              "Applicazioni web professionali per piccole e medie imprese."}
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              to={hero?.link_cta || "/servizi"}
              className="font-medium px-8 py-3 rounded-lg transition"
              style={{
                background: "#34d5a8",
                color: "#04281e",
                fontSize: "14px",
              }}
            >
              {hero?.testo_cta || "Scopri i servizi"}
            </Link>
            <Link
              to="/portfolio"
              className="font-medium px-8 py-3 rounded-lg transition"
              style={{
                background: "transparent",
                color: "#6b8f7d",
                border: "0.5px solid #1a2e3a",
                fontSize: "14px",
              }}
            >
              Portfolio →
            </Link>
          </div>
        </div>
        {/* Scroll indicator */}
        <div
          style={{
            position: "absolute",
            bottom: "2rem",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <span
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "9px",
              color: "#34d5a8",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              opacity: 0.7,
            }}
          >
            scroll
          </span>
          <div
            style={{
              width: "1px",
              height: "25px",
              background: "linear-gradient(to bottom, #34d5a8, transparent)",
              animation: "scrollLine 1.8s ease-in-out infinite",
            }}
          />
          <style>{`
    @keyframes scrollLine {
      0% { transform: scaleY(0); transform-origin: top; opacity: 1; }
      50% { transform: scaleY(1); transform-origin: top; opacity: 1; }
      100% { transform: scaleY(1); transform-origin: top; opacity: 0; }
    }
  `}</style>
        </div>
      </section>

      {/* Sezione — Come funziona */}
      <section
        style={{ background: "#f2f5f3", borderBottom: "0.5px solid #dceae5" }}
      >
        <SectionWrapper>
          <div className="text-center mb-12">
            <SectionEyebrow label="Come funziona" />
            <h2
              className="text-3xl font-medium"
              style={{ color: "#1c2e24", letterSpacing: "-0.02em" }}
            >
              Dal primo contatto al prodotto finito
            </h2>
            <p className="mt-2 text-sm font-light" style={{ color: "#3d5c47" }}>
              Un processo semplice e trasparente, pensato per tenerti sempre
              informato
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                num: "01",
                titolo: "Esplora e configura",
                testo:
                  "Pensa a cosa ti serve. Il nostro configuratore interattivo ti guida nella scoperta dei servizi più adatti alla tua attività e ti fornisce una stima indicativa dei costi, senza impegno.",
              },
              {
                num: "02",
                titolo: "Richiedi un preventivo",
                testo:
                  "Invia la tua configurazione direttamente dal tool oppure contattami dalla sezione Contatti descrivendomi il tuo progetto. Ti rispondo entro 24 ore con una proposta concreta.",
              },
              {
                num: "03",
                titolo: "Definiamo la soluzione",
                testo:
                  "Ci sentiamo per approfondire i dettagli, chiarire ogni dubbio e costruire insieme la soluzione più adatta. Solo a questo punto fissiamo il preventivo definitivo, senza sorprese.",
              },
              {
                num: "04",
                titolo: "Sviluppiamo insieme",
                testo:
                  "Inizia lo sviluppo. Ci confrontiamo con incontri periodici per assicurarci che il prodotto rispecchi le tue aspettative. Non sparisco dopo la consegna — resto il tuo riferimento tecnico.",
              },
            ].map((step, i) => (
              <div key={i} className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <span
                    className="text-3xl font-semibold"
                    style={{
                      color: "#0f9e7e",
                      opacity: "0.4",
                      fontFamily: "'DM Mono', monospace",
                      letterSpacing: "-0.03em",
                      lineHeight: 1,
                    }}
                  >
                    {step.num}
                  </span>
                  <div
                    className="flex-1 h-px"
                    style={{ background: "#d4d9d2" }}
                  />
                </div>
                <h3
                  className="text-base font-medium"
                  style={{ color: "#1c2e24" }}
                >
                  {step.titolo}
                </h3>
                <p
                  className="text-sm leading-relaxed font-light"
                  style={{ color: "#5e7d68" }}
                >
                  {step.testo}
                </p>
              </div>
            ))}
          </div>
        </SectionWrapper>
      </section>

      {portfolio?.casi_studio?.length > 0 && (
        <section
          style={{ background: "#e8eee9", borderBottom: "0.5px solid #dceae5" }}
        >
          <SectionWrapper>
            <div className="text-center mb-10">
              <SectionEyebrow label="Portfolio" />
              <h2
                className="text-3xl font-medium"
                style={{ color: "#1c2e24", letterSpacing: "-0.02em" }}
              >
                {portfolio.titolo_sezione}
              </h2>
            </div>
            <CardCarousel
              items={portfolio.casi_studio.slice(0, 6)}
              itemWidth={320}
              gap={20}
              renderCard={(c, i) => (
                <PortfolioCard key={i} caso={c} showLink={false} />
              )}
            />
            <div className="text-center mt-8">
              <Link
                to="/portfolio"
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "11px",
                  color: "#0f9e7e",
                  letterSpacing: "0.05em",
                }}
              >
                Tutti i progetti →
              </Link>
            </div>
          </SectionWrapper>
        </section>
      )}

      {/* ── TESTIMONIANZE ── sfondo chiaro */}
      {testimonianze?.testimonianze?.length > 0 && (
        <section
          style={{ background: "#f2f5f3", borderBottom: "0.5px solid #dceae5" }}
        >
          <SectionWrapper>
            <div className="text-center mb-10">
              <SectionEyebrow label="Testimonianze" />
              <h2
                className="text-3xl font-medium tracking-tight"
                style={{ color: "#1c2e24", letterSpacing: "-0.02em" }}
              >
                {testimonianze.titolo_sezione}
              </h2>
            </div>
            <CardCarousel
              items={testimonianze.testimonianze}
              itemWidth={360}
              gap={20}
              renderCard={(t, i) => (
                <div
                  key={i}
                  className="rounded-xl p-6 h-full"
                  style={{
                    background: "#ffffff",
                    border: "0.5px solid #d0dcd2",
                  }}
                >
                  <div className="text-sm mb-3" style={{ color: "#0f9e7e" }}>
                    {"★".repeat(t.valutazione || 5)}
                  </div>
                  <p
                    className="text-sm leading-relaxed italic mb-4"
                    style={{ color: "#5e7d68" }}
                  >
                    "{t.testo}"
                  </p>
                  <p
                    className="text-sm font-medium"
                    style={{ color: "#1c2e24" }}
                  >
                    {t.nome_cliente}
                  </p>
                  <p
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: "10px",
                      color: "#5e7d68",
                    }}
                  >
                    {t.azienda}
                  </p>
                </div>
              )}
            />
          </SectionWrapper>
        </section>
      )}

      {/* ── FORM CONTATTI ── sfondo chiaro */}
      <section style={{ background: "#e8eee9" }}>
        <SectionWrapper>
          <div className="max-w-xl mx-auto">
            <div className="text-center mb-8">
              <SectionEyebrow label="Contatti" />
              <h2
                className="text-3xl font-medium tracking-tight"
                style={{ color: "#1c2e24", letterSpacing: "-0.02em" }}
              >
                {t("contatti.titolo")}
              </h2>
              <p
                className="mt-2 text-sm font-light"
                style={{ color: "#3d5c47" }}
              >
                {t("contatti.sottotitolo")}
              </p>
            </div>
            <ContactForm />
          </div>
        </SectionWrapper>
      </section>
    </>
  );
}
