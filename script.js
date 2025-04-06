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
