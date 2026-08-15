"use client";

type ScrollDownArrowProps = {
  targetId: string;
  label: string;
};

export function ScrollDownArrow({ targetId, label }: ScrollDownArrowProps) {
  return (
    <a
      href={`#${targetId}`}
      aria-label={label}
      className="nav-chrome mt-6 inline-flex items-center justify-center md:mt-10"
      onClick={(event) => {
        event.preventDefault();
        const section = document.getElementById(targetId);
        if (!section) return;
        // Prefer the section heading so it lands near the top (section has top padding)
        const target =
          section.matches("h1,h2,h3,h4,h5,h6")
            ? section
            : (section.querySelector("h1,h2,h3,h4,h5,h6") ?? section);
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        history.replaceState(null, "", `#${targetId}`);
      }}
    >
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className="motion-safe:animate-[scroll-hint_2.4s_ease-in-out_infinite]"
      >
        <path
          d="M6 9l6 6 6-6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </a>
  );
}
