"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Building2, HardHat, Package, FileText, Factory, ClipboardCheck, ScrollText, BookOpen, ListChecks, Menu } from 'lucide-react';

export default function Sidebar() {
  const [isMinimized, setIsMinimized] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === '/') {
      setIsMinimized(false);
      localStorage.setItem('sidebarMinimized', 'false');
    } else {
      const savedState = localStorage.getItem('sidebarMinimized');
      if (savedState === 'true') {
        setIsMinimized(true);
      }
    }
  }, [pathname]);

  useEffect(() => {
    if (pathname !== '/') {
      const timer = setTimeout(() => {
        setIsMinimized(true);
        localStorage.setItem('sidebarMinimized', 'true');
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  const handleItemClick = () => {
  };

  const handleToggleSidebar = () => {
    const newState = !isMinimized;
    setIsMinimized(newState);
    localStorage.setItem('sidebarMinimized', newState.toString());
  };

  return (
    <aside 
      className={`${isMinimized ? 'w-16' : 'w-60'} text-white p-4 min-h-screen flex flex-col transition-all duration-300 ease-in-out`} 
      style={{ background: '#2E2E2E' }}
    >
      {isMinimized ? (
        <div className="flex flex-col items-center">
          <button
            onClick={handleToggleSidebar}
            className="p-2 rounded-md transition-colors"
            style={{ transition: 'background-color 0.2s' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#343434'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      ) : (
        <nav className="flex-grow flex flex-col min-h-0">
          <ul className="flex-grow overflow-auto space-y-2">
            <li>
              <Link 
                href="/obras" 
                className="flex items-center gap-2 py-2 px-4 rounded-md transition-colors"
                style={{ transition: 'background-color 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#343434'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                onClick={handleItemClick}
              >
                <Building2 className="w-5 h-5" />
                Obras
              </Link>
            </li>
            <li>
              <Link 
                href="/equipamentos" 
                className="flex items-center gap-2 py-2 px-4 rounded-md transition-colors"
                style={{ transition: 'background-color 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#343434'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                onClick={handleItemClick}
              >
                <HardHat className="w-5 h-5" />
                Equipamentos
              </Link>
            </li>
            <li>
              <Link 
                href="/materiais" 
                className="flex items-center gap-2 py-2 px-4 rounded-md transition-colors"
                style={{ transition: 'background-color 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#343434'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                onClick={handleItemClick}
              >
                <Package className="w-5 h-5" />
                Materiais
              </Link>
            </li>
            <li>
              <Link 
                href="/fornecedores" 
                className="flex items-center gap-2 py-2 px-4 rounded-md transition-colors"
                style={{ transition: 'background-color 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#343434'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                onClick={handleItemClick}
              >
                <Factory className="w-5 h-5" />
                Fornecedores
              </Link>
            </li>
            <li>
              <Link 
                href="/fiscalizacoes" 
                className="flex items-center gap-2 py-2 px-4 rounded-md transition-colors"
                style={{ transition: 'background-color 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#343434'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                onClick={handleItemClick}
              >
                <ClipboardCheck className="w-5 h-5" />
                Fiscalizações
              </Link>
            </li>
            <li>
              <Link 
                href="/responsaveis-tecnicos" 
                className="flex items-center gap-2 py-2 px-4 rounded-md transition-colors"
                style={{ transition: 'background-color 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#343434'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                onClick={handleItemClick}
              >
                <FileText className="w-5 h-5" />
                Responsáveis Técnicos
              </Link>
            </li>
            <li>
              <Link 
                href="/relatorios" 
                className="flex items-center gap-2 py-2 px-4 rounded-md transition-colors"
                style={{ transition: 'background-color 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#343434'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                onClick={handleItemClick}
              >
                <ScrollText className="w-5 h-5" />
                Relatórios
              </Link>
            </li>
            <li>
              <Link 
                href="/diario-obra" 
                className="flex items-center gap-2 py-2 px-4 rounded-md transition-colors"
                style={{ transition: 'background-color 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#343434'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                onClick={handleItemClick}
              >
                <BookOpen className="w-5 h-5" />
                Diário Obra
              </Link>
            </li>
            <li>
              <Link 
                href="/etapas-obra" 
                className="flex items-center gap-2 py-2 px-4 rounded-md transition-colors"
                style={{ transition: 'background-color 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#343434'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                onClick={handleItemClick}
              >
                <ListChecks className="w-5 h-5" />
                Etapas Obra
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </aside>
  );
}
