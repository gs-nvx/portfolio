import { Link } from "react-router-dom";

export default function BlogCard({ post }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="rounded-xl p-5 flex flex-col gap-3 group transition"
      style={{
        background: "#ffffff",
        border: "0.5px solid #d0dcd2",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#0f9e7e")}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#d0dcd2")}
    >
      {post.seoOgImage && (
        <img
          src={post.seoOgImage}
          alt={post.title}
          className="w-full h-40 object-cover rounded-lg"
        />
      )}
      {post.category && (
        <span
          className="text-xs px-2 py-1 rounded-full w-fit"
          style={{ color: "#0f9e7e", background: "#e8f5f0" }}
        >
          {post.category}
        </span>
      )}
      <h3
        className="font-medium text-base leading-snug group-hover:text-[#0b7a5a] transition"
        style={{ color: "#152820" }}
      >
        {post.title}
      </h3>
      {post.seoDescription && (
        <p
          className="text-sm line-clamp-2 leading-relaxed"
          style={{ color: "#5a8a7a" }}
        >
          {post.seoDescription}
        </p>
      )}
      {post.publishedAt && (
        <span className="text-xs mt-auto" style={{ color: "#8ab8a8" }}>
          {new Date(post.publishedAt).toLocaleDateString("it-IT", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </span>
      )}
    </Link>
  );
}
