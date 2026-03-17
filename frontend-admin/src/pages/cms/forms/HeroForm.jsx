import Input from "../../../components/ui/Input";
import MediaPicker from "../../../components/ui/MediaPicker";

export default function HeroForm({ data, onChange }) {
  const set = (field) => (e) =>
    onChange({ ...data, [field]: e.target ? e.target.value : e });

  return (
    <div className="flex flex-col gap-4">
      <Input
        label="Titolo"
        value={data.titolo || ""}
        onChange={set("titolo")}
        placeholder="Sviluppo web per PMI"
      />
      <Input
        label="Sottotitolo"
        value={data.sottotitolo || ""}
        onChange={set("sottotitolo")}
        placeholder="Siti e gestionali su misura per la tua azienda"
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
