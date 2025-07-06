import React from "react";
import AppLayout from '@/components/layout-components/applayout';

export default function MateriaisPage() {
  return (
    <AppLayout>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-4">Materiais</h1>
        <p>Bem-vindo à página de materiais. Aqui você pode gerenciar e visualizar os materiais cadastrados.</p>
      </div>
    </AppLayout>
  );
}
