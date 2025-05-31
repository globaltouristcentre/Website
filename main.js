// =============================================
// Main Initialization
// =============================================
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
    initTripForm();
    initCommonTripForm();
    initEnhancedFlightBooking();
    initGalleryCarousel();
    initBookingModal();
    initBookingForm();



    // Check for filter parameter on page load
    const urlParams = new URLSearchParams(window.location.search);
    const filterParam = urlParams.get('filter');
    
    // Apply filter if parameter exists
    filterTrips(filterParam || 'all');
});

// =============================================
// UI Components
// =============================================

/**
 * Preloader initialization
 */
function initPreloader() {
    const preloader = document.querySelector('.preloader');
    if (!preloader) return;

    window.addEventListener('load', function() {
        setTimeout(function() {
            preloader.classList.add('fade-out');
            setTimeout(() => preloader.style.display = 'none', 500);
        }, 500);
    });
}

/**
 * Custom cursor initialization
 */
function initCursor() {
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    if (!cursor || !cursorFollower) return;

    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        setTimeout(() => {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        }, 100);
    });
    
    // Add hover effects for interactive elements
    const hoverElements = document.querySelectorAll(
        'a, button, .destination-card, .service-card, .testimonial-card, ' +
        '.instagram-post, input, select, textarea, .trip-card, .gallery-item'
    );
    
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-hover');
            cursorFollower.classList.add('cursor-follower-hover');
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-hover');
            cursorFollower.classList.remove('cursor-follower-hover');
        });
    });
}

/**
 * Mobile menu initialization
 */
function initMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    if (!menuToggle || !mobileMenu) return;

    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close menu when clicking on links
    const navLinks = mobileMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Mobile back button functionality
    const mobileBackButton = document.querySelector('.mobile-menu-back');
    if (mobileBackButton) {
        mobileBackButton.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
}

// =============================================
// Sliders and Carousels
// =============================================

/**
 * Hero slider initialization
 */
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
    showSlide(currentSlide);
}

/**
 * Testimonial slider initialization
 */
function initTestimonialSlider() {
    const slider = document.querySelector('.testimonials-slider');
    if (!slider) return;
    
    const testimonials = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.testimonial-prev');
    const nextBtn = document.querySelector('.testimonial-next');
    let currentTestimonial = 0;
    
    function showTestimonial(index) {
        testimonials.forEach((t, i) => t.classList.toggle('active', i === index));
        dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
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
        dot.addEventListener('click', () => showTestimonial(i));
    });
    
    // Button navigation
    if (nextBtn) nextBtn.addEventListener('click', nextTestimonial);
    if (prevBtn) prevBtn.addEventListener('click', prevTestimonial);
    
    // Auto slide change every 6 seconds
    setInterval(nextTestimonial, 6000);
    showTestimonial(currentTestimonial);
}

/**
 * Gallery carousel initialization
 */
function initGalleryCarousel() {
    const carousel = document.querySelector('.carousel');
    if (!carousel) return;
    
    const inner = carousel.querySelector('.carousel-inner');
    const images = inner.querySelectorAll('img');
    const prevBtn = carousel.querySelector('.prev');
    const nextBtn = carousel.querySelector('.next');
    let currentIndex = 0;
    
    function showImage(index) {
        images.forEach(img => img.classList.remove('active'));
        
        // Handle index boundaries
        if (index >= images.length) currentIndex = 0;
        else if (index < 0) currentIndex = images.length - 1;
        else currentIndex = index;
        
        images[currentIndex].classList.add('active');
    }
    
    // Navigation
    nextBtn.addEventListener('click', () => showImage(currentIndex + 1));
    prevBtn.addEventListener('click', () => showImage(currentIndex - 1));
    
    // Auto-advance
    let interval = setInterval(() => showImage(currentIndex + 1), 5000);
    
    // Pause on hover
    carousel.addEventListener('mouseenter', () => clearInterval(interval));
    carousel.addEventListener('mouseleave', () => {
        interval = setInterval(() => showImage(currentIndex + 1), 5000);
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') showImage(currentIndex + 1);
        else if (e.key === 'ArrowLeft') showImage(currentIndex - 1);
    });
    
    showImage(currentIndex);
}

