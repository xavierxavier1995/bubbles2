import React, { useState, useEffect, useRef } from 'react';
import { 
  TrendingUp, DollarSign, Truck, Package, ChevronDown, CheckCircle, CheckCircle2, 
  ArrowRight, Star, HelpCircle, Instagram, Youtube, MessageCircle, Phone, Mail,
  Shield, Zap, BarChart3, Users, Award, Lock, X, ChevronRight, Calculator,
  BookOpen, GraduationCap, Sparkles, Clock, Droplets, Wind, Beaker, Leaf, Eye, Heart, Globe,
  ChevronLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { maskPhone, maskCpfCnpj, unmask } from '../utils/masks';

// --- Components ---

const Logo = React.memo(() => (
  <div className="flex items-center gap-2">
    <img 
      src="https://bubbles.gabrielxavier.online/BUBBLES.svg" 
      alt="Bubbles® Logo" 
      className="h-8 md:h-10 w-auto brightness-0 invert"
      referrerPolicy="no-referrer"
      fetchPriority="high"
      width="150"
      height="40"
    />
  </div>
));

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
          className="fixed bottom-0 left-0 w-full z-50 bg-[#080808]/80 backdrop-blur-sm border-t border-white/10 py-4 px-6 flex items-center justify-between shadow-[0_-5px_15px_rgba(0,0,0,0.3)]"
        >
          <div className="flex items-center gap-4">
            <Logo />
            <p className="text-white text-[10px] font-bold hidden md:block opacity-60">
              Vagas limitadas por região. <span className="text-[#F4CDD4]">Garanta seu território.</span>
            </p>
          </div>
            <motion.button 
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 0 15px rgba(244,205,212,0.4)",
                y: -1
              }}
              whileTap={{ scale: 0.98 }}
              animate={{ 
                y: [0, -2, 0],
                transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
              }}
              onClick={onOpenForm}
              className="bg-[#F4CDD4] text-[#080808] px-6 md:px-10 py-2 md:py-2.5 rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest shadow-[0_0_10px_rgba(244,205,212,0.2)] transition-all relative overflow-hidden group shrink-0 max-w-[140px] md:max-w-none text-center leading-tight"
            >
              <span className="relative z-10">Quero ser um distribuidor</span>
              <motion.div 
                className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"
                initial={false}
              />
            </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

