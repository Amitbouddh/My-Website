// DOM Ready Function
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

// Initialize All Website Features
function initializeWebsite() {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('fa-times');
        });
        
        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('fa-times');
            });
        });
    }
    
    // Header Scroll Effect
    window.addEventListener('scroll', () => {
        const header = document.getElementById('header');
        if (header) {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
        
        // Back to Top Button
        const backToTopBtn = document.getElementById('backToTop');
        if (backToTopBtn) {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }
    });
    
    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Scroll Progress Bar
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        const progressBar = document.getElementById('progressBar');
        if (progressBar) {
            progressBar.style.width = scrolled + '%';
        }
    });
    
    // Parallax Effects
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = document.getElementById('parallaxBg');
        if (parallax) {
            parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
    
    // Mouse Move Parallax
    document.addEventListener('mousemove', (e) => {
        const moveX = (e.clientX - window.innerWidth / 2) / 25;
        const moveY = (e.clientY - window.innerHeight / 2) / 25;
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.transform = `translateX(${moveX}px) translateY(${moveY}px)`;
        }
    });
    
    // Custom Cursor
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    if (cursor && cursorFollower && window.innerWidth > 768) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            
            setTimeout(() => {
                cursorFollower.style.left = e.clientX + 'px';
                cursorFollower.style.top = e.clientY + 'px';
            }, 100);
        });
        
        document.addEventListener('mousedown', () => {
            cursor.style.transform = 'scale(0.8)';
            cursorFollower.style.transform = 'scale(1.2)';
        });
        
        document.addEventListener('mouseup', () => {
            cursor.style.transform = 'scale(1)';
            cursorFollower.style.transform = 'scale(1)';
        });
        
        // Hover effects for cursor
        const hoverElements = document.querySelectorAll('a, button, .skill, .project-card, .contact-item');
        
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(1.5)';
                cursorFollower.style.transform = 'scale(2)';
                cursorFollower.style.borderColor = 'var(--primary)';
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
                cursorFollower.style.transform = 'scale(1)';
                cursorFollower.style.borderColor = 'var(--primary)';
            });
        });
    } else if (cursor && cursorFollower) {
        cursor.style.display = 'none';
        cursorFollower.style.display = 'none';
    }
    
    // Scroll Animations
    const timelineItems = document.querySelectorAll('.timeline-item');
    const projectCards = document.querySelectorAll('.project-card');
    
    const isElementInViewport = (el) => {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8
        );
    };
    
    const checkScroll = () => {
        timelineItems.forEach((item, index) => {
            if (isElementInViewport(item)) {
                setTimeout(() => {
                    item.classList.add('visible');
                }, index * 200);
            }
        });
        
        projectCards.forEach((card, index) => {
            if (isElementInViewport(card)) {
                setTimeout(() => {
                    card.classList.add('visible');
                }, index * 200);
            }
        });
    };
    
    window.addEventListener('scroll', checkScroll);
    window.addEventListener('load', checkScroll);
    
    // Initialize particles
    initializeParticles();
    
    // Initialize 3D model
    initialize3DModel();
    
    // Initialize forms
    initializeContactForm();
    initializeNewsletterForm();
    
    // Initialize project modal
    initializeProjectModal();
    
    // Initialize back to top button
    initializeBackToTop();
    
    // Initialize resume download
    initializeResumeDownload();
    
    // Check URL parameters for success/error messages
    checkURLParameters();
    
    // Add loaded class for animations
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
}

