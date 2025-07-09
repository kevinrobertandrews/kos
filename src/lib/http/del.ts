export async function del(url: string, config: RequestInit = {}) {
  const res = await fetch(url, { ...config, method: "DELETE" });
  if (!res.ok) throw new Error(`DELETE ${url} failed: ${res.status}`);
  return res.json();
}