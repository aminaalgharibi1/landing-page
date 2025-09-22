/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/
const sections = document.querySelectorAll("section");
const navList = document.getElementById("navbar__list");
const header = document.querySelector(".page__header");
const scrollTopBtn = document.getElementById("scrollTopBtn");

/**
/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

// to Check if a section is in viewport
    const isInViewport = (element) => {
    const rect = element.getBoundingClientRect();
    return rect.top >= -200 && rect.top <= 300;
};

// Hide navbar after inactivity
let scrollTimeout;
const hideNavbar = () => {
    header.style.top = '-60px';
};
// show navbar when activity

const showNavbar = () => {
    header.style.top = '0';
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(hideNavbar, 3000);
};

// Show or hide scroll to top button
const toggleScrollTopButton = () => {
    if (window.scrollY > window.innerHeight) {
        scrollTopBtn.style.display = 'block';
    } else {
        scrollTopBtn.style.display = 'none';
    }
};

// Scroll to top
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
const buildNav = () => {
    const fragment = document.createDocumentFragment();

    sections.forEach(section => {
        const li = document.createElement("li");
        const link = document.createElement("a");
        link.className = 'menu__link';
        link.href = `#${section.id}`;
        link.innerHTML = section.getAttribute('data-nav');

        // Scroll to section on link click
        link.addEventListener("click", (e) => {
            e.preventDefault();
            section.scrollIntoView({ behavior: 'smooth' });
        });

        li.appendChild(link);
        fragment.appendChild(li);
    });

    navList.appendChild(fragment);
};

// Add class 'active' to section when near top of viewport
const setActiveSection = () => {
    const navLinks = document.querySelectorAll(".menu__link");

    sections.forEach(section => {
        const link = [...navLinks].find(a => a.getAttribute('href') === `#${section.id}`);

        if (isInViewport(section)) {
            section.classList.add('your-active-class');
            link.classList.add('active-link');
        } else {
            section.classList.remove('your-active-class');
            link.classList.remove('active-link');
        }
    });
};

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
document.addEventListener("DOMContentLoaded", () => {
    buildNav();
    showNavbar();
});

// Set sections as active
document.addEventListener("scroll", () => {
    setActiveSection();
    showNavbar();
    toggleScrollTopButton();
});


