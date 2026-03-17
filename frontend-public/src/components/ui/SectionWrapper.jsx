export default function SectionWrapper({ children, className = "" }) {
  return (
    <section className={`max-w-5xl mx-auto px-6 py-16 ${className}`}>
      {children}
    </section>
  );
}
