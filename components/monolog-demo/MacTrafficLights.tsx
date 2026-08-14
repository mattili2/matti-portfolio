/** Flat gray traffic lights — no border, gloss, or hover. */
export function MacTrafficLights() {
  return (
    <div className="flex items-center gap-2" aria-hidden>
      <span className="h-3 w-3 shrink-0 rounded-full bg-[#D6D6D6]" />
      <span className="h-3 w-3 shrink-0 rounded-full bg-[#D6D6D6]" />
      <span className="h-3 w-3 shrink-0 rounded-full bg-[#D6D6D6]" />
    </div>
  );
}
