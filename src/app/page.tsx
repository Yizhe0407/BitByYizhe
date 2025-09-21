import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BlogCard } from "@/components/BlogCard";
import { getLatestPosts } from "@/lib/blog";
import { ArrowRight, ChevronDown } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "yizhe Blog",
  description: "記錄技術、生活與旅行的每個故事。",
  openGraph: {
    title: "yizhe Blog",
    description: "記錄技術、生活與旅行的每個故事。",
    type: "website",
  },
};

export default async function HomePage() {
  const latestPosts = await getLatestPosts(3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-screen py-24">
        {/* 背景影片 */}
        <video
          autoPlay
          muted
          playsInline
          loop
          className="absolute inset-0 w-full h-full object-cover -z-10"
        >
          <source src="/videos/ocean.webm" type="video/webm" />
          <source src="/videos/ocean.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* 黑色透明遮罩（整體） */}
        <div className="absolute inset-0 bg-black/40 -z-10" />

        <div className="relative z-10 flex flex-col items-center">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-neutral-100 text-center mb-6">
            BitByYizhe
          </h1>
          <p className="mt-2 text-lg md:text-2xl text-neutral-100/90 text-center max-w-xl">
            記錄技術、生活與旅行的每個故事
          </p>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
          <ChevronDown className="w-10 h-10 text-neutral-200" />
        </div>
      </section>

      {/* Latest Posts Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Latest Articles</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              聚焦技術、設計與生活隨筆，帶你一同成長、發掘更多靈感。
            </p>
          </div>

          {latestPosts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {latestPosts.map((post) => (
                  <BlogCard key={post.slug} post={post} />
                ))}
              </div>

              <div className="text-center">
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="shadow-lg hover:shadow-xl transition-shadow bg-transparent"
                >
                  <Link href="/blog">
                    View All Articles
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">
                No articles available yet.
              </p>
              <p className="text-sm text-muted-foreground">
                Check back soon for new content!
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
