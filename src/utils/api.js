const baseUrl =
  import.meta.env.MODE === 'production'
    ? 'https://were-cooked-api.onrender.com' // ganti sesuai hosting backend kamu
    : 'http://localhost:3000';

export async function apiGet(endpoint, token = null) {
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  const res = await fetch(`${baseUrl}${endpoint}`, { headers });
  return await res.json();
}

export async function apiPost(endpoint, data, token = null) {
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
  const res = await fetch(`${baseUrl}${endpoint}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(data),
  });
  return await res.json();
}

export async function apiPut(endpoint, data, token = null) {
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  const res = await fetch(`${baseUrl}${endpoint}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(data),
  });

  return await res.json();
}


export async function apiDelete(endpoint, token) {
  const headers = { Authorization: `Bearer ${token}` };
  const res = await fetch(`${baseUrl}${endpoint}`, {
    method: 'DELETE',
    headers,
  });
  return await res.json();
}
