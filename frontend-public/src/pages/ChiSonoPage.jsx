import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import SectionWrapper from "../components/ui/SectionWrapper";
import SectionEyebrow from "../components/ui/SectionEyebrow";
import { useCmsSections } from "../hooks/useCms";

export default function ChiSonoPage() {
  const { i18n } = useTranslation();
  const { getContent, loading } = useCmsSections(i18n.language);
  const chiSono = getContent("chi_sono");

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
        <title>Chi sono — GST Code Lab</title>
      </Helmet>
      <div style={{ background: "#f2f5f3" }} className="pt-14 min-h-screen">
        <SectionWrapper>
          <div className="max-w-2xl mx-auto">
            <SectionEyebrow label="Chi sono" />
            <h1
              className="text-4xl font-medium mb-6"
              style={{ color: "#1c2e24", letterSpacing: "-0.02em" }}
            >
              {chiSono?.titolo || "Chi sono"}
            </h1>
            {chiSono?.immagine && (
              <img
                src={chiSono.immagine}
                alt="Foto profilo"
                className="w-32 h-32 rounded-full object-cover mb-8"
                style={{ border: "2px solid #1d4a35" }}
              />
            )}
            <p
              className="text-base leading-relaxed mb-8 whitespace-pre-line"
              style={{ color: "#5e7d68", fontWeight: 300 }}
            >
              {chiSono?.testo}
            </p>
            {chiSono?.anni_esperienza && (
              <div className="flex items-baseline gap-2 mb-6">
                <span
                  className="text-3xl font-semibold"
                  style={{ color: "#0f9e7e", letterSpacing: "-0.02em" }}
                >
                  {chiSono.anni_esperienza}+
                </span>
                <span className="text-sm" style={{ color: "#0f9e7e" }}>
                  anni di esperienza
                </span>
              </div>
            )}
            {chiSono?.tecnologie?.length > 0 && (
              <div>
                <p
                  className="text-xs mb-3 uppercase tracking-widest"
                  style={{
                    color: "#6e9aaa",
                    fontFamily: "'DM Mono', monospace",
                  }}
                >
                  Tecnologie
                </p>
                <div className="flex flex-wrap gap-2">
                  {chiSono.tecnologie.map((tech, i) => (
                    <span
                      key={i}
                      className="text-sm px-3 py-1 rounded-lg"
                      style={{
                        background: "#162030",
                        border: "0.5px solid #1a2e3a",
                        color: "#6b8f7d",
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </SectionWrapper>
      </div>
    </>
  );
}
