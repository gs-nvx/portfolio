import Input from "../../../components/ui/Input";
import Textarea from "../../../components/ui/Textarea";
import Button from "../../../components/ui/Button";

const emptyTestimonianza = () => ({
  nome_cliente: "",
  azienda: "",
  testo: "",
  valutazione: 5,
});

export default function TestimonianzeForm({ data, onChange }) {
  const set = (field) => (e) => onChange({ ...data, [field]: e.target.value });

  const setItem = (index, field, value) => {
    const updated = [...(data.testimonianze || [])];
    updated[index] = { ...updated[index], [field]: value };
    onChange({ ...data, testimonianze: updated });
  };

  const addItem = () =>
    onChange({
      ...data,
      testimonianze: [...(data.testimonianze || []), emptyTestimonianza()],
    });

  const removeItem = (index) => {
    const updated = (data.testimonianze || []).filter((_, i) => i !== index);
    onChange({ ...data, testimonianze: updated });
  };

  return (
    <div className="flex flex-col gap-6">
      <Input
        label="Titolo sezione"
        value={data.titolo_sezione || ""}
        onChange={set("titolo_sezione")}
        placeholder="Cosa dicono i clienti"
      />
      <div className="flex flex-col gap-4">
        <label className="text-sm text-gray-400">Testimonianze</label>
        {(data.testimonianze || []).map((t, i) => (
          <div
            key={i}
            className="bg-gray-800 border border-gray-700
            rounded-xl p-4 flex flex-col gap-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-white text-sm font-medium">
                Testimonianza {i + 1}
              </span>
              <Button variant="danger" onClick={() => removeItem(i)}>
                Rimuovi
              </Button>
            </div>
            <Input
              label="Nome cliente"
              value={t.nome_cliente || ""}
              onChange={(e) => setItem(i, "nome_cliente", e.target.value)}
              placeholder="Marco Rossi"
            />
            <Input
              label="Azienda"
              value={t.azienda || ""}
              onChange={(e) => setItem(i, "azienda", e.target.value)}
              placeholder="Ferramenta Rossi, Varese"
            />
            <Textarea
              label="Testo"
              value={t.testo || ""}
              onChange={(e) => setItem(i, "testo", e.target.value)}
              placeholder="Ottimo lavoro, consigliato."
              className="min-h-20"
            />
            <div className="flex flex-col gap-1">
              <label className="text-sm text-gray-400">
                Valutazione: {t.valutazione || 5} stelle
              </label>
              <input
                type="range"
                min="1"
                max="5"
                step="1"
                value={t.valutazione || 5}
                onChange={(e) =>
                  setItem(i, "valutazione", parseInt(e.target.value))
                }
                className="w-full accent-indigo-500"
              />
            </div>
          </div>
        ))}
        <Button variant="secondary" onClick={addItem}>
          + Aggiungi testimonianza
        </Button>
      </div>
    </div>
  );
}
