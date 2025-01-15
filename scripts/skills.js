document.addEventListener('DOMContentLoaded', function() {
    const skillsContent = document.querySelector('.skills-content');
    const skillsImages = document.querySelectorAll('.skills-image');

    function showSkillsContent() {
        skillsContent.style.opacity = 1;
        skillsContent.style.transform = 'translateX(0)';
    }

    function showSkillsImages() {
        skillsImages.forEach((image, index) => {
            setTimeout(() => {
                image.style.opacity = 1;
            }, index * 200);
        });
    }

    // Inicia las animaciones al cargar la página
    setTimeout(showSkillsContent, 350);
    setTimeout(showSkillsImages, 700);
});