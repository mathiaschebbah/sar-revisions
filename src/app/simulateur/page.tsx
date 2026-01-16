"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Play,
  Pause,
  RotateCcw,
  StepForward,
  Settings,
  Info,
  Crown,
  ArrowRight,
  X,
  Shuffle
} from "lucide-react";

interface Node {
  id: number;
  identity: number;
  state: "candidate" | "battu" | "elu" | "attente";
  chef: number;
  messages: Message[];
}

interface Message {
  from: number;
  value: number;
  type: "candidature" | "elu" | "tour_gauche" | "tour_droite";
  destroyed?: boolean;
}

interface LogEntry {
  step: number;
  description: string;
  type: "send" | "receive" | "destroy" | "elect" | "info";
}

const defaultIdentities = [8, 3, 12, 1, 5, 9];

export default function SimulateurPage() {
  const [algorithm, setAlgorithm] = useState<"chang-roberts" | "franklin">("chang-roberts");
  const [nodeCount, setNodeCount] = useState(6);
  const [identities, setIdentities] = useState<number[]>(defaultIdentities);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [step, setStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [log, setLog] = useState<LogEntry[]>([]);
  const [messagesInTransit, setMessagesInTransit] = useState<{from: number, to: number, value: number, destroyed?: boolean}[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [electedNode, setElectedNode] = useState<number | null>(null);

  const initializeSimulation = useCallback(() => {
    const newNodes: Node[] = identities.slice(0, nodeCount).map((identity, index) => ({
      id: index,
      identity,
      state: "candidate",
      chef: identity,
      messages: [],
    }));
    setNodes(newNodes);
    setStep(0);
    setLog([{ step: 0, description: "Simulation initialisee. Tous les sites sont candidats.", type: "info" }]);
    setMessagesInTransit([]);
    setIsInitialized(true);
    setElectedNode(null);
    setIsRunning(false);
  }, [identities, nodeCount]);

  const shuffleIdentities = () => {
    const shuffled = [...identities].sort(() => Math.random() - 0.5);
    setIdentities(shuffled);
    setIsInitialized(false);
  };

  const randomizeIdentities = () => {
    const newIds: number[] = [];
    while (newIds.length < nodeCount) {
      const num = Math.floor(Math.random() * 20) + 1;
      if (!newIds.includes(num)) newIds.push(num);
    }
    setIdentities(newIds);
    setIsInitialized(false);
  };

  const executeChangRobertsStep = () => {
    if (electedNode !== null) return;

    const newNodes = [...nodes];
    const newLog = [...log];
    const newMessages: {from: number, to: number, value: number, destroyed?: boolean}[] = [];
    const currentStep = step + 1;

    if (step === 0) {
      // Phase initiale: tous les candidats envoient leur identite
      newNodes.forEach((node, i) => {
        const nextNode = (i + 1) % nodeCount;
        newMessages.push({ from: i, to: nextNode, value: node.identity });
        newLog.push({
          step: currentStep,
          description: `Site ${i} (id=${node.identity}) envoie sa candidature au site ${nextNode}`,
          type: "send"
        });
      });
    } else {
      // Traitement des messages en transit
      messagesInTransit.forEach(msg => {
        const receivingNode = newNodes[msg.to];
        const k = msg.value;

        if (k === receivingNode.identity) {
          // Le message a fait le tour - ce site est elu
          receivingNode.state = "elu";
          setElectedNode(msg.to);
          newLog.push({
            step: currentStep,
            description: `Site ${msg.to} recoit sa propre identite ${k} - IL EST ELU!`,
            type: "elect"
          });
          // Envoyer message d'election
          const nextNode = (msg.to + 1) % nodeCount;
          newMessages.push({ from: msg.to, to: nextNode, value: k });
        } else if (k < receivingNode.chef) {
          // k < chef_i : transmettre et mettre a jour chef
          receivingNode.chef = k;
          if (receivingNode.state === "candidate") {
            receivingNode.state = "battu";
          }
          const nextNode = (msg.to + 1) % nodeCount;
          newMessages.push({ from: msg.to, to: nextNode, value: k });
          newLog.push({
            step: currentStep,
            description: `Site ${msg.to} recoit ${k} < chef=${receivingNode.identity}. Transmet et devient battu.`,
            type: "receive"
          });
        } else {
          // k > chef_i : detruire le message
          newLog.push({
            step: currentStep,
            description: `Site ${msg.to} recoit ${k} > chef=${receivingNode.chef}. Message DETRUIT.`,
            type: "destroy"
          });
          newMessages.push({ ...msg, destroyed: true });
        }
      });
    }

    setNodes(newNodes);
    setMessagesInTransit(newMessages.filter(m => !m.destroyed));
    setLog(newLog);
    setStep(currentStep);
  };

  const executeFranklinStep = () => {
    if (electedNode !== null) return;

    const newNodes = [...nodes];
    const newLog = [...log];
    const newMessages: {from: number, to: number, value: number, destroyed?: boolean}[] = [];
    const currentStep = step + 1;

    const activeCandidates = newNodes.filter(n => n.state === "candidate");

    if (activeCandidates.length === 1) {
      activeCandidates[0].state = "elu";
      setElectedNode(activeCandidates[0].id);
      newLog.push({
        step: currentStep,
        description: `Site ${activeCandidates[0].id} (id=${activeCandidates[0].identity}) est le seul candidat restant - IL EST ELU!`,
        type: "elect"
      });
      setNodes(newNodes);
      setLog(newLog);
      setStep(currentStep);
      return;
    }

    if (step === 0) {
      // Tour initial: chaque candidat envoie dans les deux directions
      newNodes.forEach((node, i) => {
        if (node.state === "candidate") {
          const leftNode = (i - 1 + nodeCount) % nodeCount;
          const rightNode = (i + 1) % nodeCount;
          newMessages.push({ from: i, to: leftNode, value: node.identity });
          newMessages.push({ from: i, to: rightNode, value: node.identity });
          newLog.push({
            step: currentStep,
            description: `Site ${i} (id=${node.identity}) envoie dans les deux directions`,
            type: "send"
          });
        }
      });
    } else {
      // Simuler la reception des messages des voisins
      // Chaque candidat compare son id avec ceux de ses voisins
      const toEliminate: number[] = [];

      newNodes.forEach((node, i) => {
        if (node.state === "candidate") {
          const leftNeighbor = newNodes[(i - 1 + nodeCount) % nodeCount];
          const rightNeighbor = newNodes[(i + 1) % nodeCount];

          // Un candidat survit s'il a l'id minimum parmi lui et ses voisins candidats
          const competingIds = [node.identity];
          if (leftNeighbor.state === "candidate") competingIds.push(leftNeighbor.identity);
          if (rightNeighbor.state === "candidate") competingIds.push(rightNeighbor.identity);

          const minId = Math.min(...competingIds);

          if (node.identity !== minId) {
            toEliminate.push(i);
            newLog.push({
              step: currentStep,
              description: `Site ${i} (id=${node.identity}) est elimine (voisins: ${competingIds.filter(id => id !== node.identity).join(", ")})`,
              type: "destroy"
            });
          } else {
            newLog.push({
              step: currentStep,
              description: `Site ${i} (id=${node.identity}) survit ce tour (minimum local)`,
              type: "receive"
            });
          }
        }
      });

      toEliminate.forEach(i => {
        newNodes[i].state = "battu";
      });

      // Les candidats restants envoient pour le tour suivant
      newNodes.forEach((node, i) => {
        if (node.state === "candidate") {
          const leftNode = (i - 1 + nodeCount) % nodeCount;
          const rightNode = (i + 1) % nodeCount;
          newMessages.push({ from: i, to: leftNode, value: node.identity });
          newMessages.push({ from: i, to: rightNode, value: node.identity });
        }
      });
    }

    setNodes(newNodes);
    setMessagesInTransit(newMessages);
    setLog(newLog);
    setStep(currentStep);
  };

  const executeStep = () => {
    if (algorithm === "chang-roberts") {
      executeChangRobertsStep();
    } else {
      executeFranklinStep();
    }
  };

  const reset = () => {
    initializeSimulation();
  };

  // Calculate node positions in a circle
  const getNodePosition = (index: number, total: number) => {
    const angle = (index * 2 * Math.PI) / total - Math.PI / 2;
    const radius = 120;
    return {
      x: 150 + radius * Math.cos(angle),
      y: 150 + radius * Math.sin(angle),
    };
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Simulateur d&apos;Election</h1>
        <p className="text-muted-foreground">
          Visualisez les algorithmes d&apos;election sur un anneau en temps reel
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Configuration Panel */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Algorithme</label>
              <Tabs value={algorithm} onValueChange={(v) => { setAlgorithm(v as typeof algorithm); setIsInitialized(false); }}>
                <TabsList className="w-full">
                  <TabsTrigger value="chang-roberts" className="flex-1 text-xs">Chang-Roberts</TabsTrigger>
                  <TabsTrigger value="franklin" className="flex-1 text-xs">Franklin</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Nombre de sites: {nodeCount}</label>
              <input
                type="range"
                min={3}
                max={8}
                value={nodeCount}
                onChange={(e) => { setNodeCount(parseInt(e.target.value)); setIsInitialized(false); }}
                className="w-full"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Identites des sites</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {identities.slice(0, nodeCount).map((id, i) => (
                  <Badge key={i} variant="outline">
                    S{i}: {id}
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={shuffleIdentities}>
                  <Shuffle className="h-4 w-4 mr-1" />
                  Melanger
                </Button>
                <Button size="sm" variant="outline" onClick={randomizeIdentities}>
                  Aleatoire
                </Button>
              </div>
            </div>

            <Separator />

            <div className="flex flex-col gap-2">
              <Button onClick={initializeSimulation} disabled={isRunning}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Initialiser
              </Button>
              <div className="flex gap-2">
                <Button
                  onClick={executeStep}
                  disabled={!isInitialized || electedNode !== null}
                  className="flex-1"
                >
                  <StepForward className="h-4 w-4 mr-2" />
                  Etape
                </Button>
                <Button
                  onClick={reset}
                  variant="outline"
                  disabled={!isInitialized}
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Algorithm Info */}
            <div className="p-3 bg-muted rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Info className="h-4 w-4 text-primary" />
                <span className="font-medium text-sm">
                  {algorithm === "chang-roberts" ? "Chang-Roberts" : "Franklin"}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                {algorithm === "chang-roberts"
                  ? "Anneau unidirectionnel. Les messages des candidats plus faibles sont detruits. Complexite: O(n log n) en moyenne."
                  : "Anneau bidirectionnel. Tournoi par elimination - les candidats envoient dans les deux directions. Complexite: O(n log n)."}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Visualization */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Visualisation de l&apos;anneau</CardTitle>
            <CardDescription>
              Etape {step} {electedNode !== null && "- Election terminee!"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative w-full aspect-square max-w-[400px] mx-auto">
              <svg viewBox="0 0 300 300" className="w-full h-full">
                {/* Draw ring connections */}
                {nodes.map((_, i) => {
                  const from = getNodePosition(i, nodeCount);
                  const to = getNodePosition((i + 1) % nodeCount, nodeCount);
                  return (
                    <line
                      key={`line-${i}`}
                      x1={from.x}
                      y1={from.y}
                      x2={to.x}
                      y2={to.y}
                      stroke="#e5e7eb"
                      strokeWidth="2"
                    />
                  );
                })}

                {/* Draw arrows for messages in transit */}
                {messagesInTransit.map((msg, i) => {
                  const from = getNodePosition(msg.from, nodeCount);
                  const to = getNodePosition(msg.to, nodeCount);
                  const midX = (from.x + to.x) / 2;
                  const midY = (from.y + to.y) / 2;
                  return (
                    <g key={`msg-${i}`}>
                      <circle
                        cx={midX}
                        cy={midY}
                        r="12"
                        fill={msg.destroyed ? "#ef4444" : "#3b82f6"}
                        className="animate-pulse"
                      />
                      <text
                        x={midX}
                        y={midY + 4}
                        textAnchor="middle"
                        fill="white"
                        fontSize="10"
                        fontWeight="bold"
                      >
                        {msg.value}
                      </text>
                    </g>
                  );
                })}

                {/* Draw nodes */}
                {nodes.map((node, i) => {
                  const pos = getNodePosition(i, nodeCount);
                  const isElected = node.state === "elu";
                  const isBattu = node.state === "battu";

                  return (
                    <g key={`node-${i}`}>
                      <circle
                        cx={pos.x}
                        cy={pos.y}
                        r="28"
                        fill={isElected ? "#22c55e" : isBattu ? "#9ca3af" : "#3b82f6"}
                        stroke={isElected ? "#16a34a" : isBattu ? "#6b7280" : "#2563eb"}
                        strokeWidth="3"
                      />
                      {isElected && (
                        <g transform={`translate(${pos.x - 8}, ${pos.y - 35})`}>
                          <Crown className="h-4 w-4 text-yellow-500" fill="#eab308" />
                        </g>
                      )}
                      <text
                        x={pos.x}
                        y={pos.y - 5}
                        textAnchor="middle"
                        fill="white"
                        fontSize="10"
                        fontWeight="bold"
                      >
                        S{i}
                      </text>
                      <text
                        x={pos.x}
                        y={pos.y + 8}
                        textAnchor="middle"
                        fill="white"
                        fontSize="14"
                        fontWeight="bold"
                      >
                        {node.identity}
                      </text>
                    </g>
                  );
                })}

                {/* Direction indicator for Chang-Roberts */}
                {algorithm === "chang-roberts" && isInitialized && (
                  <g transform="translate(150, 150)">
                    <text
                      textAnchor="middle"
                      fill="#6b7280"
                      fontSize="10"
                    >
                      Sens horaire
                    </text>
                    <path
                      d="M -20 10 A 25 25 0 0 1 20 10"
                      fill="none"
                      stroke="#6b7280"
                      strokeWidth="1.5"
                      markerEnd="url(#arrow)"
                    />
                    <defs>
                      <marker
                        id="arrow"
                        viewBox="0 0 10 10"
                        refX="9"
                        refY="5"
                        markerWidth="6"
                        markerHeight="6"
                        orient="auto"
                      >
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="#6b7280" />
                      </marker>
                    </defs>
                  </g>
                )}

                {/* Bidirectional indicator for Franklin */}
                {algorithm === "franklin" && isInitialized && (
                  <g transform="translate(150, 150)">
                    <text
                      textAnchor="middle"
                      fill="#6b7280"
                      fontSize="10"
                    >
                      Bidirectionnel
                    </text>
                  </g>
                )}
              </svg>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-blue-500" />
                <span className="text-sm">Candidat</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-gray-400" />
                <span className="text-sm">Battu</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-green-500" />
                <span className="text-sm">Elu</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse" />
                <span className="text-sm">Message</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Log Panel */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Journal d&apos;execution</CardTitle>
            <CardDescription>
              Historique detaille des operations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-48 overflow-y-auto border rounded-lg p-3 bg-muted/30 font-mono text-sm space-y-1">
              {log.length === 0 ? (
                <p className="text-muted-foreground">Initialisez la simulation pour commencer...</p>
              ) : (
                log.map((entry, i) => (
                  <div
                    key={i}
                    className={`flex items-start gap-2 ${
                      entry.type === "elect" ? "text-green-600 font-bold" :
                      entry.type === "destroy" ? "text-red-500" :
                      entry.type === "send" ? "text-blue-600" :
                      "text-foreground"
                    }`}
                  >
                    <Badge variant="outline" className="text-xs shrink-0">
                      {entry.step}
                    </Badge>
                    {entry.type === "elect" && <Crown className="h-4 w-4 shrink-0" />}
                    {entry.type === "destroy" && <X className="h-4 w-4 shrink-0" />}
                    {entry.type === "send" && <ArrowRight className="h-4 w-4 shrink-0" />}
                    <span>{entry.description}</span>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
