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
              Limited spots per region. <span className="text-[#F4CDD4]">Secure your territory.</span>
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
              <span className="relative z-10">I want to be a distributor</span>
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
    "Superior Profit Margins", "360º Marketing Support", "Agile Logistics", 
    "Technical Training", "Vegan Products", 
    "High Dilution 1:10", "Exclusive Fragrances", "Free POS Material",
    "Easy-to-sell Products", "Groomers' Favorite Brand", "High Recurrence Products",
    "High Sell-out Support", "Excellent Rebuy Rate", "Cruelty-free Certified"
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
    { name: "PRO Line", desc: "Maximum performance for professionals", imgDesktop: "https://bubbles.gabrielxavier.online/bubbles-linha-pro-desktop.webp", imgMobile: "https://bubbles.gabrielxavier.online/bubbles-linha-pro-mobile.webp" },
    { name: "Essential", desc: "The best cost-benefit in the market", imgDesktop: "https://bubbles.gabrielxavier.online/bubbles-linha-essential-desktop.webp", imgMobile: "https://bubbles.gabrielxavier.online/bubbles-linha-essential-mobile.webp" },
    { name: "Xperience", desc: "Premium sensory and unique fragrances", imgDesktop: "https://bubbles.gabrielxavier.online/bubbles-linha-xperience-desktop.webp", imgMobile: "https://bubbles.gabrielxavier.online/bubbles-linha-xperience-mobile.webp" },
    { name: "Collora", desc: "Color treatment and intense shine", imgDesktop: "https://bubbles.gabrielxavier.online/bubbles-kit-collora-desktop.webp", imgMobile: "https://bubbles.gabrielxavier.online/bubbles-kit-collora-mobile.webp" }
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
                Market Highlight
              </div>
              <h3 className="text-xl font-black text-white mb-2 drop-shadow-lg">{lines[index].name}</h3>
              <p className="text-white/90 font-bold text-[10px] uppercase tracking-widest drop-shadow-md">{lines[index].desc}</p>
            </motion.div>
          </div>
          
          <div className="absolute top-20 left-10 max-w-[200px] z-20 hidden md:block">
            <motion.div
              key={`overlay-${index}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-4 bg-black/40 backdrop-blur-md border-l-2 border-[#F4CDD4] rounded-r-xl"
            >
              <p className="text-[10px] text-white/80 leading-relaxed italic">
                {index === 0 && "The favorite line of the largest grooming centers."}
                {index === 1 && "Industrial volume with the quality your customer demands."}
                {index === 2 && "Fragrances that last for days and build loyalty."}
                {index === 3 && "Safe pigmentation technology and 3D shine."}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>
      
      <div className="absolute top-10 right-10 flex gap-2 z-30">
        {lines.map((_, i) => (
          <div 
            key={i} 
            className={`h-1 rounded-full transition-all duration-500 ${i === index ? 'w-8 bg-[#F4CDD4]' : 'w-2 bg-white/20'}`} 
          />
        ))}
      </div>

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
          <h2 className="text-2xl font-black text-white mb-4 tracking-tight">Wait! Don't miss this opportunity.</h2>
          <p className="text-white/60 mb-8 text-xs">
            The pet market is in full expansion. <span className="text-[#F4CDD4] font-bold">Become a Bubbles distributor</span> and secure exclusivity in your region before another entrepreneur does.
          </p>
          
          <div className="space-y-4">
            <button 
              onClick={() => {
                onOpenForm();
                onClose();
              }}
              className="w-full bg-[#F4CDD4] text-[#080808] py-4 rounded-xl font-black uppercase tracking-widest hover:bg-white transition-colors"
            >
              I want to apply now
            </button>
            <button 
              onClick={onClose}
              className="w-full bg-transparent text-white/40 py-2 text-xs font-bold hover:text-white transition-colors"
            >
              I'd rather ignore this opportunity
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
    full_url: ''
  });

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

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData, whatsapp: maskPhone(e.target.value)});
  };

  const finishForm = async () => {
    localStorage.setItem('formSubmitted', 'true');
    setIsSubmitting(true);
    
    try {
      const payload = {
        nome: formData.name,
        email: formData.email,
        telefone: unmask(formData.whatsapp),
        possui_cnpj: formData.hasCnpj === 'yes' ? 'Sim' : 'Não',
        utiliza_erp: formData.hasErp === 'yes' ? 'Sim' : 'Não',
        cnpj: formData.cnpj,
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
        language: 'en'
      };

      await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      // Google Tag Manager Event
      if (typeof window !== 'undefined' && (window as any).dataLayer) {
        (window as any).dataLayer.push({
          event: 'lead_form_submitted',
          form_type: 'distribuidor',
          language: 'en'
        });
      }

    } catch (error) {
      console.error("[FRONTEND] Error sending lead:", error);
    } finally {
      setIsSubmitting(false);
    }

    if (isQualified) {
      const message = `Hello! I applied as a Bubbles distributor (EN).
      
*Name:* ${formData.name}
*Email:* ${formData.email}
*WhatsApp:* ${formData.whatsapp}
*City:* ${formData.city}
*Target Cities:* ${formData.targetCities}`;
      window.open(`https://wa.me/5514997018754?text=${encodeURIComponent(message)}`, '_blank');
    }
    onClose();
    setStep(1);
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
            <h3 className="text-xl font-black text-white tracking-tight">Distributor Application</h3>
            <p className="text-white/40 text-[10px] uppercase tracking-widest mt-1 font-bold">Step {step} of 5</p>
          </div>
          <button onClick={onClose} className="text-white/40 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="h-1 bg-white/5 w-full">
          <motion.div 
            className="h-full bg-[#F4CDD4] shadow-[0_0_10px_rgba(244,205,212,0.5)]"
            initial={{ width: '0%' }}
            animate={{ width: `${(step / 5) * 100}%` }}
          />
        </div>

        <div className="p-8 md:p-12">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div 
                key="step1"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                className="space-y-6"
              >
                <h4 className="text-xl font-black text-white mb-8 tracking-tight">Contact Information</h4>
                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-2 block">Full Name</label>
                    <input 
                      type="text" 
                      placeholder="Ex: Gabriel Silva"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:border-[#F4CDD4] outline-none transition-colors"
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-2 block">Corporate Email</label>
                      <input 
                        type="email" 
                        placeholder="your@email.com"
                        className={`w-full bg-white/5 border ${formData.email && !isEmailValid(formData.email) ? 'border-red-500' : 'border-white/10'} rounded-xl px-6 py-4 text-white focus:border-[#F4CDD4] outline-none transition-colors`}
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-2 block">WhatsApp Number</label>
                      <input 
                        type="tel" 
                        placeholder="+00 (00) 00000-0000"
                        className={`w-full bg-white/5 border ${formData.whatsapp && !isPhoneValid(formData.whatsapp) ? 'border-red-500' : 'border-white/10'} rounded-xl px-6 py-4 text-white focus:border-[#F4CDD4] outline-none transition-colors`}
                        value={formData.whatsapp}
                        onChange={handlePhoneChange}
                      />
                    </div>
                  </div>
                </div>
                <button 
                  onClick={handleNext}
                  disabled={!formData.name || !isEmailValid(formData.email) || !isPhoneValid(formData.whatsapp)}
                  className="w-full bg-[#F4CDD4] text-[#080808] py-5 rounded-2xl font-black uppercase tracking-widest hover:scale-[1.02] transition-transform disabled:opacity-50 disabled:hover:scale-100 shadow-[0_0_20px_rgba(244,205,212,0.2)] flex items-center justify-center gap-2 group"
                >
                  Next Step <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
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
                <h4 className="text-xl font-black text-white mb-8 tracking-tight">Operational Profile</h4>
                
                <div className="space-y-8">
                  <div>
                    <p className="text-white font-bold mb-4 text-sm">Do you have an active business ID / Tax ID?</p>
                    <div className="grid grid-cols-2 gap-4">
                      {['yes', 'no'].map(opt => (
                        <button 
                          key={opt}
                          onClick={() => setFormData({...formData, hasCnpj: opt})}
                          className={`py-4 rounded-xl border font-bold uppercase tracking-widest text-xs transition-all ${formData.hasCnpj === opt ? 'bg-[#F4CDD4] text-[#080808] border-[#F4CDD4]' : 'bg-white/5 text-white border-white/10 hover:border-white/30'}`}
                        >
                          {opt === 'yes' ? 'Yes' : 'No'}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-white font-bold mb-4 text-sm">Do you use a Management System (ERP)?</p>
                    <div className="grid grid-cols-2 gap-4">
                      {['yes', 'no'].map(opt => (
                        <button 
                          key={opt}
                          onClick={() => setFormData({...formData, hasErp: opt})}
                          className={`py-4 rounded-xl border font-bold uppercase tracking-widest text-xs transition-all ${formData.hasErp === opt ? 'bg-[#F4CDD4] text-[#080808] border-[#F4CDD4]' : 'bg-white/5 text-white border-white/10 hover:border-white/30'}`}
                        >
                          {opt === 'yes' ? 'Yes' : 'No'}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button onClick={handlePrev} className="flex-1 bg-white/5 text-white py-5 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-white/10 transition-colors">Back</button>
                  <button 
                    onClick={handleNext}
                    disabled={!formData.hasCnpj || !formData.hasErp}
                    className="flex-[2] bg-[#F4CDD4] text-[#080808] py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-[1.02] transition-transform disabled:opacity-50 flex items-center justify-center gap-2 group"
                  >
                    Next Step <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
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
                <h4 className="text-xl font-black text-white mb-8 tracking-tight">Location and Identity</h4>
                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-2 block">Business Tax ID</label>
                    <input 
                      type="text" 
                      placeholder="Tax ID Number"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:border-[#F4CDD4] outline-none transition-colors"
                      value={formData.cnpj}
                      onChange={e => setFormData({...formData, cnpj: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-2 block">In which city is your main facility?</label>
                    <input 
                      type="text" 
                      placeholder="Ex: Miami, FL"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:border-[#F4CDD4] outline-none transition-colors"
                      value={formData.city}
                      onChange={e => setFormData({...formData, city: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-2 block">Which regions do you plan to cover?</label>
                    <input 
                      type="text" 
                      placeholder="Ex: Orlando, Tampa"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:border-[#F4CDD4] outline-none transition-colors"
                      value={formData.targetCities}
                      onChange={e => setFormData({...formData, targetCities: e.target.value})}
                    />
                  </div>
                </div>
                <div className="flex gap-4">
                  <button onClick={handlePrev} className="flex-1 bg-white/5 text-white py-5 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-white/10 transition-colors">Back</button>
                  <button 
                    onClick={handleNext}
                    disabled={!formData.cnpj || !formData.city || !formData.targetCities}
                    className="flex-[2] bg-[#F4CDD4] text-[#080808] py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-[1.02] transition-transform disabled:opacity-50 flex items-center justify-center gap-2 group"
                  >
                    Next Step <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
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
                <h4 className="text-xl font-black text-white mb-8 tracking-tight">Business Model</h4>
                <div className="space-y-6">
                  <div>
                    <label className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-4 block">How do you operate today?</label>
                    <div className="grid grid-cols-1 gap-2">
                      {[
                        { id: 'fisico', label: 'Physical Distribution' },
                        { id: 'ecommerce', label: 'E-commerce' },
                        { id: 'ambos', label: 'Both (Physical and E-commerce)' }
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
                    <label className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-2 block">Do you already work with any pet cosmetic brand? (Optional)</label>
                    <input 
                      type="text" 
                      placeholder="Ex: Brand X, Brand Y or None"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:border-[#F4CDD4] outline-none transition-colors"
                      value={formData.previousBrands}
                      onChange={e => setFormData({...formData, previousBrands: e.target.value})}
                    />
                  </div>
                </div>
                <div className="flex gap-4">
                  <button onClick={handlePrev} className="flex-1 bg-white/5 text-white py-5 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-white/10 transition-colors">Back</button>
                  <button 
                    onClick={handleNext}
                    className="flex-[2] bg-[#F4CDD4] text-[#080808] py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-[1.02] transition-transform flex items-center justify-center gap-2 group"
                  >
                    Next Step <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
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
                <h4 className="text-xl font-black text-white mb-8 tracking-tight">Investment Criteria</h4>
                
                <div>
                  <p className="text-white font-bold mb-6 leading-relaxed text-sm">
                    To be an <span className="bg-[#F4CDD4] text-[#080808] px-1">Authorized partner</span> in the Bubbles® <span className="bg-[#F4CDD4] text-[#080808] px-1">ecosystem</span>, the initial inventory investment is approx. <span className="text-[#F4CDD4]">$2,000.00</span>. 
                    Do you have this capital available for immediate start?
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    {['yes', 'no'].map(opt => (
                      <button 
                        key={opt}
                        onClick={() => setFormData({...formData, hasInvestment: opt})}
                        className={`py-4 rounded-xl border font-bold uppercase tracking-widest text-xs transition-all ${formData.hasInvestment === opt ? 'bg-[#F4CDD4] text-[#080808] border-[#F4CDD4]' : 'bg-white/5 text-white border-white/10 hover:border-white/30'}`}
                      >
                        {opt === 'yes' ? 'Yes' : 'No'}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4">
                  <button onClick={handlePrev} disabled={isSubmitting} className="flex-1 bg-white/5 text-white py-5 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-white/10 transition-colors disabled:opacity-50">Back</button>
                  <button 
                    onClick={finishForm}
                    disabled={!formData.hasInvestment || isSubmitting}
                    className="flex-[2] bg-[#F4CDD4] text-[#080808] py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-[1.02] transition-transform disabled:opacity-50 shadow-[0_0_20px_rgba(244,205,212,0.2)] flex items-center justify-center gap-2 group relative"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-[#080808]/30 border-t-[#080808] rounded-full animate-spin" />
                    ) : (
                      <>
                        {formData.hasInvestment === 'yes' ? 'Finish Application' : 'Close'} <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

const ROICalculator = () => {
  const [investment, setInvestment] = useState(2000);
  const paybackMonths = "2-3";

  const revenue = Math.round(investment / 0.55); 
  const profit = revenue - investment;

  return (
    <section id="calculator" className="py-12 md:py-16 px-6 md:px-10 bg-[#080808] relative overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8 md:mb-10">
          <span className="text-[#F4CDD4] text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] mb-2 md:mb-3 block">Business Simulator</span>
          <h2 className="text-2xl md:text-4xl font-black text-white mb-4 md:mb-6 leading-tight tracking-tight uppercase">
            The ROI <br className="block md:hidden" />
            Your Capital <br className="block md:hidden" />
            <span className="text-[#F4CDD4]">Deserves.</span>
          </h2>
        </div>
        
        <div className="grid lg:grid-cols-5 gap-4 md:gap-8 items-stretch">
          <div className="lg:col-span-3 order-1 lg:order-2 bg-gradient-to-br from-[#1A1A1A] to-[#080808] border border-[#F4CDD4]/20 p-6 md:p-12 rounded-[24px] md:rounded-[32px] shadow-2xl relative group flex flex-col justify-center overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <TrendingUp size={60} className="md:w-[100px] md:h-[100px]" />
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 md:gap-10 relative z-10">
              <div>
                <p className="text-white/40 text-[8px] md:text-[10px] font-black uppercase tracking-widest mb-1 md:mb-2">Revenue (1st Cycle)</p>
                <p className="text-xl md:text-3xl font-black text-white tracking-tighter">$ {revenue.toLocaleString()}</p>
              </div>
              
              <div>
                <p className="text-[#F4CDD4] text-[8px] md:text-[10px] font-black uppercase tracking-widest mb-1 md:mb-2">Profit Potential up to</p>
                <p className="text-xl md:text-3xl font-black text-[#F4CDD4] tracking-tighter drop-shadow-[0_0_15px_rgba(244,205,212,0.3)]">$ {profit.toLocaleString()}</p>
              </div>
            </div>
            
            <div className="mt-4 md:mt-8 pt-4 md:pt-8 border-t border-white/10">
              <p className="text-white/40 text-[8px] md:text-[10px] italic leading-relaxed">
                *Calculation based on average practice margin. Inventory turnover occurs in 45 to 60-day cycles. Data may vary by region and logistics.
              </p>
            </div>
          </div>

          <div className="lg:col-span-2 order-2 lg:order-1 bg-[#121212] border border-white/5 p-5 md:p-8 rounded-[24px] md:rounded-[32px] shadow-xl flex flex-col justify-center space-y-4 md:space-y-6">
            <div>
              <div className="flex justify-between items-center mb-3 md:mb-4">
                <span className="text-white/60 font-bold text-[9px] md:text-[10px] uppercase tracking-widest">Investment</span>
                <span className="text-[#F4CDD4] text-lg md:text-2xl font-black">$ {investment.toLocaleString()}</span>
              </div>
              <input 
                type="range" min="2000" max="20000" step="1000"
                value={investment} onChange={(e) => setInvestment(parseInt(e.target.value))}
                className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-[#F4CDD4]"
              />
              <div className="flex justify-between text-[7px] md:text-[8px] text-white/40 mt-2 md:mt-3 font-bold uppercase tracking-widest">
                <span className="text-[#F4CDD4]">Min $2k</span>
                <span>Scale</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 md:gap-4">
              <div className="bg-white/5 p-2 md:p-4 rounded-xl md:rounded-2xl border border-white/5">
                <p className="text-white/40 text-[6px] md:text-[8px] font-black uppercase tracking-widest mb-0.5 md:mb-1">Avg Margin</p>
                <p className="text-xs md:text-base font-black text-white">Up to 45%</p>
              </div>
              <div className="bg-white/5 p-2 md:p-4 rounded-xl md:rounded-2xl border border-[#F4CDD4]/20">
                <p className="text-white/40 text-[6px] md:text-[8px] font-black uppercase tracking-widest mb-0.5 md:mb-1">Payback</p>
                <p className="text-xs md:text-base font-black text-white">{paybackMonths} Months</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default function DistribuidorGabrielEN() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isExitPopupOpen, setIsExitPopupOpen] = useState(false);
  const heroButtonRef = useRef<HTMLButtonElement>(null);

  const handleOpenForm = React.useCallback(() => {
    setIsFormOpen(true);
  }, []);

  const statsCarouselRef = useRef<HTMLDivElement>(null);
  const profitabilityCarouselRef = useRef<HTMLDivElement>(null);
  const testimonialsCarouselRef = useRef<HTMLDivElement>(null);
  const productLinesCarouselRef = useRef<HTMLDivElement>(null);

  const [activeCommunityTab, setActiveCommunityTab] = useState(0);

  const communityItems = [
    {
      title: "Active Marketing",
      desc: "Access to weekly creatives, professional photos, and videos for your social networks. Full support for your sell-out. Our design and copy team creates materials ready for you to post and sell.",
      icon: Instagram
    },
    {
      title: "Technical Support",
      desc: "Direct channel with specialists to clear application and dilution doubts. Continuous training for your commercial and technical team. We understand technical knowledge is the base of high-standard sales.",
      icon: HelpCircle
    },
    {
      title: "Exclusive Tech",
      desc: "Long-lasting fragrance technology and high-performance formulas that create desire in the final tutor. Our products use human cosmetic actives adapted for animal pH.",
      icon: Award
    },
    {
      title: "Full Platform",
      desc: "Management, sales, and process training to accelerate your distribution business growth. We teach everything from hiring salespeople to inventory management.",
      icon: GraduationCap
    },
    {
      title: "High Rebuy Rate",
      desc: "Products with a loyalty rate over 90%. Sell-in is a natural consequence of a strong and recurring sell-out. Once a groomer tests Bubbles®, they become a brand ambassador.",
      icon: TrendingUp
    }
  ];

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        const lastShown = localStorage.getItem('lastExitPopupTime_EN');
        const now = Date.now();
        if (!lastShown || now - parseInt(lastShown) > 300000) {
          setIsExitPopupOpen(true);
          localStorage.setItem('lastExitPopupTime_EN', now.toString());
        }
      }
    };
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, []);

  return (
    <div className="bg-[#080808] text-white font-['Figtree',sans-serif] selection:bg-[#F4CDD4] selection:text-[#080808] overflow-x-hidden pb-40">
      
      <section className="relative min-h-screen flex flex-col overflow-hidden py-20 md:py-0">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#F4CDD4]/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#F4CDD4]/5 blur-[120px] rounded-full" />
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[radial-gradient(circle_at_center,_#F4CDD4_1px,_transparent_1px)] bg-[size:30px_30px]" />
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
                BECOME A BUBBLES DISTRIBUTOR AND DOMINE YOUR REGION WITH THE BRAND THAT <span className="text-[#F4CDD4] drop-shadow-[0_0_10px_rgba(244,205,212,0.3)]">SETS THE STANDARD</span> FOR PET COSMETICS.
              </h1>
              
              <p className="text-white/60 text-base md:text-lg mb-6 max-w-xl leading-relaxed">
                Bring innovation, premium quality, and profitability to your business through the fastest-growing brand in the sector.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 items-stretch">
                  <motion.button 
                    ref={heroButtonRef}
                    whileHover={{ scale: 1.02, boxShadow: "0 0 40px rgba(244,205,212,0.6)", y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleOpenForm}
                    className="bg-[#F4CDD4] text-[#080808] px-6 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2 group flex-1 w-full md:w-auto text-center leading-tight"
                  >
                    Become a distributor <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform hidden md:block" />
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
                    <p className="text-white font-black text-xs">+150 Partners</p>
                    <p className="text-white/40 uppercase tracking-[0.2em] font-black text-[8px]">Active Globally</p>
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

      <BenefitsMarquee />

      <section id="lines" className="py-20 px-6 md:px-10 bg-[#080808] relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <span className="text-[#F4CDD4] text-[10px] font-black uppercase tracking-[0.3em] mb-4 block">Our Mix</span>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight uppercase">
              A Line for Every <br />
              <span className="text-[#F4CDD4]">Customer Profile</span>
            </h2>
            <p className="text-white/60 text-lg max-w-3xl mx-auto leading-relaxed">
              From elite groomers to expanding pet shops, Bubbles® offers solutions that combine technical performance with unbeatable profitability.
            </p>
          </div>

          <CarouselWrapper carouselRef={productLinesCarouselRef}>
            <div className="flex gap-6 overflow-x-auto pt-6 pb-12 snap-x snap-mandatory no-scrollbar -mx-6 px-6 md:mx-0 md:px-0 md:grid md:grid-cols-2 lg:grid-cols-4" ref={productLinesCarouselRef}>
              {[
                {
                  name: "PRO",
                  target: "Advanced Groomers",
                  pos: "High performance, superior technical result.",
                  visual: "Black packaging, professional and technical tone.",
                  highlightLabel: "Dilution",
                  highlightValue: "1:10 (Yields up to 550 baths/5L).",
                  quote: "For those who accept nothing less than the best",
                  logo: "https://bubbles.gabrielxavier.online/PRO.svg",
                  accent: "#FFFFFF"
                },
                {
                  name: "Essential",
                  target: "Growing Pet Shops",
                  pos: "Premium line with accessible price. The perfect balance of cost-benefit.",
                  visual: "Pink/neutral packaging, friendly tone.",
                  highlightLabel: "Turnover",
                  highlightValue: "Immediate market acceptance.",
                  quote: "Bubbles quality with the best cost per bath",
                  logo: "https://bubbles.gabrielxavier.online/ESSENTIAL.svg",
                  accent: "#F4CDD4"
                },
                {
                  name: "Xperience",
                  target: "Sensory Experience",
                  pos: "Focused on market positioning and differentiation from competition.",
                  visual: "Explosion of experiences. Dynamic colors.",
                  highlightLabel: "Tech",
                  highlightValue: "Formulated with the latest cosmetic trends.",
                  quote: "They'll smell so good people will ask the secret",
                  logo: "https://bubbles.gabrielxavier.online/XPERIENCE.svg",
                  accent: "#C8A96E"
                },
                {
                  name: "Collora",
                  target: "Creative Grooming",
                  pos: "Safe and vibrant professional pet coloring.",
                  visual: "Rainbow concept vibrant packaging.",
                  highlightLabel: "Innovation",
                  highlightValue: "Transform coats into art with safety.",
                  quote: "Artistic expression with proven animal safety",
                  logo: "https://bubbles.gabrielxavier.online/COLLORA.svg",
                  accent: "#B066C6"
                }
              ].map((line, i) => (
                <div key={i} className="bg-[#121212] border border-white/5 border-t-4 p-8 rounded-[32px] flex flex-col h-full group transition-all duration-500 relative min-w-[280px] md:min-w-0 snap-center" style={{ borderTopColor: line.accent }}>
                   <div className="mb-4 h-40 flex items-center justify-center">
                    <img src={line.logo} className="h-full w-auto brightness-0 invert" alt={line.name} />
                  </div>
                  <h3 className="text-xl font-black text-white mb-2">Line {line.name}</h3>
                  <p className="text-white/50 text-xs mb-6">{line.pos}</p>
                </div>
              ))}
            </div>
          </CarouselWrapper>
        </div>
      </section>

      <section className="py-20 px-6 md:px-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-[#F4CDD4] text-[10px] font-black uppercase tracking-[0.3em] mb-4 block">Profitability</span>
            <h2 className="text-2xl md:text-4xl font-black text-white mb-8 uppercase">Real Margins and <span className="text-[#F4CDD4]">Scalability.</span></h2>
            <p className="text-white/60 mb-8 leading-relaxed">
              Our PRO line offers 1:10 dilution, ensuring the lowest cost per bath in the market. For the distributor, this means competitive profitability with margins up to 45% and guaranteed rebuy.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
             {[
                { title: "Exponential Gains", desc: "Price structure designed for growth." },
                { title: "High Turnover", desc: "Fast-moving inventory products." },
                { title: "Market Safety", desc: "Strict price control protecting your margin." },
                { title: "Loyalty", desc: "Professionals who use Bubbles® don't swap." }
              ].map((item, i) => (
                <div key={i} className="bg-[#121212] border border-white/5 p-6 rounded-2xl">
                  <h4 className="text-white font-black text-xs uppercase mb-2">{item.title}</h4>
                  <p className="text-white/40 text-[10px]">{item.desc}</p>
                </div>
              ))}
          </div>
        </div>
      </section>

      <ROICalculator />

      {/* Who is Bubbles Section */}
      <section id="about" className="relative py-12 px-10 overflow-hidden flex items-center min-h-[60vh]">
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
              Our Essence
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-2xl md:text-4xl font-black text-white mb-4 tracking-tighter"
            >
              Who is <span className="text-[#F4CDD4]">Bubbles®?</span>
            </motion.h2>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="max-w-2xl mx-auto text-center"
            >
              <div className="space-y-3 text-white/90 text-sm md:text-base leading-relaxed font-medium">
                <p>
                  Bubbles® was born from the desire to transform the bathing and grooming experience into something more professional, sensory, and conscious, both for the groomer and the pet.
                </p>
                <p>
                  With <span className="text-[#F4CDD4] font-black">over 7 years of history</span>, we have raised the market standard, turning every service into a memorable experience.
                </p>
              </div>
            </motion.div>
          </div>

          <CarouselWrapper carouselRef={statsCarouselRef} showOnDesktop={true}>
            <div className="flex gap-4 overflow-x-auto pb-8 snap-x snap-mandatory no-scrollbar -mx-10 px-10 lg:mx-0 lg:px-0 lg:grid lg:grid-cols-5 lg:gap-2" ref={statsCarouselRef}>
              {[
                { label: "Market Presence", val: "+7 Years", icon: Clock, desc: "Pioneering & Innovation" },
                { label: "NPS & Satisfaction", val: "4.9/5.0", icon: Star, desc: "Maximum Approval" },
                { label: "Groomer Base", val: "+5,000", icon: Users, desc: "Elite Specialists" },
                { label: "Active Clients", val: "+20,000", icon: Heart, desc: "Passionate Tutors" },
                { label: "Solution Mix", val: "+50", icon: Package, desc: "Exclusive Products" }
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

      {/* Community Section */}
      <section id="community" className="py-20 px-10 bg-[#121212]/30 relative overflow-hidden">
        <div className="max-w-7xl mx-auto text-center mb-12">
          <span className="text-[#F4CDD4] text-[10px] font-black uppercase tracking-[0.3em] mb-4 block">Elite Belonging</span>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-8 tracking-tight uppercase">Join the <span className="bg-[#F4CDD4] text-[#080808] px-2">COMMUNITY</span> Leading the <br /> Future of the Pet Market.</h2>
          <p className="text-white/60 text-lg max-w-3xl mx-auto leading-relaxed">
            Being a Bubbles® distributor means belonging to an elite <span className="bg-[#F4CDD4] text-[#080808] px-1 py-1 font-bold">ecosystem</span> that dictates industry trends. We don't just deliver products; we deliver <span className="text-white font-bold">positioning and authority</span>.
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

      {/* Logistics Support Section */}
      <section id="support" className="py-20 px-10 relative">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-center">
          <div>
            <span className="text-[#F4CDD4] text-[10px] font-black uppercase tracking-[0.3em] mb-4 block">Logistics Excellence</span>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-8 leading-tight tracking-tight uppercase">
              Full Support: <br />
              From Order to <br />
              <span className="text-[#F4CDD4]">Customer Satisfaction.</span>
            </h2>
            <p className="text-white/60 text-base mb-12 leading-relaxed">
              Our operation is designed so your only concern is <span className="text-white font-bold">sales relationship</span>. Your sell-in is a direct consequence of our support in your sell-out. With products of <span className="text-white font-bold">easy initial acceptance</span> and high rebuy rate, inventory replenishment becomes a natural and accelerated process.
            </p>
            
            <div className="space-y-8">
              <div className="flex gap-6 group">
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center shrink-0 border border-white/10 group-hover:border-[#F4CDD4]/40 transition-colors shadow-lg">
                  <Truck className="text-[#F4CDD4]" />
                </div>
                <div>
                  <h5 className="text-white font-black text-lg mb-1 tracking-tight">Fast Shipping</h5>
                  <p className="text-white/40 text-xs font-medium">Logistics agility to ensure your stock never runs out.</p>
                </div>
              </div>
              <div className="flex gap-6 group">
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center shrink-0 border border-white/10 group-hover:border-[#F4CDD4]/40 transition-colors shadow-lg">
                  <TrendingUp className="text-[#F4CDD4]" />
                </div>
                <div>
                  <h5 className="text-white font-black text-lg mb-1 tracking-tight">Proven Sell-out</h5>
                  <p className="text-white/40 text-xs font-medium">Products with high initial acceptance rate and guaranteed groomer rebuy.</p>
                </div>
              </div>
              <div className="flex gap-6 group">
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center shrink-0 border border-white/10 group-hover:border-[#F4CDD4]/40 transition-colors shadow-lg">
                  <Award className="text-[#F4CDD4]" />
                </div>
                <div>
                  <h5 className="text-white font-black text-lg mb-1 tracking-tight">Elite Certifications</h5>
                  <p className="text-white/40 text-xs font-medium">Vegan and Cruelty-Free products. Ethical differentiators that close deals.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-[#F4CDD4]/10 blur-[80px] rounded-full -z-10" />
            <div className="bg-[#121212] border border-white/10 p-4 rounded-[40px] shadow-2xl relative overflow-hidden">
              <img 
                src="https://bubbles.gabrielxavier.online/bubbles-estoque-expedicao-desktop.webp" 
                alt="Bubbles® Logistics" 
                className="rounded-[32px] w-full"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent opacity-40" />
              <div className="absolute bottom-10 left-10 right-10">
                <p className="text-white font-black text-xs uppercase tracking-widest bg-[#F4CDD4] text-[#080808] px-4 py-2 rounded-full inline-block">
                  High Performance Logistics
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-10 bg-[#080808] relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[#F4CDD4] text-[10px] font-black uppercase tracking-[0.3em] mb-4 block">Success Stories</span>
            <h2 className="text-2xl md:text-4xl font-black text-white mb-6 tracking-tight uppercase">
              Over 50 distributors across Brazil trust Bubbles. See what they say:
            </h2>
          </div>

          <CarouselWrapper carouselRef={testimonialsCarouselRef} showOnDesktop={true}>
            <div 
              ref={testimonialsCarouselRef}
              className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory no-scrollbar -mx-6 px-6 md:mx-0 md:px-0"
            >
              {[
                { name: "MANTYPET", text: "Being a Bubbles distributor has been an extremely rewarding and strategic experience, marked by constant learning and positive results since the beginning, even without prior experience in the grooming segment." },
                { name: "Assispet", text: "Bubbles quickly became one of our main suppliers, a great partner that adds work and results to our distributor, with excellent service and support from the entire team." },
                { name: "SERRAPET", text: "Being a Bubbles distributor goes far beyond selling products; it's experiencing the transformation they cause. It's about seeing the customer's look change and knowing you were part of that experience." },
                { name: "TOPET", text: "Working with Bubbles means having the security of being alongside a strong, recognized brand in constant growth in the pet market. Their consistent marketing makes the products highly desired." }
              ].map((testimonial, i) => (
                <div 
                  key={i}
                  className="bg-white/5 border border-white/10 p-8 rounded-3xl min-w-[80%] md:min-w-[40%] snap-center flex flex-col justify-between"
                >
                  <p className="text-white/60 text-xs italic mb-8 leading-relaxed">"{testimonial.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col">
                      <p className="text-white font-black text-sm">{testimonial.name}</p>
                      <span className="text-[#00FF00] text-[8px] font-bold uppercase tracking-widest flex items-center gap-1">
                         Verified Partner
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CarouselWrapper>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-10">
        <div className="max-w-7xl mx-auto bg-gradient-to-br from-[#121212] to-[#080808] border border-white/10 rounded-[60px] p-24 text-center relative overflow-hidden shadow-2xl">
          <div className="relative z-10">
            <span className="text-[#F4CDD4] text-[10px] font-black uppercase tracking-[0.4em] mb-6 block">Your Territory Awaits</span>
            <h2 className="text-2xl md:text-4xl font-black text-white mb-8 tracking-tighter">
              Ready to be the <br />
              <span className="text-[#F4CDD4]">Next Success Case?</span>
            </h2>
            <p className="text-white/60 text-lg mb-12 max-w-2xl mx-auto">
              Spots for new distributors are limited by region to ensure exclusivity and profitability for current partners.
            </p>
            
            <motion.button 
              whileHover={{ scale: 1.02, boxShadow: '0 0 40px rgba(244,205,212,0.4)', y: -1 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsFormOpen(true)}
              className="bg-[#F4CDD4] text-[#080808] px-20 py-4 rounded-2xl font-black uppercase tracking-widest text-base shadow-2xl group flex items-center justify-center gap-4 mx-auto"
            >
              Become a distributor now <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>
        </div>
      </section>

      <footer className="py-12 px-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
            <Logo />
            
            <div className="text-center md:text-right">
              <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-2">
                Bubbles® Pet Cosmetics
              </p>
              <p className="text-white/20 text-[9px] font-bold uppercase tracking-widest">
                CNPJ: 26.353.134/0001-40
              </p>
            </div>
            
            <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">
              © 2026 Bubbles®. All rights reserved.
            </p>
          </div>

          <div className="pt-12 border-t border-white/5">
            <p className="text-white/20 text-[9px] leading-relaxed max-w-4xl mx-auto text-center font-medium">
              *Bonuses for achieved goals are calculated quarterly based on purchase volume and positive feedback from new customers in the designated region. 
              Eligibility criteria include financial up-to-date status and participation in the brand's official trainings. 
              The revenue and margin values presented in the calculator are estimates based on market averages and may vary according to management and region. 
              If you have questions about calculations, margins, or specific commercial conditions for your region, please contact our support.
              Consult your account manager for details on current award tiers.
            </p>
          </div>
        </div>
      </footer>

      <MultiStepForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
      <ExitIntentPopup isOpen={isExitPopupOpen} onClose={() => setIsExitPopupOpen(false)} onOpenForm={handleOpenForm} />
      <StickyBar onOpenForm={handleOpenForm} heroButtonRef={heroButtonRef} />
    </div>
  );
}
