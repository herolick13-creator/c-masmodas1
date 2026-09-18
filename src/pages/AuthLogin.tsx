import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { dataStore } from "@/services/dataStore";
import { Lock, Mail, ArrowRight, AlertCircle, ShoppingBag } from "lucide-react";
import BrandLogo from "@/components/common/BrandLogo";

export default function AuthLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const fromCheckout = location.state?.fromCheckout;
  const redirectUrl = location.state?.redirect || (fromCheckout ? "/checkout" : null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSuccessfulAuth = (user: any) => {
    if (redirectUrl) {
      navigate(redirectUrl);
      return;
    }
    if (user.role !== "CLIENTE") {
      navigate("/admin");
    } else {
      navigate("/cliente");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = dataStore.login(email.trim(), password.trim());
    if (res.success && res.user) {
      handleSuccessfulAuth(res.user);
    } else {
      setError(res.error || "E-mail ou senha incorretos.");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-rose-100 shadow-xl space-y-6 animate-in fade-in">
        <div className="text-center space-y-3">
          <BrandLogo size="md" variant="burgundy" />
          <h1 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-slate-900 pt-2">
            Acessar Minha Conta
          </h1>
          <p className="text-xs text-slate-500">
            {fromCheckout ? (
              <span className="inline-flex items-center gap-1.5 text-[#720018] font-bold bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Faça login para continuar sua compra</span>
              </span>
            ) : (
              "Digite seu e-mail e senha para gerenciar seus pedidos ou painel C-MAS."
            )}
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-2xl bg-red-50 text-red-700 border border-red-200 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-800 mb-1">E-mail</label>
            <div className="relative">
              <input
                type="email"
                required
                placeholder="seu.email@exemplo.com.br"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#F8F5F3] border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#720018]"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="font-bold text-slate-800">Senha</label>
              <a href="#" onClick={(e) => { e.preventDefault(); alert("Instruções de redefinição enviadas para seu e-mail!"); }} className="text-[11px] text-[#720018] hover:underline font-semibold">
                Esqueceu a senha?
              </a>
            </div>
            <div className="relative">
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#F8F5F3] border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#720018]"
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-[#720018] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#4A0010] shadow transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Entrar</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center text-xs text-slate-600">
          Ainda não tem conta?{" "}
          <Link
            to="/cadastro"
            state={{ fromCheckout, redirect: redirectUrl }}
            className="text-[#720018] font-bold hover:underline"
          >
            Cadastre-se gratuitamente
          </Link>
        </div>
      </div>
    </div>
  );
}
