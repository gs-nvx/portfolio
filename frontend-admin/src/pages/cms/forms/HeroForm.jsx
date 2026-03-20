import Input from "../../../components/ui/Input";
import MediaPicker from "../../../components/ui/MediaPicker";

export default function HeroForm({ data, onChange }) {
  const set = (field) => (e) =>
    onChange({ ...data, [field]: e.target ? e.target.value : e });

  return (
    <div className="flex flex-col gap-4">
      <Input
        label="Titolo 1"
        value={data.titolo_parte1 || ""}
        onChange={set("titolo_parte1")}
        placeholder="Siti e gestionali"
      />
      <Input
        label="Titolo em"
        value={data.titolo_em || ""}
        onChange={set("titolo_em")}
        placeholder="su misura"
      />
      <Input
        label="Titolo 2"
        value={data.titolo_parte2 || ""}
        onChange={set("titolo_parte2")}
        placeholder="per la tua PMI"
      />
      <Input
        label="Sottotitolo"
        value={data.sottotitolo || ""}
        onChange={set("sottotitolo")}
        placeholder="Applicazioni web professionali per piccole e medie imprese."
      />
      <Input
        label="Testo CTA"
        value={data.testo_cta || ""}
        onChange={set("testo_cta")}
        placeholder="Scopri i servizi"
      />
      <Input
        label="Link CTA"
        value={data.link_cta || ""}
        onChange={set("link_cta")}
        placeholder="/servizi"
      />
      <MediaPicker
        label="Immagine di sfondo"
        value={data.immagine || ""}
        onChange={set("immagine")}
      />
    </div>
  );
}
