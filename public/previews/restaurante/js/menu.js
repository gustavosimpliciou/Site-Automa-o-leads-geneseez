// Mobile Menu Functionality

document.addEventListener('DOMContentLoaded', function() {
  initMobileMenu();
});

function initMobileMenu() {
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const body = document.body;
  
  if (!menuToggle || !mobileMenu) return;
  
  // Toggle mobile menu
  menuToggle.addEventListener('click', function() {
    toggleMobileMenu();
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', function(event) {
    const isMenuToggle = menuToggle.contains(event.target);
    const isMenuContent = mobileMenu.contains(event.target);
    
    if (!isMenuToggle && !isMenuContent && mobileMenu.classList.contains('active')) {
      toggleMobileMenu();
    }
  });
  
  // Close menu on ESC key
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && mobileMenu.classList.contains('active')) {
      toggleMobileMenu();
    }
  });
  
  // Handle menu item clicks
  const menuItems = mobileMenu.querySelectorAll('a');
  menuItems.forEach(item => {
    item.addEventListener('click', function() {
      toggleMobileMenu();
    });
  });
  
  // Toggle menu function
  function toggleMobileMenu() {
    mobileMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
    body.classList.toggle('menu-open');
    
    // Animate menu toggle spans
    const spans = menuToggle.querySelectorAll('span');
    
    if (menuToggle.classList.contains('active')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  }
  
  // Add style to prevent scrolling when menu is open
  const style = document.createElement('style');
  style.textContent = `
    body.menu-open {
      overflow: hidden;
    }
    
    .mobile-menu-toggle.active span {
      transition: all 0.3s ease;
    }
  `;
  document.head.appendChild(style);
}