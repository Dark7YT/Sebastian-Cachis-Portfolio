document.addEventListener('DOMContentLoaded', function() {
    const aboutMeContent = document.querySelector('.about-me-content');
    const aboutMeImages = document.querySelector('.about-me-images');

    function showAboutMeContent() {
        aboutMeContent.style.opacity = 1;
        aboutMeContent.style.transform = 'translateY(0)';
    }

    function showAboutMeImages() {
        aboutMeImages.style.opacity = 1;
        aboutMeImages.style.transform = 'translateY(0)';
    }

    // Inicia las animaciones al cargar la página
    setTimeout(showAboutMeContent, 350);
    setTimeout(showAboutMeImages, 490);

    const images = document.querySelectorAll('.about-me-image');
    const infoCard = document.getElementById('info-card');
    const infoContent = document.getElementById('info-content');
    const closeBtn = document.getElementById('close-btn');
    let typingTimeouts = [];

    const infoData = {
        code: 'My favorite programming language is Java.',
        gamepad: 'My favorite video game is Minecraft.',
        soccer: 'My favorite soccer team is Universitario de Deportes.',
        anime: 'My favorite anime is Naruto.'
    };

    const infoDataEs = {
        code: 'Mi lenguaje de programación favorito es Java',
        gamepad: 'Información sobre videojuegos y sus historias envolventes.',
        soccer: 'Mi equipo de fútbol favorito es Universitario de Deportes.',
        anime: 'Mi anime favorito es Naruto.'
    };

    function typeWriter(text, element, speed, callback) {
        let i = 0;
        element.textContent = ''; // Limpia el contenido antes de empezar a escribir
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

    images.forEach(image => {
        image.addEventListener('click', function() {
            const infoType = this.getAttribute('data-info');
            const language = document.documentElement.lang;
            const text = language === 'es' ? infoDataEs[infoType] : infoData[infoType];

            typingTimeouts.forEach(timeout => clearTimeout(timeout)); // Limpia los timeouts anteriores
            typeWriter(text, infoContent, 25);

            if (!infoCard.classList.contains('show')) {
                // Si la tarjeta no está visible, muestra la tarjeta con animación
                infoCard.style.display = 'block';
                infoCard.classList.remove('hide');
                infoCard.classList.add('show');
                infoCard.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    closeBtn.addEventListener('click', function() {
        infoCard.classList.remove('show');
        infoCard.classList.add('hide');
        setTimeout(() => {
            infoCard.style.display = 'none';
            infoContent.textContent = ''; // Limpia el contenido mostrado
            infoCard.classList.remove('hide');
        }, 350);
    });

    window.addEventListener('click', function(event) {
        if (event.target === infoCard) {
            infoCard.classList.remove('show');
            infoCard.classList.add('hide');
            setTimeout(() => {
                infoCard.style.display = 'none';
                infoContent.textContent = ''; // Limpia el contenido mostrado
                infoCard.classList.remove('hide');
            }, 350);
        }
    });
});