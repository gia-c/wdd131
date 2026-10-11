// Code shared by every page: the menu button and the footer year.

const menuButton = document.querySelector(".menu-toggle");
const mainNav = document.querySelector("#main-nav");
const copyright = document.querySelector("#copyright");

// Opens or closes the navigation menu on small screens.
function toggleMenu() {
    const isOpen = mainNav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", isOpen);
}

// Writes the current year in the footer.
function showCopyright() {
    const currentYear = new Date().getFullYear();
    copyright.textContent = `© ${currentYear} Discover Peru`;
}

menuButton.addEventListener("click", toggleMenu);
showCopyright();
