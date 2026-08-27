/** Numbered section header with the dotted focus-rectangle rule. */
export function SectionHead({ n, title, note }: { n: string; title: string; note?: string }) {
  return (
    <div className="section-head">
      <span className="dots" aria-hidden="true" />
      <span className="section-head__n">{n}</span>
      <h2>{title}</h2>
      {note && <span className="section-head__note">{note}</span>}
    </div>
  )
}
