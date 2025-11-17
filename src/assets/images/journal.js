document.addEventListener('DOMContentLoaded', function() {
  // Navbar scroll effect
  const navbar = document.querySelector('.navbar');
  
  function handleScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  
  // Initial check and add scroll listener
  handleScroll();
  window.addEventListener('scroll', handleScroll);

  // Mobile menu functionality
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navMenu = document.querySelector('nav ul');
  
  if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener('click', function() {
      const isActive = navMenu.classList.toggle('active');
      mobileMenuToggle.innerHTML = isActive 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
      mobileMenuToggle.setAttribute('aria-expanded', isActive);
      
      // Toggle body scroll when menu is open
      document.body.style.overflow = isActive ? 'hidden' : '';
    });
  }

  // Close mobile menu when clicking on a nav link
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', function(event) {
    if (navMenu && navMenu.classList.contains('active') && 
        !event.target.closest('nav') && 
        !event.target.closest('.mobile-menu-toggle')) {
      navMenu.classList.remove('active');
      mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
      mobileMenuToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });

  // Add dropdown toggle for mobile
  const dropdowns = document.querySelectorAll('.dropdown');
  dropdowns.forEach(dropdown => {
    const link = dropdown.querySelector('.nav-link');
    
    link.addEventListener('click', function(e) {
      if (window.innerWidth < 992) { // Only for mobile
        e.preventDefault();
        dropdown.classList.toggle('open');
        
        // Close other open dropdowns
        dropdowns.forEach(otherDropdown => {
          if (otherDropdown !== dropdown && otherDropdown.classList.contains('open')) {
            otherDropdown.classList.remove('open');
          }
        });
      }
    });
  });

  // Search functionality
  const searchBtn = document.querySelector('.search-btn');
  const searchBar = document.querySelector('.search-bar');
  
  if (searchBtn && searchBar) {
    searchBtn.addEventListener('click', function() {
      searchBar.classList.toggle('active');
      
      // Focus on input when search is activated
      if (searchBar.classList.contains('active')) {
        setTimeout(() => {
          searchBar.querySelector('input').focus();
        }, 100);
      }
    });
    
    // Close search when clicking outside
    document.addEventListener('click', function(event) {
      if (searchBar.classList.contains('active') && 
          !event.target.closest('.search-bar') && 
          !event.target.closest('.search-btn')) {
        searchBar.classList.remove('active');
      }
    });
  }
});