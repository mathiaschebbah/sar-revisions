"use client"

import Link from "next/link"
import { toast } from "sonner"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  BookOpen,
  GraduationCap,
  CircleDot,
  FlaskConical,
  Zap,
  ArrowRight,
  TrendingUp,
  Target,
  Clock,
  Sparkles,
  CheckCircle2,
  Info,
  Play,
  Trophy,
  Flame,
} from "lucide-react"

const quickActions = [
  {
    title: "Quiz",
    description: "8 questions sur l'election",
    href: "/quiz",
    icon: GraduationCap,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    hoverDescription: "Testez vos connaissances sur les algorithmes d'election avec des questions a choix multiples et des explications detaillees.",
  },
  {
    title: "Simulateur",
    description: "Visualiser les algorithmes",
    href: "/simulateur",
    icon: CircleDot,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
    hoverDescription: "Visualisez en temps reel le fonctionnement des algorithmes de Chang-Roberts et Franklin sur un anneau de processus.",
  },
  {
    title: "Exercices",
    description: "5 exercices corriges",
    href: "/exercices",
    icon: FlaskConical,
    color: "text-green-500",
    bg: "bg-green-500/10",
    hoverDescription: "Pratiquez avec des exercices corriges couvrant tous les chapitres du cours avec indices progressifs.",
  },
]

const chapters = [
  { id: 1, title: "Introduction", progress: 100, topics: ["Systemes distribues", "Modeles"] },
  { id: 2, title: "Communication", progress: 75, topics: ["Messages", "Canaux"] },
  { id: 3, title: "Temps", progress: 50, topics: ["Horloges logiques", "Lamport"] },
  { id: 4, title: "Concurrence", progress: 25, topics: ["Exclusion mutuelle", "Deadlocks"] },
  { id: 5, title: "Election", progress: 0, topics: ["Le Lann", "Chang-Roberts", "Franklin"] },
]

const algorithms = [
  {
    name: "Le Lann",
    complexity: "O(n²)",
    type: "Unidirectionnel",
    description: "Algorithme simple ou chaque processus envoie son identite. Le plus grand ID gagne.",
    messages: "n² messages au pire cas"
  },
  {
    name: "Chang-Roberts",
    complexity: "O(n log n)",
    type: "Unidirectionnel",
    description: "Optimisation de Le Lann avec filtrage des messages. Seuls les plus grands IDs sont propages.",
    messages: "n log n messages en moyenne"
  },
  {
    name: "Franklin",
    complexity: "O(n log n)",
    type: "Bidirectionnel",
    description: "Communication bidirectionnelle avec comparaison des voisins. Elimination progressive des candidats.",
    messages: "2n log n messages"
  },
]

const recentActivity = [
  { action: "Quiz complete", time: "Il y a 2h", score: "7/8" },
  { action: "Chapitre 3 termine", time: "Hier", score: null },
  { action: "Exercice resolu", time: "Il y a 2 jours", score: "Correct" },
]

