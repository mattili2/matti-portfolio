"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { Dictionary } from "@/data/dictionary";
import { navLinks } from "@/data/nav";
import {
  localePath,
  stripLocale,
  type Locale,
} from "@/lib/i18n";

/** Shared header text — logo / Menu / Close */
const headerText =
  "text-[20px] font-normal leading-none tracking-[0.02em]";

/** Active when path is exactly the nav path or nested under it (e.g. /project, /about). Not /proj/[id]. */
function isNavActive(pathname: string, linkPath: string) {
  const path = stripLocale(pathname);
  return path === linkPath || path.startsWith(`${linkPath}/`);
}

type HeaderProps = {
  locale: Locale;
  dict: Dictionary;
};

function LanguageSwitch({
  locale,
  dict,
  className,
  onNavigate,
}: {
  locale: Locale;
  dict: Dictionary;
  className?: string;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const pathWithoutLocale = stripLocale(pathname);
  const itemClass = "text-[13px] tracking-[0.02em]";

  const renderLang = (target: Locale, label: string) => {
    const active = locale === target;
    if (active) {
      return (
        <span
          className={`${itemClass} nav-chrome-selected`}
          aria-current="true"
        >
          {label}
        </span>
      );
    }
    return (
      <Link
        href={localePath(target, pathWithoutLocale)}
        className={`${itemClass} nav-chrome`}
        hrefLang={target}
        onClick={onNavigate}
      >
        {label}
      </Link>
    );
  };

  return (
    <div
      className={className}
      role="group"
      aria-label={dict.langSwitchAria}
    >
      {renderLang("zh", dict.langZh)}
      <span className="mx-1 nav-chrome-muted" aria-hidden>
        /
      </span>
      {renderLang("en", dict.langEn)}
    </div>
  );
}

/** Keep in sync with --fade-ms in app/globals.css */
const MENU_MS = 400;

export function Header({ locale, dict }: HeaderProps) {
  const [open, setOpen] = useState(false);
  /** Stay mounted through close fade so opacity can animate out */
  const [menuMounted, setMenuMounted] = useState(false);
  /** Applied one frame after mount so enter transition runs */
  const [menuShown, setMenuShown] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (open) {
      setMenuMounted(true);
      let cancelled = false;
      const id = window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          if (!cancelled) setMenuShown(true);
        });
      });
      return () => {
        cancelled = true;
        window.cancelAnimationFrame(id);
      };
    }

    setMenuShown(false);
    if (!menuMounted) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = window.setTimeout(
      () => setMenuMounted(false),
      reduce ? 0 : MENU_MS,
    );
    return () => window.clearTimeout(t);
  }, [open, menuMounted]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      {/* Top bar fill — always under the menu veil */}
      <div
        className="pointer-events-none fixed inset-x-0 top-0 z-40 bg-white/90 backdrop-blur-sm"
        aria-hidden
      >
        <div className="min-h-[64px] w-full py-3" />
      </div>

      {/* Full-viewport veil — fades in/out; delayed unmount on close */}
      {menuMounted && (
        <div
          className={`fixed inset-0 z-[45] bg-white/50 backdrop-blur-[12px] transition-opacity duration-[length:var(--fade-ms)] ease-out motion-reduce:transition-none md:hidden ${
            menuShown ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
          role="dialog"
          aria-modal="true"
          aria-hidden={!menuShown}
        >
          <button
            type="button"
            aria-label={dict.closeMenuBg}
            className="absolute inset-0"
            tabIndex={menuShown ? 0 : -1}
            onClick={() => setOpen(false)}
          />
          <nav
            className={`relative flex h-full w-full flex-col items-end gap-5 px-[var(--page-pad)] pt-[100px] transition-[opacity,transform] duration-[length:var(--fade-ms)] ease-out motion-reduce:transition-none ${
              menuShown
                ? "translate-y-0 opacity-100"
                : "-translate-y-1 opacity-0"
            }`}
            aria-label={dict.mobileNavAria}
            {...(!menuShown ? { inert: true } : {})}
          >
            {navLinks.map((link) => {
              const href = localePath(locale, link.path);
              const active = isNavActive(pathname, link.path);
              const content = (
                <>
                  <span
                    className={`text-[16px] font-normal ${
                      active ? "text-foreground" : "nav-chrome-muted"
                    }`}
                  >
                    {link.index} /
                  </span>
                  <span
                    className={`text-[32px] tracking-tight font-normal ${
                      active ? "text-foreground" : "nav-chrome-muted"
                    }`}
                  >
                    {link.label}
                  </span>
                </>
              );

              if (active) {
                return (
                  <span
                    key={link.path}
                    className="pointer-events-none flex items-baseline gap-3 text-right"
                    aria-current="page"
                  >
                    {content}
                  </span>
                );
              }

              return (
                <Link
                  key={link.path}
                  href={href}
                  tabIndex={menuShown ? undefined : -1}
                  onClick={(e) => {
                    e.preventDefault();
                    setOpen(false);
                    router.push(href);
                  }}
                  className="nav-chrome-hover flex items-baseline gap-3 text-right"
                >
                  {content}
                </Link>
              );
            })}
            <LanguageSwitch
              locale={locale}
              dict={dict}
              className="mt-4"
              onNavigate={() => setOpen(false)}
            />
          </nav>
        </div>
      )}

      <header className="site-header fixed inset-x-0 top-0 z-50">
        <div className="flex min-h-[64px] w-full items-center justify-between px-[var(--page-pad)] py-3">
          <Link
            href={localePath(locale)}
            className={`${headerText} nav-chrome-hover`}
            onClick={() => setOpen(false)}
          >
            {dict.nameShort}
          </Link>

          {/* ≥810px: expanded nav + language on same row */}
          <div className="hidden items-center gap-8 md:flex">
            <nav className="flex items-center gap-8" aria-label={dict.navAria}>
              {navLinks.map((link) => {
                const active = isNavActive(pathname, link.path);
                const content = (
                  <>
                    <span
                      className={`text-[12px] font-normal tracking-[0.02em] ${
                        active ? "text-foreground" : "nav-chrome-muted"
                      }`}
                    >
                      {link.index} /
                    </span>
                    <span
                      className={`text-[20px] tracking-[0.02em] font-normal ${
                        active ? "text-foreground" : "nav-chrome-muted"
                      }`}
                    >
                      {link.label}
                    </span>
                  </>
                );

                if (active) {
                  return (
                    <span
                      key={link.path}
                      className="pointer-events-none flex items-baseline gap-1.5"
                      aria-current="page"
                    >
                      {content}
                    </span>
                  );
                }

                return (
                  <Link
                    key={link.path}
                    href={localePath(locale, link.path)}
                    className="nav-chrome-hover flex items-baseline gap-1.5"
                  >
                    {content}
                  </Link>
                );
              })}
            </nav>
            <LanguageSwitch locale={locale} dict={dict} />
          </div>

          {/* &lt;810px: Menu / Close share the same slot */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className={`${headerText} nav-chrome-hover flex items-center gap-2 md:hidden`}
            aria-label={open ? dict.closeMenu : dict.openMenu}
            aria-expanded={open}
          >
            {open ? (
              <>
                <span
                  className="relative flex h-3.5 w-[18px] items-center justify-center"
                  aria-hidden
                >
                  <span className="absolute h-px w-[18px] rotate-45 bg-black" />
                  <span className="absolute h-px w-[18px] -rotate-45 bg-black" />
                </span>
                Close
              </>
            ) : (
              <>
                <span
                  className="flex w-[18px] flex-col gap-[3.5px]"
                  aria-hidden
                >
                  <span className="h-px w-full bg-black" />
                  <span className="h-px w-[70%] self-end bg-black" />
                  <span className="h-px w-[40%] self-end bg-black" />
                </span>
                Menu
              </>
            )}
          </button>
        </div>
      </header>
    </>
  );
}
