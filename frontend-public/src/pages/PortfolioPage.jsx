import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import SectionWrapper from "../components/ui/SectionWrapper";
import SectionEyebrow from "../components/ui/SectionEyebrow";
import { useCmsSections } from "../hooks/useCms";

export default function PortfolioPage() {
  const { i18n } = useTranslation();
  const { getContent, loading } = useCmsSections(i18n.language);
  const portfolio = getContent("portfolio");

  if (loading)
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "#ffffff" }}
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
        <title>Portfolio — GST Code Lab</title>
      </Helmet>
      <div style={{ background: "#ffffff" }} className="pt-14 min-h-screen">
        <SectionWrapper>
          <div className="text-center mb-12">
            <SectionEyebrow label="Portfolio" />
            <h1
              className="text-4xl font-medium"
              style={{ color: "#152820", letterSpacing: "-0.02em" }}
            >
              {portfolio?.titolo_sezione || "Casi studio"}
            </h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {portfolio?.casi_studio?.map((c, i) => (
              <div
                key={i}
                className="rounded-xl overflow-hidden group"
                style={{ background: "#f4f8f7", border: "0.5px solid #dceae5" }}
              >
                {c.immagine ? (
                  <img
                    src={c.immagine}
                    alt={c.titolo}
                    className="w-full h-48 object-cover
                        group-hover:scale-105 transition duration-500"
                  />
                ) : (
                  <div
                    className="w-full h-48 flex items-center justify-center"
                    style={{
                      background: "linear-gradient(135deg,#0f2a1e,#1a3d2b)",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'DM Mono', monospace",
                        fontSize: "10px",
                        color: "#8ab8a8",
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
                    style={{ background: "#8ab8a8", color: "#152820" }}
                  >
                    {c.tag}
                  </span>
                  <h2
                    className="font-medium mt-3 mb-2"
                    style={{ color: "#152820" }}
                  >
                    {c.titolo}
                  </h2>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "#5a8a7a" }}
                  >
                    {c.descrizione}
                  </p>
                  {c.link_esterno && (
                    <a
                      href={c.link_esterno}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-3 text-sm transition
                        hover:opacity-70"
                      style={{
                        color: "#34d5a8",
                        fontFamily: "'DM Mono', monospace",
                        fontSize: "11px",
                      }}
                    >
                      Visita il sito →
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
          {(!portfolio?.casi_studio || portfolio.casi_studio.length === 0) && (
            <p
              className="text-center py-16 text-sm"
              style={{ color: "#6e9aaa" }}
            >
              Portfolio in costruzione — presto i primi casi studio.
            </p>
          )}
        </SectionWrapper>
      </div>
    </>
  );
}
