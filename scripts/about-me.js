// Main event listener that waits for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Elements for content and images sections
    const aboutMeContent = document.querySelector('.about-me-content');
    const aboutMeImages = document.querySelector('.about-me-images');

    // Function to show the about me content with fade-in and translation animation
    function showAboutMeContent() {
        aboutMeContent.style.opacity = 1;
        aboutMeContent.style.transform = 'translateY(0)';
    }

    // Function to show the images with fade-in and translation animation
    function showAboutMeImages() {
        aboutMeImages.style.opacity = 1;
        aboutMeImages.style.transform = 'translateY(0)';
    }

    // Initialize animations with slight delay for sequence effect
    setTimeout(showAboutMeContent, 350);
    setTimeout(showAboutMeImages, 490);

    // Elements for interactive image cards
    const images = document.querySelectorAll('.about-me-image');
    const infoCard = document.getElementById('info-card');
    const infoContent = document.getElementById('info-content');
    const closeBtn = document.getElementById('close-btn');
    let typingTimeouts = []; // Array to store typing animation timeouts

    // English version of information for each image card
    const infoData = {
        code: 'My favorite programming language is Java.',
        gamepad: 'My favorite video game is Minecraft.',
        soccer: 'My favorite soccer team is Universitario de Deportes.',
        anime: 'My favorite anime is Naruto.'
    };

    // Spanish version of information for each image card
    const infoDataEs = {
        code: 'Mi lenguaje de programación favorito es Java',
        gamepad: 'Mi videojuego favorito es Minecraft.',
        soccer: 'Mi equipo de fútbol favorito es Universitario de Deportes.',
        anime: 'Mi anime favorito es Naruto.'
    };

    // Function to type out text content letter by letter
    function typeWriter(text, element, speed, callback) {
        let i = 0;
        element.textContent = '';
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

    // Event listener for each image to show the corresponding info card
    images.forEach(image => {
        image.addEventListener('click', function() {
            const infoType = this.getAttribute('data-info'); // Get the info type from the data attribute
            const language = document.documentElement.lang; // Get the current language
            const text = language === 'es' ? infoDataEs[infoType] : infoData[infoType]; // Get the text based on the language

            // Clear any existing typing timeouts
            typingTimeouts.forEach(timeout => clearTimeout(timeout));
            typeWriter(text, infoContent, 25); // Type out the new text

            if (!infoCard.classList.contains('show')) {
                // If the info card is not visible, show it with animation
                infoCard.style.display = 'block';
                infoCard.classList.remove('hide');
                infoCard.classList.add('show');
                infoCard.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Event listener to close the info card
    closeBtn.addEventListener('click', function() {
        infoCard.classList.remove('show');
        infoCard.classList.add('hide');
        setTimeout(() => {
            infoCard.style.display = 'none';
            infoContent.textContent = '';
            infoCard.classList.remove('hide');
        }, 350);
    });

    // Event listener to close the info card when clicking outside of it
    window.addEventListener('click', function(event) {
        if (event.target === infoCard) {
            infoCard.classList.remove('show');
            infoCard.classList.add('hide');
            setTimeout(() => {
                infoCard.style.display = 'none';
                infoContent.textContent = '';
                infoCard.classList.remove('hide');
            }, 350);
        }
    });
});