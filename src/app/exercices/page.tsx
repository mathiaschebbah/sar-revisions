"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  CheckCircle2,
  XCircle,
  Lightbulb,
  BookOpen,
  Calculator,
  PenLine,
  ChevronRight,
  Eye,
  EyeOff,
  Trophy,
  Sparkles,
} from "lucide-react";

interface Exercise {
  id: number;
  title: string;
  chapter: string;
  difficulty: "facile" | "moyen" | "difficile";
  type: "calcul" | "comprehension" | "demonstration";
  statement: string;
  hints: string[];
  solution: string;
}

const exercises: Exercise[] = [
  {
    id: 1,
    title: "Complexite de Chang-Roberts",
    chapter: "Election",
    difficulty: "moyen",
    type: "calcul",
    statement: `Soit un anneau de n=8 sites avec les identites suivantes (dans le sens horaire): 5, 12, 3, 9, 1, 15, 7, 2.

Tous les sites sont initiateurs.

1. Deroulez l'algorithme de Chang-Roberts et comptez le nombre total de messages echanges.
2. Quel site est elu?
3. Comparez avec la complexite theorique au pire cas.`,
    hints: [
      "Dans Chang-Roberts, un message est detruit si l'identite recue est superieure au chef actuel du site receveur.",
      "Le site avec l'identite minimale sera elu car son message fera le tour complet.",
      "N'oubliez pas de compter les messages de confirmation apres l'election."
    ],
    solution: `**1. Deroulement de l'algorithme:**

Tour initial - Chaque site envoie sa candidature:
- Site 0 (id=5) envoie 5 vers Site 1
- Site 1 (id=12) envoie 12 vers Site 2
- Site 2 (id=3) envoie 3 vers Site 3
- Site 3 (id=9) envoie 9 vers Site 4
- Site 4 (id=1) envoie 1 vers Site 5
- Site 5 (id=15) envoie 15 vers Site 6
- Site 6 (id=7) envoie 7 vers Site 7
- Site 7 (id=2) envoie 2 vers Site 0

**Messages = 8**

Propagation:
- 5 arrive au Site 1 (chef=12): 5 < 12, transmis. Site 1 devient battu.
- 12 arrive au Site 2 (chef=3): 12 > 3, DETRUIT
- 3 arrive au Site 3 (chef=9): 3 < 9, transmis. Site 3 devient battu.
- 9 arrive au Site 4 (chef=1): 9 > 1, DETRUIT
- 1 arrive au Site 5 (chef=15): 1 < 15, transmis. Site 5 devient battu.
- 15 arrive au Site 6 (chef=7): 15 > 7, DETRUIT
- 7 arrive au Site 7 (chef=2): 7 > 2, DETRUIT
- 2 arrive au Site 0 (chef=5): 2 < 5, transmis. Site 0 devient battu.

**Messages supplementaires = 4**

Le message 1 continue sa propagation (car c'est le minimum) et fait le tour complet.
Messages pour que 1 fasse le tour: 8 messages (il traverse tous les sites)

**Message de confirmation: n = 8 messages**

**2. Site elu:** Site 4 (identite = 1, la plus petite)

**3. Comparaison:**
- Messages envoyes: environ 8 + 4 + 8 + 8 = 28 messages
- Pire cas theorique: O(n²) = 64 messages
- Cas moyen theorique: O(n log n) ≈ 8 * 3 = 24 messages

Le resultat est proche du cas moyen, ce qui est attendu pour une distribution aleatoire d'identites.`
  },
  {
    id: 2,
    title: "Algorithme de Franklin",
    chapter: "Election",
    difficulty: "moyen",
    type: "calcul",
    statement: `Soit un anneau bidirectionnel de 6 sites avec les identites: 8, 12, 1, 5, 6, 3 (dans l'ordre).

Deroulez l'algorithme de Franklin en indiquant:
1. Les candidats restants apres chaque tour
2. Le nombre total de tours necessaires
3. Le site elu et la complexite totale en messages.`,
    hints: [
      "Dans Franklin, un candidat survit s'il a l'identite minimale parmi lui et ses deux voisins candidats.",
      "A chaque tour, au moins la moitie des candidats sont elimines.",
      "Chaque candidat envoie 2 messages par tour (gauche et droite)."
    ],
    solution: `**Tour 1:** Tous candidats: {8, 12, 1, 5, 6, 3}
Messages: 6 candidats × 2 directions = 12 messages

Comparaisons (chaque candidat avec ses voisins):
- Site 0 (id=8): voisins 3 et 12 → min(8,3,12)=3 → 8 > 3, ELIMINE
- Site 1 (id=12): voisins 8 et 1 → min(12,8,1)=1 → 12 > 1, ELIMINE
- Site 2 (id=1): voisins 12 et 5 → min(1,12,5)=1 → SURVIT
- Site 3 (id=5): voisins 1 et 6 → min(5,1,6)=1 → 5 > 1, ELIMINE
- Site 4 (id=6): voisins 5 et 3 → min(6,5,3)=3 → 6 > 3, ELIMINE
- Site 5 (id=3): voisins 6 et 8 → min(3,6,8)=3 → SURVIT

**Candidats restants:** {1, 3} (Sites 2 et 5)

---

**Tour 2:** Candidats: {1, 3}
Messages: 2 candidats × 2 directions = 4 messages

Comparaisons:
- Site 2 (id=1): voisin candidat 3 → min(1,3)=1 → SURVIT
- Site 5 (id=3): voisin candidat 1 → min(3,1)=1 → 3 > 1, ELIMINE

**Candidats restants:** {1}

---

**Tour 3:** Un seul candidat restant
Le Site 2 (id=1) est **ELU**!

---

**Resume:**
1. **Candidats par tour:**
   - Tour 1: {8, 12, 1, 5, 6, 3} → {1, 3}
   - Tour 2: {1, 3} → {1}
   - Tour 3: Election de 1

2. **Nombre de tours:** 3 tours

3. **Complexite en messages:**
   - Tour 1: 12 messages
   - Tour 2: 4 messages
   - Total: 16 messages

   Theorique: O(n log n) = 6 × log₂(6) ≈ 6 × 2.58 ≈ 16 messages ✓`
  },
  {
    id: 3,
    title: "Horloges de Lamport",
    chapter: "Temps",
    difficulty: "facile",
    type: "calcul",
    statement: `Trois processus P1, P2, P3 executent les evenements suivants:

P1: e1 → e2 → e3 (envoi vers P2) → e4
P2: f1 (reception de e3) → f2 → f3 (envoi vers P3)
P3: g1 → g2 (reception de f3) → g3

Calculez les estampilles de Lamport de chaque evenement.`,
    hints: [
      "Regle 1: Entre deux evenements consecutifs d'un meme processus, l'horloge s'incremente de 1.",
      "Regle 2: A la reception d'un message, H = max(H_local, H_message) + 1",
      "Commencez par le processus qui n'a pas de reception en premier evenement."
    ],
    solution: `**Processus P1:**
- e1: H(e1) = 1
- e2: H(e2) = 2
- e3: H(e3) = 3 (envoi, le message porte l'estampille 3)
- e4: H(e4) = 4

**Processus P2:**
- f1: reception de e3 (estampille 3)
  H(f1) = max(0, 3) + 1 = 4
- f2: H(f2) = 5
- f3: H(f3) = 6 (envoi, le message porte l'estampille 6)

**Processus P3:**
- g1: H(g1) = 1
- g2: reception de f3 (estampille 6)
  H(g2) = max(1, 6) + 1 = 7
- g3: H(g3) = 8

**Resume des estampilles:**
| P1 | P2 | P3 |
|----|----|----|
| e1=1 | f1=4 | g1=1 |
| e2=2 | f2=5 | g2=7 |
| e3=3 | f3=6 | g3=8 |
| e4=4 |    |    |

**Verification de la causalite:**
- e3 → f1 ✓ (3 < 4)
- f3 → g2 ✓ (6 < 7)
- e1 < e2 < e3 < e4 ✓
- f1 < f2 < f3 ✓
- g1 < g2 < g3 ✓`
  },
  {
    id: 4,
    title: "Exclusion Mutuelle - Lamport",
    chapter: "Concurrence",
    difficulty: "difficile",
    type: "comprehension",
    statement: `Trois processus P1, P2, P3 veulent acceder a une section critique. Ils utilisent l'algorithme de Lamport pour l'exclusion mutuelle.

A l'instant t=0:
- P1 demande la SC (horloge = 1)
- P2 demande la SC (horloge = 1)
- P3 est inactif (horloge = 0)

Deroulez l'algorithme en montrant:
1. Les messages echanges
2. L'evolution des files d'attente
3. L'ordre d'acces a la section critique`,
    hints: [
      "Chaque requete est estampillee et envoyee a tous les autres processus.",
      "Un processus entre en SC quand sa requete est en tete de sa file ET il a recu un ACK de tous.",
      "En cas d'egalite d'estampille, l'identifiant du processus departage."
    ],
    solution: `**Phase 1: Envoi des requetes**

P1 envoie REQ(1, P1) a P2 et P3
P2 envoie REQ(1, P2) a P1 et P3

**Phase 2: Reception et ACK**

P1 recoit REQ(1, P2):
- File P1 = [(1,P1), (1,P2)]
- Envoie ACK(2) a P2
- H(P1) = 2

P2 recoit REQ(1, P1):
- File P2 = [(1,P1), (1,P2)]
- Envoie ACK(2) a P1
- H(P2) = 2

P3 recoit REQ(1, P1) et REQ(1, P2):
- File P3 = [(1,P1), (1,P2)]
- Envoie ACK(1) a P1 et ACK(1) a P2
- H(P3) = 1

**Phase 3: Acces a la SC**

P1 verifie:
- Sa requete (1, P1) est en tete? OUI (1,P1) < (1,P2) car P1 < P2
- A recu ACK de P2? OUI
- A recu ACK de P3? OUI
→ **P1 entre en SC**

P2 verifie:
- Sa requete (1, P2) est en tete? NON, (1,P1) est devant
→ P2 attend

**Phase 4: Liberation**

P1 termine et envoie REL(3) a P2 et P3

P2 et P3 retirent (1, P1) de leur file:
- File = [(1, P2)]

P2 verifie:
- Sa requete en tete? OUI
- ACKs recus? OUI
→ **P2 entre en SC**

**Ordre d'acces: P1 → P2**

**Complexite:** 2(n-1) messages par requete + n-1 pour la liberation = 3(n-1) = 6 messages par acces.`
  },
  {
    id: 5,
    title: "Comparaison Le Lann vs Chang-Roberts",
    chapter: "Election",
    difficulty: "facile",
    type: "comprehension",
    statement: `Expliquez pourquoi l'algorithme de Chang-Roberts a une meilleure complexite en moyenne que l'algorithme de Le Lann, alors que les deux utilisent un anneau unidirectionnel.

Donnez un exemple avec 4 sites pour illustrer la difference.`,
    hints: [
      "Le Lann transmet TOUS les messages, Chang-Roberts filtre.",
      "Dans Chang-Roberts, seuls les messages avec une identite inferieure au chef actuel sont transmis.",
      "Pensez au cas ou le site avec le minimum est proche du site avec le maximum."
    ],
    solution: `**Difference fondamentale:**

- **Le Lann:** Chaque message fait le tour COMPLET de l'anneau, quelle que soit son identite. Tous les initiateurs collectent toutes les identites.

- **Chang-Roberts:** Un message est DETRUIT des qu'il arrive a un site ayant une identite plus petite (un meilleur chef potentiel).

**Exemple avec 4 sites (identites: 3, 7, 1, 5):**

**Le Lann:**
Chaque identite fait le tour complet:
- 3 traverse 4 sites = 4 messages
- 7 traverse 4 sites = 4 messages
- 1 traverse 4 sites = 4 messages
- 5 traverse 4 sites = 4 messages

Total: 16 messages + 4 confirmations = **20 messages**

**Chang-Roberts:**
- 3 part du site 0 → site 1 (chef=7): 3<7, transmis → site 2 (chef=1): 3>1, DETRUIT
  Messages: 2
- 7 part du site 1 → site 2 (chef=1): 7>1, DETRUIT
  Messages: 1
- 1 part du site 2 → traverse TOUT l'anneau (c'est le minimum!)
  Messages: 4 (fait le tour)
- 5 part du site 3 → site 0 (chef=3): 5>3, DETRUIT
  Messages: 1

Total: 2+1+4+1 = 8 messages + 4 confirmations = **12 messages**

**Conclusion:**
- Le Lann: O(n²) car chaque message traverse n sites
- Chang-Roberts: O(n log n) en moyenne car les messages sont filtres progressivement

La difference vient du **filtrage**: dans Chang-Roberts, seul le message du minimum global traverse tout l'anneau.`
  },
];

