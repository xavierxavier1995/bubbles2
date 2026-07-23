import React, { useState, useEffect, useRef } from 'react';
import { 
  TrendingUp, DollarSign, Truck, Package, ChevronDown, CheckCircle, CheckCircle2, 
  ArrowRight, Star, HelpCircle, Instagram, Youtube, MessageCircle, Phone, Mail,
  Shield, Zap, BarChart3, Users, Award, Lock, X, ChevronRight, Calculator,
  BookOpen, GraduationCap, Sparkles, Clock, Droplets, Wind, Beaker, Leaf, Eye, Heart, Globe,
  ChevronLeft, MapPin, Building2, Calendar, Award as Trophy
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { maskPhone, maskCpfCnpj, unmask } from '../utils/masks';

// --- Logo Header Component ---
const PetSouthLogoSVG = React.memo(() => (
  <svg 
    viewBox="0 0 670 380" 
    className="h-7 sm:h-9 md:h-11 w-auto shrink-0 drop-shadow-[0_0_12px_rgba(147,51,234,0.4)]" 
    aria-label="PET South America Logo"
    role="img"
  >
    <g fill="#9333EA">
      {/* 3 paw dots above 'e' */}
      <circle cx="280" cy="46" r="30" />
      <circle cx="355" cy="18" r="30" />
      <circle cx="430" cy="46" r="30" />
      
      {/* 'p' */}
      <path d="M 20 90 H 130 C 190 90, 230 125, 230 172 C 230 220, 190 255, 130 255 H 85 V 345 H 20 Z M 85 142 V 203 H 130 C 153 203, 168 189, 168 172 C 168 155, 153 142, 130 142 Z" />
      
      {/* 'e' */}
      <path d="M 355 90 C 270 90, 210 145, 210 215 C 210 285, 270 340, 355 340 C 413 340, 460 315, 487 276 L 441 242 C 423 266, 395 284, 355 284 C 305 284, 271 252, 269 215 H 493 C 495 202, 497 189, 497 176 C 497 122, 440 90, 355 90 Z M 270 172 C 280 140, 310 128, 355 128 C 400 128, 427 140, 435 172 Z" />

      {/* 'T' */}
      <path d="M 515 90 H 655 V 142 H 602 V 345 H 542 V 142 H 515 Z" />

      {/* 'South America' */}
      <text x="338" y="398" fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" fontWeight="900" fontSize="56" letterSpacing="0.5" textAnchor="middle">South America</text>
    </g>
  </svg>
));

const BubblesPetSouthLogo = React.memo(() => (
  <div className="flex items-center gap-2.5 sm:gap-3.5 md:gap-4">
    {/* Bubbles Logo */}
    <img 
      src="https://bubbles.gabrielxavier.online/BUBBLES.svg" 
      alt="Bubbles® Logo" 
      className="h-6 sm:h-7 md:h-9 w-auto brightness-0 invert shrink-0"
      referrerPolicy="no-referrer"
      fetchPriority="high"
      width="130"
      height="36"
    />

    <span className="text-white/30 font-light text-base md:text-lg select-none">×</span>

    {/* PET South America Official Logo */}
    <div className="flex items-center">
      <PetSouthLogoSVG />
    </div>
  </div>
));

// --- Carousel Component ---
const CarouselWrapper = React.memo(({ children, carouselRef, showOnDesktop = false, showGradient = false }: { children: React.ReactNode, carouselRef: React.RefObject<HTMLDivElement | null>, showOnDesktop?: boolean, showGradient?: boolean }) => {
  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      const scrollStep = clientWidth > 768 ? 400 : 300;
      
      if (direction === 'right') {
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          carouselRef.current.scrollBy({ left: scrollStep, behavior: 'smooth' });
        }
      } else {
        if (scrollLeft <= 10) {
          carouselRef.current.scrollTo({ left: scrollWidth, behavior: 'smooth' });
        } else {
          carouselRef.current.scrollBy({ left: -scrollStep, behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <div className="relative group/carousel">
      {showGradient && (
        <>
          <div className="absolute top-0 bottom-0 -left-6 md:left-0 w-12 md:w-32 bg-gradient-to-r from-[#080808] via-[#080808]/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 bottom-0 -right-6 md:right-0 w-12 md:w-32 bg-gradient-to-l from-[#080808] via-[#080808]/80 to-transparent z-10 pointer-events-none" />
        </>
      )}
      {children}
      <div className={`absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between pointer-events-none z-20 ${showOnDesktop ? '' : 'md:hidden'} opacity-100 transition-opacity px-0`}>
        <button 
          onClick={() => scroll('left')}
          className="w-10 h-10 rounded-full bg-[#080808]/80 backdrop-blur-md border border-white/20 flex items-center justify-center text-white pointer-events-auto hover:bg-[#F4CDD4] hover:text-[#080808] transition-colors shadow-lg ml-2 md:-ml-5"
        >
          <ChevronLeft size={24} />
        </button>
        <button 
          onClick={() => scroll('right')}
          className="w-10 h-10 rounded-full bg-[#080808]/80 backdrop-blur-md border border-white/20 flex items-center justify-center text-white pointer-events-auto hover:bg-[#F4CDD4] hover:text-[#080808] transition-colors shadow-lg mr-2 md:-mr-5"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
});

// --- Sticky Bottom Bar ---
const StickyBar = React.memo(({ onOpenForm, heroButtonRef }: { onOpenForm: () => void, heroButtonRef: React.RefObject<HTMLButtonElement | null> }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (heroButtonRef.current) {
        const rect = heroButtonRef.current.getBoundingClientRect();
        setIsVisible(rect.bottom < 0);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [heroButtonRef]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          className="fixed bottom-0 left-0 w-full z-50 bg-[#080808]/90 backdrop-blur-md border-t border-[#F4CDD4]/20 py-3 md:py-4 px-4 md:px-6 flex items-center justify-between shadow-[0_-5px_20px_rgba(244,205,212,0.15)]"
        >
          <div className="flex items-center gap-3">
            <BubblesPetSouthLogo />
            <p className="text-white text-[10px] md:text-xs font-bold hidden lg:block opacity-80">
              Atendimento Especial <span className="text-[#F4CDD4]">PET South America</span>. Garanta exclusividade na sua região.
            </p>
          </div>
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onOpenForm}
            className="bg-gradient-to-r from-[#F4CDD4] via-[#FDE8ED] to-[#F4CDD4] text-[#080808] px-5 md:px-8 py-2.5 rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest shadow-[0_0_15px_rgba(244,205,212,0.3)] transition-all shrink-0 text-center"
          >
            Seja Distribuidor PET South
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

// --- Benefits Marquee ---
const BenefitsMarquee = React.memo(() => {
  const benefits = [
    "Destaque PET South America", "Margens de Lucro Elevadas", "Exclusividade Territorial", 
    "Suporte de Marketing 360º", "Produtos Veganos e Cruelty-free", 
    "Alta Diluição 1:10", "Fragrâncias de Perfumaria Fina", "Material de PDV Gratuito",
    "Alta Recompra (98%)", "Produto Favorito dos Groomers", "Suporte no Sell-out"
  ];

  return (
    <div className="bg-gradient-to-r from-[#F4CDD4] via-[#FFFFFF] to-[#F4CDD4] py-3.5 overflow-hidden border-y border-[#F4CDD4]/30 relative z-20">
      <div className="flex whitespace-nowrap animate-marquee">
        {[...benefits, ...benefits].map((benefit, i) => (
          <div key={i} className="flex items-center gap-3 mx-6">
            <Sparkles size={14} className="text-[#080808]" />
            <span className="text-[#080808] font-black text-[10px] uppercase tracking-widest">{benefit}</span>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 12s linear infinite;
        }
      `}</style>
    </div>
  );
});

// --- Hero Showcase Lines ---
const HeroCarousel = React.memo(() => {
  const [index, setIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const lines = [
    { name: "Linha PRO", desc: "Máximo rendimento e alta diluição 1:10 para estéticas", imgDesktop: "https://bubbles.gabrielxavier.online/bubbles-linha-pro-desktop.webp", imgMobile: "https://bubbles.gabrielxavier.online/bubbles-linha-pro-mobile.webp" },
    { name: "Essential", desc: "O melhor custo-benefício de alta rotação", imgDesktop: "https://bubbles.gabrielxavier.online/bubbles-linha-essential-desktop.webp", imgMobile: "https://bubbles.gabrielxavier.online/bubbles-linha-essential-mobile.webp" },
    { name: "Xperience", desc: "Sensorial premium e fixação prolongada", imgDesktop: "https://bubbles.gabrielxavier.online/bubbles-linha-xperience-desktop.webp", imgMobile: "https://bubbles.gabrielxavier.online/bubbles-linha-xperience-mobile.webp" },
    { name: "Collora", desc: "Tratamento de cor e brilho tridimensional", imgDesktop: "https://bubbles.gabrielxavier.online/bubbles-kit-collora-desktop.webp", imgMobile: "https://bubbles.gabrielxavier.online/bubbles-kit-collora-mobile.webp" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % lines.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div ref={carouselRef} className="relative w-full h-full group overflow-hidden rounded-[32px] border border-[#F4CDD4]/20 shadow-2xl">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <picture>
            <source media="(max-width: 768px)" srcSet={lines[index].imgMobile} />
            <source media="(min-width: 769px)" srcSet={lines[index].imgDesktop} />
            <img 
              src={lines[index].imgDesktop} 
              alt={lines[index].name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-black/30" />
          
          <div className="absolute bottom-6 left-6 right-6 z-20">
            <motion.div initial={{ y: 15, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
              <div className="inline-block px-3 py-1 bg-[#F4CDD4] text-[#080808] text-[9px] font-black uppercase tracking-widest rounded-full mb-2 shadow-lg">
                Destaque PET South America
              </div>
              <h3 className="text-xl font-black text-white mb-1 drop-shadow-md">{lines[index].name}</h3>
              <p className="text-white/80 font-semibold text-xs drop-shadow-sm">{lines[index].desc}</p>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute top-6 right-6 flex gap-1.5 z-30">
        {lines.map((_, i) => (
          <div 
            key={i} 
            className={`h-1.5 rounded-full transition-all duration-500 ${i === index ? 'w-6 bg-[#F4CDD4]' : 'w-2 bg-white/30'}`} 
          />
        ))}
      </div>
    </div>
  );
});

// --- Traditional ROI Calculator Component ---
const ROICalculator = React.memo(() => {
  const [investment, setInvestment] = useState(10000);
  const paybackMonths = "2-3";

  const revenue = Math.round(investment / 0.55); 
  const profit = revenue - investment;

  return (
    <section id="calculadora" className="py-12 md:py-20 px-6 md:px-10 bg-[#080808] relative overflow-hidden border-y border-[#F4CDD4]/20">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8 md:mb-10">
          <span className="text-[#F4CDD4] text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] mb-2 md:mb-3 block">Simulador de Negócio</span>
          <h2 className="text-2xl md:text-4xl font-black text-white mb-4 md:mb-6 leading-tight tracking-tight uppercase">
            O Retorno <br className="block md:hidden" />
            Que o seu <br className="block md:hidden" />
            <span className="text-[#F4CDD4]">Capital Merece.</span>
          </h2>
        </div>
        
        <div className="grid lg:grid-cols-5 gap-4 md:gap-8 items-stretch">
          <div className="lg:col-span-3 order-1 lg:order-2 bg-gradient-to-br from-[#1A1A1A] to-[#080808] border border-[#F4CDD4]/20 p-6 md:p-12 rounded-[24px] md:rounded-[32px] shadow-2xl relative group flex flex-col justify-center overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <TrendingUp size={60} className="md:w-[100px] md:h-[100px] text-[#F4CDD4]" />
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 md:gap-10 relative z-10">
              <div>
                <p className="text-white/40 text-[8px] md:text-[10px] font-black uppercase tracking-widest mb-1 md:mb-2">Faturamento (1º Ciclo)</p>
                <p className="text-xl md:text-3xl font-black text-white tracking-tighter">R$ {revenue.toLocaleString('pt-BR')}</p>
              </div>
              
              <div>
                <p className="text-[#F4CDD4] text-[8px] md:text-[10px] font-black uppercase tracking-widest mb-1 md:mb-2">Potencial de Ganho de até</p>
                <p className="text-xl md:text-3xl font-black text-[#F4CDD4] tracking-tighter drop-shadow-[0_0_15px_rgba(244,205,212,0.3)]">R$ {profit.toLocaleString('pt-BR')}</p>
              </div>
            </div>
            
            <div className="mt-4 md:mt-8 pt-4 md:pt-8 border-t border-white/10">
              <p className="text-white/40 text-[8px] md:text-[10px] italic leading-relaxed">
                *Cálculo baseado na margem média praticada. O giro de estoque ocorre em ciclos de 45 a 60 dias. Esses dados podem variar de acordo com região, logística e processos do distribuidor.
              </p>
            </div>
          </div>

          <div className="lg:col-span-2 order-2 lg:order-1 bg-[#121212] border border-white/5 p-5 md:p-8 rounded-[24px] md:rounded-[32px] shadow-xl flex flex-col justify-center space-y-4 md:space-y-6">
            <div>
              <div className="flex justify-between items-center mb-3 md:mb-4">
                <span className="text-white/60 font-bold text-[9px] md:text-[10px] uppercase tracking-widest">Investimento</span>
                <span className="text-[#F4CDD4] text-lg md:text-2xl font-black">R$ {investment.toLocaleString('pt-BR')}</span>
              </div>
              <input 
                type="range" min="10000" max="100000" step="5000"
                value={investment} onChange={(e) => setInvestment(parseInt(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-[#F4CDD4] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-8 [&::-webkit-slider-thumb]:h-8 md:[&::-webkit-slider-thumb]:w-6 md:[&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:bg-[#F4CDD4] [&::-webkit-slider-thumb]:rounded-full"
              />
              <div className="flex justify-between text-[7px] md:text-[8px] text-white/40 mt-2 md:mt-3 font-bold uppercase tracking-widest">
                <span className="text-[#F4CDD4]">Mínimo R$ 10k</span>
                <span>Escala</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 md:gap-4">
              <div className="bg-white/5 p-2 md:p-4 rounded-xl md:rounded-2xl border border-white/5">
                <p className="text-white/40 text-[6px] md:text-[8px] font-black uppercase tracking-widest mb-0.5 md:mb-1">Margem Média</p>
                <p className="text-xs md:text-base font-black text-white">Até 45%</p>
              </div>
              <motion.div 
                animate={{ 
                  scale: [1, 1.02, 1],
                  opacity: [0.8, 1, 0.8]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="bg-white/5 p-2 md:p-4 rounded-xl md:rounded-2xl border border-[#F4CDD4]/20"
              >
                <p className="text-white/40 text-[6px] md:text-[8px] font-black uppercase tracking-widest mb-0.5 md:mb-1">Payback</p>
                <p className="text-xs md:text-base font-black text-white">{paybackMonths} Meses</p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

// --- Nossa Essência Section Component ---
const NossaEssenciaSection = React.memo(() => {
  const statsCarouselRef = useRef<HTMLDivElement>(null);

  return (
    <section id="quem-somos" className="relative py-16 md:py-24 px-6 md:px-10 overflow-hidden flex items-center min-h-[60vh] border-b border-white/10">
      <video 
        autoPlay 
        muted 
        loop 
        playsInline 
        preload="none"
        poster="https://bubbles.gabrielxavier.online/capa_linha-pro.jpg"
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="https://www.bubbles.com.br/cdn/shop/videos/c/vp/6fd9894dcddb47b5883886091db28520/6fd9894dcddb47b5883886091db28520.HD-1080p-7.2Mbps-45960585.mp4?v=0" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/80 z-10" />
      
      <div className="max-w-7xl mx-auto relative z-20 w-full">
        <div className="text-center mb-10">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-[#F4CDD4] text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] mb-2 block"
          >
            Nossa Essência
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-2xl md:text-4xl font-black text-white mb-4 tracking-tighter"
          >
            Quem é a <span className="text-[#F4CDD4]">Bubbles®?</span>
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="space-y-3 text-white/90 text-sm md:text-base leading-relaxed font-medium">
              <p>
                A Bubbles® nasceu da vontade de transformar a experiência de banho e tosa em algo mais profissional, sensorial e consciente, tanto para o groomer quanto para o pet.
              </p>
              <p>
                Com <span className="text-[#F4CDD4] font-black">mais de 7 anos de história</span>, elevamos o padrão do mercado, transformando cada atendimento em uma experiência memorável.
              </p>
            </div>
          </motion.div>
        </div>

        <CarouselWrapper carouselRef={statsCarouselRef} hideArrows={true}>
          <div className="flex gap-4 overflow-x-auto pb-8 snap-x snap-mandatory no-scrollbar -mx-6 px-6 lg:mx-0 lg:px-0 lg:grid lg:grid-cols-5 lg:gap-3" ref={statsCarouselRef}>
            {[
              { label: "Tempo de Mercado", val: "+7 Anos", icon: Clock, desc: "Pioneirismo e Inovação" },
              { label: "NPS e Satisfação", val: "4.9/5.0", icon: Star, desc: "Aprovação Máxima" },
              { label: "Base de Groomers", val: "+5.000", icon: Users, desc: "Especialistas de Elite" },
              { label: "Clientes Ativos", val: "+20.000", icon: Heart, desc: "Tutores Apaixonados" },
              { label: "Mix de Soluções", val: "+50", icon: Package, desc: "Produtos Exclusivos" }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-[16px] text-center shadow-2xl hover:bg-white/10 hover:border-[#F4CDD4]/30 transition-all duration-500 group min-w-[200px] lg:min-w-0 snap-center"
              >
                <div className="w-8 h-8 bg-[#F4CDD4]/10 rounded-[10px] flex items-center justify-center mx-auto mb-2 group-hover:bg-[#F4CDD4] transition-all duration-500">
                  <stat.icon size={16} className="text-[#F4CDD4] group-hover:text-[#080808] transition-colors duration-500" />
                </div>
                <p className="text-lg font-black text-white mb-0.5 tracking-tight">{stat.val}</p>
                <p className="text-[#F4CDD4] text-[10px] font-black uppercase tracking-widest mb-0.5">{stat.label}</p>
                <p className="text-white/40 text-[9px] font-bold uppercase tracking-tighter">{stat.desc}</p>
              </motion.div>
            ))}
          </div>
        </CarouselWrapper>
      </div>
    </section>
  );
});

// --- Multi-Step Form Modal ---
const MultiStepForm = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [lastCandidacyId, setLastCandidacyId] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    cnpj: '',
    city: '',
    targetCities: '',
    hasCnpj: '',
    hasErp: '',
    hasInvestment: '',
    businessModel: '',
    previousBrands: '',
    utm_source: '',
    utm_medium: '',
    utm_campaign: '',
    utm_term: '',
    utm_content: '',
    fbclid: '',
    gclid: '',
    full_url: ''
  });

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStep(1);
      setIsSuccess(false);
    }, 300);
  };

  useEffect(() => {
    if (isOpen) {
      const urlParams = new URLSearchParams(window.location.search);
      const generatedId = Math.random().toString(36).substr(2, 9).toUpperCase();
      setLastCandidacyId(generatedId);
      
      setFormData(prev => ({
        ...prev,
        utm_source: urlParams.get('utm_source') || 'pet_south_america',
        utm_medium: urlParams.get('utm_medium') || 'event_landing',
        utm_campaign: urlParams.get('utm_campaign') || 'pet_south_2025',
        utm_term: urlParams.get('utm_term') || '',
        utm_content: urlParams.get('utm_content') || '',
        fbclid: urlParams.get('fbclid') || '',
        gclid: urlParams.get('gclid') || '',
        full_url: window.location.href
      }));
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleNext = () => setStep(s => s + 1);
  const handlePrev = () => setStep(s => s - 1);

  const isQualified = formData.hasInvestment === 'yes';

  const isEmailValid = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isPhoneValid = (phone: string) => unmask(phone).length >= 10;
  const isCnpjCpfValid = (value: string) => {
    const clean = unmask(value);
    if (formData.hasCnpj === 'no') return clean.length === 11;
    return clean.length === 14;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData, whatsapp: maskPhone(e.target.value)});
  };

  const handleCnpjChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData, cnpj: maskCpfCnpj(e.target.value)});
  };

  const getWhatsAppLink = (idToUse: string) => {
    const cid = idToUse || lastCandidacyId || 'N/A';
    const message = `Olá! Preenchi a candidatura de distribuidor PET South America Bubbles® e gostaria de comprar produtos com condições diferenciadas e exclusivas.

*ID de Atendimento PET South:* ${cid}
*Nome:* ${formData.name}
*E-mail:* ${formData.email}
*WhatsApp:* ${formData.whatsapp}
*Documento (CPF/CNPJ):* ${formData.cnpj || 'Não informado'}
*Cidade:* ${formData.city}
*Cidades de Atendimento:* ${formData.targetCities}
*Modelo de Negócio:* ${formData.businessModel}
*Trabalha com outras marcas:* ${formData.previousBrands || 'Não informado'}

Quero comprar com condições exclusivas da feira!`;

    return `https://wa.me/5514996312932?text=${encodeURIComponent(message)}`;
  };

  const finishForm = async () => {
    localStorage.setItem('formSubmitted', 'true');
    setIsSubmitting(true);

    const candidacyId = lastCandidacyId || Math.random().toString(36).substr(2, 9).toUpperCase();
    if (!lastCandidacyId) {
      setLastCandidacyId(candidacyId);
    }

    if (isQualified) {
      try {
        const payload = {
          nome: formData.name,
          email: formData.email,
          telefone: unmask(formData.whatsapp),
          possui_cnpj: formData.hasCnpj === 'yes' ? 'Sim' : 'Não',
          utiliza_erp: formData.hasErp === 'yes' ? 'Sim' : 'Não',
          cnpj: unmask(formData.cnpj),
          cidade_estabelecimento: formData.city,
          cidade_atuacao: formData.targetCities,
          modelo_negocio: formData.businessModel,
          marcas_anteriores: formData.previousBrands,
          investimento: formData.hasInvestment === 'yes' ? 'Acima de 10.000,00' : 'Abaixo de 10.000,00',
          utm_source: formData.utm_source,
          utm_medium: formData.utm_medium,
          utm_campaign: formData.utm_campaign,
          utm_term: formData.utm_term,
          utm_content: formData.utm_content,
          full_url: formData.full_url,
          candidacyId: candidacyId,
          fbclid: formData.fbclid,
          gclid: formData.gclid
        };

        const response = await fetch('/api/leads', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (typeof window !== 'undefined' && (window as any).dataLayer) {
          (window as any).dataLayer.push({
            event: 'lead_form_submitted',
            form_type: 'distribuidor_pet_south',
            language: 'pt-br'
          });
        }
      } catch (error) {
        console.error("Erro ao enviar formulário:", error);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setIsSubmitting(false);
      try {
        const waLink = getWhatsAppLink(candidacyId);
        window.open(waLink, '_blank');
      } catch (e) {}
    }

    setIsSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md">
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-[#121212] border border-white/10 rounded-[32px] w-full max-w-2xl overflow-hidden shadow-2xl"
      >
        <div className="p-8 border-b border-white/5 flex justify-between items-center bg-[#1A1A1A]">
          <div>
            <h3 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
              <span>{isSuccess ? 'Candidatura Recebida' : 'Candidatura PET South America'}</span>
            </h3>
            {!isSuccess && (
              <p className="text-[#F4CDD4] text-[10px] uppercase tracking-widest mt-1 font-bold">Passo {step} de 5 • Vagas Limitadas</p>
            )}
          </div>
          <button onClick={handleClose} className="text-white/40 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        {!isSuccess && (
          <div className="h-1 bg-white/5 w-full">
            <motion.div 
              className="h-full bg-gradient-to-r from-[#F4CDD4] via-[#FDE8ED] to-[#F4CDD4]"
              initial={{ width: '0%' }}
              animate={{ width: `${(step / 5) * 100}%` }}
            />
          </div>
        )}

        <div id="form-distribuidor-petsouth" className="p-8 md:p-12">
          <AnimatePresence mode="wait">
            {isSuccess ? (
              <motion.div
                key="success"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="space-y-6 text-center py-4"
              >
                <div className="w-16 h-16 bg-[#F4CDD4]/15 text-[#F4CDD4] rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_20px_rgba(244,205,212,0.3)] animate-pulse">
                  <CheckCircle size={36} />
                </div>
                
                <h4 className="text-2xl font-black text-white tracking-tight">
                  {isQualified ? 'Candidatura PET South Recebida!' : 'Atendimento Especial Exclusivo'}
                </h4>
                
                <p className="text-white/80 text-sm max-w-md mx-auto leading-relaxed">
                  {isQualified ? (
                    <>
                      Agradecemos seu contato no ecossistema PET South America Bubbles®.
                      <br /><br />
                      Nossa equipe de expansão recebeu seus dados comerciais com sucesso (ID PET South: <span className="text-[#F4CDD4] font-mono">{lastCandidacyId}</span>). Entraremos em contato em breve.
                    </>
                  ) : (
                    <>
                      Direcionamos o seu atendimento para o nosso canal exclusivo no WhatsApp.
                      <br /><br />
                      (ID do Atendimento: <span className="text-[#F4CDD4] font-mono">{lastCandidacyId}</span>)
                    </>
                  )}
                </p>

                <div className="pt-6 flex flex-col sm:flex-row gap-4 justify-center items-center">
                  {!isQualified && (
                    <a 
                      href={getWhatsAppLink(lastCandidacyId)}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto px-8 bg-[#F4CDD4] text-[#080808] py-4 rounded-xl font-black uppercase tracking-widest text-xs hover:scale-105 transition-transform flex items-center justify-center gap-2"
                    >
                      <MessageCircle size={16} /> Abrir WhatsApp Comercial
                    </a>
                  )}
                  <button 
                    onClick={handleClose}
                    className="w-full sm:w-auto px-8 py-4 rounded-xl font-black uppercase tracking-widest text-xs bg-[#F4CDD4] text-[#080808]"
                  >
                    Fechar
                  </button>
                </div>
              </motion.div>
            ) : (
              <>
                {step === 1 && (
                  <motion.div key="step1" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-6">
                    <h4 className="text-xl font-black text-white mb-6">Dados de Contato da Feira</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="text-xs font-bold text-white/70 uppercase tracking-wider block mb-2">Seu Nome Completo *</label>
                        <input 
                          type="text" 
                          placeholder="Ex: Gabriel Xavier" 
                          value={formData.name} 
                          onChange={e => setFormData({...formData, name: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white text-sm focus:border-[#F4CDD4] outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-white/70 uppercase tracking-wider block mb-2">Seu E-mail Corporativo *</label>
                        <input 
                          type="email" 
                          placeholder="contato@suadistribuidora.com.br" 
                          value={formData.email} 
                          onChange={e => setFormData({...formData, email: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white text-sm focus:border-[#F4CDD4] outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-white/70 uppercase tracking-wider block mb-2">WhatsApp com DDD *</label>
                        <input 
                          type="text" 
                          placeholder="(11) 99999-9999" 
                          value={formData.whatsapp} 
                          onChange={handlePhoneChange}
                          className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white text-sm focus:border-[#F4CDD4] outline-none"
                        />
                      </div>
                    </div>
                    <button 
                      onClick={handleNext}
                      disabled={!formData.name || !isEmailValid(formData.email) || !isPhoneValid(formData.whatsapp)}
                      className="w-full bg-[#F4CDD4] text-[#080808] py-4 rounded-xl font-black uppercase tracking-widest text-xs hover:scale-[1.01] transition-transform disabled:opacity-50 flex items-center justify-center gap-2 mt-6"
                    >
                      Continuar <ChevronRight size={18} />
                    </button>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div key="step2" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-6">
                    <h4 className="text-xl font-black text-white mb-6">Estrutura Empresarial</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="text-xs font-bold text-white/70 uppercase tracking-wider block mb-2">Sua empresa possui CNPJ? *</label>
                        <div className="grid grid-cols-2 gap-3">
                          {['yes', 'no'].map(opt => (
                            <button 
                              key={opt}
                              type="button"
                              onClick={() => setFormData({...formData, hasCnpj: opt, cnpj: ''})}
                              className={`py-3 rounded-xl border text-xs font-bold uppercase transition-all ${formData.hasCnpj === opt ? 'bg-[#F4CDD4] text-[#080808] border-[#F4CDD4]' : 'bg-white/5 text-white border-white/10'}`}
                            >
                              {opt === 'yes' ? 'Sim' : 'Não'}
                            </button>
                          ))}
                        </div>
                      </div>

                      {formData.hasCnpj && (
                        <div>
                          <label className="text-xs font-bold text-white/70 uppercase tracking-wider block mb-2">
                            {formData.hasCnpj === 'yes' ? 'CNPJ *' : 'CPF *'}
                          </label>
                          <input 
                            type="text" 
                            placeholder={formData.hasCnpj === 'yes' ? "00.000.000/0001-00" : "000.000.000-00"} 
                            value={formData.cnpj} 
                            onChange={handleCnpjChange}
                            className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white text-sm focus:border-[#F4CDD4] outline-none"
                          />
                        </div>
                      )}

                      <div>
                        <label className="text-xs font-bold text-white/70 uppercase tracking-wider block mb-2">Utiliza Sistema de Gestão ERP? *</label>
                        <div className="grid grid-cols-2 gap-3">
                          {['yes', 'no'].map(opt => (
                            <button 
                              key={opt}
                              type="button"
                              onClick={() => setFormData({...formData, hasErp: opt})}
                              className={`py-3 rounded-xl border text-xs font-bold uppercase transition-all ${formData.hasErp === opt ? 'bg-[#F4CDD4] text-[#080808] border-[#F4CDD4]' : 'bg-white/5 text-white border-white/10'}`}
                            >
                              {opt === 'yes' ? 'Sim' : 'Não'}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                      <button onClick={handlePrev} className="flex-1 bg-white/5 text-white py-4 rounded-xl font-bold uppercase text-xs">Voltar</button>
                      <button 
                        onClick={handleNext} 
                        disabled={!formData.hasCnpj || !isCnpjCpfValid(formData.cnpj) || !formData.hasErp} 
                        className="flex-1 bg-[#F4CDD4] text-[#080808] py-4 rounded-xl font-black uppercase text-xs disabled:opacity-50"
                      >
                        Avançar
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div key="step3" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-6">
                    <h4 className="text-xl font-black text-white mb-6">Região de Atuação</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="text-xs font-bold text-white/70 uppercase tracking-wider block mb-2">Cidade Base da Distribuidora *</label>
                        <input 
                          type="text" 
                          placeholder="Ex: São Paulo / SP" 
                          value={formData.city} 
                          onChange={e => setFormData({...formData, city: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white text-sm focus:border-[#F4CDD4] outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-white/70 uppercase tracking-wider block mb-2">Cidades/Regiões que Deseja Atender *</label>
                        <input 
                          type="text" 
                          placeholder="Ex: Grande SP e Campinas" 
                          value={formData.targetCities} 
                          onChange={e => setFormData({...formData, targetCities: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white text-sm focus:border-[#F4CDD4] outline-none"
                        />
                      </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                      <button onClick={handlePrev} className="flex-1 bg-white/5 text-white py-4 rounded-xl font-bold uppercase text-xs">Voltar</button>
                      <button 
                        onClick={handleNext} 
                        disabled={!formData.city || !formData.targetCities} 
                        className="flex-1 bg-[#F4CDD4] text-[#080808] py-4 rounded-xl font-black uppercase text-xs disabled:opacity-50"
                      >
                        Avançar
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === 4 && (
                  <motion.div key="step4" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-6">
                    <h4 className="text-xl font-black text-white mb-6">Modelo Operacional</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="text-xs font-bold text-white/70 uppercase tracking-wider block mb-2">Qual o seu modelo comercial atual? *</label>
                        <select 
                          value={formData.businessModel} 
                          onChange={e => setFormData({...formData, businessModel: e.target.value})}
                          className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl p-4 text-white text-sm focus:border-[#F4CDD4] outline-none"
                        >
                          <option value="">Selecione uma opção...</option>
                          <option value="Distribuidora de Cosméticos Pet">Distribuidora Exclusiva de Cosméticos Pet</option>
                          <option value="Distribuidora Multimarcas Pet">Distribuidora Multimarcas Pet</option>
                          <option value="Representante Comercial">Representante Comercial com Carteira</option>
                          <option value="Novo Empreendedor">Novo Empreendedor iniciando no setor</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-xs font-bold text-white/70 uppercase tracking-wider block mb-2">Já distribui ou distribuiu outras marcas pet?</label>
                        <input 
                          type="text" 
                          placeholder="Informe se relevante" 
                          value={formData.previousBrands} 
                          onChange={e => setFormData({...formData, previousBrands: e.target.value})}
                          className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white text-sm focus:border-[#F4CDD4] outline-none"
                        />
                      </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                      <button onClick={handlePrev} className="flex-1 bg-white/5 text-white py-4 rounded-xl font-bold uppercase text-xs">Voltar</button>
                      <button 
                        onClick={handleNext} 
                        disabled={!formData.businessModel} 
                        className="flex-1 bg-[#F4CDD4] text-[#080808] py-4 rounded-xl font-black uppercase text-xs disabled:opacity-50"
                      >
                        Avançar
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === 5 && (
                  <motion.div key="step5" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-6">
                    <h4 className="text-xl font-black text-white mb-6">Investimento Inicial</h4>
                    <p className="text-white/80 text-sm leading-relaxed">
                      Para assegurar a exclusividade territorial e o suporte de fábrica PET South America, o investimento mínimo inicial em estoque é de <strong className="text-[#F4CDD4]">R$ 10.000,00</strong>.
                    </p>
                    
                    <div>
                      <label className="text-xs font-bold text-white/70 uppercase tracking-wider block mb-3">Você possui este capital disponível para início imediato? *</label>
                      <div className="grid grid-cols-2 gap-4">
                        {['yes', 'no'].map(opt => (
                          <button 
                            key={opt}
                            type="button"
                            onClick={() => setFormData({...formData, hasInvestment: opt})}
                            className={`py-4 rounded-xl border text-xs font-black uppercase transition-all ${formData.hasInvestment === opt ? 'bg-[#F4CDD4] text-[#080808] border-[#F4CDD4]' : 'bg-white/5 text-white border-white/10'}`}
                          >
                            {opt === 'yes' ? 'Sim, Posso Investir' : 'Não no Momento'}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-4 pt-6">
                      <button onClick={handlePrev} disabled={isSubmitting} className="flex-1 bg-white/5 text-white py-4 rounded-xl font-bold uppercase text-xs">Voltar</button>
                      <button 
                        onClick={finishForm} 
                        disabled={!formData.hasInvestment || isSubmitting} 
                        className="flex-[2] bg-[#F4CDD4] text-[#080808] py-4 rounded-xl font-black uppercase text-xs disabled:opacity-50 flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? 'Enviando...' : 'Finalizar Candidatura'}
                      </button>
                    </div>
                  </motion.div>
                )}
              </>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

// --- Main Page Component ---
export default function PetSouthDistribuidor() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const heroButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="min-h-screen bg-[#080808] text-white font-sans selection:bg-[#F4CDD4] selection:text-[#080808]">
      
      {/* Top Header Navigation */}
      <header className="sticky top-0 z-40 bg-[#080808]/90 backdrop-blur-md border-b border-white/10 py-4 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <BubblesPetSouthLogo />

          <button 
            onClick={() => setIsFormOpen(true)}
            className="bg-[#F4CDD4] text-[#080808] px-4 md:px-6 py-2 md:py-2.5 rounded-full font-black text-[10px] md:text-xs uppercase tracking-widest hover:bg-white transition-all shadow-[0_0_15px_rgba(244,205,212,0.2)]"
          >
            Quero Ser Distribuidor
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative w-full py-12 md:py-20 overflow-hidden">
        {/* Background Texture Overlay (Spans full viewport width) */}
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#F4CDD4]/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#F4CDD4]/5 blur-[120px] rounded-full" />
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[radial-gradient(circle_at_center,_#F4CDD4_1px,_transparent_1px)] bg-[size:30px_30px]" />
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(circle_at_center,_#F4CDD4_2px,_transparent_2px)] bg-[size:80px_80px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center relative z-10">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Event Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#F4CDD4]/25 via-[#F4CDD4]/15 to-transparent border border-[#F4CDD4]/40 text-[#F4CDD4] text-[10px] md:text-xs font-bold uppercase tracking-wider backdrop-blur-md shadow-lg">
              <Trophy size={14} className="text-[#F4CDD4]" />
              <span>O Maior Encontro de Negócios Pet da América Latina</span>
            </div>

            {/* Title matching main page size */}
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-white tracking-tight leading-[1.15] uppercase">
              Seja o Distribuidor de Cosmética Pet <span className="text-[#F4CDD4] drop-shadow-[0_0_15px_rgba(244,205,212,0.4)]">Mais Desejado</span> na Sua Região.
            </h1>

            <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-2xl">
              Apresentamos na <strong className="text-white">PET South America</strong> a oportunidade de distribuição comercial com alta rentabilidade, produtos de recorrência comprovada e suporte direto da fábrica para o seu sell-out.
            </p>

            {/* Micro Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-3">
                <div className="p-2 bg-[#F4CDD4]/15 rounded-xl text-[#F4CDD4]">
                  <TrendingUp size={18} />
                </div>
                <div>
                  <div className="text-xs font-black text-white">Até 45% Margem</div>
                  <div className="text-[10px] text-white/50">Lucro real e recorrente</div>
                </div>
              </div>

              <div className="p-3 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-3">
                <div className="p-2 bg-[#F4CDD4]/15 rounded-xl text-[#F4CDD4]">
                  <Shield size={18} />
                </div>
                <div>
                  <div className="text-xs font-black text-white">Exclusividade</div>
                  <div className="text-[10px] text-white/50">Território protegido</div>
                </div>
              </div>

              <div className="p-3 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-3">
                <div className="p-2 bg-[#F4CDD4]/15 rounded-xl text-[#F4CDD4]">
                  <Award size={18} />
                </div>
                <div>
                  <div className="text-xs font-black text-white">98% Recompra</div>
                  <div className="text-[10px] text-white/50">Fidelidade dos groomers</div>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button 
                ref={heroButtonRef}
                onClick={() => setIsFormOpen(true)}
                className="bg-gradient-to-r from-[#F4CDD4] via-[#FDE8ED] to-[#F4CDD4] text-[#080808] px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-105 transition-all shadow-[0_0_25px_rgba(244,205,212,0.3)] flex items-center justify-center gap-2 group"
              >
                <span>Quero me Candidatar Agora</span>
                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <a 
                href="#calculadora"
                className="bg-white/5 hover:bg-white/10 text-white border border-white/15 px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs text-center transition-all flex items-center justify-center gap-2"
              >
                <Calculator size={16} className="text-[#F4CDD4]" />
                <span>Simular Faturamento</span>
              </a>
            </div>

            {/* Highlighted text as requested */}
            <p className="text-[11px] text-white/80 uppercase tracking-wider flex items-center gap-1.5 pt-1 font-medium">
              <Lock size={13} className="text-[#F4CDD4] shrink-0" /> 
              <span>
                Atendimento prioritário para contatos da <span className="bg-[#7E22CE] text-white px-2 py-0.5 rounded font-black tracking-widest shadow-sm">PET SOUTH AMERICA</span>
              </span>
            </p>
          </div>

          {/* Right Product Showcase Column */}
          <div className="lg:col-span-5 h-[380px] sm:h-[450px]">
            <HeroCarousel />
          </div>

        </div>
      </section>

      {/* Marquee Banner */}
      <BenefitsMarquee />

      {/* PET South America Ecosystem Section (Split in 2 Blocks: Left explanation, Right 4 info blocks) */}
      <section className="py-16 md:py-20 bg-[#FDF2F4] text-[#080808] border-b border-[#F4CDD4]">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Block: Explanation & Benefits */}
            <div className="lg:col-span-6 space-y-5">
              <span className="text-[#080808] font-black text-[10px] uppercase tracking-[0.2em] bg-[#F4CDD4] px-3 py-1 rounded-full inline-block border border-[#080808]/10">
                O Ecossistema da Maior Feira do Setor
              </span>
              <h2 className="text-2xl md:text-4xl font-black tracking-tight text-[#080808] uppercase leading-tight">
                A PET South America é o Epicentro dos Negócios Pet na América Latina
              </h2>
              <p className="text-[#080808]/80 text-sm md:text-base leading-relaxed font-medium">
                Sendo o maior ponto de encontro de negócios e tendências da indústria pet da América Latina, a feira é a oportunidade perfeita para distribuidores ampliarem seu portfólio com marcas de alta performance como a Bubbles®, garantindo exclusividade territorial e suporte direto de fábrica.
              </p>
              
              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <CheckCircle size={18} className="text-[#7E22CE] shrink-0 mt-0.5" />
                  <p className="text-xs font-bold text-[#080808]/90">
                    <strong className="text-[#080808] font-black">Lançamentos Exclusivos:</strong> Acesso em primeira mão às inovações em estética e cosmética veterinária.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle size={18} className="text-[#7E22CE] shrink-0 mt-0.5" />
                  <p className="text-xs font-bold text-[#080808]/90">
                    <strong className="text-[#080808] font-black">Conexão Direta:</strong> Atendimento com diretores e executivos da Bubbles® com condições diferenciadas.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle size={18} className="text-[#7E22CE] shrink-0 mt-0.5" />
                  <p className="text-xs font-bold text-[#080808]/90">
                    <strong className="text-[#080808] font-black">Aceleração de Vendas:</strong> Estratégias prontas de sell-out para garantir rápido giro de estoque na sua região.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Block: 4 Information/Stats Blocks */}
            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <div className="p-6 bg-white border border-[#F4CDD4] rounded-3xl shadow-sm text-center space-y-1">
                <div className="text-3xl md:text-4xl font-black text-[#7E22CE]">32.650+</div>
                <div className="text-xs font-black text-[#080808] uppercase tracking-wider">Profissionais</div>
                <p className="text-[10px] text-[#080808]/60 font-medium">Visitantes qualificados no evento</p>
              </div>

              <div className="p-6 bg-white border border-[#F4CDD4] rounded-3xl shadow-sm text-center space-y-1">
                <div className="text-3xl md:text-4xl font-black text-[#7E22CE]">272+</div>
                <div className="text-xs font-black text-[#080808] uppercase tracking-wider">Expositores</div>
                <p className="text-[10px] text-[#080808]/60 font-medium">Líderes de mercado reunidos</p>
              </div>

              <div className="p-6 bg-white border border-[#F4CDD4] rounded-3xl shadow-sm text-center space-y-1">
                <div className="text-3xl md:text-4xl font-black text-[#7E22CE]">976</div>
                <div className="text-xs font-black text-[#080808] uppercase tracking-wider">Cidades</div>
                <p className="text-[10px] text-[#080808]/60 font-medium">Cobertura em todos os estados</p>
              </div>

              <div className="p-6 bg-white border border-[#F4CDD4] rounded-3xl shadow-sm text-center space-y-1">
                <div className="text-3xl md:text-4xl font-black text-[#7E22CE]">83%</div>
                <div className="text-xs font-black text-[#080808] uppercase tracking-wider">Concentração Sudeste</div>
                <p className="text-[10px] text-[#080808]/60 font-medium">Alto poder de compra regional</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Why Choose Bubbles Section */}
      <section className="py-16 md:py-24 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="px-3 py-1 bg-[#F4CDD4]/20 border border-[#F4CDD4]/40 text-[#F4CDD4] text-[10px] font-black uppercase tracking-widest rounded-full">
            Diferenciais Competitivos
          </span>
          <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight">
            Por que os Maiores Distribuidores Escolhem a Bubbles®?
          </h2>
          <p className="text-white/60 text-xs md:text-sm">
            Não entregamos apenas cosméticos. Entregamos um modelo de negócio estruturado para alavancar suas vendas no canal profissional.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-8 bg-white/5 border border-white/10 rounded-3xl hover:border-[#F4CDD4]/40 transition-all space-y-4 group">
            <div className="w-12 h-12 bg-[#F4CDD4]/15 text-[#F4CDD4] rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <DollarSign size={24} />
            </div>
            <h3 className="text-lg font-black text-white">Alta Rentabilidade</h3>
            <p className="text-white/60 text-xs leading-relaxed">
              Margens brutas atrativas com precificação tabelada para proteger o seu lucro contra a concorrência desleal.
            </p>
          </div>

          <div className="p-8 bg-white/5 border border-white/10 rounded-3xl hover:border-[#F4CDD4]/40 transition-all space-y-4 group">
            <div className="w-12 h-12 bg-[#F4CDD4]/15 text-[#F4CDD4] rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <Award size={24} />
            </div>
            <h3 className="text-lg font-black text-white">Perfumaria Fina & 98% Recompra</h3>
            <p className="text-white/60 text-xs leading-relaxed">
              Formulações exclusivas com fixação prolongada. Groomers e centros estéticos exigem a reposição imediata.
            </p>
          </div>

          <div className="p-8 bg-white/5 border border-white/10 rounded-3xl hover:border-[#F4CDD4]/40 transition-all space-y-4 group">
            <div className="w-12 h-12 bg-[#F4CDD4]/15 text-[#F4CDD4] rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <Truck size={24} />
            </div>
            <h3 className="text-lg font-black text-white">Logística & Entrega Ágil</h3>
            <p className="text-white/60 text-xs leading-relaxed">
              Faturamento rápido direto da fábrica para garantir que a sua equipe de vendas nunca fique desabastecida.
            </p>
          </div>

          <div className="p-8 bg-white/5 border border-white/10 rounded-3xl hover:border-[#F4CDD4]/40 transition-all space-y-4 group">
            <div className="w-12 h-12 bg-[#F4CDD4]/15 text-[#F4CDD4] rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <Users size={24} />
            </div>
            <h3 className="text-lg font-black text-white">Suporte no Sell-Out</h3>
            <p className="text-white/60 text-xs leading-relaxed">
              Materiais de PDV, amostras comerciais, treinamentos técnicos e workshops para capacitar sua equipe comercial.
            </p>
          </div>

          <div className="p-8 bg-white/5 border border-white/10 rounded-3xl hover:border-[#F4CDD4]/40 transition-all space-y-4 group">
            <div className="w-12 h-12 bg-[#F4CDD4]/15 text-[#F4CDD4] rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <Shield size={24} />
            </div>
            <h3 className="text-lg font-black text-white">Proteção Territorial</h3>
            <p className="text-white/60 text-xs leading-relaxed">
              Atuação com exclusividade geograficamente mapeada para garantir previsibilidade e estabilidade no seu faturamento.
            </p>
          </div>

          <div className="p-8 bg-white/5 border border-white/10 rounded-3xl hover:border-[#F4CDD4]/40 transition-all space-y-4 group">
            <div className="w-12 h-12 bg-[#F4CDD4]/15 text-[#F4CDD4] rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <Sparkles size={24} />
            </div>
            <h3 className="text-lg font-black text-white">Conceito Vegan & Cruelty-Free</h3>
            <p className="text-white/60 text-xs leading-relaxed">
              Produtos 100% livres de crueldade e de parabenos, alinhados às exigências ecológicas e premium do mercado atual.
            </p>
          </div>
        </div>
      </section>

      {/* Traditional Calculator Section */}
      <ROICalculator />

      {/* Nossa Essência Section (Immediately below Calculator) */}
      <NossaEssenciaSection />

      {/* FAQ Section */}
      <section className="py-16 md:py-24 px-4 md:px-8 max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-[#F4CDD4] text-[10px] font-black uppercase tracking-widest block mb-1">Dúvidas Frequentes</span>
          <h2 className="text-2xl md:text-3xl font-black text-white">Perguntas da PET South America</h2>
        </div>

        <div className="space-y-4">
          {[
            {
              q: "Qual é o investimento mínimo para iniciar?",
              a: "O investimento inicial padrão em estoque é de R$ 10.000,00. No entanto, para contatos iniciados via PET South America, oferecemos condições especiais de parcelamento e suporte em material de divulgação."
            },
            {
              q: "Como funciona a exclusividade de região?",
              a: "Analisamos o potencial demográfico da sua cidade ou região. Caso a área esteja disponível, formalizamos a garantia territorial no contrato de distribuição."
            },
            {
              q: "A fábrica fornece suporte de marketing e treinamento?",
              a: "Sim! Disponibilizamos catálogo impresso e digital, vídeos demonstrativos, fotos em alta resolução, amostras grátis para prospecção e treinamento técnico para sua equipe de vendas."
            },
            {
              q: "Posso vender tanto para pet shops quanto para estéticas veterinárias?",
              a: "Com certeza. Nossas linhas atendem desde grandes centros estéticos profissionais (linha PRO e Xperience em alta diluição) até o varejo de autosserviço (linhas para homecare)."
            }
          ].map((faq, i) => (
            <details key={i} className="group bg-white/5 border border-white/10 rounded-2xl p-5 cursor-pointer [&_summary::-webkit-details-marker]:none">
              <summary className="flex items-center justify-between font-bold text-sm text-white list-none">
                <span>{faq.q}</span>
                <ChevronDown size={18} className="text-[#F4CDD4] group-open:rotate-180 transition-transform" />
              </summary>
              <p className="mt-3 text-xs text-white/70 leading-relaxed pl-1">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* Final CTA Banner (Soft Pink background with dark text) */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-[#F4CDD4] via-[#FDE8ED] to-[#F4CDD4] text-[#080808] border-y border-[#F4CDD4] text-center px-4 relative overflow-hidden">
        <div className="max-w-3xl mx-auto space-y-6 relative z-10">
          <div className="inline-block px-4 py-1.5 bg-[#080808] text-[#F4CDD4] rounded-full text-[10px] font-black uppercase tracking-widest shadow-md">
            PET South America 2025/2026
          </div>
          <h2 className="text-2xl md:text-4xl font-black text-[#080808] uppercase tracking-tight">
            Pronto para Expandir seu Negócio com a Bubbles®?
          </h2>
          <p className="text-[#080808]/80 text-sm md:text-base font-medium max-w-xl mx-auto">
            Não perca a vaga exclusiva da sua região. Preencha a candidatura e nossa equipe comercial entrará em contato com atendimento prioritário.
          </p>
          <button 
            onClick={() => setIsFormOpen(true)}
            className="bg-[#080808] hover:bg-[#1A1A1A] text-[#F4CDD4] px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-2xl hover:scale-105"
          >
            Quero me Candidatar Agora
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-[#050505] border-t border-white/10 text-center text-white/40 text-[10px] px-4 space-y-2">
        <div className="flex justify-center items-center gap-2">
          <BubblesPetSouthLogo />
        </div>
        <p>© {new Date().getFullYear()} Bubbles®. Todos os direitos reservados. Edição Especial PET South America.</p>
      </footer>

      {/* Modals & Sticky Elements */}
      <MultiStepForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
      <StickyBar onOpenForm={() => setIsFormOpen(true)} heroButtonRef={heroButtonRef} />
    </div>
  );
}
