// Lightbox functionality for image gallery

// Keep track of which image is currently showing
let slideIndex = 1;

// Opens the lightbox modal
function openModal() {
    document.getElementById("myModal").style.display = "block";
}

// Closes the lightbox modal
function closeModal() {
    document.getElementById("myModal").style.display = "none";
}

// Changes slides using next/previous buttons
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Goes to a specific slide
function currentSlide(n) {
    showSlides(slideIndex = n);
}

// Main function to display the selected slide
function showSlides(n) {
    let slides = document.getElementsByClassName("mySlides");
    
    // If we go past the last image, go back to first
    if (n > slides.length) {
        slideIndex = 1;
    }
    
    // If we go before the first image, go to last
    if (n < 1) {
        slideIndex = slides.length;
    }
    
    // Hide all images
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    
    // Show only the selected image
    slides[slideIndex - 1].style.display = "block";
}
