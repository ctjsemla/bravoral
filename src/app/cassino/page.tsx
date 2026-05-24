import { SiteShell } from "@/components/layout/SiteShell";
import { PageHeader } from "@/components/content/PageHeader";
import { EmBreveBanner } from "@/components/content/EmBreveBanner";

export const metadata = {
  title: "Cassino — BrasilOdds",
  description:
    "Casas licenciadas com cassino no Brasil. Slots e ao vivo em breve.",
};

export default function CassinoPage() {
  return (
    <SiteShell>
      <div className="content-page py-4">
        <PageHeader
          kicker="Entretenimento"
          title="Cassino online"
          description="Operadoras licenciadas no Brasil que oferecem jogos de cassino. Em breve: comparação de slots, roleta e cassino ao vivo."
        />
        <EmBreveBanner
          hint="Próximas categorias: slots · cassino ao vivo · blackjack · bacará"
        />
        <section className="mt-8 text-[12px] leading-relaxed text-[#555]">
          <h2 className="text-sm font-extrabold text-[#111]">Cassino licenciado no Brasil</h2>
          <p className="mt-2">
            Desde a regulamentação federal, apenas operadoras autorizadas podem oferecer
            jogos de cassino online para residentes no país. O BrasilOdds listará
            comparativos informativos — sem operar jogos nem processar apostas.
          </p>
        </section>
      </div>
    </SiteShell>
  );
}
