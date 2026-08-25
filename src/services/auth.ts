export type AuthRole = "admin" | "mantenimiento"

export interface AuthUser {
  id: string
  name: string
  role: AuthRole
}

export interface AuthResponse {
  token: string
  user: AuthUser
}

const API_URL: string = import.meta.env.PUBLIC_API_URL ?? "http://localhost:3000"
const SESSION_KEY = import.meta.env.API_KEY;

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  })

  if (!response.ok) {
    const body = await response.json().catch(() => null) as
      | { message?: string | string[] }
      | null
    const message = Array.isArray(body?.message)
      ? body!.message.join(", ")
      : body?.message
    throw new Error(message ?? "Error en la solicitud")
  }

  return response.json() as Promise<T>
}

export const authService = {
  async login(name: string, password: string): Promise<AuthResponse> {
    return request<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ name, password }),
    })
  },

  async register(name: string, password: string): Promise<AuthResponse> {
    return request<AuthResponse>("/auth/register", {
      method: "POST",
      body: JSON.stringify({ name, password }),
    })
  },
}

export function getSession(): AuthResponse | null {
  const raw = localStorage.getItem(SESSION_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw) as AuthResponse
  } catch {
    return null
  }
}

export function setSession(session: AuthResponse): void {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session))
}

export function clearSession(): void {
  localStorage.removeItem(SESSION_KEY)
}
