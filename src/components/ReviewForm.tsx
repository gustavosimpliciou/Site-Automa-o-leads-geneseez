import React, { useState, useRef, useEffect } from 'react';

const ReviewForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    review: ''
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const formRef = useRef<HTMLDivElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    setTimeout(() => {
      console.log('Review submitted:', formData);
      
      setFormData({
        name: '',
        company: '',
        review: ''
      });
      setFormStatus('success');
      
      setTimeout(() => {
        setFormStatus('idle');
      }, 3000);
    }, 1000);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (formRef.current) observer.observe(formRef.current);

    return () => {
      if (formRef.current) observer.unobserve(formRef.current);
    };
  }, []);

  return (
    <section id="review" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Compartilhe sua Experiência</h2>
        
        <div 
          className="max-w-2xl mx-auto transition-all duration-700 opacity-0 translate-y-10"
          ref={formRef}
        >
          {formStatus === 'success' ? (
            <div className="bg-gray-100 p-8 rounded-lg text-center">
              <h3 className="text-2xl font-bold mb-4">Obrigado!</h3>
              <p className="text-gray-700">Sua avaliação foi enviada com sucesso.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-gray-100 p-8 rounded-lg">
              <div className="mb-6">
                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                  Nome
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="company" className="block text-gray-700 font-medium mb-2">
                  Empresa (opcional)
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="review" className="block text-gray-700 font-medium mb-2">
                  Avaliação
                </label>
                <textarea
                  id="review"
                  name="review"
                  value={formData.review}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  required
                ></textarea>
              </div>
              
              <button
                type="submit"
                disabled={formStatus === 'submitting'}
                className={`w-full py-3 px-4 bg-black text-white rounded-md hover:bg-gray-800 transition-colors ${
                  formStatus === 'submitting' ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {formStatus === 'submitting' ? 'Enviando...' : 'Enviar Avaliação'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default ReviewForm;