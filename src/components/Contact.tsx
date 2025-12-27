import React, { useState, useRef, useEffect } from 'react';
import { Mail, Phone, MapPin, X } from 'lucide-react';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  instagram: string;
  subject: string;
  message: string;
}

interface ContactProps {
  isOpen: boolean;
  onClose: () => void;
}

const Contact: React.FC<ContactProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    instagram: '',
    subject: 'duvidas',
    message: ''
  });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const modalRef = useRef<HTMLDivElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus('submitting');
    
    try {
      await fetch('https://geneseez-lecapture.replit.app/api/leads', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      setSubmitStatus('success');
      
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          instagram: '',
          subject: 'duvidas',
          message: ''
        });
        setSubmitStatus('idle');
        onClose();
      }, 2000);
    } catch (error) {
      console.error('Erro ao enviar para o servidor:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 3000);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const contactInfo = {
    email: 'contato@geneseez.com',
    phone: '+55 83 99141-1822',
    address: {
      street: 'Rua da Automação, 123',
      district: 'Distrito Tecnológico',
      city: 'São Paulo, SP',
      postalCode: '04538-133'
    }
  };

  return (
    <>
      <section id="contact" className="py-24 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Entre em Contato</h2>

          {/* Contact Information */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <Mail size={32} className="mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Email</h3>
              <a href={`mailto:${contactInfo.email}`} className="text-gray-600 hover:text-black">
                {contactInfo.email}
              </a>
            </div>

            <div className="text-center">
              <Phone size={32} className="mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Telefone</h3>
              <a href={`tel:${contactInfo.phone}`} className="text-gray-600 hover:text-black">
                {contactInfo.phone}
              </a>
            </div>

            <div className="text-center">
              <MapPin size={32} className="mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Endereço</h3>
              <address className="text-gray-600 not-italic">
                {contactInfo.address.street}<br />
                {contactInfo.address.district}<br />
                {contactInfo.address.city}<br />
                {contactInfo.address.postalCode}
              </address>
            </div>
          </div>

          {/* Contact Form */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg p-8 shadow-md">
              <h3 className="text-2xl font-bold mb-6 text-center">Envie uma Mensagem</h3>

              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
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

                  <div>
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
                      Telefone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="instagram" className="block text-gray-700 font-medium mb-2">
                      Instagram
                    </label>
                    <input
                      type="text"
                      id="instagram"
                      name="instagram"
                      value={formData.instagram}
                      onChange={handleChange}
                      placeholder="@seu_usuario"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">
                      Assunto
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                      required
                    >
                      <option value="duvidas">Dúvidas</option>
                      <option value="orcamentos">Orçamentos</option>
                      <option value="parceiros">Parceiros</option>
                      <option value="outros">Outros</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                      Mensagem
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                      required
                    ></textarea>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitStatus === 'submitting'}
                  className={`mt-6 w-full py-3 px-6 rounded-md transition-colors font-medium ${
                    submitStatus === 'submitting' 
                      ? 'bg-gray-400 text-white cursor-not-allowed' 
                      : submitStatus === 'success'
                      ? 'bg-green-500 text-white'
                      : submitStatus === 'error'
                      ? 'bg-red-500 text-white'
                      : 'bg-black text-white hover:bg-gray-800'
                  }`}
                >
                  {submitStatus === 'submitting' 
                    ? 'Enviando...' 
                    : submitStatus === 'success'
                    ? '✓ Mensagem Enviada!'
                    : submitStatus === 'error'
                    ? 'Erro ao enviar. Tente novamente'
                    : 'Enviar Mensagem'
                  }
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div ref={modalRef} className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold">Entre em Contato</h3>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="modal-name" className="block text-gray-700 font-medium mb-2">
                    Nome
                  </label>
                  <input
                    type="text"
                    id="modal-name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="modal-email" className="block text-gray-700 font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="modal-email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="modal-phone" className="block text-gray-700 font-medium mb-2">
                    Telefone
                  </label>
                  <input
                    type="tel"
                    id="modal-phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="modal-instagram" className="block text-gray-700 font-medium mb-2">
                    Instagram
                  </label>
                  <input
                    type="text"
                    id="modal-instagram"
                    name="instagram"
                    value={formData.instagram}
                    onChange={handleChange}
                    placeholder="@seu_usuario"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>

                <div>
                  <label htmlFor="modal-subject" className="block text-gray-700 font-medium mb-2">
                    Assunto
                  </label>
                  <select
                    id="modal-subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    required
                  >
                    <option value="duvidas">Dúvidas</option>
                    <option value="orcamentos">Orçamentos</option>
                    <option value="parceiros">Parceiros</option>
                    <option value="outros">Outros</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="modal-message" className="block text-gray-700 font-medium mb-2">
                    Mensagem
                  </label>
                  <textarea
                    id="modal-message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    required
                  ></textarea>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitStatus === 'submitting'}
                className={`mt-6 w-full py-3 px-6 rounded-md transition-colors font-medium ${
                  submitStatus === 'submitting' 
                    ? 'bg-gray-400 text-white cursor-not-allowed' 
                    : submitStatus === 'success'
                    ? 'bg-green-500 text-white'
                    : submitStatus === 'error'
                    ? 'bg-red-500 text-white'
                    : 'bg-black text-white hover:bg-gray-800'
                }`}
              >
                {submitStatus === 'submitting' 
                  ? 'Enviando...' 
                  : submitStatus === 'success'
                  ? '✓ Mensagem Enviada!'
                  : submitStatus === 'error'
                  ? 'Erro ao enviar. Tente novamente'
                  : 'Enviar Mensagem'
                }
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Contact;