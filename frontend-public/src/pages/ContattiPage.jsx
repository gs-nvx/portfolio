import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import SectionWrapper from "../components/ui/SectionWrapper";
import SectionEyebrow from "../components/ui/SectionEyebrow";
import ContactForm from "../components/ui/ContactForm";
import { useCmsSections } from "../hooks/useCms";

export default function ContattiPage() {
  const { t, i18n } = useTranslation();
  const { loading } = useCmsSections(i18n.language);

  if (loading)
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "#f2f5f3" }}
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
        <title>Contatti — GST Code Lab</title>
      </Helmet>
      <div style={{ background: "#f2f5f3" }} className="pt-14 min-h-screen">
        <SectionWrapper>
          <div className="max-w-xl mx-auto">
            <div className="text-center mb-10">
              <SectionEyebrow label="Contatti" />
              <h1
                className="text-4xl font-medium"
                style={{ color: "#152820", letterSpacing: "-0.02em" }}
              >
                {t("contatti.titolo")}
              </h1>
              <p
                className="mt-3 text-sm font-light"
                style={{ color: "#8ab8a8" }}
              >
                {t("contatti.sottotitolo")}
              </p>
            </div>
            <ContactForm />
          </div>
        </SectionWrapper>
      </div>
    </>
  );
}
