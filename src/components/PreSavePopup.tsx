import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Mail, User } from 'lucide-react';
import ParticleAnimation from './ParticleAnimation';
import Countdown from './Countdown';

interface PreSavePopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const PreSavePopup: React.FC<PreSavePopupProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.scrollTo({ top: 0, behavior: 'instant' });
    } else {
      document.body.style.overflow = '';
      // Reseta o formulário quando fecha o popup
      setName('');
      setEmail('');
      setLoading(false);
      setSubmitted(false);
      setError('');
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email) {
      setError('Por favor, preencha todos os campos');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Por favor, insira um email válido');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const payload = {
        name,
        email,
        timestamp: new Date().toISOString(),
        source: 'pre-save-popup'
      };

      setError('Enviando...');

      // Envio direto para o n8n usando fetch com modo 'no-cors' para máxima compatibilidade no GitHub Pages
      fetch('https://geneseez01.app.n8n.cloud/webhook/dfea7ed4-08b7-42d0-9526-3674300ca69b', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      }).catch(err => console.warn('Erro silencioso no envio:', err));

      setError('✅ Sucesso!');
      setLoading(false);
      
      setTimeout(() => {
        setName('');
        setEmail('');
        setError('');
        onClose();
      }, 2000);
    } catch (err) {
      console.error('❌ Erro ao enviar:', err);
      setError('❌ Falha na conexão. Verifique sua internet e tente novamente.');
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const popupContent = (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0,
        width: '100vw',
        height: '100vh'
      }}
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/85 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Popup com Partículas */}
      <div className="relative bg-gradient-to-br from-gray-900 via-gray-900 to-black rounded-2xl overflow-hidden w-full max-w-md shadow-2xl animate-fadeIn border border-gray-800">
        {/* Partículas de fundo */}
        <div className="absolute inset-0 overflow-hidden z-0">
          <ParticleAnimation isDark={true} containerMode={true} />
        </div>

        {/* Conteúdo */}
        <div className="relative z-10">
          {/* Botão de fechar */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>

          {/* Header */}
          <div className="px-6 pt-8 pb-6 text-center">
            <h2 className="text-white text-3xl font-bold mb-2">PRÉ-SAVE</h2>
            <p className="text-gray-300 text-sm mb-4">
              Seja o primeiro a escutar nossos novos lançamentos
            </p>
            <div className="flex justify-center">
              <Countdown isHome={false} isPopup={true} />
            </div>
          </div>

          {/* Conteúdo do Formulário */}
          {!submitted ? (
            <form onSubmit={handleSubmit} className="px-6 pb-8 space-y-4 relative z-20">
              {/* Nome Input */}
              <div className="relative">
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Nome
                </label>
                <div className="relative flex items-center">
                  <User className="absolute left-3 w-4 h-4 text-green-500 pointer-events-none" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Seu Nome"
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all"
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Email Input */}
              <div className="relative">
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Email
                </label>
                <div className="relative flex items-center">
                  <Mail className="absolute left-3 w-4 h-4 text-green-500 pointer-events-none" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu@email.com"
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all"
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Mensagem */}
              {error && (
                <div className={`rounded-lg p-3 text-sm font-medium ${
                  error.includes('Dados enviados com sucesso')
                    ? 'bg-green-500/30 border border-green-400 text-green-200'
                    : 'bg-red-500/10 border border-red-500/30 text-red-400'
                }`}>
                  {error}
                </div>
              )}

              {/* Botão Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-green-500 to-green-400 hover:from-green-400 hover:to-green-300 text-black font-bold py-3 px-6 rounded-full uppercase tracking-wider transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {loading ? 'Enviando...' : 'Fazer Pré-Save'}
              </button>

              {/* Link para fechar */}
              <button
                type="button"
                onClick={onClose}
                className="w-full text-gray-400 hover:text-gray-300 text-sm font-medium transition-colors flex flex-col items-center gap-3 py-2"
              >
                <span>Pular por enquanto</span>
                <img 
                  src="/heart-brain.png" 
                  alt="Heart and Brain" 
                  className="w-24 h-24 sm:w-28 sm:h-28 md:w-20 md:h-20 animate-pulse object-contain"
                />
              </button>
            </form>
          ) : (
            <div className="px-6 pb-8 text-center py-8">
              <div className="mb-4 flex justify-center">
                <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center animate-pulse">
                  <svg className="w-8 h-8 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <h3 className="text-white text-xl font-bold mb-2">Obrigado!</h3>
              <p className="text-gray-400 text-sm">
                Você será notificado sobre os novos lançamentos
              </p>
            </div>
          )}

          {/* Info */}
          <div className="px-6 pb-4 text-center border-t border-gray-800/50">
            <p className="text-gray-500 text-xs mt-4">
              Nós respeitamos sua privacidade. Sem spam.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(popupContent, document.body);
};

export default PreSavePopup;
