export type BonusType = "aposta-gratis" | "deposito" | "cashback";

export type BonusOffer = {
  id: string;
  bookmakerId: string;
  type: BonusType;
  headline: string;
  amount: string;
  minDeposit: string;
  wagering: string;
  validFor: string;
  code?: string;
  featured?: boolean;
  newCustomersOnly: boolean;
};

export const BONUS_OFFERS: BonusOffer[] = [
  {
    id: "betano-1",
    bookmakerId: "betano",
    type: "aposta-gratis",
    headline: "Aposta grátis para novos clientes",
    amount: "R$40",
    minDeposit: "R$10",
    wagering: "1x no mercado elegível",
    validFor: "Futebol · 7 dias",
    code: "BRASIL40",
    featured: true,
    newCustomersOnly: true,
  },
  {
    id: "bet365-1",
    bookmakerId: "bet365",
    type: "aposta-gratis",
    headline: "Créditos de aposta na primeira aposta",
    amount: "R$30",
    minDeposit: "R$5",
    wagering: "Aposta qualificada perdida ou ganha",
    validFor: "Qualquer esporte · 30 dias",
    newCustomersOnly: true,
  },
  {
    id: "superbet-1",
    bookmakerId: "superbet",
    type: "deposito",
    headline: "Bônus de boas-vindas no depósito",
    amount: "R$50",
    minDeposit: "R$20",
    wagering: "5x rollover em odds 1.50+",
    validFor: "Futebol brasileiro",
    featured: true,
    newCustomersOnly: true,
  },
  {
    id: "sportingbet-1",
    bookmakerId: "sportingbet",
    type: "aposta-gratis",
    headline: "Free bet no cadastro",
    amount: "R$30",
    minDeposit: "R$15",
    wagering: "1x em resultado final",
    validFor: "Série A e Copa do Brasil",
    newCustomersOnly: true,
  },
  {
    id: "pixbet-1",
    bookmakerId: "pixbet",
    type: "aposta-gratis",
    headline: "Aposta sem risco até",
    amount: "R$25",
    minDeposit: "R$10",
    wagering: "Devolução em free bet se perder",
    validFor: "7 dias após ativação",
    newCustomersOnly: true,
  },
  {
    id: "kto-1",
    bookmakerId: "kto",
    type: "deposito",
    headline: "100% no primeiro depósito",
    amount: "R$35",
    minDeposit: "R$20",
    wagering: "6x em múltiplas ou simples",
    validFor: "Máx. R$35 de bônus",
    newCustomersOnly: true,
  },
  {
    id: "estrela-1",
    bookmakerId: "estrela",
    type: "aposta-gratis",
    headline: "Aposta grátis Estrela Bet",
    amount: "R$30",
    minDeposit: "R$10",
    wagering: "1x odds mín. 2.00",
    validFor: "Futebol · 14 dias",
    newCustomersOnly: true,
  },
  {
    id: "betfair-1",
    bookmakerId: "betfair",
    type: "cashback",
    headline: "Cashback na exchange",
    amount: "R$20",
    minDeposit: "R$25",
    wagering: "Sem rollover — crédito direto",
    validFor: "Mercados de futebol",
    newCustomersOnly: false,
  },
  {
    id: "novibet-1",
    bookmakerId: "novibet",
    type: "aposta-gratis",
    headline: "Bônus de cadastro rápido",
    amount: "R$30",
    minDeposit: "R$10",
    wagering: "3x em acumuladas",
    validFor: "30 dias",
    newCustomersOnly: true,
  },
  {
    id: "rivalo-1",
    bookmakerId: "rivalo",
    type: "deposito",
    headline: "Dobro do primeiro depósito",
    amount: "R$25",
    minDeposit: "R$15",
    wagering: "4x rollover",
    validFor: "Novos usuários BR",
    newCustomersOnly: true,
  },
];

export const BONUS_TYPE_LABEL: Record<BonusType, string> = {
  "aposta-gratis": "Aposta grátis",
  deposito: "Bônus de depósito",
  cashback: "Cashback",
};