export default function Dashboard() {
  const totalProgress = Math.round(
    chapters.reduce((acc, ch) => acc + ch.progress, 0) / chapters.length
  )
  const completedChapters = chapters.filter(ch => ch.progress === 100).length
  const streak = 5 // jours consecutifs

  const handleStartLearning = () => {
    const nextChapter = chapters.find(ch => ch.progress < 100)
    if (nextChapter) {
      toast.success("C'est parti !", {
        description: `Redirection vers le Chapitre ${nextChapter.id}: ${nextChapter.title}`,
      })
    }
  }

  return (
    <TooltipProvider>
      <div className="p-6 space-y-6">
        {/* Welcome Alert */}
        <Alert className="border-primary/20 bg-primary/5">
          <Sparkles className="size-4 text-primary" />
          <AlertTitle className="text-primary">Bienvenue sur SAR Revisions</AlertTitle>
          <AlertDescription>
            Preparez votre examen de Systemes et Algorithmiques Repartis avec des quiz interactifs, des simulateurs visuels et des exercices corriges.
          </AlertDescription>
        </Alert>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <TrendingUp className="size-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{totalProgress}%</p>
                  <p className="text-xs text-muted-foreground">Progression</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-500/10">
                  <CheckCircle2 className="size-5 text-green-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{completedChapters}/5</p>
                  <p className="text-xs text-muted-foreground">Chapitres</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-orange-500/10">
                  <Flame className="size-5 text-orange-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{streak}</p>
                  <p className="text-xs text-muted-foreground">Jours d'affilee</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <Clock className="size-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">~5h</p>
                  <p className="text-xs text-muted-foreground">De contenu</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold">Acces rapide</h2>
            <Button variant="outline" size="sm" onClick={handleStartLearning}>
              <Play className="size-4 mr-2" />
              Continuer
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quickActions.map((action) => (
              <HoverCard key={action.title} openDelay={200}>
                <HoverCardTrigger asChild>
                  <Link href={action.href}>
                    <Card className="hover:bg-muted/50 hover:shadow-md transition-all cursor-pointer h-full group">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className={`p-2 rounded-lg ${action.bg} group-hover:scale-110 transition-transform`}>
                            <action.icon className={`size-5 ${action.color}`} />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium">{action.title}</h3>
                            <p className="text-sm text-muted-foreground">{action.description}</p>
                          </div>
                          <ArrowRight className="size-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </HoverCardTrigger>
                <HoverCardContent className="w-80" align="start">
                  <div className="flex gap-3">
                    <div className={`p-2 rounded-lg ${action.bg} h-fit`}>
                      <action.icon className={`size-5 ${action.color}`} />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-semibold">{action.title}</h4>
                      <p className="text-sm text-muted-foreground">{action.hoverDescription}</p>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chapters Progress */}
          <Card className="lg:col-span-2">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Progression des chapitres</CardTitle>
                <Link href="/cours">
                  <Button variant="ghost" size="sm">
                    Voir tout
                    <ArrowRight className="size-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {chapters.map((chapter) => (
                <Tooltip key={chapter.id}>
                  <TooltipTrigger asChild>
                    <Link
                      href={`/cours/chapitre-${chapter.id}`}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors group"
                    >
                      <div className={`flex items-center justify-center size-10 rounded-lg text-sm font-medium transition-colors ${
                        chapter.progress === 100
                          ? "bg-green-500/20 text-green-600"
                          : chapter.progress > 0
                            ? "bg-primary/20 text-primary"
                            : "bg-muted text-muted-foreground"
                      }`}>
                        {chapter.progress === 100 ? (
                          <CheckCircle2 className="size-5" />
                        ) : (
                          chapter.id
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium truncate">{chapter.title}</p>
                          {chapter.progress === 100 && (
                            <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                              Termine
                            </Badge>
                          )}
                        </div>
                        <Progress value={chapter.progress} className="h-1.5 mt-1.5" />
                      </div>
                      <span className="text-xs text-muted-foreground w-10 text-right font-medium">
                        {chapter.progress}%
                      </span>
                      <ArrowRight className="size-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p className="font-medium">Chapitre {chapter.id}: {chapter.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Sujets: {chapter.topics.join(", ")}
                    </p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Trophy className="size-4 text-yellow-500" />
                Activite recente
              </CardTitle>
              <CardDescription>Vos dernieres actions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="size-2 rounded-full bg-primary" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                  {activity.score && (
                    <Badge variant="outline" className="text-xs">
                      {activity.score}
                    </Badge>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Algorithms Reference */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base">Algorithmes d&apos;election</CardTitle>
                <CardDescription>Reference rapide des 3 algorithmes principaux</CardDescription>
              </div>
              <Link href="/simulateur">
                <Button size="sm">
                  <Play className="size-4 mr-2" />
                  Simuler
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {algorithms.map((algo) => (
                <HoverCard key={algo.name} openDelay={200}>
                  <HoverCardTrigger asChild>
                    <div className="flex flex-col gap-3 p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-help">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CircleDot className="size-4 text-primary" />
                          <p className="font-semibold text-sm">{algo.name}</p>
                        </div>
                        <Badge variant="secondary">
                          <Zap className="size-3 mr-1" />
                          {algo.complexity}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Info className="size-3" />
                        {algo.type}
                      </div>
                    </div>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <CircleDot className="size-4 text-primary" />
                        <h4 className="text-sm font-semibold">{algo.name}</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">{algo.description}</p>
                      <div className="flex items-center gap-2 pt-2 border-t">
                        <Badge variant="outline" className="text-xs">
                          {algo.messages}
                        </Badge>
                      </div>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  )
}
