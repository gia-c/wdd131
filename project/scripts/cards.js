// Helper functions shared by the home, destinations and favorites pages.
// It needs data/destinations-data.js to be loaded first.

const favoritesKey = "discoverPeruFavorites";

// Reads the saved favorite ids from localStorage.
function getFavorites() {
    const savedText = localStorage.getItem(favoritesKey);

    if (savedText === null) {
        return [];
    }

    return JSON.parse(savedText);
}

function saveFavorites(favoriteIds) {
    localStorage.setItem(favoritesKey, JSON.stringify(favoriteIds));
}

function isFavorite(id) {
    return getFavorites().includes(id);
}

// Adds the id to the favorites, or removes it if it is already saved.
function toggleFavorite(id) {
    let favorites = getFavorites();

    if (favorites.includes(id)) {
        favorites = favorites.filter(function (favoriteId) {
            return favoriteId !== id;
        });
    } else {
        favorites.push(id);
    }

    saveFavorites(favorites);
}

// Returns a list of the different values found in one field, in alphabetical order.
function getUniqueValues(fieldName) {
    const allValues = destinations.map(function (destination) {
        return destination[fieldName];
    });

    const uniqueValues = allValues.filter(function (value, index) {
        return allValues.indexOf(value) === index;
    });

    return uniqueValues.sort();
}

// Adds one option to a select element for each value.
function fillSelect(select, values) {
    values.forEach(function (value) {
        const option = document.createElement("option");
        option.value = value;
        option.textContent = value;
        select.appendChild(option);
    });
}

function getButtonContent(saved, name) {
    if (saved) {
        return `Remove from favorites<span class="visually-hidden">: ${name}</span>`;
    }

    return `Save to favorites<span class="visually-hidden">: ${name}</span>`;
}

function createGuideLinks(guideList) {
    const links = guideList.map(function (guide) {
        return `<li><a href="${guide.url}" target="_blank" rel="noopener noreferrer">${guide.name}<span class="visually-hidden"> (opens in a new tab)</span></a></li>`;
    });

    return links.join("");
}

// Builds the HTML for one destination card.
// extraContent is optional HTML placed above the buttons.
function createCard(destination, extraContent = "") {
    const saved = isFavorite(destination.id);
    let savedClass = "";

    if (saved) {
        savedClass = " is-saved";
    }

    return `
        <article class="card">
            <img src="${destination.image}" alt="${destination.imageAlt}" width="400" height="300" loading="lazy">
            <div class="card-body">
                <p class="tags">
                    <span class="tag">${destination.region}</span>
                    <span class="tag">${destination.type}</span>
                </p>
                <h3>${destination.name}</h3>
                <p class="department">${destination.department}</p>
                <p>${destination.description}</p>
                <details class="card-details">
                    <summary>Travel tips and blog guides</summary>
                    <p><strong>Best time to visit:</strong> ${destination.bestTime}</p>
                    <h4>More guides from travel blogs</h4>
                    <ul class="guide-list">${createGuideLinks(destination.guides)}</ul>
                </details>
                ${extraContent}
                <div class="card-actions">
                    <button type="button" class="button favorite-button${savedClass}" data-id="${destination.id}" data-name="${destination.name}">${getButtonContent(saved, destination.name)}</button>
                    <a class="button button-outline" href="${destination.peruTravelUrl}" target="_blank" rel="noopener noreferrer">Learn more<span class="visually-hidden"> about ${destination.name} (opens in a new tab)</span></a>
                </div>
            </div>
        </article>
    `;
}

// Changes the look and the text of a favorite button after it is clicked.
function updateFavoriteButton(button) {
    const saved = isFavorite(button.dataset.id);

    button.classList.toggle("is-saved", saved);
    button.innerHTML = getButtonContent(saved, button.dataset.name);
}

// Adds a click event to every favorite button on the page.
// The afterToggle function runs after the favorite is saved or removed.
function addFavoriteButtonEvents(afterToggle) {
    const buttons = document.querySelectorAll(".favorite-button");

    buttons.forEach(function (button) {
        button.addEventListener("click", function () {
            toggleFavorite(button.dataset.id);
            afterToggle(button);
        });
    });
}