// =============================================
// Utility Functions
// =============================================

/**
 * Back to top button initialization
 */
function initBackToTop() {
    const backToTop = document.querySelector('.back-to-top');
    if (!backToTop) return;

    window.addEventListener('scroll', () => {
        backToTop.classList.toggle('active', window.pageYOffset > 300);
    });
    
    backToTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/**
 * Animate On Scroll (AOS) initialization
 */
function initAOS() {
    const elements = document.querySelectorAll('[data-aos]');
    
    function checkScroll() {
        elements.forEach(el => {
            const elTop = el.getBoundingClientRect().top;
            if (elTop < window.innerHeight - 100) {
                el.classList.add('aos-animate');
            }
        });
    }
    
    window.addEventListener('scroll', checkScroll);
    window.addEventListener('load', checkScroll);
}

/**
 * Google Translate initialization
 */
function initGoogleTranslate() {
    function googleTranslateElementInit() {
        if (typeof google !== 'undefined') {
            new google.translate.TranslateElement({ 
                pageLanguage: 'en',
                includedLanguages: 'en,es,fr,de,it,ru,hi',
                layout: google.translate.TranslateElement.InlineLayout.SIMPLE
            }, 'languageDropdown');
            
            // Hide Google Translate branding
            const googleBranding = document.querySelector('.goog-logo-link');
            const googleText = document.querySelector('.goog-te-gadget');
            if (googleBranding) googleBranding.style.display = 'none';
            if (googleText) googleText.style.color = 'transparent';
        }
    }
    
    // Initialize or set up for later initialization
    if (typeof google === 'undefined') {
        window.googleTranslateElementInit = googleTranslateElementInit;
    } else {
        googleTranslateElementInit();
    }
    
    // Language selector toggle
    const languageToggle = document.getElementById('languageToggle');
    const mobileLanguageToggle = document.getElementById('languageToggleMobile');
    const languageDropdown = document.getElementById('languageDropdown');
    
    if (languageToggle) {
        languageToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            languageDropdown.classList.toggle('active');
        });
    }
    
    if (mobileLanguageToggle) {
        mobileLanguageToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            languageDropdown.classList.toggle('active');
        });
    }
    
    // Close dropdown when clicking outside
    document.addEventListener('click', () => {
        if (languageDropdown) languageDropdown.classList.remove('active');
    });
}

/**
 * Filter trips by category
 */
function filterTrips(category = 'all') {
    const packages = document.querySelectorAll('.destination-package');
    const buttons = document.querySelectorAll('.filter-buttons button');
    
    // Validate category
    if (!['all', 'domestic', 'international', 'daytrip'].includes(category)) {
        category = 'all';
    }
    
    // Update active button
    buttons.forEach(btn => btn.classList.remove('active'));
    const activeButton = document.querySelector(`.filter-buttons button[onclick*="${category}"]`);
    if (activeButton) activeButton.classList.add('active');
    
    // Filter packages
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
            setTimeout(() => pkg.style.display = 'none', 0);
        }
    });
}

// =============================================
// Form Handlers
// =============================================

/**
 * WhatsApp lead form initialization
 */
function initWhatsAppForm() {
    const whatsappForm = document.getElementById('whatsappLeadForm');
    if (!whatsappForm) return;

    whatsappForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const formData = {
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value,
            email: document.getElementById('email').value,
            interest: document.getElementById('interest').value,
            message: document.getElementById('message').value
        };
        
        // Format WhatsApp message
        let whatsappMessage = `Hello Global Tourist Centre!%0A%0A*Name:* ${formData.name}%0A*Phone:* ${formData.phone}%0A`;
        if (formData.email) whatsappMessage += `*Email:* ${formData.email}%0A`;
        if (formData.interest) whatsappMessage += `*Interest:* ${formData.interest}%0A`;
        if (formData.message) whatsappMessage += `*Message:* ${formData.message}%0A`;
        
        // Open WhatsApp
        window.open(`https://wa.me/919067972295?text=${whatsappMessage}`, '_blank');
        whatsappForm.reset();
    });
}

