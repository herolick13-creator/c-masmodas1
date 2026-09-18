import React from "react";
import { type LucideIcon } from "lucide-react";
import { motion } from "motion/react";

interface AuthLayoutProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  footer?: React.ReactNode;
  children: React.ReactNode;
}

export default function AuthLayout({
  icon: Icon,
  title,
  subtitle,
  footer,
  children,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center bg-slate-50 dark:bg-slate-950 p-4 sm:p-6 lg:p-8">
      {/* Background ambient elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="w-full max-w-md relative z-10"
      >
        {/* Card Container */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-none p-6 sm:p-8">
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-6 sm:mb-8">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-900 flex items-center justify-center mb-4 text-blue-600 dark:text-blue-400 shadow-xs">
              <Icon className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              {title}
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
              {subtitle}
            </p>
          </div>

          {/* Body Content */}
          <div className="space-y-4">{children}</div>

          {/* Optional Footer */}
          {footer && (
            <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800/80 text-center text-sm text-slate-500 dark:text-slate-400">
              {footer}
            </div>
          )}
        </div>

        {/* Brand / Helper Info */}
        <div className="mt-6 text-center text-xs text-slate-400 dark:text-slate-500 flex items-center justify-center gap-4">
          <span>Privacidade</span>
          <span>•</span>
          <span>Termos de Serviço</span>
          <span>•</span>
          <span>Suporte</span>
        </div>
      </motion.div>
    </div>
  );
}
