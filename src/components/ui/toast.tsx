import React from "react";
import { useToast } from "./use-toast";
import { CheckCircle2, AlertCircle, X, Info } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

export function Toaster() {
  const { toasts, dismiss } = useToast();

  return (
    <div
      aria-live="polite"
      className="fixed bottom-4 right-4 z-50 flex max-h-screen w-full max-w-sm flex-col-reverse gap-2 pointer-events-none px-4 sm:px-0"
    >
      <AnimatePresence>
        {toasts.map((item) => {
          const isDestructive = item.variant === "destructive";
          const isSuccess = item.variant === "success";

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={`pointer-events-auto relative flex w-full items-start gap-3 rounded-xl border p-4 shadow-lg backdrop-blur-md transition-all ${
                isDestructive
                  ? "border-rose-200 bg-rose-50/95 text-rose-900 dark:border-rose-900/50 dark:bg-rose-950/90 dark:text-rose-100"
                  : isSuccess
                  ? "border-emerald-200 bg-emerald-50/95 text-emerald-900 dark:border-emerald-900/50 dark:bg-emerald-950/90 dark:text-emerald-100"
                  : "border-slate-200 bg-white/95 text-slate-900 shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900/95 dark:text-slate-100"
              }`}
            >
              <div className="mt-0.5 shrink-0">
                {isDestructive ? (
                  <AlertCircle className="h-5 w-5 text-rose-600 dark:text-rose-400" />
                ) : isSuccess ? (
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                ) : (
                  <Info className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                )}
              </div>

              <div className="flex-1 space-y-1 text-sm">
                {item.title && (
                  <p className="font-semibold leading-none tracking-tight">
                    {item.title}
                  </p>
                )}
                {item.description && (
                  <p className="text-xs opacity-90 leading-relaxed">
                    {item.description}
                  </p>
                )}
              </div>

              <button
                onClick={() => dismiss(item.id)}
                className="shrink-0 rounded-lg p-1 text-slate-400 opacity-70 transition-opacity hover:opacity-100 focus:outline-none"
                aria-label="Fechar"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
