export async function post(url: string, data: any, config: RequestInit = {}) {
  const res = await fetch(url, {
    ...config,
    method: "POST",
    headers: { "Content-Type": "application/json", ...(config.headers || {}) },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`POST ${url} failed: ${res.status}`);
  return res.json();
}