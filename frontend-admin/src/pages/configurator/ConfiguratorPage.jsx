import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AdminLayout from "../../components/layout/AdminLayout";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Modal from "../../components/ui/Modal";
import Textarea from "../../components/ui/Textarea";
import Toggle from "../../components/ui/Toggle";
import {
  getPackages,
  createPackage,
  updatePackage,
  deletePackage,
  getServices,
  createService,
  updateService,
  deleteService,
} from "../../api/configuratorApi";

const CATEGORIES = [
  "Sito pubblico",
  "SEO e ottimizzazione",
  "Area riservata",
  "E-commerce",
  "Gestionale interno",
  "Integrazioni",
  "Manutenzione e supporto",
];

const emptyPkg = {
  name: "",
  description: "",
  setupAmount: 0,
  monthlyAmount: 0,
  sortOrder: 1,
  enabled: true,
};
const emptySvc = {
  category: CATEGORIES[0],
  name: "",
  description: "",
  setupAmount: 0,
  monthlyAmount: 0,
  requiresPackageId: null,
  requiresServiceId: null,
  sortOrder: 1,
  enabled: true,
};

export default function ConfiguratorPage() {
  const qc = useQueryClient();
  const [tab, setTab] = useState("packages");
  const [modal, setModal] = useState(null); // { type: 'pkg'|'svc', data }

  const { data: packages = [] } = useQuery({
    queryKey: ["cfg-packages"],
    queryFn: () => getPackages().then((r) => r.data),
  });
  const { data: services = [] } = useQuery({
    queryKey: ["cfg-services"],
    queryFn: () => getServices().then((r) => r.data),
  });

  const savePkg = useMutation({
    mutationFn: (d) => (d.id ? updatePackage(d.id, d) : createPackage(d)),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["cfg-packages"] });
      setModal(null);
    },
  });
  const delPkg = useMutation({
    mutationFn: deletePackage,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["cfg-packages"] }),
  });
  const saveSvc = useMutation({
    mutationFn: (d) => (d.id ? updateService(d.id, d) : createService(d)),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["cfg-services"] });
      setModal(null);
    },
  });
  const delSvc = useMutation({
    mutationFn: deleteService,
    onSuccess: () => qc.invalidateQueries({ queryKey: ["cfg-services"] }),
  });

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Configuratore</h1>
        <Button
          onClick={() =>
            setModal({
              type: tab === "packages" ? "pkg" : "svc",
              data: tab === "packages" ? { ...emptyPkg } : { ...emptySvc },
            })
          }
        >
          + Aggiungi
        </Button>
      </div>

      {/* Tab */}
      <div className="flex gap-2 mb-6">
        {["packages", "services"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="px-4 py-2 rounded-lg text-sm transition"
            style={{
              background: tab === t ? "#0f6e56" : "#161b22",
              color: tab === t ? "#fff" : "#6b8f7d",
              border: "0.5px solid #1a2e24",
            }}
          >
            {t === "packages" ? "Pacchetti" : "Servizi extra"}
          </button>
        ))}
      </div>

      {/* Lista pacchetti */}
      {tab === "packages" && (
        <div className="flex flex-col gap-3">
          {packages.map((p) => (
            <div
              key={p.id}
              className="bg-gray-900 border border-gray-800 rounded-xl
                p-4 flex items-center justify-between"
            >
              <div>
                <p className="text-white font-medium">{p.name}</p>
                <p className="text-gray-500 text-xs mt-0.5">
                  Setup €{p.setupAmount} · €{p.monthlyAmount}/mese · Ordine{" "}
                  {p.sortOrder}
                  {!p.enabled && (
                    <span className="text-red-400 ml-2">disabilitato</span>
                  )}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  onClick={() => setModal({ type: "pkg", data: { ...p } })}
                >
                  Modifica
                </Button>
                <Button
                  variant="danger"
                  onClick={() => confirm("Eliminare?") && delPkg.mutate(p.id)}
                >
                  Elimina
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lista servizi */}
      {tab === "services" && (
        <div className="flex flex-col gap-3">
          {services.map((s) => (
            <div
              key={s.id}
              className="bg-gray-900 border border-gray-800 rounded-xl
                p-4 flex items-center justify-between"
            >
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <span
                    className="text-[10px] px-2 py-0.5 rounded-full"
                    style={{ background: "#0f2a1e", color: "#2dd4a0" }}
                  >
                    {s.category}
                  </span>
                  {!s.enabled && (
                    <span className="text-red-400 text-xs">disabilitato</span>
                  )}
                </div>
                <p className="text-white font-medium">{s.name}</p>
                <p className="text-gray-500 text-xs mt-0.5">
                  Setup €{s.setupAmount} · €{s.monthlyAmount}/mese
                  {s.requiresPackageId && (
                    <span className="text-yellow-500 ml-2">
                      richiede pacchetto #{s.requiresPackageId}
                    </span>
                  )}
                  {s.requiresServiceId && (
                    <span className="text-yellow-500 ml-2">
                      richiede servizio #{s.requiresServiceId}
                    </span>
                  )}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  onClick={() => setModal({ type: "svc", data: { ...s } })}
                >
                  Modifica
                </Button>
                <Button
                  variant="danger"
                  onClick={() => confirm("Eliminare?") && delSvc.mutate(s.id)}
                >
                  Elimina
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal pacchetto */}
      <Modal
        open={modal?.type === "pkg"}
        onClose={() => setModal(null)}
        title={modal?.data?.id ? "Modifica pacchetto" : "Nuovo pacchetto"}
      >
        {modal?.type === "pkg" && (
          <PackageForm
            data={modal.data}
            services={services}
            onChange={(data) => setModal((m) => ({ ...m, data }))}
            onSave={() => savePkg.mutate(modal.data)}
            onCancel={() => setModal(null)}
            saving={savePkg.isPending}
          />
        )}
      </Modal>

      {/* Modal servizio */}
      <Modal
        open={modal?.type === "svc"}
        onClose={() => setModal(null)}
        title={modal?.data?.id ? "Modifica servizio" : "Nuovo servizio"}
      >
        {modal?.type === "svc" && (
          <ServiceForm
            data={modal.data}
            packages={packages}
            services={services}
            onChange={(data) => setModal((m) => ({ ...m, data }))}
            onSave={() => saveSvc.mutate(modal.data)}
            onCancel={() => setModal(null)}
            saving={saveSvc.isPending}
          />
        )}
      </Modal>
    </AdminLayout>
  );
}

function PackageForm({ data, services, onChange, onSave, onCancel, saving }) {
  const set = (f) => (e) =>
    onChange({ ...data, [f]: e.target ? e.target.value : e });
  const setNum = (f) => (e) =>
    onChange({ ...data, [f]: parseInt(e.target.value) || 0 });
  const setNullNum = (f) => (e) =>
    onChange({
      ...data,
      [f]: e.target.value ? parseInt(e.target.value) : null,
    });

  const toggleIncluded = (serviceId) => {
    const current = data.includedServiceIds || [];
    const updated = current.includes(serviceId)
      ? current.filter((id) => id !== serviceId)
      : [...current, serviceId];
    onChange({ ...data, includedServiceIds: updated });
  };

  const servicesByCategory = (services || []).reduce((acc, s) => {
    if (!acc[s.category]) acc[s.category] = [];
    acc[s.category].push(s);
    return acc;
  }, {});

  return (
    <div className="flex flex-col gap-4">
      <Input label="Nome" value={data.name || ""} onChange={set("name")} />
      <Input
        label="Descrizione"
        value={data.description || ""}
        onChange={set("description")}
      />
      <Input
        label="Tipo attività (activity type)"
        value={data.activityType || ""}
        onChange={set("activityType")}
        placeholder="es. retail, hospitality, fitness..."
      />
      <div className="grid grid-cols-2 gap-3">
        <Input
          label="Setup (€)"
          type="number"
          value={data.setupAmount || 0}
          onChange={setNum("setupAmount")}
        />
        <Input
          label="Mensile (€)"
          type="number"
          value={data.monthlyAmount || 0}
          onChange={setNum("monthlyAmount")}
        />
      </div>
      <Input
        label="Ordine"
        type="number"
        value={data.sortOrder || 1}
        onChange={setNum("sortOrder")}
      />
      <Toggle
        label="Abilitato"
        enabled={!!data.enabled}
        onChange={(v) => onChange({ ...data, enabled: v })}
      />

      {/* Offerta */}
      <div
        className="flex flex-col gap-3 pt-3"
        style={{ borderTop: "0.5px solid #1a2e24" }}
      >
        <Toggle
          label="Offerta attiva"
          enabled={!!data.offerEnabled}
          onChange={(v) => onChange({ ...data, offerEnabled: v })}
        />
        {data.offerEnabled && (
          <>
            <Input
              label="Titolo offerta"
              value={data.offerLabel || ""}
              onChange={set("offerLabel")}
              placeholder="es. Offerta lancio"
            />
            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Sconto setup (€)"
                type="number"
                value={data.offerDiscountSetup ?? ""}
                onChange={setNullNum("offerDiscountSetup")}
                placeholder="es. 50"
              />
              <Input
                label="Sconto mensile (€)"
                type="number"
                value={data.offerDiscountMonthly ?? ""}
                onChange={setNullNum("offerDiscountMonthly")}
                placeholder="es. 10"
              />
            </div>
          </>
        )}
      </div>

      {/* Servizi inclusi */}
      <div
        className="flex flex-col gap-3 pt-3"
        style={{ borderTop: "0.5px solid #1a2e24" }}
      >
        <label className="text-sm text-gray-400">
          Servizi inclusi nel pacchetto
        </label>
        {Object.entries(servicesByCategory).map(([cat, svcs]) => (
          <div key={cat}>
            <p
              className="text-xs uppercase tracking-widest mb-2"
              style={{ color: "#4d7060", fontFamily: "'DM Mono', monospace" }}
            >
              {cat}
            </p>
            <div className="flex flex-col gap-1">
              {svcs.map((s) => {
                const included = (data.includedServiceIds || []).includes(s.id);
                return (
                  <div
                    key={s.id}
                    onClick={() => toggleIncluded(s.id)}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer"
                    style={{
                      background: included ? "#0f2a1e" : "#161b22",
                      border: `0.5px solid ${included ? "#2dd4a0" : "#1a2e24"}`,
                    }}
                  >
                    <div
                      className="w-4 h-4 rounded flex-shrink-0 flex items-center justify-center"
                      style={{
                        background: included ? "#2dd4a0" : "transparent",
                        border: included
                          ? "1px solid #2dd4a0"
                          : "0.5px solid #4d7060",
                      }}
                    >
                      {included && (
                        <span style={{ color: "#062318", fontSize: "10px" }}>
                          ✓
                        </span>
                      )}
                    </div>
                    <span
                      className="text-sm"
                      style={{ color: included ? "#e2ede8" : "#6b8f7d" }}
                    >
                      {s.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div
        className="flex justify-end gap-2 pt-2"
        style={{ borderTop: "0.5px solid #1a2e24" }}
      >
        <Button variant="ghost" onClick={onCancel}>
          Annulla
        </Button>
        <Button onClick={onSave} disabled={saving}>
          {saving ? "Salvataggio..." : "Salva"}
        </Button>
      </div>
    </div>
  );
}

function ServiceForm({
  data,
  packages,
  services,
  onChange,
  onSave,
  onCancel,
  saving,
}) {
  const set = (f) => (e) => onChange({ ...data, [f]: e.target.value });
  const setNum = (f) => (e) =>
    onChange({ ...data, [f]: parseInt(e.target.value) || 0 });
  const setNull = (f) => (e) =>
    onChange({
      ...data,
      [f]: e.target.value ? parseInt(e.target.value) : null,
    });
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-400">Categoria</label>
        <select
          value={data.category}
          onChange={set("category")}
          className="bg-gray-800 text-white rounded-lg px-4 py-2.5 text-sm
            border border-gray-700 outline-none focus:ring-2 focus:ring-teal-500"
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
      <Input label="Nome" value={data.name} onChange={set("name")} />
      <Input
        label="Descrizione"
        value={data.description || ""}
        onChange={set("description")}
      />
      <Textarea
        label="Descrizione cliente"
        value={data.clientDescription || ""}
        onChange={set("clientDescription")}
        placeholder="Spiegazione breve per il cliente"
        className="min-h-16"
      />
      <Input
        label="Visibile per (activity types, separati da virgola)"
        value={data.visibleFor || ""}
        onChange={set("visibleFor")}
        placeholder="es. hospitality,fitness — vuoto = tutti"
      />
      <Input
        label="Gruppo esclusivo"
        value={data.exclusiveGroup || ""}
        onChange={set("exclusiveGroup")}
        placeholder="es. seo — vuoto = nessuno"
      />
      <div className="grid grid-cols-2 gap-3">
        <Input
          label="Setup (€)"
          type="number"
          value={data.setupAmount}
          onChange={setNum("setupAmount")}
        />
        <Input
          label="Mensile (€)"
          type="number"
          value={data.monthlyAmount}
          onChange={setNum("monthlyAmount")}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-400">Richiede pacchetto</label>
        <select
          value={data.requiresPackageId || ""}
          onChange={setNull("requiresPackageId")}
          className="bg-gray-800 text-white rounded-lg px-4 py-2.5 text-sm
            border border-gray-700 outline-none focus:ring-2 focus:ring-teal-500"
        >
          <option value="">Nessuno</option>
          {packages.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm text-gray-400">Richiede servizio</label>
        <select
          value={data.requiresServiceId || ""}
          onChange={setNull("requiresServiceId")}
          className="bg-gray-800 text-white rounded-lg px-4 py-2.5 text-sm
            border border-gray-700 outline-none focus:ring-2 focus:ring-teal-500"
        >
          <option value="">Nessuno</option>
          {services
            .filter((s) => s.id !== data.id)
            .map((s) => (
              <option key={s.id} value={s.id}>
                {s.category} — {s.name}
              </option>
            ))}
        </select>
      </div>
      <Input
        label="Ordine"
        type="number"
        value={data.sortOrder}
        onChange={setNum("sortOrder")}
      />
      <Toggle
        label="Abilitato"
        enabled={data.enabled}
        onChange={(v) => onChange({ ...data, enabled: v })}
      />
      <div className="flex justify-end gap-2 pt-2 border-t border-gray-800">
        <Button variant="ghost" onClick={onCancel}>
          Annulla
        </Button>
        <Button onClick={onSave} disabled={saving}>
          {saving ? "Salvataggio..." : "Salva"}
        </Button>
      </div>
    </div>
  );
}
