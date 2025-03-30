// Ensure all trips are visible when the page loads
document.addEventListener("DOMContentLoaded", function () {
    filterTrips("all");
    googleTranslateElementInit();
});

// Initialize Google Translate Widget
function googleTranslateElementInit() {
    new google.translate.TranslateElement({
        pageLanguage: 'en',
        includedLanguages: 'en,ru,it,fr,de',
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE
    }, 'google_translate_element');
}

// Show WhatsApp link on hover
function showWhatsApp(element) {
    const whatsapp = element.querySelector(".whatsapp-hover");
    if (whatsapp) {
        whatsapp.style.display = "block";
    }
}

// Hide WhatsApp link when not hovering
function hideWhatsApp(element) {
    const whatsapp = element.querySelector(".whatsapp-hover");
    if (whatsapp) {
        whatsapp.style.display = "none";
    }
}

// Show pop-up on hover
function showPopup(element) {
    const popup = element.querySelector(".popup");
    if (popup) {
        popup.style.opacity = "1";
        popup.style.visibility = "visible";
        popup.style.transform = "translateX(-50%) translateY(-5px)";
    }
}

// Hide pop-up when not hovering
function hidePopup(element) {
    const popup = element.querySelector(".popup");
    if (popup) {
        popup.style.opacity = "0";
        popup.style.visibility = "hidden";
        popup.style.transform = "translateX(-50%) translateY(0px)";
    }
}

// Filtering function with smooth transitions
function filterTrips(category) {
    let packages = document.querySelectorAll('.package');
    let buttons = document.querySelectorAll('.filter-buttons button');

    // Remove "active" class from all buttons
    buttons.forEach(button => button.classList.remove("active"));

    // Highlight the selected button
    document.querySelector(`[onclick="filterTrips('${category}')"]`).classList.add("active");

    packages.forEach(package => {
        if (category === "all" || package.classList.contains(category)) {
            package.style.display = "block";
            requestAnimationFrame(() => {
                package.style.opacity = "1";
                package.style.transform = "scale(1)";
            });
        } else {
            package.style.opacity = "0";
            setTimeout(() => {
                package.style.display = "none";
            }, 300);
        }
    });
}

// Image carousel functionality
let currentSlide = 0;
const slides = document.querySelectorAll(".carousel img");
const totalSlides = slides.length;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove("active");
        if (i === index) {
            slide.classList.add("active");
        }
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
}

// Auto-slide every 5 seconds
setInterval(nextSlide, 5000);

// Show the first image initially
showSlide(currentSlide);

// Review Carousel Functionality
let currentReview = 0;
const reviews = document.querySelectorAll(".review");
const totalReviews = reviews.length;

function showReview(index) {
    reviews.forEach((review, i) => {
        review.style.display = "none"; // Hide all reviews
    });

    reviews[index].style.display = "block"; // Show the selected review
}

function nextReview() {
    currentReview = (currentReview + 1) % totalReviews;
    showReview(currentReview);
}

function prevReview() {
    currentReview = (currentReview - 1 + totalReviews) % totalReviews;
    showReview(currentReview);
}

// Add event listeners to review navigation buttons
document.getElementById("nextReview").addEventListener("click", nextReview);
document.getElementById("prevReview").addEventListener("click", prevReview);

// Auto-slide reviews every 5 seconds
setInterval(nextReview, 5000);

// Show the first review initially
showReview(currentReview);
