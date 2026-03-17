import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../components/layout/AdminLayout";
import { useBlogPosts, useDeleteBlogPost } from "../../hooks/useBlog";
import Button from "../../components/ui/Button";

const STATUS_LABELS = {
  DRAFT: { label: "Bozza", color: "text-yellow-400 bg-yellow-400/10" },
  PUBLISHED: { label: "Pubblicato", color: "text-green-400 bg-green-400/10" },
};

export default function BlogListPage() {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const { data, isLoading } = useBlogPosts("it", page);
  const deleteMutation = useDeleteBlogPost();

  const handleDelete = (id) => {
    if (confirm("Eliminare questo articolo?")) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading)
    return (
      <AdminLayout>
        <p className="text-gray-400">Caricamento...</p>
      </AdminLayout>
    );

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Blog</h1>
        <Button onClick={() => navigate("/blog/new")}>+ Nuovo articolo</Button>
      </div>

      <div className="flex flex-col gap-3">
        {data?.content?.map((post) => (
          <div
            key={post.id}
            className="bg-gray-900 border border-gray-800 rounded-xl
              p-4 flex items-center justify-between"
          >
            <div>
              <p className="text-white font-medium">{post.title}</p>
              <div className="flex items-center gap-3 mt-1">
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-medium
                  ${STATUS_LABELS[post.status].color}`}
                >
                  {STATUS_LABELS[post.status].label}
                </span>
                {post.category && (
                  <span className="text-gray-500 text-xs">{post.category}</span>
                )}
                {post.publishedAt && (
                  <span className="text-gray-500 text-xs">
                    {new Date(post.publishedAt).toLocaleDateString("it-IT")}
                  </span>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="secondary"
                onClick={() => navigate(`/blog/${post.id}`)}
              >
                Modifica
              </Button>
              <Button
                variant="danger"
                onClick={() => handleDelete(post.id)}
                disabled={deleteMutation.isPending}
              >
                Elimina
              </Button>
            </div>
          </div>
        ))}

        {data?.content?.length === 0 && (
          <p className="text-gray-500 text-center py-12">
            Nessun articolo. Crea il primo!
          </p>
        )}
      </div>

      {/* Paginazione */}
      {data?.totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          <Button
            variant="ghost"
            disabled={page === 0}
            onClick={() => setPage((p) => p - 1)}
          >
            ← Precedente
          </Button>
          <span className="text-gray-400 text-sm self-center">
            {page + 1} / {data.totalPages}
          </span>
          <Button
            variant="ghost"
            disabled={page >= data.totalPages - 1}
            onClick={() => setPage((p) => p + 1)}
          >
            Successiva →
          </Button>
        </div>
      )}
    </AdminLayout>
  );
}
