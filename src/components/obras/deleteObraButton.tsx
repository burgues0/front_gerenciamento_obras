"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { obrasService } from "@/services/obrasService";

interface DeleteObraButtonProps {
  obraId: number;
  onSuccess: () => void;
}

export default function DeleteObraButton({ obraId, onSuccess }: DeleteObraButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await obrasService.deleteObra(obraId);
      onSuccess();
      setIsOpen(false);
    } catch (err: any) {
      setError(err.message || "Erro ao excluir obra");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
    </Dialog>
  );
}