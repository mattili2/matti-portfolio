import { localePath, type Locale } from "@/lib/i18n";

export const CASE_STUDY_ENTRY_KEY = "caseStudyEntry";
export const CASE_STUDY_RESTORE_KEY = "caseStudyRestore";

/** Where the user opened a case study from (path includes locale). */
export type CaseStudyEntryContext = {
  path: string;
  /** DOM id of the project card, e.g. `project-5` */
  cardId: string;
  scrollY?: number;
};

function readJson<T>(key: string): T | null {
  try {
    const raw = sessionStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

function writeJson(key: string, value: unknown) {
  try {
    sessionStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore quota / private mode
  }
}

/**
 * Store the list-page entry card. Call only from ProjectCard clicks.
 * Prev/Next between case studies must never call this — entry stays sticky
 * until the next list-card click.
 */
export function setCaseStudyEntry(entry: CaseStudyEntryContext) {
  writeJson(CASE_STUDY_ENTRY_KEY, entry);
}

export function getCaseStudyEntry(): CaseStudyEntryContext | null {
  const value = readJson<CaseStudyEntryContext>(CASE_STUDY_ENTRY_KEY);
  if (!value?.path || !value?.cardId) return null;
  return value;
}

/** Mark sticky entry for scroll restore on the next visit to the origin page. */
export function markCaseStudyRestore() {
  const entry = getCaseStudyEntry();
  if (!entry) return;
  writeJson(CASE_STUDY_RESTORE_KEY, entry);
}

/** Normalize for compare: strip trailing slash (except `/`) and hash. */
export function normalizeEntryPath(path: string): string {
  const noHash = path.split("#")[0] ?? path;
  if (noHash.length > 1 && noHash.endsWith("/")) return noHash.slice(0, -1);
  return noHash || "/";
}

/**
 * Peek a pending restore for the current pathname without clearing.
 * Safe under React Strict Mode double-effects.
 */
export function peekCaseStudyRestore(
  currentPathname: string,
): CaseStudyEntryContext | null {
  const pending = readJson<CaseStudyEntryContext>(CASE_STUDY_RESTORE_KEY);
  if (!pending?.path || !pending?.cardId) return null;
  if (normalizeEntryPath(pending.path) !== normalizeEntryPath(currentPathname)) {
    return null;
  }
  return pending;
}

/** Clear restore flag after a successful scroll (entry context is kept). */
export function clearCaseStudyRestore() {
  try {
    sessionStorage.removeItem(CASE_STUDY_RESTORE_KEY);
  } catch {
    // ignore
  }
}

/**
 * @deprecated Prefer peek + clear after success (Strict Mode safe).
 * Consume a pending restore if it targets the current pathname.
 */
export function consumeCaseStudyRestore(
  currentPathname: string,
): CaseStudyEntryContext | null {
  const pending = peekCaseStudyRestore(currentPathname);
  if (!pending) return null;
  clearCaseStudyRestore();
  return pending;
}

export function fallbackCaseStudyBackHref(locale: Locale): string {
  return localePath(locale, "/project");
}
