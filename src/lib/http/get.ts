export async function get(url: string, config: RequestInit = {}) {
  const res = await fetch(url, { ...config, method: "GET" });
  if (!res.ok) throw new Error(`GET ${url} failed: ${res.status}`);
  return res.json();
}