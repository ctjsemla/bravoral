import { fetchMatches, type FetchMatchesParams } from "@/lib/api";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status") as FetchMatchesParams["status"] | null;
  const leagueId = searchParams.get("leagueId");

  const matches = await fetchMatches({
    status: status ?? "all",
    leagueId: leagueId ?? undefined,
  });

  return Response.json(matches);
}
