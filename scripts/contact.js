document.addEventListener('DOMContentLoaded', function() {
    const contactContent = document.querySelector('.contact-content');

    function showContactContent() {
        contactContent.style.opacity = 1;
        contactContent.style.transform = 'translateY(0)';
    }

    // Inicia la animación al cargar la página
    setTimeout(showContactContent, 350);
});