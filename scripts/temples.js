// =========================
// TEMPLE DATA
// =========================

const temples = [
    {
        templeName: "Aba Nigeria",
        location: "Aba, Nigeria",
        dedicated: "2005, August, 7",
        area: 11500,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
    },

    {
        templeName: "Manti Utah",
        location: "Manti, Utah, United States",
        dedicated: "1888, May, 21",
        area: 74792,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
    },

    {
        templeName: "Payson Utah",
        location: "Payson, Utah, United States",
        dedicated: "2015, June, 7",
        area: 96630,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
    },

    {
        templeName: "Yigo Guam",
        location: "Yigo, Guam",
        dedicated: "2020, May, 2",
        area: 6861,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
    },

    {
        templeName: "Washington D.C.",
        location: "Kensington, Maryland, United States",
        dedicated: "1974, November, 19",
        area: 156558,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
    },

    {
        templeName: "Lima Perú",
        location: "Lima, Perú",
        dedicated: "1986, January, 10",
        area: 9600,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
    },

    {
        templeName: "Mexico City Mexico",
        location: "Mexico City, Mexico",
        dedicated: "1983, December, 2",
        area: 116642,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
    },

    {
        templeName: "Rome Italy",
        location: "Rome, Italy",
        dedicated: "2019, March, 10",
        area: 41010,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/rome-italy/2019/400x250/5-Rome-Temple-2160345.jpg"
    },

    {
        templeName: "Arequipa Peru",
        location: "Arequipa, Peru",
        dedicated: "2019, December, 15",
        area: 26969,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/arequipa-peru/400x250/4-48661c257177c19a0f39a3991b1a7e7aa0338487.jpeg"
    },

    {
        templeName: "St. George Utah",
        location: "St. George, Utah, United States",
        dedicated: "1877, April, 6",
        area: 13375,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/st-george-utah/400x250/st-george-temple-lds-894724-wallpaper.jpg"
    }
];


// =========================
// SELECT HTML ELEMENTS
// =========================

const templeGrid = document.querySelector("#temple-grid");
const pageTitle = document.querySelector("#page-title");


// =========================
// DISPLAY TEMPLES
// =========================

function displayTemples(templeList) {

    templeGrid.innerHTML = "";

    templeList.forEach((temple) => {

        const figure = document.createElement("figure");

        const image = document.createElement("img");
        image.src = temple.imageUrl;
        image.alt = temple.templeName;
        image.loading = "lazy";

        const figcaption = document.createElement("figcaption");

        figcaption.innerHTML = `
            <h2>${temple.templeName}</h2>
            <p><strong>Location:</strong> ${temple.location}</p>
            <p><strong>Dedicated:</strong> ${formatDate(temple.dedicated)}</p>
            <p><strong>Area:</strong> ${temple.area.toLocaleString()} sq ft</p>
        `;

        figure.appendChild(image);
        figure.appendChild(figcaption);

        templeGrid.appendChild(figure);
    });
}


// =========================
// FORMAT DEDICATION DATE
// =========================

function formatDate(dateString) {

    const parts = dateString.split(", ");

    const year = parts[0];
    const month = parts[1];
    const day = parts[2];

    return `${month} ${day}, ${year}`;
}


// =========================
// HOME
// =========================

document.querySelector("#home").addEventListener("click", (event) => {

    event.preventDefault();

    displayTemples(temples);

    pageTitle.textContent = "Home";
});


// =========================
// OLD
// Before 1900
// =========================

document.querySelector("#old").addEventListener("click", (event) => {

    event.preventDefault();

    const oldTemples = temples.filter((temple) => {
        const year = Number(temple.dedicated.split(", ")[0]);

        return year < 1900;
    });

    displayTemples(oldTemples);

    pageTitle.textContent = "Old Temples";
});


// =========================
// NEW
// After 2000
// =========================

document.querySelector("#new").addEventListener("click", (event) => {

    event.preventDefault();

    const newTemples = temples.filter((temple) => {
        const year = Number(temple.dedicated.split(", ")[0]);

        return year > 2000;
    });

    displayTemples(newTemples);

    pageTitle.textContent = "New Temples";
});


// =========================
// LARGE
// More than 90,000 sq ft
// =========================

document.querySelector("#large").addEventListener("click", (event) => {

    event.preventDefault();

    const largeTemples = temples.filter((temple) => {
        return temple.area > 90000;
    });

    displayTemples(largeTemples);

    pageTitle.textContent = "Large Temples";
});


// =========================
// SMALL
// Less than 10,000 sq ft
// =========================

document.querySelector("#small").addEventListener("click", (event) => {

    event.preventDefault();

    const smallTemples = temples.filter((temple) => {
        return temple.area < 10000;
    });

    displayTemples(smallTemples);

    pageTitle.textContent = "Small Temples";
});


// =========================
// HAMBURGER MENU
// =========================

const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#navigation");

menuButton.addEventListener("click", () => {

    const isOpen = navigation.classList.toggle("open");

    menuButton.textContent = isOpen ? "✕" : "☰";

    menuButton.setAttribute("aria-expanded", isOpen);

    menuButton.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );
});


// =========================
// FOOTER
// =========================

document.querySelector("#currentyear").textContent =
    new Date().getFullYear();

document.querySelector("#lastModified").textContent =
    `Last Modified: ${document.lastModified}`;


// =========================
// INITIAL DISPLAY
// =========================

displayTemples(temples);