"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
];

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  const isCurrentPage = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:block fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-card/60 hover:bg-card/50 backdrop-blur-md border rounded-2xl shadow-lg max-w-4xl w-[calc(100%-2rem)] transition-colors">
        <div className="px-4">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="font-bold text-xl text-foreground">
              BitByYizhe
            </Link>

            <div className="flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium transition-colors hover:text-primary relative ${
                    isCurrentPage(item.href)
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  {item.label}
                  {isCurrentPage(item.href) && (
                    <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full" />
                  )}
                </Link>
              ))}
            </div>

            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="md:hidden fixed top-2 left-1/2 transform -translate-x-1/2 z-50 w-[calc(100%-1rem)] max-w-md">
        <div className="bg-card/70 hover:bg-card/60 backdrop-blur-md border rounded-xl shadow-lg transition-colors">
          <div className="flex h-14 items-center justify-between px-4">
            <Link href="/" className="font-bold text-sm text-foreground">
              yizhe
            </Link>

            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={toggleTheme}
              >
                <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X className="h-4 w-4" />
                ) : (
                  <Menu className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="mt-2 bg-card/75 hover:bg-card/65 backdrop-blur-md border rounded-xl shadow-lg overflow-hidden animate-in slide-in-from-top-2 duration-200 transition-colors">
            <div className="">
              {navItems.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center px-4 py-3 text-sm font-medium transition-colors hover:bg-accent ${
                    isCurrentPage(item.href)
                      ? "text-primary bg-accent/50"
                      : "text-foreground"
                  } ${
                    index !== navItems.length - 1
                      ? "border-b border-border/50"
                      : ""
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="flex-1">{item.label}</span>
                  {isCurrentPage(item.href) && (
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                  )}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      {isMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
}
