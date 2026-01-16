"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, BookOpen, GraduationCap, FlaskConical, CircleDot } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { href: "/cours", label: "Cours", icon: BookOpen },
  { href: "/quiz", label: "Quiz", icon: GraduationCap },
  { href: "/simulateur", label: "Simulateur", icon: CircleDot },
  { href: "/exercices", label: "Exercices", icon: FlaskConical },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-8">
        <Link href="/" className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
            S
          </div>
          <span className="font-bold text-xl hidden sm:inline-block">SAR Revisions</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center space-x-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <link.icon className="h-4 w-4" />
              <span>{link.label}</span>
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" className="hidden md:inline-flex">
            Connexion
          </Button>
          <Button size="sm" className="hidden md:inline-flex">
            Commencer
          </Button>

          {/* Mobile Navigation */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <div className="flex flex-col space-y-4 mt-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center space-x-2 text-lg font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
                  >
                    <link.icon className="h-5 w-5" />
                    <span>{link.label}</span>
                  </Link>
                ))}
                <div className="pt-4 space-y-2">
                  <Button variant="outline" className="w-full">
                    Connexion
                  </Button>
                  <Button className="w-full">
                    Commencer
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