/**
 * Itinerary form initialization
 */
function initItineraryForm() {
    const itineraryForm = document.getElementById('itineraryForm');
    if (!itineraryForm) return;

    itineraryForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const formData = {
            name: document.getElementById('itineraryName').value,
            phone: document.getElementById('itineraryPhone').value,
            email: document.getElementById('itineraryEmail').value,
            package: document.getElementById('itineraryPackage').value,
            dates: document.getElementById('itineraryDates').value,
            details: document.getElementById('itineraryDetails').value
        };
        
        // Format WhatsApp message
        let whatsappMessage = `Hello Global Tourist Centre!%0A%0AI'm interested in a personalized itinerary.%0A%0A`;
        whatsappMessage += `*Name:* ${formData.name}%0A*Phone:* ${formData.phone}%0A`;
        if (formData.email) whatsappMessage += `*Email:* ${formData.email}%0A`;
        whatsappMessage += `*Package Interested In:* ${formData.package}%0A`;
        if (formData.dates) whatsappMessage += `*Preferred Travel Dates:* ${formData.dates}%0A`;
        if (formData.details) whatsappMessage += `*Special Requirements:* ${formData.details}%0A`;
        
        // Open WhatsApp
        window.open(`https://wa.me/919067972295?text=${whatsappMessage}`, '_blank');
        itineraryForm.reset();
    });
}

/**
 * Common trip form initialization
 */
function initCommonTripForm() {
    const commonTripForm = document.getElementById('commonTripForm');
    if (!commonTripForm) return;

    // Function to set the trip value and scroll to form
    function setTripAndScroll(tripValue) {
        // Set the trip selection
        const tripSelect = document.getElementById('trip-selection');
        if (tripSelect) {
            // Find the option that matches (case insensitive)
            const options = Array.from(tripSelect.options);
            const matchedOption = options.find(opt => 
                opt.value.toLowerCase() === tripValue.toLowerCase()
            );
            if (matchedOption) {
                tripSelect.value = matchedOption.value;
            }
        }

        // Scroll to form
        const formSection = document.getElementById('common-lead-form');
        if (formSection) {
            // Small timeout ensures smooth scroll works
            setTimeout(() => {
                formSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 50);
        }
    }

    // 1. Handle URL parameters on page load
    function handleUrlParams() {
        const urlParams = new URLSearchParams(window.location.search);
        const tripParam = urlParams.get('trip');
        
        if (tripParam) {
            setTripAndScroll(tripParam);
        }
    }

    // 2. Handle button clicks within the same page
    document.querySelectorAll('.book-now-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const tripValue = this.getAttribute('data-trip') || 
                             new URL(this.href).searchParams.get('trip');
            if (tripValue) {
                setTripAndScroll(tripValue);
            }
        });
    });

    // Run on page load
    handleUrlParams();

    // Existing form submission handler
    commonTripForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('common-name').value,
            email: document.getElementById('common-email').value,
            phone: document.getElementById('common-phone').value,
            trip: document.getElementById('trip-selection').value,
            groupSize: document.getElementById('common-group-size').value,
            message: document.getElementById('common-message').value
        };
        
        let whatsappMessage = `Hello Global Tourist Centre!%0A%0AI'm interested in booking a trip.%0A%0A`;
        whatsappMessage += `*Name:* ${formData.name}%0A*Email:* ${formData.email}%0A*Phone:* ${formData.phone}%0A`;
        whatsappMessage += `*Trip:* ${formData.trip}%0A*Group Size:* ${formData.groupSize}%0A`;
        if (formData.message) whatsappMessage += `*Special Requirements:* ${formData.message}%0A`;
        
        window.open(`https://wa.me/919067972295?text=${encodeURIComponent(whatsappMessage)}`, '_blank');
        this.reset();
    });
}

/**
 * Individual trip form initialization
 */
