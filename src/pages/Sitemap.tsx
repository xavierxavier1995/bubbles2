import { Link } from 'react-router-dom';
import { Map, Layout, FileText, ArrowRight, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';

const RouteCard = ({ to, title, description, icon: Icon, badge }: any) => (
  <Link to={to} className="group block">
    <div className="bg-white border border-[#E5E5E5] rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
      <div className="flex justify-between items-start mb-4">
        <div className="w-12 h-12 bg-brand-pink/10 rounded-xl flex items-center justify-center text-brand-dark group-hover:bg-brand-pink transition-colors">
          <Icon size={24} />
        </div>
        {badge && (
          <span className="bg-action-green text-white text-[9px] font-black px-2 py-1 rounded-full uppercase tracking-widest">
            {badge}
          </span>
        )}
      </div>
      <h3 className="text-lg font-black mb-2 group-hover:text-brand-pink transition-colors flex items-center gap-2">
        {title} <ArrowRight size={16} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
      </h3>
      <p className="text-muted text-xs leading-relaxed flex-grow">
        {description}
      </p>
      <div className="mt-6 pt-4 border-t border-[#F0F0F0] flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-muted">
        <span>Path: {to}</span>
        <ExternalLink size={12} />
      </div>
    </div>
  </Link>
);

export default function Sitemap() {
  return (
    <div className="min-h-screen bg-[#FDFDFD] py-20 px-5 md:px-10">
      <div className="max-w-6xl mx-auto">
        <header className="mb-16 text-center">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-brand-dark text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6"
          >
            <Map size={14} /> Mapa do Projeto
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black tracking-tighter mb-4"
          >
            Bubbles <span className="text-brand-pink">Sitemap</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted max-w-xl mx-auto text-sm"
          >
            Explore todas as rotas, variações de landing pages e documentação técnica do ecossistema Bubbles Pet Cosmetics.
          </motion.p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <RouteCard 
            to="/design-system-docs" 
            title="Design System" 
            description="Documentação técnica de cores, tipografia, botões, componentes e tokens CSS."
            icon={Layout}
            badge="Docs"
          />
          <RouteCard 
            to="/distribuidor-gabriel" 
            title="Distribuidor (Gabriel)" 
            description="Landing Page Ultra Dark Industrial focada em captação de distribuidores de elite."
            icon={FileText}
            badge="Premium"
          />
        </div>

        <footer className="mt-20 pt-10 border-t border-[#E5E5E5] text-center">
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted">
            © 2025 BUBBLES PET COSMETICS • DESENVOLVIMENTO EM PREVIEW MODE
          </p>
        </footer>
      </div>
    </div>
  );
}
