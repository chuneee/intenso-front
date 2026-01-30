export const env = {
  apiBaseUrl: (import.meta.env.VITE_API_BASE_URL as string | undefined) ?? "http://localhost:3000",
  appEnv: (import.meta.env.MODE as string | undefined) ?? "development",
  isDev: Boolean(import.meta.env.DEV),
} as const;