function initTripForm() {
    const tripForm = document.getElementById('kashmirTripForm');
    if (!tripForm) return;

    tripForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            groupSize: document.getElementById('group-size').value,
            contactMethod: document.getElementById('contact-method').value,
            message: document.getElementById('message').value
        };
        
        // Format group size text
        const groupSizeText = {
            '1': '1 Person',
            '2': '2 People',
            '3-5': '3-5 People',
            '6+': '6+ People'
        }[formData.groupSize] || 'Custom Group';
        
        // Format WhatsApp message
        let whatsappMessage = `Hello Global Tourist Centre!%0A%0AI want to book the Kashmir Group Trip.%0A%0A`;
        whatsappMessage += `*Name:* ${formData.name}%0A*Email:* ${formData.email}%0A*Phone:* ${formData.phone}%0A`;
        whatsappMessage += `*Group Size:* ${groupSizeText}%0A*Preferred Contact Method:* ${formData.contactMethod}%0A`;
        if (formData.message) whatsappMessage += `*Special Requirements:* ${formData.message}%0A`;
        
        // Open WhatsApp
        window.open(`https://wa.me/919067972295?text=${encodeURIComponent(whatsappMessage)}`, '_blank');
        this.reset();
    });
}

// =============================================
// Enhanced Flight Booking
// =============================================

