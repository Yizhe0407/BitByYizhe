import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { cache } from "react"

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  content: string
  author: string
  date: string
  image: string
  tags: string[]
}

const contentDirectory = path.join(process.cwd(), "src", "content", "posts")

export const getBlogPosts = cache((): BlogPost[] => {
  try {
    if (!fs.existsSync(contentDirectory)) return []

    const fileNames = fs.readdirSync(contentDirectory)
    const posts = fileNames
      .filter((name) => name.endsWith(".md"))
      .map((fileName) => {
        const slug = fileName.replace(/\.md$/, "")
        const fullPath = path.join(contentDirectory, fileName)

        const fileContents = fs.readFileSync(fullPath, "utf8")
        const { data, content } = matter(fileContents)

        return {
          slug,
          title: data.title || "",
          excerpt: data.excerpt || "",
          content,
          author: data.author || "yizhe",
          date: data.date || "",
          image: data.image || "/placeholder.svg?height=400&width=600",
          tags: data.tags || [],
        } as BlogPost
      })

    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  } catch (error) {
    console.error("Error reading blog posts:", error)
    return []
  }
})

export const getBlogPost = cache((slug: string): BlogPost | undefined => {
  try {
    const fullPath = path.join(contentDirectory, `${slug}.md`)
    if (!fs.existsSync(fullPath)) return undefined

    const fileContents = fs.readFileSync(fullPath, "utf8")
    const { data, content } = matter(fileContents)

    return {
      slug,
      title: data.title || "",
      excerpt: data.excerpt || "",
      content,
      author: data.author || "yizhe",
      date: data.date || "",
      image: data.image || "/placeholder.svg?height=400&width=600",
      tags: data.tags || [],
    } as BlogPost
  } catch (error) {
    console.error(`Error reading blog post ${slug}:`, error)
    return undefined
  }
})

// ...existing code...
export const getLatestPosts = cache((count = 3): BlogPost[] => {
  return getBlogPosts().slice(0, count)
})

export const getAllTags = cache((): string[] => {
  const posts = getBlogPosts()
  const tags = new Set<string>()
  posts.forEach((post) => {
    post.tags.forEach((tag) => tags.add(tag))
  })
  return Array.from(tags).sort()
})