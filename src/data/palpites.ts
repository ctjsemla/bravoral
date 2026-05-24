export type PalpiteOutcome = "1" | "X" | "2";

export type Palpite = {
  id: string;
  matchLabel: string;
  league: string;
  kickoff: string;
  tipster: string;
  pick: PalpiteOutcome;
  rationale: string;
  suggestedOdd: number;
  bookmakerId: string;
};

export const PALPITE_LABEL: Record<PalpiteOutcome, string> = {
  "1": "Vitória mandante",
  X: "Empate",
  "2": "Vitória visitante",
};

export const PALPITES: Palpite[] = [
  {
    id: "p1",
    matchLabel: "Flamengo v Palmeiras",
    league: "Brasileirão Série A",
    kickoff: "Hoje · 16:00 BRT",
    tipster: "Ana Costa",
    pick: "1",
    rationale:
      "Mengão invicto em casa nas últimas 5 rodadas; Palmeiras com desfalques na zaga.",
    suggestedOdd: 2.1,
    bookmakerId: "betano",
  },
  {
    id: "p2",
    matchLabel: "Corinthians v São Paulo",
    league: "Brasileirão Série A",
    kickoff: "Amanhã · 19:30 BRT",
    tipster: "Rafael Mendes",
    pick: "X",
    rationale: "Clássico equilibrado; ambos marcam pouco fora de casa neste ano.",
    suggestedOdd: 3.25,
    bookmakerId: "bet365",
  },
  {
    id: "p3",
    matchLabel: "Grêmio v Internacional",
    league: "Brasileirão Série A",
    kickoff: "Domingo · 18:30 BRT",
    tipster: "BrasilOdds",
    pick: "2",
    rationale: "Colorado com melhor xG nas últimas 4 partidas do Gauchão.",
    suggestedOdd: 2.75,
    bookmakerId: "superbet",
  },
  {
    id: "p4",
    matchLabel: "Atlético-MG v Cruzeiro",
    league: "Brasileirão Série A",
    kickoff: "Domingo · 20:00 BRT",
    tipster: "Marina Duarte",
    pick: "1",
    rationale: "Galo pressiona bem no Horto; Raposa cede muitos chutes de fora da área.",
    suggestedOdd: 1.95,
    bookmakerId: "sportingbet",
  },
  {
    id: "p5",
    matchLabel: "Arsenal v Chelsea",
    league: "Premier League",
    kickoff: "Sábado · 13:30 BRT",
    tipster: "Lucas Ferreira",
    pick: "1",
    rationale: "Gunners líderes em finalizações no Box; Chelsea irregular como visitante.",
    suggestedOdd: 2.05,
    bookmakerId: "kto",
  },
  {
    id: "p6",
    matchLabel: "Real Madrid v Barcelona",
    league: "La Liga",
    kickoff: "Domingo · 17:15 BRT",
    tipster: "BrasilOdds",
    pick: "X",
    rationale: "El Clásico tende a equilibrar; ambos com defesas sólidas no mês.",
    suggestedOdd: 3.6,
    bookmakerId: "pixbet",
  },
];
