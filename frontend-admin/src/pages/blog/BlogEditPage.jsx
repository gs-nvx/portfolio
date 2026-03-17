import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../../components/layout/AdminLayout";
import {
  useBlogPost,
  useCreateBlogPost,
  useUpdateBlogPost,
} from "../../hooks/useBlog";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Textarea from "../../components/ui/Textarea";
import MediaPicker from "../../components/ui/MediaPicker";

export default function BlogEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = id === "new";

  const { data: post, isLoading } = useBlogPost(isNew ? null : id);
  const createMutation = useCreateBlogPost();
  const updateMutation = useUpdateBlogPost();

  const [form, setForm] = useState({
    title: "",
    body: "",
    category: "",
    seoTitle: "",
    seoDescription: "",
    seoOgImage: "",
    locale: "it",
    status: "DRAFT",
  });

  useEffect(() => {
    if (post)
      setForm({
        title: post.title || "",
        body: post.body || "",
        category: post.category || "",
        seoTitle: post.seoTitle || "",
        seoDescription: post.seoDescription || "",
        seoOgImage: post.seoOgImage || "",
        locale: post.locale || "it",
        status: post.status || "DRAFT",
      });
  }, [post]);

  const set = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target ? e.target.value : e }));

  const handleSave = (status) => {
    const data = { ...form, status };
    if (isNew) {
      createMutation.mutate(data, {
        onSuccess: (res) => navigate(`/blog/${res.data.id}`),
      });
    } else {
      updateMutation.mutate(
        { id, data },
        {
          onSuccess: () => navigate("/blog"),
        },
      );
    }
  };

  if (!isNew && isLoading)
    return (
      <AdminLayout>
        <p className="text-gray-400">Caricamento...</p>
      </AdminLayout>
    );

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">
          {isNew ? "Nuovo articolo" : "Modifica articolo"}
        </h1>
        <div className="flex gap-2">
          <Button variant="ghost" onClick={() => navigate("/blog")}>
            Annulla
          </Button>
          <Button
            variant="secondary"
            onClick={() => handleSave("DRAFT")}
            disabled={isPending}
          >
            Salva bozza
          </Button>
          <Button onClick={() => handleSave("PUBLISHED")} disabled={isPending}>
            {isPending ? "Salvataggio..." : "Pubblica"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Colonna principale */}
        <div className="col-span-2 flex flex-col gap-4">
          <Input
            label="Titolo"
            value={form.title}
            onChange={set("title")}
            placeholder="Titolo dell'articolo"
          />
          <Textarea
            label="Contenuto"
            value={form.body}
            onChange={set("body")}
            placeholder="Scrivi il contenuto dell'articolo..."
            className="min-h-96"
          />
        </div>

        {/* Colonna laterale */}
        <div className="flex flex-col gap-4">
          <div
            className="bg-gray-900 border border-gray-800 rounded-xl p-4
            flex flex-col gap-4"
          >
            <h2 className="text-white font-medium">Dettagli</h2>
            <Input
              label="Categoria"
              value={form.category}
              onChange={set("category")}
              placeholder="es. Consigli"
            />
            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-400">Lingua</label>
              <select
                value={form.locale}
                onChange={set("locale")}
                className="bg-gray-800 text-white rounded-lg px-4 py-2.5
                  text-sm border border-gray-700 outline-none
                  focus:ring-2 focus:ring-indigo-500"
              >
                <option value="it">Italiano</option>
                <option value="en">English</option>
              </select>
            </div>
          </div>

          <div
            className="bg-gray-900 border border-gray-800 rounded-xl p-4
            flex flex-col gap-4"
          >
            <h2 className="text-white font-medium">SEO</h2>
            <Input
              label="SEO Title"
              value={form.seoTitle}
              onChange={set("seoTitle")}
              placeholder="Titolo per i motori di ricerca"
            />
            <Textarea
              label="SEO Description"
              value={form.seoDescription}
              onChange={set("seoDescription")}
              placeholder="Descrizione per i motori di ricerca (max 160 caratteri)"
              className="min-h-20"
            />
            <MediaPicker
              label="OG Image"
              value={form.seoOgImage}
              onChange={set("seoOgImage")}
            />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