function initEnhancedFlightBooking() {
    // DOM Elements
    const searchTabs = document.querySelectorAll('.search-tab');
    const searchForms = document.querySelectorAll('.search-form');
    const swapCitiesBtns = document.querySelectorAll('.swap-cities');
    const passengerSelectors = document.querySelectorAll('.passenger-selector');
    const addFlightBtn = document.getElementById('addFlightSegment');
    const multiCityContainer = document.querySelector('.multi-city-container');
    const dealTabs = document.querySelectorAll('.deal-tab');
    const dealContainers = document.querySelectorAll('.flight-deals');
    const searchBtn = document.querySelector('.btn-search-flights');
    const modal = document.getElementById('flightSearchModal');
    const modalClose = document.querySelector('.modal-close');
    const viewDealBtns = document.querySelectorAll('.btn-view-deal');

    // Initialize
    function init() {
        setupSearchTabs();
        setupSwapCities();
        setupPassengerSelectors();
        setupMultiCity();
        setupDealTabs();
        setupSearchButton();
        setupModal();
        setupViewDealButtons();
        initDateInputs();
    }

    // Set up search tabs
    function setupSearchTabs() {
        searchTabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                e.preventDefault();
                searchTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                const tabId = tab.getAttribute('data-tab');
                searchForms.forEach(form => {
                    form.classList.remove('active');
                    if (form.id === `${tabId}-form`) form.classList.add('active');
                });
                
                const returnDateGroup = document.getElementById('returnDateGroup');
                if (returnDateGroup) {
                    returnDateGroup.style.display = tabId === 'one-way' ? 'none' : 'block';
                }
            });
        });
    }

    // Set up city swapping
    function setupSwapCities() {
        swapCitiesBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const inputs = this.closest('.search-form').querySelectorAll('.city-input');
                if (inputs.length >= 2) {
                    const [from, to] = inputs;
                    [from.value, to.value] = [to.value, from.value];
                }
            });
        });
    }

    // Set up passenger selectors - Updated version
    function setupPassengerSelectors() {
        passengerSelectors.forEach(selector => {
            const input = selector.querySelector('.passenger-input');
            const dropdown = selector.querySelector('.passenger-dropdown');
            
            // Close other dropdowns when opening a new one
            selector.addEventListener('click', function(e) {
                e.stopPropagation();
                passengerSelectors.forEach(s => {
                    if (s !== selector) s.classList.remove('active');
                });
                this.classList.toggle('active');
            });
            
            // Handle passenger count changes
            selector.querySelectorAll('.passenger-minus, .passenger-plus').forEach(btn => {
                btn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    const countElement = this.parentElement.querySelector('.passenger-count');
                    let count = parseInt(countElement.textContent);
                    
                    if (this.classList.contains('passenger-minus')) {
                        if (count > 0) count--;
                    } else {
                        const totalPassengers = getTotalPassengers(selector);
                        if (totalPassengers < 9) count++;
                    }
                    
                    countElement.textContent = count;
                    updatePassengerText(selector, input);
                    this.parentElement.querySelector('.passenger-minus').disabled = count === 0;
                });
            });
            
            // Done button
            const doneBtn = selector.querySelector('.btn-done');
            if (doneBtn) {
                doneBtn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    selector.classList.remove('active');
                });
            }
        });
        
        // Close dropdowns when clicking outside
        document.addEventListener('click', function() {
            passengerSelectors.forEach(selector => {
                selector.classList.remove('active');
            });
        });
    }

    function getTotalPassengers(selector) {
        return Array.from(selector.querySelectorAll('.passenger-count'))
                   .reduce((sum, el) => sum + parseInt(el.textContent), 0);
    }
    
    function updatePassengerText(selector, input) {
        const adults = parseInt(selector.querySelector('[data-type="adults"]').textContent);
        const children = parseInt(selector.querySelector('[data-type="children"]').textContent);
        const infants = parseInt(selector.querySelector('[data-type="infants"]').textContent);
        
        let text = [];
        if (adults > 0) text.push(`${adults} ${adults === 1 ? 'Adult' : 'Adults'}`);
        if (children > 0) text.push(`${children} ${children === 1 ? 'Child' : 'Children'}`);
        if (infants > 0) text.push(`${infants} ${infants === 1 ? 'Infant' : 'Infants'}`);
        
        input.value = text.join(', ') || '1 Adult';
    }

    // Set up multi-city flights
    function setupMultiCity() {
        if (!addFlightBtn) return;
        
        addFlightBtn.addEventListener('click', (e) => {
            e.preventDefault();
            addFlightSegment();
        });
        
        addFlightSegment(); // Add first segment
    }

    function addFlightSegment() {
        const segmentCount = document.querySelectorAll('.flight-segment').length + 1;
        const today = new Date().toISOString().split('T')[0];
        
        const segment = document.createElement('div');
        segment.className = 'flight-segment';
        segment.innerHTML = `
            <div class="segment-header">
                <h4>Flight ${segmentCount}</h4>
                ${segmentCount > 1 ? '<button class="btn-remove-segment"><i class="fas fa-times"></i></button>' : ''}
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>From</label>
                    <div class="input-with-icon">
                        <i class="fas fa-plane-departure"></i>
                        <input type="text" placeholder="City or Airport" class="city-input">
                    </div>
                </div>
                <div class="form-group">
                    <label>To</label>
                    <div class="input-with-icon">
                        <i class="fas fa-plane-arrival"></i>
                        <input type="text" placeholder="City or Airport" class="city-input">
                    </div>
                </div>
            </div>
            <div class="form-group">
                <label>Departure Date</label>
                <div class="input-with-icon">
                    <i class="far fa-calendar-alt"></i>
                    <input type="date" placeholder="Select Date" class="date-input" min="${today}">
                </div>
            </div>
        `;
        
        multiCityContainer.appendChild(segment);
        
        // Set up remove button
        const removeBtn = segment.querySelector('.btn-remove-segment');
        if (removeBtn) {
            removeBtn.addEventListener('click', (e) => {
                e.preventDefault();
                segment.remove();
                updateSegmentNumbers();
            });
        }
    }

    function updateSegmentNumbers() {
        document.querySelectorAll('.flight-segment').forEach((segment, index) => {
            segment.querySelector('h4').textContent = `Flight ${index + 1}`;
        });
    }

    // Set up deal tabs
    function setupDealTabs() {
        dealTabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                e.preventDefault();
                dealTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                const category = tab.getAttribute('data-category');
                dealContainers.forEach(container => {
                    container.classList.remove('active');
                    if (container.id === `${category}-deals`) container.classList.add('active');
                });
            });
        });
    }

    // Initialize date inputs
    function initDateInputs() {
        const today = new Date().toISOString().split('T')[0];
        document.querySelectorAll('.date-input').forEach(input => {
            input.min = today;
        });
    }

    // Set up search button
    function setupSearchButton() {
        if (!searchBtn) return;
        
        searchBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const originalHtml = searchBtn.innerHTML;
            searchBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Searching...';
            searchBtn.disabled = true;
            
            const activeTab = document.querySelector('.search-tab.active');
            const tabType = activeTab ? activeTab.getAttribute('data-tab') : 'round-trip';
            
            if (tabType === 'multi-city') {
                handleMultiCitySearch();
            } else {
                handleStandardSearch(tabType);
            }
            
            // Reset button
            setTimeout(() => {
                searchBtn.innerHTML = originalHtml;
                searchBtn.disabled = false;
            }, 1500);
        });
    }

    function handleMultiCitySearch() {
        const segments = Array.from(document.querySelectorAll('.flight-segment')).map(segment => {
            const inputs = segment.querySelectorAll('.city-input');
            const dateInput = segment.querySelector('.date-input');
            return {
                from: inputs[0] ? inputs[0].value : '',
                to: inputs[1] ? inputs[1].value : '',
                date: dateInput ? dateInput.value : ''
            };
        });
        
        const travelClass = document.getElementById('multiCityTravelClass')?.value || 'economy';
        const passengers = document.getElementById('multiCityPassengers')?.value || '1 Adult';
        
        let whatsappMessage = `Hello Global Tourist Centre! I'm interested in a multi-city flight with the following segments:%0A%0A`;
        
        segments.forEach((segment, index) => {
            whatsappMessage += `*Segment ${index + 1}:*%0A`;
            whatsappMessage += `From: ${segment.from || 'Not specified'}%0A`;
            whatsappMessage += `To: ${segment.to || 'Not specified'}%0A`;
            whatsappMessage += `Date: ${segment.date || 'Not specified'}%0A%0A`;
        });
        
        whatsappMessage += `*Travel Class:* ${travelClass}%0A`;
        whatsappMessage += `*Passengers:* ${passengers}%0A%0A`;
        whatsappMessage += `Please contact me with the best options.`;
        
        window.open(`https://wa.me/919067972295?text=${encodeURIComponent(whatsappMessage)}`, '_blank');
    }

    function handleStandardSearch(tabType) {
        const formData = {
            fromCity: document.getElementById(tabType === 'round-trip' ? 'fromCity' : 'onewayFromCity')?.value,
            toCity: document.getElementById(tabType === 'round-trip' ? 'toCity' : 'onewayToCity')?.value,
            departureDate: document.getElementById(tabType === 'round-trip' ? 'departureDate' : 'onewayDepartureDate')?.value,
            returnDate: tabType === 'round-trip' ? document.getElementById('returnDate')?.value : null,
            travelClass: document.getElementById(tabType === 'round-trip' ? 'travelClass' : 'onewayTravelClass')?.value || 'economy',
            passengers: document.getElementById(tabType === 'round-trip' ? 'passengers' : 'onewayPassengers')?.value || '1 Adult'
        };
        
        let whatsappMessage = `Hello Global Tourist Centre! I'm interested in a ${tabType.replace('-', ' ')} flight:%0A%0A`;
        whatsappMessage += `*From:* ${formData.fromCity || 'Not specified'}%0A`;
        whatsappMessage += `*To:* ${formData.toCity || 'Not specified'}%0A`;
        whatsappMessage += `*Departure:* ${formData.departureDate || 'Not specified'}%0A`;
        if (tabType === 'round-trip') whatsappMessage += `*Return:* ${formData.returnDate || 'Not specified'}%0A`;
        whatsappMessage += `*Class:* ${formData.travelClass}%0A`;
        whatsappMessage += `*Passengers:* ${formData.passengers}%0A%0A`;
        whatsappMessage += `Please contact me with the best options.`;
        
        window.open(`https://wa.me/919067972295?text=${encodeURIComponent(whatsappMessage)}`, '_blank');
    }

    // Set up modal
    function setupModal() {
        if (!modalClose) return;
        
        modalClose.addEventListener('click', (e) => {
            e.preventDefault();
            modal.classList.remove('active');
            document.body.style.overflow = '';
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // Set up view deal buttons
    function setupViewDealButtons() {
        viewDealBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const from = this.getAttribute('data-from');
                const to = this.getAttribute('data-to');
                
                // Set values in search form
                const fromInput = document.getElementById('fromCity');
                const toInput = document.getElementById('toCity');
                if (fromInput) fromInput.value = from;
                if (toInput) toInput.value = to;
                
                // Activate round-trip tab
                document.querySelectorAll('.search-tab').forEach(t => t.classList.remove('active'));
                document.querySelectorAll('.search-form').forEach(f => f.classList.remove('active'));
                
                const roundTripTab = document.querySelector('.search-tab[data-tab="round-trip"]');
                const roundTripForm = document.getElementById('round-trip-form');
                if (roundTripTab) roundTripTab.classList.add('active');
                if (roundTripForm) roundTripForm.classList.add('active');
                
                // Show return date
                const returnDateGroup = document.getElementById('returnDateGroup');
                if (returnDateGroup) returnDateGroup.style.display = 'block';
                
                // Scroll to search form
                document.querySelector('.flight-search-section').scrollIntoView({ behavior: 'smooth' });
            });
        });
    }

    // Initialize the enhanced flight booking
    init();
}

