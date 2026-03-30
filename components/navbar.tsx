"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Moon, Sun, Menu, X, Globe, Monitor, ChevronDown } from "lucide-react"
import { useTheme } from "next-themes"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useLanguage } from "@/contexts/language-context"

const navigation = [
  { name: "Home", href: "/", nameEs: "Inicio" },
  { name: "Services", href: "/services", nameEs: "Servicios" },
  { name: "Projects", href: "/projects", nameEs: "Proyectos" },
  { name: "About", href: "/about", nameEs: "Sobre mí" },
  { name: "Contact", href: "/contact#form", nameEs: "Contacto" },
]

const themeTranslations = {
  en: {
    light: "Light",
    dark: "Dark",
    system: "System",
  },
  es: {
    light: "Claro",
    dark: "Oscuro",
    system: "Sistema",
  },
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false)
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false)
  const [mobileThemeDropdownOpen, setMobileThemeDropdownOpen] = useState(false)
  const [mobileLanguageDropdownOpen, setMobileLanguageDropdownOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { language, setLanguage } = useLanguage()
  const { setTheme, theme } = useTheme()
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setMounted(true)
  }, [])

  const getThemeIcon = () => {
    if (theme === "light") return <Sun className="h-4 w-4" />
    if (theme === "dark") return <Moon className="h-4 w-4" />
    return <Monitor className="h-4 w-4" />
  }

  const getThemeLabel = () => {
    const translations = themeTranslations[language as keyof typeof themeTranslations] || themeTranslations.en
    if (theme === "light") return translations.light
    if (theme === "dark") return translations.dark
    return translations.system
  }

  if (!mounted) {
    return (
      <nav className="fixed top-0 w-full z-50 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <Link
                href="/"
                className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent hover:opacity-80 transition-opacity"
              >
                Mario Martinez
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="transition-all duration-200 text-sm font-medium relative group text-muted-foreground hover:text-primary"
                  >
                    {language === "en" ? item.name : item.nameEs}
                  </Link>
                ))}
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="hover:bg-accent/10 hover:text-accent transition-colors min-w-[70px] cursor-pointer"
              >
                <Globe className="h-4 w-4" />
                <span className="ml-2">{language.toUpperCase()}</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="hover:bg-accent/10 hover:text-accent transition-colors min-w-[100px] cursor-pointer"
              >
                <Monitor className="h-4 w-4" />
              </Button>
            </div>
            <div className="md:hidden flex items-center space-x-2">
              <Button variant="ghost" size="sm" className="hover:bg-accent/10 hover:text-accent transition-colors">
                <Monitor className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="hover:bg-accent/10 hover:text-accent transition-colors">
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </nav>
    )
  }

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-md border-b border-border shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent hover:opacity-80 transition-opacity"
            >
              Mario Martinez
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`transition-all duration-200 text-sm font-medium relative group ${
                    pathname === item.href ? "text-primary" : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  {language === "en" ? item.name : item.nameEs}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-primary to-accent transition-all duration-300 ${
                      pathname === item.href ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              ))}
            </div>
          </div>

          {/* Theme and Language Controls */}
          <div className="hidden md:flex items-center space-x-4">
            <DropdownMenu open={languageDropdownOpen} onOpenChange={setLanguageDropdownOpen}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="hover:bg-accent/10 hover:text-accent transition-colors min-w-[70px] cursor-pointer"
                >
                  <Globe className="h-4 w-4" />
                  <span className="ml-2">{language.toUpperCase()}</span>
                  <ChevronDown className="h-3 w-3 ml-1 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="border-border">
                <DropdownMenuItem
                  onClick={() => setLanguage("en")}
                  className="hover:bg-accent/10 hover:text-accent cursor-pointer"
                >
                  English
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setLanguage("es")}
                  className="hover:bg-accent/10 hover:text-accent cursor-pointer"
                >
                  Español
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu open={themeDropdownOpen} onOpenChange={setThemeDropdownOpen}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="hover:bg-accent/10 hover:text-accent transition-colors min-w-[100px] cursor-pointer"
                >
                  {getThemeIcon()}
                  <span className="ml-2">{getThemeLabel()}</span>
                  <ChevronDown className="h-3 w-3 ml-1 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="border-border">
                <DropdownMenuItem
                  onClick={() => setTheme("light")}
                  className="group hover:bg-accent/10 hover:text-accent cursor-pointer"
                >
                  <Sun className="h-4 w-4 mr-2 text-inherit" />
                  {themeTranslations[language as keyof typeof themeTranslations]?.light || "Light"}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setTheme("dark")}
                  className="group hover:bg-accent/10 hover:text-accent cursor-pointer"
                >
                  <Moon className="h-4 w-4 mr-2 text-inherit" />
                  {themeTranslations[language as keyof typeof themeTranslations]?.dark || "Dark"}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setTheme("system")}
                  className="group hover:bg-accent/10 hover:text-accent cursor-pointer"
                >
                  <Monitor className="h-4 w-4 mr-2 text-inherit" />
                  {themeTranslations[language as keyof typeof themeTranslations]?.system || "System"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <DropdownMenu open={mobileThemeDropdownOpen} onOpenChange={setMobileThemeDropdownOpen}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="hover:bg-accent/10 hover:text-accent transition-colors cursor-pointer">
                  {getThemeIcon()}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="border-border">
                <DropdownMenuItem
                  onClick={() => setTheme("light")}
                  className="group hover:bg-accent/10 hover:text-accent cursor-pointer"
                >
                  <Sun className="h-4 w-4 mr-2 text-inherit" />
                  {themeTranslations[language as keyof typeof themeTranslations]?.light || "Light"}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setTheme("dark")}
                  className="group hover:bg-accent/10 hover:text-accent cursor-pointer"
                >
                  <Moon className="h-4 w-4 mr-2 text-inherit" />
                  {themeTranslations[language as keyof typeof themeTranslations]?.dark || "Dark"}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setTheme("system")}
                  className="group hover:bg-accent/10 hover:text-accent cursor-pointer"
                >
                  <Monitor className="h-4 w-4 mr-2 text-inherit" />
                  {themeTranslations[language as keyof typeof themeTranslations]?.system || "System"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="hover:bg-accent/10 hover:text-accent transition-colors"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-background/95 backdrop-blur-md border-b border-border">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block px-3 py-2 rounded-md transition-all duration-200 ${
                    pathname === item.href
                      ? "text-primary bg-primary/10 border-l-2 border-primary"
                      : "text-muted-foreground hover:text-primary hover:bg-accent/10 hover:border-l-2 hover:border-accent"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {language === "en" ? item.name : item.nameEs}
                </Link>
              ))}
              <div className="px-3 py-2">
                <DropdownMenu open={mobileLanguageDropdownOpen} onOpenChange={setMobileLanguageDropdownOpen}>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start hover:bg-accent/10 hover:text-accent cursor-pointer"
                    >
                      <Globe className="h-4 w-4 mr-2" />
                      {language.toUpperCase()}
                      <ChevronDown className="h-3 w-3 ml-auto opacity-50" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="border-border">
                    <DropdownMenuItem
                      onClick={() => setLanguage("en")}
                      className="hover:bg-accent/10 hover:text-accent cursor-pointer"
                    >
                      English
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setLanguage("es")}
                      className="hover:bg-accent/10 hover:text-accent cursor-pointer"
                    >
                      Español
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
