import Input from "../../../components/ui/Input";
import Textarea from "../../../components/ui/Textarea";
import MediaPicker from "../../../components/ui/MediaPicker";
import Button from "../../../components/ui/Button";

export default function ChiSonoForm({ data, onChange }) {
  const set = (field) => (e) =>
    onChange({ ...data, [field]: e.target ? e.target.value : e });

  const setTecnologia = (index, value) => {
    const updated = [...(data.tecnologie || [])];
    updated[index] = value;
    onChange({ ...data, tecnologie: updated });
  };

  const addTecnologia = () =>
    onChange({ ...data, tecnologie: [...(data.tecnologie || []), ""] });

  const removeTecnologia = (index) => {
    const updated = (data.tecnologie || []).filter((_, i) => i !== index);
    onChange({ ...data, tecnologie: updated });
  };

  return (
    <div className="flex flex-col gap-4">
      <Input
        label="Titolo"
        value={data.titolo || ""}
        onChange={set("titolo")}
        placeholder="Chi sono"
      />
      <Textarea
        label="Testo"
        value={data.testo || ""}
        onChange={set("testo")}
        placeholder="Descrizione..."
        className="min-h-40"
      />
      <MediaPicker
        label="Foto profilo"
        value={data.immagine || ""}
        onChange={set("immagine")}
      />
      <Input
        label="Anni di esperienza"
        type="number"
        value={data.anni_esperienza || ""}
        onChange={(e) =>
          onChange({ ...data, anni_esperienza: parseInt(e.target.value) || 0 })
        }
        placeholder="3"
      />
      <div className="flex flex-col gap-2">
        <label className="text-sm text-gray-400">Tecnologie</label>
        {(data.tecnologie || []).map((tech, i) => (
          <div key={i} className="flex gap-2">
            <input
              value={tech}
              onChange={(e) => setTecnologia(i, e.target.value)}
              placeholder="es. Java"
              className="flex-1 bg-gray-800 text-white rounded-lg px-4 py-2.5
                text-sm border border-gray-700 outline-none
                focus:ring-2 focus:ring-indigo-500"
            />
            <Button variant="danger" onClick={() => removeTecnologia(i)}>
              ✕
            </Button>
          </div>
        ))}
        <Button variant="secondary" onClick={addTecnologia}>
          + Aggiungi tecnologia
        </Button>
      </div>
    </div>
  );
}
