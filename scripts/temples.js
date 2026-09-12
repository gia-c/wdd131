// =========================
// FOOTER
// =========================

const currentYear = new Date().getFullYear();

document.querySelector("#currentyear").textContent = currentYear;

document.querySelector("#lastModified").textContent =
    `Last Modified: ${document.lastModified}`;


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
// TEMPLE FILTERS
// =========================

const figures = document.querySelectorAll(".temple-grid figure");
const pageTitle = document.querySelector("#page-title");

function showAllTemples(title) {
    figures.forEach((figure) => {
        figure.style.display = "block";
    });

    pageTitle.textContent = title;
}

function filterTemples(attribute, value, title) {
    figures.forEach((figure) => {
        if (figure.dataset[attribute] === value) {
            figure.style.display = "block";
        } else {
            figure.style.display = "none";
        }
    });

    pageTitle.textContent = title;
}


// ---------- Home ----------

document.querySelector("#navigation a[href='index.html']")
    .addEventListener("click", () => {
        showAllTemples("Home");
    });


// ---------- Old ----------

document.querySelector("#old").addEventListener("click", (event) => {
    event.preventDefault();

    filterTemples("year", "old", "Old Temples");
});


// ---------- New ----------

document.querySelector("#new").addEventListener("click", (event) => {
    event.preventDefault();

    filterTemples("year", "new", "New Temples");
});


// ---------- Large ----------

document.querySelector("#large").addEventListener("click", (event) => {
    event.preventDefault();

    filterTemples("size", "large", "Large Temples");
});


// ---------- Small ----------

document.querySelector("#small").addEventListener("click", (event) => {
    event.preventDefault();

    filterTemples("size", "small", "Small Temples");
});