document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
            document.querySelector('.nav-menu').classList.remove('active');
            document.querySelector('.hamburger').classList.remove('active');
        });
    });

    // Typing effect
    const typingElement = document.querySelector('.typing-effect');
    const text = typingElement.textContent;
    typingElement.textContent = '';
    let i = 0;
    function typeWriter() {
        if (i < text.length) {
            typingElement.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }
    setTimeout(typeWriter, 500);

    // CTA button scroll
    document.querySelector('.cta-btn').addEventListener('click', () => {
        document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
    });

    // Theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    themeToggle.addEventListener('click', function() {
        body.classList.toggle('dark');
        this.textContent = body.classList.contains('dark') ? '☀️' : '🌙';
        localStorage.setItem('theme', body.classList.contains('dark') ? 'dark' : 'light');
    });
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark');
        themeToggle.textContent = '☀️';
    }

    // Skills progress bars
    const progressBars = document.querySelectorAll('.progress');
    const skillsObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target;
                progress.style.width = progress.getAttribute('data-width');
                skillsObserver.unobserve(progress);
            }
        });
    }, { threshold: 0.5 });
    progressBars.forEach(bar => skillsObserver.observe(bar));

    // Project modal
    const projectCards = document.querySelectorAll('.project-card');
    const modal = document.getElementById('project-modal');
    const modalBody = document.getElementById('modal-body');
    const closeBtn = document.querySelector('.close');

    const projects = {
        project1: {
            title: 'E-Commerce Site',
            description: 'A fully responsive online store built with HTML, CSS, JS, and Stripe integration.',
            tech: 'HTML/CSS/JS, Stripe, LocalStorage'
        },
        project2: {
            title: 'Mobile App UI',
            description: 'UI/UX design for a fitness tracking app, prototyped in Figma and implemented in React Native.',
            tech: 'Figma, React Native, Expo'
        },
        project3: {
            title: 'Portfolio Redesign',
            description: 'This portfolio itself! A modern SPA with animations, dark mode, and responsive design.',
            tech: 'HTML/CSS/JS, Intersection Observer'
        }
    };

    projectCards.forEach(card => {
        card.addEventListener('click', function() {
            const modalId = this.getAttribute('data-modal');
            const project = projects[modalId];
            if (project) {
                modalBody.innerHTML = `
                    <h2>${project.title}</h2>
                    <p>${project.description}</p>
                    <p><strong>Technologies:</strong> ${project.tech}</p>
                `;
                modal.style.display = 'block';
            }
        });
    });

    closeBtn.addEventListener('click', () => modal.style.display = 'none');
    window.addEventListener('click', e => {
        if (e.target === modal) modal.style.display = 'none';
    });

    // Contact form
    document.getElementById('contact-form').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your message! (demo only)');
        this.reset();
    });
});
