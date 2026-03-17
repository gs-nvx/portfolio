import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import SectionWrapper from "../components/ui/SectionWrapper";
import SectionEyebrow from "../components/ui/SectionEyebrow";
import { useCmsSections } from "../hooks/useCms";

export default function PortfolioPage() {
  const { i18n } = useTranslation();
  const { getContent, loading } = useCmsSections(i18n.language);
  const portfolio = getContent("portfolio");

  if (loading) return null;

  return (
    <>
      <Helmet>
        <title>Portfolio — GST Code Lab</title>
      </Helmet>
      <div style={{ background: "#0a0f0d" }} className="pt-14 min-h-screen">
        <SectionWrapper>
          <div className="text-center mb-12">
            <SectionEyebrow label="Portfolio" />
            <h1
              className="text-4xl font-medium"
              style={{ color: "#e2ede8", letterSpacing: "-0.02em" }}
            >
              {portfolio?.titolo_sezione || "Casi studio"}
            </h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {portfolio?.casi_studio?.map((c, i) => (
              <div
                key={i}
                className="rounded-xl overflow-hidden group"
                style={{ background: "#0d1510", border: "0.5px solid #1a2e24" }}
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
                        color: "#2dd4a0",
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
                    style={{ background: "#0f2a1e", color: "#2dd4a0" }}
                  >
                    {c.tag}
                  </span>
                  <h2
                    className="font-medium mt-3 mb-2"
                    style={{ color: "#e2ede8" }}
                  >
                    {c.titolo}
                  </h2>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "#4d7060" }}
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
                        color: "#2dd4a0",
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
              style={{ color: "#4d7060" }}
            >
              Portfolio in costruzione — presto i primi casi studio.
            </p>
          )}
        </SectionWrapper>
      </div>
    </>
  );
}
