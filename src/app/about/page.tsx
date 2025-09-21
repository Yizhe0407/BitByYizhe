import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FolderGit, Trophy, Code, ToolCase, ExternalLink } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About - yizhe",
  description:
    "Learn more about yizhe - UI/UX designer and developer focused on creating exceptional user contestss.",
  openGraph: {
    title: "About - yizhe",
    description:
      "Learn more about yizhe - UI/UX designer and developer focused on creating exceptional user contestss.",
    type: "website",
  },
}

export default function AboutPage() {
  const languages = [
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Node.js",
  ]

  const tools = [
    "VS Code",
    "Docker",
    "Postman",
    "Sublime",
    "Ubuntu"
  ]

  const contests = [
    { title: "臺灣生成式AI應用黑客松 第一名", time: "2025" },
    { title: "全國工業類技藝競賽 電腦修護職種 第二名", time: "2022" },
  ]

  const projects = [
    {
      name: "離宿預約檢查系統",
      description: "讓學生可以線上申請退宿檢查，並具有安全認證、和後端處理。",
      tech: ["Next.js", "TypeScript", "Tailwind CSS"],
      link: "https://github.com/Yizhe0407/web_final",
    },
    {
      name: "個人化天氣預報",
      description: "可以客製化氣象列表，提供每日天氣預報。",
      tech: ["Next.js", "TypeScript", "Tailwind CSS"],
      link: "https://github.com/Yizhe0407/SkyNet",
    },
    {
      name: "LINE 預約系統",
      description: "一個讓使用者可以透過 LINE 預約的客製化系統。",
      tech: ["Next.js", "TypeScript", "Tailwind CSS"],
      link: "#",
    },
  ]

  return (
    <div className="min-h-screen py-6 pt-28">
      <div className="max-w-4xl mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">About Me</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            I am Yizhe, currently studying in the Department of Computer Science and Information Engineering at National Yunlin University of Science and Technology. I am currently learning frontend and backend development.
          </p>
        </div>

        {/* Skills Section */}
        <Card className="mb-12">
          <CardContent className="p-8">
            <h2 className="text-2xl font-semibold mb-6">Skills</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold mb-4 flex items-center">
                  <Code className="h-5 w-5 mr-2 text-blue-600" />
                  Languages
                </h3>
                <div className="flex flex-wrap gap-2">
                  {languages.map((language) => (
                      <Badge key={language} variant="secondary" className="hover:bg-secondary/80">
                        {language}
                      </Badge>
                    ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-4 flex items-center">
                  <ToolCase className="h-5 w-5 mr-2 text-blue-600" />
                  Tools
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tools.map((tool) => (
                      <Badge key={tool} variant="secondary" className="hover:bg-secondary/80">
                        {tool}
                      </Badge>
                    ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contest Section */}
        <Card className="mb-12">
          <CardContent className="p-8">
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <Trophy className="h-6 w-6 mr-2 text-blue-600" />
              Contest
            </h2>
            <div className="space-y-8">
              {contests.map((contest, index) => (
                <div key={index} className="border-l-2 border-blue-600 pl-6 last:pb-0">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                    <h3 className="font-semibold text-lg">{contest.title}</h3>
                    <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded">{contest.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Projects */}
        <Card className="mb-6">
          <CardContent className="p-8">
            <h2 className="text-2xl font-semibold mb-6 flex items-center">
              <FolderGit className="h-6 w-6 mr-2 text-blue-600" />
              Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, index) => (
                <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h3 className="font-semibold mb-2">{project.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{project.description}</p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {project.tech.map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={project.link}>
                      View Project
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
