import fs from "fs";
import path from "path";
import React from "react";
import Link from "next/link";
import { marked } from "marked";
import matter from "gray-matter";
import type { Metadata } from "next";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";

async function getPost(slug: string) {
  const markdownFile = path.join(
    process.cwd(),
    "src/content/posts",
    `${slug}.md`
  );

  try {
    const fileContents = await fs.promises.readFile(markdownFile, "utf8");
    const { data: frontmatter, content } = matter(fileContents);
    return { frontmatter, content };
  } catch (err) {
    return null;
  }
}

// 生成動態元數據
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description || "Blog post",
    authors: post.frontmatter.author
      ? [{ name: post.frontmatter.author }]
      : undefined,
  };
}

export default async function page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) {
    notFound();
  }
  return (
    <main className="min-h-screen py-12 pt-20 md:pt-24">
      <div className="max-w-4xl mx-auto px-4">
        {/* Back Button */}
        <Button variant="ghost" asChild className="mb-8 hover:bg-muted/50">
          <Link href="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
        </Button>
        <article>
          <header className="mb-8">
            <div className="flex flex-wrap gap-2 mb-4">
              {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
                <div className="flex gap-2 mt-2">
                  {post.frontmatter.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="hover:bg-secondary/80"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <h1 className="text-2xl lg:text-4xl font-bold mb-6 leading-tight">
              {post.frontmatter.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-8">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span className="font-medium">{post.frontmatter.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <time dateTime={post.frontmatter.date}>
                  {new Date(post.frontmatter.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </div>
            </div>
          </header>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            <MarkdownRenderer content={post.content} />
          </div>
        </article>
      </div>
    </main>
  );
}
