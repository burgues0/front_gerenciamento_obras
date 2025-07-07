"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Obra } from "@/types/obras";
import { ObrasService } from "@/lib/api";
import DeleteObraButton from "@/components/obras/deleteObraButton";

export default function ObraDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);

  const [obra, setObra] = useState<Obra | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchObra = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await ObrasService.getById(id.toString());
      setObra(data);
    } catch (err: any) {
      setError(err.message || "Erro ao carregar detalhes da obra.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchObra();
    }
  }, [id, fetchObra]);

  const handleDeleteSuccess = () => {
    router.push("/obras");
  };

  if (loading) return <p className="p-6">Carregando detalhes da obra...</p>;
  if (error) return <p className="text-red-500 p-6">Erro: {error}</p>;
  if (!obra) return <p className="p-6">Obra não encontrada.</p>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Detalhes da Obra: {obra.nome}</h1>
        <div className="flex gap-2">
          <Link href={`/obras/${obra.id}/edit`}>
            <Button variant="outline">Editar Obra</Button>
          </Link>
          <DeleteObraButton obraId={obra.id} onSuccess={handleDeleteSuccess} />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informações da Obra</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="font-semibold">ID:</p>
            <p>{obra.id}</p>
          </div>
          <div>
            <p className="font-semibold">Nome:</p>
            <p>{obra.nome}</p>
          </div>
          <div>
            <p className="font-semibold">Descrição:</p>
            <p>{obra.descricao}</p>
          </div>
          <div>
            <p className="font-semibold">Status:</p>
            <p>{obra.status}</p>
          </div>
          <div>
            <p className="font-semibold">Data de Início:</p>
            <p>{obra.data_inicio}</p>
          </div>
          <div>
            <p className="font-semibold">Data de Conclusão:</p>
            <p>{obra.data_conclusao || 'Não informada'}</p>
          </div>
          <div>
            <p className="font-semibold">Orçamento Total:</p>
            <p>R$ {obra.orcamento_total.toFixed(2)}</p>
          </div>
          <div>
            <p className="font-semibold">Gastos Atualizados:</p>
            <p>R$ {obra.gastos_atualizados.toFixed(2)}</p>
          </div>
          <div>
            <p className="font-semibold">Percentual Concluído:</p>
            <p>{obra.percentual_concluido.toFixed(2)}%</p>
          </div>
          <div>
            <p className="font-semibold">Latitude:</p>
            <p>{obra.latitude !== null ? obra.latitude : 'N/A'}</p>
          </div>
          <div>
            <p className="font-semibold">Longitude:</p>
            <p>{obra.longitude !== null ? obra.longitude : 'N/A'}</p>
          </div>
          {/* endereço, etapas, diários etc etc*/}
        </CardContent>
      </Card>
    </div>
  );
}