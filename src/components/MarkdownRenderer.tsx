import { useState, useEffect, useRef, useMemo, type FC } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkEmoji from "remark-emoji";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import rehypePrismPlus from "rehype-prism-plus";
import type { Components } from "react-markdown";

function preprocessMarkdown(raw: string): string {
  let text = raw;

  text = text.replace(/(^|\n)([^\n:]+)\n(:\s+[^\n]+(?:\n:\s+[^\n]+)*)/gm, (_match, _newline, term, defs) => {
    const termEl = `<dt>${term}</dt>`;
    const defEls = defs
      .trim()
      .split(/\n:\s+/)
      .filter(Boolean)
      .map((d: string) => `<dd>${d}</dd>`)
      .join("");
    return `\n<dl>${termEl}${defEls}</dl>\n`;
  });

  text = text.replace(
    /(?<!\\)\^([^^\n]+?)\^(?![\^])/g,
    (_match: string, content: string) => `<sup>${content}</sup>`
  );

  text = text.replace(
    /(?<!\\)~([^~\n]+?)~(?!~)/g,
    (_match: string, content: string) => `<sub>${content}</sub>`
  );

  const abbrRegex = /^\*\[([^\]]+)\]:\s*(.+)$/gm;
  const abbrs: Array<{ key: string; value: string }> = [];
  let m: RegExpExecArray | null;
  while ((m = abbrRegex.exec(text)) !== null) {
    abbrs.push({ key: m[1], value: m[2] });
  }
  text = text.replace(abbrRegex, "");
  if (abbrs.length > 0) {
    const abbrTags = abbrs
      .map((a) => `<abbr title="${a.value}">${a.key}</abbr>`)
      .join("\n");
    text += `\n<div class="abbreviations" style="display:none">${abbrTags}</div>`;
  }

  return text;
}

interface MarkdownRendererProps {
  filePath: string;
}

