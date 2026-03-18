import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import SectionWrapper from "../components/ui/SectionWrapper";
import SectionEyebrow from "../components/ui/SectionEyebrow";
import PortfolioCard from "../components/ui/PortfolioCard";
import PortfolioModal from "../components/ui/PortfolioModal";
import { useCmsSections } from "../hooks/useCms";

export default function PortfolioPage() {
  const { i18n } = useTranslation();
  const { getContent, loading } = useCmsSections(i18n.language);
  const portfolio = getContent("portfolio");
  const [selectedCaso, setSelectedCaso] = useState(null);

  if (loading) return null;

  return (
    <>
      <Helmet>
        <title>Portfolio — GST Code Lab</title>
      </Helmet>
      <div style={{ background: "#e8eee9" }} className="pt-14 min-h-screen">
        <SectionWrapper>
          <div className="text-center mb-12">
            <SectionEyebrow label="Portfolio" />
            <h1
              className="text-4xl font-medium"
              style={{ color: "#1c2e24", letterSpacing: "-0.02em" }}
            >
              {portfolio?.titolo_sezione || "Casi studio"}
            </h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {portfolio?.casi_studio?.map((c, i) => (
              <PortfolioCard
                key={i}
                caso={c}
                showLink={true}
                onInfoClick={setSelectedCaso}
              />
            ))}
          </div>
          {(!portfolio?.casi_studio || portfolio.casi_studio.length === 0) && (
            <p
              className="text-center py-16 text-sm"
              style={{ color: "#3d5c47" }}
            >
              Portfolio in costruzione — presto i primi casi studio.
            </p>
          )}
        </SectionWrapper>
      </div>

      <PortfolioModal
        caso={selectedCaso}
        onClose={() => setSelectedCaso(null)}
      />
    </>
  );
}
