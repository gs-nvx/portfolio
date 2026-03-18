import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import SectionWrapper from "../../components/ui/SectionWrapper";
import { getBlogPost } from "../../api/blogApi";

export default function BlogPostPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBlogPost(slug, i18n.language)
      .then((r) => setPost(r.data))
      .catch(() => navigate("/blog", { replace: true }))
      .finally(() => setLoading(false));
  }, [slug, i18n.language]);

  if (loading)
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "#e8eee9" }}
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
        <title>{post?.seoTitle || post?.title} — GST Code Lab</title>
        <meta name="description" content={post?.seoDescription || ""} />
        {post?.seoOgImage && (
          <meta property="og:image" content={post.seoOgImage} />
        )}
      </Helmet>
      <div style={{ background: "#e8eee9" }} className="pt-14 min-h-screen">
        <SectionWrapper>
          <div className="max-w-2xl mx-auto">
            <div className="mb-8">
              {post?.category && (
                <span
                  className="text-[10px] px-3 py-1 rounded-full"
                  style={{ background: "#0f9e7e", color: "#ffffff" }}
                >
                  {post.category}
                </span>
              )}
              <h1
                className="text-3xl font-medium mt-4 mb-3 leading-snug"
                style={{ color: "#1c2e24", letterSpacing: "-0.02em" }}
              >
                {post?.title}
              </h1>
              {post?.publishedAt && (
                <p
                  className="text-xs"
                  style={{
                    color: "#8ab8a8",
                    fontFamily: "'DM Mono', monospace",
                  }}
                >
                  {new Date(post.publishedAt).toLocaleDateString("it-IT", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              )}
            </div>
            {post?.seoOgImage && (
              <img
                src={post.seoOgImage}
                alt={post.title}
                className="w-full rounded-xl mb-8"
                style={{ border: "0.5px solid #dceae5" }}
              />
            )}
            <div
              className="text-base leading-relaxed whitespace-pre-line"
              style={{ color: "#5e7d68", fontWeight: 300 }}
            >
              {post?.body}
            </div>
          </div>
        </SectionWrapper>
        <div className="max-w-2xl mx-auto px-6 pt-8">
          <Link
            to="/blog"
            style={{
              color: "#0f9e7e",
              fontFamily: "'DM Mono', monospace",
              fontSize: "12px",
              textDecoration: "none",
            }}
          >
            ← Blog
          </Link>
        </div>
      </div>
    </>
  );
}
