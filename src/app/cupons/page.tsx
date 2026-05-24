import Link from "next/link";
import { SiteShell } from "@/components/layout/SiteShell";

export default function CuponsPage() {
  return (
    <SiteShell activeSub="cupons">
      <div className="oc-stub">
        <h1 className="text-xl font-extrabold text-[#111]">Cupons / acumuladas</h1>
        <p className="mt-3 text-sm text-[#555]">
          Montagem de múltiplas em breve — mesmo fluxo do Oddschecker bet basket.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block bg-[var(--oc-blue-accent)] px-4 py-2 text-sm font-bold text-white"
        >
          Ver próximos jogos
        </Link>
      </div>
    </SiteShell>
  );
}
