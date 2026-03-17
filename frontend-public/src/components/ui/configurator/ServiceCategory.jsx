import ServiceItem from "./ServiceItem";

export default function ServiceCategory({
  category,
  services,
  selectedServices,
  onToggle,
  isAvailable,
  isLocked,
}) {
  return (
    <div>
      <p
        className="text-xs uppercase tracking-widest mb-3"
        style={{ color: "#8ab8a8", fontFamily: "'DM Mono', monospace" }}
      >
        {category}
      </p>
      <div className="flex flex-col gap-2">
        {services.map((service) => (
          <ServiceItem
            key={service.id}
            service={service}
            selected={selectedServices.has(service.id)}
            available={isAvailable(service)}
            locked={isLocked(service)}
            onToggle={() => onToggle(service)}
          />
        ))}
      </div>
    </div>
  );
}
