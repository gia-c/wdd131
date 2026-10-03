// Get the current review count
let reviewCount = Number(localStorage.getItem("reviewCount")) || 0;

// Increase the count after a successful submission
reviewCount++;

// Save the updated count
localStorage.setItem("reviewCount", reviewCount);

// Display the count
document.querySelector("#reviewCount").textContent = reviewCount;


// Footer year
const currentYear = new Date().getFullYear();
document.querySelector("#currentyear").textContent = currentYear;


// Last modified date
document.querySelector("#lastModified").textContent =
    `Last Modification: ${document.lastModified}`;
