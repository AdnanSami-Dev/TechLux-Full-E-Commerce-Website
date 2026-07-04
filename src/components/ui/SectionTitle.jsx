export default function SectionTitle({ title, subtitle, align = "center" }) {
  const alignClass = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  }[align];

  return (
    <div className={alignClass}>
      {title && <h2 className="h2 text-secondary mb-2">{title}</h2>}
      {subtitle && <p className="text-text-secondary max-w-2xl mx-auto">{subtitle}</p>}
    </div>
  );
}
