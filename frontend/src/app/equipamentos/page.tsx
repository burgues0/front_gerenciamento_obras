import React from "react";
import AppLayout from '@/components/layout-components/applayout';

export default function EquipamentosPage() {
  return (
    <AppLayout>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-4">Equipamentos</h1>
        <p>Bem-vindo à página de equipamentos. Aqui você pode gerenciar e visualizar os equipamentos cadastrados.</p>
      </div>
    </AppLayout>
  );
}
