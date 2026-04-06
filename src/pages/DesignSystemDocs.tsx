import { useState, useEffect } from 'react';
import { 
  ShoppingCart, User, Search, ChevronDown, Instagram, Youtube, MessageCircle, 
  Package, Droplet, Wind, Scissors, Star, Truck, RefreshCw, CheckCircle, 
  X, ArrowRight, Shield, Award, Leaf, Zap, Clock, TrendingUp, DollarSign, 
  Users, Briefcase, BarChart2, Phone, Mail, HelpCircle, Info, AlertCircle, 
  Check, Edit3, Eye, EyeOff, Loader, Hash, Layers, Sliders, Wrench, Sun, Minus, Cloud, 
  Feather, Circle, Heart, Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';

const ColorSwatch = ({ name, token, hex, rgb, cmyk, description }: { name: string, token: string, hex: string, rgb?: string, cmyk?: string, description?: string }) => (
  <div className="flex flex-col gap-2">
    <div className="w-full h-20 rounded-lg border border-[#E5E5E5] shadow-sm" style={{ backgroundColor: hex }} />
    <div className="flex flex-col">
      <span className="text-[11px] font-bold uppercase tracking-wider text-brand-dark">{name}</span>
      <span className="text-[10px] font-mono text-muted">{token}</span>
      <div className="flex flex-wrap gap-x-2 gap-y-0.5 mt-1">
        <span className="text-[9px] font-mono text-muted uppercase">HEX: {hex}</span>
        {rgb && <span className="text-[9px] font-mono text-muted uppercase">RGB: {rgb}</span>}
        {cmyk && <span className="text-[9px] font-mono text-muted uppercase">CMYK: {cmyk}</span>}
      </div>
      {description && <p className="text-[9px] text-muted mt-1 leading-tight">{description}</p>}
    </div>
  </div>
);

const IntensityScale = ({ baseHex, name }: { baseHex: string, name: string }) => {
  // Simple helper to show opacity variations as intensity
  const opacities = [1, 0.8, 0.6, 0.4, 0.2, 0.1];
  return (
    <div className="flex flex-col gap-4">
      <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted">Escala de Intensidade: {name}</h4>
      <div className="flex gap-2">
        {opacities.map((op) => (
          <div key={op} className="flex-1 flex flex-col gap-1">
            <div 
              className="h-12 rounded-md border border-[#E5E5E5]" 
              style={{ backgroundColor: baseHex, opacity: op }} 
            />
            <span className="text-[8px] font-mono text-center text-muted">{Math.round(op * 100)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const SectionHeader = ({ title, subtitle, id }: { title: string, subtitle?: string, id: string }) => (
  <div id={id} className="mb-10 pt-20">
    <h2 className="text-3xl font-black mb-2">{title}</h2>
    {subtitle && <p className="text-muted text-sm">{subtitle}</p>}
    <div className="h-1 w-20 bg-brand-pink mt-4 rounded-full" />
  </div>
);

const ButtonDemo = ({ label, variant, size = 'md', state, rounded }: any) => {
  let className = "";
  if (variant === 'green') className = "btn-primary-green";
  if (variant === 'dark') className = "btn-dark";
  if (variant === 'outline') className = "btn-outline-dark";
  if (variant === 'outline-pink') className = "btn-outline-pink";
  if (variant === 'outline-super-pink') className = "btn-outline-super-pink";
  if (variant === 'pink-solid') className = "bg-brand-pink text-brand-dark font-black uppercase text-[13px] px-6 py-3 rounded-full hover:scale-105 transition-all";
  if (variant === 'black-pink') className = "bg-brand-dark text-brand-pink font-black uppercase text-[13px] px-6 py-3 rounded-md flex items-center gap-2 hover:gap-4 transition-all";
  if (variant === 'ghost') className = "btn-ghost";

  if (size === 'sm') className += " btn-sm";
  if (size === 'md') className += " btn-md";
  if (size === 'lg') className += " btn-lg";
  
  if (rounded === 'none') className += " !rounded-none";
  if (rounded === 'sm') className += " !rounded-sm";
  if (rounded === 'md') className += " !rounded-md";
  if (rounded === 'lg') className += " !rounded-lg";
  if (rounded === 'full') className += " !rounded-full";

  const isDisabled = state === 'disabled';
  const isLoading = state === 'loading';

  return (
    <div className="flex flex-col items-center gap-2">
      <span className="text-[10px] font-mono text-muted uppercase">{state || 'default'}</span>
      <button 
        className={`${className} ${isDisabled ? 'opacity-40 cursor-not-allowed' : ''} ${isLoading ? 'relative !text-transparent' : ''}`}
        disabled={isDisabled}
      >
        {isLoading && <Loader2 className={`absolute inset-0 m-auto animate-spin ${variant === 'outline' || variant === 'ghost' ? 'text-brand-dark' : 'text-white'}`} size={16} />}
        {label}
        {variant === 'black-pink' && <ArrowRight size={16} />}
      </button>
    </div>
  );
};

const Stepper = () => {
  const [count, setCount] = useState(1);
  return (
    <div className="flex items-center border-[1.5px] border-[#E5E5E5] rounded-lg overflow-hidden bg-white w-fit">
      <button 
        onClick={() => setCount(Math.max(1, count - 1))}
        className="w-10 h-11 bg-[#F7F7F7] flex items-center justify-center text-[18px] font-normal hover:bg-[#EFEFEF] transition-colors border-none cursor-pointer"
      >
        −
      </button>
      <div className="w-[50px] h-11 flex items-center justify-center font-bold text-[15px] border-x border-[#E5E5E5] font-figtree">
        {count}
      </div>
      <button 
        onClick={() => setCount(count + 1)}
        className="w-10 h-11 bg-[#F7F7F7] flex items-center justify-center text-[18px] font-normal hover:bg-[#EFEFEF] transition-colors border-none cursor-pointer"
      >
        +
      </button>
    </div>
  );
};

const B2BFormDemo = () => {
  const [step, setStep] = useState(2);
  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  return (
    <div className="bg-white rounded-[20px] max-w-[480px] w-full p-10 shadow-[0_20px_60px_rgba(0,0,0,0.25)] relative border border-[#E5E5E5]">
      <button className="absolute top-6 right-6 text-muted hover:text-brand-dark transition-colors">
        <X size={20} />
      </button>
      
      <div className="mb-8">
        <div className="flex justify-between items-end mb-2">
          <span className="text-[11px] font-black uppercase tracking-[0.2em] text-muted">Etapa {step} de {totalSteps}</span>
          <span className="text-[11px] font-black uppercase tracking-[0.2em] text-brand-dark">Perfil do Negócio</span>
        </div>
        <div className="h-[3px] w-full bg-[#E5E5E5] rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-brand-dark"
          />
        </div>
      </div>

      <div className="space-y-6 mb-10">
        <div>
          <label className="block text-[13px] font-semibold text-brand-dark mb-2">Nome da Empresa</label>
          <input type="text" className="input-bubbles" placeholder="Ex: Pet Shop Bubbles" />
        </div>
        <div>
          <label className="block text-[13px] font-semibold text-brand-dark mb-2">CNPJ</label>
          <input type="text" className="input-bubbles" placeholder="00.000.000/0000-00" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[13px] font-semibold text-brand-dark mb-2">Cidade</label>
            <input type="text" className="input-bubbles" placeholder="São Paulo" />
          </div>
          <div>
            <label className="block text-[13px] font-semibold text-brand-dark mb-2">Estado</label>
            <input type="text" className="input-bubbles" placeholder="SP" />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <button className="btn-dark btn-full">AVANÇAR</button>
        <button className="btn-ghost text-[13px] font-black uppercase tracking-widest flex items-center justify-center gap-2">
          <ArrowRight size={16} className="rotate-180" /> Voltar
        </button>
      </div>
    </div>
  );
};

const ProductCardDemo = () => {
  return (
    <div className="bg-white border border-[#E5E5E5] rounded-[12px] overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.07)] transition-all duration-250 hover:shadow-[0_8px_24px_rgba(0,0,0,0.14)] hover:-translate-y-1 cursor-pointer w-full max-w-[280px]">
      <div className="aspect-square bg-[#F7F7F7] relative overflow-hidden">
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
          <span className="bg-[#E03E3E] text-white text-[10px] font-black uppercase px-2 py-1 rounded-[4px] leading-none tracking-[0.06em]">PROMOÇÃO</span>
          <span className="bg-action-green text-white text-[10px] font-black uppercase px-2 py-1 rounded-full leading-none tracking-[0.06em]">15% OFF</span>
        </div>
        <img src="https://picsum.photos/seed/bubbles-p1/400/400" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
      </div>
      <div className="p-4">
        <div className="flex gap-1 mb-2">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star key={s} size={12} fill="#F5A623" color="#F5A623" />
          ))}
        </div>
        <h3 className="text-[13px] font-semibold text-brand-dark leading-[1.35] line-clamp-2 mb-4 h-9">
          Shampoo Profissional EGO 5L - Concentrado
        </h3>
        <div className="mb-4">
          <span className="text-[13px] text-[#AEAEAE] line-through block">R$ 299,90</span>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-black tracking-[-0.02em] text-brand-dark">R$ 249,90</span>
          </div>
          <span className="text-[11px] text-muted block mt-1">ou 3x de R$ 83,30 sem juros</span>
          <div className="flex items-center gap-1.5 mt-2 text-brand-dark">
            <CashbackIcon size={14} />
            <span className="text-[10px] font-bold">Ganhe <strong className="font-black">R$ 12,50</strong> de cashback</span>
          </div>
        </div>
        <button className="btn-primary-green w-full !py-2.5 !text-[11px]">COMPRAR</button>
      </div>
    </div>
  );
};

const CashbackIcon = ({ size = 16, className = "" }: { size?: number, className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.5" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
    <path d="M21 3v5h-5" />
    <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
    <path d="M3 21v-5h5" />
    <path d="M12 7v10" />
    <path d="M16 8h-4.5a2.5 2.5 0 0 0 0 5h3a2.5 2.5 0 0 1 0 5H8" />
  </svg>
);

const InfoTable = ({ rendimento, custo, diluicao }: any) => (
  <div className="flex items-center bg-[#F7F7F7] rounded-[18px] px-8 py-6 w-full max-w-2xl border border-[#E5E5E5]/30">
    <div className="flex-1 text-center">
      <span className="block text-[11px] font-bold uppercase tracking-[0.12em] text-[#999999] mb-1">RENDIMENTO</span>
      <span className="text-[18px] font-bold text-brand-dark">{rendimento}</span>
    </div>
    <div className="w-[1px] h-10 bg-[#E5E5E5] mx-4" />
    <div className="flex-1 text-center">
      <span className="block text-[11px] font-bold uppercase tracking-[0.12em] text-[#999999] mb-1">CUSTO/BANHO</span>
      <span className="text-[18px] font-bold text-brand-dark">{custo}</span>
    </div>
    <div className="w-[1px] h-10 bg-[#E5E5E5] mx-4" />
    <div className="flex-1 text-center">
      <span className="block text-[11px] font-bold uppercase tracking-[0.12em] text-[#999999] mb-1">DILUIÇÃO</span>
      <span className="text-[18px] font-bold text-brand-dark">{diluicao}</span>
    </div>
  </div>
);

const ProductTabs = ({ vertical = false }: { vertical?: boolean }) => {
  const tabs = ['Descrição', 'Avaliações', 'Análises', 'Composição'];
  const [activeTab, setActiveTab] = useState(tabs[0]);

  if (vertical) {
    return (
      <div className="flex gap-10">
        <div className="w-48 flex flex-col border-r border-[#E5E5E5]">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-4 pr-8 text-left text-[13px] font-bold uppercase tracking-wider transition-all border-r-2 -mr-[2px] ${
                activeTab === tab ? 'text-brand-dark border-brand-dark' : 'text-muted border-transparent hover:text-brand-dark'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="flex-1 py-4">
          <h4 className="text-xl font-black mb-4">{activeTab}</h4>
          <p className="text-[14px] leading-relaxed text-muted">
            Conteúdo da aba {activeTab}. Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="border-b border-[#E5E5E5] flex gap-10">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-4 text-[13px] font-bold uppercase tracking-wider transition-all border-b-2 -mb-[1px] ${
              activeTab === tab ? 'text-brand-dark border-brand-dark' : 'text-muted border-transparent hover:text-brand-dark'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="py-8">
        <h4 className="text-xl font-black mb-4">{activeTab}</h4>
        <p className="text-[14px] leading-relaxed text-muted">
          Conteúdo da aba {activeTab}. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </div>
    </div>
  );
};

const IconBox = ({ icon: Icon, name, usage }: any) => (
  <div className="flex flex-col items-center p-4 border border-[#E5E5E5] rounded-lg bg-[#F7F7F7] group hover:bg-white hover:shadow-md transition-all">
    <Icon size={24} strokeWidth={1.5} className="mb-3 text-brand-dark group-hover:text-action-green transition-colors" />
    <span className="text-[11px] font-bold uppercase tracking-wider mb-1">{name}</span>
    <span className="text-[10px] text-muted text-center">{usage}</span>
  </div>
);

export default function DesignSystemDocs() {
  const [activeSection, setActiveSection] = useState('hero');

  const sections = [
    { id: 'hero', label: 'Hero' },
    { id: 'logos', label: 'Logos & Sub-marcas' },
    { id: 'colors', label: 'Cores' },
    { id: 'typography', label: 'Tipografia' },
    { id: 'icons', label: 'Ícones' },
    { id: 'spacing', label: 'Espaçamento' },
    { id: 'grid-layout', label: 'Grid & Layout' },
    { id: 'borders-shadows', label: 'Bordas & Sombras' },
    { id: 'buttons', label: 'Botões' },
    { id: 'forms', label: 'Formulários' },
    { id: 'b2b-form', label: 'Formulário B2B' },
    { id: 'cards', label: 'Cards de Produto' },
    { id: 'product-specific', label: 'Componentes de Produto' },
    { id: 'badges', label: 'Badges & Etiquetas' },
    { id: 'motion', label: 'Motion' },
    { id: 'product-categories', label: 'Categorias' },
    { id: 'copywriting', label: 'Copywriting' },
    { id: 'tone-of-voice', label: 'Tom de Voz' },
    { id: 'brand-personality', label: 'Personalidade' },
    { id: 'competitive-differentials', label: 'Diferenciais' },
    { id: 'brand-guidelines', label: 'Diretrizes' },
    { id: 'backgrounds-gradients', label: 'Backgrounds' },
    { id: 'tokens', label: 'Tokens CSS' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element && element.offsetTop <= scrollPosition && element.offsetTop + element.offsetHeight > scrollPosition) {
          setActiveSection(section.id);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[#FDFDFD] flex flex-col">
      <div className="flex flex-grow">
      {/* Sidebar */}
      <aside className="hidden lg:block w-64 border-r border-[#E5E5E5] sticky top-0 h-screen p-8 overflow-y-auto scrollbar-hide">
        <div className="mb-10">
          <span className="font-black text-2xl tracking-tighter text-brand-dark">BUBBLES</span>
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted mt-1">Design System v1.0</p>
        </div>
        <nav className="flex flex-col gap-2 pb-20">
          {sections.map((s) => (
            <button 
              key={s.id} 
              onClick={() => scrollToSection(s.id)}
              className={`text-[11px] font-bold uppercase tracking-widest px-4 py-2 rounded-full transition-all text-left cursor-pointer ${activeSection === s.id ? 'bg-brand-pink text-brand-dark' : 'text-muted hover:bg-[#F7F7F7]'}`}
            >
              {s.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 px-5 md:px-20 pb-40">
        {/* 1. HERO */}
        <section id="hero" className="bg-brand-dark text-white rounded-[20px] p-12 md:p-20 mt-10 relative overflow-hidden">
          <div className="relative z-10">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/50 block mb-4">Industrial de Luxo Chic</span>
            <h1 className="text-5xl md:text-7xl font-black mb-4">Design System v1.0</h1>
            <p className="text-white/70 text-lg mb-10 max-w-xl">Guia visual vivo para a marca de cosméticos pet premium mais desejada do Brasil.</p>
            <div className="flex flex-wrap gap-3">
              <span className="bg-white/10 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">Figtree</span>
              <span className="bg-white/10 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">Feather Icons</span>
              <span className="bg-white/10 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">Shopify OS 2.0</span>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-pink/10 to-transparent pointer-events-none" />
        </section>

        {/* 2. LOGOS & SUB-MARCAS */}
        <SectionHeader title="Logos & Sub-marcas" id="logos" />
        <div className="space-y-16 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-brand-dark p-16 rounded-2xl flex flex-col items-center justify-center gap-6">
              <img 
                src="https://bubbles.gabrielxavier.online/BUBBLES.svg" 
                alt="Bubbles Logo Negative" 
                className="h-16 invert brightness-0" 
                referrerPolicy="no-referrer"
              />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">Aplicação Negativa</span>
            </div>
            <div className="bg-brand-pink p-16 rounded-2xl flex flex-col items-center justify-center gap-6">
              <img 
                src="https://bubbles.gabrielxavier.online/BUBBLES.svg" 
                alt="Bubbles Logo Institutional" 
                className="h-16" 
                referrerPolicy="no-referrer"
              />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-dark/40">Aplicação Institucional</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-12 rounded-2xl border border-[#E5E5E5] flex flex-col items-center justify-center gap-6">
              <img 
                src="https://bubbles.gabrielxavier.online/PATINHA%20BUBBLES.svg" 
                alt="Patinha Bubbles" 
                className="h-20" 
                referrerPolicy="no-referrer"
              />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted">Símbolo (Patinha)</span>
            </div>
            <div className="bg-brand-dark p-12 rounded-2xl flex flex-col items-center justify-center gap-6">
              <img 
                src="https://bubbles.gabrielxavier.online/PATINHA%20BUBBLES.svg" 
                alt="Patinha Bubbles Negative" 
                className="h-20 invert brightness-0" 
                referrerPolicy="no-referrer"
              />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">Símbolo Negativo</span>
            </div>
            <div className="bg-[#F7F7F7] p-12 rounded-2xl flex flex-col items-center justify-center gap-6">
              <div className="flex gap-4">
                <img src="https://bubbles.gabrielxavier.online/PATINHA%20BUBBLES.svg" alt="Icon sm" className="h-8" referrerPolicy="no-referrer" />
                <img src="https://bubbles.gabrielxavier.online/PATINHA%20BUBBLES.svg" alt="Icon md" className="h-12" referrerPolicy="no-referrer" />
                <img src="https://bubbles.gabrielxavier.online/PATINHA%20BUBBLES.svg" alt="Icon lg" className="h-16" referrerPolicy="no-referrer" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted">Escalabilidade</span>
            </div>
          </div>

          {/* Sub-marcas das Linhas */}
          <div>
            <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-muted mb-8 border-b border-[#E5E5E5] pb-2">Sub-marcas das Linhas</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {/* PRO */}
              <div className="bg-white p-8 rounded-2xl border-l-4 border-[#0D0C0D] shadow-sm hover:shadow-md transition-all">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-2xl font-black tracking-tight mb-1">Linha PRO</h3>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted">Groomers Avançados</span>
                  </div>
                  <div className="h-12 flex items-center bg-[#0D0C0D] px-4 rounded-lg">
                    <img src="https://bubbles.gabrielxavier.online/PRO.svg" alt="PRO" className="h-6 invert brightness-0" referrerPolicy="no-referrer" />
                  </div>
                </div>
                <div className="space-y-4 text-[13px]">
                  <p><strong>Posicionamento:</strong> Alta performance, resultado técnico superior.</p>
                  <p><strong>Visual:</strong> Embalagem preta, tom sério e técnico.</p>
                  <p><strong>Diluição:</strong> 1:10 (rende até 550 banhos/5L).</p>
                  <div className="p-4 bg-[#F7F7F7] rounded-lg italic text-muted">
                    "Para quem não aceita menos que o melhor"
                  </div>
                </div>
              </div>

              {/* Essential */}
              <div className="bg-white p-8 rounded-2xl border-l-4 border-[#F4CDD4] shadow-sm hover:shadow-md transition-all">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-2xl font-black tracking-tight mb-1">Linha Essential</h3>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted">Pet Shops em Crescimento</span>
                  </div>
                  <div className="h-12 flex items-center bg-[#F4CDD4] px-4 rounded-lg">
                    <img src="https://bubbles.gabrielxavier.online/ESSENTIAL.svg" alt="Essential" className="h-6" referrerPolicy="no-referrer" />
                  </div>
                </div>
                <div className="space-y-4 text-[13px]">
                  <p><strong>Posicionamento:</strong> Porta de entrada premium — qualidade acessível.</p>
                  <p><strong>Visual:</strong> Embalagem rosa/neutra, tom amigável.</p>
                  <p><strong>Diluição:</strong> 1:5 (rende até 300 banhos/5L).</p>
                  <div className="p-4 bg-[#F7F7F7] rounded-lg italic text-muted">
                    "Qualidade Bubbles com o melhor custo por banho"
                  </div>
                </div>
              </div>

              {/* Xperience */}
              <div className="bg-white p-8 rounded-2xl border-l-4 border-[#C8A96E] shadow-sm hover:shadow-md transition-all">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-2xl font-black tracking-tight mb-1">Linha Xperience</h3>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted">Experiência Sensorial</span>
                  </div>
                  <div className="h-12 flex items-center bg-[#C8A96E] px-4 rounded-lg">
                    <img src="https://bubbles.gabrielxavier.online/XPERIENCE.svg" alt="Xperience" className="h-6 invert brightness-0" referrerPolicy="no-referrer" />
                  </div>
                </div>
                <div className="space-y-4 text-[13px]">
                  <p><strong>Posicionamento:</strong> Fragrâncias marcantes, Sniff Tech.</p>
                  <p><strong>Visual:</strong> Embalagem premium, dourado, aspiracional.</p>
                  <p><strong>Tecnologia:</strong> Sniff Tech (fixação prolongada).</p>
                  <div className="p-4 bg-[#F7F7F7] rounded-lg italic text-muted">
                    "Seu pet vai cheirar tão bem que vão perguntar o segredo"
                  </div>
                </div>
              </div>

              {/* Collora */}
              <div className="bg-white p-8 rounded-2xl border-l-4 border-[#B066C6] shadow-sm hover:shadow-md transition-all">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-2xl font-black tracking-tight mb-1">Linha Collora</h3>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted">Estética Criativa</span>
                  </div>
                  <div className="h-12 flex items-center bg-[#B066C6] px-4 rounded-lg">
                    <img src="https://bubbles.gabrielxavier.online/COLLORA.svg" alt="Collora" className="h-6 invert brightness-0" referrerPolicy="no-referrer" />
                  </div>
                </div>
                <div className="space-y-4 text-[13px]">
                  <p><strong>Posicionamento:</strong> Coloração pet profissional segura e vibrante.</p>
                  <p><strong>Visual:</strong> Embalagem com acento roxo/lilás.</p>
                  <p><strong>Argumento:</strong> Transforme a pelagem em arte com segurança.</p>
                  <div className="p-4 bg-[#F7F7F7] rounded-lg italic text-muted">
                    "Transforme a pelagem em arte com segurança comprovada"
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Regras */}
          <div className="bg-[#F7F7F7] p-8 rounded-2xl">
            <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-muted mb-6 border-b border-[#E5E5E5] pb-2">Regras de Uso das Logos</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-4">
                <h4 className="text-xs font-black text-promo-red uppercase">❌ Não Fazer</h4>
                <ul className="text-[11px] space-y-2 text-secondary">
                  <li>Não alterar as proporções da marca</li>
                  <li>Não utilizar cores fora da paleta oficial</li>
                  <li>Não aplicar efeitos de sombra ou brilho</li>
                  <li>Não rotacionar a logo ou símbolo</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="text-xs font-black text-action-green uppercase">✅ Fazer</h4>
                <ul className="text-[11px] space-y-2 text-secondary">
                  <li>Manter área de respiro mínima</li>
                  <li>Utilizar versões oficiais de alta resolução</li>
                  <li>Respeitar o contraste de fundo</li>
                  <li>Priorizar aplicação institucional</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* 3. CORES */}
        <SectionHeader title="Paleta de Cores" subtitle="Identidade visual e tokens de superfície" id="colors" />
        <div className="bg-white p-8 rounded-2xl border border-[#E5E5E5] mb-10">
          <p className="text-sm leading-relaxed text-muted mb-8">
            Nossa paleta de cores foi desenhada para evocar o luxo industrial e a sofisticação. O contraste entre o <strong>Rosa Marca</strong> (suavidade e cuidado) e o <strong>Preto Marca</strong> (autoridade e elegância) cria uma identidade visual única no setor pet. Utilizamos cores de destaque apenas para sinalização crítica e promoções, mantendo a sobriedade premium da marca.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ColorSwatch name="Brand Dark" token="--color-brand-dark" hex="#0D0C0D" description="Cor primária para textos e fundos de luxo." />
            <ColorSwatch name="Brand Pink" token="--color-brand-pink" hex="#F4CDD4" description="Cor de destaque e suavidade da marca." />
            <ColorSwatch name="Surface Light" token="--color-surface-light" hex="#F7F7F7" description="Fundo secundário para contraste suave." />
            <ColorSwatch name="Action Green" token="--color-action-green" hex="#3DB85C" description="Exclusivo para ações de compra e conversão." />
          </div>
        </div>

        <div className="space-y-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-muted mb-8 border-b border-[#E5E5E5] pb-2">Superfícies & Texto</h3>
              <div className="space-y-4">
                <ColorSwatch name="Text Primary" token="--text-primary" hex="#0D0C0D" description="Cor principal de leitura." />
                <ColorSwatch name="Text Muted" token="--text-muted" hex="#999999" description="Legendas e textos secundários." />
                <ColorSwatch name="Surface White" token="--surface-page" hex="#FFFFFF" description="Fundo principal limpo." />
              </div>
            </div>
            <div>
              <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-muted mb-8 border-b border-[#E5E5E5] pb-2">Bordas & Divisores</h3>
              <div className="space-y-4">
                <ColorSwatch name="Border Light" token="--border-default" hex="#E5E5E5" description="Divisores e bordas de cards." />
                <ColorSwatch name="Border Focus" token="--border-focus" hex="#F4CDD4" description="Estado de foco em inputs." />
                <ColorSwatch name="Border Super Pink" token="--color-brand-super-pink" hex="#E8649A" description="Borda de destaque para elementos especiais." />
                <ColorSwatch name="Dark Border" token="--border-dark" hex="rgba(255,255,255,0.10)" description="Divisores sobre fundo escuro." />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-muted mb-8 border-b border-[#E5E5E5] pb-2">Regra Crítica: Ação de Compra</h3>
            <div className="p-10 bg-white border-2 border-action-green rounded-[32px] shadow-[0_20px_50px_rgba(61,184,92,0.15)] relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-5">
                <ShoppingCart size={120} className="text-action-green" />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-action-green rounded-full flex items-center justify-center text-white shadow-[0_4px_12px_rgba(61,184,92,0.4)]">
                    <AlertCircle size={24} />
                  </div>
                  <div>
                    <h4 className="text-2xl font-black uppercase text-action-green tracking-tight">Exceção Isolada e Obrigatória</h4>
                    <p className="text-[11px] font-bold uppercase tracking-widest text-muted">Protocolo de Conversão Bubbles</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className="space-y-6">
                    <p className="text-base text-brand-dark leading-relaxed">
                      O verde <strong className="text-action-green">#3DB85C</strong> é estritamente reservado para o botão <strong className="uppercase">"COMPRAR"</strong> e finalização de pedido. 
                    </p>
                    <div className="bg-[#F7F7F7] p-6 rounded-2xl border-l-4 border-action-green">
                      <p className="text-sm text-secondary leading-relaxed">
                        É terminantemente proibido seu uso em qualquer outro elemento gráfico, decorativo ou botões secundários (como "Cadastrar" ou "Ver Mais"). Esta cor sinaliza <strong>dinheiro saindo da carteira</strong>.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-8 justify-center lg:justify-end">
                    <div className="flex flex-col items-center gap-3">
                      <button className="btn-primary-green px-10 py-4 rounded-full shadow-cta">COMPRAR</button>
                      <div className="flex items-center gap-1.5">
                        <CheckCircle size={14} className="text-action-green" />
                        <span className="text-[10px] font-black text-action-green uppercase tracking-widest">CORRETO</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-3">
                      <button className="bg-brand-dark text-white font-black uppercase text-[13px] px-10 py-4 rounded-full hover:bg-black transition-all">CADASTRAR</button>
                      <div className="flex items-center gap-1.5">
                        <CheckCircle size={14} className="text-brand-dark" />
                        <span className="text-[10px] font-black text-brand-dark uppercase tracking-widest">CORRETO</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-muted mb-8 border-b border-[#E5E5E5] pb-2">Cores das Linhas</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <ColorSwatch name="Linha PRO" token="--color-line-pro" hex="#0D0C0D" description="Profissional e autoridade." />
              <ColorSwatch name="Linha Essential" token="--color-line-essential" hex="#F4CDD4" description="Acessível e carinhosa." />
              <ColorSwatch name="Linha Xperience" token="--color-line-xperience" hex="#C8A96E" description="Ouro, luxo e experiência." />
              <ColorSwatch name="Linha Collora" token="--color-line-collora" hex="#B066C6" description="Criatividade e cores." />
            </div>
          </div>
        </div>

        {/* 4. TIPOGRAFIA */}
        <SectionHeader title="Tipografia" subtitle="Família Figtree — Google Fonts" id="typography" />
        <div className="bg-white p-8 rounded-2xl border border-[#E5E5E5] mb-10">
          <p className="text-sm leading-relaxed text-muted mb-6">
            A escolha da fonte <strong>Figtree</strong> reflete a modernidade e a clareza da Bubbles. É uma tipografia geométrica sans-serif que equilibra perfeitamente a legibilidade técnica com uma estética amigável e premium. Sua versatilidade em diferentes pesos permite uma hierarquia visual forte, essencial para destacar benefícios de produtos e informações de rendimento.
          </p>
          <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#E5E5E5] text-[10px] font-bold uppercase tracking-widest text-muted">
                <th className="py-4 px-2">Nome</th>
                <th className="py-4 px-2">Preview</th>
                <th className="py-4 px-2">Size/Weight</th>
                <th className="py-4 px-2">Uso</th>
              </tr>
            </thead>
            <tbody className="text-brand-dark">
              {/* Display / Hero */}
              <tr className="border-b border-[#E5E5E5] bg-gray-50/50">
                <td colSpan={4} className="py-2 px-2 text-[9px] font-black uppercase tracking-widest text-muted">Display / Hero</td>
              </tr>
              <tr className="border-b border-[#E5E5E5]">
                <td className="py-4 px-2 font-bold text-xs">Display XL</td>
                <td className="py-4 px-2 text-[64px] font-black leading-[1.05] tracking-[-0.03em]">Bubbles</td>
                <td className="py-4 px-2 text-[10px] font-mono leading-tight">64px / 900<br/>LH: 1.05 / LS: -0.03em</td>
                <td className="py-4 px-2 text-xs">Títulos de Hero banner</td>
              </tr>
              <tr className="border-b border-[#E5E5E5]">
                <td className="py-4 px-2 font-bold text-xs">Display L</td>
                <td className="py-4 px-2 text-[48px] font-black leading-[1.10] tracking-[-0.02em]">Seção VIP</td>
                <td className="py-4 px-2 text-[10px] font-mono leading-tight">48px / 900<br/>LH: 1.10 / LS: -0.02em</td>
                <td className="py-4 px-2 text-xs">Seção VIP, preços grandes</td>
              </tr>

              {/* Headings */}
              <tr className="border-b border-[#E5E5E5] bg-gray-50/50">
                <td colSpan={4} className="py-2 px-2 text-[9px] font-black uppercase tracking-widest text-muted">Headings</td>
              </tr>
              <tr className="border-b border-[#E5E5E5]">
                <td className="py-4 px-2 font-bold text-xs">Heading 1</td>
                <td className="py-4 px-2 text-[38px] font-black leading-[1.15] tracking-[-0.02em]">Títulos de Seção</td>
                <td className="py-4 px-2 text-[10px] font-mono leading-tight">38px / 900<br/>LH: 1.15 / LS: -0.02em</td>
                <td className="py-4 px-2 text-xs">Títulos de seção principal</td>
              </tr>
              <tr className="border-b border-[#E5E5E5]">
                <td className="py-4 px-2 font-bold text-xs">Heading 2</td>
                <td className="py-4 px-2 text-[30px] font-bold leading-[1.20] tracking-[-0.01em]">Sub-seções</td>
                <td className="py-4 px-2 text-[10px] font-mono leading-tight">30px / 700<br/>LH: 1.20 / LS: -0.01em</td>
                <td className="py-4 px-2 text-xs">Sub-seções, nome de linhas</td>
              </tr>
              <tr className="border-b border-[#E5E5E5]">
                <td className="py-4 px-2 font-bold text-xs">Heading 3</td>
                <td className="py-4 px-2 text-[24px] font-black leading-[1.20] tracking-normal">Nome de Produto</td>
                <td className="py-4 px-2 text-[10px] font-mono leading-tight">24px / 900<br/>LH: 1.20 / LS: 0</td>
                <td className="py-4 px-2 text-xs">Nome de produto em PDP</td>
              </tr>
              <tr className="border-b border-[#E5E5E5]">
                <td className="py-4 px-2 font-bold text-xs">Heading 4</td>
                <td className="py-4 px-2 text-[20px] font-bold leading-[1.30] tracking-normal">Títulos de Card</td>
                <td className="py-4 px-2 text-[10px] font-mono leading-tight">20px / 700<br/>LH: 1.30 / LS: 0</td>
                <td className="py-4 px-2 text-xs">Títulos de card, subseção</td>
              </tr>

              {/* Body & UI */}
              <tr className="border-b border-[#E5E5E5] bg-gray-50/50">
                <td colSpan={4} className="py-2 px-2 text-[9px] font-black uppercase tracking-widest text-muted">Body & UI</td>
              </tr>
              <tr className="border-b border-[#E5E5E5]">
                <td className="py-4 px-2 font-bold text-xs">Body L</td>
                <td className="py-4 px-2 text-[17px] font-normal leading-[1.65]">Descrições longas sobre a marca Bubbles.</td>
                <td className="py-4 px-2 text-[10px] font-mono leading-tight">17px / 400<br/>LH: 1.65</td>
                <td className="py-4 px-2 text-xs">Descrições longas</td>
              </tr>
              <tr className="border-b border-[#E5E5E5]">
                <td className="py-4 px-2 font-bold text-xs">Body M</td>
                <td className="py-4 px-2 text-[15px] font-normal leading-[1.65]">Texto padrão para parágrafos e descrições.</td>
                <td className="py-4 px-2 text-[10px] font-mono leading-tight">15px / 400<br/>LH: 1.65</td>
                <td className="py-4 px-2 text-xs">Texto padrão</td>
              </tr>
              <tr className="border-b border-[#E5E5E5]">
                <td className="py-4 px-2 font-bold text-xs">Body S</td>
                <td className="py-4 px-2 text-[13px] font-normal leading-[1.55]">Textos secundários e hints de interface.</td>
                <td className="py-4 px-2 text-[10px] font-mono leading-tight">13px / 400<br/>LH: 1.55</td>
                <td className="py-4 px-2 text-xs">Textos secundários</td>
              </tr>
              <tr className="border-b border-[#E5E5E5]">
                <td className="py-4 px-2 font-bold text-xs">Semibold M</td>
                <td className="py-4 px-2 text-[15px] font-semibold leading-[1.5] tracking-[0.05em]">Textos de Destaque</td>
                <td className="py-4 px-2 text-[10px] font-mono leading-tight">15px / 600<br/>LH: 1.5 / LS: 0.05em</td>
                <td className="py-4 px-2 text-xs">Labels de nav</td>
              </tr>
              <tr className="border-b border-[#E5E5E5]">
                <td className="py-4 px-2 font-bold text-xs">Semibold S</td>
                <td className="py-4 px-2 text-[13px] font-semibold leading-[1.5] tracking-[0.05em]">Nomes em Cards</td>
                <td className="py-4 px-2 text-[10px] font-mono leading-tight">13px / 600<br/>LH: 1.5 / LS: 0.05em</td>
                <td className="py-4 px-2 text-xs">CTAs secundários</td>
              </tr>

              {/* Labels & Captions */}
              <tr className="border-b border-[#E5E5E5] bg-gray-50/50">
                <td colSpan={4} className="py-2 px-2 text-[9px] font-black uppercase tracking-widest text-muted">Labels & Captions</td>
              </tr>
              <tr className="border-b border-[#E5E5E5]">
                <td className="py-4 px-2 font-bold text-xs">Label Caps</td>
                <td className="py-4 px-2 text-[11px] font-bold uppercase tracking-[0.15em]">RENDIMENTO</td>
                <td className="py-4 px-2 text-[10px] font-mono leading-tight">11px / 700<br/>LH: 1.5 / LS: 0.15em</td>
                <td className="py-4 px-2 text-xs">Rótulos de tabela</td>
              </tr>
              <tr className="border-b border-[#E5E5E5]">
                <td className="py-4 px-2 font-bold text-xs">Label Tiny</td>
                <td className="py-4 px-2 text-[10px] font-bold uppercase tracking-[0.12em]">CATEGORIA</td>
                <td className="py-4 px-2 text-[10px] font-mono leading-tight">10px / 700<br/>LH: 1.5 / LS: 0.12em</td>
                <td className="py-4 px-2 text-xs">Badges, seções</td>
              </tr>
              <tr className="border-b border-[#E5E5E5]">
                <td className="py-4 px-2 font-bold text-xs">Caption</td>
                <td className="py-4 px-2 text-[11px] font-normal leading-normal">Textos de suporte e avisos legais.</td>
                <td className="py-4 px-2 text-[10px] font-mono leading-tight">11px / 400</td>
                <td className="py-4 px-2 text-xs">Aviso legal</td>
              </tr>
              <tr className="border-b border-[#E5E5E5]">
                <td className="py-4 px-2 font-bold text-xs">Monospace</td>
                <td className="py-4 px-2 text-[11px] font-normal font-mono">#F4CDD4</td>
                <td className="py-4 px-2 text-[10px] font-mono leading-tight">11px / 400</td>
                <td className="py-4 px-2 text-xs">Tokens técnicos</td>
              </tr>
            </tbody>
          </table>
          </div>

          <div className="mt-12">
            <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-muted mb-6 border-b border-[#E5E5E5] pb-2">Tipografia de Preço</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              <div className="space-y-4">
                <div className="flex flex-col gap-1">
                  <span className="text-[17px] font-normal text-muted line-through decoration-brand-pink decoration-2">R$ 229,90</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-[30px] font-black tracking-[-0.02em] text-brand-dark">R$</span>
                    <span className="text-[48px] font-black tracking-[-0.03em] text-brand-dark leading-none">206,90</span>
                    <span className="ml-4 bg-action-green/10 text-action-green text-[10px] font-black px-2 py-1 rounded uppercase tracking-widest">10% de desconto</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-[15px] font-black text-brand-dark">6x de R$ 34,48 sem juros</p>
                  <div className="flex items-center gap-2 text-muted">
                    <TrendingUp size={14} className="text-action-green" />
                    <span className="text-[12px] font-medium">Ganhe R$ 10,35 de cashback</span>
                  </div>
                </div>
              </div>
              <div className="space-y-4 pt-4">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-muted">Price Display / Currency</span>
                  <span className="text-xs text-muted">48px / 30px | Black (900) | LS: -0.03em / -0.02em</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-muted">Price Strikethrough</span>
                  <span className="text-xs text-muted">17px | Regular (400) | Pink Strikethrough</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-muted">Price Installment & Cashback</span>
                  <span className="text-xs text-muted">15px Black / 12px Medium with Icon</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 5. ICONOGRAFIA */}
        <SectionHeader title="Iconografia" subtitle="Lucide (Feather) — Stroke 1.5px" id="icons" />
        <div className="bg-white p-8 rounded-2xl border border-[#E5E5E5] mb-10">
          <p className="text-sm leading-relaxed text-muted mb-6">
            Utilizamos a biblioteca <strong>Lucide-React</strong> (evolução do Feather Icons). A escolha do <strong>stroke de 1.5px</strong> é estratégica: ele é fino o suficiente para manter a elegância premium, mas possui peso visual para ser legível em interfaces densas. Os ícones devem ser usados sempre em cores sólidas (Preto Marca ou Rosa Marca).
          </p>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            <IconBox icon={ShoppingCart} name="shopping-cart" usage="Carrinho" />
            <IconBox icon={User} name="user" usage="Conta" />
            <IconBox icon={Search} name="search" usage="Busca" />
            <IconBox icon={Droplet} name="droplet" usage="Shampoo" />
            <IconBox icon={Wind} name="wind" usage="Perfume" />
            <IconBox icon={Truck} name="truck" usage="Frete" />
            <IconBox icon={Shield} name="shield" usage="Segurança" />
            <IconBox icon={Award} name="award" usage="Qualidade" />
            <IconBox icon={Leaf} name="leaf" usage="Natural" />
            <IconBox icon={Zap} name="zap" usage="Performance" />
            <IconBox icon={Clock} name="clock" usage="Tempo" />
            <IconBox icon={TrendingUp} name="trending-up" usage="Crescimento" />
          </div>
        </div>

        {/* 6. ESPAÇAMENTO */}
        <SectionHeader title="Escala de Espaçamento" subtitle="Baseada em 4px (Soft Grid)" id="spacing" />
        <div className="bg-white p-8 rounded-2xl border border-[#E5E5E5] mb-16">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#E5E5E5] text-[10px] font-bold uppercase tracking-widest text-muted">
                  <th className="py-4 px-2">Token</th>
                  <th className="py-4 px-2">Valor</th>
                  <th className="py-4 px-2">Visual</th>
                  <th className="py-4 px-2">Uso Típico</th>
                </tr>
              </thead>
              <tbody className="text-brand-dark">
                {[
                  { token: '--space-1', val: '4px', use: 'Ajustes finos, entre ícone e texto' },
                  { token: '--space-2', val: '8px', use: 'Entre labels e inputs, entre badges' },
                  { token: '--space-3', val: '12px', use: 'Padding interno de cards pequenos' },
                  { token: '--space-4', val: '16px', use: 'Padding padrão de cards, entre parágrafos' },
                  { token: '--space-5', val: '20px', use: 'Gap de grids densos' },
                  { token: '--space-6', val: '24px', use: 'Gap padrão de grids, margens de seção' },
                  { token: '--space-8', val: '32px', use: 'Padding de seções, margens grandes' },
                  { token: '--space-10', val: '40px', use: 'Padding lateral de container' },
                  { token: '--space-12', val: '48px', use: 'Espaçamento entre grandes blocos' },
                  { token: '--space-16', val: '64px', use: 'Margem superior/inferior de heros' },
                ].map((s) => (
                  <tr key={s.token} className="border-b border-[#E5E5E5]">
                    <td className="py-3 px-2 font-mono text-[11px]">{s.token}</td>
                    <td className="py-3 px-2 text-xs font-bold">{s.val}</td>
                    <td className="py-3 px-2">
                      <div className="bg-brand-pink/30 h-4 rounded-sm" style={{ width: s.val }} />
                    </td>
                    <td className="py-3 px-2 text-[11px] text-muted">{s.use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 7. GRID & LAYOUT */}
        <SectionHeader title="Grid & Layout" subtitle="Estruturas de composição de página" id="grid-layout" />
        <div className="space-y-12 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-2xl border border-[#E5E5E5]">
              <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-muted mb-6 border-b border-[#E5E5E5] pb-2">Padrões de Grid</h3>
              <div className="space-y-6">
                {[
                  { name: 'Grid 2 Colunas', code: 'grid-cols-2', gap: '24px' },
                  { name: 'Grid 3 Colunas', code: 'grid-cols-3', gap: '24px' },
                  { name: 'Grid 4 Colunas', code: 'grid-cols-4', gap: '20px' },
                  { name: 'Grid 5 Colunas', code: 'grid-cols-5', gap: '20px' },
                ].map((g) => (
                  <div key={g.name} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold">{g.name}</span>
                      <span className="text-[10px] font-mono text-muted">gap: {g.gap}</span>
                    </div>
                    <div className={`grid ${g.code} gap-2`}>
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="h-8 bg-[#F7F7F7] border border-[#E5E5E5] rounded-sm" />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-[#E5E5E5]">
              <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-muted mb-6 border-b border-[#E5E5E5] pb-2">Layouts Específicos</h3>
              <div className="space-y-8">
                <div>
                  <span className="text-xs font-bold block mb-2">Hero Split (50/50)</span>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="h-24 bg-brand-pink/10 border border-brand-pink/20 rounded-lg flex items-center justify-center text-[10px] font-bold text-brand-pink">IMAGEM / CONTEÚDO</div>
                    <div className="h-24 bg-brand-dark/5 border border-brand-dark/10 rounded-lg flex items-center justify-center text-[10px] font-bold text-brand-dark">CONTEÚDO / IMAGEM</div>
                  </div>
                </div>
                <div>
                  <span className="text-xs font-bold block mb-2">Product Wide (45/55)</span>
                  <div className="flex gap-4">
                    <div className="w-[45%] h-24 bg-[#F7F7F7] border border-[#E5E5E5] rounded-lg flex items-center justify-center text-[10px] font-bold text-muted">IMAGEM</div>
                    <div className="flex-1 h-24 bg-white border border-[#E5E5E5] rounded-lg flex items-center justify-center text-[10px] font-bold text-muted">INFO</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-brand-dark p-8 rounded-2xl text-white">
            <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-white/40 mb-6 border-b border-white/10 pb-2">Container & Safe Areas</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-pink block mb-1">Max Width</span>
                <p className="text-2xl font-black">1280px</p>
                <p className="text-[10px] text-white/60 mt-1">--container-max</p>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-pink block mb-1">Padding Desktop</span>
                <p className="text-2xl font-black">40px</p>
                <p className="text-[10px] text-white/60 mt-1">--container-pad</p>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-pink block mb-1">Padding Mobile</span>
                <p className="text-2xl font-black">20px</p>
                <p className="text-[10px] text-white/60 mt-1">--container-pad-mobile</p>
              </div>
            </div>
          </div>
        </div>

        {/* 8. BORDAS & SOMBRAS */}
        <SectionHeader title="Bordas & Sombras" subtitle="Profundidade e acabamento" id="borders-shadows" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div className="bg-white p-8 rounded-2xl border border-[#E5E5E5]">
            <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-muted mb-8 border-b border-[#E5E5E5] pb-2">Raios de Borda (Radius)</h3>
            <div className="grid grid-cols-2 gap-8">
              {[
                { token: '--radius-sm', val: '4px', use: 'Badges, chips de categoria' },
                { token: '--radius-md', val: '8px', use: 'Inputs, tabelas de produto, info-table' },
                { token: '--radius-lg', val: '12px', use: 'Cards de produto, review cards' },
                { token: '--radius-xl', val: '20px', use: 'Seções de destaque (VIP, newsletter)' },
                { token: '--radius-full', val: '9999px', use: 'Botões pill, filter chips' },
              ].map((r) => (
                <div key={r.token} className="space-y-3">
                  <div className="w-full h-20 bg-brand-dark flex items-center justify-center" style={{ borderRadius: r.val }}>
                    <span className="text-white font-black text-[10px] uppercase tracking-widest">{r.val}</span>
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-brand-dark block">{r.token}</span>
                    <span className="text-[10px] text-muted leading-tight block">{r.use}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-muted mb-4">Bordas de Destaque</h4>
              <div className="p-6 rounded-2xl border-2 border-brand-super-pink bg-brand-super-pink/5 flex items-center justify-center">
                <span className="text-brand-super-pink font-black text-[11px] uppercase tracking-widest">Borda Super Rosa (2px)</span>
              </div>
            </div>
            <div className="p-4 bg-brand-pink/5 border border-brand-pink/20 rounded-xl mt-8">
              <p className="text-[10px] leading-relaxed text-brand-dark">
                <span className="font-black text-brand-pink uppercase tracking-widest block mb-1">Regra de Ouro:</span>
                Botões de compra usam obrigatoriamente <code>border-radius: 9999px</code> para o formato "pill" completo.
              </p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-[#E5E5E5]">
            <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-muted mb-8 border-b border-[#E5E5E5] pb-2">Sombras (Shadows)</h3>
            <div className="space-y-6">
              {[
                { token: '--shadow-sm', val: '0 1px 3px rgba(0,0,0,0.08)', use: 'Elementos sutis, inputs' },
                { token: '--shadow-card', val: '0 2px 8px rgba(0,0,0,0.07)', use: 'Cards de produto em repouso' },
                { token: '--shadow-card-hover', val: '0 8px 24px rgba(0,0,0,0.14)', use: 'Cards de produto em hover' },
                { token: '--shadow-md', val: '0 4px 12px rgba(0,0,0,0.10)', use: 'Dropdowns, tooltips, popovers' },
                { token: '--shadow-lg', val: '0 8px 32px rgba(0,0,0,0.12)', use: 'Modais, drawers, menus laterais' },
                { token: '--shadow-cta', val: '0 4px 16px rgba(61,184,92,0.35)', use: 'Botão Comprar (Glow)' },
                { token: '--shadow-cta-hover', val: '0 8px 24px rgba(61,184,92,0.45)', use: 'Botão Comprar (Hover Glow)' },
              ].map((s) => (
                <div key={s.token} className="flex items-center gap-6 group">
                  <div className="w-16 h-16 bg-white rounded-xl border border-[#F7F7F7] transition-all duration-300 group-hover:scale-105" style={{ boxShadow: s.val }} />
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[11px] font-mono text-brand-dark">{s.token}</span>
                      <span className="text-[9px] font-bold text-muted uppercase tracking-widest">CSS Value</span>
                    </div>
                    <p className="text-[10px] text-muted mb-1">{s.use}</p>
                    <code className="text-[9px] text-brand-pink bg-brand-pink/5 px-1 py-0.5 rounded">{s.val}</code>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 9. BOTÕES */}
        <SectionHeader title="Botões" subtitle="Todos os estados e variantes" id="buttons" />
        <div className="space-y-16">
          <div>
            <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-muted mb-8 border-b border-[#E5E5E5] pb-2">Botões Secundários</h3>
            <div className="bg-white p-8 rounded-2xl border border-[#E5E5E5] overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#E5E5E5] text-[10px] font-bold uppercase tracking-widest text-muted">
                    <th className="py-4 px-2">Variante</th>
                    <th className="py-4 px-2">Background</th>
                    <th className="py-4 px-2">Borda</th>
                    <th className="py-4 px-2">Texto</th>
                    <th className="py-4 px-2">Visual</th>
                  </tr>
                </thead>
                <tbody className="text-brand-dark">
                  <tr className="border-b border-[#E5E5E5]">
                    <td className="py-4 px-2 text-xs font-bold">Dark / Primary</td>
                    <td className="py-4 px-2 font-mono text-[10px]">#0D0C0D</td>
                    <td className="py-4 px-2 text-xs">—</td>
                    <td className="py-4 px-2 font-mono text-[10px]">#FFFFFF</td>
                    <td className="py-4 px-2"><button className="btn-dark btn-sm">VER TUDO</button></td>
                  </tr>
                  <tr className="border-b border-[#E5E5E5]">
                    <td className="py-4 px-2 text-xs font-bold">Outline Dark</td>
                    <td className="py-4 px-2 text-xs">transparent</td>
                    <td className="py-4 px-2 font-mono text-[10px]">2px #0D0C0D</td>
                    <td className="py-4 px-2 font-mono text-[10px]">#0D0C0D</td>
                    <td className="py-4 px-2"><button className="btn-outline-dark btn-sm">SAIBA MAIS</button></td>
                  </tr>
                  <tr className="border-b border-[#E5E5E5]">
                    <td className="py-4 px-2 text-xs font-bold">Outline Pink</td>
                    <td className="py-4 px-2 text-xs">transparent</td>
                    <td className="py-4 px-2 font-mono text-[10px]">2px #F4CDD4</td>
                    <td className="py-4 px-2 font-mono text-[10px]">#0D0C0D</td>
                    <td className="py-4 px-2"><button className="btn-outline-pink btn-sm">AVALIAR</button></td>
                  </tr>
                  <tr className="border-b border-[#E5E5E5]">
                    <td className="py-4 px-2 text-xs font-bold">Outline Super Pink</td>
                    <td className="py-4 px-2 text-xs">transparent</td>
                    <td className="py-4 px-2 font-mono text-[10px]">2px #E8649A</td>
                    <td className="py-4 px-2 font-mono text-[10px]">#E8649A</td>
                    <td className="py-4 px-2"><button className="btn-outline-super-pink btn-sm">TODOS</button></td>
                  </tr>
                  <tr className="border-b border-[#E5E5E5]">
                    <td className="py-4 px-2 text-xs font-bold">Ghost</td>
                    <td className="py-4 px-2 text-xs">transparent</td>
                    <td className="py-4 px-2 text-xs">—</td>
                    <td className="py-4 px-2 font-mono text-[10px]">#666666</td>
                    <td className="py-4 px-2"><button className="btn-ghost btn-sm">CANCELAR</button></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-muted mb-8 border-b border-[#E5E5E5] pb-2">Tamanhos de Botão</h3>
              <div className="space-y-6">
                <div className="flex items-center gap-6">
                  <button className="btn-dark btn-sm">BOTÃO SM</button>
                  <span className="text-[10px] text-muted">8px 16px · 11px font</span>
                </div>
                <div className="flex items-center gap-6">
                  <button className="btn-dark btn-md">BOTÃO MD</button>
                  <span className="text-[10px] text-muted">12px 24px · 13px font</span>
                </div>
                <div className="flex items-center gap-6">
                  <button className="btn-dark btn-lg">BOTÃO LG</button>
                  <span className="text-[10px] text-muted">16px 36px · 15px font</span>
                </div>
                <div className="flex flex-col gap-2">
                  <button className="btn-primary-green btn-full">COMPRAR AGORA</button>
                  <span className="text-[10px] text-muted text-center">Full-width · 16px vertical · 15px font</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-muted mb-8 border-b border-[#E5E5E5] pb-2">Propriedades Comuns</h3>
              <div className="bg-[#F7F7F7] p-6 rounded-xl font-mono text-[11px] space-y-1">
                <p>font-family: 'Figtree', sans-serif</p>
                <p>font-weight: 900 (Black)</p>
                <p>text-transform: UPPERCASE</p>
                <p>letter-spacing: 0.08em</p>
                <p>border-radius: 9999px</p>
                <p>transition: all 250ms ease</p>
                <p>cursor: pointer</p>
                <p>line-height: 1</p>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-action-green/5 border-2 border-action-green p-8 rounded-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <ShoppingCart size={80} className="text-action-green" />
              </div>
              <h3 className="text-[13px] font-black uppercase tracking-[0.2em] text-action-green mb-6 flex items-center gap-2">
                <AlertCircle size={18} /> Regra Crítica: Ação de Compra
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-8">
                <ButtonDemo label="COMPRAR" variant="green" state="default" rounded="full" />
                <ButtonDemo label="COMPRAR" variant="green" state="hover" rounded="full" />
                <ButtonDemo label="COMPRAR" variant="green" state="active" rounded="full" />
                <ButtonDemo label="COMPRAR" variant="green" state="disabled" rounded="full" />
                <ButtonDemo label="COMPRAR" variant="green" state="loading" rounded="full" />
              </div>
              <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-action-green/20">
                <p className="text-[11px] text-brand-dark font-bold leading-relaxed">
                  O verde <span className="text-action-green">#3DB85C</span> é estritamente reservado para o botão "COMPRAR" e finalização de pedido. 
                  Nenhuma outra ação no sistema (como cadastros, filtros ou navegação) deve utilizar esta cor.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-muted mb-8 border-b border-[#E5E5E5] pb-2">Sistema de Compra</h3>
            <div className="bg-[#F7F7F7] p-8 rounded-2xl flex flex-col md:flex-row items-center justify-center gap-8">
              <div className="flex flex-col items-center gap-2">
                <span className="text-[10px] font-mono text-muted uppercase">Quantidade</span>
                <Stepper />
              </div>
              <div className="flex flex-col items-center gap-2">
                <span className="text-[10px] font-mono text-muted uppercase">Ação</span>
                <button className="btn-primary-green btn-lg">COMPRAR</button>
              </div>
            </div>
          </div>
        </div>

        {/* 10. FORMULÁRIOS */}
        <SectionHeader title="Inputs & Formulários" subtitle="Campos de entrada e controles" id="forms" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div className="space-y-8">
            <div>
              <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-muted mb-6 border-b border-[#E5E5E5] pb-2">Input Texto Padrão</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-muted mb-2">Default</label>
                  <input type="text" className="input-bubbles" placeholder="Seu nome completo" />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-muted mb-2">Focus</label>
                  <input type="text" className="input-bubbles border-brand-pink ring-3 ring-[rgba(244,205,212,0.35)]" placeholder="Digitando..." defaultValue="Gabriel Bubbles" />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-muted mb-2">Error</label>
                  <input type="text" className="input-bubbles input-error" placeholder="E-mail inválido" defaultValue="gabriel@bubbles" />
                  <span className="text-[11px] text-promo-red font-semibold mt-1.5 block">Por favor, insira um e-mail válido.</span>
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-muted mb-2">Disabled</label>
                  <input type="text" className="input-bubbles opacity-50 cursor-not-allowed" disabled placeholder="Campo bloqueado" />
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-8">
            <div>
              <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-muted mb-6 border-b border-[#E5E5E5] pb-2">Padrões Específicos</h3>
              <div className="space-y-8">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-muted mb-2">Cálculo de Frete (CEP)</label>
                  <div className="flex items-center border-[1.5px] border-[#E5E5E5] rounded-full overflow-hidden bg-white p-[3px]">
                    <div className="pl-4 text-muted">
                      <Truck size={16} />
                    </div>
                    <input type="text" className="flex-1 px-4 py-2 text-[13px] outline-none font-figtree border-none" placeholder="00000-000" />
                    <button className="btn-dark !py-2.5 !px-6 !text-[11px] !rounded-full">
                      CALCULAR
                    </button>
                  </div>
                  <p className="text-[10px] text-muted mt-2 italic">Layout pill com botão embutido para consistência.</p>
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-muted mb-2">Controle de Quantidade</label>
                  <Stepper />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-muted mb-2">Newsletter (Botão Embutido)</label>
                  <div className="flex items-center border-[1.5px] border-[#E5E5E5] rounded-full overflow-hidden bg-white p-[3px] shadow-sm focus-within:border-brand-pink transition-all">
                    <input type="text" className="flex-1 px-5 py-2 text-[13px] outline-none font-figtree border-none" placeholder="Seu melhor e-mail" />
                    <button className="bg-brand-dark text-white font-black uppercase text-[11px] px-8 py-2.5 rounded-full hover:bg-black transition-all">CADASTRAR</button>
                  </div>
                  <p className="text-[10px] text-brand-dark mt-2 font-bold italic">Receba cashback em todas as compras!</p>
                </div>
              </div>
            </div>
            <div className="bg-[#F7F7F7] p-6 rounded-xl">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-muted mb-4">Mensagens de Feedback</h4>
              <div className="space-y-4">
                <div>
                  <span className="text-[11px] text-muted block">Hint: font-size: 11px · color: #999999</span>
                  <p className="text-[11px] text-muted mt-1">Ex: Nunca compartilharemos seu e-mail.</p>
                </div>
                <div>
                  <span className="text-[11px] text-promo-red font-semibold block">Error: font-size: 11px · color: #E03E3E</span>
                  <p className="text-[11px] text-promo-red font-semibold mt-1">Ex: Este campo é obrigatório.</p>
                </div>
                <div>
                  <span className="text-[11px] text-action-green font-semibold block">Success: font-size: 11px · color: #3DB85C</span>
                  <p className="text-[11px] text-action-green font-semibold mt-1">Ex: Cadastro realizado com sucesso!</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 11. FORMULÁRIO B2B */}
        <SectionHeader title="Formulário Multi-step B2B" subtitle="Fluxo de qualificação de distribuidores" id="b2b-form" />
        <div className="flex flex-col lg:flex-row gap-12 items-start mb-16">
          <div className="flex-1">
            <B2BFormDemo />
          </div>
          <div className="flex-1 space-y-8">
            <div className="bg-white p-8 rounded-2xl border border-[#E5E5E5]">
              <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-muted mb-6 border-b border-[#E5E5E5] pb-2">Estrutura do Modal</h3>
              <div className="font-mono text-[11px] space-y-1 text-secondary">
                <p>Overlay: rgba(0,0,0,0.6) + blur(4px)</p>
                <p>Radius: 20px</p>
                <p>Padding: 40px</p>
                <p>Shadow: 0 20px 60px rgba(0,0,0,0.25)</p>
              </div>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-[#E5E5E5]">
              <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-muted mb-6 border-b border-[#E5E5E5] pb-2">Etapas de Qualificação</h3>
              <div className="space-y-4">
                {[
                  { step: 1, name: 'Captura Básica', fields: 'Nome, E-mail, WhatsApp' },
                  { step: 2, name: 'Perfil do Negócio', fields: 'Empresa, CNPJ, Localização' },
                  { step: 3, name: 'Qualificação Capital', fields: 'Investimento inicial (Hard Gate)' },
                  { step: 4, name: 'Perfil Operacional', fields: 'Time, Experiência Pet' },
                ].map((s) => (
                  <div key={s.step} className="flex gap-4">
                    <span className="w-6 h-6 rounded-full bg-brand-pink/20 text-brand-pink flex items-center justify-center text-[10px] font-black shrink-0">{s.step}</span>
                    <div>
                      <span className="text-xs font-bold block">{s.name}</span>
                      <span className="text-[10px] text-muted">{s.fields}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 12. CARDS */}
        <SectionHeader title="Cards de Produto" subtitle="Estrutura e comportamentos" id="cards" />
        <div className="flex flex-col lg:flex-row gap-12 items-start mb-16">
          <div className="flex-1 flex justify-center">
            <ProductCardDemo />
          </div>
          <div className="flex-1 space-y-8">
            <div className="bg-white p-8 rounded-2xl border border-[#E5E5E5]">
              <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-muted mb-6 border-b border-[#E5E5E5] pb-2">Especificações do Card</h3>
              <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                <div>
                  <span className="text-[10px] font-bold text-muted uppercase block mb-1">Container</span>
                  <p className="text-[11px] leading-relaxed">BG White, Border 1px, Radius 12px, Shadow-card.</p>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-muted uppercase block mb-1">Hover</span>
                  <p className="text-[11px] leading-relaxed">Shadow-card-hover, TranslateY(-4px).</p>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-muted uppercase block mb-1">Tipografia</span>
                  <p className="text-[11px] leading-relaxed">Nome: 13px/600. Preço: 24px/900. Parcelas: 11px.</p>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-muted uppercase block mb-1">Imagem</span>
                  <p className="text-[11px] leading-relaxed">Aspect 1:1, BG #F7F7F7, Position Relative.</p>
                </div>
                <div className="col-span-2">
                  <span className="text-[10px] font-bold text-muted uppercase block mb-1">Posição dos Badges (10.2)</span>
                  <div className="bg-[#F7F7F7] p-4 rounded-lg font-mono text-[10px] space-y-1">
                    <p>position: absolute</p>
                    <p>top: 12px · left: 12px</p>
                    <p>display: flex · flex-direction: column · gap: 4px</p>
                    <p>z-index: 2</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6 bg-brand-pink/5 border border-brand-pink/20 rounded-xl">
              <p className="text-[11px] leading-relaxed italic">
                "O card é a unidade fundamental de conversão. Deve ser limpo, com hierarquia de preço clara e botão de compra sempre visível."
              </p>
            </div>
          </div>
        </div>

        {/* 13. COMPONENTES ESPECÍFICOS DE PRODUTO */}
        <SectionHeader title="Componentes de Produto" subtitle="Elementos exclusivos da PDP e listagem" id="product-specific" />
        <div className="space-y-16 mb-16">
          {/* 11.1 Info Table */}
          <div>
            <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-muted mb-6 border-b border-[#E5E5E5] pb-2">11.1 Tabela de Informações (Rendimento / Custo / Diluição)</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div className="bg-white p-8 rounded-2xl border border-[#E5E5E5]">
                <InfoTable rendimento="300 banhos" custo="R$ 0,69" diluicao="1:5" />
              </div>
              <div className="bg-[#F7F7F7] p-6 rounded-xl font-mono text-[10px] space-y-2">
                <p className="font-bold text-brand-dark">Container:</p>
                <p className="pl-4">display: grid · grid-template-columns: repeat(3, 1fr)</p>
                <p className="pl-4">border: 1px solid #E5E5E5 · border-radius: 8px</p>
                <p className="pl-4">background: #F7F7F7</p>
                <p className="font-bold text-brand-dark mt-4">Label:</p>
                <p className="pl-4">font-size: 10px · font-weight: 700 · text-transform: UPPERCASE</p>
                <p className="pl-4">letter-spacing: 0.12em · color: #999999</p>
                <p className="font-bold text-brand-dark mt-4">Valor:</p>
                <p className="pl-4">font-size: 20px · font-weight: 900 · color: #0D0C0D</p>
              </div>
            </div>
          </div>

          {/* 11.2 Bloco de Preço */}
          <div>
            <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-muted mb-6 border-b border-[#E5E5E5] pb-2">11.2 Bloco de Preço (PDP)</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div className="bg-white p-8 rounded-2xl border border-[#E5E5E5] space-y-6">
                <div className="flex flex-col">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-[17px] text-[#AEAEAE] line-through">R$ 159,90</span>
                    <span className="bg-action-green text-white text-[10px] font-black uppercase px-2 py-1 rounded-full">15% OFF</span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-[30px] font-black text-brand-dark">R$</span>
                    <span className="text-[48px] font-black text-brand-dark leading-none tracking-tighter">129,90</span>
                  </div>
                  <span className="text-[13px] text-[#666666] mt-2">6x de R$ 21,65 sem juros</span>
                  <div className="flex items-center gap-2 mt-3 text-brand-dark">
                    <CashbackIcon size={18} />
                    <span className="text-[13px] font-bold">Ganhe <strong className="font-black text-brand-dark">R$ 10,35</strong> de cashback</span>
                  </div>
                </div>
              </div>
              <div className="bg-[#F7F7F7] p-6 rounded-xl font-mono text-[10px] space-y-2">
                <p className="font-bold text-brand-dark">Preço Atual:</p>
                <p className="pl-4">font-size: 48px · font-weight: 900 · letter-spacing: -0.03em</p>
                <p className="font-bold text-brand-dark mt-2">Prefixo R$:</p>
                <p className="pl-4">font-size: 30px · font-weight: 900</p>
                <p className="font-bold text-brand-dark mt-2">Cashback:</p>
                <p className="pl-4">Lucide 'dollar-sign' (16px) · color: #0D0C0D</p>
              </div>
            </div>
          </div>

          {/* 11.3 Tabs */}
          <div>
            <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-muted mb-6 border-b border-[#E5E5E5] pb-2">11.3 Tabs de Produto (Horizontal e Vertical)</h3>
            <div className="space-y-12">
              <div className="bg-white p-8 rounded-2xl border border-[#E5E5E5]">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-muted mb-6">Versão Horizontal</h4>
                <ProductTabs />
              </div>
              <div className="bg-white p-8 rounded-2xl border border-[#E5E5E5]">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-muted mb-6">Versão Vertical</h4>
                <ProductTabs vertical />
              </div>
            </div>
          </div>
        </div>

        {/* 14. BADGES */}
        <SectionHeader title="Badges & Etiquetas" id="badges" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-10">
          <div className="bg-white p-8 rounded-2xl border border-[#E5E5E5]">
            <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-muted mb-6 border-b border-[#E5E5E5] pb-2">Badges de Produto</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#E5E5E5] text-[10px] font-bold uppercase tracking-widest text-muted">
                    <th className="py-4 px-2">Badge</th>
                    <th className="py-4 px-2">BG</th>
                    <th className="py-4 px-2">Texto</th>
                    <th className="py-4 px-2">Visual</th>
                  </tr>
                </thead>
                <tbody className="text-brand-dark">
                  {[
                    { name: 'Promoção', bg: '#E03E3E', text: '#FFFFFF', radius: '4px' },
                    { name: 'Lançamento', bg: '#0D0C0D', text: '#FFFFFF', radius: '4px' },
                    { name: 'Mais Vendido', bg: '#0D0C0D', text: '#FFFFFF', radius: '4px' },
                    { name: 'PRO', bg: '#0D0C0D', text: '#FFFFFF', radius: '4px' },
                    { name: 'Pré-Venda', bg: '#C8A96E', text: '#0D0C0D', radius: '4px' },
                    { name: '15% OFF', bg: '#3DB85C', text: '#FFFFFF', radius: '9999px' },
                  ].map((b) => (
                    <tr key={b.name} className="border-b border-[#E5E5E5]">
                      <td className="py-3 px-2 text-xs font-bold">{b.name}</td>
                      <td className="py-3 px-2 font-mono text-[10px]">{b.bg}</td>
                      <td className="py-3 px-2 font-mono text-[10px]">{b.text}</td>
                      <td className="py-3 px-2">
                        <span 
                          className="text-[10px] font-black uppercase px-2 py-1 tracking-[0.06em]"
                          style={{ backgroundColor: b.bg, color: b.text, borderRadius: b.radius }}
                        >
                          {b.name}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white p-8 rounded-2xl border border-[#E5E5E5]">
              <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-muted mb-6 border-b border-[#E5E5E5] pb-2">Badge de Qualidade</h3>
              <div className="flex items-center gap-4">
                <span className="bg-action-green text-white text-[10px] font-black uppercase px-3 py-1.5 rounded-full flex items-center gap-1.5 tracking-[0.06em]">
                  <Check size={12} strokeWidth={3} /> VEGANO
                </span>
                <span className="text-[10px] text-muted">Uso: Selos de certificação e diferenciais técnicos.</span>
              </div>
            </div>
            <div className="bg-[#F7F7F7] p-6 rounded-xl">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-muted mb-4">Propriedades Comuns</h4>
              <div className="font-mono text-[10px] space-y-1 text-secondary">
                <p>font-family: 'Figtree', sans-serif</p>
              </div>
            </div>
          </div>
        </div>

        {/* 15. MOTION & TRANSIÇÕES */}
        <SectionHeader title="Motion & Transições" subtitle="Comportamentos interativos e animações" id="motion" />
        <div className="space-y-16 mb-16">
          {/* 15.1 Velocidades */}
          <div>
            <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-muted mb-6 border-b border-[#E5E5E5] pb-2">15.1 Velocidades</h3>
            <div className="bg-white rounded-xl border border-[#E5E5E5] overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-[#F7F7F7] border-b border-[#E5E5E5]">
                  <tr>
                    <th className="py-3 px-4 text-[10px] font-black uppercase tracking-widest text-muted">Token</th>
                    <th className="py-3 px-4 text-[10px] font-black uppercase tracking-widest text-muted">Valor</th>
                    <th className="py-3 px-4 text-[10px] font-black uppercase tracking-widest text-muted">Uso</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E5E5]">
                  <tr>
                    <td className="py-4 px-4 font-mono text-[11px]">--transition-fast</td>
                    <td className="py-4 px-4 text-[13px]">150ms ease</td>
                    <td className="py-4 px-4 text-[12px]">Hover de cores, borders</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 font-mono text-[11px]">--transition-base</td>
                    <td className="py-4 px-4 text-[13px]">250ms ease</td>
                    <td className="py-4 px-4 text-[12px]">Hover de cards, botões, transforms</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 font-mono text-[11px]">--transition-slow</td>
                    <td className="py-4 px-4 text-[13px]">400ms ease</td>
                    <td className="py-4 px-4 text-[12px]">Modais, drawers, animações complexas</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 15.2 Animações CSS */}
          <div>
            <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-muted mb-6 border-b border-[#E5E5E5] pb-2">15.2 Animações CSS</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-[#0D0C0D] p-6 rounded-xl font-mono text-[11px] text-white/80 overflow-x-auto">
                <pre>{`/* Entrada de elementos */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* Entrada lateral */
@keyframes slideInRight {
  from { opacity: 0; transform: translateX(24px); }
  to   { opacity: 1; transform: translateX(0); }
}

/* Pulso do botão CTA */
@keyframes pulseGlow {
  0%, 100% { box-shadow: 0 0 0 0 rgba(61,184,92,0.4); }
  50%       { box-shadow: 0 0 0 10px rgba(61,184,92,0); }
} `}</pre>
              </div>
              <div className="bg-[#0D0C0D] p-6 rounded-xl font-mono text-[11px] text-white/80 overflow-x-auto">
                <pre>{`/* Marquee */
@keyframes marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}

/* Skeleton loading */
@keyframes shimmer {
  0%   { background-position: -400px 0; }
  100% { background-position: 400px 0; }
}`}</pre>
              </div>
            </div>
          </div>

          {/* 15.3 Comportamentos de Hover */}
          <div>
            <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-muted mb-6 border-b border-[#E5E5E5] pb-2">15.3 Comportamentos de Hover</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="bg-white rounded-xl border border-[#E5E5E5] overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-[#F7F7F7] border-b border-[#E5E5E5]">
                    <tr>
                      <th className="py-3 px-4 text-[10px] font-black uppercase tracking-widest text-muted">Elemento</th>
                      <th className="py-3 px-4 text-[10px] font-black uppercase tracking-widest text-muted">Comportamento</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5E5E5]">
                    <tr>
                      <td className="py-4 px-4 text-[13px] font-bold">Card de produto</td>
                      <td className="py-4 px-4 text-[12px] font-mono">translateY(-4px) + shadow upgrade</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-4 text-[13px] font-bold">Botão CTA verde</td>
                      <td className="py-4 px-4 text-[12px] font-mono">translateY(-2px) + shadow upgrade</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-4 text-[13px] font-bold">Botão dark/outline</td>
                      <td className="py-4 px-4 text-[12px] font-mono">translateY(-2px) + shadow</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-4 text-[13px] font-bold">Ícones de social</td>
                      <td className="py-4 px-4 text-[12px] font-mono">scale(1.15) + cor muda para verde</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-4 text-[13px] font-bold">Nav links</td>
                      <td className="py-4 px-4 text-[12px] font-mono">background #F7F7F7</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-4 text-[13px] font-bold">Logo de linha</td>
                      <td className="py-4 px-4 text-[12px] font-mono">translateY(-3px) + shadow</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-4 text-[13px] font-bold">Filtros / Categorias</td>
                      <td className="py-4 px-4 text-[12px] font-mono">border-color: #F4CDD4 + scale(1.02)</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-4 text-[13px] font-bold">Miniaturas (Thumbnails)</td>
                      <td className="py-4 px-4 text-[12px] font-mono">border-color: #E8649A + transition</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="space-y-8">
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted">Exemplos Interativos</h4>
                <div className="grid grid-cols-2 gap-6">
                  <div className="group bg-white p-6 rounded-xl border border-[#E5E5E5] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer flex flex-col items-center gap-3">
                    <div className="w-full h-24 bg-[#F7F7F7] rounded-lg" />
                    <span className="text-[11px] font-black uppercase tracking-wider">Card Hover</span>
                  </div>
                  <div className="flex flex-col gap-4">
                    <button className="btn-primary-green btn-md hover:-translate-y-0.5 hover:shadow-lg transition-all">CTA HOVER</button>
                    <button className="btn-dark btn-md hover:-translate-y-0.5 hover:shadow-lg transition-all">DARK HOVER</button>
                    <div className="flex justify-center gap-4">
                      <Instagram className="text-muted hover:text-action-green hover:scale-110 transition-all cursor-pointer" size={20} />
                      <Youtube className="text-muted hover:text-action-green hover:scale-110 transition-all cursor-pointer" size={20} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 16. CATEGORIAS DE PRODUTO */}
        <SectionHeader title="Categorias de Produto" subtitle="Estrutura de navegação e ícones" id="product-categories" />
        <div className="space-y-12 mb-16">
          <div className="bg-white rounded-xl border border-[#E5E5E5] overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-[#F7F7F7] border-b border-[#E5E5E5]">
                <tr>
                  <th className="py-3 px-4 text-[10px] font-black uppercase tracking-widest text-muted">Categoria</th>
                  <th className="py-3 px-4 text-[10px] font-black uppercase tracking-widest text-muted">URL Shopify</th>
                  <th className="py-3 px-4 text-[10px] font-black uppercase tracking-widest text-muted">Ícone</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E5E5]">
                {[
                  { cat: 'Shampoos', url: '/collections/shampoo', icon: <Droplet size={16} /> },
                  { cat: 'Máscaras', url: '/collections/mascara', icon: <Layers size={16} /> },
                  { cat: 'Condicionadores', url: '/collections/condicionadores-1', icon: <Wind size={16} /> },
                  { cat: 'Perfumes', url: '/collections/perfumes', icon: <Feather size={16} /> },
                  { cat: 'Finalizadores', url: '/collections/finalizadores', icon: <Sliders size={16} /> },
                  { cat: 'Kits B2B', url: '/collections/kits-para-pet-shops', icon: <Package size={16} /> },
                  { cat: 'Auxiliares', url: '/collections/auxiliares', icon: <Wrench size={16} /> },
                  { cat: 'Acessórios', url: '/collections/acessorios', icon: <Scissors size={16} /> },
                  { cat: 'Coloração', url: '/collections/collora', icon: <Edit3 size={16} /> },
                  { cat: 'Lançamentos', url: '/collections/lancamentos-pre-venda', icon: <Zap size={16} /> },
                ].map((item, idx) => (
                  <tr key={idx}>
                    <td className="py-3 px-4 text-[13px] font-bold">{item.cat}</td>
                    <td className="py-3 px-4 text-[11px] font-mono text-muted">{item.url}</td>
                    <td className="py-3 px-4 text-brand-dark">{item.icon}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div>
            <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-muted mb-6 border-b border-[#E5E5E5] pb-2">Por Necessidade</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
              {[
                { label: 'Brilho e Maciez', icon: <Sun size={20} /> },
                { label: 'Pelagem Clara', icon: <Circle size={20} /> },
                { label: 'Pelagem Lisa', icon: <Minus size={20} /> },
                { label: 'Oleosidade', icon: <Droplet size={20} /> },
                { label: 'Pelagem Fluffy', icon: <Cloud size={20} /> },
                { label: 'Tratamentos', icon: <Shield size={20} /> },
                { label: 'Áreas Sensíveis', icon: <Heart size={20} /> },
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-4 rounded-xl border border-[#E5E5E5] flex flex-col items-center gap-3 text-center">
                  <div className="text-brand-pink">{item.icon}</div>
                  <span className="text-[10px] font-bold uppercase tracking-widest leading-tight">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 17. COPYWRITING */}
        <SectionHeader title="Copywriting & Termos" subtitle="Diretrizes de comunicação e conversão" id="copywriting" />
        <div className="space-y-12 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-[#E5E5E5]">
              <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-action-green mb-6 border-b border-action-green/20 pb-2">Termos Preferidos</h3>
              <div className="flex flex-wrap gap-2">
                {['Premium', 'Super Premium', 'Seguro', 'Vegano', 'Cruelty Free', 'Hipoalergênico', 'Alta diluição', 'Alta fixação', 'Limpeza profunda', 'Resultado profissional', 'Economia de produto', 'Brilho saudável', 'Pelagem alinhada', 'Experiência sensorial', 'Assinatura olfativa', 'Tecnologia cosmética', 'Sniff Tech', 'Aumento de ticket médio', 'Fidelização'].map(term => (
                  <span key={term} className="px-3 py-1 bg-action-green/5 text-action-green text-[11px] font-bold rounded-full border border-action-green/10">{term}</span>
                ))}
              </div>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-[#E5E5E5]">
              <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-promo-red mb-6 border-b border-promo-red/20 pb-2">Termos Proibidos</h3>
              <div className="flex flex-wrap gap-2">
                {['cura', 'anti-inflamatório', 'remédio', 'medicinal', 'medicamentoso', 'não causa reação', 'para humanos', 'tratamento dermatológico'].map(term => (
                  <span key={term} className="px-3 py-1 bg-promo-red/5 text-promo-red text-[11px] font-bold rounded-full border border-promo-red/10 line-through opacity-60">{term}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 18. TOM DE VOZ */}
        <SectionHeader title="Tom de Voz" subtitle="A voz que empodera o profissional" id="tone-of-voice" />
        <div className="bg-white p-10 rounded-2xl border border-[#E5E5E5] mb-16">
          <p className="text-lg leading-relaxed text-brand-dark font-light italic border-l-4 border-brand-pink pl-8 mb-8">
            "A comunicação da Bubbles transcende a venda de cosméticos para pets. Ela é a voz que empodera o groomer, transformando o 'banho e tosa' em uma experiência profissional, recompensadora e memorável."
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-sm leading-relaxed text-muted">
            <p>
              Nosso foco é valorizar o trabalho do profissional e o bem-estar do pet, apresentando soluções que geram resultados tangíveis, aumentam a percepção de valor dos serviços e constroem autoridade.
            </p>
            <p>
              A essência é de parceria transformadora, sofisticação acessível e confiança baseada em resultados e comunidade. Queremos que o groomer sinta que a Bubbles é o catalisador para seu crescimento e excelência.
            </p>
          </div>
        </div>

        {/* 19. PERSONALIDADE DA MARCA */}
        <SectionHeader title="Personalidade da Marca" subtitle="Os pilares do nosso comportamento" id="brand-personality" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {[
            { 
              title: 'Especialista Confiável', 
              desc: 'Demonstra profundo conhecimento técnico em grooming e cosmetologia pet, sempre com embasamento científico e prático.' 
            },
            { 
              title: 'Inspiradora e Visionária', 
              desc: 'Motiva o profissional a ir além do básico, a inovar e a enxergar novas possibilidades para seu negócio.' 
            },
            { 
              title: 'Acolhedora e Comunitária', 
              desc: 'Cria um ambiente de troca, apoio e pertencimento. A Bubbles se posiciona como parte da jornada do groomer.' 
            },
            { 
              title: 'Sofisticada e Detalhista', 
              desc: 'Preza pela estética, pela qualidade e pela experiência sensorial. Reflete um cuidado com os mínimos detalhes.' 
            },
            { 
              title: 'Pragmática e Solucionadora', 
              desc: 'Apresenta soluções concretas para os desafios do dia a dia do groomer. Foca em benefícios claros e resultados visíveis.' 
            }
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-8 rounded-2xl border border-[#E5E5E5] hover:border-brand-pink transition-colors group">
              <h4 className="text-[13px] font-black uppercase tracking-wider text-brand-dark mb-3 group-hover:text-brand-pink transition-colors">{item.title}</h4>
              <p className="text-xs leading-relaxed text-muted">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* 20. DIFERENCIAIS COMPETITIVOS */}
        <SectionHeader title="Diferenciais Competitivos" subtitle="O que nos torna únicos no mercado" id="competitive-differentials" />
        <div className="bg-brand-dark p-10 rounded-2xl text-white mb-16">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {[
              { label: 'Frete Grátis', desc: 'Por região' },
              { label: 'Entrega Rápida', desc: 'Logística própria' },
              { label: 'Troca Facilitada', desc: 'Sem burocracia' },
              { label: 'Parcelamento 6x', desc: 'Sem juros' },
              { label: 'Produtos Exclusivos', desc: 'Fórmulas únicas' },
              { label: 'Ingredientes Naturais', desc: 'Base botânica' },
              { label: 'Tecnologia Própria', desc: 'Sniff Tech' },
              { label: 'Programa Fidelidade', desc: 'Cashback real' },
              { label: 'Marca Premium', desc: 'Posicionamento' },
              { label: 'Atendimento', desc: 'Pós-venda humano' },
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col gap-1">
                <span className="text-[11px] font-black uppercase tracking-widest text-brand-pink">{item.label}</span>
                <span className="text-[10px] text-white/60 uppercase tracking-tighter">{item.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 21. DIRETRIZES DE MARCA */}
        <SectionHeader title="Diretrizes de Marca" subtitle="Regras de comunicação e conformidade" id="brand-guidelines" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-2xl border border-promo-red/20">
              <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-promo-red mb-6 flex items-center gap-2">
                <X size={14} /> Palavras Proibidas
              </h4>
              <div className="flex flex-wrap gap-2">
                {['Tratamento dermatológico', 'Feito para humanos', 'Cura', 'Anti-inflamatório', 'Remédio', 'Medicamentoso', 'Medicinal', 'Não causa reação'].map((word, idx) => (
                  <span key={idx} className="px-3 py-1.5 bg-promo-red/5 text-promo-red text-[10px] font-bold uppercase rounded-md border border-promo-red/10">
                    {word}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-action-green/20">
              <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-action-green mb-6 flex items-center gap-2">
                <Check size={14} /> Termos Preferidos
              </h4>
              <div className="flex flex-wrap gap-2">
                {['Premium', 'Super Premium', 'Seguro', 'Vegano', 'Cruelty Free', 'Hipoalergênico', 'Alta diluição', 'Alta fixação', 'Limpeza profunda', 'Eau de Parfum', 'Alta performance', 'Resultado profissional', 'Limpeza eficiente', 'Resultado visível', 'Economia por uso', 'Brilho saudável', 'Pelagem alinhada', 'Redução de nó', 'Experiência sensorial', 'Assinatura olfativa', 'Sniff Tech'].map((word, idx) => (
                  <span key={idx} className="px-3 py-1.5 bg-action-green/5 text-action-green text-[10px] font-bold uppercase rounded-md border border-action-green/10">
                    {word}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-[#F7F7F7] p-8 rounded-2xl border border-[#E5E5E5]">
            <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-brand-dark mb-6">Observações e Restrições</h4>
            <div className="space-y-4 text-[13px] leading-relaxed text-muted">
              <p className="font-bold text-brand-dark">"Produtos destinados exclusivamente ao uso cosmético, sem finalidade dermatológica ou medicamentosa. Indicados para cães e gatos. Produto não comestível."</p>
              <p>Esta frase deve acompanhar comunicações técnicas para evitar problemas regulatórios.</p>
            </div>
          </div>
        </div>

        {/* 22. BACKGROUNDS & DEGRADÊS */}
        <SectionHeader title="Backgrounds & Degradês" subtitle="Sugestões de superfícies e texturas" id="backgrounds-gradients" />
        <div className="space-y-16 mb-16">
          <div>
            <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-muted mb-8 border-b border-[#E5E5E5] pb-2">Sugestões de Degradês</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: 'Pink Pearl', css: 'linear-gradient(135deg, #F4CDD4 0%, #F9E1E5 100%)' },
                { name: 'Bubbles Pink', css: 'linear-gradient(135deg, #F48FA1 0%, #F4CDD4 100%)' },
                { name: 'Soft Glow', css: 'linear-gradient(to bottom, #FFFFFF 0%, #F7F7F7 100%)' },
                { name: 'Brand Contrast', css: 'linear-gradient(135deg, #F4CDD4 0%, #FFFFFF 100%)' },
                { name: 'Pink Sunset', css: 'linear-gradient(135deg, #F48FA1 0%, #F4CDD4 50%, #FFFFFF 100%)' },
                { name: 'Delicate Rose', css: 'linear-gradient(135deg, #F4CDD4 0%, #F48FA1 100%)' },
              ].map((grad, idx) => (
                <div key={idx} className="space-y-3">
                  <div className="h-32 rounded-xl border border-[#E5E5E5] shadow-sm" style={{ background: grad.css }} />
                  <div className="flex flex-col">
                    <span className="text-[11px] font-black uppercase tracking-wider text-brand-dark">{grad.name}</span>
                    <span className="text-[9px] font-mono text-muted truncate">{grad.css}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-muted mb-8 border-b border-[#E5E5E5] pb-2">Sugestões de Texturas</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { 
                  name: 'Bubbles Organic Pattern', 
                  desc: 'Padrão de bolhas orgânicas em diferentes tamanhos e opacidades, criando profundidade suave.',
                  css: `radial-gradient(circle at 20% 30%, rgba(244,205,212,0.2) 0%, rgba(244,205,212,0.2) 5%, transparent 6%),
                        radial-gradient(circle at 70% 60%, rgba(244,205,212,0.15) 0%, rgba(244,205,212,0.15) 8%, transparent 9%),
                        radial-gradient(circle at 40% 80%, rgba(244,205,212,0.1) 0%, rgba(244,205,212,0.1) 4%, transparent 5%),
                        radial-gradient(circle at 90% 20%, rgba(244,205,212,0.1) 0%, rgba(244,205,212,0.1) 3%, transparent 4%),
                        radial-gradient(circle at 10% 90%, rgba(244,205,212,0.05) 0%, rgba(244,205,212,0.05) 10%, transparent 11%)`, 
                  size: '100px 100px',
                  bg: '#FFFFFF'
                },
                { 
                  name: 'Bubbles Floating', 
                  desc: 'Bolhas centralizadas e flutuantes sobre fundo rosa claro, ideal para seções institucionais.',
                  css: `radial-gradient(circle at 50% 50%, rgba(244,205,212,0.1) 0%, rgba(244,205,212,0.1) 20%, transparent 21%),
                        radial-gradient(circle at 10% 10%, rgba(244,205,212,0.05) 0%, rgba(244,205,212,0.05) 10%, transparent 11%)`, 
                  size: '60px 60px',
                  bg: '#FDF2F4'
                },
                { 
                  name: 'Dark Carbon Bubbles', 
                  desc: 'Variação dark com bolhas sutis em branco/cinza, trazendo sofisticação industrial.',
                  css: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.05) 5%, transparent 6%),
                        radial-gradient(circle at 80% 80%, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.03) 10%, transparent 11%)`, 
                  size: '80px 80px',
                  bg: '#0D0C0D'
                },
                { 
                  name: 'Diagonal Bubbles', 
                  desc: 'Combinação de linhas diagonais sutis com bolhas nos cantos, criando movimento.',
                  css: `radial-gradient(circle at 0% 0%, rgba(244,205,212,0.1) 0%, rgba(244,205,212,0.1) 15%, transparent 16%),
                        repeating-linear-gradient(45deg, #F7F7F7, #F7F7F7 10px, #FFFFFF 10px, #FFFFFF 11px)`, 
                  size: '40px 40px',
                  bg: '#FFFFFF'
                },
                { 
                  name: 'Micro Bubbles Grid', 
                  desc: 'Grid técnico de micro bolhas, remetendo à precisão das fórmulas e laboratório.',
                  css: `radial-gradient(circle at 50% 50%, rgba(13,12,13,0.03) 0%, rgba(13,12,13,0.03) 2px, transparent 3px)`, 
                  size: '16px 16px',
                  bg: '#FFFFFF'
                },
                { 
                  name: 'Pink Soft Wave', 
                  desc: 'Ondas suaves que lembram a textura de shampoos e cremes em movimento.',
                  css: `radial-gradient(circle at 100% 50%, transparent 20%, rgba(244,143,161,0.05) 21%, rgba(244,143,161,0.05) 34%, transparent 35%, transparent)`, 
                  size: '80px 80px',
                  bg: '#FDF2F4'
                },
                { 
                  name: 'Industrial Mesh', 
                  desc: 'Textura que remete a malhas industriais, reforçando o conceito "Industrial de Luxo".',
                  css: `linear-gradient(90deg, rgba(0,0,0,0.02) 1px, transparent 1px), linear-gradient(0deg, rgba(0,0,0,0.02) 1px, transparent 1px)`, 
                  size: '20px 20px',
                  bg: '#FFFFFF'
                },
                { 
                  name: 'Bubbles Cluster', 
                  desc: 'Agrupamentos densos de bolhas em áreas específicas, criando pontos de interesse visual.',
                  css: `radial-gradient(circle at 20% 20%, rgba(244,205,212,0.1) 0%, rgba(244,205,212,0.1) 10%, transparent 11%),
                        radial-gradient(circle at 25% 25%, rgba(244,205,212,0.08) 0%, rgba(244,205,212,0.08) 5%, transparent 6%)`, 
                  size: '120px 120px',
                  bg: '#FFFFFF'
                },
                { 
                  name: 'Soap Foam', 
                  desc: 'Textura densa que simula a espuma rica dos shampoos Bubbles.',
                  css: `radial-gradient(circle, rgba(244,205,212,0.1) 0%, transparent 70%)`, 
                  size: '30px 30px',
                  bg: '#FFFFFF'
                },
                { 
                  name: 'Clean Laboratory', 
                  desc: 'Padrão minimalista que evoca limpeza e ambiente controlado de laboratório.',
                  css: `linear-gradient(45deg, rgba(229,229,229,0.2) 25%, transparent 25%, transparent 50%, rgba(229,229,229,0.2) 50%, rgba(229,229,229,0.2) 75%, transparent 75%, transparent)`, 
                  size: '4px 4px',
                  bg: '#FFFFFF'
                },
                { 
                  name: 'Luxury Silk', 
                  desc: 'Degradê suave com linhas horizontais que lembram a textura da seda.',
                  css: `linear-gradient(to right, rgba(244,205,212,0.05) 1px, transparent 1px)`, 
                  size: '100% 4px',
                  bg: '#FDF2F4'
                },
                { 
                  name: 'Bubbles Constellation', 
                  desc: 'Pequenas bolhas conectadas por linhas finas, simbolizando a rede de profissionais.',
                  css: `radial-gradient(circle at 10px 10px, rgba(13,12,13,0.05) 2px, transparent 0)`, 
                  size: '40px 40px',
                  bg: '#FFFFFF'
                },
              ].map((text, idx) => (
                <div key={idx} className="space-y-3">
                  <div 
                    className="h-32 rounded-xl border border-[#E5E5E5] shadow-sm" 
                    style={{ 
                      backgroundColor: text.bg,
                      backgroundImage: text.css,
                      backgroundSize: text.size
                    }} 
                  />
                  <div className="flex flex-col">
                    <span className="text-[11px] font-black uppercase tracking-wider text-brand-dark">{text.name}</span>
                    <p className="text-[9px] text-muted mt-1 leading-tight">{text.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 23. TOKENS CSS */}
        <SectionHeader title="Tokens CSS — Referência Completa" subtitle="Variáveis de sistema para desenvolvimento" id="tokens" />
        <div className="bg-white p-8 rounded-2xl border border-[#E5E5E5] mb-16">
          <div className="bg-[#0D0C0D] p-8 rounded-xl font-mono text-[11px] text-white/90 overflow-x-auto leading-relaxed">
            <pre>{`:root {
  /* ── MARCA ── */
  --color-brand-pink:         #F4CDD4;
  --color-brand-dark:         #0D0C0D;
  --color-brand-white:        #FFFFFF;

  /* ── CTA ── */
  --color-action-green:       #3DB85C;
  --color-action-green-hover: #2fa04e;
  --color-action-green-shadow: rgba(61,184,92,0.35);

  /* ── STATUS ── */
  --color-promo-red:          #E03E3E;
  --color-star-orange:        #F5A623;
  --color-success-light:      #E8F7EE;

  /* ── LINHAS ── */
  --color-line-pro:           #0D0C0D;
  --color-line-essential:     #F4CDD4;
  --color-line-xperience:     #C8A96E;
  --color-line-collora:       #B066C6;

  /* ── SUPERFÍCIES ── */
  --surface-page:             #FFFFFF;
  --surface-card:             #FFFFFF;
  --surface-card-alt:         #F7F7F7;
  --surface-pink-light:       #FDF2F4;
  --surface-pink-section:     #FCEEF1;
  --surface-dark:             #0D0C0D;
  --surface-input:            #FFFFFF;

  /* ── TEXTO ── */
  --text-primary:             #0D0C0D;
  --text-secondary:           #666666;
  --text-muted:               #999999;
  --text-strikethrough:       #AEAEAE;
  --text-on-dark:             #FFFFFF;
  --text-on-dark-muted:       rgba(255,255,255,0.55);

  /* ── BORDAS ── */
  --border-default:           #E5E5E5;
  --border-focus:             #F4CDD4;
  --border-focus-shadow:      rgba(244,205,212,0.35);
  --border-dark:              rgba(255,255,255,0.10);

  /* ── TIPOGRAFIA ── */
  --font-family:              'Figtree', sans-serif;
  --font-weight-black:        900;
  --font-weight-bold:         700;
  --font-weight-semibold:     600;
  --font-weight-regular:      400;

  /* ── ESCALA DE TAMANHOS ── */
  --text-xs:   11px;  --text-sm:   13px;  --text-base: 15px;
  --text-lg:   20px;  --text-xl:   24px;  --text-2xl:  30px;
  --text-3xl:  38px;  --text-4xl:  48px;  --text-5xl:  64px;

  /* ── ESPAÇAMENTO ── */
  --space-1: 4px; --space-2: 8px; --space-3: 12px; --space-4: 16px;
  --space-8: 32px; --space-12: 48px; --space-20: 80px;

  /* ── BORDAS ARREDONDADAS ── */
  --radius-sm: 4px; --radius-md: 8px; --radius-lg: 12px;
  --radius-xl: 20px; --radius-full: 9999px;

  /* ── SOMBRAS ── */
  --shadow-sm:        0 1px 3px rgba(0,0,0,0.08);
  --shadow-card:      0 2px 8px rgba(0,0,0,0.07);
  --shadow-card-hover: 0 8px 24px rgba(0,0,0,0.14);
  --shadow-cta:       0 4px 16px rgba(61,184,92,0.35);

  /* ── TRANSIÇÕES ── */
  --transition-fast: 150ms ease;
  --transition-base: 250ms ease;
  --transition-slow: 400ms ease;
}`}</pre>
          </div>
        </div>

        <style>{`
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          @keyframes slideInRight {
            from { opacity: 0; transform: translateX(24px); }
            to   { opacity: 1; transform: translateX(0); }
          }
          @keyframes pulseGlow {
            0%, 100% { box-shadow: 0 0 0 0 rgba(61,184,92,0.4); }
            50%       { box-shadow: 0 0 0 10px rgba(61,184,92,0); }
          }
          @keyframes marquee {
            from { transform: translateX(0); }
            to   { transform: translateX(-50%); }
          }
          @keyframes shimmer {
            0%   { background-position: -400px 0; }
            100% { background-position: 400px 0; }
          }
          
          .animate-fade-in-up { animation: fadeInUp 0.6s ease forwards; }
          .animate-slide-in-right { animation: slideInRight 0.4s ease forwards; }
          .animate-pulse-glow { animation: pulseGlow 2s infinite; }
          .animate-marquee { animation: marquee 20s linear infinite; }
          .animate-shimmer { 
            background: linear-gradient(to right, #f6f7f8 0%, #edeef1 20%, #f6f7f8 40%, #f6f7f8 100%);
            background-size: 800px 104px;
            animation: shimmer 1.5s infinite linear;
          }
        `}</style>
      </main>
    </div>
  </div>
  );
}
