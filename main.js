// Main JavaScript File
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initPreloader();
    initCursor();
    initMobileMenu();
    initHeroSlider();
    initTestimonialSlider();
    initBackToTop();
    initAOS();
    initGoogleTranslate();
    initWhatsAppForm();
    initItineraryForm();
    filterTrips('all');
});

// Preloader
function initPreloader() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        window.addEventListener('load', function() {
            setTimeout(function() {
                preloader.classList.add('fade-out');
                setTimeout(function() {
                    preloader.style.display = 'none';
                }, 500);
            }, 500);
        });
    }
}

// Custom Cursor
function initCursor() {
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    if (cursor && cursorFollower) {
        document.addEventListener('mousemove', function(e) {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            
            setTimeout(function() {
                cursorFollower.style.left = e.clientX + 'px';
                cursorFollower.style.top = e.clientY + 'px';
            }, 100);
        });
        
        // Add hover effects for interactive elements
        const hoverElements = document.querySelectorAll('a, button, .destination-card, .service-card, .testimonial-card, .instagram-post, input, select, textarea');
        
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', function() {
                cursor.classList.add('cursor-hover');
                cursorFollower.classList.add('cursor-follower-hover');
            });
            
            el.addEventListener('mouseleave', function() {
                cursor.classList.remove('cursor-hover');
                cursorFollower.classList.remove('cursor-follower-hover');
            });
        });
    }
}

// Mobile Menu Toggle
function initMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileBackButton = document.querySelector('.mobile-menu-back');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });
        
        // Close menu when clicking on links
        const navLinks = mobileMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                menuToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Mobile back button functionality
        if (mobileBackButton) {
            mobileBackButton.addEventListener('click', function() {
                menuToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        }
    }
}

// Hero Slider
function initHeroSlider() {
    const slider = document.querySelector('.hero-slider');
    if (!slider) return;
    
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    
    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
    
    // Auto slide change every 5 seconds
    setInterval(nextSlide, 5000);
    
    // Initial slide
    showSlide(currentSlide);
}

// Testimonial Slider
function initTestimonialSlider() {
    const slider = document.querySelector('.testimonials-slider');
    if (!slider) return;
    
    const testimonials = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.testimonial-prev');
    const nextBtn = document.querySelector('.testimonial-next');
    let currentTestimonial = 0;
    
    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.classList.toggle('active', i === index);
        });
        
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }
    
    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }
    
    function prevTestimonial() {
        currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        showTestimonial(currentTestimonial);
    }
    
    // Dot navigation
    dots.forEach((dot, i) => {
        dot.addEventListener('click', function() {
            currentTestimonial = i;
            showTestimonial(currentTestimonial);
        });
    });
    
    // Button navigation
    if (nextBtn) nextBtn.addEventListener('click', nextTestimonial);
    if (prevBtn) prevBtn.addEventListener('click', prevTestimonial);
    
    // Auto slide change every 6 seconds
    setInterval(nextTestimonial, 6000);
    
    // Initial testimonial
    showTestimonial(currentTestimonial);
}

// Back to Top Button
function initBackToTop() {
    const backToTop = document.querySelector('.back-to-top');
    
    if (backToTop) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTop.classList.add('active');
            } else {
                backToTop.classList.remove('active');
            }
        });
        
        backToTop.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Animate On Scroll (AOS)
function initAOS() {
    // Simple implementation of AOS without the library
    const elements = document.querySelectorAll('[data-aos]');
    
    function checkScroll() {
        elements.forEach(el => {
            const elTop = el.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elTop < windowHeight - 100) {
                el.classList.add('aos-animate');
            }
        });
    }
    
    window.addEventListener('scroll', checkScroll);
    window.addEventListener('load', checkScroll);
}

// Google Translate
function initGoogleTranslate() {
    function googleTranslateElementInit() {
        if (typeof google !== 'undefined') {
            new google.translate.TranslateElement(
                { 
                    pageLanguage: 'en',
                    includedLanguages: 'en,es,fr,de,it,ru,hi',
                    layout: google.translate.TranslateElement.InlineLayout.SIMPLE
                }, 
                'languageDropdown'
            );
            
            // Hide the original Google Translate branding
            const googleBranding = document.querySelector('.goog-logo-link');
            if (googleBranding) googleBranding.style.display = 'none';
            
            const googleText = document.querySelector('.goog-te-gadget');
            if (googleText) googleText.style.color = 'transparent';
        }
    }
    
    // Retry initialization if Google Translate script loads after our function
    if (typeof google === 'undefined') {
        window.googleTranslateElementInit = googleTranslateElementInit;
    } else {
        googleTranslateElementInit();
    }
    
    // Language selector toggle for desktop and mobile
    const languageToggle = document.getElementById('languageToggle');
    const mobileLanguageToggle = document.getElementById('languageToggleMobile');
    const languageDropdown = document.getElementById('languageDropdown');
    
    if (languageToggle) {
        languageToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            languageDropdown.classList.toggle('active');
        });
    }
    
    if (mobileLanguageToggle) {
        mobileLanguageToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            languageDropdown.classList.toggle('active');
        });
    }
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function() {
        if (languageDropdown) languageDropdown.classList.remove('active');
    });
}

