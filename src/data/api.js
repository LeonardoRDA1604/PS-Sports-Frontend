export const API_BASE = "http://localhost:3001";

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) throw new Error(`API error ${res.status}`);
  return res.json();
}

export async function list(resource) {
  return request(`/${resource}`);
}

export async function create(resource, data) {
  return request(`/${resource}`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function remove(resource, id) {
  return request(`/${resource}/${id}`, { method: "DELETE" });
}

export async function update(resource, id, data) {
  return request(`/${resource}/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}
