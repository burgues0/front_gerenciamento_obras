"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Material } from "@/types/materiais";

interface ViewMaterialButtonProps {
  material: Material;
}

const formatPrice = (price: number | string): string => {
  const numPrice = typeof price === 'string' ? parseFloat(price) : price;
  return isNaN(numPrice) ? 'R$ 0,00' : numPrice.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
};

export default function ViewMaterialButton({ material }: ViewMaterialButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">Ver</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden bg-white shadow-2xl border-0 p-0" style={{ borderRadius: '0.75rem' }}>
        <DialogHeader className="text-white p-4" style={{ background: '#F1860C', borderRadius: '0.75rem 0.75rem 0 0' }}>
          <DialogTitle className="text-xl font-bold">Detalhes do Material</DialogTitle>
        </DialogHeader>
        <div className="max-h-[calc(90vh-110px)] overflow-y-auto">
          <div className="space-y-4 p-6 bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">ID</label>
                <p className="text-sm text-gray-600">{material.id}</p>
              </div>
              <div>
                <label className="text-sm font-medium">Código</label>
                <p className="text-sm text-gray-600 font-mono">{material.codigo}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Nome</label>
                <p className="text-sm text-gray-600">{material.nome}</p>
              </div>
              <div>
                <label className="text-sm font-medium">Fabricante</label>
                <p className="text-sm text-gray-600">{material.fabricante || 'Não informado'}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Modelo</label>
                <p className="text-sm text-gray-600">{material.modelo || 'Não informado'}</p>
              </div>
              <div>
                <label className="text-sm font-medium">Unidade de Medida</label>
                <p className="text-sm text-gray-600">{material.unidadeMedida}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Preço Unitário</label>
                <p className="text-sm text-gray-600">
                  {formatPrice(material.precoUnitario)}
                </p>
              </div>
              <div>
                {/* Campo removido */}
              </div>
            </div>

            {material.descricao && (
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="text-sm font-medium">Descrição</label>
                  <p className="text-sm text-gray-600">{material.descricao}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
