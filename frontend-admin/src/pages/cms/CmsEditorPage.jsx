import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import AdminLayout from "../../components/layout/AdminLayout";
import {
  useCmsSections,
  useUpdateCmsSection,
  useToggleCmsSection,
} from "../../hooks/useCms";
import Button from "../../components/ui/Button";
import Toggle from "../../components/ui/Toggle";
import Modal from "../../components/ui/Modal";
import HeroForm from "./forms/HeroForm";
import ServiziForm from "./forms/ServiziForm";
import PortfolioForm from "./forms/PortfolioForm";
import ChiSonoForm from "./forms/ChiSonoForm";
import TestimonianzeForm from "./forms/TestimonianzeForm";
import { updateSectionsOrder } from "../../api/cmsApi";

const SECTION_LABELS = {
  hero: "Hero",
  servizi: "Servizi / Prezzi",
  portfolio: "Portfolio",
  chi_sono: "Chi sono",
  testimonianze: "Testimonianze",
};

const SECTION_FORMS = {
  hero: HeroForm,
  servizi: ServiziForm,
  portfolio: PortfolioForm,
  chi_sono: ChiSonoForm,
  testimonianze: TestimonianzeForm,
};

export default function CmsEditorPage() {
  const { data: sections, isLoading } = useCmsSections("it");
  const toggleMutation = useToggleCmsSection();
  const updateMutation = useUpdateCmsSection();
  const queryClient = useQueryClient();

  const [editingSection, setEditingSection] = useState(null);
  const [formData, setFormData] = useState({});
  const [reordering, setReordering] = useState(false);

  const openEdit = (section) => {
    setEditingSection(section);
    try {
      setFormData(JSON.parse(section.contentJson));
    } catch {
      setFormData({});
    }
  };

  const handleSave = () => {
    updateMutation.mutate(
      {
        id: editingSection.id,
        data: {
          enabled: editingSection.enabled,
          contentJson: JSON.stringify(formData),
          sortOrder: editingSection.sortOrder,
        },
      },
      {
        onSuccess: () => setEditingSection(null),
      },
    );
  };

  const moveSection = async (index, direction) => {
    if (!sections) return;
    const sorted = [...sections].sort((a, b) => a.sortOrder - b.sortOrder);
    const swapIndex = direction === "up" ? index - 1 : index + 1;
    if (swapIndex < 0 || swapIndex >= sorted.length) return;

    setReordering(true);
    const orders = sorted.map((s, i) => {
      if (i === index)
        return { id: s.id, sortOrder: sorted[swapIndex].sortOrder };
      if (i === swapIndex)
        return { id: s.id, sortOrder: sorted[index].sortOrder };
      return { id: s.id, sortOrder: s.sortOrder };
    });

    try {
      await updateSectionsOrder(orders);
      queryClient.invalidateQueries({ queryKey: ["cms-sections"] });
    } finally {
      setReordering(false);
    }
  };

  const FormComponent = editingSection
    ? SECTION_FORMS[editingSection.sectionKey]
    : null;

  if (isLoading)
    return (
      <AdminLayout>
        <p className="text-gray-400">Caricamento...</p>
      </AdminLayout>
    );

  const sorted = [...(sections || [])].sort(
    (a, b) => a.sortOrder - b.sortOrder,
  );

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold text-white mb-6">CMS Editor</h1>

      <div className="flex flex-col gap-3">
        {sorted.map((section, index) => (
          <div
            key={section.id}
            className="bg-gray-900 border border-gray-800 rounded-xl
              p-4 flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="flex flex-col gap-1">
                <button
                  onClick={() => moveSection(index, "up")}
                  disabled={index === 0 || reordering}
                  className="text-gray-600 hover:text-white disabled:opacity-20
                    text-xs leading-none transition"
                >
                  ▲
                </button>
                <button
                  onClick={() => moveSection(index, "down")}
                  disabled={index === sorted.length - 1 || reordering}
                  className="text-gray-600 hover:text-white disabled:opacity-20
                    text-xs leading-none transition"
                >
                  ▼
                </button>
              </div>
              <Toggle
                enabled={section.enabled}
                onChange={() => toggleMutation.mutate(section.id)}
              />
              <div>
                <p className="text-white font-medium">
                  {SECTION_LABELS[section.sectionKey] || section.sectionKey}
                </p>
                <p className="text-gray-500 text-xs">
                  Ordine: {section.sortOrder} · Aggiornato:{" "}
                  {new Date(section.updatedAt).toLocaleDateString("it-IT")}
                </p>
              </div>
            </div>
            <Button variant="secondary" onClick={() => openEdit(section)}>
              Modifica contenuto
            </Button>
          </div>
        ))}
      </div>

      <Modal
        open={!!editingSection}
        onClose={() => setEditingSection(null)}
        title={`Modifica — ${SECTION_LABELS[editingSection?.sectionKey] || editingSection?.sectionKey}`}
      >
        <div className="flex flex-col gap-4">
          {FormComponent ? (
            <FormComponent data={formData} onChange={setFormData} />
          ) : (
            <p className="text-gray-500 text-sm">
              Form non disponibile per questa sezione.
            </p>
          )}
          <div className="flex justify-end gap-2 pt-2 border-t border-gray-800">
            <Button variant="ghost" onClick={() => setEditingSection(null)}>
              Annulla
            </Button>
            <Button onClick={handleSave} disabled={updateMutation.isPending}>
              {updateMutation.isPending ? "Salvataggio..." : "Salva"}
            </Button>
          </div>
        </div>
      </Modal>
    </AdminLayout>
  );
}
