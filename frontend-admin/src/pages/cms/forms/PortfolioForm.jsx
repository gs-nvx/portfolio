import Input from "../../../components/ui/Input";
import Textarea from "../../../components/ui/Textarea";
import MediaPicker from "../../../components/ui/MediaPicker";
import Button from "../../../components/ui/Button";

const emptyCaso = () => ({
  titolo: "",
  descrizione: "",
  immagine: "",
  tag: "",
  link_esterno: "",
});

export default function PortfolioForm({ data, onChange }) {
  const set = (field) => (e) => onChange({ ...data, [field]: e.target.value });

  const setCaso = (index, field, value) => {
    const updated = [...(data.casi_studio || [])];
    updated[index] = { ...updated[index], [field]: value };
    onChange({ ...data, casi_studio: updated });
  };

  const addCaso = () =>
    onChange({
      ...data,
      casi_studio: [...(data.casi_studio || []), emptyCaso()],
    });

  const removeCaso = (index) => {
    const updated = (data.casi_studio || []).filter((_, i) => i !== index);
    onChange({ ...data, casi_studio: updated });
  };

  return (
    <div className="flex flex-col gap-6">
      <Input
        label="Titolo sezione"
        value={data.titolo_sezione || ""}
        onChange={set("titolo_sezione")}
        placeholder="Portfolio"
      />
      <div className="flex flex-col gap-4">
        <label className="text-sm text-gray-400">Casi studio</label>
        {(data.casi_studio || []).map((c, i) => (
          <div
            key={i}
            className="bg-gray-800 border border-gray-700
            rounded-xl p-4 flex flex-col gap-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-white text-sm font-medium">
                Caso studio {i + 1}
              </span>
              <Button variant="danger" onClick={() => removeCaso(i)}>
                Rimuovi
              </Button>
            </div>
            <Input
              label="Titolo"
              value={c.titolo || ""}
              onChange={(e) => setCaso(i, "titolo", e.target.value)}
              placeholder="Ferramenta Rossi"
            />
            <Textarea
              label="Descrizione"
              value={c.descrizione || ""}
              onChange={(e) => setCaso(i, "descrizione", e.target.value)}
              placeholder="Sito vetrina con catalogo prodotti"
              className="min-h-16"
            />
            <Input
              label="Tag"
              value={c.tag || ""}
              onChange={(e) => setCaso(i, "tag", e.target.value)}
              placeholder="Vetrina / E-commerce / Gestionale"
            />
            <MediaPicker
              label="Immagine"
              value={c.immagine || ""}
              onChange={(val) => setCaso(i, "immagine", val)}
            />
            <Input
              label="Link esterno (opzionale)"
              value={c.link_esterno || ""}
              onChange={(e) => setCaso(i, "link_esterno", e.target.value)}
              placeholder="https://esempio.it"
            />
          </div>
        ))}
        <Button variant="secondary" onClick={addCaso}>
          + Aggiungi caso studio
        </Button>
      </div>
    </div>
  );
}
