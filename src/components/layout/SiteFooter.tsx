import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-[#ccc] bg-[#f5f5f5]">
      <div className="mx-auto grid max-w-[1600px] gap-6 px-4 py-8 text-[11px] text-[#555] sm:grid-cols-2 lg:grid-cols-5">
        <div>
          <p className="font-extrabold text-[#111]">BrasilOdds</p>
          <p className="mt-2">Comparação de odds de futebol para o público brasileiro.</p>
        </div>
        <div>
          <p className="font-bold text-[#111]">Futebol</p>
          <ul className="mt-2 space-y-1">
            <li>
              <Link href="/">Próximos jogos</Link>
            </li>
            <li>
              <Link href="/ao-vivo">Ao vivo</Link>
            </li>
            <li>
              <Link href="/resultados">Resultados</Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="font-bold text-[#111]">Conteúdo</p>
          <ul className="mt-2 space-y-1">
            <li>
              <Link href="/bonus-gratis">Bônus grátis</Link>
            </li>
            <li>
              <Link href="/cassino">Cassino</Link>
            </li>
            <li>
              <Link href="/palpites">Palpites</Link>
            </li>
            <li>
              <Link href="/analises">Análises</Link>
            </li>
            <li>
              <Link href="/noticias">Notícias</Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="font-bold text-[#111]">Ligas</p>
          <ul className="mt-2 space-y-1">
            <li>
              <Link href="/liga/serie-a">Brasileirão</Link>
            </li>
            <li>
              <Link href="/liga/premier">Premier League</Link>
            </li>
            <li>
              <Link href="/liga/ucl">Liga dos Campeões</Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="font-bold text-[#111]">Informação</p>
          <ul className="mt-2 space-y-1">
            <li>
              <Link href="/jogo-responsavel">Jogo responsável</Link>
            </li>
          </ul>
          <p className="mt-3">Horários em BRT. Não é dica de aposta.</p>
          <p className="mt-2">+18 · Jogue com responsabilidade</p>
        </div>
      </div>
      <div className="border-t border-[#ddd] py-3 text-center text-[10px] text-[#888]">
        © {new Date().getFullYear()} BrasilOdds
      </div>
    </footer>
  );
}
