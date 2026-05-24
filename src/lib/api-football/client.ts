import { API_FOOTBALL_BASE, getApiFootballKey } from "@/lib/api-football/config";

export class ApiFootballError extends Error {
  constructor(
    message: string,
    public status?: number,
  ) {
    super(message);
    this.name = "ApiFootballError";
  }
}

export async function apiFootballGet<T>(
  path: string,
  params: Record<string, string> = {},
  options?: { fresh?: boolean },
): Promise<T> {
  const key = getApiFootballKey();
  if (!key) throw new ApiFootballError("APIFOOTBALL_KEY não configurada");

  const url = new URL(path, API_FOOTBALL_BASE);
  for (const [k, v] of Object.entries(params)) {
    url.searchParams.set(k, v);
  }

  const isLive =
    options?.fresh ?? (params.live === "all" || Boolean(params.id));

  const res = await fetch(url.toString(), {
    headers: { "x-apisports-key": key },
    ...(isLive ? { cache: "no-store" } : { next: { revalidate: 300 } }),
  });

  if (!res.ok) {
    throw new ApiFootballError(`API-Football HTTP ${res.status}`, res.status);
  }

  const data = (await res.json()) as T & { errors?: Record<string, string> };
  if (data.errors && Object.keys(data.errors).length > 0) {
    const msg = Object.values(data.errors).join("; ");
    throw new ApiFootballError(msg || "API-Football error");
  }

  return data;
}
