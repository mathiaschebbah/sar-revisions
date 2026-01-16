import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  GraduationCap,
  CircleDot,
  FlaskConical,
  Zap,
  CheckCircle2,
  ArrowRight
} from "lucide-react";

const chapters = [
  {
    id: 1,
    title: "Introduction aux systemes distribues",
    description: "Generalites et concepts fondamentaux",
    progress: 100,
    lessons: 5,
  },
  {
    id: 2,
    title: "La Communication",
    description: "Modeles de communication dans les systemes repartis",
    progress: 75,
    lessons: 8,
  },
  {
    id: 3,
    title: "Le Temps",
    description: "Horloges logiques et ordonnancement",
    progress: 50,
    lessons: 6,
  },
  {
    id: 4,
    title: "La Concurrence",
    description: "Exclusion mutuelle et sections critiques",
    progress: 25,
    lessons: 10,
  },
  {
    id: 5,
    title: "L'Election",
    description: "Algorithmes de Le Lann, Chang-Roberts, Franklin",
    progress: 0,
    lessons: 7,
  },
];

const features = [
  {
    icon: BookOpen,
    title: "Fiches de revision",
    description: "Resumes clairs et concis de chaque chapitre du cours",
  },
  {
    icon: GraduationCap,
    title: "Quiz interactifs",
    description: "Testez vos connaissances avec des QCM adaptatifs",
  },
  {
    icon: CircleDot,
    title: "Simulateur d'algorithmes",
    description: "Visualisez les algorithmes d'election en temps reel",
  },
  {
    icon: FlaskConical,
    title: "Exercices corriges",
    description: "Entrainez-vous avec des exercices types examen",
  },
];

const algorithms = [
  { name: "Le Lann", complexity: "O(n²)", type: "Unidirectionnel" },
  { name: "Chang-Roberts", complexity: "O(n log n)", type: "Unidirectionnel" },
  { name: "Franklin", complexity: "O(n log n)", type: "Bidirectionnel" },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-20 md:py-32">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />
        <div className="container mx-auto text-center">
          <Badge variant="secondary" className="mb-4">
            Master 1 MIDO - Dauphine
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Maitrisez les{" "}
            <span className="text-primary">Systemes Repartis</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            La plateforme de revision ultime pour le cours SAR.
            Quiz, simulateurs et exercices pour reussir vos examens.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/cours">
                Commencer les revisions
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/simulateur">
                Voir le simulateur
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Tout pour reussir</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Des outils interactifs concus pour vous aider a comprendre et memoriser les concepts cles
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <Card key={feature.title} className="border-0 shadow-sm">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Chapters Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Les 5 Chapitres du cours</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Progressez chapitre par chapitre et suivez votre avancement
            </p>
          </div>
          <div className="grid gap-4 max-w-3xl mx-auto">
            {chapters.map((chapter) => (
              <Link key={chapter.id} href={`/cours/chapitre-${chapter.id}`}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="flex items-center p-4 gap-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                      {chapter.id}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{chapter.title}</h3>
                      <p className="text-sm text-muted-foreground">{chapter.description}</p>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <BookOpen className="h-4 w-4" />
                      <span>{chapter.lessons} lecons</span>
                    </div>
                    {chapter.progress === 100 ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    ) : (
                      <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${chapter.progress}%` }}
                        />
                      </div>
                    )}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Algorithms Preview */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Algorithmes d&apos;Election</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Comprenez et visualisez les 3 algorithmes cles du chapitre Election
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {algorithms.map((algo) => (
              <Card key={algo.name} className="text-center">
                <CardHeader>
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
                    <CircleDot className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle>{algo.name}</CardTitle>
                  <CardDescription>{algo.type}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center gap-2">
                    <Badge variant="outline">
                      <Zap className="h-3 w-3 mr-1" />
                      {algo.complexity}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button asChild>
              <Link href="/simulateur">
                Lancer le simulateur
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">5</div>
              <div className="text-muted-foreground">Chapitres</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">50+</div>
              <div className="text-muted-foreground">Questions</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">3</div>
              <div className="text-muted-foreground">Algorithmes</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">100%</div>
              <div className="text-muted-foreground">Gratuit</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Pret a reviser ?</h2>
          <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8">
            Commencez des maintenant et maitrisez les systemes et algorithmiques repartis
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/cours">
              Commencer gratuitement
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          <p>SAR Revisions - Cours de Joyce El Haddad - Universite Paris Dauphine</p>
        </div>
      </footer>
    </div>
  );
}
