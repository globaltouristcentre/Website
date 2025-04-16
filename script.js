// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
    filterTrips("all");
    initializeImageCarousel();
    initializeReviewCarousel();
    initializeMobileMenu();
});

// Mobile Menu
function initializeMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    
    if (!menuToggle || !mobileNav) return;

    function toggleMenu() {
        menuToggle.classList.toggle('active');
        mobileNav.classList.toggle('active');
        document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
    }

    menuToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleMenu();
    });

    const navLinks = mobileNav.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', toggleMenu);
    });

    document.addEventListener('click', function(e) {
        if (mobileNav.classList.contains('active') && 
            !e.target.closest('.mobile-nav') && 
            !e.target.closest('.menu-toggle')) {
            toggleMenu();
        }
    });
}

// Trip Filtering
function filterTrips(category) {
    const packages = document.querySelectorAll('.package');
    const buttons = document.querySelectorAll('.filter-buttons button');

    buttons.forEach(button => button.classList.remove("active"));
    const activeButton = document.querySelector(`.filter-buttons button[onclick*="${category}"]`);
    if (activeButton) activeButton.classList.add("active");

    packages.forEach(package => {
        if (category === "all" || package.classList.contains(category)) {
            package.style.display = "block";
            setTimeout(() => {
                package.style.opacity = "1";
                package.style.transform = "scale(1)";
            }, 10);
        } else {
            package.style.opacity = "0";
            setTimeout(() => {
                package.style.display = "none";
            }, 300);
        }
    });
}

// Image Carousel
function initializeImageCarousel() {
    const slides = document.querySelectorAll(".carousel img");
    if (slides.length === 0) return;

    let currentSlide = 0;
    const totalSlides = slides.length;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle("active", i === index);
        });
    }

    setInterval(() => {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }, 5000);

    showSlide(currentSlide);
}

// Review Carousel
function initializeReviewCarousel() {
    const reviews = document.querySelectorAll(".review");
    if (reviews.length === 0) return;

    let currentReview = 0;
    const totalReviews = reviews.length;

    function showReview(index) {
        reviews.forEach((review, i) => {
            review.style.display = i === index ? "block" : "none";
        });
    }

    const nextBtn = document.getElementById("nextReview");
    const prevBtn = document.getElementById("prevReview");

    if (nextBtn) nextBtn.addEventListener("click", () => {
        currentReview = (currentReview + 1) % totalReviews;
        showReview(currentReview);
    });

    if (prevBtn) prevBtn.addEventListener("click", () => {
        currentReview = (currentReview - 1 + totalReviews) % totalReviews;
        showReview(currentReview);
    });

    setInterval(() => {
        currentReview = (currentReview + 1) % totalReviews;
        showReview(currentReview);
    }, 5000);

    showReview(currentReview);
}

// Popups
function showPopup(element) {
    const popup = element.querySelector(".popup");
    if (popup) {
        popup.style.opacity = "1";
        popup.style.visibility = "visible";
        popup.style.transform = "translateX(-50%) translateY(-5px)";
    }
}

function hidePopup(element) {
    const popup = element.querySelector(".popup");
    if (popup) {
        popup.style.opacity = "0";
        popup.style.visibility = "hidden";
        popup.style.transform = "translateX(-50%) translateY(0px)";
    }
}

// Add this to your script.js file
function googleTranslateElementInit() {
    new google.translate.TranslateElement(
        { 
            pageLanguage: 'en',
            includedLanguages: 'en,es,fr,de,it,ru,hi',
            layout: google.translate.TranslateElement.InlineLayout.SIMPLE
        }, 
        'google_translate_element'
    );
}   

document.addEventListener('DOMContentLoaded', function() {
    // WhatsApp Lead Form Submission
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
            
            // Your WhatsApp number (same as in your floating button)
            const whatsappNumber = '919067972295';
            
            // Create the WhatsApp URL
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
            
            // Open the URL in a new tab
            window.open(whatsappUrl, '_blank');
            
            // Optional: Reset the form
            whatsappForm.reset();
        });
    }
});

// Itinerary Form Submission
document.addEventListener('DOMContentLoaded', function() {

    const itineraryForm = document.getElementById('itineraryForm');
    if (itineraryForm) {
        itineraryForm.addEventListener('submit', function(e) {
            e.preventDefault(); // This prevents the page from reloading
            
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
        
        })
    }
});
