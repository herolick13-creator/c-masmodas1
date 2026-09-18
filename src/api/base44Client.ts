/**
 * Base44 Client Mock / Implementation
 * Provides authentication services, OTP generation/validation, session management, and Google OAuth simulation.
 */

export interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  emailVerified: boolean;
  createdAt: string;
  provider?: "email" | "google";
}

export interface RegisterPayload {
  email: string;
  password?: string;
}

export interface VerifyOtpPayload {
  email: string;
  otpCode: string;
}

export interface AuthResult {
  access_token: string;
  user: User;
}

class Base44Auth {
  private tokenKey = "base44_auth_token";
  private userKey = "base44_user";
  private pendingOtpsKey = "base44_pending_otps";

  private getPendingOtps(): Record<string, string> {
    try {
      const data = localStorage.getItem(this.pendingOtpsKey);
      return data ? JSON.parse(data) : {};
    } catch {
      return {};
    }
  }

  private setPendingOtp(email: string, code: string) {
    const otps = this.getPendingOtps();
    otps[email.toLowerCase().trim()] = code;
    try {
      localStorage.setItem(this.pendingOtpsKey, JSON.stringify(otps));
    } catch {
      // ignore
    }
  }

  async register(payload: RegisterPayload): Promise<{ success: boolean; message: string; demoOtp?: string }> {
    // Artificial latency for authentic network feel
    await new Promise((resolve) => setTimeout(resolve, 800));

    const email = payload.email.trim();
    if (!email || !email.includes("@")) {
      throw new Error("Por favor, insira um e-mail válido.");
    }
    if (payload.password && payload.password.length < 6) {
      throw new Error("A senha deve ter pelo menos 6 caracteres.");
    }

    // Generate random 6-digit code or fallback 123456
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    this.setPendingOtp(email, code);

    console.log(`[Base44 Auth] Código de verificação para ${email}: ${code} (Código de demonstração universal: 123456)`);

    return {
      success: true,
      message: `Código enviado para ${email}`,
      demoOtp: code,
    };
  }

  async verifyOtp(payload: VerifyOtpPayload): Promise<AuthResult> {
    await new Promise((resolve) => setTimeout(resolve, 750));

    const email = payload.email.trim().toLowerCase();
    const code = payload.otpCode.trim();

    const pendingOtps = this.getPendingOtps();
    const expectedOtp = pendingOtps[email];

    // Accept both the specifically generated code and standard demo test code "123456"
    if (code !== "123456" && (!expectedOtp || expectedOtp !== code)) {
      throw new Error("Código de verificação incorreto ou expirado. Tente 123456 ou solicite um novo código.");
    }

    // Clean pending
    delete pendingOtps[email];
    try {
      localStorage.setItem(this.pendingOtpsKey, JSON.stringify(pendingOtps));
    } catch {
      // ignore
    }

    const token = `b44_${Math.random().toString(36).substring(2)}_${Date.now()}`;
    const user: User = {
      id: "usr_" + Math.random().toString(36).substring(2, 9),
      email: payload.email,
      name: payload.email.split("@")[0],
      emailVerified: true,
      createdAt: new Date().toISOString(),
      provider: "email",
    };

    this.setToken(token);
    this.setUser(user);

    return {
      access_token: token,
      user,
    };
  }

  async resendOtp(email: string): Promise<{ success: boolean; demoOtp: string }> {
    await new Promise((resolve) => setTimeout(resolve, 600));
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    this.setPendingOtp(email, code);
    console.log(`[Base44 Auth] Novo código de verificação para ${email}: ${code}`);
    return {
      success: true,
      demoOtp: code,
    };
  }

  async login(payload: { email: string; password?: string }): Promise<AuthResult> {
    await new Promise((resolve) => setTimeout(resolve, 800));
    if (!payload.email || !payload.password) {
      throw new Error("E-mail e senha são obrigatórios.");
    }

    const token = `b44_${Math.random().toString(36).substring(2)}_${Date.now()}`;
    const user: User = {
      id: "usr_" + Math.random().toString(36).substring(2, 9),
      email: payload.email,
      name: payload.email.split("@")[0],
      emailVerified: true,
      createdAt: new Date().toISOString(),
      provider: "email",
    };

    this.setToken(token);
    this.setUser(user);

    return { access_token: token, user };
  }

  loginWithProvider(provider: "google" | "github", returnTo: string = "/dashboard") {
    const mockUser: User = {
      id: "usr_goog_" + Math.random().toString(36).substring(2, 8),
      email: "alex.demo@gmail.com",
      name: "Alex Silva",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
      emailVerified: true,
      createdAt: new Date().toISOString(),
      provider: "google",
    };

    const token = `b44_gauth_${Date.now()}`;
    this.setToken(token);
    this.setUser(mockUser);

    setTimeout(() => {
      window.location.href = returnTo;
    }, 400);
  }

  setToken(token: string) {
    try {
      localStorage.setItem(this.tokenKey, token);
    } catch {
      // ignore
    }
  }

  getToken(): string | null {
    try {
      return localStorage.getItem(this.tokenKey);
    } catch {
      return null;
    }
  }

  setUser(user: User) {
    try {
      localStorage.setItem(this.userKey, JSON.stringify(user));
    } catch {
      // ignore
    }
  }

  getUser(): User | null {
    try {
      const data = localStorage.getItem(this.userKey);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  }

  logout() {
    try {
      localStorage.removeItem(this.tokenKey);
      localStorage.removeItem(this.userKey);
    } catch {
      // ignore
    }
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}

export const base44 = {
  auth: new Base44Auth(),
};
