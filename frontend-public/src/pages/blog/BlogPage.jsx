import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import SectionWrapper from "../../components/ui/SectionWrapper";
import SectionEyebrow from "../../components/ui/SectionEyebrow";
import BlogCard from "../../components/ui/BlogCard";
import { getBlogPosts } from "../../api/blogApi";

export default function BlogPage() {
  const { i18n } = useTranslation();
  const [data, setData] = useState(null);
  const [page, setPage] = useState(0);

  useEffect(() => {
    getBlogPosts(i18n.language, page).then((r) => setData(r.data));
  }, [i18n.language, page]);

  return (
    <>
      <Helmet>
        <title>Blog — GST Code Lab</title>
      </Helmet>
      <div style={{ background: "#f4f8f7" }} className="pt-14 min-h-screen">
        <SectionWrapper>
          <div className="text-center mb-12">
            <SectionEyebrow label="Blog" />
            <h1
              className="text-4xl font-medium"
              style={{ color: "#152820", letterSpacing: "-0.02em" }}
            >
              Articoli
            </h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {data?.content?.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
          {data?.content?.length === 0 && (
            <p
              className="text-center py-16 text-sm"
              style={{ color: "#8ab8a8" }}
            >
              Nessun articolo pubblicato.
            </p>
          )}
          {data?.totalPages > 1 && (
            <div className="flex justify-center items-center gap-6 mt-10">
              <button
                disabled={page === 0}
                onClick={() => setPage((p) => p - 1)}
                className="text-sm transition disabled:opacity-30"
                style={{
                  color: "#5a8a7a",
                  fontFamily: "'DM Mono', monospace",
                }}
              >
                ← Precedente
              </button>
              <span
                className="text-xs"
                style={{ color: "#8ab8a8", fontFamily: "'DM Mono', monospace" }}
              >
                {page + 1} / {data.totalPages}
              </span>
              <button
                disabled={page >= data.totalPages - 1}
                onClick={() => setPage((p) => p + 1)}
                className="text-sm transition disabled:opacity-30"
                style={{
                  color: "#5a8a7a",
                  fontFamily: "'DM Mono', monospace",
                }}
              >
                Successiva →
              </button>
            </div>
          )}
        </SectionWrapper>
      </div>
    </>
  );
}
