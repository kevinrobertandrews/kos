export async function options(url: string, config: RequestInit = {}) {
  const res = await fetch(url, { ...config, method: "OPTIONS" });
  if (!res.ok) throw new Error(`OPTIONS ${url} failed: ${res.status}`);
  return res;
}