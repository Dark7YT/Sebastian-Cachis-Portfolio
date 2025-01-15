// Element for the mobile menu toggle button
const mobileMenu = document.getElementById('mobile-menu');

// Element for the navigation container
const navContainer = document.querySelector('.nav-container');

// Element for the menu overlay
const menuOverlay = document.createElement('div');
menuOverlay.classList.add('menu-overlay');
document.body.appendChild(menuOverlay);

// Element for the close button
const closeMenu = document.getElementById('close-menu');

// Element for the language switcher
const languageSwitcher = document.querySelector('.change-language-container');

// Event listener to toggle the 'active' class on the navigation container and overlay when the mobile menu is clicked
mobileMenu.addEventListener('click', () => {
    navContainer.classList.toggle('active');
    menuOverlay.classList.toggle('active');
    document.body.classList.toggle('menu-active'); // Add class to body
    languageSwitcher.classList.toggle('disabled'); // Disable language switcher
});

// Event listener to close the menu when the close button is clicked
closeMenu.addEventListener('click', () => {
    navContainer.classList.remove('active');
    menuOverlay.classList.remove('active');
    document.body.classList.remove('menu-active'); // Remove class from body
    languageSwitcher.classList.remove('disabled'); // Enable language switcher
});