window.googleTranslateElementInit = function() {
    if (typeof google !== 'undefined') {
        new google.translate.TranslateElement(
            { 
                pageLanguage: 'en',
                includedLanguages: 'en,es,fr,de,it,ru,hi',
                layout: google.translate.TranslateElement.InlineLayout.SIMPLE
            }, 
            'languageDropdown'
        );
        
        // Hide the original Google Translate branding
        const googleBranding = document.querySelector('.goog-logo-link');
        if (googleBranding) googleBranding.style.display = 'none';
        
        const googleText = document.querySelector('.goog-te-gadget');
        if (googleText) googleText.style.color = 'transparent';
    }
};

// WhatsApp Form Submission
function initWhatsAppForm() {
    const whatsappForm = document.getElementById('whatsappLeadForm');
    
    if (whatsappForm) {
        whatsappForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const email = document.getElementById('email').value;
            const interest = document.getElementById('interest').value;
            const message = document.getElementById('message').value;
            
            // Format the WhatsApp message
            let whatsappMessage = `Hello Global Tourist Centre!%0A%0A`;
            whatsappMessage += `*Name:* ${name}%0A`;
            whatsappMessage += `*Phone:* ${phone}%0A`;
            if (email) whatsappMessage += `*Email:* ${email}%0A`;
            if (interest) whatsappMessage += `*Interest:* ${interest}%0A`;
            if (message) whatsappMessage += `*Message:* ${message}%0A`;
            
            // Your WhatsApp number
            const whatsappNumber = '919067972295';
            
            // Create the WhatsApp URL
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
            
            // Open the URL in a new tab
            window.open(whatsappUrl, '_blank');
            
            // Optional: Reset the form
            whatsappForm.reset();
        });
    }
}

// Itinerary Form Submission
function initItineraryForm() {
    const itineraryForm = document.getElementById('itineraryForm');
    if (itineraryForm) {
        itineraryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('itineraryName').value;
            const phone = document.getElementById('itineraryPhone').value;
            const email = document.getElementById('itineraryEmail').value;
            const package = document.getElementById('itineraryPackage').value;
            const dates = document.getElementById('itineraryDates').value;
            const details = document.getElementById('itineraryDetails').value;
            
            // Format the WhatsApp message
            let whatsappMessage = `Hello Global Tourist Centre!%0A%0AI'm interested in a personalized itinerary.%0A%0A`;
            whatsappMessage += `*Name:* ${name}%0A`;
            whatsappMessage += `*Phone:* ${phone}%0A`;
            if (email) whatsappMessage += `*Email:* ${email}%0A`;
            whatsappMessage += `*Package Interested In:* ${package}%0A`;
            if (dates) whatsappMessage += `*Preferred Travel Dates:* ${dates}%0A`;
            if (details) whatsappMessage += `*Special Requirements:* ${details}%0A`;
            
            // Your WhatsApp number
            const whatsappNumber = '919067972295';
            
            // Create the WhatsApp URL
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${(whatsappMessage)}`;
            
            // Open WhatsApp with the pre-filled message
            window.open(whatsappUrl, '_blank');
            
            // Optional: Reset the form
            itineraryForm.reset();
        });
    }
}

// Filter Trips
function filterTrips(category) {
    const packages = document.querySelectorAll('.destination-package');
    const buttons = document.querySelectorAll('.filter-buttons button');
    
    buttons.forEach(button => button.classList.remove('active'));
    document.querySelector(`.filter-buttons button[onclick*="${category}"]`).classList.add('active');
    
    packages.forEach(pkg => {
        if (category === 'all' || pkg.classList.contains(category)) {
            pkg.style.display = 'block';
            setTimeout(() => {
                pkg.style.opacity = '1';
                pkg.style.transform = 'translateY(0)';
            }, 0);
        } else {
            pkg.style.opacity = '0';
            pkg.style.transform = 'translateY(20px)';
            setTimeout(() => {
                pkg.style.display = 'none';
            }, 0);
        }
    });
}

// Gallery Carousel
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.carousel');
    if (carousel) {
        const inner = carousel.querySelector('.carousel-inner');
        const images = inner.querySelectorAll('img');
        const prevBtn = carousel.querySelector('.prev');
        const nextBtn = carousel.querySelector('.next');
        
        let currentIndex = 0;
        
        // Initialize first image as active
        images[currentIndex].classList.add('active');
        
        // Function to show image at specific index
        function showImage(index) {
            // Remove active class from all images
            images.forEach(img => img.classList.remove('active'));
            
            // Handle index boundaries
            if (index >= images.length) {
                currentIndex = 0;
            } else if (index < 0) {
                currentIndex = images.length - 1;
            } else {
                currentIndex = index;
            }
            
            // Add active class to current image
            images[currentIndex].classList.add('active');
        }
        
        // Next button click handler
        nextBtn.addEventListener('click', function() {
            showImage(currentIndex + 1);
        });
        
        // Previous button click handler
        prevBtn.addEventListener('click', function() {
            showImage(currentIndex - 1);
        });
        
        // Optional: Auto-advance the carousel every 5 seconds
        let interval = setInterval(() => {
            showImage(currentIndex + 1);
        }, 5000);
        
        // Pause auto-advance when hovering over carousel
        carousel.addEventListener('mouseenter', () => {
            clearInterval(interval);
        });
        
        // Resume auto-advance when leaving carousel
        carousel.addEventListener('mouseleave', () => {
            interval = setInterval(() => {
                showImage(currentIndex + 1);
            }, 5000);
        });
        
        // Optional: Keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowRight') {
                showImage(currentIndex + 1);
            } else if (e.key === 'ArrowLeft') {
                showImage(currentIndex - 1);
            }
        });
    }
});