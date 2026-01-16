"use client";

import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  BookOpen,
  Clock,
  CheckCircle2,
  Circle,
  PlayCircle,
  ArrowRight,
  GraduationCap,
  Sparkles,
  ListChecks,
} from "lucide-react";

const chapters = [
  {
    id: 1,
    title: "Introduction aux systemes distribues",
    description: "Generalites, definitions et concepts fondamentaux des systemes repartis",
    progress: 100,
    duration: "45 min",
    topics: [
      "Definition d'un systeme distribue",
      "Avantages et inconvenients",
      "Modeles de communication",
      "Topologies de reseau",
      "Hypotheses de base",
    ],
  },
  {
    id: 2,
    title: "La Communication",
    description: "Modeles et primitives de communication dans les systemes repartis",
    progress: 75,
    duration: "1h 15min",
    topics: [
      "Communication synchrone vs asynchrone",
      "Canaux de communication",
      "Diffusion (broadcast)",
      "Communication de groupe",
      "Fiabilite des communications",
      "Ordonnancement des messages",
      "Canaux FIFO",
      "Canaux causaux",
    ],
  },
  {
    id: 3,
    title: "Le Temps",
    description: "Horloges logiques, ordonnancement et datation des evenements",
    progress: 50,
    duration: "1h",
    topics: [
      "Probleme de l'horloge globale",
      "Horloges de Lamport",
      "Horloges vectorielles",
      "Relation de causalite",
      "Datation des evenements",
      "Coupures coherentes",
    ],
  },
  {
    id: 4,
    title: "La Concurrence",
    description: "Exclusion mutuelle et gestion des sections critiques",
    progress: 25,
    duration: "1h 30min",
    topics: [
      "Probleme de l'exclusion mutuelle",
      "Algorithme centralise",
      "Algorithme de Lamport",
      "Algorithme de Ricart-Agrawala",
      "Algorithme a base de jeton",
      "Algorithme de Suzuki-Kasami",
      "Algorithme de Raymond",
      "Interblocage",
      "Detection de terminaison",
      "Algorithme de Dijkstra-Scholten",
    ],
  },
  {
    id: 5,
    title: "L'Election",
    description: "Algorithmes d'election de leader dans differentes topologies",
    progress: 0,
    duration: "1h",
    topics: [
      "Problematique de l'election",
      "Algorithme de Le Lann (1977)",
      "Algorithme de Chang et Roberts (1979)",
      "Algorithme de Franklin (1982)",
      "Complexite des algorithmes",
      "Preuves de correction",
      "Anneau unidirectionnel vs bidirectionnel",
    ],
  },
];

export default function CoursPage() {
  const totalProgress = Math.round(
    chapters.reduce((acc, ch) => acc + ch.progress, 0) / chapters.length
  );
  const completedChapters = chapters.filter(ch => ch.progress === 100).length;
  const nextChapter = chapters.find(ch => ch.progress < 100);

  return (
    <TooltipProvider>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
                <GraduationCap className="h-8 w-8 text-primary" />
                Cours SAR
              </h1>
              <p className="text-muted-foreground">
                Systemes et Algorithmiques Repartis - Master 1 MIDO
              </p>
            </div>
            {nextChapter && (
              <Link href={`/cours/chapitre-${nextChapter.id}`}>
                <Button className="gap-2">
                  <PlayCircle className="h-4 w-4" />
                  Continuer
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            )}
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardContent className="p-4 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Sparkles className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{totalProgress}%</p>
                  <p className="text-xs text-muted-foreground">Progression</p>
                </div>
                <Progress value={totalProgress} className="ml-auto w-24 h-2" />
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-500/10">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{completedChapters}/{chapters.length}</p>
                  <p className="text-xs text-muted-foreground">Termines</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <Clock className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">~5h</p>
                  <p className="text-xs text-muted-foreground">De contenu</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

      {/* Tabs */}
      <Tabs defaultValue="chapters" className="space-y-6">
        <TabsList>
          <TabsTrigger value="chapters">Chapitres</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
        </TabsList>

        <TabsContent value="chapters" className="space-y-4">
          {chapters.map((chapter) => (
            <Link key={chapter.id} href={`/cours/chapitre-${chapter.id}`}>
              <Card className="hover:shadow-md transition-all cursor-pointer group">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold ${
                        chapter.progress === 100
                          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                          : chapter.progress > 0
                            ? "bg-primary/10 text-primary"
                            : "bg-muted text-muted-foreground"
                      }`}>
                        {chapter.progress === 100 ? (
                          <CheckCircle2 className="h-5 w-5" />
                        ) : (
                          chapter.id
                        )}
                      </div>
                      <div>
                        <CardTitle className="text-lg group-hover:text-primary transition-colors">
                          Chapitre {chapter.id}: {chapter.title}
                        </CardTitle>
                        <CardDescription>{chapter.description}</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">
                        <Clock className="h-3 w-3 mr-1" />
                        {chapter.duration}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {chapter.topics.slice(0, 4).map((topic) => (
                        <Badge key={topic} variant="outline" className="text-xs">
                          {topic}
                        </Badge>
                      ))}
                      {chapter.topics.length > 4 && (
                        <Badge variant="outline" className="text-xs">
                          +{chapter.topics.length - 4} autres
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">
                        {chapter.progress}%
                      </span>
                      <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            chapter.progress === 100 ? "bg-green-500" : "bg-primary"
                          }`}
                          style={{ width: `${chapter.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </TabsContent>

        <TabsContent value="timeline">
          <Card>
            <CardContent className="p-6">
              <div className="relative">
                {chapters.map((chapter, index) => (
                  <div key={chapter.id} className="flex gap-4 pb-8 last:pb-0">
                    <div className="flex flex-col items-center">
                      <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                        chapter.progress === 100
                          ? "bg-green-500 text-white"
                          : chapter.progress > 0
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                      }`}>
                        {chapter.progress === 100 ? (
                          <CheckCircle2 className="h-4 w-4" />
                        ) : chapter.progress > 0 ? (
                          <PlayCircle className="h-4 w-4" />
                        ) : (
                          <Circle className="h-4 w-4" />
                        )}
                      </div>
                      {index < chapters.length - 1 && (
                        <div className={`w-0.5 flex-1 mt-2 ${
                          chapter.progress === 100 ? "bg-green-500" : "bg-muted"
                        }`} />
                      )}
                    </div>
                    <div className="flex-1 pb-2">
                      <Link href={`/cours/chapitre-${chapter.id}`} className="hover:underline">
                        <h3 className="font-semibold">
                          Chapitre {chapter.id}: {chapter.title}
                        </h3>
                      </Link>
                      <p className="text-sm text-muted-foreground mt-1">
                        {chapter.description}
                      </p>
                      <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                        <BookOpen className="h-4 w-4" />
                        <span>{chapter.topics.length} sujets</span>
                        <span>•</span>
                        <Clock className="h-4 w-4" />
                        <span>{chapter.duration}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      </div>
    </TooltipProvider>
  );
}
