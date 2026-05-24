const HELP_LINKS = [
  {
    name: "SIGAP — Sistema de Gestão de Apostas",
    href: "https://www.gov.br/fazenda/pt-br/composicao/orgaos/secretaria-de-premios-e-apostas",
    desc: "Regulamentação federal de apostas no Brasil.",
  },
  {
    name: "Jogo Apoiado",
    href: "https://jogoapoiado.com.br/",
    desc: "Informação e apoio para jogo responsável.",
  },
  {
    name: "CVV — Centro de Valorização da Vida",
    href: "tel:08007010722",
    desc: "Ligue 0800 701 0722 (24h, gratuito).",
  },
];

export function ResponsibleContent() {
  return (
    <div className="responsible">
      <section className="responsible__block">
        <h2>O que é jogo responsável?</h2>
        <p>
          Apostar deve ser entretenimento, não uma forma de ganhar dinheiro ou resolver
          problemas financeiros. No Brasil, operadoras licenciadas devem oferecer
          ferramentas de proteção ao jogador conforme a regulamentação da Secretaria de
          Prêmios e Apostas (SPA).
        </p>
      </section>

      <section className="responsible__block">
        <h2>Como definir limites</h2>
        <ul>
          <li>
            <strong>Depósito:</strong> defina um valor máximo por dia, semana ou mês na
            sua conta da casa de apostas.
          </li>
          <li>
            <strong>Perda:</strong> limite quanto você aceita perder antes de parar.
          </li>
          <li>
            <strong>Tempo:</strong> use lembretes de sessão; faça pausas regulares.
          </li>
          <li>
            <strong>Aposta:</strong> algumas casas permitem teto por bilhete.
          </li>
        </ul>
        <p className="responsible__note">
          Esses limites costumam estar em &quot;Jogo responsável&quot; ou &quot;Minha conta&quot; no site da
          operadora. Alterações para aumentar limites podem ter período de espera de 24–72h.
        </p>
      </section>

      <section className="responsible__block">
        <h2>Autoexclusão</h2>
        <p>
          Você pode solicitar <strong>autoexclusão</strong> temporária ou permanente da
          plataforma. Durante esse período não será possível apostar nem receber
          marketing da operadora. Em casos graves, o cadastro pode ser bloqueado de
          forma definitiva.
        </p>
        <p>
          Também existe a possibilidade de cadastro no{" "}
          <strong>registro nacional de autoexclusão</strong> (quando disponível pela
          regulamentação), impedindo abertura de conta em operadoras licenciadas.
        </p>
      </section>

      <section className="responsible__block">
        <h2>Sinais de alerta</h2>
        <ul>
          <li>Apostar mais do que pode perder</li>
          <li>Perseguir perdas com apostas maiores</li>
          <li>Esconder apostas de familiares</li>
          <li>Ansiedade ou irritação quando não aposta</li>
          <li>Negligenciar trabalho, estudos ou relacionamentos</li>
        </ul>
      </section>

      <section className="responsible__block">
        <h2>Onde buscar ajuda</h2>
        <ul className="responsible__links">
          {HELP_LINKS.map((link) => {
            const external = link.href.startsWith("http");
            return (
              <li key={link.name}>
                <a
                  href={link.href}
                  {...(external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  {link.name}
                </a>
                <span>{link.desc}</span>
              </li>
            );
          })}
        </ul>
      </section>

      <p className="responsible__legal">
        +18 · Proibido para menores · BrasilOdds não aceita apostas e não substitui
        aconselhamento profissional. Se você ou alguém próximo precisa de ajuda, procure
        os serviços acima.
      </p>
    </div>
  );
}
