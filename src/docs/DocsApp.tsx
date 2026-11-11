import { useEffect, useMemo, useRef, useState } from "react";
import type { MouseEvent, ReactNode } from "react";
import { AnimatePresence, MotionConfig, motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { ArrowLeft, ArrowRight, ArrowUpRight, BookOpen, ChevronRight, FileText, Menu, Printer, Search, X } from "lucide-react";
import { Brand } from "../components/Brand";
import { GitHubIcon } from "../components/GitHubIcon";
import { PROJECT_URL } from "../data/content";
import { DocSection } from "./components";
import { documentationGroups, documentationSections } from "./content";

export default function DocsApp() {
  const reduceMotion = useReducedMotion();
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState(() => {
    const hash = window.location.hash.slice(1);
    return documentationSections.some((section) => section.id === hash) ? hash : documentationSections[0].id;
  });
  const searchRef = useRef<HTMLInputElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });
  const normalizedQuery = query.trim().toLocaleLowerCase();
  const results = useMemo(() => {
    if (!normalizedQuery) return [];
    const terms = normalizedQuery.split(/\s+/);
    return documentationSections.filter((section) => {
      const searchable = `${section.title} ${section.summary} ${section.keywords}`.toLocaleLowerCase();
      return terms.every((term) => searchable.includes(term));
    });
  }, [normalizedQuery]);
  const activeIndex = Math.max(0, documentationSections.findIndex((section) => section.id === activeId));
  const previousSection = documentationSections[activeIndex - 1];
  const nextSection = documentationSections[activeIndex + 1];

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (documentationSections.some((section) => section.id === hash)) {
      document.getElementById(hash)?.scrollIntoView();
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible[0]) setActiveId(visible[0].target.id);
    }, { rootMargin: "-14% 0px -72% 0px", threshold: [0, 1] });

    documentationSections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleKeyboard = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isTyping = target?.tagName === "INPUT" || target?.tagName === "TEXTAREA" || target?.isContentEditable;
      if ((event.ctrlKey || event.metaKey) && event.key.toLocaleLowerCase() === "k") {
        event.preventDefault();
        searchRef.current?.focus();
      } else if (event.key === "/" && !isTyping) {
        event.preventDefault();
        searchRef.current?.focus();
      } else if (event.key === "Escape" && menuOpen) {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyboard);
    return () => window.removeEventListener("keydown", handleKeyboard);
  }, [menuOpen]);

  const navigateTo = (id: string) => {
    window.history.pushState(null, "", `#${id}`);
    setActiveId(id);
    setQuery("");
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  };

  const handleNavigation = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    navigateTo(id);
  };

  const navigation = (mobile = false): ReactNode => documentationGroups.map((group) => (
    <div className="docs-nav__group" key={group}>
      <p>{group}</p>
      <ul>
        {documentationSections.filter((section) => section.group === group).map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className={activeId === section.id ? "active" : undefined}
              aria-current={activeId === section.id ? "location" : undefined}
              onClick={(event) => handleNavigation(event, section.id)}
            >
              <span>{section.title}</span><ChevronRight size={14} aria-hidden="true" />
            </a>
          </li>
        ))}
      </ul>
      {mobile && <span className="docs-nav__mobile-rule" />}
    </div>
  ));

  return (
    <MotionConfig reducedMotion="user">
      <a className="skip-link" href="#documentation-content">Skip to documentation</a>
      <motion.div className="scroll-progress docs-progress" style={{ scaleX: progress }} />

      <header className="docs-header">
        <div className="docs-header__inner">
          <a className="docs-brand" href="./" aria-label="VN Studio website"><Brand /><span>Documentation</span></a>
          <nav aria-label="Documentation header navigation">
            <a href="./"><ArrowLeft size={16} aria-hidden="true" />Website</a>
            <a className="docs-header__github" href={PROJECT_URL} target="_blank" rel="noopener noreferrer"><GitHubIcon size={16} />Project<ArrowUpRight size={14} aria-hidden="true" /></a>
          </nav>
        </div>
      </header>

      <main id="documentation-content">
        <section className="docs-hero">
          <div className="docs-hero__glow" aria-hidden="true" />
          <div className="docs-hero__inner">
            <p className="docs-kicker"><BookOpen size={15} aria-hidden="true" />CREATOR'S GUIDE <span>14 GUIDES</span></p>
            <h1>Everything you need<br />to <em>tell your story.</em></h1>
            <p className="docs-hero__lede">Learn the complete VN Studio workflow—from your first scene and branching logic to animation, saves, and verified exports.</p>
            <div className="docs-search">
              <Search size={20} aria-hidden="true" />
              <input
                ref={searchRef}
                type="search"
                value={query}
                placeholder="Search setup, dialogue, publishing…"
                aria-label="Search documentation"
                aria-controls="doc-search-results"
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Escape") setQuery("");
                  if (event.key === "Enter" && results[0]) navigateTo(results[0].id);
                }}
              />
              {query ? <button type="button" aria-label="Clear documentation search" onClick={() => setQuery("")}><X size={17} /></button> : <kbd>Ctrl K</kbd>}
              {normalizedQuery && (
                <div className="docs-search__results" id="doc-search-results" role="region" aria-live="polite" aria-label="Documentation search results">
                  <p>{results.length} {results.length === 1 ? "guide" : "guides"} found</p>
                  {results.length ? results.map((result) => (
                    <button type="button" key={result.id} onClick={() => navigateTo(result.id)}>
                      <FileText size={18} aria-hidden="true" />
                      <span><strong>{result.title}</strong><small>{result.summary}</small></span>
                      <ArrowRight size={16} aria-hidden="true" />
                    </button>
                  )) : <div className="docs-search__empty">No guides match “{query.trim()}”. Try “dialogue”, “saves”, or “export”.</div>}
                </div>
              )}
            </div>
            <div className="docs-hero__meta"><span>Godot 4.7.2</span><span>Windows authoring</span><span>Windows + Web export</span></div>
          </div>
        </section>

        <div className="docs-toolbar">
          <button ref={menuButtonRef} type="button" aria-expanded={menuOpen} aria-controls="docs-mobile-navigation" onClick={() => setMenuOpen((open) => !open)}>
            {menuOpen ? <X size={18} /> : <Menu size={18} />}Browse guides
          </button>
          <span>Documentation for the current VN Studio workflow</span>
          <button type="button" onClick={() => window.print()}><Printer size={16} aria-hidden="true" />Print</button>
        </div>

        <div className="docs-layout">
          <aside className="docs-sidebar" aria-label="Documentation navigation">
            <div className="docs-sidebar__inner">
              <div className="docs-sidebar__title"><BookOpen size={16} aria-hidden="true" />VN Studio manual</div>
              <nav>{navigation()}</nav>
              <div className="docs-sidebar__help"><strong>Need a quick answer?</strong><p>Search the guide with Ctrl K or /.</p></div>
            </div>
          </aside>

          <article className="docs-article">
            {documentationSections.map((section, index) => (
              <DocSection key={section.id} id={section.id} number={index + 1} title={section.title} lead={section.summary}>
                {section.content}
              </DocSection>
            ))}

            <nav className="docs-pagination" aria-label="Documentation pages">
              {previousSection ? <a href={`#${previousSection.id}`} onClick={(event) => handleNavigation(event, previousSection.id)}><ArrowLeft size={18} aria-hidden="true" /><span><small>Previous guide</small><strong>{previousSection.title}</strong></span></a> : <span />}
              {nextSection && <a href={`#${nextSection.id}`} onClick={(event) => handleNavigation(event, nextSection.id)}><span><small>Next guide</small><strong>{nextSection.title}</strong></span><ArrowRight size={18} aria-hidden="true" /></a>}
            </nav>
          </article>
        </div>
      </main>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.button className="docs-mobile-backdrop" type="button" aria-label="Close documentation navigation" onClick={() => setMenuOpen(false)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
            <motion.aside
              id="docs-mobile-navigation"
              className="docs-mobile-sidebar"
              aria-label="Mobile documentation navigation"
              initial={{ x: -30, opacity: 1 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.22 }}
            >
              <div className="docs-mobile-sidebar__top"><Brand /><button type="button" aria-label="Close documentation menu" onClick={() => setMenuOpen(false)}><X size={20} /></button></div>
              <nav>{navigation(true)}</nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <footer className="docs-footer">
        <div><Brand /><p>A complete guide for interactive storytellers.</p></div>
        <nav aria-label="Documentation footer navigation"><a href="./">Website</a><a href="#overview" onClick={(event) => handleNavigation(event, "overview")}>Back to first guide<ArrowUpRight size={14} /></a><a href={PROJECT_URL} target="_blank" rel="noopener noreferrer">GitHub<ArrowUpRight size={14} /></a></nav>
      </footer>
    </MotionConfig>
  );
}
