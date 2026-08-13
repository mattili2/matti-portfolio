/**
 * Remounts on navigation so CSS page-enter can soft-fade (opacity only).
 * Header / Footer stay in layout (no flicker).
 */
export default function LocaleTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="page-enter">{children}</div>;
}
