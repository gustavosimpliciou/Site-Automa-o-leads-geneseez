import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  image: string;
  content: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Maria Silva",
    role: "Proprietária - Restaurante Sabor & Arte",
    image: "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg",
    content: "O site com IA revolucionou meu restaurante! O atendimento automático reduziu as ligações em 70% e aumentou as reservas online.",
    rating: 5
  },
  {
    id: 2,
    name: "João Santos",
    role: "CEO - Academia FitPro",
    image: "https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg",
    content: "Incrível como a automação do WhatsApp facilitou o agendamento de aulas. Os alunos adoraram a praticidade!",
    rating: 5
  },
  {
    id: 3,
    name: "Ana Costa",
    role: "Dentista - Clínica Sorrir",
    image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
    content: "O chatbot responde as dúvidas mais comuns dos pacientes 24h por dia. Minha equipe agora foca no que realmente importa.",
    rating: 5
  },
  {
    id: 4,
    name: "Carlos Oliveira",
    role: "Diretor - Imobiliária Lar Ideal",
    image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg",
    content: "A integração com IA trouxe resultados impressionantes. Os leads aumentaram 300% no primeiro mês!",
    rating: 5
  },
  {
    id: 5,
    name: "Patricia Lima",
    role: "Proprietária - Boutique Elegance",
    image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg",
    content: "O site ficou lindo e profissional! A automação do atendimento melhorou muito nossas vendas online.",
    rating: 5
  },
  {
    id: 6,
    name: "Roberto Almeida",
    role: "Gerente - Hotel Vista Mar",
    image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
    content: "Excelente investimento! O sistema de reservas automático facilitou muito nossa operação.",
    rating: 5
  },
  {
    id: 7,
    name: "Fernanda Santos",
    role: "Proprietária - Escola de Idiomas",
    image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg",
    content: "A captação de leads automática revolucionou nossa forma de prospectar alunos. Muito satisfeita!",
    rating: 5
  },
  {
    id: 8,
    name: "Lucas Mendes",
    role: "Advogado",
    image: "https://images.pexels.com/photos/1680172/pexels-photo-1680172.jpeg",
    content: "O agendamento automático de consultas otimizou minha agenda. Recomendo fortemente!",
    rating: 5
  },
  {
    id: 9,
    name: "Mariana Costa",
    role: "Proprietária - Pet Shop",
    image: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg",
    content: "O chatbot responde dúvidas sobre nossos serviços 24h por dia. Os clientes adoraram!",
    rating: 5
  },
  {
    id: 10,
    name: "Paulo Rodrigues",
    role: "Diretor - Construtora",
    image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg",
    content: "O site ficou impecável e a automação do WhatsApp superou todas as expectativas!",
    rating: 5
  }
];

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [showThankYou, setShowThankYou] = useState(false);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 3 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 3 : prevIndex - 1
    );
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (userRating > 0 && reviewText.trim()) {
      setShowThankYou(true);
      setTimeout(() => {
        setShowThankYou(false);
        setUserRating(0);
        setReviewText('');
      }, 3000);
    }
  };

  return (
    <section className="w-full py-20 px-6 md:px-12">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
        O Que Nossos <span className="neon-text-purple">Clientes</span> Dizem
      </h2>
      
      <p className="text-center text-gray-300 text-lg mb-16 max-w-3xl mx-auto">
        Veja como nossa solução tem transformado negócios por todo o Brasil
      </p>

      <div className="max-w-6xl mx-auto relative mb-20">
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-slate-800/50 hover:bg-slate-700/50 transition-colors"
        >
          <ChevronLeft size={24} />
        </button>

        <div className="overflow-hidden px-12">
          <div 
            className="flex gap-6 transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 33.33}%)` }}
          >
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="flex-none w-full md:w-1/3 bg-slate-800/50 p-6 rounded-xl"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} className="fill-[#0cf] text-[#0cf]" />
                  ))}
                </div>
                <p className="text-gray-300">{testimonial.content}</p>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-slate-800/50 hover:bg-slate-700/50 transition-colors"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      <div className="max-w-2xl mx-auto bg-slate-800/50 p-8 rounded-xl">
        <h3 className="text-2xl font-semibold mb-6 text-center">
          Deixe sua Avaliação
        </h3>

        {showThankYou ? (
          <div className="text-center text-[#0cfa83] py-8">
            <p className="text-xl">Obrigado pelo seu feedback!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmitReview} className="space-y-6">
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  type="button"
                  className="focus:outline-none"
                  onMouseEnter={() => setHoverRating(rating)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setUserRating(rating)}
                >
                  <Star
                    size={32}
                    className={`${
                      rating <= (hoverRating || userRating)
                        ? 'fill-[#0cf] text-[#0cf]'
                        : 'text-gray-400'
                    } transition-colors`}
                  />
                </button>
              ))}
            </div>

            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Conte-nos sua experiência..."
              className="w-full bg-slate-700/50 border border-slate-600 rounded-lg p-4 text-white focus:border-[#0cf] focus:ring-1 focus:ring-[#0cf] transition-colors"
              rows={4}
            />

            <button
              type="submit"
              className={`w-full py-3 rounded-lg font-semibold ${
                userRating > 0 && reviewText.trim()
                  ? 'bg-gradient-to-r from-[#0cf] to-[#0cfa83] hover:shadow-lg hover:shadow-[#0cf]/20'
                  : 'bg-gray-600 cursor-not-allowed'
              } transition-all duration-300`}
            >
              Enviar Avaliação
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default Testimonials;