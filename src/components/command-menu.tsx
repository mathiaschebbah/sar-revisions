"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import {
  BookOpen,
  Calculator,
  CircleDot,
  FileText,
  GraduationCap,
  Home,
  Search,
  Settings,
  Zap,
} from "lucide-react"

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import { Button } from "@/components/ui/button"

const navigationItems = [
  {
    heading: "Navigation",
    items: [
      { icon: Home, label: "Dashboard", href: "/", shortcut: "D" },
      { icon: GraduationCap, label: "Quiz", href: "/quiz", shortcut: "Q" },
      { icon: CircleDot, label: "Simulateur", href: "/simulateur", shortcut: "S" },
      { icon: Calculator, label: "Exercices", href: "/exercices", shortcut: "E" },
      { icon: BookOpen, label: "Cours", href: "/cours", shortcut: "C" },
    ],
  },
  {
    heading: "Chapitres",
    items: [
      { icon: FileText, label: "Introduction aux systèmes distribués", href: "/cours/chapitre-1" },
      { icon: FileText, label: "La Communication", href: "/cours/chapitre-2" },
      { icon: FileText, label: "Le Temps - Horloges de Lamport", href: "/cours/chapitre-3" },
      { icon: FileText, label: "La Concurrence - Exclusion mutuelle", href: "/cours/chapitre-4" },
      { icon: FileText, label: "L'Élection - Algorithmes", href: "/cours/chapitre-5" },
    ],
  },
  {
    heading: "Algorithmes",
    items: [
      { icon: Zap, label: "Algorithme de Le Lann", href: "/simulateur?algo=lelann" },
      { icon: Zap, label: "Algorithme de Chang-Roberts", href: "/simulateur?algo=chang-roberts" },
      { icon: Zap, label: "Algorithme de Franklin", href: "/simulateur?algo=franklin" },
    ],
  },
]

export function CommandMenu() {
  const [open, setOpen] = React.useState(false)
  const router = useRouter()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false)
    command()
  }, [])

  return (
    <>
      <Button
        variant="outline"
        className="relative h-9 w-full justify-start rounded-lg bg-muted/50 text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-40 lg:w-64"
        onClick={() => setOpen(true)}
      >
        <Search className="mr-2 size-4" />
        <span className="hidden lg:inline-flex">Rechercher...</span>
        <span className="inline-flex lg:hidden">Rechercher...</span>
        <kbd className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 hidden h-5 select-none items-center gap-1 rounded border bg-background px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Rechercher une page, un chapitre, un algorithme..." />
        <CommandList>
          <CommandEmpty>Aucun résultat trouvé.</CommandEmpty>
          {navigationItems.map((group, index) => (
            <React.Fragment key={group.heading}>
              <CommandGroup heading={group.heading}>
                {group.items.map((item) => (
                  <CommandItem
                    key={item.href}
                    value={item.label}
                    onSelect={() => {
                      runCommand(() => router.push(item.href))
                    }}
                  >
                    <item.icon className="mr-2 size-4" />
                    <span>{item.label}</span>
                    {"shortcut" in item && (
                      <CommandShortcut>{item.shortcut}</CommandShortcut>
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
              {index < navigationItems.length - 1 && <CommandSeparator />}
            </React.Fragment>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  )
}
