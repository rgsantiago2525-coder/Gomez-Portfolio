
document.addEventListener('DOMContentLoaded', function() {

  const typedElement = document.getElementById('typed');
  if (typedElement) {
    const nameText = 'Ricardo Gomez';
    let i = 0;

    function typeWriter() {
      if (i < nameText.length) {
        typedElement.textContent += nameText.charAt(i);
        i++;
        setTimeout(typeWriter, 150); 
      } else {
       
        typedElement.style.borderRight = 'none';
      }
    }
    typeWriter();
  }

  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', function() {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

   
    document.querySelectorAll('.nav-link').forEach(n => {
      n.addEventListener('click', function() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }

  
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const offsetTop = targetElement.offsetTop - (document.querySelector('.navbar') ? 80 : 0); 
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });

        // Update active nav link
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        this.classList.add('active');
      }
    });
  });

  // Active Navigation Highlight on Scroll (debounced for performance)
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');
  let scrollTimeout;

  function highlightNav() {
    let current = '';
    const scrollPosition = window.scrollY + 100; // Offset for better detection

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }

 
  window.addEventListener('scroll', function() {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(highlightNav, 10); 
  });

 
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Animate progress bars when skills section is visible
        if (entry.target.id === 'skills') {
          const progresses = entry.target.querySelectorAll('.progress, .skill-progress');
          progresses.forEach(progress => {
            // Ensure inline style is set for animation
            const level = progress.dataset.level || progress.style.width;
            if (level) {
              progress.style.width = level;
            }
          });
        }
      }
    });
  }, observerOptions);

  // Observe all sections
  document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
  });

  // Dark Mode Toggle (for realism)
  const darkModeToggle = document.getElementById('darkModeToggle');
  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', function() {
      document.body.classList.toggle('dark-mode');
      const icon = this.querySelector('i');
      if (document.body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        localStorage.setItem('darkMode', 'enabled');
      } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        localStorage.setItem('darkMode', 'disabled');
      }
    });

    // Load saved theme
    if (localStorage.getItem('darkMode') === 'enabled') {
      document.body.classList.add('dark-mode');
      darkModeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
    }
  }

  // Contact Form Handling (with EmailJS integration for realism)
  const contactForm = document.getElementById('contactForm') || document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      // Get form values
      const formData = new FormData(contactForm);
      const name = formData.get('name') || document.getElementById('name')?.value.trim();
      const email = formData.get('email') || document.getElementById('email')?.value.trim();
      const subject = formData.get('subject') || document.getElementById('subject')?.value.trim();
      const message = formData.get('message') || document.getElementById('message')?.value.trim();

      // Basic validation
      if (!name || !email || !message) {
        alert('Please fill in all required fields.');
        return;
      }

      if (!isValidEmail(email)) {
        alert('Please enter a valid email address.');
        return;
      }

      // EmailJS Integration (replace with your actual keys)
      // emailjs.init('YOUR_PUBLIC_KEY'); // Initialize outside if needed
      // emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
      //   from_name: name,
      //   from_email: email,
      //   subject: subject || 'Portfolio Contact',
      //   message: message
      // }).then(() => {
      //   alert('Thank you! Your message has been sent. I\'ll get back to you soon.');
      //   contactForm.reset();
      // }, (error) => {
      //   console.error('EmailJS error:', error);
      //   alert('Sorry, there was an error sending your message. Please try again or email me directly.');
      // });

      // Demo fallback (uncomment EmailJS above for real sending)
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      setTimeout(() => {
        alert('Thank you! Your message has been sent. (Demo mode - integrate EmailJS for real emails.)');
        contactForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 1500);
    });

    function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
  }

  // Initial checks
  highlightNav();
  console.log('Portfolio script loaded successfully! 🌟'); // For debugging
});

// Polyfill for older browsers if needed (optional)
if (!window.IntersectionObserver) {
  console.warn('IntersectionObserver not supported. Fade-ins may not work.');
}