const difficultyColors = {
  facile: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  moyen: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
  difficile: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
};

const typeIcons = {
  calcul: Calculator,
  comprehension: BookOpen,
  demonstration: PenLine,
};

export default function ExercicesPage() {
  const [selectedChapter, setSelectedChapter] = useState<string>("all");
  const [revealedSolutions, setRevealedSolutions] = useState<Set<number>>(new Set());
  const [revealedHints, setRevealedHints] = useState<Set<number>>(new Set());

  const chapters = ["all", ...new Set(exercises.map(e => e.chapter))];

  const filteredExercises = selectedChapter === "all"
    ? exercises
    : exercises.filter(e => e.chapter === selectedChapter);

  const toggleSolution = (id: number) => {
    const newSet = new Set(revealedSolutions);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setRevealedSolutions(newSet);
  };

  const toggleHints = (id: number) => {
    const newSet = new Set(revealedHints);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setRevealedHints(newSet);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Exercices Corriges</h1>
        <p className="text-muted-foreground">
          Entrainez-vous avec des exercices types examen sur les systemes repartis
        </p>
      </div>

      {/* Filters */}
      <div className="mb-6">
        <Tabs value={selectedChapter} onValueChange={setSelectedChapter}>
          <TabsList>
            <TabsTrigger value="all">Tous</TabsTrigger>
            <TabsTrigger value="Election">Election</TabsTrigger>
            <TabsTrigger value="Temps">Temps</TabsTrigger>
            <TabsTrigger value="Concurrence">Concurrence</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-3xl font-bold text-primary">{exercises.length}</div>
            <div className="text-sm text-muted-foreground">Exercices</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-3xl font-bold text-green-600">
              {exercises.filter(e => e.difficulty === "facile").length}
            </div>
            <div className="text-sm text-muted-foreground">Faciles</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-3xl font-bold text-red-600">
              {exercises.filter(e => e.difficulty === "difficile").length}
            </div>
            <div className="text-sm text-muted-foreground">Difficiles</div>
          </CardContent>
        </Card>
      </div>

      {/* Exercises List */}
      <div className="space-y-6">
        {filteredExercises.map((exercise) => {
          const TypeIcon = typeIcons[exercise.type];
          const isSolutionRevealed = revealedSolutions.has(exercise.id);
          const isHintsRevealed = revealedHints.has(exercise.id);

          return (
            <Card key={exercise.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <TypeIcon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">
                        Exercice {exercise.id}: {exercise.title}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-1">
                        <Badge variant="outline">{exercise.chapter}</Badge>
                        <Badge className={difficultyColors[exercise.difficulty]}>
                          {exercise.difficulty}
                        </Badge>
                      </CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Statement */}
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    Enonce
                  </h4>
                  <div className="text-sm whitespace-pre-line">
                    {exercise.statement}
                  </div>
                </div>

                {/* Hints */}
                <div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            toggleHints(exercise.id);
                            if (!isHintsRevealed) {
                              toast.info("Indices reveles", {
                                description: `${exercise.hints.length} indices disponibles`,
                                icon: <Lightbulb className="h-4 w-4" />,
                              });
                            }
                          }}
                          className="mb-2"
                        >
                          <Lightbulb className="h-4 w-4 mr-2" />
                          {isHintsRevealed ? "Masquer les indices" : "Voir les indices"}
                          <Badge variant="secondary" className="ml-2 text-xs">
                            {exercise.hints.length}
                          </Badge>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Afficher des indices pour vous aider</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  {isHintsRevealed && (
                    <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg dark:bg-yellow-950/30 dark:border-yellow-800">
                      <ul className="space-y-2">
                        {exercise.hints.map((hint, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <ChevronRight className="h-4 w-4 text-yellow-600 dark:text-yellow-400 shrink-0 mt-0.5" />
                            <span>{hint}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Solution */}
                <div>
                  <Button
                    variant={isSolutionRevealed ? "default" : "outline"}
                    onClick={() => {
                      toggleSolution(exercise.id);
                      if (!isSolutionRevealed) {
                        toast.success("Solution revelee", {
                          description: "N'oubliez pas de comprendre chaque etape !",
                          icon: <Sparkles className="h-4 w-4" />,
                        });
                      }
                    }}
                  >
                    {isSolutionRevealed ? (
                      <>
                        <EyeOff className="h-4 w-4 mr-2" />
                        Masquer la solution
                      </>
                    ) : (
                      <>
                        <Eye className="h-4 w-4 mr-2" />
                        Voir la solution
                      </>
                    )}
                  </Button>
                  {isSolutionRevealed && (
                    <div className="mt-4 bg-green-50 border border-green-200 p-4 rounded-lg dark:bg-green-950/30 dark:border-green-800">
                      <h4 className="font-semibold mb-3 flex items-center gap-2 text-green-800 dark:text-green-300">
                        <CheckCircle2 className="h-5 w-5" />
                        Solution
                      </h4>
                      <ScrollArea className="max-h-[500px]">
                        <div className="text-sm whitespace-pre-line prose prose-sm max-w-none dark:prose-invert">
                          {exercise.solution}
                        </div>
                      </ScrollArea>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
