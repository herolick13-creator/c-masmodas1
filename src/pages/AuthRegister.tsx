import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { dataStore } from "@/services/dataStore";
import { Lock, Mail, User, Phone, FileText, ArrowRight, AlertCircle, CheckCircle2, ShoppingBag } from "lucide-react";
import BrandLogo from "@/components/common/BrandLogo";

export default function AuthRegister() {
  const navigate = useNavigate();
  const location = useLocation();
  const fromCheckout = location.state?.fromCheckout;
  const redirectUrl = location.state?.redirect || (fromCheckout ? "/checkout" : null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [cpf, setCpf] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("As senhas informadas não coincidem.");
      return;
    }
    if (password.length < 6) {
      setError("A senha deve ter no mínimo 6 caracteres.");
      return;
    }

    const res = dataStore.register({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      cpf: cpf.trim(),
      password: password.trim()
    });

    if (res.success && res.user) {
      if (redirectUrl) {
        navigate(redirectUrl);
      } else if (res.user.role !== "CLIENTE") {
        navigate("/admin");
      } else {
        navigate("/cliente");
      }
    } else {
      setError(res.error || "Erro ao criar conta.");
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-rose-100 shadow-xl space-y-6 animate-in fade-in">
        <div className="text-center space-y-3">
          <BrandLogo size="md" variant="burgundy" />
          <h1 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-slate-900 pt-2">
            Criar Conta C-MAS
          </h1>
          <p className="text-xs text-slate-500">
            {fromCheckout ? (
              <span className="inline-flex items-center gap-1.5 text-[#720018] font-bold bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Crie sua conta para concluir seu pedido</span>
              </span>
            ) : (
              "Cadastre-se para compras seguras, ofertas exclusivas e rastreio em tempo real."
            )}
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-2xl bg-red-50 text-red-700 border border-red-200 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div>
            <label className="block font-bold text-slate-800 mb-1">Nome Completo</label>
            <div className="relative">
              <input
                type="text"
                required
                placeholder="Ex: Mariana Albuquerque"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#F8F5F3] border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#720018]"
              />
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-800 mb-1">E-mail</label>
            <div className="relative">
              <input
                type="email"
                required
                placeholder="mariana@exemplo.com.br"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#F8F5F3] border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#720018]"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div>
              <label className="block font-bold text-slate-800 mb-1">WhatsApp</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="(67) 99619-4762"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-[#F8F5F3] border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#720018]"
                />
                <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3.5" />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1">CPF</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="000.000.000-00"
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-[#F8F5F3] border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#720018]"
                />
                <FileText className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3.5" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div>
              <label className="block font-bold text-slate-800 mb-1">Senha</label>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="Mínimo 6 dígitos"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-[#F8F5F3] border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#720018]"
                />
                <Lock className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3.5" />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1">Confirmar Senha</label>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="Repita a senha"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-[#F8F5F3] border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#720018]"
                />
                <Lock className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3.5" />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-[#720018] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#4A0010] shadow transition-colors flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            <span>Cadastrar e Começar</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center text-xs text-slate-600">
          Já tem cadastro?{" "}
          <Link to="/login" className="text-[#720018] font-bold hover:underline">
            Faça login aqui
          </Link>
        </div>
      </div>
    </div>
  );
}
