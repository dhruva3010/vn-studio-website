import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent, PointerEvent as ReactPointerEvent } from "react";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform
} from "motion/react";
import type { Variants } from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  AudioLines,
  Check,
  ChevronDown,
  Gamepad2,
  GitBranch,
  Languages,
  Layers3,
  Menu,
  PackageCheck,
  PenLine,
  Play,
  Save,
  ShieldCheck,
  Sparkles,
  Swords,
  X
} from "lucide-react";
import { Brand } from "./components/Brand";
import { GitHubIcon } from "./components/GitHubIcon";
import { Reveal } from "./components/Reveal";
import { capabilities, faqs, navigation, PROJECT_URL, workflow } from "./data/content";

const heroContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.12 } }
};

const heroItem: Variants = {
  hidden: { opacity: 1, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] } }
};

const capabilityIcons = {
  layers: Layers3,
  languages: Languages,
  swords: Swords,
  save: Save,
  audio: AudioLines,
  package: PackageCheck
};

function ExternalProjectLink({ className, children }: { className: string; children: React.ReactNode }) {
  return (
    <a className={className} href={PROJECT_URL} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

export default function App() {
  const reduceMotion = useReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState<(typeof workflow)[number]["id"]>("write");
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 90, damping: 24 });
  const springY = useSpring(pointerY, { stiffness: 90, damping: 24 });
  const stageX = useTransform(springX, [-0.5, 0.5], [-9, 9]);
  const stageY = useTransform(springY, [-0.5, 0.5], [-7, 7]);
  const activeStep = workflow.find((step) => step.id === activeTab) ?? workflow[0];

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 24);
  });

  useEffect(() => {
    if (!menuOpen) return;

    const closeOnEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  const handleStagePointer = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (reduceMotion || event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - bounds.left) / bounds.width - 0.5);
    pointerY.set((event.clientY - bounds.top) / bounds.height - 0.5);
  };

  const resetStagePointer = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex: number | undefined;
    if (event.key === "ArrowRight") nextIndex = (index + 1) % workflow.length;
    if (event.key === "ArrowLeft") nextIndex = (index - 1 + workflow.length) % workflow.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = workflow.length - 1;
    if (nextIndex === undefined) return;

    event.preventDefault();
    const nextStep = workflow[nextIndex];
    setActiveTab(nextStep.id);
    document.getElementById(`tab-${nextStep.id}`)?.focus();
  };

  return (
    <MotionConfig reducedMotion="user">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <motion.div className="scroll-progress" style={{ scaleX: progress }} />

      <header className={`site-header${scrolled ? " site-header--scrolled" : ""}`}>
        <div className="site-header__inner shell">
          <a className="brand-link" href="#top" aria-label="VN Studio home" onClick={() => setMenuOpen(false)}>
            <Brand />
          </a>

          <nav className="desktop-nav" aria-label="Primary navigation">
            {navigation.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
          </nav>

          <ExternalProjectLink className="header-cta">
            <GitHubIcon size={17} aria-hidden="true" />
            <span>View project</span>
            <ArrowUpRight size={16} aria-hidden="true" />
          </ExternalProjectLink>

          <button
            ref={menuButtonRef}
            className="menu-button"
            type="button"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              id="mobile-navigation"
              className="mobile-nav"
              aria-label="Mobile navigation"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: reduceMotion ? 0 : 0.22 }}
            >
              {navigation.map((item, index) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: reduceMotion ? 0 : index * 0.04 }}
                >
                  <span>0{index + 1}</span>{item.label}<ArrowRight size={20} aria-hidden="true" />
                </motion.a>
              ))}
              <ExternalProjectLink className="mobile-nav__project">
                <GitHubIcon size={19} aria-hidden="true" />View on GitHub<ArrowUpRight size={18} aria-hidden="true" />
              </ExternalProjectLink>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <main id="main-content">
        <section className="hero" id="top">
          <div className="hero__glow" aria-hidden="true" />
          <div className="hero__grain" aria-hidden="true" />
          <motion.div className="hero__content shell" variants={heroContainer} initial="hidden" animate="visible">
            <motion.div className="eyebrow hero__eyebrow" variants={heroItem}>
              <Sparkles size={14} aria-hidden="true" />
              <span>Visual novel authoring, beautifully connected</span>
            </motion.div>
            <motion.h1 variants={heroItem}>
              Make every choice
              <span>mean something.</span>
            </motion.h1>
            <motion.p className="hero__lede" variants={heroItem}>
              VN Studio is a visual workspace for crafting branching visual novels—from the first line of dialogue to a playable world of your own.
            </motion.p>
            <motion.div className="hero__actions" variants={heroItem}>
              <a className="button button--primary" href="#studio">
                Explore the studio<ArrowRight size={19} aria-hidden="true" />
              </a>
              <ExternalProjectLink className="button button--ghost">
                <GitHubIcon size={18} aria-hidden="true" />View on GitHub<ArrowUpRight size={17} aria-hidden="true" />
              </ExternalProjectLink>
            </motion.div>
            <motion.div className="hero__assurance" variants={heroItem}>
              <span><Check size={14} aria-hidden="true" />No code required</span>
              <span><Check size={14} aria-hidden="true" />No account required</span>
              <span><Check size={14} aria-hidden="true" />Made with Godot</span>
            </motion.div>

            <motion.div
              className="hero-stage-wrap"
              variants={{
                hidden: { opacity: 1, y: 70, scale: 0.965 },
                visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] } }
              }}
              onPointerMove={handleStagePointer}
              onPointerLeave={resetStagePointer}
            >
              <motion.figure className="hero-stage" style={reduceMotion ? undefined : { x: stageX, y: stageY }}>
                <div className="hero-stage__topbar">
                  <span><i />THE LAST LIGHT</span>
                  <span>LOCAL PROJECT</span>
                </div>
                <img
                  src="./images/editor.png"
                  alt="The VN Studio editor with a station scene, character artwork, dialogue, and scene inspector"
                  width="1600"
                  height="1000"
                  fetchPriority="high"
                />
                <figcaption>
                  <span>Actual VN Studio workspace</span>
                  <span>Scene 01 · The last train</span>
                </figcaption>
              </motion.figure>

              <motion.div
                className="floating-route"
                initial={{ opacity: 1, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: reduceMotion ? 0 : 1.15, duration: reduceMotion ? 0 : 0.7 }}
                aria-hidden="true"
              >
                <div className="floating-route__label"><GitBranch size={14} />STORY FLOW</div>
                <div className="floating-route__path">
                  <span>The last train</span><i /><span>By the water</span><i /><span>The lookout</span>
                </div>
                <small>One choice. A whole new direction.</small>
              </motion.div>

              <motion.div
                className="floating-local"
                initial={{ opacity: 1, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: reduceMotion ? 0 : 1.3, duration: reduceMotion ? 0 : 0.7 }}
                aria-hidden="true"
              >
                <ShieldCheck size={20} />
                <span><strong>Your story stays yours</strong>Local-first by design</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </section>

        <div className="ticker" aria-label="Write, branch, animate, play, publish">
          <div className="ticker__track">
            {[0, 1].map((copy) => (
              <div className="ticker__group" key={copy} aria-hidden={copy === 1 ? "true" : undefined}>
                {["Write", "Branch", "Animate", "Play", "Publish"].map((item) => (
                  <span key={item}>{item}<i>✦</i></span>
                ))}
              </div>
            ))}
          </div>
        </div>

        <section className="studio-section section" id="studio">
          <div className="shell">
            <Reveal className="section-heading section-heading--split">
              <div>
                <p className="eyebrow"><span>01</span>THE WORKSPACE</p>
                <h2>One studio.<br /><em>Every possibility.</em></h2>
              </div>
              <p>From a single line to a sprawling narrative, every tool speaks the same visual language. Stay close to your story from first draft to final playthrough.</p>
            </Reveal>

            <Reveal className="workflow" delay={0.1}>
              <div className="workflow-tabs" role="tablist" aria-label="Explore the VN Studio workflow">
                {workflow.map((step, index) => (
                  <button
                    key={step.id}
                    id={`tab-${step.id}`}
                    type="button"
                    role="tab"
                    aria-selected={activeTab === step.id}
                    aria-controls={`panel-${step.id}`}
                    tabIndex={activeTab === step.id ? 0 : -1}
                    onClick={() => setActiveTab(step.id)}
                    onKeyDown={(event) => handleTabKeyDown(event, index)}
                  >
                    <span>0{index + 1}</span>{step.label}
                  </button>
                ))}
              </div>

              <div
                className="workflow-showcase"
                id={`panel-${activeStep.id}`}
                role="tabpanel"
                aria-labelledby={`tab-${activeStep.id}`}
                tabIndex={0}
              >
                <div className="workflow-visual">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.figure
                      key={activeStep.id}
                      initial={{ opacity: 0, y: reduceMotion ? 0 : 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: reduceMotion ? 0 : -8 }}
                      transition={{ duration: reduceMotion ? 0 : 0.35, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <img src={activeStep.image} alt={activeStep.alt} width="1600" height="1000" loading="lazy" />
                      <figcaption><span><i />{activeStep.caption}</span><span>VN STUDIO</span></figcaption>
                    </motion.figure>
                  </AnimatePresence>
                </div>

                <div className="workflow-copy">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={activeStep.id}
                      initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: reduceMotion ? 0 : 0.3 }}
                    >
                      <span className="workflow-copy__icon"><PenLine size={22} aria-hidden="true" /></span>
                      <h3>{activeStep.title}</h3>
                      <p>{activeStep.description}</p>
                      <ul>
                        {activeStep.points.map((point) => <li key={point}><Check size={16} aria-hidden="true" />{point}</li>)}
                      </ul>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="features-section section" id="features">
          <div className="shell">
            <Reveal className="section-heading section-heading--center">
              <p className="eyebrow"><span>02</span>MORE THAN A WRITER</p>
              <h2>A small studio.<br /><em>A lot of range.</em></h2>
              <p>Everything you need to turn a quiet idea into an experience people can play, feel, and remember.</p>
            </Reveal>

            <div className="feature-grid">
              <Reveal className="feature-card feature-card--logic">
                <div className="feature-card__content">
                  <span className="feature-icon"><GitBranch size={22} aria-hidden="true" /></span>
                  <p className="eyebrow">NARRATIVE LOGIC</p>
                  <h3>Complex stories.<br />Clear choices.</h3>
                  <p>Build branching paths with visual rules, story variables, nested conditions, and reusable substories—without writing scripts.</p>
                </div>
                <div className="logic-demo" aria-hidden="true">
                  <div><span>IF</span><strong>Trust</strong><b>is at least</b><strong>1</strong></div>
                  <i><ArrowRight size={18} /></i>
                  <div><span>THEN</span><strong>Unlock</strong><b>The secret lookout</b><Check size={17} /></div>
                </div>
              </Reveal>

              <Reveal className="feature-card feature-card--motion" delay={0.08}>
                <div className="feature-card__content">
                  <span className="feature-icon"><Sparkles size={22} aria-hidden="true" /></span>
                  <p className="eyebrow">MOTION & ATMOSPHERE</p>
                  <h3>Make the scene<br /><em>feel alive.</em></h3>
                  <p>Direct every entrance, expression, camera move, and sound with visual timelines and instant playback.</p>
                </div>
                <div className="motion-demo" aria-hidden="true">
                  <div className="motion-demo__play"><Play size={20} fill="currentColor" /></div>
                  <div className="motion-demo__tracks">
                    <span><i />Camera · gentle push<b /></span>
                    <span><i />Maya · happy<b /></span>
                    <span><i />Ambience · sea air<b /></span>
                  </div>
                  <div className="motion-demo__timeline"><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /></div>
                </div>
              </Reveal>

              <Reveal className="feature-card feature-card--publish" delay={0.12}>
                <div className="feature-card__content">
                  <span className="feature-icon"><PackageCheck size={22} aria-hidden="true" /></span>
                  <p className="eyebrow">FROM STUDIO TO PLAYER</p>
                  <h3>Your story, ready<br />to leave home.</h3>
                  <p>Publish from an isolated project snapshot. VN Studio verifies the packaged game before calling the build complete.</p>
                </div>
                <div className="build-demo" aria-hidden="true">
                  <div className="build-demo__status"><span><PackageCheck size={25} /></span><div><small>BUILD COMPLETE</small><strong>Give your story a home.</strong></div><Check size={20} /></div>
                  <div className="build-demo__targets"><span>Windows x64<strong>Standalone game</strong></span><span>Web<strong>Browser-ready export</strong></span></div>
                  <div className="build-demo__bar"><i /></div>
                  <small>Project verified · Assets packaged · Ready to share</small>
                </div>
              </Reveal>
            </div>

            <Reveal className="capabilities-heading">
              <p className="eyebrow">THE DETAILS IN BETWEEN</p>
              <h3>A complete narrative toolkit.</h3>
            </Reveal>
            <div className="capabilities-grid">
              {capabilities.map((capability, index) => {
                const Icon = capabilityIcons[capability.icon];
                return (
                  <Reveal className="capability" key={capability.title} delay={(index % 3) * 0.06}>
                    <Icon size={23} strokeWidth={1.6} aria-hidden="true" />
                    <h4>{capability.title}</h4>
                    <p>{capability.description}</p>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        <section className="local-section section" id="local">
          <div className="local-section__word" aria-hidden="true">yours.</div>
          <div className="shell local-section__inner">
            <Reveal className="local-section__copy">
              <p className="eyebrow"><ShieldCheck size={15} aria-hidden="true" />LOCAL BY DESIGN</p>
              <h2>Your world<br /><em>stays yours.</em></h2>
            </Reveal>
            <Reveal className="local-section__details" delay={0.1}>
              <p>No accounts. No telemetry. No cloud required. Your stories live on your machine in portable project files you can keep, move, and back up.</p>
              <ul>
                <li><Check size={17} aria-hidden="true" />No account required</li>
                <li><Check size={17} aria-hidden="true" />No telemetry</li>
                <li><Check size={17} aria-hidden="true" />Portable project files</li>
              </ul>
            </Reveal>
          </div>
        </section>

        <section className="faq-section section" id="faq">
          <div className="shell faq-layout">
            <Reveal className="faq-intro">
              <p className="eyebrow"><span>03</span>A FEW ANSWERS</p>
              <h2>Before the<br /><em>first scene.</em></h2>
              <p>Want the full technical picture?</p>
              <ExternalProjectLink className="text-link">Explore the project<ArrowUpRight size={17} aria-hidden="true" /></ExternalProjectLink>
            </Reveal>
            <Reveal className="faq-list" delay={0.08}>
              {faqs.map((faq, index) => (
                <details key={faq.question}>
                  <summary><span>0{index + 1}</span><strong>{faq.question}</strong><i><ChevronDown size={20} aria-hidden="true" /></i></summary>
                  <div className="faq-answer"><p>{faq.answer}</p></div>
                </details>
              ))}
            </Reveal>
          </div>
        </section>

        <section className="final-cta">
          <div className="final-cta__glow" aria-hidden="true" />
          <Reveal className="shell final-cta__inner">
            <div className="final-cta__mark"><Brand compact /></div>
            <p className="eyebrow">YOUR STORY STARTS HERE</p>
            <h2>The next scene<br /><em>is yours.</em></h2>
            <p>Write the first line. See where it leads.</p>
            <ExternalProjectLink className="button button--primary button--large">
              <GitHubIcon size={20} aria-hidden="true" />Get VN Studio<ArrowUpRight size={19} aria-hidden="true" />
            </ExternalProjectLink>
          </Reveal>
        </section>
      </main>

      <footer className="site-footer">
        <div className="shell site-footer__top">
          <div><a className="brand-link" href="#top" aria-label="Back to top"><Brand /></a><p>Built for stories that stay with you.</p></div>
          <nav aria-label="Footer navigation">
            {navigation.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
            <a href={PROJECT_URL} target="_blank" rel="noopener noreferrer">GitHub<ArrowUpRight size={13} aria-hidden="true" /></a>
          </nav>
        </div>
        <div className="shell site-footer__bottom">
          <span>© 2026 VN Studio</span>
          <span><Gamepad2 size={14} aria-hidden="true" />Made for interactive storytellers</span>
          <a href="#top">Back to top<ArrowUpRight size={13} aria-hidden="true" /></a>
        </div>
      </footer>
    </MotionConfig>
  );
}
