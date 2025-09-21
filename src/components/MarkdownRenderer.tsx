import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

interface MarkdownRendererProps {
  content: string
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="prose prose-gray dark:prose-invert max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({
            inline,
            className,
            children,
            ...props
          }: React.HTMLAttributes<HTMLElement> & {
            inline?: boolean
            className?: string
            children?: React.ReactNode
          }) {
            if (inline) {
              return (
                <code className="px-2 py-1 rounded bg-muted text-sm font-mono border text-foreground">{children}</code>
              )
            }
            return (
              <pre className="rounded bg-muted p-4 overflow-x-auto border text-sm mb-4">
                <code className={className + " font-mono text-foreground"} {...props}>
                  {children}
                </code>
              </pre>
            )
          },
          h1: ({ children }) => <h1 className="text-3xl font-bold mt-8 mb-4 text-foreground">{children}</h1>,
          h2: ({ children }) => <h2 className="text-2xl font-semibold mt-6 mb-3 text-foreground">{children}</h2>,
          h3: ({ children }) => <h3 className="text-xl font-semibold mt-4 mb-2 text-foreground">{children}</h3>,
          p: ({ children }) => <p className="mb-4 leading-relaxed text-muted-foreground">{children}</p>,
          ul: ({ children }) => (
            <ul className="list-disc list-inside mb-4 space-y-2 text-muted-foreground">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside mb-4 space-y-2 text-muted-foreground">{children}</ol>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-primary pl-4 italic my-4 bg-muted/30 py-2 rounded-r text-muted-foreground">
              {children}
            </blockquote>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              className="text-primary hover:text-primary/80 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
