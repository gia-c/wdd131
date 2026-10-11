// Favorites page: groups the saved destinations by region and tracks visited places.

const visitedKey = "discoverPeruVisited";
const regionNames = ["Coast", "Highlands", "Amazon"];

const favoritesRegionSelect = document.querySelector("#favorites-region");
const favoritesTypeSelect = document.querySelector("#favorites-type");
const clearFavoritesButton = document.querySelector("#clear-favorites");
const favoritesContent = document.querySelector("#favorites-content");
const totalCount = document.querySelector("#count-total");
const coastCount = document.querySelector("#count-coast");
const highlandsCount = document.querySelector("#count-highlands");
const amazonCount = document.querySelector("#count-amazon");
const visitedProgress = document.querySelector("#visited-progress");

// Reads the visited destination ids from localStorage.
function getVisited() {
    const savedText = localStorage.getItem(visitedKey);

    if (savedText === null) {
        return [];
    }

    return JSON.parse(savedText);
}

function toggleVisited(id) {
    let visited = getVisited();

    if (visited.includes(id)) {
        visited = visited.filter(function (visitedId) {
            return visitedId !== id;
        });
    } else {
        visited.push(id);
    }

    localStorage.setItem(visitedKey, JSON.stringify(visited));
}

function createVisitedCheckbox(id) {
    let checkedAttribute = "";

    if (getVisited().includes(id)) {
        checkedAttribute = "checked";
    }

    return `
        <label class="visited-label">
            <input type="checkbox" class="visited-checkbox" data-id="${id}" ${checkedAttribute}>
            I have been here
        </label>
    `;
}

// Counts how many destinations in the list belong to one region.
function countByRegion(destinationList, regionName) {
    const regionDestinations = destinationList.filter(function (destination) {
        return destination.region === regionName;
    });

    return regionDestinations.length;
}

// Updates the numbers at the top of the page.
function showSummary(savedDestinations) {
    const savedIds = savedDestinations.map(function (destination) {
        return destination.id;
    });

    const visitedSaved = getVisited().filter(function (id) {
        return savedIds.includes(id);
    });

    totalCount.textContent = `${savedDestinations.length}`;
    coastCount.textContent = `${countByRegion(savedDestinations, "Coast")}`;
    highlandsCount.textContent = `${countByRegion(savedDestinations, "Highlands")}`;
    amazonCount.textContent = `${countByRegion(savedDestinations, "Amazon")}`;

    if (savedDestinations.length === 0) {
        visitedProgress.textContent = "Save destinations to start planning your trip.";
    } else {
        visitedProgress.textContent = `You have visited ${visitedSaved.length} of your ${savedDestinations.length} saved destinations.`;
    }
}

// Builds the cards of one region, with a heading.
function createRegionGroup(regionName, regionDestinations) {
    if (regionDestinations.length === 0) {
        return "";
    }

    const cards = regionDestinations.map(function (destination) {
        return createCard(destination, createVisitedCheckbox(destination.id));
    });

    return `
        <section class="region-group" aria-labelledby="group-${regionName}">
            <h2 id="group-${regionName}">${regionName} (${regionDestinations.length})</h2>
            <div class="card-grid">${cards.join("")}</div>
        </section>
    `;
}

function addVisitedEvents(savedDestinations) {
    const checkboxes = document.querySelectorAll(".visited-checkbox");

    checkboxes.forEach(function (checkbox) {
        checkbox.addEventListener("change", function () {
            toggleVisited(checkbox.dataset.id);
            showSummary(savedDestinations);
        });
    });
}

function showFavorites() {
    const favoriteIds = getFavorites();
    const selectedRegion = favoritesRegionSelect.value;
    const selectedType = favoritesTypeSelect.value;

    const savedDestinations = destinations.filter(function (destination) {
        return favoriteIds.includes(destination.id);
    });

    showSummary(savedDestinations);

    const filteredDestinations = savedDestinations.filter(function (destination) {
        const regionMatches = selectedRegion === "" || destination.region === selectedRegion;
        const typeMatches = selectedType === "" || destination.type === selectedType;

        return regionMatches && typeMatches;
    });

    if (savedDestinations.length === 0) {
        favoritesContent.innerHTML = `
            <div class="message">
                <p>You have not saved any destinations yet. Use the save button on a destination card and it will appear here.</p>
                <a class="button" href="destinations.html">Explore destinations</a>
            </div>
        `;
        return;
    }

    if (filteredDestinations.length === 0) {
        favoritesContent.innerHTML = `
            <div class="message">
                <p>None of your saved destinations match these filters.</p>
            </div>
        `;
        return;
    }

    const groups = regionNames.map(function (regionName) {
        const regionDestinations = filteredDestinations.filter(function (destination) {
            return destination.region === regionName;
        });

        return createRegionGroup(regionName, regionDestinations);
    });

    favoritesContent.innerHTML = groups.join("");
    addFavoriteButtonEvents(showFavorites);
    addVisitedEvents(savedDestinations);
}

function clearFavorites() {
    const confirmed = window.confirm("Remove all your saved destinations?");

    if (confirmed) {
        saveFavorites([]);
        showFavorites();
    }
}

fillSelect(favoritesTypeSelect, getUniqueValues("type"));

favoritesRegionSelect.addEventListener("change", showFavorites);
favoritesTypeSelect.addEventListener("change", showFavorites);
clearFavoritesButton.addEventListener("click", clearFavorites);

showFavorites();
