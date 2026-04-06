import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, ArrowRight, ChevronLeft, Instagram, Mail, Phone, Briefcase, BarChart2, Users, CheckCircle, Package } from 'lucide-react';

interface B2BPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function B2BPopup({ isOpen, onClose }: B2BPopupProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    company: '',
    cnpj: '',
    city: '',
    state: '',
    timeInMarket: '',
    hasCapital: null as boolean | null,
    isDistributor: '',
    worksWithPet: '',
    vendedores: '',
    investmentRange: '',
  });

  const totalSteps = 5;
  const progress = (step / totalSteps) * 100;

  const handleNext = () => {
    if (step === 3 && formData.hasCapital === false) {
      // End flow for no capital
      return;
    }
    setStep(Math.min(totalSteps, step + 1));
  };

  const handleBack = () => setStep(Math.max(1, step - 1));

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-brand-dark/65 backdrop-blur-sm"
      />
      
      <motion.div 
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        className="relative bg-white w-full max-w-[520px] rounded-[20px] shadow-[0_24px_80px_rgba(0,0,0,0.30)] overflow-hidden"
      >
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 w-full h-1 bg-[#E5E5E5]">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-action-green transition-all"
          />
        </div>

        {/* Header */}
        <div className="p-10 pb-0 flex justify-between items-start">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-muted block mb-1">Etapa {step} de {totalSteps}</span>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-[#F7F7F7] rounded-full transition-colors text-muted hover:text-brand-dark">
            <X size={20} />
          </button>
        </div>

        <div className="p-10 pt-6">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div 
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="text-2xl font-black mb-2">Vamos começar! 👋</h2>
                <p className="text-muted text-sm mb-8">Conte um pouco sobre você</p>
                <div className="space-y-4">
                  <input 
                    type="text" 
                    className="input-bubbles" 
                    placeholder="Nome completo" 
                    value={formData.name}
                    onChange={(e) => updateField('name', e.target.value)}
                  />
                  <input 
                    type="email" 
                    className="input-bubbles" 
                    placeholder="E-mail profissional" 
                    value={formData.email}
                    onChange={(e) => updateField('email', e.target.value)}
                  />
                  <input 
                    type="text" 
                    className="input-bubbles" 
                    placeholder="WhatsApp com DDD" 
                    value={formData.whatsapp}
                    onChange={(e) => updateField('whatsapp', e.target.value)}
                  />
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div 
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="text-2xl font-black mb-2">Agora sobre sua empresa</h2>
                <p className="text-muted text-sm mb-8">Informações do seu negócio</p>
                <div className="space-y-4">
                  <input 
                    type="text" 
                    className="input-bubbles" 
                    placeholder="Nome da empresa/distribuidora" 
                    value={formData.company}
                    onChange={(e) => updateField('company', e.target.value)}
                  />
                  <input 
                    type="text" 
                    className="input-bubbles" 
                    placeholder="CNPJ" 
                    value={formData.cnpj}
                    onChange={(e) => updateField('cnpj', e.target.value)}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input 
                      type="text" 
                      className="input-bubbles" 
                      placeholder="Cidade" 
                      value={formData.city}
                      onChange={(e) => updateField('city', e.target.value)}
                    />
                    <input 
                      type="text" 
                      className="input-bubbles" 
                      placeholder="Estado" 
                      value={formData.state}
                      onChange={(e) => updateField('state', e.target.value)}
                    />
                  </div>
                  <select 
                    className="input-bubbles appearance-none"
                    value={formData.timeInMarket}
                    onChange={(e) => updateField('timeInMarket', e.target.value)}
                  >
                    <option value="">Tempo no mercado</option>
                    <option value="<1">Menos de 1 ano</option>
                    <option value="1-3">1–3 anos</option>
                    <option value="3-5">3–5 anos</option>
                    <option value=">5">Mais de 5 anos</option>
                  </select>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div 
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="text-2xl font-black mb-2">Uma pergunta importante 💰</h2>
                <p className="text-muted text-sm mb-8">Precisamos garantir que podemos ser parceiros de verdade</p>
                <div className="space-y-4">
                  <p className="text-[13px] font-semibold">Você possui capital disponível para o investimento inicial de R$15.000 em produtos Bubbles?</p>
                  <div className="grid grid-cols-1 gap-3">
                    <button 
                      onClick={() => updateField('hasCapital', true)}
                      className={`flex items-center gap-4 p-4 border-2 rounded-xl text-left transition-all ${formData.hasCapital === true ? 'border-action-green bg-action-green/5' : 'border-[#E5E5E5] hover:border-brand-pink'}`}
                    >
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${formData.hasCapital === true ? 'border-action-green bg-action-green text-white' : 'border-[#E5E5E5]'}`}>
                        {formData.hasCapital === true && <Check size={14} />}
                      </div>
                      <span className="text-[13px] font-bold">Sim, tenho capital disponível</span>
                    </button>
                    <button 
                      onClick={() => updateField('hasCapital', false)}
                      className={`flex items-center gap-4 p-4 border-2 rounded-xl text-left transition-all ${formData.hasCapital === false ? 'border-promo-red bg-promo-red/5' : 'border-[#E5E5E5] hover:border-brand-pink'}`}
                    >
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${formData.hasCapital === false ? 'border-promo-red bg-promo-red text-white' : 'border-[#E5E5E5]'}`}>
                        {formData.hasCapital === false && <X size={14} />}
                      </div>
                      <span className="text-[13px] font-bold">Não tenho no momento</span>
                    </button>
                  </div>
                  
                  {formData.hasCapital === false && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-6 p-6 bg-[#F7F7F7] rounded-xl"
                    >
                      <h3 className="font-black mb-2">Sem problema! 🙏</h3>
                      <p className="text-xs text-muted mb-4">Quando você estiver pronto, estaremos aqui. Cadastramos seu contato e você receberá nosso material sobre como se preparar para a parceria.</p>
                      <button onClick={onClose} className="btn-primary-green w-full">Receber material gratuito</button>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div 
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="text-2xl font-black mb-2">Quase lá! Seu perfil</h2>
                <p className="text-muted text-sm mb-8">Perfil operacional e investimento</p>
                <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-widest text-muted mb-3">Já é distribuidor?</p>
                    <div className="flex flex-col gap-2">
                      {['Sim', 'Não, serei meu primeiro produto'].map(opt => (
                        <button 
                          key={opt}
                          onClick={() => updateField('isDistributor', opt)}
                          className={`text-left px-4 py-3 border-1.5 rounded-lg text-[13px] font-semibold transition-all ${formData.isDistributor === opt ? 'border-brand-pink bg-brand-pink/5' : 'border-[#E5E5E5] hover:border-brand-pink'}`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-widest text-muted mb-3">Investimento pretendido</p>
                    <div className="flex flex-col gap-2">
                      {['R$15.000 (Pedido mínimo)', 'R$25.000 (Condições especiais)', 'R$40.000+ (Condições premium)'].map(opt => (
                        <button 
                          key={opt}
                          onClick={() => updateField('investmentRange', opt)}
                          className={`text-left px-4 py-3 border-1.5 rounded-lg text-[13px] font-semibold transition-all ${formData.investmentRange === opt ? 'border-brand-pink bg-brand-pink/5' : 'border-[#E5E5E5] hover:border-brand-pink'}`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 5 && (
              <motion.div 
                key="step5"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-action-green/10 text-action-green rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={32} />
                  </div>
                  <h2 className="text-2xl font-black mb-2">🎉 Cadastro enviado!</h2>
                  <p className="text-muted text-sm">Parabéns, você deu o primeiro passo!</p>
                </div>
                
                <div className="space-y-6 mb-10">
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-6 h-6 bg-action-green text-white rounded-full flex items-center justify-center"><Check size={14} /></div>
                      <div className="w-0.5 h-full bg-[#E5E5E5] my-1" />
                    </div>
                    <div>
                      <p className="text-[13px] font-bold">Dados recebidos</p>
                      <p className="text-[11px] text-muted">Agora mesmo</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-6 h-6 border-2 border-[#E5E5E5] rounded-full flex items-center justify-center text-muted"><Phone size={12} /></div>
                      <div className="w-0.5 h-full bg-[#E5E5E5] my-1" />
                    </div>
                    <div>
                      <p className="text-[13px] font-bold">Contato comercial</p>
                      <p className="text-[11px] text-muted">Em até 24h úteis</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-6 h-6 border-2 border-[#E5E5E5] rounded-full flex items-center justify-center text-muted"><Package size={12} /></div>
                    </div>
                    <div>
                      <p className="text-[13px] font-bold">Envio do press kit</p>
                      <p className="text-[11px] text-muted">Após conversa inicial</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <button className="btn-outline-dark w-full flex items-center justify-center gap-2">
                    <Instagram size={16} /> SEGUIR NO INSTAGRAM
                  </button>
                  <button onClick={onClose} className="text-[11px] font-bold uppercase tracking-widest text-muted hover:text-brand-dark transition-colors">FECHAR</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {step < 5 && (
            <div className="mt-10 flex items-center justify-between">
              {step > 1 ? (
                <button onClick={handleBack} className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-muted hover:text-brand-dark transition-colors">
                  <ChevronLeft size={16} /> Voltar
                </button>
              ) : <div />}
              
              <button 
                onClick={handleNext}
                disabled={step === 3 && formData.hasCapital === null}
                className={`btn-primary-green flex items-center gap-2 ${step === 3 && formData.hasCapital === null ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {step === 4 ? 'FINALIZAR' : 'CONTINUAR'} <ArrowRight size={16} />
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
