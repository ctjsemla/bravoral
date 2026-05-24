import { readFileSync } from "fs";
import { resolve } from "path";

function loadEnv() {
  try {
    const raw = readFileSync(resolve(".env.local"), "utf8");
    for (const line of raw.split("\n")) {
      const m = line.match(/^([^#=]+)=(.*)$/);
      if (m) process.env[m[1].trim()] = m[2].trim();
    }
  } catch {
    /* ignore */
  }
}

loadEnv();

const AF_KEY = process.env.APIFOOTBALL_KEY;
const ODDS_KEY = process.env.ODDS_API_KEY;

function normTeam(name) {
  return name
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function teamsPairMatch(homeA, awayA, homeB, awayB) {
  const h = normTeam(homeA);
  const a = normTeam(awayA);
  const h2 = normTeam(homeB);
  const a2 = normTeam(awayB);
  const direct =
    (h === h2 || h.includes(h2) || h2.includes(h)) &&
    (a === a2 || a.includes(a2) || a2.includes(a));
  if (direct) return true;
  return (
    (h === a2 || h.includes(a2) || a2.includes(h)) &&
    (a === h2 || a.includes(h2) || h2.includes(a))
  );
}

async function main() {
  console.log("=== 1. API-Football: fixtures?live=all ===\n");

  const liveRes = await fetch("https://v3.football.api-sports.io/fixtures?live=all", {
    headers: { "x-apisports-key": AF_KEY },
  });
  const liveJson = await liveRes.json();
  console.log("HTTP", liveRes.status, "| results:", liveJson.results);
  if (liveJson.errors && Object.keys(liveJson.errors).length) {
    console.log("ERRORS:", liveJson.errors);
  }

  const br = (liveJson.response ?? []).filter((x) => x.league.country === "Brazil");
  const mapped = (liveJson.response ?? []).filter((x) =>
    [71, 72, 39, 2, 140, 13].includes(x.league.id),
  );

  const show = (label, items) => {
    console.log(`\n${label} (${items.length}):`);
    for (const x of items.slice(0, 5)) {
      const f = x.fixture;
      const g = x.goals;
      console.log(
        `  [${f.id}] ${x.teams.home.name} ${g.home ?? "-"}-${g.away ?? "-"} ${x.teams.away.name}`,
      );
      console.log(
        `       status: ${f.status.long} (${f.status.short}) elapsed=${f.status.elapsed}' league=${x.league.name}`,
      );
    }
  };

  show("Brazil live", br);
  show("Mapped leagues (Serie A, EPL, etc.)", mapped);

  console.log("\n=== 2. The Odds API: soccer_brazil_campeonato ===\n");

  const oddsUrl = new URL(
    "https://api.the-odds-api.com/v4/sports/soccer_brazil_campeonato/odds",
  );
  oddsUrl.searchParams.set("apiKey", ODDS_KEY);
  oddsUrl.searchParams.set("regions", "eu,uk,us,au");
  oddsUrl.searchParams.set("markets", "h2h");
  oddsUrl.searchParams.set("oddsFormat", "decimal");

  const oddsRes = await fetch(oddsUrl);
  const oddsJson = await oddsRes.json();
  console.log(
    "HTTP",
    oddsRes.status,
    "| remaining:",
    oddsRes.headers.get("x-requests-remaining"),
  );
  if (!Array.isArray(oddsJson)) {
    console.log("Response:", oddsJson);
    return;
  }
  console.log("events:", oddsJson.length);

  for (const e of oddsJson.slice(0, 4)) {
    const bms = e.bookmakers ?? [];
    const betfair = bms.find((b) => b.key.startsWith("betfair"));
    const pinnacle = bms.find((b) => b.key === "pinnacle");
    console.log(`\n  ${e.home_team} v ${e.away_team}`);
    console.log(`  commence: ${e.commence_time}`);
    console.log(`  bookmakers: ${bms.length}`);
    if (betfair) {
      const m = betfair.markets.find((x) => x.key === "h2h");
      console.log(`  betfair (${betfair.key}):`, m?.outcomes?.map((o) => `${o.name}=${o.price}`).join(", "));
    }
    if (pinnacle) {
      const m = pinnacle.markets.find((x) => x.key === "h2h");
      console.log(`  pinnacle:`, m?.outcomes?.map((o) => `${o.name}=${o.price}`).join(", "));
    }
  }

  console.log("\n=== 3. Eşleştirme: canlı BR x odds BR ===\n");

  let matched = 0;
  for (const fx of br.slice(0, 15)) {
    const home = fx.teams.home.name;
    const away = fx.teams.away.name;
    const hit = oddsJson.find((e) => teamsPairMatch(home, away, e.home_team, e.away_team));
    if (hit) {
      matched++;
      const bm = hit.bookmakers?.find((b) => b.key.startsWith("betfair"));
      const m = bm?.markets?.find((x) => x.key === "h2h");
      console.log(`  OK ${home} v ${away} (${fx.fixture.status.elapsed}') ↔ odds event`);
      if (m) console.log(`     odds:`, m.outcomes.map((o) => `${o.name}=${o.price}`).join(", "));
    }
  }
  console.log(`\n  Matched ${matched} / ${Math.min(br.length, 15)} Brazil live fixtures to Odds API`);

  if (br.length === 0) {
    console.log("\n  (Şu an Brezilya'da canlı maç yok — eşleştirme testi atlandı)");
    const sample = oddsJson[0];
    if (sample) {
      const anyLive = (liveJson.response ?? []).find((fx) =>
        teamsPairMatch(
          fx.teams.home.name,
          fx.teams.away.name,
          sample.home_team,
          sample.away_team,
        ),
      );
      console.log(
        `\n  Örnek odds maçı: ${sample.home_team} v ${sample.away_team}`,
      );
      console.log(
        `  API-Football canlıda var mı:`,
        anyLive ? `EVET (${anyLive.fixture.status.elapsed}')` : "HAYIR (farklı kaynak / saat)",
      );
    }
  }
}

main().catch(console.error);
