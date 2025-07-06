"use client";
import React from 'react';
import { useRouter } from 'next/navigation';

function LogoutButton() {
  const router = useRouter();
  const handleLogout = () => {
    document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    router.push('/login');
  };
  return (
    <button
      onClick={handleLogout}
      className="ml-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
    >
      Sair
    </button>
  );
}

export default function Header() {
  return (
    <header className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">GEOBRAP - Gerenciamento de Obras Públicas</h1>
        <nav>
          <ul className="flex space-x-4 items-center">
            <li><a href="#" className="hover:text-blue-200">Início</a></li>
            <li><a href="#" className="hover:text-blue-200">Sobre</a></li>
            <li><a href="#" className="hover:text-blue-200">Contato</a></li>
            <li><LogoutButton /></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}