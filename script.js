// Hamburger Menu
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Modal functionality
const modal = document.getElementById('modal');
const confirmationModal = document.getElementById('confirmationModal');
const openModalBtn = document.getElementById('openModalBtn');
const closeBtn = document.querySelector('.close');
const returnHomeBtn = document.getElementById('returnHomeBtn');
const form = document.getElementById('adhesionForm');
const fileInput = document.getElementById('fichier');
const fileNameDisplay = document.getElementById('fileName');

// Open modal
openModalBtn.addEventListener('click', () => {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
});

// Close modal
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    if (e.target === confirmationModal) {
        confirmationModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// File input display
fileInput.addEventListener('change', (e) => {
    const fileName = e.target.files[0]?.name;
    if (fileName) {
        fileNameDisplay.textContent = `Fichier sélectionné : ${fileName}`;
    } else {
        fileNameDisplay.textContent = '';
    }
});

// Form submission
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = {
        nom: document.getElementById('nom').value,
        prenom: document.getElementById('prenom').value,
        age: document.getElementById('age').value,
        motivation: document.getElementById('motivation').value,
        fichier: fileInput.files[0]?.name || 'Aucun fichier'
    };
    
    console.log('Formulaire soumis:', formData);
    
    // Close form modal
    modal.style.display = 'none';
    
    // Show confirmation modal
    confirmationModal.style.display = 'block';
    
    // Reset form
    form.reset();
    fileNameDisplay.textContent = '';
});

// Return to home button
returnHomeBtn.addEventListener('click', () => {
    confirmationModal.style.display = 'none';
    document.body.style.overflow = 'auto';
    
    // Scroll to top smoothly
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(26, 26, 46, 1)';
    } else {
        navbar.style.background = 'rgba(26, 26, 46, 0.95)';
    }
});

// Add animation on scroll for cards
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.card, .team-member').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});
