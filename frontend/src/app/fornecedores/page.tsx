import React from "react";
import AppLayout from '@/components/layout-components/applayout';

export default function FornecedoresPage() {
  return (
    <AppLayout>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-4">Fornecedores</h1>
        <p>Bem-vindo à página de fornecedores. Aqui você pode gerenciar e visualizar os fornecedores cadastrados.</p>
      </div>
    </AppLayout>
  );
}
