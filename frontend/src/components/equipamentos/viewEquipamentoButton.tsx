"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Equipamento } from "@/types/equipamentos";
import { Fornecedor } from "@/types/fornecedores";
import { fornecedoresService } from "@/services/fornecedoresService";

interface ViewEquipamentoButtonProps {
  equipamento: Equipamento;
}

export default function ViewEquipamentoButton({ equipamento }: ViewEquipamentoButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [fornecedor, setFornecedor] = useState<Fornecedor | null>(null);
  const [loadingFornecedor, setLoadingFornecedor] = useState(false);

  useEffect(() => {
    if (isOpen && equipamento.fornecedorId) {
      loadFornecedor();
    }
  }, [isOpen, equipamento.fornecedorId]);

  const loadFornecedor = async () => {
    try {
      setLoadingFornecedor(true);
      const fornecedorData = await fornecedoresService.getFornecedorById(equipamento.fornecedorId);
      setFornecedor(fornecedorData);
    } catch (error) {
      console.error("Erro ao carregar fornecedor:", error);
      setFornecedor(null);
    } finally {
      setLoadingFornecedor(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">Ver</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden bg-white shadow-2xl border-0 p-0" style={{ borderRadius: '0.75rem' }}>
        <DialogHeader className="text-white p-4" style={{ background: '#F1860C', borderRadius: '0.75rem 0.75rem 0 0' }}>
          <DialogTitle className="text-xl font-bold">Detalhes do Equipamento</DialogTitle>
        </DialogHeader>
        
        <div className="max-h-[calc(90vh-110px)] overflow-y-auto">
          <div className="space-y-4 p-6 bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">ID</label>
                <p className="text-sm text-gray-600">{equipamento.id}</p>
              </div>
              <div>
                <label className="text-sm font-medium">Nome</label>
                <p className="text-sm text-gray-600">{equipamento.nome}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Tipo</label>
                <p className="text-sm text-gray-600">{equipamento.tipo}</p>
              </div>
              <div>
                <label className="text-sm font-medium">Marca</label>
                <p className="text-sm text-gray-600">{equipamento.marca}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Modelo</label>
                <p className="text-sm text-gray-600">{equipamento.modelo}</p>
              </div>
              <div>
                <label className="text-sm font-medium">Número de Série</label>
                <p className="text-sm text-gray-600 font-mono">{equipamento.numeroDeSerie}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Estado</label>
                <p className="text-sm text-gray-600">{equipamento.estado}</p>
              </div>
              <div>
                <label className="text-sm font-medium">Fornecedor</label>
                {loadingFornecedor ? (
                  <p className="text-sm text-blue-500">Carregando...</p>
                ) : fornecedor ? (
                  <div>
                    <p className="text-sm text-gray-600 font-medium">{fornecedor.nome}</p>
                    <p className="text-xs text-gray-500">ID: {equipamento.fornecedorId}</p>
                  </div>
                ) : (
                  <p className="text-sm text-red-600">Fornecedor não encontrado (ID: {equipamento.fornecedorId})</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}