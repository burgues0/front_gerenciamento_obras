"use client";

import { useState, useMemo } from "react";
import { Obra } from "@/types/obras";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import DeleteObraButton from "@/components/obras/deleteObraButton";

interface ObrasDataTableProps {
  obras: Obra[];
  onDeleteSuccess: () => void;
}

export default function ObrasDataTable({ obras, onDeleteSuccess }: ObrasDataTableProps) {
  const [filter, setFilter] = useState('');

  const filteredObras = useMemo(() => {
    if (!filter) return obras;
    const lowercasedFilter = filter.toLowerCase();
    return obras.filter(obra =>
      obra.nome.toLowerCase().includes(lowercasedFilter) ||
      obra.status.toLowerCase().includes(lowercasedFilter) ||
      obra.data_inicio.includes(lowercasedFilter) ||
      (obra.data_conclusao && obra.data_conclusao.includes(lowercasedFilter))
    );
  }, [obras, filter]);

  return (
    <div>
      <div className="mb-4">
        <Input
          placeholder="Filtrar obras por nome, status, data..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="max-w-sm"
        />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Início</TableHead>
            <TableHead>Conclusão</TableHead>
            <TableHead>Orçamento</TableHead>
            <TableHead>Concluído (%)</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
        </TableBody>
      </Table>
    </div>
  );
}