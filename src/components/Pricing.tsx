import React, { useEffect, useRef } from 'react';
import { Check } from 'lucide-react';

interface PricingPlan {
  id: number;
  name: string;
  description: string;
  price: string;
  features: string[];
  popular?: boolean;
}

const PricingCard: React.FC<{ plan: PricingPlan; delay: number }> = ({ plan, delay }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('opacity-100', 'translate-y-0');
              entry.target.classList.remove('opacity-0', 'translate-y-10');
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) observer.observe(cardRef.current);

    return () => {
      if (cardRef.current) observer.unobserve(cardRef.current);
    };
  }, [delay]);

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      window.scrollTo({
        top: contactSection.offsetTop - 100,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div 
      ref={cardRef}
      className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-700 opacity-0 translate-y-10 relative ${
        plan.popular ? 'border-2 border-black' : 'border border-gray-200'
      }`}
    >
      {plan.popular && (
        <div className="absolute top-0 right-0 bg-black text-white px-4 py-1 text-sm font-medium">
          Popular
        </div>
      )}
      <div className="p-8">
        <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
        <p className="text-gray-600 mb-6">{plan.description}</p>
        <p className="text-4xl font-bold mb-6">{plan.price}</p>
        
        <ul className="mb-8 space-y-3">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check size={20} className="text-black mr-2 flex-shrink-0 mt-1" />
              <span className="text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>
        
        <button
          onClick={scrollToContact}
          className={`w-full py-3 px-4 rounded-md transition-colors ${
            plan.popular 
              ? 'bg-black text-white hover:bg-gray-800' 
              : 'bg-gray-100 text-black hover:bg-gray-200'
          }`}
        >
          Contact Us
        </button>
      </div>
    </div>
  );
};

const Pricing: React.FC = () => {
  const pricingPlans: PricingPlan[] = [
    {
      id: 1,
      name: "Basic Automation",
      description: "Perfect for small businesses starting with automation",
      price: "Custom Pricing",
      features: [
        "Up to 3 automated workflows",
        "Basic n8n integration",
        "Email support",
        "Monthly reporting"
      ]
    },
    {
      id: 2,
      name: "Pro Automation",
      description: "Ideal for growing businesses with complex needs",
      price: "Custom Pricing",
      features: [
        "Up to 10 automated workflows",
        "Advanced n8n integration",
        "Priority email & phone support",
        "Weekly reporting",
        "Custom workflow design"
      ],
      popular: true
    },
    {
      id: 3,
      name: "Enterprise Solutions",
      description: "Comprehensive automation for large organizations",
      price: "Custom Pricing",
      features: [
        "Unlimited automated workflows",
        "Complete n8n ecosystem",
        "24/7 dedicated support",
        "Real-time reporting",
        "Custom integrations",
        "Dedicated account manager"
      ]
    }
  ];

  return (
    <section id="pricing" className="py-24 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Pricing Plans</h2>
        <p className="text-gray-700 max-w-2xl mx-auto text-center mb-12">
          Choose the perfect plan for your business needs. All plans include custom setups tailored to your specific requirements.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <PricingCard 
              key={plan.id} 
              plan={plan}
              delay={index * 100}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;