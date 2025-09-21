import { Suspense } from "react"
import { BlogGrid } from "@/components/BlogGrid"
import { getBlogPosts, getAllTags } from "@/lib/blog"
import { Loader2 } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog - yizhe",
  description: "Articles about web development, design, and technology trends.",
  openGraph: {
    title: "Blog - yizhe",
    description: "Articles about web development, design, and technology trends.",
    type: "website",
  },
}

export default async function BlogPage() {
  // 在服務器端獲取數據
  const posts = await getBlogPosts()
  const tags = await getAllTags()

  return (
    <div className="min-h-screen py-12 pt-28">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Blog</h1>
        </div>

        <Suspense fallback={<BlogGridSkeleton />}>
          <BlogGrid posts={posts} tags={tags} />
        </Suspense>
      </div>
    </div>
  )
}

function BlogGridSkeleton() {
  return (
    <div className="space-y-8">
      {/* Search skeleton */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 h-10 bg-muted rounded animate-pulse"></div>
        <div className="w-48 h-10 bg-muted rounded animate-pulse"></div>
      </div>

      {/* Grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-muted h-48 rounded-lg mb-4"></div>
            <div className="space-y-2">
              <div className="bg-muted h-4 rounded"></div>
              <div className="bg-muted h-4 rounded w-3/4"></div>
              <div className="bg-muted h-3 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Loading indicator */}
      <div className="flex justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    </div>
  )
}
