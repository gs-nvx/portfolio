import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import SectionWrapper from "../components/ui/SectionWrapper";
import SectionEyebrow from "../components/ui/SectionEyebrow";
import ContactForm from "../components/ui/ContactForm";

export default function ContattiPage() {
  const { t } = useTranslation();
  return (
    <>
      <Helmet>
        <title>Contatti — GST Code Lab</title>
      </Helmet>
      <div style={{ background: "#0a0f0d" }} className="pt-14 min-h-screen">
        <SectionWrapper>
          <div className="max-w-xl mx-auto">
            <div className="text-center mb-10">
              <SectionEyebrow label="Contatti" />
              <h1
                className="text-4xl font-medium"
                style={{ color: "#e2ede8", letterSpacing: "-0.02em" }}
              >
                {t("contatti.titolo")}
              </h1>
              <p
                className="mt-3 text-sm font-light"
                style={{ color: "#4d7060" }}
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
