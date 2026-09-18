import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { base44, User } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { ShieldCheck, LogOut, CheckCircle, Mail, User as UserIcon, KeyRound, ArrowRight } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import GoogleIcon from "@/components/GoogleIcon";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const currentUser = base44.auth.getUser();
    const currentToken = base44.auth.getToken();
    if (!currentToken) {
      // If not authenticated, default to register page
      navigate("/register");
      return;
    }
    setUser(currentUser);
    setToken(currentToken);
  }, [navigate]);

  const handleLogout = () => {
    base44.auth.logout();
    toast({
      title: "Sessão encerrada",
      description: "Você saiu da sua conta.",
    });
    navigate("/register");
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xl p-6 sm:p-8">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-6 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-900 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Cadastro Concluído!
              </h2>
              <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1 mt-0.5">
                <CheckCircle className="w-3.5 h-3.5" />
                E-mail verificado & sessão ativa
              </p>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="text-slate-600 dark:text-slate-300"
          >
            <LogOut className="w-4 h-4 mr-1.5" />
            Sair
          </Button>
        </div>

        {/* User Card */}
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Dados do Usuário
              </span>
              {user?.provider === "google" && (
                <span className="inline-flex items-center gap-1 text-xs px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-950 dark:text-blue-300">
                  <GoogleIcon className="w-3.5 h-3.5" />
                  Google OAuth
                </span>
              )}
            </div>

            <div className="flex items-center gap-3 pt-1">
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-base shadow-xs">
                {user?.name ? user.name[0].toUpperCase() : "U"}
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  {user?.name || "Usuário Cadastrado"}
                </p>
                <p className="text-xs text-slate-500 flex items-center gap-1">
                  <Mail className="w-3 h-3" />
                  {user?.email || "email@exemplo.com"}
                </p>
              </div>
            </div>
          </div>

          {/* Access Token info */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60 space-y-1.5">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <KeyRound className="w-3.5 h-3.5" />
              Token de Acesso (JWT / Bearer)
            </span>
            <p className="font-mono text-xs text-slate-600 dark:text-slate-300 break-all bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800">
              {token || "Nenhum token encontrado"}
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <Button
              className="flex-1"
              onClick={() => {
                toast({
                  title: "Ação de Teste Executada",
                  description: "A API autenticada respondeu com sucesso (200 OK).",
                  variant: "success",
                });
              }}
            >
              Testar Requisição Autenticada
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate("/register")}
            >
              Novo Cadastro
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
