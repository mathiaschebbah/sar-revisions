"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  Trophy,
  Brain
} from "lucide-react";

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  chapter: string;
}

const questions: Question[] = [
  {
    id: 1,
    question: "Quelle est la complexite en moyenne de l'algorithme de Chang et Roberts ?",
    options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"],
    correct: 1,
    explanation: "En moyenne, Chang et Roberts a une complexite de O(n log n) grace au filtrage des messages. Les messages des candidats 'plus faibles' sont detruits, ce qui reduit le nombre total de messages.",
    chapter: "Election",
  },
  {
    id: 2,
    question: "Dans l'algorithme de Franklin, combien de directions un site utilise-t-il pour envoyer ses messages ?",
    options: ["1 (unidirectionnel)", "2 (bidirectionnel)", "Depend du nombre de voisins", "0 au debut"],
    correct: 1,
    explanation: "Franklin fonctionne sur un anneau bidirectionnel. Chaque candidat envoie son identite dans les deux directions (gauche et droite) a chaque tour.",
    chapter: "Election",
  },
  {
    id: 3,
    question: "Qu'est-ce que la variable 'concav_i' dans l'algorithme de Franklin ?",
    options: [
      "L'identite du site concurrent",
      "Le message du tour courant",
      "Un message recu en avance (du tour suivant)",
      "Le chef provisoire"
    ],
    correct: 2,
    explanation: "concav_i stocke l'identite d'un message recu 'en avance', c'est-a-dire un message du tour suivant recu alors que le site n'a pas encore termine le tour courant. Cela gere l'asynchronisme du reseau.",
    chapter: "Election",
  },
  {
    id: 4,
    question: "Dans Chang et Roberts, que se passe-t-il quand un site recoit une requete avec une identite superieure a son chef actuel ?",
    options: [
      "Il transmet la requete",
      "Il detruit la requete",
      "Il envoie une confirmation",
      "Il devient candidat"
    ],
    correct: 1,
    explanation: "Dans Chang et Roberts, si k > chef_i, le message est detruit (pas de transmission). C'est ce filtrage qui permet d'avoir une complexite moyenne meilleure que Le Lann.",
    chapter: "Election",
  },
  {
    id: 5,
    question: "Quelle est la condition pour qu'un site soit elu dans Chang et Roberts ?",
    options: [
      "Il a la plus grande identite",
      "Il recoit sa propre requete (message fait le tour complet)",
      "Il recoit un message de confirmation",
      "Tous les autres sites ont abandonne"
    ],
    correct: 1,
    explanation: "Un site est elu quand il recoit sa propre requete (i == k). Cela signifie que son message a fait le tour complet de l'anneau sans etre detruit, donc il a la plus petite identite.",
    chapter: "Election",
  },
  {
    id: 6,
    question: "Pourquoi Franklin a une complexite O(n log n) au pire cas ?",
    options: [
      "Parce qu'il utilise un tri",
      "Parce qu'a chaque tour, au moins la moitie des candidats sont elimines",
      "Parce que les messages sont comprimes",
      "Parce qu'il utilise un arbre binaire"
    ],
    correct: 1,
    explanation: "A chaque tour, parmi 3 candidats voisins consecutifs, au maximum 1 survit (le minimum). Donc le nombre de candidats est divise par au moins 2 a chaque tour, donnant O(log n) tours avec O(n) messages par tour.",
    chapter: "Election",
  },
  {
    id: 7,
    question: "Dans Le Lann, comment un initiateur sait-il qu'il connait tous les autres initiateurs ?",
    options: [
      "Quand il a recu n messages",
      "Quand il recoit sa propre identite",
      "Quand un timer expire",
      "Quand il recoit un message de confirmation"
    ],
    correct: 1,
    explanation: "Dans Le Lann, quand un initiateur recoit sa propre identite, il sait que son jeton a fait le tour complet. Il a donc recu les identites de tous les autres initiateurs dans sa liste.",
    chapter: "Election",
  },
  {
    id: 8,
    question: "Quelle est la difference principale entre Le Lann et Chang-Roberts ?",
    options: [
      "Le Lann est bidirectionnel",
      "Chang-Roberts filtre/detruit les messages des candidats plus faibles",
      "Le Lann utilise des confirmations",
      "Chang-Roberts est plus lent"
    ],
    correct: 1,
    explanation: "La difference cle est que Chang-Roberts detruit les messages des candidats avec une identite superieure au chef actuel. Le Lann transmet tous les messages, ce qui donne O(n²) en moyenne contre O(n log n) pour Chang-Roberts.",
    chapter: "Election",
  },
];

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState<boolean[]>(new Array(questions.length).fill(false));
  const [finished, setFinished] = useState(false);

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswer = (index: number) => {
    if (showExplanation) return;

    setSelectedAnswer(index);
    setShowExplanation(true);

    const newAnswered = [...answered];
    newAnswered[currentQuestion] = true;
    setAnswered(newAnswered);

    if (index === question.correct) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setFinished(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setAnswered(new Array(questions.length).fill(false));
    setFinished(false);
  };

  if (finished) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Card className="text-center">
          <CardHeader>
            <div className="mx-auto mb-4">
              {percentage >= 70 ? (
                <Trophy className="h-16 w-16 text-yellow-500" />
              ) : (
                <Brain className="h-16 w-16 text-primary" />
              )}
            </div>
            <CardTitle className="text-2xl">Quiz termine !</CardTitle>
            <CardDescription>Voici vos resultats</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-5xl font-bold text-primary">
              {score}/{questions.length}
            </div>
            <div className="text-xl text-muted-foreground">
              {percentage}% de bonnes reponses
            </div>
            <Progress value={percentage} className="h-3" />
            <div className="text-sm text-muted-foreground">
              {percentage >= 70
                ? "Excellent ! Vous maitrisez bien les algorithmes d'election."
                : percentage >= 50
                  ? "Pas mal ! Revoyez les points ou vous avez fait des erreurs."
                  : "Continuez a reviser, vous pouvez y arriver !"}
            </div>
          </CardContent>
          <CardFooter className="justify-center gap-4">
            <Button onClick={resetQuiz} variant="outline">
              <RotateCcw className="h-4 w-4 mr-2" />
              Recommencer
            </Button>
            <Button asChild>
              <a href="/cours/chapitre-5">
                Revoir le cours
              </a>
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      {/* Progress Header */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <Badge variant="outline">{question.chapter}</Badge>
          <span className="text-sm text-muted-foreground">
            Question {currentQuestion + 1}/{questions.length}
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Question Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl leading-relaxed">
            {question.question}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrect = index === question.correct;
            const showResult = showExplanation;

            let className = "w-full p-4 text-left border rounded-lg transition-all ";

            if (showResult) {
              if (isCorrect) {
                className += "border-green-500 bg-green-50 text-green-900";
              } else if (isSelected && !isCorrect) {
                className += "border-red-500 bg-red-50 text-red-900";
              } else {
                className += "border-muted bg-muted/50 text-muted-foreground";
              }
            } else {
              className += isSelected
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary hover:bg-muted/50";
            }

            return (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={showExplanation}
                className={className}
              >
                <div className="flex items-center gap-3">
                  <div className={`h-6 w-6 rounded-full border-2 flex items-center justify-center text-sm font-medium ${
                    showResult && isCorrect
                      ? "border-green-500 bg-green-500 text-white"
                      : showResult && isSelected && !isCorrect
                        ? "border-red-500 bg-red-500 text-white"
                        : isSelected
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-muted-foreground"
                  }`}>
                    {showResult ? (
                      isCorrect ? (
                        <CheckCircle2 className="h-4 w-4" />
                      ) : isSelected ? (
                        <XCircle className="h-4 w-4" />
                      ) : (
                        String.fromCharCode(65 + index)
                      )
                    ) : (
                      String.fromCharCode(65 + index)
                    )}
                  </div>
                  <span>{option}</span>
                </div>
              </button>
            );
          })}
        </CardContent>

        {/* Explanation */}
        {showExplanation && (
          <CardContent className="pt-0">
            <div className={`p-4 rounded-lg ${
              selectedAnswer === question.correct
                ? "bg-green-50 border border-green-200"
                : "bg-amber-50 border border-amber-200"
            }`}>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                {selectedAnswer === question.correct ? (
                  <>
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <span className="text-green-800">Correct !</span>
                  </>
                ) : (
                  <>
                    <XCircle className="h-5 w-5 text-amber-600" />
                    <span className="text-amber-800">Pas tout a fait...</span>
                  </>
                )}
              </h4>
              <p className="text-sm text-muted-foreground">
                {question.explanation}
              </p>
            </div>
          </CardContent>
        )}

        <CardFooter className="justify-between">
          <div className="text-sm text-muted-foreground">
            Score: {score}/{answered.filter(Boolean).length}
          </div>
          {showExplanation && (
            <Button onClick={nextQuestion}>
              {currentQuestion < questions.length - 1 ? (
                <>
                  Question suivante
                  <ArrowRight className="h-4 w-4 ml-2" />
                </>
              ) : (
                "Voir les resultats"
              )}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
