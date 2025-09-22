import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ComponentProps, ReactNode } from "react";
import { MDXComponents } from "mdx/types";
import { AlertCircle, CheckCircle2, Info, AlertTriangle } from "lucide-react"

// 定义类型
interface CalloutProps {
  type?: "info" | "warning" | "error" | "success";
  children: ReactNode;
}

interface CustomButtonProps extends ComponentProps<typeof Button> {
  href?: string;
  children: ReactNode;
}

interface CodeBlockProps {
  children: ReactNode;
  className?: string;
}

// 自定义组件 - 警告框
export function Callout({ type = "info", children }: CalloutProps) {
  const styles = {
    info: "bg-blue-50 border-blue-300 text-blue-800 dark:bg-blue-950/40 dark:border-blue-700 dark:text-blue-200",
    warning: "bg-yellow-50 border-yellow-300 text-yellow-800 dark:bg-yellow-950/40 dark:border-yellow-700 dark:text-yellow-200",
    error: "bg-red-50 border-red-300 text-red-800 dark:bg-red-950/40 dark:border-red-700 dark:text-red-200",
    success: "bg-green-50 border-green-300 text-green-800 dark:bg-green-950/40 dark:border-green-700 dark:text-green-200",
  }

  const icons = {
    info: <Info className="h-5 w-5 shrink-0" />,
    warning: <AlertTriangle className="h-5 w-5 shrink-0" />,
    error: <AlertCircle className="h-5 w-5 shrink-0" />,
    success: <CheckCircle2 className="h-5 w-5 shrink-0" />,
  }

  return (
    <div
      className={`flex justify-start items-center gap-3 border rounded-lg p-4 mb-4 shadow-sm ${styles[type]}`}
      
    >
      {icons[type]}
      <div className="flex-1 [&>p]:mb-0 [&>p:last-child]:mb-0">{children}</div>
    </div>
  )
}

// 自定义组件 - 按钮
export function CustomButton({ href, children, ...props }: CustomButtonProps) {
  if (href) {
    return (
      <Button asChild className="mb-4" {...props}>
        <Link href={href}>{children}</Link>
      </Button>
    );
  }
  return <Button className="mb-4" {...props}>{children}</Button>;
}

// 自定义组件 - 代码块
export function CodeBlock({ children, className, ...props }: CodeBlockProps) {
  const language = className?.replace('language-', '') || '';
  
  return (
    <div className="relative">
      {language && (
        <div className="absolute top-2 right-2 text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
          {language}
        </div>
      )}
      <pre className="bg-muted p-4 rounded-lg overflow-x-auto" {...props}>
        <code className="text-sm font-mono">{children}</code>
      </pre>
    </div>
  );
}

// MDX 组件映射
export const mdxComponents: MDXComponents = {
  // 标题样式
  h1: (props: ComponentProps<'h1'>) => (
    <h1 className="text-3xl font-bold mb-6 mt-8 first:mt-0" {...props} />
  ),
  h2: (props: ComponentProps<'h2'>) => (
    <h2 className="text-2xl font-semibold mb-4 mt-8 border-b pb-2" {...props} />
  ),
  h3: (props: ComponentProps<'h3'>) => (
    <h3 className="text-xl font-medium mb-3 mt-6" {...props} />
  ),
  h4: (props: ComponentProps<'h4'>) => (
    <h4 className="text-lg font-medium mb-2 mt-4" {...props} />
  ),
  
  // 段落和文本
  p: (props: ComponentProps<'p'>) => <p className="mb-4 leading-7" {...props} />,
  
  // 链接
  a: (props: ComponentProps<'a'>) => (
    <a
      className="text-primary hover:underline font-medium"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  ),
  
  // 列表
  ul: (props: ComponentProps<'ul'>) => <ul className="mb-4 ml-6 list-disc" {...props} />,
  ol: (props: ComponentProps<'ol'>) => <ol className="mb-4 ml-6 list-decimal" {...props} />,
  li: (props: ComponentProps<'li'>) => <li className="mb-1" {...props} />,
  
  // 代码
  code: (props: ComponentProps<'code'>) => {
    if (typeof props.children === 'string' && !props.children.includes('\n')) {
      // 内联代码
      return (
        <code
          className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono"
          {...props}
        />
      );
    }
    // 代码块
    return <CodeBlock {...props} />;
  },
  
  // 预格式化文本 (代码块容器)
  pre: (props: ComponentProps<'pre'>) => (
    <pre className="mb-4 overflow-x-auto" {...props} />
  ),
  
  // 引用
  blockquote: (props: ComponentProps<'blockquote'>) => (
    <blockquote
      className="border-l-4 border-primary pl-4 italic my-4 text-muted-foreground"
      {...props}
    />
  ),
  
  // 分割线
  hr: (props: ComponentProps<'hr'>) => <hr className="my-8 border-border" {...props} />,
  
  // 表格
  table: (props: ComponentProps<'table'>) => (
    <div className="overflow-x-auto mb-4">
      <table className="w-full border-collapse border border-border" {...props} />
    </div>
  ),
  th: (props: ComponentProps<'th'>) => (
    <th
      className="border border-border px-4 py-2 bg-muted font-semibold text-left"
      {...props}
    />
  ),
  td: (props: ComponentProps<'td'>) => (
    <td className="border border-border px-4 py-2" {...props} />
  ),
  
  // 图片
  img: (props: ComponentProps<'img'>) => (
    <img
      className="rounded-lg my-4 max-w-full h-auto"
      {...props}
    />
  ),
  
  // 自定义组件
  Callout,
  CustomButton,
};