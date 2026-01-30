import { env } from "@/config/env";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type HttpOptions = {
  method?: HttpMethod;
  headers?: Record<string, string>;
  body?: unknown;
  signal?: AbortSignal;
};

export class HttpError extends Error {
  status: number;
  body?: unknown;

  constructor(message: string, status: number, body?: unknown) {
    super(message);
    this.name = "HttpError";
    this.status = status;
    this.body = body;
  }
}

const buildUrl = (path: string) => {
  if (path.startsWith("http")) return path;
  const base = env.apiBaseUrl.replace(/\/$/, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalizedPath}`;
};

export const http = {
  async request<T>(path: string, options: HttpOptions = {}): Promise<T> {
    const res = await fetch(buildUrl(path), {
      method: options.method ?? "GET",
      headers: {
        "Content-Type": "application/json",
        ...(options.headers ?? {}),
      },
      body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
      signal: options.signal,
    });

    const contentType = res.headers.get("content-type") ?? "";
    const isJson = contentType.includes("application/json");
    const data = isJson ? await res.json().catch(() => undefined) : await res.text().catch(() => undefined);

    if (!res.ok) {
      throw new HttpError("Request failed", res.status, data);
    }

    return data as T;
  },

  get<T>(path: string, options?: Omit<HttpOptions, "method" | "body">) {
    return http.request<T>(path, { ...options, method: "GET" });
  },

  post<T>(path: string, body?: unknown, options?: Omit<HttpOptions, "method" | "body">) {
    return http.request<T>(path, { ...options, method: "POST", body });
  },

  put<T>(path: string, body?: unknown, options?: Omit<HttpOptions, "method" | "body">) {
    return http.request<T>(path, { ...options, method: "PUT", body });
  },

  patch<T>(path: string, body?: unknown, options?: Omit<HttpOptions, "method" | "body">) {
    return http.request<T>(path, { ...options, method: "PATCH", body });
  },

  delete<T>(path: string, options?: Omit<HttpOptions, "method" | "body">) {
    return http.request<T>(path, { ...options, method: "DELETE" });
  },
} as const;
