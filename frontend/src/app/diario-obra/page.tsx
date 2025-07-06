import React from "react";
import AppLayout from '@/components/layout-components/applayout';

export default function DiarioObraPage() {
  return (
    <AppLayout>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-4">Diário de Obra</h1>
        <p>Bem-vindo à página de diário de obra. Aqui você pode gerenciar e visualizar o diário de obra cadastrado.</p>
      </div>
    </AppLayout>
  );
}
