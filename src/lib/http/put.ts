export async function put(url: string, data: any, config: RequestInit = {}) {
  const res = await fetch(url, {
    ...config,
    method: "PUT",
    headers: { "Content-Type": "application/json", ...(config.headers || {}) },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`PUT ${url} failed: ${res.status}`);
  return res.json();
}