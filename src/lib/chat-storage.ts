import type { UIMessage } from "ai";

export type Thread = {
  id: string;
  title: string;
  updatedAt: number;
  messages: UIMessage[];
};

const KEY = "kindred.threads.v1";

const isBrowser = () => typeof window !== "undefined";

export function loadThreads(): Thread[] {
  if (!isBrowser()) return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Thread[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveThreads(threads: Thread[]) {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(threads));
  } catch {
    // ignore quota / serialization errors
  }
}

export function newThreadId() {
  if (isBrowser() && "randomUUID" in crypto) return crypto.randomUUID();
  return `t_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

export function deriveTitle(messages: UIMessage[]): string {
  const firstUser = messages.find((m) => m.role === "user");
  if (!firstUser) return "New conversation";
  const text = firstUser.parts
    .filter((p) => p.type === "text")
    .map((p) => (p as { text: string }).text)
    .join(" ")
    .trim();
  if (!text) return "New conversation";
  return text.length > 48 ? text.slice(0, 48).trim() + "…" : text;
}
