document.addEventListener('DOMContentLoaded', function() {
    // ===== Enhanced Mobile Menu =====
    const mobileMenuToggle = document.createElement('button');
    mobileMenuToggle.className = 'mobile-menu-toggle';
    mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    mobileMenuToggle.setAttribute('aria-label', 'Toggle menu');
    
    const mobileMenuClose = document.createElement('button');
    mobileMenuClose.className = 'mobile-menu-close';
    mobileMenuClose.innerHTML = '<i class="fas fa-times"></i>';
    mobileMenuClose.setAttribute('aria-label', 'Close menu');
    mobileMenuClose.style.display = 'none';
    
    document.querySelector('.nav-container').appendChild(mobileMenuToggle);
    document.querySelector('.nav-container').appendChild(mobileMenuClose);
    
    const navLinks = document.querySelector('.nav-links');
    const logo = document.querySelector('.logo');
    
    // Mobile menu toggle
mobileMenuToggle.addEventListener('click', function() {
    navLinks.classList.add('active');
    mobileMenuClose.style.display = 'block';
    mobileMenuToggle.style.display = 'none';
    document.body.style.overflow = 'hidden';
});

mobileMenuClose.addEventListener('click', function() {
    navLinks.classList.remove('active');
    mobileMenuClose.style.display = 'none';
    mobileMenuToggle.style.display = 'block';
    document.body.style.overflow = '';
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuClose.style.display = 'none';
        mobileMenuToggle.style.display = 'block';
        document.body.style.overflow = '';
    });
});

    // ===== Smooth Scrolling =====
    const allNavLinks = document.querySelectorAll('.nav-links a');
    allNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(href);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
                
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    mobileMenuClose.style.display = 'none';
                    mobileMenuToggle.style.display = 'block';
                    document.body.style.overflow = '';
                }
            }
        });
    });
    
    // ===== Form Submission =====