function initBookingModal() {
    console.log('Attempting to initialize booking modal...');
    const bookingModal = document.getElementById('bookingModal');
    const bookingForm = document.getElementById('bookingForm');
    
    if (!bookingModal || !bookingForm) {
        console.error('Booking modal or form element not found');
        return;
    }

    // Get the current trip name from the page
    const getCurrentTripName = () => {
        const heroTitle = document.querySelector('.trip-hero-content h1');
        if (heroTitle) return heroTitle.textContent.trim();
        return document.title.replace('Global Tourist Centre |', '').trim();
    };

    // Close modal when clicking the close button
    const closeButton = bookingModal.querySelector('.modal-close');
    if (closeButton) {
        closeButton.addEventListener('click', function(e) {
            e.preventDefault();
            bookingModal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // Close modal when clicking outside the modal content
    bookingModal.addEventListener('click', function(e) {
        if (e.target === bookingModal) {
            bookingModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('bookingName').value.trim();
        const phone = document.getElementById('bookingPhone').value.trim();
        const travelers = document.getElementById('bookingCount').value;
        const message = document.getElementById('bookingMessage').value.trim();
        
        // Get current trip name
        const tripName = getCurrentTripName();

        // Basic validation
        if (!name || !phone || !travelers) {
            alert('Please fill out all required fields');
            return;
        }

        // Format travelers text
        const travelersText = {
            '1': '1 Person',
            '2': '2 People',
            '3-5': '3-5 People',
            '6+': '6+ People'
        }[travelers] || travelers + ' People';

        // Format WhatsApp message with better structure
        const whatsappMessage = 
`*NEW BOOKING ENQUIRY - ${tripName.toUpperCase()}*
───────────────────────────────
*👤 Guest Details:*
• *Name:* ${name}
• *Contact:* ${phone}

*✈️ Trip Details:*
• *Tour Package:* ${tripName}
• *Number of Travelers:* ${travelersText}
${message ? `• *Special Requirements:* ${message}\n` : ''}
───────────────────────────────
Please provide availability and payment details. Thank you!`;

        // Create WhatsApp URL
        const whatsappUrl = `https://wa.me/919067972295?text=${encodeURIComponent(whatsappMessage)}`;
        
        // Open WhatsApp (keep your existing code)
        try {
            const newWindow = window.open(whatsappUrl, '_blank');
            
            if (!newWindow || newWindow.closed || typeof newWindow.closed == 'undefined') {
                window.location.href = whatsappUrl;
            }
            
            // Reset form and close modal
            bookingForm.reset();
            bookingModal.classList.remove('active');
            document.body.style.overflow = '';
        } catch (error) {
            console.error('Error opening WhatsApp:', error);
            alert('Error opening WhatsApp. Please try again or contact us directly.');
        }
    });
}

// Remove .html extension from the URL
if (window.location.pathname.endsWith('.html')) {
  const cleanUrl = window.location.pathname
    .replace(/\.html$/, '')  // Remove .html
    .replace(/\/$/, '');     // Optional: Remove trailing slash
  window.history.replaceState({}, '', cleanUrl);
}