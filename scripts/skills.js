// Main event listener that waits for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Element for the skills content section
    const skillsContent = document.querySelector('.skills-content');
    // Elements for each skill image
    const skillsImages = document.querySelectorAll('.skills-image');

    // Function to show the skills content with fade-in and translation animation
    function showSkillsContent() {
        skillsContent.style.opacity = 1;
        skillsContent.style.transform = 'translateX(0)';
    }

    // Function to show the skill images with a staggered fade-in animation
    function showSkillsImages() {
        skillsImages.forEach((image, index) => {
            setTimeout(() => {
                image.style.opacity = 1;
            }, index * 200); // Stagger the animation by 200ms for each image
        });
    }

    // Initialize the animations with slight delays for a smooth effect
    setTimeout(showSkillsContent, 350);
    setTimeout(showSkillsImages, 700);
});