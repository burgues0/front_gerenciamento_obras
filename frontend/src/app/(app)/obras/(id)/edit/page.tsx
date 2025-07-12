"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UpdateObraDto, Obra } from "@/types/obras";
import { ObrasService } from "@/lib/api";
import ObraForm from "@/components/obras/obraForm";

export default function EditObraPage() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);

  const [obra, setObra] = useState<Obra | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchObra = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await ObrasService.getById(id.toString());
      setObra(data);
    } catch (err: any) {
      setError(err.message || "Erro ao carregar dados da obra para edição.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchObra();
    }
  }, [id, fetchObra]);

  const handleSubmit = async (data: UpdateObraDto) => {
    setIsSaving(true);
    setError(null);
    try {
      await ObrasService.update(id.toString(), data);
      router.push(`/obras/${id}`);
    } catch (err: any) {
      setError(err.message || "Erro ao atualizar obra.");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) return <p className="p-6">Carregando dados da obra...</p>;
  if (error) return <p className="text-red-500 p-6">Erro: {error}</p>;
  if (!obra) return <p className="p-6">Obra não encontrada para edição.</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Editar Obra: {obra.nome}</h1>
      <Card>
        <CardHeader>
          <CardTitle>Formulário de Edição</CardTitle>
        </CardHeader>
        <CardContent>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <ObraForm initialData={obra} onSubmit={handleSubmit} isLoading={isSaving} />
        </CardContent>
      </Card>
    </div>
  );
}