type SectorHeaderProps = {
  label: string  // e.g. "Sector 01 — Drilling & Heavy Machinery"
}

export default function SectorHeader({ label }: SectorHeaderProps) {
  const parts = label.split(' — ')
  const sector = parts[0] || ''
  const title = parts[1] || ''
  
  return (
    <div className="sector-header">
      <span className="sector-number">{sector}</span>
      <span className="sector-title">{title}</span>
    </div>
  )
}
