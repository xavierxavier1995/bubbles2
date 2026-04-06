import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, Search, ChevronDown, Instagram, Youtube, MessageCircle, Package, Star, Truck, RefreshCw, CheckCircle } from 'lucide-react';

const AnnouncementBar = () => (
  <div className="bg-brand-dark text-white h-[38px] flex items-center justify-center text-[11px] font-bold uppercase tracking-[0.08em] gap-8 px-4">
    <div className="flex items-center gap-2">
      <span>Frete Grátis em compras acima de R$ 299</span>
      <div className="w-1 h-1 bg-brand-pink rounded-full" />
    </div>
    <div className="hidden md:flex items-center gap-2">
      <span>Até 6x sem juros no cartão</span>
      <div className="w-1 h-1 bg-brand-pink rounded-full" />
    </div>
    <button className="bg-action-green text-white px-2.5 py-0.5 rounded-full text-[10px] font-black">
      APROVEITE
    </button>
  </div>
);

const Navbar = () => (
  <nav className="bg-white h-16 border-b border-[#E5E5E5] flex items-center justify-between px-5 md:px-10 sticky top-0 z-50 pt-1 md:pt-2">
    <div className="flex items-center gap-8">
      <Link to="/home" className="h-8 flex items-center">
        <span className="font-black text-2xl tracking-tighter text-brand-dark">BUBBLES</span>
      </Link>
      <div className="hidden lg:flex items-center gap-6 text-[13px] font-semibold text-brand-dark">
        <a href="#" className="flex items-center gap-1 hover:bg-[#F7F7F7] px-2 py-1 rounded">SHAMPOOS <ChevronDown size={14} /></a>
        <a href="#" className="flex items-center gap-1 hover:bg-[#F7F7F7] px-2 py-1 rounded">LINHAS <ChevronDown size={14} /></a>
        <a href="#" className="hover:bg-[#F7F7F7] px-2 py-1 rounded">KITS</a>
        <div className="relative group">
          <button className="hover:bg-[#F7F7F7] px-2 py-1 rounded flex items-center gap-1">
            B2B <ChevronDown size={14} />
          </button>
          <div className="absolute top-full left-0 bg-white border border-[#E5E5E5] rounded-lg shadow-xl py-2 min-w-[160px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
            <Link to="/distribuidor-a" className="block px-4 py-2 hover:bg-[#F7F7F7] text-xs font-bold uppercase tracking-widest">Variação A</Link>
            <Link to="/distribuidor-b" className="block px-4 py-2 hover:bg-[#F7F7F7] text-xs font-bold uppercase tracking-widest">Variação B</Link>
            <Link to="/distribuidor-c" className="block px-4 py-2 hover:bg-[#F7F7F7] text-xs font-bold uppercase tracking-widest">Variação C</Link>
          </div>
        </div>
        <Link to="/design-system-docs" className="hover:bg-[#F7F7F7] px-2 py-1 rounded text-brand-pink">DESIGN SYSTEM</Link>
      </div>
    </div>
    <div className="flex items-center gap-2 md:gap-4">
      <button className="w-9 h-9 flex items-center justify-center rounded hover:bg-[#F7F7F7]"><Search size={20} /></button>
      <button className="w-9 h-9 flex items-center justify-center rounded hover:bg-[#F7F7F7]"><User size={20} /></button>
      <button className="w-9 h-9 flex items-center justify-center rounded hover:bg-[#F7F7F7] relative">
        <ShoppingCart size={20} />
        <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-action-green text-white text-[9px] font-black flex items-center justify-center rounded-full">0</span>
      </button>
    </div>
  </nav>
);

const Footer = () => (
  <footer className="bg-brand-dark text-white/70 pt-16 pb-8 px-5 md:px-10">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
      <div>
        <h4 className="text-white text-[11px] font-black uppercase tracking-[0.15em] mb-6 flex items-center gap-2">
          <Package size={20} /> COMPRAS NO SITE
        </h4>
        <ul className="flex flex-col gap-3 text-[11px] font-medium">
          <li><a href="#" className="hover:text-brand-pink transition-colors">Shampoos</a></li>
          <li><a href="#" className="hover:text-brand-pink transition-colors">Condicionadores</a></li>
          <li><a href="#" className="hover:text-brand-pink transition-colors">Perfumes</a></li>
          <li><a href="#" className="hover:text-brand-pink transition-colors">Kits Profissionais</a></li>
        </ul>
      </div>
      <div>
        <h4 className="text-white text-[11px] font-black uppercase tracking-[0.15em] mb-6 flex items-center gap-2">
          <User size={20} /> PARCEIROS
        </h4>
        <ul className="flex flex-col gap-3 text-[11px] font-medium">
          <li><Link to="/distribuidor-a" className="hover:text-brand-pink transition-colors">Seja Distribuidor</Link></li>
          <li><a href="#" className="hover:text-brand-pink transition-colors">Área do Lojista</a></li>
          <li><Link to="/sitemap" className="hover:text-brand-pink transition-colors">Mapa do Site</Link></li>
          <li><a href="#" className="hover:text-brand-pink transition-colors">Encontre um Pet Shop</a></li>
        </ul>
      </div>
      <div>
        <h4 className="text-white text-[11px] font-black uppercase tracking-[0.15em] mb-6 flex items-center gap-2">
          <Package size={20} /> LINHAS
        </h4>
        <ul className="flex flex-col gap-3 text-[11px] font-medium">
          <li><a href="#" className="hover:text-brand-pink transition-colors">Linha PRO</a></li>
          <li><a href="#" className="hover:text-brand-pink transition-colors">Linha Essential</a></li>
          <li><a href="#" className="hover:text-brand-pink transition-colors">Linha Xperience</a></li>
          <li><a href="#" className="hover:text-brand-pink transition-colors">Linha Collora</a></li>
        </ul>
      </div>
      <div>
        <h4 className="text-white text-[11px] font-black uppercase tracking-[0.15em] mb-6 flex items-center gap-2">
          <MessageCircle size={20} /> CONTATO
        </h4>
        <ul className="flex flex-col gap-3 text-[11px] font-medium">
          <li><a href="#" className="hover:text-brand-pink transition-colors">WhatsApp: (11) 99999-9999</a></li>
          <li><a href="#" className="hover:text-brand-pink transition-colors">contato@bubbles.com.br</a></li>
          <li className="flex gap-4 mt-4">
            <a href="#" className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-action-green hover:scale-110 transition-all"><Instagram size={16} /></a>
            <a href="#" className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-action-green hover:scale-110 transition-all"><Youtube size={16} /></a>
            <a href="#" className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-action-green hover:scale-110 transition-all"><MessageCircle size={16} /></a>
          </li>
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto border-t border-white/10 pt-8 flex flex-col md:row items-center justify-between gap-4 text-[10px] font-bold uppercase tracking-widest">
      <span>© 2025 BUBBLES PET COSMETICS. TODOS OS DIREITOS RESERVADOS.</span>
      <div className="flex gap-6">
        <a href="#">POLÍTICA DE PRIVACIDADE</a>
        <a href="#">TERMOS DE USO</a>
      </div>
    </div>
  </footer>
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <AnnouncementBar />
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
    </div>
  );
}
