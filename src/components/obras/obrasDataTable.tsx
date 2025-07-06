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
          {filteredObras.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center">Nenhuma obra encontrada.</TableCell>
            </TableRow>
          ) : (
            filteredObras.map((obra) => (
              <TableRow key={obra.id}>
                <TableCell className="font-medium">{obra.id}</TableCell>
                <TableCell>{obra.nome}</TableCell>
                <TableCell>{obra.status}</TableCell>
                <TableCell>{obra.data_inicio}</TableCell>
                <TableCell>{obra.data_conclusao || 'N/A'}</TableCell>
                <TableCell>R$ {obra.orcamento_total.toFixed(2)}</TableCell>
                <TableCell>{obra.percentual_concluido.toFixed(2)}%</TableCell>
                <TableCell className="text-right">
                  <Link href={`/obras/${obra.id}`}>
                    <Button variant="outline" size="sm" className="mr-2">Ver</Button>
                  </Link>
                  <Link href={`/obras/${obra.id}/edit`}>
                    <Button variant="outline" size="sm" className="mr-2">Editar</Button>
                  </Link>
                  <DeleteObraButton obraId={obra.id} onSuccess={onDeleteSuccess} />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}