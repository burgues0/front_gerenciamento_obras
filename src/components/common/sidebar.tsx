import React from 'react';
import Link from 'next/link';
import { Building2, HardHat, Package, FileText, Factory, ClipboardCheck, ScrollText, BookOpen, ListChecks } from 'lucide-react';

export default function Sidebar() {
  return (
    <aside className="w-60 text-white p-4 min-h-screen flex flex-col" style={{ background: '#2E2E2E' }}>
      {/* Removido o topo laranja */}
      <nav className="flex-grow flex flex-col min-h-0">
        <ul className="flex-grow overflow-auto space-y-2">
          <li>
            <Link href="/obras" className="flex items-center gap-2 py-2 px-4 rounded-md hover:bg-gray-700 transition-colors">
              <Building2 className="w-5 h-5" />
              Obras
            </Link>
          </li>
          <li>
            <Link href="/equipamentos" className="flex items-center gap-2 py-2 px-4 rounded-md hover:bg-gray-700 transition-colors">
              <HardHat className="w-5 h-5" />
              Equipamentos
            </Link>
          </li>
          <li>
            <Link href="/materiais" className="flex items-center gap-2 py-2 px-4 rounded-md hover:bg-gray-700 transition-colors">
              <Package className="w-5 h-5" />
              Materiais
            </Link>
          </li>
          <li>
            <Link href="/fornecedores" className="flex items-center gap-2 py-2 px-4 rounded-md hover:bg-gray-700 transition-colors">
              <Factory className="w-5 h-5" />
              Fornecedores
            </Link>
          </li>
          <li>
            <Link href="/fiscalizacoes" className="flex items-center gap-2 py-2 px-4 rounded-md hover:bg-gray-700 transition-colors">
              <ClipboardCheck className="w-5 h-5" />
              Fiscalizações
            </Link>
          </li>
          <li>
            <Link href="/responsaveis-tecnicos" className="flex items-center gap-2 py-2 px-4 rounded-md hover:bg-gray-700 transition-colors">
              <FileText className="w-5 h-5" />
              Responsáveis Técnicos
            </Link>
          </li>
          <li>
            <Link href="/relatorios" className="flex items-center gap-2 py-2 px-4 rounded-md hover:bg-gray-700 transition-colors">
              <ScrollText className="w-5 h-5" />
              Relatórios
            </Link>
          </li>
          <li>
            <Link href="/diario-obra" className="flex items-center gap-2 py-2 px-4 rounded-md hover:bg-gray-700 transition-colors">
              <BookOpen className="w-5 h-5" />
              Diário Obra
            </Link>
          </li>
          <li>
            <Link href="/etapas-obra" className="flex items-center gap-2 py-2 px-4 rounded-md hover:bg-gray-700 transition-colors">
              <ListChecks className="w-5 h-5" />
              Etapas Obra
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}