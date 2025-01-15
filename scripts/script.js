// Element for the mobile menu toggle button
const mobileMenu = document.getElementById('mobile-menu');

// Element for the navigation list
const navList = document.querySelector('.nav-list');

// Event listener to toggle the 'active' class on the navigation list when the mobile menu is clicked
mobileMenu.addEventListener('click', () => {
    navList.classList.toggle('active'); // Toggle the 'active' class to show/hide the menu
});