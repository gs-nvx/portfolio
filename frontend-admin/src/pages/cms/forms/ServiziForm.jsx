import Input from "../../../components/ui/Input";

export default function ServiziForm({ data, onChange }) {
  const set = (field) => (e) => onChange({ ...data, [field]: e.target.value });

  return (
    <div className="flex flex-col gap-4">
      <Input
        label="Titolo sezione"
        value={data.titolo_sezione || ""}
        onChange={set("titolo_sezione")}
        placeholder="Pacchetti e prezzi"
      />
      <Input
        label="Sottotitolo sezione"
        value={data.sottotitolo_sezione || ""}
        onChange={set("sottotitolo_sezione")}
        placeholder="Soluzioni per ogni esigenza"
      />
    </div>
  );
}
