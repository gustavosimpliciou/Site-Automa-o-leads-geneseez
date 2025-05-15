// Main JavaScript file

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize header scroll effect
  initHeaderScroll();
  
  // Initialize scroll animations
  initScrollAnimations();
});

// Add scroll effect to header
function initHeaderScroll() {
  const header = document.getElementById('header');
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      header.style.padding = '15px 0';
      header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
      header.style.padding = '20px 0';
      header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    }
  });
}

// Initialize scroll animations
function initScrollAnimations() {
  // Add fade-in animation to elements when they enter the viewport
  const fadeInElements = document.querySelectorAll('.section-title, .about-content, .food-item, .brand');
  
  // Create observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2
  });
  
  // Observe each element
  fadeInElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
  });
}

// Add fade-in class for animations
document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('loaded');
});

// Helper function to add fade-in class
function addFadeInClass(element) {
  element.classList.add('fade-in');
}

// Add CSS for fade-in animation
const style = document.createElement('style');
style.textContent = `
  .fade-in {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }
  
  .loaded .hero-content {
    animation: fadeInRight 1s ease forwards;
  }
  
  @keyframes fadeInRight {
    from {
      opacity: 0;
      transform: translateX(40px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;
document.head.appendChild(style);