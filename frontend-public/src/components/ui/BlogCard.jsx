import { Link } from "react-router-dom";

export default function BlogCard({ post }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="rounded-xl p-5 flex flex-col gap-3 group transition"
      style={{
        background: "#0a0f0d",
        border: "0.5px solid #1a2e24",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#2dd4a0")}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#1a2e24")}
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
          className="text-xs text-teal-400 bg-teal-900/40
          px-2 py-1 rounded-full w-fit"
        >
          {post.category}
        </span>
      )}
      <h3
        className="text-white font-medium text-base leading-snug
        group-hover:text-teal-400 transition"
      >
        {post.title}
      </h3>
      {post.seoDescription && (
        <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed">
          {post.seoDescription}
        </p>
      )}
      {post.publishedAt && (
        <span className="text-gray-600 text-xs mt-auto">
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
