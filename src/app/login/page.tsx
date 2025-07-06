"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { User, Lock } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha: password }),
      });
      if (!res.ok) {
        let msg = "Usuário ou senha inválidos";
        try {
          const errData = await res.json();
          msg = errData.message || JSON.stringify(errData);
        } catch {}
        throw new Error(msg);
      }
      const data = await res.json();
      document.cookie = `auth-token=${data.token}; path=/; max-age=86400`;
      // Redireciona para a página original, se houver
      const redirectTo = searchParams.get("redirect") || "/";
      window.location.href = redirectTo;
    } catch (err: any) {
      setError(err.message || "Erro ao fazer login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: '#F9F9F9' }}>
      <Card className="w-full max-w-md shadow-2xl rounded-3xl border-0 bg-white/95 backdrop-blur-md relative z-20 p-2">
        <CardHeader className="space-y-1 pb-2">
          <CardTitle className="text-3xl text-center font-extrabold tracking-tight font-[Poppins,Inter,sans-serif]" style={{ color: '#2C607A' }}>Login</CardTitle>
          <CardDescription className="text-center text-gray-500 text-base">
            Faça login para acessar o sistema
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6 pt-2">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-semibold text-black font-[Poppins,Inter,sans-serif]">Email</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#F1860C]">
                  <User className="h-5 w-5" />
                </span>
                <Input
                  id="email"
                  type="email"
                  placeholder="Digite seu email"
                  className="pl-11 py-5 bg-white !bg-white border-2 border-gray-300 rounded-xl focus:border-[#F1860C] focus:ring-[#F1860C]/30 text-black placeholder:text-gray-300 transition-all font-sans placeholder:text-gray-300 text-lg"
                  style={{ fontFamily: 'Inter, Arial, sans-serif' }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-semibold text-black font-[Poppins,Inter,sans-serif]">Senha</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#F1860C]">
                  <Lock className="h-5 w-5" />
                </span>
                <Input
                  id="password"
                  type="password"
                  placeholder="Digite sua senha"
                  className="pl-11 py-5 bg-white !bg-white border-2 border-gray-300 rounded-xl focus:border-[#F1860C] focus:ring-[#F1860C]/30 text-black placeholder:text-gray-300 transition-all font-sans placeholder:text-gray-300 text-lg"
                  style={{ fontFamily: 'Inter, Arial, sans-serif' }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            {error && (
              <div className="text-red-500 text-sm text-center font-medium mt-2">{error}</div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 pt-2">
            <Button type="submit" className="w-full bg-[#F1860C] hover:bg-[#d97706] text-white font-bold shadow-lg rounded-xl py-3 text-lg transition-colors" disabled={loading}>
              {loading ? "Entrando..." : "Entrar"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
