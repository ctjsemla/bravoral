import { SiteShell } from "@/components/layout/SiteShell";
import { BonusFeatured } from "@/components/bonus/BonusFeatured";
import { BonusOffersTable } from "@/components/bonus/BonusOffersTable";

export const metadata = {
  title: "Bônus grátis — BrasilOdds",
  description:
    "Compare bônus e apostas grátis das casas licenciadas no Brasil. Ofertas para futebol em português.",
};

export default function BonusGratisPage() {
  return (
    <SiteShell activeSub="bonus">
      <div className="py-4">
        <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--oc-blue-accent)]">
          Promoções
        </p>
        <h1 className="mt-2 text-3xl font-extrabold text-[#111]">Bônus grátis</h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#555]">
          Compare ofertas de boas-vindas das principais casas de apostas no Brasil.
          Foco em <strong>futebol</strong> — sempre leia os termos antes de se cadastrar.
          BrasilOdds não opera apostas; apenas comparamos promoções.
        </p>

        <div className="bonus-disclaimer mt-4 border border-[#f0d878] bg-[#fffbeb] px-4 py-3 text-[11px] text-[#665500]">
          +18 · Jogue com responsabilidade · Ofertas sujeitas a alteração pelas
          operadoras. Links de afiliado podem ser aplicados no futuro.
        </div>

        <section className="mt-8">
          <h2 className="text-lg font-extrabold text-[#111]">Destaques da semana</h2>
          <BonusFeatured />
        </section>

        <section className="mt-8">
          <h2 className="mb-3 text-lg font-extrabold text-[#111]">
            Todas as ofertas
          </h2>
          <BonusOffersTable />
        </section>

        <section className="mt-8 border-t border-[var(--oc-border)] pt-6 text-[11px] leading-relaxed text-[#777]">
          <h3 className="font-bold text-[#333]">Termos gerais</h3>
          <p className="mt-2">
            Cada casa define regras próprias de elegibilidade, mercados válidos e prazo
            de uso. Apostas grátis normalmente não incluem o valor do stake no
            retorno. Bônus de depósito exigem rollover antes do saque. Consulte sempre
            o site oficial da operadora.
          </p>
        </section>
      </div>
    </SiteShell>
  );
}
