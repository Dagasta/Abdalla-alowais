/**
 * B&M Brand & More - Interactivity & Logic Script
 * Supports bilingual (English/Arabic) requirements
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initHeaderScroll();
  initContactForm();
  initWhatsAppWidget();
  initIntersectionObserver();
});

/**
 * Mobile Navigation Menu Toggles
 */
function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (hamburger && navMenu) {
    // Toggle active classes
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
      
      // Animate hamburger bars
      const bars = hamburger.querySelectorAll('span');
      if (hamburger.classList.contains('active')) {
        bars[0].style.transform = 'translateY(9px) rotate(45deg)';
        bars[1].style.opacity = '0';
        bars[2].style.transform = 'translateY(-9px) rotate(-45deg)';
      } else {
        bars[0].style.transform = 'none';
        bars[1].style.opacity = '1';
        bars[2].style.transform = 'none';
      }
    });

    // Close menu when clicking navigation links
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        
        const bars = hamburger.querySelectorAll('span');
        bars[0].style.transform = 'none';
        bars[1].style.opacity = '1';
        bars[2].style.transform = 'none';
      });
    });
  }
}

/**
 * Header Scrolled Effect
 */
function initHeaderScroll() {
  const header = document.querySelector('header');
  if (header) {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };
    
    // Check on load
    handleScroll();
    window.addEventListener('scroll', handleScroll);
  }
}

/**
 * Contact Form Validation & Mock Submission
 */
function initContactForm() {
  const form = document.getElementById('bmContactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Basic input gathering
      const name = document.getElementById('formName').value.trim();
      const email = document.getElementById('formEmail').value.trim();
      const phone = document.getElementById('formPhone').value.trim();
      const service = document.getElementById('formService').value;
      const message = document.getElementById('formMessage').value.trim();
      
      // Identify current language from page structure
      const isArabic = document.documentElement.lang === 'ar';
      
      if (!name || !phone || !message) {
        alert(isArabic ? 'يرجى ملء جميع الحقول المطلوبة (الاسم، الهاتف، الرسالة).' : 'Please fill in all required fields (Name, Phone, Message).');
        return;
      }
      
      // Mock Submission Process
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      
      submitBtn.disabled = true;
      submitBtn.innerHTML = isArabic ? 'جاري الإرسال...' : 'Sending...';
      
      // Simulate API call
      setTimeout(() => {
        // Success Feedback
        const successMessage = document.createElement('div');
        successMessage.style.padding = '15px';
        successMessage.style.marginTop = '20px';
        successMessage.style.borderRadius = '4px';
        successMessage.style.backgroundColor = '#DCFCE7';
        successMessage.style.color = '#15803D';
        successMessage.style.border = '1px solid #BBF7D0';
        successMessage.style.fontSize = '14px';
        successMessage.style.fontWeight = '600';
        successMessage.style.textAlign = 'center';
        
        successMessage.innerHTML = isArabic 
          ? 'شكرًا لك! تم إرسال رسالتك بنجاح. سنقوم بالاتصال بك قريبًا.' 
          : 'Thank you! Your message has been sent successfully. We will get back to you shortly.';
          
        form.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        
        // Append message and remove after 6 seconds
        form.appendChild(successMessage);
        setTimeout(() => successMessage.remove(), 6000);
      }, 1500);
    });
  }
}

/**
 * WhatsApp Widget Redirections
 */
function initWhatsAppWidget() {
  const waButtons = document.querySelectorAll('.whatsapp-btn, .whatsapp-float');
  const defaultNumber = '971566955355'; // Priority mobile number
  
  waButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      
      const isArabic = document.documentElement.lang === 'ar';
      const customText = isArabic 
        ? 'مرحباً، أود الاستفسار عن خدمات براند آند مور لتخليص المعاملات.' 
        : 'Hello, I would like to inquire about B&M Brand & More transaction services.';
        
      const waUrl = `https://wa.me/${defaultNumber}?text=${encodeURIComponent(customText)}`;
      window.open(waUrl, '_blank');
    });
  });
}

/**
 * Scroll Animate Elements
 */
function initIntersectionObserver() {
  const elements = document.querySelectorAll('.service-card, .vip-card-fancy, .testimonial-card, .about-image-wrapper, .about-badge-years');
  
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });
    
    elements.forEach(el => {
      // Set initial styles
      el.style.opacity = '0';
      el.style.transform = 'translateY(25px)';
      el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
      observer.observe(el);
    });
  }
}

/**
 * Google Analytics & Search Console Placeholder Triggers
 * For future verification integration
 */
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
// gtag('js', new Date());
// gtag('config', 'G-XXXXXXXXXX');