// Particle Background
function initializeParticles() {
    const particlesContainer = document.getElementById('particles-js');
    if (!particlesContainer) return;
    
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.zIndex = '-1';
    canvas.style.pointerEvents = 'none';
    
    particlesContainer.appendChild(canvas);
    
    const particles = [];
    const particleCount = 60;
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.color = `rgba(${Math.floor(Math.random() * 100 + 155)}, ${Math.floor(Math.random() * 100 + 155)}, 255, ${Math.random() * 0.3 + 0.1})`;
            this.wave = Math.random() * Math.PI * 2;
        }
        
        update() {
            this.wave += 0.02;
            this.x += this.speedX + Math.sin(this.wave) * 0.3;
            this.y += this.speedY + Math.cos(this.wave) * 0.3;
            
            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }
        
        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
            
            for (let j = i; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 80) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(0, 245, 255, ${0.05 * (1 - distance/80)})`;
                    ctx.lineWidth = 0.3;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        
        requestAnimationFrame(animateParticles);
    }
    
    animateParticles();
    
    // Resize canvas on window resize
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// 3D Model Interaction
function initialize3DModel() {
    const modelContainer = document.querySelector('.model-container');
    if (!modelContainer) return;
    
    let isDragging = false;
    let previousMouseX = 0;
    let previousMouseY = 0;
    let rotateX = 10;
    let rotateY = 0;
    
    modelContainer.addEventListener('mousedown', (e) => {
        isDragging = true;
        previousMouseX = e.clientX;
        previousMouseY = e.clientY;
        modelContainer.style.animationPlayState = 'paused';
    });
    
    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        
        const deltaX = e.clientX - previousMouseX;
        const deltaY = e.clientY - previousMouseY;
        
        rotateY += deltaX * 0.5;
        rotateX += deltaY * 0.5;
        
        modelContainer.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
        
        previousMouseX = e.clientX;
        previousMouseY = e.clientY;
    });
    
    document.addEventListener('mouseup', () => {
        isDragging = false;
        modelContainer.style.animationPlayState = 'running';
    });
    
    // Touch events for mobile
    modelContainer.addEventListener('touchstart', (e) => {
        isDragging = true;
        previousMouseX = e.touches[0].clientX;
        previousMouseY = e.touches[0].clientY;
        modelContainer.style.animationPlayState = 'paused';
        e.preventDefault();
    });
    
    document.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        
        const deltaX = e.touches[0].clientX - previousMouseX;
        const deltaY = e.touches[0].clientY - previousMouseY;
        
        rotateY += deltaX * 0.5;
        rotateX += deltaY * 0.5;
        
        modelContainer.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
        
        previousMouseX = e.touches[0].clientX;
        previousMouseY = e.touches[0].clientY;
        e.preventDefault();
    });
    
    document.addEventListener('touchend', () => {
        isDragging = false;
        modelContainer.style.animationPlayState = 'running';
    });
}

// Contact Form
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    // Floating label effect
    document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
        const label = input.previousElementSibling;
        
        if (label && label.tagName === 'LABEL') {
            input.addEventListener('focus', () => {
                label.classList.add('floating-label');
            });
            
            input.addEventListener('blur', () => {
                if (!input.value.trim()) {
                    label.classList.remove('floating-label');
                }
            });
            
            // Check on load if there's existing value
            if (input.value.trim()) {
                label.classList.add('floating-label');
            }
        }
    });
    
    // Form submission
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const form = this;
        const submitBtn = form.querySelector('.form-btn');
        const btnText = submitBtn.querySelector('.btn-text');
        const statusDiv = form.querySelector('.form-status');
        
        // Reset status
        statusDiv.className = 'form-status';
        statusDiv.textContent = '';
        
        // Validate form
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }
        
        // Show loading state
        submitBtn.classList.add('loading');
        btnText.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        const formData = new FormData(form);
        
        try {
            // Formspree endpoint - Replace with your actual Formspree endpoint
            const response = await fetch('https://formspree.io/f/mqezognn', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                // Success message
                statusDiv.className = 'form-status success';
                statusDiv.textContent = 'Message sent successfully! I will get back to you soon.';
                
                // Reset form
                form.reset();
                form.querySelectorAll('label').forEach(label => {
                    label.classList.remove('floating-label');
                });
                
                // Scroll to status message
                setTimeout(() => {
                    statusDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 100);
            } else {
                const errorData = await response.json();
                statusDiv.className = 'form-status error';
                statusDiv.textContent = errorData.errors?.[0]?.message || 'Sorry, there was an error sending your message.';
            }
        } catch (error) {
            console.error('Fetch error:', error);
            statusDiv.className = 'form-status error';
            statusDiv.textContent = "An unexpected error occurred. Please try again.";
        } finally {
            // Reset button state
            submitBtn.classList.remove('loading');
            btnText.textContent = 'Send Message';
            submitBtn.disabled = false;
        }
    });
}

// Newsletter Form
function initializeNewsletterForm() {
    const newsletterForm = document.getElementById('newsletterForm');
    if (!newsletterForm) return;
    
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const emailInput = this.querySelector('input[type="email"]');
        if (emailInput.value.trim()) {
            // In a real implementation, you would send this to your backend
            // For now, we'll just show a success message
            alert('Thank you for subscribing to my newsletter!');
            emailInput.value = '';
        }
    });
}

// Project Modal
function initializeProjectModal() {
    const modal = document.getElementById('projectModal');
    const modalClose = document.querySelector('.modal-close');
    const projectPreviews = document.querySelectorAll('.project-preview');
    
    if (!modal) return;
    
    // Close modal
    if (modalClose) {
        modalClose.addEventListener('click', () => {
            modal.classList.remove('active');
        });
    }
    
    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
        }
    });
    
    // Project preview click
    projectPreviews.forEach(preview => {
        preview.addEventListener('click', (e) => {
            e.preventDefault();
            const projectCard = preview.closest('.project-card');
            const projectTitle = projectCard.querySelector('h3').textContent;
            const projectDescription = projectCard.querySelector('p').textContent;
            const projectImage = projectCard.querySelector('img').src;
            const projectTags = projectCard.querySelectorAll('.project-tag');
            const projectLink = projectCard.querySelector('.project-overlay a[href^="https://"]').href;
            
            // Update modal content
            modal.querySelector('.modal-title').textContent = projectTitle;
            modal.querySelector('.modal-description').textContent = projectDescription;
            modal.querySelector('.modal-img').src = projectImage;
            modal.querySelector('.modal-img').alt = projectTitle;
            modal.querySelector('.modal-link').href = projectLink;
            
            // Update tags
            const modalTags = modal.querySelector('.modal-tags');
            modalTags.innerHTML = '';
            projectTags.forEach(tag => {
                const tagClone = tag.cloneNode(true);
                modalTags.appendChild(tagClone);
            });
            
            // Show modal
            modal.classList.add('active');
        });
    });
}

// Back to Top Button
function initializeBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    if (!backToTopBtn) return;
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Resume Download
function initializeResumeDownload() {
    const downloadBtn = document.getElementById('downloadResumeBtn');
    if (!downloadBtn) return;
    
    downloadBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // In a real implementation, this would link to your actual resume PDF
        // For now, we'll show an alert and simulate download
        alert('Resume download would start here. In production, link this to your actual resume PDF.');
        
        // Example of how to trigger download:
        // const link = document.createElement('a');
        // link.href = 'path/to/your/resume.pdf';
        // link.download = 'Amit_Bouddh_Resume.pdf';
        // document.body.appendChild(link);
        // link.click();
        // document.body.removeChild(link);
    });
}

// Check URL Parameters for Success/Error Messages
function checkURLParameters() {
    const urlParams = new URLSearchParams(window.location.search);
    const success = urlParams.get('success');
    const error = urlParams.get('error');
    const statusDiv = document.querySelector('.form-status');
    
    if (!statusDiv) return;
    
    if (success) {
        statusDiv.className = 'form-status success';
        statusDiv.textContent = 'Your message has been sent successfully!';
        setTimeout(() => {
            statusDiv.style.opacity = '0';
        }, 5000);
        
        // Clean URL
        cleanURL();
    } else if (error) {
        statusDiv.className = 'form-status error';
        statusDiv.textContent = 'Sorry, there was an error sending your message. Please try again later.';
        setTimeout(() => {
            statusDiv.style.opacity = '0';
        }, 5000);
        
        // Clean URL
        cleanURL();
    }
}

// Clean URL parameters
function cleanURL() {
    const url = new URL(window.location);
    url.searchParams.delete('success');
    url.searchParams.delete('error');
    window.history.replaceState({}, document.title, url.toString());
}

// Error handling for images
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            // Set a placeholder if image fails to load
            this.src = 'https://via.placeholder.com/400x400/0A0A0F/00F5FF?text=Image+Not+Found';
            this.alt = 'Image not available';
        });
    });
});

// Performance optimization: Lazy loading
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
});