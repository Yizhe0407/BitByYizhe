"use client"

import { useState, useMemo } from "react"
import { BlogCard } from "@/components/BlogCard"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Filter } from "lucide-react"
import type { BlogPost } from "@/lib/blog"

interface BlogGridProps {
  posts: BlogPost[]
  tags: string[]
}

export function BlogGrid({ posts, tags }: BlogGridProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTag, setSelectedTag] = useState("")

  const filteredPosts = useMemo(() => {
    let filtered = posts

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.tags.some((tag) => tag.toLowerCase().includes(query)),
      )
    }

    if (selectedTag) {
      filtered = filtered.filter((post) => post.tags.includes(selectedTag))
    }

    return filtered
  }, [posts, searchQuery, selectedTag])

  return (
    <>
      {/* Search and Filter */}
      <div className="mb-12">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search articles..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <select
              className="px-3 py-2 border border-input rounded-md bg-background text-foreground"
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
            >
              <option value="">All Categories</option>
              {tags.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Active Filters */}
        {(searchQuery || selectedTag) && (
          <div className="flex flex-wrap gap-2 mb-6">
            {searchQuery && (
              <div className="flex items-center gap-2 px-3 py-1 bg-accent rounded-full text-sm text-accent-foreground">
                Search: "{searchQuery}"
                <Button variant="ghost" size="sm" className="h-auto p-0 text-xs" onClick={() => setSearchQuery("")}>
                  ×
                </Button>
              </div>
            )}
            {selectedTag && (
              <div className="flex items-center gap-2 px-3 py-1 bg-accent rounded-full text-sm text-accent-foreground">
                Category: {selectedTag}
                <Button variant="ghost" size="sm" className="h-auto p-0 text-xs" onClick={() => setSelectedTag("")}>
                  ×
                </Button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Results */}
      <div>
        {filteredPosts.length > 0 ? (
          <>
            <div className="text-sm text-muted-foreground mb-6">
              Showing {filteredPosts.length} article{filteredPosts.length !== 1 ? "s" : ""}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No articles found matching your criteria.</p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("")
                setSelectedTag("")
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </>
  )
}
