// Animations JavaScript

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all animations
  initHeroAnimations();
  initDeliveryAnimations();
  initGroupAnimations();
});

// Hero section animations
function initHeroAnimations() {
  const heroImage = document.querySelector('#hero .hero-image');
  const heroContent = document.querySelector('#hero .hero-content');
  
  if (!heroImage || !heroContent) return;
  
  // Add hover effect to hero image
  heroImage.addEventListener('mouseenter', function() {
    this.querySelector('img').style.transform = 'scale(1.05)';
  });
  
  heroImage.addEventListener('mouseleave', function() {
    this.querySelector('img').style.transform = 'scale(1)';
  });
  
  // Animate content on page load
  setTimeout(() => {
    heroContent.classList.add('animated');
  }, 300);
  
  // Add animation class
  const style = document.createElement('style');
  style.textContent = `
    #hero .hero-content.animated h2 {
      animation: fadeInUp 0.8s ease forwards;
    }
    
    #hero .hero-content.animated p {
      animation: fadeInUp 0.8s ease 0.2s forwards;
      opacity: 0;
    }
    
    #hero .hero-content.animated .btn-primary {
      animation: fadeInUp 0.8s ease 0.4s forwards;
      opacity: 0;
    }
    
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;
  document.head.appendChild(style);
}

// Delivery section animations
function initDeliveryAnimations() {
  const foodItems = document.querySelectorAll('#delivery .food-item');
  
  if (!foodItems.length) return;
  
  // Create staggered animation for food items
  foodItems.forEach((item, index) => {
    // Add delay based on index
    item.style.transitionDelay = `${index * 0.1}s`;
    
    // Create hover effect for each item
    item.addEventListener('mouseenter', function() {
      this.querySelector('img').style.transform = 'scale(1.1)';
      this.querySelector('.food-overlay').style.opacity = '1';
      this.querySelector('.food-overlay').style.transform = 'translateY(0)';
    });
    
    item.addEventListener('mouseleave', function() {
      this.querySelector('img').style.transform = 'scale(1)';
      this.querySelector('.food-overlay').style.opacity = '0';
      this.querySelector('.food-overlay').style.transform = 'translateY(20px)';
    });
  });
}

// Group section animations
function initGroupAnimations() {
  const brands = document.querySelectorAll('#group .brand');
  
  if (!brands.length) return;
  
  // Add hover animation for brands
  brands.forEach(brand => {
    brand.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px)';
      this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.05)';
      this.style.borderColor = 'var(--secondary-color)';
    });
    
    brand.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
      this.style.boxShadow = 'none';
      this.style.borderColor = 'rgba(0, 0, 0, 0.1)';
    });
  });
  
  // Add additional decoration animations
  const decoration = document.querySelector('#group .group-decoration');
  
  if (decoration) {
    decoration.style.opacity = '0';
    decoration.style.transform = 'scaleX(0.8)';
    decoration.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    
    // Create observer for decoration
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'scaleX(1)';
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.5
    });
    
    observer.observe(decoration);
  }
}