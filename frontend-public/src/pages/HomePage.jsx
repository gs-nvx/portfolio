import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";
import SectionWrapper from "../components/ui/SectionWrapper";
import SectionEyebrow from "../components/ui/SectionEyebrow";
import BlogCard from "../components/ui/BlogCard";
import ContactForm from "../components/ui/ContactForm";
import { useCmsSections } from "../hooks/useCms";
import { getBlogPosts } from "../api/blogApi";

export default function HomePage() {
  const { t, i18n } = useTranslation();
  const { getContent, loading } = useCmsSections(i18n.language);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getBlogPosts(i18n.language, 0, 3).then((r) =>
      setPosts(r.data.content || []),
    );
  }, [i18n.language]);

  const hero = getContent("hero");
  const servizi = getContent("servizi");
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
            linear-gradient(rgba(45,212,160,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(45,212,160,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
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
              Vedi il portfolio →
            </Link>
          </div>
        </div>
      </section>

      {/* ── SERVIZI ── sfondo chiaro */}
      {servizi?.pacchetti?.length > 0 && (
        <section
          style={{
            background: "#f4f8f7",
            borderTop: "0.5px solid #dceae5",
            borderBottom: "0.5px solid #dceae5",
          }}
        >
          <SectionWrapper>
            <div className="text-center mb-10">
              <SectionEyebrow label="Servizi" />
              <h2
                className="text-3xl font-medium tracking-tight"
                style={{ color: "#152820", letterSpacing: "-0.02em" }}
              >
                {servizi.titolo_sezione}
              </h2>
              <p
                className="mt-2 text-sm font-light"
                style={{ color: "#8ab8a8" }}
              >
                {servizi.sottotitolo_sezione}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {servizi.pacchetti.map((p, i) => (
                <div
                  key={i}
                  className="rounded-xl p-6 flex flex-col gap-3"
                  style={{
                    background: "#ffffff",
                    border: p.evidenziato
                      ? "1px solid #0b7a5a"
                      : "0.5px solid #dceae5",
                  }}
                >
                  {p.evidenziato && (
                    <span
                      className="text-[10px] px-3 py-1 rounded-full w-fit"
                      style={{
                        background: "#e8f5f0",
                        color: "#0b7a5a",
                        fontFamily: "'DM Mono', monospace",
                      }}
                    >
                      Più scelto
                    </span>
                  )}
                  <h3
                    className="font-medium text-lg"
                    style={{ color: "#152820" }}
                  >
                    {p.nome}
                  </h3>
                  <div
                    className="text-3xl font-semibold"
                    style={{ color: "#0b7a5a", letterSpacing: "-0.02em" }}
                  >
                    €{p.prezzo_mese}
                    <span
                      className="text-sm font-light ml-1"
                      style={{ color: "#8ab8a8" }}
                    >
                      /mese
                    </span>
                  </div>
                  <p className="text-xs" style={{ color: "#8ab8a8" }}>
                    Setup €{p.prezzo_setup} una tantum
                  </p>
                  <ul
                    className="flex flex-col gap-1.5 pt-2"
                    style={{ borderTop: "0.5px solid #dceae5" }}
                  >
                    {p.features?.map((f, j) => (
                      <li
                        key={j}
                        className="text-sm flex gap-2"
                        style={{ color: "#5a8a7a" }}
                      >
                        <span style={{ color: "#0b7a5a" }}>↗</span> {f}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                to="/servizi"
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "11px",
                  color: "#0b7a5a",
                  letterSpacing: "0.05em",
                }}
              >
                Tutti i dettagli →
              </Link>
            </div>
          </SectionWrapper>
        </section>
      )}

      {/* ── PORTFOLIO ── sfondo scuro */}
      {portfolio?.casi_studio?.length > 0 && (
        <section
          style={{ background: "#0e1520", borderBottom: "0.5px solid #1a2e3a" }}
        >
          <SectionWrapper>
            <div className="text-center mb-10">
              <SectionEyebrow label="Portfolio" dark />
              <h2
                className="text-3xl font-medium tracking-tight"
                style={{ color: "#e8f0ee", letterSpacing: "-0.02em" }}
              >
                {portfolio.titolo_sezione}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {portfolio.casi_studio.slice(0, 3).map((c, i) => (
                <div
                  key={i}
                  className="rounded-xl overflow-hidden group"
                  style={{
                    background: "#162030",
                    border: "0.5px solid #1a2e3a",
                  }}
                >
                  {c.immagine ? (
                    <img
                      src={c.immagine}
                      alt={c.titolo}
                      className="w-full h-44 object-cover
                          group-hover:scale-105 transition duration-500"
                    />
                  ) : (
                    <div
                      className="w-full h-44 flex items-center justify-center"
                      style={{
                        background: "linear-gradient(135deg,#0f2a1e,#1a3d2b)",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'DM Mono', monospace",
                          fontSize: "10px",
                          color: "#34d5a8",
                          opacity: 0.4,
                        }}
                      >
                        {c.tag}
                      </span>
                    </div>
                  )}
                  <div className="p-5">
                    <span
                      className="text-[10px] px-2 py-1 rounded-full"
                      style={{ background: "#0d2a28", color: "#34d5a8" }}
                    >
                      {c.tag}
                    </span>
                    <h3
                      className="font-medium mt-3 mb-1"
                      style={{ color: "#e8f0ee" }}
                    >
                      {c.titolo}
                    </h3>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "#6e9aaa" }}
                    >
                      {c.descrizione}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                to="/portfolio"
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "11px",
                  color: "#34d5a8",
                  letterSpacing: "0.05em",
                }}
              >
                Tutti i progetti →
              </Link>
            </div>
          </SectionWrapper>
        </section>
      )}

      {/* ── BLOG ── sfondo chiaro */}
      {posts.length > 0 && (
        <section
          style={{ background: "#f4f8f7", borderBottom: "0.5px solid #dceae5" }}
        >
          <SectionWrapper>
            <div className="text-center mb-10">
              <SectionEyebrow label="Blog" />
              <h2
                className="text-3xl font-medium tracking-tight"
                style={{ color: "#152820", letterSpacing: "-0.02em" }}
              >
                Articoli recenti
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {posts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                to="/blog"
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "11px",
                  color: "#0b7a5a",
                  letterSpacing: "0.05em",
                }}
              >
                Tutti gli articoli →
              </Link>
            </div>
          </SectionWrapper>
        </section>
      )}

      {/* ── TESTIMONIANZE ── sfondo chiaro */}
      {testimonianze?.testimonianze?.length > 0 && (
        <section
          style={{ background: "#f4f8f7", borderBottom: "0.5px solid #dceae5" }}
        >
          <SectionWrapper>
            <div className="text-center mb-10">
              <SectionEyebrow label="Testimonianze" />
              <h2
                className="text-3xl font-medium tracking-tight"
                style={{ color: "#152820", letterSpacing: "-0.02em" }}
              >
                {testimonianze.titolo_sezione}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {testimonianze.testimonianze.map((t, i) => (
                <div
                  key={i}
                  className="rounded-xl p-6"
                  style={{
                    background: "#ffffff",
                    border: "0.5px solid #dceae5",
                  }}
                >
                  <div className="text-sm mb-3" style={{ color: "#0b7a5a" }}>
                    {"★".repeat(t.valutazione || 5)}
                  </div>
                  <p
                    className="text-sm leading-relaxed italic mb-4"
                    style={{ color: "#5a8a7a" }}
                  >
                    "{t.testo}"
                  </p>
                  <p
                    className="text-sm font-medium"
                    style={{ color: "#152820" }}
                  >
                    {t.nome_cliente}
                  </p>
                  <p
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: "10px",
                      color: "#0b7a5a",
                    }}
                  >
                    {t.azienda}
                  </p>
                </div>
              ))}
            </div>
          </SectionWrapper>
        </section>
      )}

      {/* ── FORM CONTATTI ── sfondo chiaro */}
      <section style={{ background: "#f4f8f7" }}>
        <SectionWrapper>
          <div className="max-w-xl mx-auto">
            <div className="text-center mb-8">
              <SectionEyebrow label="Contatti" />
              <h2
                className="text-3xl font-medium tracking-tight"
                style={{ color: "#152820", letterSpacing: "-0.02em" }}
              >
                {t("contatti.titolo")}
              </h2>
              <p
                className="mt-2 text-sm font-light"
                style={{ color: "#8ab8a8" }}
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
