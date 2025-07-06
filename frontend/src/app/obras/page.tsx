import React from "react";
import AppLayout from '@/components/layout-components/applayout';

export default function ObrasPage() {
  return (
    <AppLayout>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-4">Obras</h1>
        <p>Bem-vindo à página de obras. Aqui você pode gerenciar e visualizar as obras cadastradas.</p>
      </div>
    </AppLayout>
  );
}
