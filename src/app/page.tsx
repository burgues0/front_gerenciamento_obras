import AppLayout from '@/components/layout-components/applayout';
import Image from "next/image";

export default function Home() {
  return (
    <AppLayout>
      
      <div className="relative w-full h-[220px] min-h-[220px]">
        <Image
          src="/capa.png"
          alt="Capa obra"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          priority
        />
        
        <div className="absolute inset-0 flex flex-col justify-center items-start pl-40 w-full" style={{ maxWidth: 800 }}>
          <h2 className="text-xl font-extrabold text-white mb-1 leading-tight drop-shadow-lg text-left">Indústria<br />Inovação e<br />Infraestrutura</h2>
          <div className="h-4" /> 
          <p className="text-white text-sm font-medium drop-shadow-md text-left">Cada etapa sob controle.<br />Cada obra no caminho certo!</p>
        </div>
      </div>
    </AppLayout>
  );
}