const MarkdownRenderer: FC<MarkdownRendererProps> = ({ filePath }) => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadIdRef = useRef(0);

  useEffect(() => {
    const loadId = ++loadIdRef.current;
    fetch(filePath)
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to load: ${res.statusText}`);
        return res.text();
      })
      .then((text) => {
        if (loadId !== loadIdRef.current) return;
        setContent(text);
        setLoading(false);
        setError(null);
      })
      .catch((err) => {
        if (loadId !== loadIdRef.current) return;
        setContent("");
        setError(err.message);
        setLoading(false);
      });
  }, [filePath]);

  const components = useMemo<Components>(
    () => ({
      h1: ({ children, ...props }) => (
        <h1
          style={{
            fontSize: "2rem",
            fontWeight: 700,
            color: "var(--color-text)",
            marginTop: "2.5rem",
            marginBottom: "1.25rem",
            paddingBottom: "0.75rem",
            borderBottom: `2px solid var(--color-border-light)`,
            letterSpacing: "-0.02em",
          }}
          {...props}
        >
          {children}
        </h1>
      ),
      h2: ({ children, ...props }) => (
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: 600,
            color: "var(--color-text)",
            marginTop: "2.25rem",
            marginBottom: "1rem",
            letterSpacing: "-0.01em",
          }}
          {...props}
        >
          {children}
        </h2>
      ),
      h3: ({ children, ...props }) => (
        <h3
          style={{
            fontSize: "1.25rem",
            fontWeight: 600,
            color: "var(--color-text)",
            marginTop: "2rem",
            marginBottom: "0.75rem",
          }}
          {...props}
        >
          {children}
        </h3>
      ),
      h4: ({ children, ...props }) => (
        <h4
          style={{
            fontSize: "1.1rem",
            fontWeight: 600,
            color: "var(--color-text)",
            marginTop: "1.75rem",
            marginBottom: "0.75rem",
          }}
          {...props}
        >
          {children}
        </h4>
      ),
      p: ({ children, ...props }) => (
        <p
          style={{
            marginBottom: "1.25rem",
            lineHeight: 1.8,
            color: "var(--color-text)",
          }}
          {...props}
        >
          {children}
        </p>
      ),
      a: ({ children, href, ...props }) => (
        <a
          href={href}
          style={{
            color: "var(--color-link)",
            textDecoration: "none",
            borderBottom: "1px solid var(--color-link)",
            paddingBottom: "1px",
            transition: "all 0.15s ease",
          }}
          target={href?.startsWith("http") ? "_blank" : undefined}
          rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "var(--color-link-hover)";
            e.currentTarget.style.borderColor = "var(--color-link-hover)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "var(--color-link)";
            e.currentTarget.style.borderColor = "var(--color-link)";
          }}
          {...props}
        >
          {children}
        </a>
      ),
      ul: ({ children, ...props }) => (
        <ul
          style={{
            marginBottom: "1.25rem",
            paddingLeft: "1.75rem",
            color: "var(--color-text)",
            lineHeight: 1.8,
          }}
          {...props}
        >
          {children}
        </ul>
      ),
      ol: ({ children, ...props }) => (
        <ol
          style={{
            marginBottom: "1.25rem",
            paddingLeft: "1.75rem",
            color: "var(--color-text)",
            lineHeight: 1.8,
          }}
          {...props}
        >
          {children}
        </ol>
      ),
      li: ({ children, ...props }) => (
        <li
          style={{ marginBottom: "0.35rem", lineHeight: 1.75 }}
          {...props}
        >
          {children}
        </li>
      ),
      blockquote: ({ children, ...props }) => (
        <blockquote
          style={{
            margin: "1.5rem 0",
            padding: "1.25rem 1.5rem",
            borderLeft: `3px solid var(--color-blockquote)`,
            backgroundColor: "var(--color-blockquote-bg)",
            borderRadius: "var(--radius-md)",
            lineHeight: 1.75,
          }}
          {...props}
        >
          {children}
        </blockquote>
      ),
      code: ({
        className,
        children,
        inline,
        ...props
      }: {
        className?: string;
        children?: React.ReactNode;
        inline?: boolean;
      }) => {
        if (inline) {
          return (
            <code
              style={{
                padding: "0.2em 0.5em",
                fontSize: "0.875em",
                backgroundColor: "var(--color-code-bg)",
                color: "var(--color-code-text)",
                borderRadius: "var(--radius-xs)",
                fontFamily: "var(--font-mono)",
                fontWeight: 500,
              }}
              {...props}
            >
              {children}
            </code>
          );
        }
        return (
          <div style={{ position: "relative", margin: "1.5rem 0" }}>
            <pre
              style={{
                padding: "1.25rem 1.5rem",
                backgroundColor: "var(--color-code-bg)",
                borderRadius: "var(--radius-md)",
                overflowX: "auto",
                fontSize: "0.875rem",
                lineHeight: 1.7,
                fontFamily: "var(--font-mono)",
                boxShadow: "var(--shadow-xs)",
              }}
            >
              <code className={className} {...props}>
                {children}
              </code>
            </pre>
          </div>
        );
      },
      table: ({ children, ...props }) => (
        <div style={{ overflowX: "auto", margin: "1.5rem 0" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "separate",
              borderSpacing: 0,
              fontSize: "0.9rem",
              borderRadius: "var(--radius-md)",
              overflow: "hidden",
              border: `1px solid var(--color-table-border)`,
            }}
            {...props}
          >
            {children}
          </table>
        </div>
      ),
      thead: ({ children, ...props }) => (
        <thead
          style={{ backgroundColor: "var(--color-table-header)" }}
          {...props}
        >
          {children}
        </thead>
      ),
      th: ({ children, ...props }) => (
        <th
          style={{
            padding: "0.85rem 1.25rem",
            textAlign: "left",
            fontWeight: 600,
            borderBottom: `2px solid var(--color-table-border)`,
            borderRight: `1px solid var(--color-table-border)`,
            color: "var(--color-text)",
          }}
          {...props}
        >
          {children}
        </th>
      ),
      td: ({ children, ...props }) => (
        <td
          style={{
            padding: "0.75rem 1.25rem",
            borderBottom: `1px solid var(--color-border-light)`,
            borderRight: `1px solid var(--color-border-light)`,
            color: "var(--color-text)",
          }}
          {...props}
        >
          {children}
        </td>
      ),
      img: ({ src, alt, ...props }) => (
        <img
          src={src}
          alt={alt}
          style={{
            maxWidth: "100%",
            height: "auto",
            borderRadius: "var(--radius-md)",
            margin: "1.5rem 0",
            boxShadow: "var(--shadow-sm)",
          }}
          {...props}
        />
      ),
      hr: (props) => (
        <hr
          style={{
            margin: "2rem 0",
            border: "none",
            borderTop: `1px solid var(--color-border-light)`,
          }}
          {...props}
        />
      ),
      input: ({ type, checked, disabled, ...props }) => {
        if (type === "checkbox") {
          return (
            <input
              type="checkbox"
              checked={checked}
              disabled={disabled}
              style={{
                marginRight: "0.6rem",
                accentColor: "var(--color-accent)",
                width: "16px",
                height: "16px",
              }}
              readOnly
              {...props}
            />
          );
        }
        return <input type={type} {...props} />;
      },
      del: ({ children, ...props }) => (
        <del style={{ opacity: 0.6 }} {...props}>
          {children}
        </del>
      ),
      strong: ({ children, ...props }) => (
        <strong
          style={{ fontWeight: 600, color: "var(--color-text)" }}
          {...props}
        >
          {children}
        </strong>
      ),
      em: ({ children, ...props }) => <em {...props}>{children}</em>,
    }),
    []
  );

  const processedContent = useMemo(() => preprocessMarkdown(content), [content]);

  if (loading) {
    return (
      <div
        className="flex items-center justify-center h-full"
        style={{ color: "var(--color-text-muted)", padding: "80px 32px" }}
      >
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="flex items-center justify-center h-full"
        style={{ color: "var(--color-code-text)", padding: "80px 32px" }}
      >
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <article
      dir="auto"
      style={{
        maxWidth: "48rem",
        margin: "0 auto",
        fontFamily: "var(--font-body)",
        padding: "48px 48px 80px",
        wordBreak: "break-word",
        overflowWrap: "break-word",
      }}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath, remarkEmoji]}
        rehypePlugins={[
          rehypeKatex,
          rehypeRaw,
          rehypeSlug,
          [rehypePrismPlus, { ignoreMissing: true }],
        ]}
        components={components}
      >
        {processedContent}
      </ReactMarkdown>
    </article>
  );
};

export default MarkdownRenderer;
