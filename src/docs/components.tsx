import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { Check, Copy, Info, Lightbulb, TriangleAlert } from "lucide-react";

export function DocSection({ id, number, title, lead, children }: { id: string; number: number; title: string; lead: string; children: ReactNode }) {
  return (
    <section className="doc-section" id={id} aria-labelledby={`${id}-title`}>
      <div className="doc-section__number">Guide {String(number).padStart(2, "0")}</div>
      <h2 id={`${id}-title`}><a href={`#${id}`}>{title}</a></h2>
      <p className="doc-section__lead">{lead}</p>
      {children}
    </section>
  );
}

export function Callout({ title, children, tone = "note" }: { title: string; children: ReactNode; tone?: "note" | "tip" | "warning" }) {
  const Icon = tone === "tip" ? Lightbulb : tone === "warning" ? TriangleAlert : Info;
  return (
    <aside className={`doc-callout doc-callout--${tone}`}>
      <Icon size={19} aria-hidden="true" />
      <div><strong>{title}</strong><div>{children}</div></div>
    </aside>
  );
}

export function CodeBlock({ code, label = "PowerShell" }: { code: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  const [failed, setFailed] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setFailed(false);
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1800);
    } catch {
      setFailed(true);
    }
  };

  return (
    <div className="doc-code">
      <div className="doc-code__bar"><span>{label}</span><button type="button" onClick={copyCode} aria-label="Copy code">{copied ? <Check size={14} /> : <Copy size={14} />}{copied ? "Copied" : failed ? "Select code" : "Copy"}</button></div>
      <pre><code>{code}</code></pre>
      <span className="sr-only" role="status">{copied ? "Code copied to clipboard" : failed ? "Clipboard unavailable. Select the code manually." : ""}</span>
    </div>
  );
}

export function DocSteps({ items }: { items: readonly { title: string; text: ReactNode }[] }) {
  return (
    <ol className="doc-steps">
      {items.map((item, index) => <li key={item.title}><span>{index + 1}</span><div><h3>{item.title}</h3><p>{item.text}</p></div></li>)}
    </ol>
  );
}

export function DocTable({ headers, rows, caption }: { headers: readonly string[]; rows: readonly (readonly ReactNode[])[]; caption?: string }) {
  return (
    <div className="doc-table-wrap">
      <table className="doc-table">
        {caption && <caption>{caption}</caption>}
        <thead><tr>{headers.map((header) => <th key={header} scope="col">{header}</th>)}</tr></thead>
        <tbody>{rows.map((row, rowIndex) => <tr key={rowIndex}>{row.map((cell, cellIndex) => <td key={cellIndex}>{cell}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}

export function DocFigure({ src, alt, caption }: { src: string; alt: string; caption: string }) {
  return (
    <figure className="doc-figure">
      <img src={src} alt={alt} width="1600" height="1000" />
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
