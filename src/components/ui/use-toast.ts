import { useEffect, useState } from "react";

export interface ToastItem {
  id: string;
  title?: string;
  description?: string;
  variant?: "default" | "destructive" | "success";
  duration?: number;
}

// Lightweight event-driven toast store
const listeners = new Set<(toasts: ToastItem[]) => void>();
let memoryToasts: ToastItem[] = [];

function notify() {
  listeners.forEach((listener) => listener([...memoryToasts]));
}

export function toast({
  title,
  description,
  variant = "default",
  duration = 4000,
}: {
  title?: string;
  description?: string;
  variant?: "default" | "destructive" | "success";
  duration?: number;
}) {
  const id = Math.random().toString(36).substring(2, 9);
  const newToast: ToastItem = { id, title, description, variant, duration };
  memoryToasts = [...memoryToasts, newToast];
  notify();

  if (duration > 0) {
    setTimeout(() => {
      dismissToast(id);
    }, duration);
  }

  return id;
}

export function dismissToast(id: string) {
  memoryToasts = memoryToasts.filter((t) => t.id !== id);
  notify();
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastItem[]>(memoryToasts);

  useEffect(() => {
    listeners.add(setToasts);
    return () => {
      listeners.delete(setToasts);
    };
  }, []);

  return {
    toasts,
    toast,
    dismiss: dismissToast,
  };
}
