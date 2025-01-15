document.addEventListener('DOMContentLoaded', function() {
    const homeContent = document.querySelector('.home-content');
    const homeImage = document.querySelector('.home-image');
    const homeText = homeContent.querySelector('h1');
    const homeHighlight = homeContent.querySelectorAll('.home-highlight-content');
    const homeSubtitle = homeContent.querySelector('.home-subtitle');
    let typingTimeouts = [];

    const contentEn = {
        title: "Hi, I'm Sebastian Cachis",
        highlight: "Software Developer",
        subtitle: "Passionate about modern web development and back-end technologies, creating seamless and impactful digital experiences."
    };

    const contentEs = {
        title: "Hola, soy Sebastian Cachis",
        highlight: "Desarrollador de Software",
        subtitle: "Apasionado por el desarrollo web moderno y las tecnologías de back-end, creando experiencias digitales fluidas e impactantes."
    };

    const language = document.documentElement.lang;
    const content = language === 'es' ? contentEs : contentEn;

    function typeWriter(text, element, speed, callback) {
        let i = 0;
        function typing() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                typingTimeouts.push(setTimeout(typing, speed));
            } else if (callback) {
                callback();
            }
        }
        typing();
    }

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

    function showHomeImage() {
        homeImage.style.transform = 'translateX(0)';
        homeImage.style.opacity = 1;
        showHomeContent();
    }

    showHomeImage();
});