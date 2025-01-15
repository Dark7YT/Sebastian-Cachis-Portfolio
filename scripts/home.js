// Main event listener that waits for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Elements for home content and image sections
    const homeContent = document.querySelector('.home-content');
    const homeImage = document.querySelector('.home-image');
    const homeText = homeContent.querySelector('h1');
    const homeHighlight = homeContent.querySelectorAll('.home-highlight-content');
    const homeSubtitle = homeContent.querySelector('.home-subtitle');
    let typingTimeouts = []; // Array to store typing animation timeouts

    // English version of home page content
    const contentEn = {
        title: "Hi, I'm Sebastian Cachis",
        highlight: "Software Developer",
        subtitle: "Passionate about modern web development and back-end technologies, creating seamless and impactful digital experiences."
    };

    // Spanish version of home page content
    const contentEs = {
        title: "Hola, soy Sebastian Cachis",
        highlight: "Desarrollador de Software",
        subtitle: "Apasionado por el desarrollo web moderno y las tecnologías de back-end, creando experiencias digitales fluidas e impactantes."
    };

    // Determine the current language and select the appropriate content
    const language = document.documentElement.lang;
    const content = language === 'es' ? contentEs : contentEn;

    // Function to type out text content letter by letter
    function typeWriter(text, element, speed, callback) {
        let i = 0;
        function typing() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                typingTimeouts.push(setTimeout(typing, speed)); // Store timeout for clearing later
            } else if (callback) {
                callback();
            }
        }
        typing();
    }

    // Function to show the home content with fade-in and translation animation
    function showHomeContent() {
        homeContent.style.opacity = 1;
        homeText.style.visibility = 'visible';
        homeHighlight.forEach(element => element.style.visibility = 'visible');
        homeSubtitle.style.visibility = 'visible';

        homeText.textContent = '';
        homeHighlight.forEach(element => element.textContent = '');
        homeSubtitle.textContent = '';

        typeWriter(content.title, homeText, 25);
        homeHighlight.forEach(element => typeWriter(content.highlight, element, 25));
        typeWriter(content.subtitle, homeSubtitle, 15);
    }

    // Function to show the home image with translation and fade-in animation
    function showHomeImage() {
        homeImage.style.transform = 'translateX(0)';
        homeImage.style.opacity = 1;
        showHomeContent();
    }

    // Initialize the home image animation
    showHomeImage();
});