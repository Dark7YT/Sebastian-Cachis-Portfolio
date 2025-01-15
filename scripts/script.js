// Element for the mobile menu toggle button
const mobileMenu = document.getElementById('mobile-menu');

// Element for the navigation container
const navContainer = document.querySelector('.nav-container');

// Element for the menu overlay
const menuOverlay = document.createElement('div');
menuOverlay.classList.add('menu-overlay');
document.body.appendChild(menuOverlay);

// Event listener to toggle the 'active' class on the navigation container and overlay when the mobile menu is clicked
mobileMenu.addEventListener('click', () => {
    navContainer.classList.toggle('active');
    menuOverlay.classList.toggle('active');
});

// Event listener to close the menu when the overlay is clicked
menuOverlay.addEventListener('click', () => {
    navContainer.classList.remove('active');
    menuOverlay.classList.remove('active');
});