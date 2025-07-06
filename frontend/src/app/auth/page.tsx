"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { User, Lock } from "lucide-react";
import AuthLayout from "./layout";
import { useRouter } from "next/navigation";

function LoginButton({ loading }: { loading?: boolean }) {
  return (
    <Button type="submit" className="w-full" disabled={loading}>
      {loading ? "Entrando..." : "Entrar"}
    </Button>
  );
}

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nome, setNome] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (isRegister) {
        // Cadastro de usuário
        const res = await fetch("http://127.0.0.1:3000/usuarios", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nome, email, senha: password }),
        });
        if (!res.ok) {
          let msg = "Erro ao criar usuário";
          try {
            const errData = await res.json();
            msg = errData.message || JSON.stringify(errData);
          } catch {}
          throw new Error(msg);
        }
        setIsRegister(false);
        setNome("");
        setPassword("");
        setEmail("");
        alert("Usuário criado com sucesso! Faça login.");
        return;
      }
      // Login
      const res = await fetch("http://127.0.0.1:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha: password }),
      });
      if (!res.ok) throw new Error("Usuário ou senha inválidos");
      const data = await res.json();
      // Salva o token em cookie (válido para o domínio)
      document.cookie = `auth-token=${data.token}; path=/; max-age=86400`;
      router.push("/");
    } catch (err: any) {
      setError(err.message || "Erro ao processar requisição");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">GEOBRAP</CardTitle>
          <CardDescription className="text-center">
            {isRegister ? "Crie sua conta" : "Faça login para acessar sua conta"}
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {isRegister && (
              <div className="space-y-2">
                <label htmlFor="nome" className="text-sm font-medium">
                  Nome
                </label>
                <Input
                  id="nome"
                  type="text"
                  placeholder="Digite seu nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required
                />
              </div>
            )}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <div className="relative">
                <span className="absolute left-2.5 top-2.5 text-gray-500">
                  <User className="h-4 w-4" />
                </span>
                <Input
                  id="email"
                  type="email"
                  placeholder="Digite seu email"
                  className="pl-9"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Senha
              </label>
              <div className="relative">
                <span className="absolute left-2.5 top-2.5 text-gray-500">
                  <Lock className="h-4 w-4" />
                </span>
                <Input
                  id="password"
                  type="password"
                  placeholder="Digite sua senha"
                  className="pl-9"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            {error && (
              <div className="text-red-600 text-sm text-center">{error}</div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <LoginButton loading={loading} />
            <div className="flex flex-col gap-2 text-sm text-center text-gray-500">
              <button
                type="button"
                className="hover:text-blue-600 hover:underline"
                onClick={() => setIsRegister((v) => !v)}
              >
                {isRegister ? "Já tem conta? Faça login" : "Não tem conta? Cadastre-se"}
              </button>
              {!isRegister && (
                <a href="#" className="hover:text-blue-600 hover:underline">
                  Esqueceu sua senha?
                </a>
              )}
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
    </AuthLayout>
  );
}