const BenefitsMarquee = React.memo(() => {
  const benefits = [
    "Margens de Lucro Superiores", "Suporte de Marketing 360º", "Logística Ágil", 
    "Treinamento Técnico", "Produtos Veganos", 
    "Alta Diluição 1:10", "Fragrâncias Exclusivas", "Material de PDV Gratuito",
    "Produtos fáceis de vender", "Produto Favorito dos Groomers", "Produtos de alta recorrência",
    "Alta Taxa de Positivação", "Suporte no Sell-out", "Fácil Positivação", "Alta Recompra", "Crueltyfree"
  ];

  return (
    <div className="bg-[#F4CDD4] py-4 overflow-hidden border-y border-black/10 relative z-20">
      <div className="flex whitespace-nowrap animate-marquee">
        {[...benefits, ...benefits].map((benefit, i) => (
          <div key={i} className="flex items-center gap-4 mx-8">
            <Sparkles size={16} className="text-[#080808]" />
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
          animation: marquee 9.6s linear infinite;
        }
        @media (max-width: 768px) {
          .animate-marquee {
            animation: marquee 6.4s linear infinite;
          }
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        /* Custom scrollbar for the entire page */
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #080808;
        }
        ::-webkit-scrollbar-thumb {
          background: #333;
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #F4CDD4;
        }
      `}</style>
    </div>
  );
});

const HeroCarousel = React.memo(() => {
  const [index, setIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const lines = [
    { name: "Linha PRO", desc: "Máximo rendimento para profissionais", imgDesktop: "https://bubbles.gabrielxavier.online/bubbles-linha-pro-desktop.webp", imgMobile: "https://bubbles.gabrielxavier.online/bubbles-linha-pro-mobile.webp" },
    { name: "Essential", desc: "O melhor custo-benefício do mercado", imgDesktop: "https://bubbles.gabrielxavier.online/bubbles-linha-essential-desktop.webp", imgMobile: "https://bubbles.gabrielxavier.online/bubbles-linha-essential-mobile.webp" },
    { name: "Xperience", desc: "Sensorial premium e fragrâncias únicas", imgDesktop: "https://bubbles.gabrielxavier.online/bubbles-linha-xperience-desktop.webp", imgMobile: "https://bubbles.gabrielxavier.online/bubbles-linha-xperience-mobile.webp" },
    { name: "Collora", desc: "Tratamento de cor e brilho intenso", imgDesktop: "https://bubbles.gabrielxavier.online/bubbles-kit-collora-desktop.webp", imgMobile: "https://bubbles.gabrielxavier.online/bubbles-kit-collora-mobile.webp" }
  ];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % lines.length);
          }, 4000);
        } else {
          clearInterval(timer);
        }
      },
      { threshold: 0.1 }
    );

    if (carouselRef.current) {
      observer.observe(carouselRef.current);
    }

    return () => {
      clearInterval(timer);
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={carouselRef} className="relative w-full h-full group">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <picture>
            <source media="(max-width: 768px)" srcSet={lines[index].imgMobile} />
            <source media="(min-width: 769px)" srcSet={lines[index].imgDesktop} />
            <img 
              src={lines[index].imgDesktop} 
              alt={lines[index].name}
              className="w-full h-full object-cover rounded-[40px] transition-all duration-700"
              referrerPolicy="no-referrer"
              fetchPriority={index === 0 ? "high" : "auto"}
              loading={index === 0 ? "eager" : "lazy"}
            />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent opacity-60" />
          <div className="absolute bottom-10 left-10 right-10 z-20">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="inline-block px-3 py-1 bg-[#F4CDD4] text-[#080808] text-[8px] font-black uppercase tracking-widest rounded-full mb-3 shadow-lg">
                Destaque de Mercado
              </div>
              <h3 className="text-xl font-black text-white mb-2 drop-shadow-lg">{lines[index].name}</h3>
              <p className="text-white/90 font-bold text-[10px] uppercase tracking-widest drop-shadow-md">{lines[index].desc}</p>
            </motion.div>
          </div>
          
          {/* Interesting Text Overlay */}
          <div className="absolute top-20 left-10 max-w-[200px] z-20 hidden md:block">
            <motion.div
              key={`overlay-${index}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-4 bg-black/40 backdrop-blur-md border-l-2 border-[#F4CDD4] rounded-r-xl"
            >
              <p className="text-[10px] text-white/80 leading-relaxed italic">
                {index === 0 && "A linha preferida dos maiores centros de estética do país."}
                {index === 1 && "Volume industrial com a qualidade que o seu cliente exige."}
                {index === 2 && "Fragrâncias que fixam por dias e fidelizam o tutor."}
                {index === 3 && "Tecnologia de pigmentação segura e brilho tridimensional."}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>
      
      {/* Progress Indicators */}
      <div className="absolute top-10 right-10 flex gap-2 z-30">
        {lines.map((_, i) => (
          <div 
            key={i} 
            className={`h-1 rounded-full transition-all duration-500 ${i === index ? 'w-8 bg-[#F4CDD4]' : 'w-2 bg-white/20'}`} 
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <div className="absolute top-1/2 -translate-y-1/2 left-4 right-4 flex justify-between z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button 
          onClick={() => setIndex((prev) => (prev - 1 + lines.length) % lines.length)}
          className="w-10 h-10 rounded-full bg-[#080808]/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-[#F4CDD4] hover:text-[#080808] transition-colors shadow-lg"
        >
          <ChevronLeft size={24} />
        </button>
        <button 
          onClick={() => setIndex((prev) => (prev + 1) % lines.length)}
          className="w-10 h-10 rounded-full bg-[#080808]/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-[#F4CDD4] hover:text-[#080808] transition-colors shadow-lg"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
});

const ExitIntentPopup = ({ isOpen, onClose, onOpenForm }: { isOpen: boolean, onClose: () => void, onOpenForm: () => void }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-[#121212] border border-[#F4CDD4]/20 rounded-3xl p-8 max-w-lg w-full relative overflow-hidden shadow-[0_0_50px_rgba(244,205,212,0.1)]"
      >
        <div className="absolute top-0 right-0 p-4">
          <button onClick={onClose} className="text-white/40 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>
        
        <div className="relative z-10 text-center">
          <div className="w-16 h-16 bg-[#F4CDD4]/10 text-[#F4CDD4] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-[0_0_20px_rgba(244,205,212,0.2)]">
            <Calculator size={32} />
          </div>
          <h2 className="text-2xl font-black text-white mb-4 tracking-tight">Espere! Não perca essa oportunidade.</h2>
          <p className="text-white/60 mb-8 text-xs">
            O mercado pet está em plena expansão. <span className="text-[#F4CDD4] font-bold">Seja um distribuidor Bubbles</span> e garanta exclusividade na sua região antes que outro empreendedor o faça.
          </p>
          
          <div className="space-y-4">
            <button 
              onClick={() => {
                onOpenForm();
                onClose();
              }}
              className="w-full bg-[#F4CDD4] text-[#080808] py-4 rounded-xl font-black uppercase tracking-widest hover:bg-white transition-colors"
            >
              Quero me candidatar agora
            </button>
            <button 
              onClick={onClose}
              className="w-full bg-transparent text-white/40 py-2 text-xs font-bold hover:text-white transition-colors"
            >
              Prefiro ignorar esta oportunidade
            </button>
          </div>
        </div>
        
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-[#F4CDD4]/5 blur-3xl rounded-full" />
      </motion.div>
    </div>
  );
};

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
      setFormData(prev => ({
        ...prev,
        utm_source: urlParams.get('utm_source') || '',
        utm_medium: urlParams.get('utm_medium') || '',
        utm_campaign: urlParams.get('utm_campaign') || '',
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
    if (formData.hasCnpj === 'no') {
      return clean.length === 11; // CPF
    }
    return clean.length === 14; // CNPJ
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData, whatsapp: maskPhone(e.target.value)});
  };

  const handleCnpjChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData, cnpj: maskCpfCnpj(e.target.value)});
  };

  const finishForm = async () => {
    localStorage.setItem('formSubmitted', 'true');
    setIsSubmitting(true);
    console.log("[FRONTEND] Iniciando envio do formulário...");
    console.log("[FRONTEND] Dados do formulário:", formData);

    const candidacyId = Math.random().toString(36).substr(2, 9).toUpperCase();
    setLastCandidacyId(candidacyId);

    try {
      // Mapeando os dados do formData para o formato esperado pelo backend
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
        investimento: formData.hasInvestment === 'yes' ? 'Acima de 5.000,00' : 'Abaixo de 5.000,00',
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

      console.log("[FRONTEND] Payload mapeado para a API:", payload);

      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      console.log("[FRONTEND] Resposta da API:", response.status, result);

      if (!response.ok) {
        console.error("[FRONTEND] Erro retornado pela API:", result);
      } else {
        console.log("[FRONTEND] Lead enviado com sucesso para o ClickUp e Sellum!");
        
        // Google Tag Manager Event
        if (typeof window !== 'undefined' && (window as any).dataLayer) {
          (window as any).dataLayer.push({
            event: 'lead_form_submitted',
            form_type: 'distribuidor',
            language: 'pt-br'
          });
        }
      }

    } catch (error) {
      console.error("[FRONTEND] Erro ao fazer a requisição para /api/leads:", error);
    } finally {
      setIsSubmitting(false);
    }

    if (isQualified) {
      // Disparar evento de conversão
      try {
        (window as any).dataLayer = (window as any).dataLayer || [];
        
        // Evento Personalizado solicitado pelo usuário
        (window as any).dataLayer.push({
          event: 'form_submit',
          form_name: 'candidatura_distribuidor',
          is_qualified: 'sim',
          // Incluindo dados para facilitar a captura direta se necessário
          email: formData.email,
          phone: unmask(formData.whatsapp),
          name: formData.name
        });

        // Mantendo o gtm.formSubmit para compatibilidade com gatilhos nativos
        (window as any).dataLayer.push({
          event: 'gtm.formSubmit',
          form_name: 'candidatura_distribuidor',
          is_qualified: 'sim'
        });

        console.log("[FRONTEND] Eventos form_submit e gtm.formSubmit enviados (Sucesso)");
      } catch (e) {
        console.error("[FRONTEND] Erro ao enviar para o dataLayer:", e);
      }
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
        {/* Header */}
        <div className="p-8 border-b border-white/5 flex justify-between items-center bg-[#1A1A1A]">
          <div>
            <h3 className="text-xl font-black text-white tracking-tight">
              {isSuccess ? 'Candidatura Recebida' : 'Candidatura de Distribuidor'}
            </h3>
            {!isSuccess && (
              <p className="text-white/40 text-[10px] uppercase tracking-widest mt-1 font-bold">Passo {step} de 5</p>
            )}
          </div>
          <button onClick={handleClose} className="text-white/40 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Progress Bar */}
        {!isSuccess && (
          <div className="h-1 bg-white/5 w-full">
            <motion.div 
              className="h-full bg-[#F4CDD4] shadow-[0_0_10px_rgba(244,205,212,0.5)]"
              initial={{ width: '0%' }}
              animate={{ width: `${(step / 5) * 100}%` }}
            />
          </div>
        )}

        <div id="form-distribuidor" className="p-8 md:p-12">
          <AnimatePresence mode="wait">
            {isSuccess ? (
              <motion.div
                key="success"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="space-y-6 text-center py-4"
              >
                <div className="w-16 h-16 bg-[#F4CDD4]/10 text-[#F4CDD4] rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_20px_rgba(244,205,212,0.2)] animate-pulse">
                  <CheckCircle size={36} className="text-[#F4CDD4]" />
                </div>
                
                <h4 className="text-2xl font-black text-white tracking-tight">Candidatura Enviada!</h4>
                
                <p className="text-white/70 text-sm max-w-md mx-auto leading-relaxed">
                  Agradecemos o seu interesse em se tornar um distribuidor autorizado Bubbles®.
                  <br /><br />
                  Nossa equipe de expansão já recebeu o seu cadastro comercial e técnico com sucesso (ID: <span className="text-[#F4CDD4] font-mono">{lastCandidacyId}</span>). Em breve, um dos nossos atendentes entrará em contato com você diretamente para prosseguir com o seu credenciamento.
                </p>

                <div className="pt-6">
                  <button 
                    onClick={handleClose}
                    className="w-full max-w-xs bg-[#F4CDD4] text-[#080808] py-4 rounded-xl font-black uppercase tracking-widest text-xs hover:scale-[1.02] transition-transform shadow-[0_0_20px_rgba(244,205,212,0.2)]"
                  >
                    Fechar e Voltar
                  </button>
                </div>
              </motion.div>
            ) : (
              <>
                {step === 1 && (
              <motion.div 
                key="step1"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                className="space-y-6"
              >
                <h4 className="text-xl font-black text-white mb-8 tracking-tight">Dados de Contato</h4>
                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-2 block">Nome Completo</label>
                    <input 
                      id="name"
                      type="text" 
                      placeholder="Ex: Gabriel Silva"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:border-[#F4CDD4] outline-none transition-colors"
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-2 block">E-mail Corporativo</label>
                      <input 
                        id="email"
                        type="email" 
                        placeholder="seu@email.com"
                        className={`w-full bg-white/5 border ${formData.email && !isEmailValid(formData.email) ? 'border-red-500' : 'border-white/10'} rounded-xl px-6 py-4 text-white focus:border-[#F4CDD4] outline-none transition-colors`}
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                      />
                      {formData.email && !isEmailValid(formData.email) && (
                        <span className="text-red-500 text-[10px] mt-1 block">E-mail inválido.</span>
                      )}
                    </div>
                    <div>
                      <label className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-2 block">Seu WhatsApp</label>
                      <input 
                        id="telefone"
                        type="tel" 
                        placeholder="(00) 00000-0000"
                        className={`w-full bg-white/5 border ${formData.whatsapp && !isPhoneValid(formData.whatsapp) ? 'border-red-500' : 'border-white/10'} rounded-xl px-6 py-4 text-white focus:border-[#F4CDD4] outline-none transition-colors`}
                        value={formData.whatsapp}
                        onChange={handlePhoneChange}
                      />
                      {formData.whatsapp && !isPhoneValid(formData.whatsapp) && (
                        <span className="text-red-500 text-[10px] mt-1 block">Telefone inválido. Inclua o DDD.</span>
                      )}
                    </div>
                  </div>
                </div>
                <button 
                  onClick={handleNext}
                  disabled={!formData.name || !isEmailValid(formData.email) || !isPhoneValid(formData.whatsapp)}
                  className="w-full bg-[#F4CDD4] text-[#080808] py-5 rounded-2xl font-black uppercase tracking-widest hover:scale-[1.02] transition-transform disabled:opacity-50 disabled:hover:scale-100 shadow-[0_0_20px_rgba(244,205,212,0.2)] flex items-center justify-center gap-2 group"
                >
                  Próxima Etapa <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div 
                key="step2"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                className="space-y-8"
              >
                <h4 className="text-xl font-black text-white mb-8 tracking-tight">Perfil Operacional</h4>
                
                <div className="space-y-8">
                  <div>
                    <p className="text-white font-bold mb-4 text-sm">Possui CNPJ ativo?</p>
                    <div className="grid grid-cols-2 gap-4">
                      {['yes', 'no'].map(opt => (
                        <button 
                          key={opt}
                          onClick={() => setFormData({...formData, hasCnpj: opt})}
                          className={`py-4 rounded-xl border font-bold uppercase tracking-widest text-xs transition-all ${formData.hasCnpj === opt ? 'bg-[#F4CDD4] text-[#080808] border-[#F4CDD4]' : 'bg-white/5 text-white border-white/10 hover:border-white/30'}`}
                        >
                          {opt === 'yes' ? 'Sim' : 'Não'}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-white font-bold mb-4 text-sm">Utiliza sistema de gestão (ERP)?</p>
                    <div className="grid grid-cols-2 gap-4">
                      {['yes', 'no'].map(opt => (
                        <button 
                          key={opt}
                          onClick={() => setFormData({...formData, hasErp: opt})}
                          className={`py-4 rounded-xl border font-bold uppercase tracking-widest text-xs transition-all ${formData.hasErp === opt ? 'bg-[#F4CDD4] text-[#080808] border-[#F4CDD4]' : 'bg-white/5 text-white border-white/10 hover:border-white/30'}`}
                        >
                          {opt === 'yes' ? 'Sim' : 'Não'}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button onClick={handlePrev} className="flex-1 bg-white/5 text-white py-5 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-white/10 transition-colors">Voltar</button>
                  <button 
                    onClick={handleNext}
                    disabled={!formData.hasCnpj || !formData.hasErp}
                    className="flex-[2] bg-[#F4CDD4] text-[#080808] py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-[1.02] transition-transform disabled:opacity-50 flex items-center justify-center gap-2 group"
                  >
                    Próxima Etapa <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div 
                key="step3"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                className="space-y-6"
              >
                <h4 className="text-xl font-black text-white mb-8 tracking-tight">Localização e Identificação</h4>
                <div className="space-y-4">
                  <p className="text-white/60 text-sm mb-4">
                    {formData.hasCnpj === 'no' ? 'Para prosseguir, precisamos saber os dados de identificação do distribuidor.' : 'Para prosseguir, precisamos saber os dados da sua empresa.'}
                  </p>
                  <div>
                    <label className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-2 block">
                      {formData.hasCnpj === 'no' ? 'CPF do Distribuidor' : 'CNPJ da Empresa'}
                    </label>
                    <input 
                      type="text" 
                      placeholder={formData.hasCnpj === 'no' ? '000.000.000-00' : '00.000.000/0000-00'}
                      className={`w-full bg-white/5 border ${formData.cnpj && !isCnpjCpfValid(formData.cnpj) ? 'border-red-500' : 'border-white/10'} rounded-xl px-6 py-4 text-white focus:border-[#F4CDD4] outline-none transition-colors`}
                      value={formData.cnpj}
                      onChange={handleCnpjChange}
                    />
                    {formData.cnpj && !isCnpjCpfValid(formData.cnpj) && (
                      <span className="text-red-500 text-[10px] mt-1 block">
                        {formData.hasCnpj === 'no' ? 'CPF inválido. Deve possuir 11 dígitos.' : 'CNPJ inválido. Deve possuir 14 dígitos.'}
                      </span>
                    )}
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-2 block">Qual cidade está o seu estabelecimento?</label>
                    <input 
                      type="text" 
                      placeholder="Ex: São Paulo"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:border-[#F4CDD4] outline-none transition-colors"
                      value={formData.city}
                      onChange={e => setFormData({...formData, city: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-2 block">Quais outras cidades pretende atender? (separado por vírgulas)</label>
                    <input 
                      type="text" 
                      placeholder="Ex: Campinas, Limeira"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:border-[#F4CDD4] outline-none transition-colors"
                      value={formData.targetCities}
                      onChange={e => setFormData({...formData, targetCities: e.target.value})}
                    />
                  </div>
                </div>
                <div className="flex gap-4">
                  <button onClick={handlePrev} className="flex-1 bg-white/5 text-white py-5 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-white/10 transition-colors">Voltar</button>
                  <button 
                    onClick={handleNext}
                    disabled={!isCnpjCpfValid(formData.cnpj) || !formData.city || !formData.targetCities}
                    className="flex-[2] bg-[#F4CDD4] text-[#080808] py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-[1.02] transition-transform disabled:opacity-50 flex items-center justify-center gap-2 group"
                  >
                    Próxima Etapa <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div 
                key="step4"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                className="space-y-6"
              >
                <h4 className="text-xl font-black text-white mb-8 tracking-tight">Modelo de Negócio</h4>
                <div className="space-y-6">
                  <div>
                    <label className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-4 block">Como você atua hoje?</label>
                    <div className="grid grid-cols-1 gap-2">
                      {[
                        { id: 'fisico', label: 'Distribuição Física' },
                        { id: 'ecommerce', label: 'E-commerce' },
                        { id: 'ambos', label: 'Ambos (Físico e E-commerce)' }
                      ].map(opt => (
                        <button 
                          key={opt.id}
                          onClick={() => setFormData({...formData, businessModel: opt.label})}
                          className={`py-4 px-6 rounded-xl border text-left font-bold uppercase tracking-widest text-[10px] transition-all flex items-center justify-between ${formData.businessModel === opt.label ? 'bg-[#F4CDD4] text-[#080808] border-[#F4CDD4]' : 'bg-white/5 text-white border-white/10 hover:border-white/30'}`}
                        >
                          {opt.label}
                          {formData.businessModel === opt.label && <CheckCircle size={16} />}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-2 block">Já trabalha com alguma marca de cosmética pet? (Opcional)</label>
                    <input 
                      type="text" 
                      placeholder="Ex: Marca X, Marca Y ou Não trabalho"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:border-[#F4CDD4] outline-none transition-colors"
                      value={formData.previousBrands}
                      onChange={e => setFormData({...formData, previousBrands: e.target.value})}
                    />
                  </div>
                </div>
                <div className="flex gap-4">
                  <button onClick={handlePrev} className="flex-1 bg-white/5 text-white py-5 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-white/10 transition-colors">Voltar</button>
                  <button 
                    onClick={handleNext}
                    className="flex-[2] bg-[#F4CDD4] text-[#080808] py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-[1.02] transition-transform flex items-center justify-center gap-2 group"
                  >
                    Próxima Etapa <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 5 && (
              <motion.div 
                key="step5"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                className="space-y-8"
              >
                <h4 className="text-xl font-black text-white mb-8 tracking-tight">Critério de Investimento</h4>
                
                <div>
                  <p className="text-white font-bold mb-6 leading-relaxed text-sm">
                    Para ser um <span className="bg-[#F4CDD4] text-[#080808] px-1">Autorizado</span> e pertencer ao <span className="bg-[#F4CDD4] text-[#080808] px-1">ecossistema</span> Bubbles®, o investimento inicial em estoque é de <span className="text-[#F4CDD4]">R$ 10.000,00</span>. 
                    Você possui esse capital disponível para início imediato?
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    {['yes', 'no'].map(opt => (
                      <button 
                        key={opt}
                        onClick={() => setFormData({...formData, hasInvestment: opt})}
                        className={`py-4 rounded-xl border font-bold uppercase tracking-widest text-xs transition-all ${formData.hasInvestment === opt ? 'bg-[#F4CDD4] text-[#080808] border-[#F4CDD4]' : 'bg-white/5 text-white border-white/10 hover:border-white/30'}`}
                      >
                        {opt === 'yes' ? 'Sim' : 'Não'}
                      </button>
                    ))}
                  </div>
                </div>

                {formData.hasInvestment === 'no' && (
                  <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                    <p className="text-white/60 text-xs leading-relaxed">
                      Entendemos. No momento, focamos em parceiros com este perfil de investimento para garantir a sustentabilidade do negócio. 
                      Manteremos seu contato para futuras oportunidades.
                    </p>
                  </div>
                )}

                <div className="flex gap-4">
                  <button onClick={handlePrev} disabled={isSubmitting} className="flex-1 bg-white/5 text-white py-5 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-white/10 transition-colors disabled:opacity-50">Voltar</button>
                  <button 
                    onClick={finishForm}
                    disabled={!formData.hasInvestment || isSubmitting}
                    className="flex-[2] bg-[#F4CDD4] text-[#080808] py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-[1.02] transition-transform disabled:opacity-50 shadow-[0_0_20px_rgba(244,205,212,0.2)] flex items-center justify-center gap-2 group relative"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-[#080808]/30 border-t-[#080808] rounded-full animate-spin" />
                    ) : (
                      <>
                        {formData.hasInvestment === 'yes' ? 'Finalizar Candidatura' : 'Encerrar'} <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
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

// --- Main Page ---

export default function DistribuidorGabriel() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isExitPopupOpen, setIsExitPopupOpen] = useState(false);
  const heroButtonRef = useRef<HTMLButtonElement>(null);

  const handleOpenForm = React.useCallback(() => {
    setIsFormOpen(true);
    try {
      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).dataLayer.push({
        event: 'form_open',
        form_name: 'candidatura_distribuidor'
      });
    } catch (e) {}
  }, []);

  const statsCarouselRef = useRef<HTMLDivElement>(null);
  const profitabilityCarouselRef = useRef<HTMLDivElement>(null);
  const testimonialsCarouselRef = useRef<HTMLDivElement>(null);
  const isHoveredTestimonials = useRef(false);
  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(0);

  const handleTestimonialScroll = () => {
    if (!testimonialsCarouselRef.current) return;
    const { scrollLeft, clientWidth } = testimonialsCarouselRef.current;
    const itemWidth = clientWidth * (window.innerWidth < 768 ? 0.8 : 0.4);
    const newIndex = Math.round(scrollLeft / itemWidth);
    if (newIndex >= 0 && newIndex < 4) {
      setActiveTestimonialIndex(newIndex);
    }
  };

  const [activeCommunityTab, setActiveCommunityTab] = useState(0);
  const productLinesCarouselRef = useRef<HTMLDivElement>(null);

  const communityItems = [
    {
      title: "Marketing Ativo",
      desc: "Acesso a criativos semanais, fotos profissionais e vídeos para suas redes sociais. Suporte total para o seu sell-out. Nossa equipe de design e copy cria materiais prontos para você postar e vender, garantindo que a marca esteja sempre em evidência na sua região.",
      icon: Instagram
    },
    {
      title: "Suporte Técnico",
      desc: "Canal direto com especialistas para sanar dúvidas de aplicação e diluição. Treinamento contínuo para sua equipe comercial e técnica. Entendemos que o conhecimento técnico é a base da venda consultiva no mercado pet de alto padrão.",
      icon: HelpCircle
    },
    {
      title: "Tecnologias Exclusivas",
      desc: "Tecnologia de fragrâncias de longa duração e fórmulas de alta performance que criam desejo no tutor final. Nossos produtos utilizam ativos de cosmética humana adaptados para o pH animal, entregando resultados visíveis desde o primeiro banho.",
      icon: Award
    },
    {
      title: "Plataforma Completa",
      desc: "Treinamentos de gestão, vendas e processos para acelerar o crescimento do seu negócio de distribuição. Ensinamos desde a contratação de vendedores até a gestão de estoque e fluxo de caixa, resolvendo as principais dores do distribuidor moderno.",
      icon: GraduationCap
    },
    {
      title: "Alta Recompra",
      desc: "Produtos com taxa de fidelidade superior a 90%. O sell-in é consequência natural de um sell-out forte e recorrente. Uma vez que o groomer testa Bubbles®, ele se torna um embaixador da marca, garantindo pedidos de reposição automáticos.",
      icon: TrendingUp
    }
  ];

  useEffect(() => {
    const carousels = [
      { ref: statsCarouselRef, disableOnMobile: false }, 
      { ref: profitabilityCarouselRef, disableOnMobile: false },
      { ref: testimonialsCarouselRef, disableOnMobile: true },
      { ref: productLinesCarouselRef, disableOnMobile: true }
    ];
    
    const intervals: NodeJS.Timeout[] = [];
    const observers: IntersectionObserver[] = [];

    carousels.forEach(({ ref, disableOnMobile }) => {
      let timer: NodeJS.Timeout;
      
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            timer = setInterval(() => {
              if (disableOnMobile && window.innerWidth <= 768) return;
              if (ref === testimonialsCarouselRef && isHoveredTestimonials.current) return;
              if (ref.current) {
                const { scrollLeft, scrollWidth, clientWidth } = ref.current;
                // Se estiver perto do fim, volta pro começo com scroll suave
                if (scrollLeft + clientWidth >= scrollWidth - 10) {
                  ref.current.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                  // Scroll de um card por vez aproximadamente
                  const scrollStep = clientWidth > 768 ? 400 : 300;
                  ref.current.scrollBy({ left: scrollStep, behavior: 'smooth' });
                }
              }
            }, 4000);
            intervals.push(timer);
          } else {
            clearInterval(timer);
          }
        },
        { threshold: 0.1 }
      );

      // Observa o container do carrossel
      if (ref.current) {
        observer.observe(ref.current);
      }
      observers.push(observer);
    });

    return () => {
      intervals.forEach(clearInterval);
      observers.forEach(obs => obs.disconnect());
    };
  }, []);

  const scrollCarousel = (ref: React.RefObject<HTMLDivElement | null>, direction: 'left' | 'right') => {
    if (ref.current) {
      const scrollAmount = 400;
      ref.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      // Don't show in development environment
      if ((import.meta as any).env.DEV) return;
      
      if (e.clientY <= 0) {
        const lastShown = localStorage.getItem('lastExitPopupTime');
        const hasSubmitted = localStorage.getItem('formSubmitted');
        const now = Date.now();
        const fiveMinutes = 5 * 60 * 1000;
        
        if (!hasSubmitted && (!lastShown || now - parseInt(lastShown) > fiveMinutes)) {
          setIsExitPopupOpen(true);
          localStorage.setItem('lastExitPopupTime', now.toString());
        }
      }
    };
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, []);

  return (
    <div className="bg-[#080808] text-white font-['Figtree',sans-serif] selection:bg-[#F4CDD4] selection:text-[#080808] overflow-x-hidden pb-40">
      
      {/* Hero Section - 100vh */}
      <section className="relative min-h-screen flex flex-col overflow-hidden py-20 md:py-0">
        {/* Custom Header */}
        <header className="absolute top-0 left-0 w-full z-30 py-8 px-10 flex justify-between items-center">
          {/* Logo removed here to avoid double logo in hero */}
        </header>

        {/* Background Effects */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#F4CDD4]/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#F4CDD4]/5 blur-[120px] rounded-full" />
          {/* Bubble Texture */}
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[radial-gradient(circle_at_center,_#F4CDD4_1px,_transparent_1px)] bg-[size:30px_30px]" />
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(circle_at_center,_#F4CDD4_2px,_transparent_2px)] bg-[size:80px_80px]" />
        </div>

        <div className="flex-grow flex items-center px-10 relative z-10">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center w-full">
            <motion.div 
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="mb-4 pt-6 md:pt-8">
                <Logo />
              </div>
              
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-black mb-4 leading-[1.1] tracking-tighter uppercase">
                SEJA UM DISTRIBUIDOR BUBBLES E DOMINE A SUA REGIÃO COM A MARCA QUE <span className="text-[#F4CDD4] drop-shadow-[0_0_10px_rgba(244,205,212,0.3)]">DEFINE O PADRÃO</span> DO COSMÉTICO PET.
              </h1>
              
              <p className="text-white/60 text-base md:text-lg mb-6 max-w-xl leading-relaxed">
                Leve inovação, qualidade premium e lucratividade para o seu negócio através da marca que mais cresce no setor.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 items-stretch">
                  <motion.button 
                    ref={heroButtonRef}
                    whileHover={{ 
                      scale: 1.02,
                      boxShadow: "0 0 40px rgba(244,205,212,0.6)",
                      y: -2
                    }}
                    whileTap={{ scale: 0.98 }}
                    animate={{ 
                      y: [0, -4, 0],
                      transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                    }}
                    onClick={handleOpenForm}
                    className="bg-[#F4CDD4] text-[#080808] px-6 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:shadow-[0_0_30px_rgba(244,205,212,0.4)] transition-all flex items-center justify-center gap-2 group flex-1 w-full md:w-auto text-center leading-tight"
                  >
                    Quero ser um distribuidor <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform hidden md:block" />
                  </motion.button>
                <div className="flex items-center gap-4 px-6 py-4 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm flex-1">
                  <div className="flex -space-x-3">
                    {[1,2,3].map(i => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-[#080808] bg-gray-800 overflow-hidden shadow-lg">
                        <img src={`https://i.pravatar.cc/100?u=${i+10}`} alt="User" referrerPolicy="no-referrer" loading="lazy" width="32" height="32" />
                      </div>
                    ))}
                  </div>
                  <div className="text-xs">
                    <p className="text-white font-black text-xs">+150 Parceiros</p>
                    <p className="text-white/40 uppercase tracking-[0.2em] font-black text-[8px]">Ativos no Brasil</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative h-[400px] md:h-[480px]"
            >
              <div className="absolute inset-0 bg-[#F4CDD4]/10 blur-[100px] rounded-full -z-10" />
              <div className="h-full border border-white/10 rounded-[40px] p-2 bg-white/5 backdrop-blur-sm shadow-[0_0_40px_rgba(0,0,0,0.3)]">
                <HeroCarousel />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Marquee */}
      <BenefitsMarquee />

      {/* Product Lines Section */}
      <section id="linhas" className="py-20 px-6 md:px-10 bg-[#080808] relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.03] pointer-events-none z-0 overflow-hidden">
          <img 
            src="https://bubbles.gabrielxavier.online/PATINHA%20BUBBLES.svg" 
            alt="" 
            className="w-full h-full object-contain"
            referrerPolicy="no-referrer"
            loading="lazy"
          />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <span className="text-[#F4CDD4] text-[10px] font-black uppercase tracking-[0.3em] mb-4 block">Nosso Mix</span>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight uppercase break-words">
              Uma Linha para cada <br className="block md:hidden" />
              <span className="text-[#F4CDD4]">Perfil de Cliente</span>
            </h2>
            <p className="text-white/60 text-lg max-w-3xl mx-auto leading-relaxed">
              Do groomer de elite ao pet shop em expansão, a Bubbles® oferece soluções que combinam alta performance técnica com rentabilidade imbatível.
            </p>
          </div>

          <CarouselWrapper carouselRef={productLinesCarouselRef}>
            <div className="flex gap-6 overflow-x-auto pt-6 pb-12 snap-x snap-mandatory no-scrollbar -mx-6 px-6 md:mx-0 md:px-0 md:grid md:grid-cols-2 lg:grid-cols-4" ref={productLinesCarouselRef}>
              {[
                {
                  name: "PRO",
                target: "Groomers Avançados",
                pos: "Alta performance, resultado técnico superior.",
                visual: "Embalagem preta, tom sério e técnico.",
                highlightLabel: "Diluição",
                highlightValue: "1:10 (rende até 550 banhos/5L).",
                quote: "Para quem não aceita menos que o melhor",
                color: "#0D0C0D",
                logo: "https://bubbles.gabrielxavier.online/PRO.svg",
                accent: "#FFFFFF"
              },
              {
                name: "Essential",
                target: "Pet Shops em Crescimento",
                pos: "Linha Premium com preço acessível. O equilíbrio perfeito entre custo-benefício e alto desempenho profissional.",
                visual: "Embalagem rosa/neutra, tom amigável.",
                highlightLabel: "Recorrência",
                highlightValue: "Alta rotatividade e aceitação imediata.",
                quote: "Qualidade Bubbles com o melhor custo por banho",
                color: "#F4CDD4",
                logo: "https://bubbles.gabrielxavier.online/ESSENTIAL.svg",
                accent: "#F4CDD4"
              },
              {
                name: "Xperience",
                target: "Experiência Sensorial",
                pos: "Focada em posicionamento de mercado, diferenciação da concorrência e aumento imediato do ticket médio do banho e tosa.",
                visual: "Uma explosão de experiências. Embalagens dinâmicas que podem assumir todas as cores.",
                highlightLabel: "Tecnologia",
                highlightValue: "Formulada com as últimas novidades e tendências do mercado mundial de cosmética.",
                quote: "Seu pet vai cheirar tão bem que vão perguntar o segredo",
                color: "#C8A96E",
                logo: "https://bubbles.gabrielxavier.online/XPERIENCE.svg",
                accent: "#C8A96E"
              },
              {
                name: "Collora",
                target: "Estética Criativa",
                pos: "Coloração pet profissional segura e vibrante.",
                visual: "Embalagens vibrantes com conceito arco-íris.",
                highlightLabel: "Inovação",
                highlightValue: "Transforme a pelagem em arte com segurança.",
                quote: "Transforme a pelagem em arte com segurança comprovada",
                color: "#B066C6",
                logo: "https://bubbles.gabrielxavier.online/COLLORA.svg",
                accent: "#B066C6"
              }
            ].map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ 
                  y: -10,
                  borderColor: `${line.accent}44`,
                  backgroundColor: `${line.accent}05`
                }}
                className="bg-[#121212] border border-white/5 border-t-4 p-8 rounded-[32px] flex flex-col h-full group transition-all duration-500 relative overflow-hidden min-w-[280px] md:min-w-0 snap-center"
                style={{ borderTopColor: line.accent }}
              >
                <div 
                  className="absolute top-0 right-0 w-32 h-32 blur-3xl rounded-full -mr-16 -mt-16 opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                  style={{ backgroundColor: line.accent }}
                />

                <div className="mb-4 h-40 flex items-center justify-center relative">
                  <img 
                    src={line.logo} 
                    alt={`Linha ${line.name}`} 
                    className="h-full w-auto object-contain brightness-0 invert transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    width="120"
                    height="120"
                  />
                </div>
                
                <div className="mb-8">
                  <span 
                    className="text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full border mb-4 inline-block"
                    style={{ 
                      borderColor: `${line.accent}33`,
                      color: line.accent,
                      backgroundColor: `${line.accent}11`
                    }}
                  >
                    {line.target}
                  </span>
                  <h3 className="text-xl font-black text-white mb-3 tracking-tight">Linha {line.name}</h3>
                  <p className="text-white/50 text-xs leading-relaxed font-medium">{line.pos}</p>
                </div>

                <div className="space-y-5 mb-10 flex-grow">
                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-lg bg-white/5 flex items-center justify-center shrink-0 mt-0.5 border border-white/10">
                      <Eye size={14} style={{ color: line.accent }} />
                    </div>
                    <div>
                      <p className="text-white/40 text-[9px] font-black uppercase tracking-widest mb-0.5">Visual</p>
                      <p className="text-white/80 text-[11px] leading-tight font-medium">{line.visual}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-lg bg-white/5 flex items-center justify-center shrink-0 mt-0.5 border border-white/10">
                      <Droplets size={14} style={{ color: line.accent }} />
                    </div>
                    <div>
                      <p className="text-white/40 text-[9px] font-black uppercase tracking-widest mb-0.5">{line.highlightLabel}</p>
                      <p className="text-white/80 text-[11px] leading-tight font-medium">{line.highlightValue}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t border-white/5 mt-auto">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-1 h-4 rounded-full" style={{ backgroundColor: line.accent }} />
                    <p className="text-white/40 text-[9px] font-black uppercase tracking-widest">Manifesto</p>
                  </div>
                  <p className="text-white font-black italic text-xs leading-tight tracking-tight">
                    "{line.quote}"
                  </p>
                </div>
                
                  <div 
                    className="absolute bottom-0 left-0 w-full h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ backgroundColor: line.accent }}
                  />
                </motion.div>
              ))}
            </div>
          </CarouselWrapper>
        </div>
      </section>

      {/* Argumentation 1: Profitability */}
      <section id="rentabilidade" className="py-16 md:py-20 px-6 md:px-10 border-t border-white/5 relative z-0">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#F4CDD4]/5 blur-[150px] rounded-full pointer-events-none" />
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            <div className="order-2 lg:order-1 min-w-0">
              <CarouselWrapper carouselRef={profitabilityCarouselRef}>
                <div className="flex lg:grid lg:grid-cols-2 gap-4 lg:gap-6 overflow-x-auto lg:overflow-visible pb-8 lg:pb-0 snap-x snap-mandatory no-scrollbar -mx-6 px-6 lg:mx-0 lg:px-0" ref={profitabilityCarouselRef}>
                  {[
                    { icon: BarChart3, title: "Ganhos Exponenciais", desc: "Estrutura de preços desenhada para o seu crescimento." },
                  { icon: Zap, title: "Giro de Estoque", desc: "Produtos de alta recorrência e aceitação imediata." },
                  { icon: Shield, title: "Segurança de Mercado", desc: "Segurança de Margem - Política rígida de controle de preço mínimo de venda (protegendo o distribuidor contra a canibalização de preços)." },
                  { icon: Users, title: "Fidelização", desc: "O profissional que usa Bubbles® não aceita substitutos." }
                ].map((item, idx) => (
                  <motion.div 
                    key={idx} 
                    whileHover={{ 
                      y: -10, 
                      borderColor: 'rgba(244,205,212,0.6)',
                      boxShadow: "0 0 40px rgba(244,205,212,0.15)"
                    }}
                    className="bg-[#121212] border border-white/5 p-6 lg:p-8 rounded-3xl transition-all group shadow-lg relative overflow-hidden min-w-[260px] lg:min-w-0 snap-center"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#F4CDD4]/5 blur-3xl rounded-full -mr-16 -mt-16 group-hover:bg-[#F4CDD4]/10 transition-colors" />
                    <item.icon size={28} className="text-[#F4CDD4] mb-6 group-hover:scale-110 transition-transform drop-shadow-[0_0_8px_rgba(244,205,212,0.3)]" />
                    <h4 className="text-base font-black text-white mb-2 tracking-tight uppercase">{item.title}</h4>
                    <p className="text-white/40 text-[11px] leading-relaxed font-medium">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
              </CarouselWrapper>
            </div>
            <div className="order-1 lg:order-2 min-w-0">
              <span className="text-[#F4CDD4] text-[10px] font-black uppercase tracking-[0.3em] mb-4 block">Ganhos Exponenciais</span>
              <h2 className="text-2xl md:text-4xl font-black text-white mb-6 md:mb-8 leading-tight tracking-tight uppercase break-words">
                Segurança de Margem <br className="block md:hidden" />e <br className="hidden md:block" />
                <span className="text-[#F4CDD4]">Rentabilidade Real.</span>
              </h2>
              <p className="text-white/60 text-sm md:text-base mb-8 leading-relaxed">
                Nossa Linha PRO oferece diluição de até 1:10, garantindo o menor custo por banho do mercado. 
                Para o distribuidor, isso se traduz em <span className="text-white font-bold">lucratividade competitiva com margens de até 45%</span> e recompra garantida.
              </p>
              <ul className="space-y-3 md:space-y-4">
                {[
                  "Margens de lucro estruturadas para escala",
                  "Payback do investimento inicial em tempo recorde",
                  "Bonificações por metas atingidas*",
                  "Apoio em feiras e eventos regionais"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-white/80 font-bold text-sm">
                    <CheckCircle size={16} className="text-[#F4CDD4]" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ROI Calculator Section */}
      <ROICalculator />


      {/* Who is Bubbles Section */}
      <section id="quem-somos" className="relative py-12 px-10 overflow-hidden flex items-center min-h-[60vh]">
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
        <div className="absolute inset-0 bg-black/70 z-10" />
        
        <div className="max-w-7xl mx-auto relative z-20 w-full">
          <div className="text-center mb-8">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-[#F4CDD4] text-[8px] font-black uppercase tracking-[0.4em] mb-2 block"
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
            <div className="flex gap-4 overflow-x-auto pb-8 snap-x snap-mandatory no-scrollbar -mx-10 px-10 lg:mx-0 lg:px-0 lg:grid lg:grid-cols-5 lg:gap-2" ref={statsCarouselRef}>
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

      {/* Argumentation 2: Community */}
      <section id="comunidade" className="py-20 px-10 bg-[#121212]/30 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        <div className="max-w-7xl mx-auto text-center mb-12">
          <span className="text-[#F4CDD4] text-[10px] font-black uppercase tracking-[0.3em] mb-4 block">Pertencimento e Elite</span>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-8 tracking-tight uppercase break-words">Faça Parte da <br className="block md:hidden" /><span className="bg-[#F4CDD4] text-[#080808] px-2">COMUNIDADE</span> que <br /> Lidera o Futuro do Mercado Pet.</h2>
          <p className="text-white/60 text-lg max-w-3xl mx-auto leading-relaxed">
            Ser um distribuidor Bubbles® é pertencer a um <span className="bg-[#F4CDD4] text-[#080808] px-1 py-1 font-bold">ecossistema</span> de elite que dita as tendências do setor. 
            Não entregamos apenas galões; entregamos <span className="text-white font-bold">posicionamento e autoridade</span>.
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          {/* Tabs Navigation */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {communityItems.map((item, i) => (
              <button
                key={i}
                onClick={() => setActiveCommunityTab(i)}
                className={`px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300 border ${
                  activeCommunityTab === i 
                  ? "bg-[#F4CDD4] text-[#080808] border-[#F4CDD4] shadow-[0_0_20px_rgba(244,205,212,0.3)]" 
                  : "bg-white/5 text-white/40 border-white/10 hover:border-white/30"
                }`}
              >
                {item.title}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCommunityTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="bg-[#121212] border border-white/10 p-8 md:p-16 rounded-[40px] relative overflow-hidden group shadow-2xl"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#F4CDD4]/5 blur-[100px] rounded-full -mr-32 -mt-32" />
              
              <div className="flex flex-col md:flex-row gap-12 items-center relative z-10">
                <div className="w-24 h-24 md:w-32 md:h-32 bg-[#F4CDD4]/10 rounded-3xl flex items-center justify-center border border-[#F4CDD4]/20 text-[#F4CDD4] shrink-0">
                  {React.createElement(communityItems[activeCommunityTab].icon, { size: 48 })}
                </div>
                <div className="text-center md:text-left">
                  <h4 className="text-2xl md:text-3xl font-black text-white mb-6 tracking-tight">
                    {communityItems[activeCommunityTab].title}
                  </h4>
                  <p className="text-white/60 text-sm md:text-lg leading-relaxed font-medium">
                    {communityItems[activeCommunityTab].desc}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Argumentation 3: Logistics */}
      <section id="suporte" className="py-20 px-10 relative">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-center">
          <div>
            <span className="text-[#F4CDD4] text-[10px] font-black uppercase tracking-[0.3em] mb-4 block">Excelência Logística</span>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-8 leading-tight tracking-tight uppercase break-words">
              Suporte Total: <br className="hidden md:block" />
              Do Pedido à <br className="block md:hidden" />
              <span className="text-[#F4CDD4]">Satisfação do seu Cliente.</span>
            </h2>
            <p className="text-white/60 text-base mb-12 leading-relaxed">
              Nossa operação é desenhada para que sua única preocupação seja o <span className="text-white font-bold">relacionamento comercial</span>. 
              O seu sell-in é consequência direta do nosso suporte no seu sell-out. 
              Com produtos de <span className="text-white font-bold">fácil aceitação inicial</span> e altíssima taxa de recompra, a reposição de estoque se torna um processo natural e acelerado.
              Cuidamos da precisão industrial e da agilidade logística para você nunca perder uma venda.
            </p>
            
            <div className="space-y-8">
              <div className="flex gap-6 group">
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center shrink-0 border border-white/10 group-hover:border-[#F4CDD4]/40 transition-colors shadow-lg">
                  <Truck className="text-[#F4CDD4]" />
                </div>
                <div>
                  <h5 className="text-white font-black text-lg mb-1 tracking-tight">Expedição em 5 Dias úteis</h5>
                  <p className="text-white/40 text-xs font-medium">Agilidade logística para garantir que seu estoque nunca fique zerado.</p>
                </div>
              </div>
              <div className="flex gap-6 group">
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center shrink-0 border border-white/10 group-hover:border-[#F4CDD4]/40 transition-colors shadow-lg">
                  <TrendingUp className="text-[#F4CDD4]" />
                </div>
                <div>
                  <h5 className="text-white font-black text-lg mb-1 tracking-tight">Fácil Positivação</h5>
                  <p className="text-white/40 text-xs font-medium">Produtos com alta taxa de aceitação inicial e recompra garantida pelos groomers.</p>
                </div>
              </div>
              <div className="flex gap-6 group">
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center shrink-0 border border-white/10 group-hover:border-[#F4CDD4]/40 transition-colors shadow-lg">
                  <Award className="text-[#F4CDD4]" />
                </div>
                <div>
                  <h5 className="text-white font-black text-lg mb-1 tracking-tight">Certificações de Elite</h5>
                  <p className="text-white/40 text-xs font-medium">Produtos Veganos e Cruelty-Free. Diferenciais éticos que fecham negócios.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-[#F4CDD4]/10 blur-[80px] rounded-full -z-10" />
            <div className="bg-[#121212] border border-white/10 p-4 rounded-[40px] shadow-2xl relative overflow-hidden">
              <picture>
                <source media="(max-width: 768px)" srcSet="https://bubbles.gabrielxavier.online/bubbles-estoque-expedicao-mobile.webp" />
                <source media="(min-width: 769px)" srcSet="https://bubbles.gabrielxavier.online/bubbles-estoque-expedicao-desktop.webp" />
                <img 
                  src="https://bubbles.gabrielxavier.online/bubbles-estoque-expedicao-desktop.webp" 
                  alt="Bubbles® Logistics" 
                  className="rounded-[32px] w-full transition-all duration-700"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  width="600"
                  height="400"
                />
              </picture>
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent opacity-40" />
              <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 md:right-10">
                <p className="text-white font-black text-[10px] md:text-sm uppercase tracking-widest bg-[#F4CDD4] text-[#080808] px-3 md:px-4 py-1.5 md:py-2 rounded-full inline-block shadow-xl">
                  Logística de Alta Performance
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section 
        className="py-16 md:py-20 px-6 md:px-10 bg-[#080808] relative overflow-hidden"
        onMouseEnter={() => isHoveredTestimonials.current = true}
        onMouseLeave={() => isHoveredTestimonials.current = false}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-16">
            <span className="text-[#F4CDD4] text-[10px] font-black uppercase tracking-[0.3em] mb-4 block">Vozes do Sucesso</span>
            <h2 className="text-2xl md:text-4xl font-black text-white mb-6 tracking-tight uppercase break-words">
              Mais de 50 distribuidores em todo o Brasil confiam na Bubbles. Veja o que eles dizem:
            </h2>
          </div>

          <CarouselWrapper carouselRef={testimonialsCarouselRef} showOnDesktop={true} showGradient={true}>
            <div 
              ref={testimonialsCarouselRef}
              onScroll={handleTestimonialScroll}
              className="flex gap-4 md:gap-6 overflow-x-auto pb-8 snap-x snap-mandatory no-scrollbar -mx-6 px-6 md:mx-0 md:px-0 items-stretch"
            >
              {[
                { name: "MANTYPET", text: "Ser distribuidor da Bubbles tem se mostrado uma experiência extremamente enriquecedora e estratégica, marcada por aprendizado constante e resultados positivos desde o início, mesmo sem experiência prévia no segmento de banho e tosa. O suporte próximo e eficiente da equipe Bubbles, aliado à excelência dos produtos, nos transmite total segurança operacional e fortalece nossa atuação comercial, refletindo diretamente na alta aceitação e satisfação dos clientes." },
                { name: "Assispet", text: "a Bubbles se tornou em pouco tempo um dos nossos principais fornecedores, um grande parceiro que veio pra somar trabalho e resultado em nossa distribuidora, com excelente atendimento e suporte de toda equipe, uma empresa com um leque imenso de produtos, sempre trazendo novidades ao mercado pet." },
                { name: "SERRAPET", text: "Ser distribuidor Bubbles vai muito além de vender produtos, é viver, na prática, a transformação que eles causam. É acompanhar de perto aquele pet que chega para o banho e sai renovado, com o pelo macio, brilho evidente e um perfume que realmente marca. É ver o olhar do cliente mudar, o elogio espontâneo surgir e saber que você fez parte daquela experiência. No dia a dia, é sentir a diferença na rotina dos profissionais: produtos que rendem, que facilitam o trabalho e elevam o padrão do atendimento. É perceber que não se trata só de estética, mas de cuidado, bem-estar e valorização do serviço prestado. Ser Bubbles é criar conexão com os pet shops, com os groomers e com cada cliente que volta justamente pela experiência que teve. É ter orgulho de representar algo que entrega resultado de verdade, que fideliza e que faz o negócio crescer junto. No fim, ser distribuidor Bubbles é isso: não é só sobre o que você entrega… é sobre o que as pessoas sentem depois, pois a satisfação do cliente do meu cliente é a minha satisfação." },
                { name: "TOPET", text: "Trabalhar com a Bubbles é ter a segurança de estar ao lado de uma marca forte, reconhecida e em constante crescimento no mercado pet. Seu investimento consistente em marketing e inovação faz com que os produtos tenham alta aceitação e desejo, criando uma conexão natural com os clientes. A cada chegada, percecebemos o quanto a marca já é aguardada — existe uma expectativa, um interesse genuíno e uma confiança construída ao longo do tempo. Isso torna nosso trabalho muito mais fluido, fortalecendo parcerias e facilitando o acesso aos clientes. Com a Bubbles, unimos credibilidade, inovação e propósito, levando aos nossos clientes não apenas produtos, mas uma experiência que já é valorizada e esperada pelo mercado." }
            ].map((testimonial, i) => {
              const isActive = i === activeTestimonialIndex;
              return (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`bg-white/5 border border-white/10 p-6 md:p-8 rounded-3xl hover:border-[#F4CDD4]/30 transition-all duration-500 group min-w-[80%] md:min-w-[40%] snap-center flex flex-col justify-between relative h-full ${isActive ? 'opacity-100' : 'opacity-50'}`}
              >
                <div className="absolute top-4 right-6 text-[#F4CDD4]/10 group-hover:text-[#F4CDD4]/20 transition-colors">
                  <span className="text-6xl font-serif">"</span>
                </div>
                <div>
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => <Star key={i} size={10} className="fill-[#F4CDD4] text-[#F4CDD4]" />)}
                  </div>
                  <p className="text-white/60 text-[10px] md:text-xs italic mb-6 leading-relaxed relative z-10">"{testimonial.text}"</p>
                </div>
                <div className="flex items-center gap-3">
                  <div>
                    <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2">
                      <p className="text-white font-black text-xs md:text-sm tracking-tight">{testimonial.name}</p>
                      <span className="text-[#00FF00] text-[8px] font-bold uppercase tracking-widest bg-[#00FF00]/10 px-2 py-0.5 rounded-full border border-[#00FF00]/20 flex items-center gap-1 w-fit">
                        <CheckCircle2 size={8} /> Verificado
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
            })}
            </div>
          </CarouselWrapper>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-8 md:py-12 px-6 md:px-10">
        <div className="max-w-7xl mx-auto bg-gradient-to-br from-[#121212] to-[#080808] border border-white/10 rounded-[40px] md:rounded-[60px] p-10 md:p-24 text-center relative overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)]">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#F4CDD4_1px,_transparent_1px)] bg-[size:60px_60px] opacity-[0.02]" />
          
          <div className="relative z-10">
            <span className="text-[#F4CDD4] text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] mb-4 md:mb-6 block">Seu Território Aguarda</span>
            <h2 className="text-2xl md:text-4xl font-black text-white mb-6 md:mb-8 tracking-tighter">
              Pronto para ser o <br />
              <span className="text-[#F4CDD4] drop-shadow-[0_0_15px_rgba(244,205,212,0.4)]">Próximo Case de Sucesso?</span>
            </h2>
            <p className="text-white/60 text-sm md:text-lg mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed">
              As vagas para novos distribuidores são limitadas por região para garantir a exclusividade e rentabilidade dos parceiros atuais.
            </p>
            
            <motion.button 
              whileHover={{ 
                scale: 1.02, 
                boxShadow: '0 0 40px rgba(244,205,212,0.4)',
                y: -1
              }}
              whileTap={{ scale: 0.98 }}
              animate={{ 
                y: [0, -2, 0],
                transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
              }}
              onClick={() => setIsFormOpen(true)}
              className="bg-[#F4CDD4] text-[#080808] px-10 md:px-20 py-3 md:py-4 rounded-xl md:rounded-2xl font-black uppercase tracking-widest text-xs md:text-base transition-all flex items-center justify-center gap-3 md:gap-4 mx-auto group w-full sm:w-auto shadow-2xl max-w-[180px] md:max-w-none text-center leading-tight"
            >
              Me tornar um distribuidor agora <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform hidden md:block" />
            </motion.button>
            
            <p className="mt-8 md:mt-12 text-white/40 text-[8px] md:text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2">
              <Lock size={12} /> Processo de Seleção 100% Seguro e Confidencial
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
            <Logo />
            
            <div className="text-center md:text-right">
              <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-2">
                Bubbles® Cosméticos Pet
              </p>
              <p className="text-white/20 text-[9px] font-bold uppercase tracking-widest">
                CNPJ: 26.353.134/0001-40
              </p>
            </div>
            
            <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">
              © 2026 Bubbles®. Todos os direitos reservados.
            </p>
          </div>

          <div className="pt-12 border-t border-white/5">
            <p className="text-white/20 text-[9px] leading-relaxed max-w-4xl mx-auto text-center font-medium">
              *As bonificações por metas atingidas são calculadas trimestralmente com base no volume de compras e positivação de novos clientes na região designada. 
              Os critérios de elegibilidade incluem adimplência financeira e participação nos treinamentos oficiais da marca. 
              Os valores de faturamento e margem apresentados na calculadora são estimativas baseadas em médias de mercado e podem variar conforme a gestão e região. 
              Caso tenha dúvidas sobre os cálculos, margens ou condições comerciais específicas para sua região, entre em contato com nosso suporte.
              Consulte seu gerente de conta para o detalhamento das faixas de premiação vigentes.
            </p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <MultiStepForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
      <ExitIntentPopup 
        isOpen={isExitPopupOpen} 
        onClose={() => setIsExitPopupOpen(false)} 
        onOpenForm={handleOpenForm} 
      />
      <StickyBar onOpenForm={handleOpenForm} heroButtonRef={heroButtonRef} />
    </div>
  );
}

const ROICalculator = () => {
  const [investment, setInvestment] = useState(10000);
  const paybackMonths = "2-3";

  const revenue = Math.round(investment / 0.55); 
  const profit = revenue - investment;

  return (
    <section id="calculadora" className="py-12 md:py-16 px-6 md:px-10 bg-[#080808] relative overflow-hidden">
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
              <TrendingUp size={60} className="md:w-[100px] md:h-[100px]" />
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 md:gap-10 relative z-10">
              <div>
                <p className="text-white/40 text-[8px] md:text-[10px] font-black uppercase tracking-widest mb-1 md:mb-2">Faturamento (1º Ciclo)</p>
                <p className="text-xl md:text-3xl font-black text-white tracking-tighter">R$ {revenue.toLocaleString()}</p>
              </div>
              
              <div>
                <p className="text-[#F4CDD4] text-[8px] md:text-[10px] font-black uppercase tracking-widest mb-1 md:mb-2">Potencial de Ganho de até</p>
                <p className="text-xl md:text-3xl font-black text-[#F4CDD4] tracking-tighter drop-shadow-[0_0_15px_rgba(244,205,212,0.3)]">R$ {profit.toLocaleString()}</p>
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
                <span className="text-[#F4CDD4] text-lg md:text-2xl font-black">R$ {investment.toLocaleString()}</span>
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
};
