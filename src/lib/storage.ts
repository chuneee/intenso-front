export type StorageType = "local" | "session";

export const safeStorage = {
  get<T>(key: string): T | null {
    try {
      const raw = window.localStorage.getItem(key) ?? window.sessionStorage.getItem(key);
      if (!raw) return null;
      return JSON.parse(raw) as T;
    } catch {
      return null;
    }
  },

  set(key: string, value: unknown, type: StorageType) {
    try {
      const serialized = JSON.stringify(value);
      if (type === "local") {
        window.localStorage.setItem(key, serialized);
      } else {
        window.sessionStorage.setItem(key, serialized);
      }
    } catch {
      // ignore
    }
  },

  remove(key: string) {
    try {
      window.localStorage.removeItem(key);
      window.sessionStorage.removeItem(key);
    } catch {
      // ignore
    }
  },
} as const;
