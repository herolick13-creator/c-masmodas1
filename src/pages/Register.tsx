import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserPlus, Mail, Lock, Loader2, Eye, EyeOff, ShieldCheck, ArrowLeft, KeyRound } from "lucide-react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import AuthLayout from "@/components/AuthLayout";
import GoogleIcon from "@/components/GoogleIcon";
import { toast } from "@/components/ui/use-toast";
import { safeReturnTo } from "@/lib/authReturnTo";

export default function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [lastDemoCode, setLastDemoCode] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      setError("As senhas não coincidem / Passwords do not match");
      return;
    }
    if (password.length < 6) {
      setError("A senha deve conter no mínimo 6 caracteres");
      return;
    }
    setLoading(true);
    try {
      const res = await base44.auth.register({ email, password });
      if (res?.demoOtp) {
        setLastDemoCode(res.demoOtp);
      }
      setShowOtp(true);
      toast({
        title: "Código enviado!",
        description: `Enviamos um código de verificação para ${email}`,
        variant: "default",
      });
    } catch (err: any) {
      setError(err.message || "Falha no cadastro. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    setError("");
    setLoading(true);
    try {
      const result = await base44.auth.verifyOtp({ email, otpCode });
      if (result?.access_token) {
        base44.auth.setToken(result.access_token);
      }
      toast({
        title: "Conta verificada com sucesso!",
        description: "Bem-vindo(a) à plataforma.",
        variant: "success",
      });
      const returnUrl = safeReturnTo("/dashboard");
      navigate(returnUrl);
    } catch (err: any) {
      setError(err.message || "Código de verificação inválido");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setError("");
    try {
      const res = await base44.auth.resendOtp(email);
      if (res?.demoOtp) {
        setLastDemoCode(res.demoOtp);
      }
      toast({
        title: "Código reenviado",
        description: `Novo código gerado: ${res.demoOtp || "123456"}`,
        variant: "default",
      });
    } catch (err: any) {
      setError(err.message || "Erro ao reenviar o código");
    }
  };

  const handleGoogle = () => {
    base44.auth.loginWithProvider("google", safeReturnTo("/dashboard"));
    toast({
      title: "Autenticando com o Google...",
      description: "Redirecionando para o painel principal.",
    });
    setTimeout(() => {
      navigate("/dashboard");
    }, 500);
  };

  if (showOtp) {
    return (
      <AuthLayout
        icon={Mail}
        title="Verifique seu e-mail"
        subtitle={`Enviamos um código de 6 dígitos para ${email}`}
        footer={
          <button
            onClick={() => {
              setShowOtp(false);
              setOtpCode("");
              setError("");
            }}
            className="inline-flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para o formulário
          </button>
        }
      >
        {/* Test Code Tip Box */}
        <div className="p-3.5 rounded-xl bg-blue-50/80 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/60 text-xs text-blue-800 dark:text-blue-200 flex items-start gap-2.5">
          <KeyRound className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold">Código para teste rápido: </span>
            <span className="font-mono bg-blue-100 dark:bg-blue-900/80 px-1.5 py-0.5 rounded text-blue-900 dark:text-blue-100 font-bold">
              {lastDemoCode || "123456"}
            </span>{" "}
            ou digite <span className="font-mono font-bold">123456</span>
          </div>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 dark:bg-rose-950/40 dark:border-rose-900/60 dark:text-rose-200 text-sm">
            {error}
          </div>
        )}

        <div className="flex justify-center my-4">
          <InputOTP
            maxLength={6}
            value={otpCode}
            onChange={setOtpCode}
            autoFocus
            autoComplete="one-time-code"
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>

        <Button
          id="btn-verify-otp"
          className="w-full h-12 font-medium text-base shadow-sm"
          onClick={handleVerify}
          disabled={loading || otpCode.length < 6}
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Verificando...
            </>
          ) : (
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              Verificar e Continuar
            </span>
          )}
        </Button>

        <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-4">
          Não recebeu o código?{" "}
          <button
            id="btn-resend-otp"
            type="button"
            onClick={handleResend}
            className="text-blue-600 dark:text-blue-400 font-medium hover:underline cursor-pointer"
          >
            Reenviar código
          </button>
        </p>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      icon={UserPlus}
      title="Criar sua conta"
      subtitle="Cadastre-se para começar a usar a plataforma"
      footer={
        <>
          Já possui uma conta?{" "}
          <Link
            to={"/login" + (safeReturnTo() !== "/dashboard" ? "?returnTo=" + encodeURIComponent(safeReturnTo()) : "")}
            className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
          >
            Entrar (Log in)
          </Link>
        </>
      }
    >
      <Button
        id="btn-google-signup"
        variant="outline"
        className="w-full h-12 text-sm font-medium mb-5"
        onClick={handleGoogle}
      >
        <GoogleIcon className="w-5 h-5 mr-2" />
        Continuar com o Google
      </Button>

      <div className="relative mb-5">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200 dark:border-slate-800" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white dark:bg-slate-900 px-3 text-slate-400 dark:text-slate-500 font-medium tracking-wider">
            ou com seu e-mail
          </span>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 dark:bg-rose-950/40 dark:border-rose-900/60 dark:text-rose-200 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="email">E-mail</Label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" aria-hidden="true" />
            <Input
              id="email"
              type="email"
              autoComplete="email"
              autoFocus
              placeholder="seu.email@exemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10 h-12"
              required
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="password">Senha</Label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" aria-hidden="true" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10 pr-10 h-12"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              aria-label={showPassword ? "Ocultar senha" : "Ver senha"}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="confirm">Confirmar Senha</Label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" aria-hidden="true" />
            <Input
              id="confirm"
              type={showConfirmPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="pl-10 pr-10 h-12"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              aria-label={showConfirmPassword ? "Ocultar senha" : "Ver senha"}
            >
              {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div className="pt-2">
          <Button
            id="btn-submit-register"
            type="submit"
            className="w-full h-12 font-semibold text-base shadow-sm"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Criando conta...
              </>
            ) : (
              "Criar conta"
            )}
          </Button>
        </div>
      </form>
    </AuthLayout>
  );
}
