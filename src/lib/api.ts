const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export function resolveImage(path?: string | null): string {
  if (!path) return "";
  if (path.startsWith("http")) return path;

  const cleanPath = path.replace(/^\/?(storage\/)?/, "");

  return `${API_BASE_URL}/storage/${cleanPath}`;
}

export class ApiError extends Error {
  status: number;
  errors?: Record<string, string[]> | null;

  constructor(
    message: string,
    status: number,
    errors?: Record<string, string[]> | null,
  ) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.errors = errors;
  }
}

interface ApiEnvelope<T> {
  success: boolean;
  message: string | null;
  data?: T;
  errors?: Record<string, string[]> | null;
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const res = await fetch(`${API_BASE_URL}/api/v1${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...options.headers,
    },
    cache: "no-store",
  });

  const json: ApiEnvelope<T> = await res.json();

  if (!res.ok || !json.success) {
    throw new ApiError(
      json.message || "Terjadi kesalahan pada server",
      res.status,
      json.errors,
    );
  }

  return json.data as T;
}

export const api = {
  get: <T>(endpoint: string) => request<T>(endpoint, { method: "GET" }),
  post: <T>(endpoint: string, body: unknown) =>
    request<T>(endpoint, { method: "POST", body: JSON.stringify(body) }),
  put: <T>(endpoint: string, body: unknown) =>
    request<T>(endpoint, { method: "PUT", body: JSON.stringify(body) }),
  delete: <T>(endpoint: string) => request<T>(endpoint, { method: "DELETE" }),
};
