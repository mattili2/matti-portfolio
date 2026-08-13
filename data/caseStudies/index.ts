import type { Locale } from "@/lib/i18n";
import { projectsOverviewOrder } from "@/data/projects";
import { getIgnitcubeCaseStudy } from "./ignitcube";
import { getMonologCaseStudy } from "./monolog";
import { getPlatteCaseStudy } from "./platte";
import { getTracesCaseStudy } from "./traces";
import { getWhaleCaseStudy } from "./whale";
import type { CaseStudy } from "./types";

const loaders: Record<string, (locale: Locale) => CaseStudy> = {
  "5": getMonologCaseStudy,
  "2": getPlatteCaseStudy,
  "4": getTracesCaseStudy,
  "1": getWhaleCaseStudy,
  "3": getIgnitcubeCaseStudy,
};

export function getCaseStudy(
  id: string,
  locale: Locale,
): CaseStudy | undefined {
  const load = loaders[id];
  return load ? load(locale) : undefined;
}

export function hasCaseStudy(id: string): boolean {
  return id in loaders;
}

/** Projects overview card order, filtered to case-study-capable projects. */
export function getCaseStudySequenceIds(): string[] {
  return projectsOverviewOrder.filter((id) => hasCaseStudy(id));
}

/** Previous case study in overview order; undefined on first (no wrap). */
export function getPrevCaseStudyId(currentId: string): string | undefined {
  const sequence = getCaseStudySequenceIds();
  const index = sequence.indexOf(currentId);
  if (index <= 0) return undefined;
  return sequence[index - 1];
}

/** Next case study in overview order; undefined on last (no wrap). */
export function getNextCaseStudyId(currentId: string): string | undefined {
  const sequence = getCaseStudySequenceIds();
  const index = sequence.indexOf(currentId);
  if (index < 0 || index >= sequence.length - 1) return undefined;
  return sequence[index + 1];
}

export type {
  CaseStudy,
  CaseStudyBlock,
  CaseStudyImage,
  CaseStudyImageSize,
  CaseStudyListItem,
  CaseStudyMetaRow,
  CaseStudySection,
} from "./types";