const tripForm = document.getElementById('tripForm');
if (tripForm) {
    tripForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const startingPoint = document.getElementById('startingPoint').value;
        const destination = document.getElementById('destination').value;
        const tripDate = document.getElementById('tripDate').value;
        const numDays = document.getElementById('numDays').value;
        const numPeople = document.getElementById('numPeople').value;
        const numRooms = document.getElementById('numRooms').value;
        const roomCategory = document.getElementById('roomCategory').value;
        const mealPlan = document.getElementById('mealPlan').value;
        const budget = document.getElementById('budget').value;
        const requirements = document.getElementById('requirements').value;
        
        const formattedDate = tripDate ? new Date(tripDate).toLocaleDateString('en-IN') : 'Not specified';
        
        const message = `New Trip Inquiry:%0A%0A*Name:* ${name}%0A*Phone:* ${phone}%0A%0A*Trip Details:*%0A*Starting Point:* ${startingPoint}%0A*Destination:* ${destination}%0A*Start Date:* ${formattedDate}%0A*Duration:* ${numDays} days%0A*Travelers:* ${numPeople} people%0A*Rooms:* ${numRooms || 'Not specified'} (${roomCategory || 'Any'})%0A*Meal Plan:* ${mealPlan || 'Not specified'}%0A*Budget:* ₹${budget || 'Flexible'} per person%0A%0A*Special Requirements:*%0A${requirements || 'None'}`;
        
        window.open(`https://wa.me/919067972295?text=${message}`, '_blank');
        tripForm.reset();
    });
}

    // ===== Testimonial Carousel =====
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.testimonial-prev');
    const nextBtn = document.querySelector('.testimonial-next');
    let currentIndex = 0;
    let autoRotateInterval;

    function showTestimonial(index) {
        testimonials.forEach(testimonial => testimonial.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        testimonials[index].classList.add('active');
        dots[index].classList.add('active');
        currentIndex = index;
        resetAutoRotate();
    }

    function nextTestimonial() {
        showTestimonial((currentIndex + 1) % testimonials.length);
    }

    function prevTestimonial() {
        showTestimonial((currentIndex - 1 + testimonials.length) % testimonials.length);
    }

    function resetAutoRotate() {
        clearInterval(autoRotateInterval);
        autoRotateInterval = setInterval(nextTestimonial, 5000);
    }

    if (testimonials.length > 0) {
        showTestimonial(0);
        nextBtn.addEventListener('click', nextTestimonial);
        prevBtn.addEventListener('click', prevTestimonial);
        
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => showTestimonial(index));
        });

        resetAutoRotate();

        const testimonialsContainer = document.querySelector('.testimonials-container');
        testimonialsContainer.addEventListener('mouseenter', () => clearInterval(autoRotateInterval));
        testimonialsContainer.addEventListener('mouseleave', resetAutoRotate);
    }

    // ===== Tour Filtering =====
    const filterButtons = document.querySelectorAll('.filter-button');
    let currentFilter = 'all';

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filterType = this.dataset.filter;
            currentFilter = filterType;
            
            filterButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.classList.add('inactive');
            });
            
            this.classList.add('active');
            this.classList.remove('inactive');
            
            filterTours();
            currentPage = 1;
            updateVisibleCards();
        });
    });

    function filterTours() {
        const tourCards = document.querySelectorAll('.tour-card');
        
        tourCards.forEach(card => {
            const category = card.dataset.category;
            const shouldShow = currentFilter === 'all' || category.includes(currentFilter);
            card.style.display = shouldShow ? 'block' : 'none';
        });
    }

    filterTours();

    // ===== Pagination =====
    const paginationButtons = document.querySelectorAll('.pagination-button');
    const pageNumbers = document.querySelectorAll('.page-number');
    const allTourCards = document.querySelectorAll('.tour-card');
    const cardsPerPage = 6;
    let currentPage = 1;

    function getFilteredCards() {
        return Array.from(allTourCards).filter(card => {
            const category = card.dataset.category;
            return currentFilter === 'all' || category.includes(currentFilter);
        });
    }

    function updateVisibleCards() {
        const filteredCards = getFilteredCards();
        const totalPages = Math.ceil(filteredCards.length / cardsPerPage);
        
        allTourCards.forEach(card => {
            card.style.display = 'none';
        });
        
        const startIndex = (currentPage - 1) * cardsPerPage;
        const endIndex = startIndex + cardsPerPage;
        
        filteredCards.slice(startIndex, endIndex).forEach(card => {
            card.style.display = 'block';
        });
        
        pageNumbers.forEach((number, index) => {
            number.classList.toggle('active', index + 1 === currentPage);
            number.style.display = index < totalPages ? 'flex' : 'none';
        });
        
        document.querySelector('.pagination-button.prev').disabled = currentPage === 1;
        document.querySelector('.pagination-button.next').disabled = currentPage === totalPages || totalPages === 0;
    }

    if (pageNumbers.length > 0) {
        pageNumbers.forEach(number => {
            number.addEventListener('click', () => {
                currentPage = parseInt(number.textContent);
                updateVisibleCards();
            });
        });

        document.querySelector('.pagination-button.prev').addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                updateVisibleCards();
            }
        });

        document.querySelector('.pagination-button.next').addEventListener('click', () => {
            const filteredCards = getFilteredCards();
            const totalPages = Math.ceil(filteredCards.length / cardsPerPage);
            
            if (currentPage < totalPages) {
                currentPage++;
                updateVisibleCards();
            }
        });

        updateVisibleCards();
    }

    // ===== Tour Card Interactions =====
    document.querySelectorAll('.tour-card').forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't trigger if clicking inside a button or link
            if (e.target.tagName === 'BUTTON' || e.target.closest('button') || e.target.tagName === 'A' || e.target.closest('a')) {
                return;
            }

            const tourTitle = this.querySelector('.card-title').textContent;
            
            // Map tour titles to exact file names
            let fileName;
            switch(true) {
                case /coimbatore.*ooty.*coonoor/i.test(tourTitle):
                    fileName = 'coimbatore-–-ooty-–-coonoor-itinerary';
                    break;
                case /kerala.*independence/i.test(tourTitle):
                    fileName = 'kerala-independence-day-escape-itinerary';
                    break;
                case /andaman/i.test(tourTitle):
                    fileName = 'tour-andaman-islands';
                    break;
                case /aurangabad/i.test(tourTitle):
                    fileName = 'tour-aurangabad-heritage';
                    break;
                case /dudhsagar/i.test(tourTitle):
                    fileName = 'tour-dudhsagar-falls';
                    break;
                case /hampi/i.test(tourTitle):
                    fileName = 'tour-hampi-heritage';
                    break;
                case /jaipur.*udaipur/i.test(tourTitle):
                    fileName = 'tour-jaipur-&-udaipur';
                    break;
                case /jaisalmer.*jodhpur/i.test(tourTitle):
                    fileName = 'tour-jaisalmer-&-jodhpur';
                    break;
                case /ladakh/i.test(tourTitle):
                    fileName = 'tour-ladakh-adventure';
                    break;
                case /netravali/i.test(tourTitle):
                    fileName = 'tour-netravali-wildlife';
                    break;
                case /sikkim/i.test(tourTitle):
                    fileName = 'tour-sikkim-explorer';
                    break;
                case /south goa/i.test(tourTitle):
                    fileName = 'tour-south-goa-retreat';
                    break;
                default:
                    // Fallback for any other tours
                    fileName = tourTitle.toLowerCase()
                        .replace(/\s+/g, '-')
                        .replace(/[^a-z0-9-]/g, '');
                    fileName = `tour-${fileName}`; // Add tour- prefix
            }
            
            // Check if we're on the index page or destinations page
            const isIndexPage = window.location.pathname.includes('index.html') || 
                              window.location.pathname === '/' || 
                              window.location.pathname.endsWith('/');
            
            // Open the correct URL based on current page
            const url = `itinerary/${fileName}.html`;
            if (isIndexPage) {
                window.open(url, '_blank');
            } else {
                window.location.href = url;
            }
        });
    });

    // ===== View More Button =====
    const viewMoreToursBtn = document.getElementById('viewMoreToursBtn');
    if (viewMoreToursBtn) {
        viewMoreToursBtn.addEventListener('click', function() {
            window.location.href = 'destinations.html';
        });
    }

    // ===== Contact Form Submission =====
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('contactName').value;
            const email = document.getElementById('contactEmail').value;
            const phone = document.getElementById('contactPhone').value;
            const subject = document.getElementById('contactSubject').value;
            const message = document.getElementById('contactMessage').value;
            
            const whatsappMessage = `New Contact Form Submission:%0A%0A*Name:* ${name}%0A*Email:* ${email}%0A*Phone:* ${phone}%0A*Subject:* ${subject}%0A*Message:* ${message}`;
            
            window.open(`https://wa.me/919067972295?text=${whatsappMessage}`, '_blank');
            contactForm.reset();
        });
    }

    // ===== FAQ Accordion =====
    const faqQuestions = document.querySelectorAll('.faq-question');
    if (faqQuestions.length > 0) {
        faqQuestions.forEach(question => {
            question.addEventListener('click', function() {
                this.classList.toggle('active');
                
                const answer = this.nextElementSibling;
                
                if (this.classList.contains('active')) {
                    answer.classList.add('active');
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                } else {
                    answer.classList.remove('active');
                    answer.style.maxHeight = '0';
                }
                
                faqQuestions.forEach(q => {
                    if (q !== this && q.classList.contains('active')) {
                        q.classList.remove('active');
                        q.nextElementSibling.classList.remove('active');
                        q.nextElementSibling.style.maxHeight = '0';
                    }
                });
            });
        });
    }
});

