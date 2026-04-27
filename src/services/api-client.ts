export class ApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly detail: string,
  ) {
    super(`API ${status}: ${detail}`)
    this.name = 'ApiError'
  }
}

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`/api/v1${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })

  if (!res.ok) {
    const body = await res.json().catch(() => ({ detail: res.statusText }))
    throw new ApiError(res.status, (body as { detail?: string }).detail ?? res.statusText)
  }

  return res.json() as Promise<T>
}

export const apiGet = <T>(path: string): Promise<T> => apiFetch<T>(path)

export const apiPost = <T>(path: string, body: unknown): Promise<T> =>
  apiFetch<T>(path, { method: 'POST', body: JSON.stringify(body) })

export const apiPatch = <T>(path: string, body: unknown): Promise<T> =>
  apiFetch<T>(path, { method: 'PATCH', body: JSON.stringify(body) })
