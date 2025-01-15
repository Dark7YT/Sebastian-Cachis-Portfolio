// Main event listener that waits for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Element for the contact content section
    const contactContent = document.querySelector('.contact-content');

    // Function to show the contact content with fade-in and translation animation
    function showContactContent() {
        contactContent.style.opacity = 1;
        contactContent.style.transform = 'translateY(0)';
    }

    // Initialize the animation with a slight delay for a smooth effect
    setTimeout(showContactContent, 350);
});