// Upcoming Trip Card Interactions
    document.querySelectorAll('.upcoming-trip-card').forEach(card => {
        // Make the entire card clickable to open details page
        card.addEventListener('click', function(e) {
            // Don't trigger if clicking the book now button or any interactive element
            if (!e.target.closest('.book-now-btn') && !e.target.closest('button') && !e.target.closest('a')) {
                const tripId = this.dataset.tripId;
                // Map trip IDs to actual itinerary pages
                if (tripId === 'coimbatore-ooty-coonoor') {
                    window.location.href = '../itinerary/coimbatore-–-ooty-–-coonoor-itinerary.html';
                } else if (tripId === 'kerala-long-weekend') {
                    window.location.href = '../itinerary/kerala-independence-day-escape-itinerary.html';
                }
            }
        });
        
        // Add click handler for book now buttons
        const bookNowBtn = card.querySelector('.book-now-btn');
        if (bookNowBtn) {
            bookNowBtn.addEventListener('click', function(e) {
                e.stopPropagation(); // Prevent card click from triggering
                const tripTitle = card.querySelector('.trip-title').textContent;
                const tripDate = card.querySelector('.trip-date').textContent;
                const tripPrice = card.querySelector('.trip-price').textContent;
                
                const message = `I'd like to book the ${tripTitle} tour (${tripDate}) for ${tripPrice}. Please contact me to proceed.`;
                window.open(`https://wa.me/919067972295?text=${encodeURIComponent(message)}`, '_blank');
            });
        }
    });

// Remove .html extension from the URL
if (window.location.pathname.endsWith('.html')) {
  const cleanUrl = window.location.pathname
    .replace(/\.html$/, '')  // Remove .html
    .replace(/\/$/, '');     // Optional: Remove trailing slash
  window.history.replaceState({}, '', cleanUrl);
}