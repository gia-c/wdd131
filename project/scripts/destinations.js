// Destinations page: shows all destinations and filters them.

const regionSelect = document.querySelector("#region-filter");
const departmentSelect = document.querySelector("#department-filter");
const typeSelect = document.querySelector("#type-filter");
const searchInput = document.querySelector("#search-filter");
const clearButton = document.querySelector("#clear-filters");
const resultCount = document.querySelector("#result-count");
const destinationList = document.querySelector("#destination-list");

// Shows only the destinations that match the filters.
function showDestinations() {
    const selectedRegion = regionSelect.value;
    const selectedDepartment = departmentSelect.value;
    const selectedType = typeSelect.value;
    const searchText = searchInput.value.trim().toLowerCase();

    const matches = destinations.filter(function (destination) {
        const regionMatches = selectedRegion === "" || destination.region === selectedRegion;
        const departmentMatches = selectedDepartment === "" || destination.department === selectedDepartment;
        const typeMatches = selectedType === "" || destination.type === selectedType;

        // The id has no accents, so people can search "mancora" and find "Máncora".
        const searchableText = `${destination.name} ${destination.id.replaceAll("-", " ")} ${destination.department}`.toLowerCase();
        const searchMatches = searchableText.includes(searchText);

        return regionMatches && departmentMatches && typeMatches && searchMatches;
    });

    if (matches.length === 0) {
        destinationList.innerHTML = `
            <div class="message">
                <p>No destinations match your filters. Try another region, department, type, or keyword.</p>
            </div>
        `;
    } else {
        const cards = matches.map(function (destination) {
            return createCard(destination);
        });

        destinationList.innerHTML = cards.join("");
        addFavoriteButtonEvents(updateFavoriteButton);
    }

    let destinationWord = "destinations";

    if (matches.length === 1) {
        destinationWord = "destination";
    }

    resultCount.textContent = `Showing ${matches.length} of ${destinations.length} ${destinationWord}`;
}

// Puts all filters back to their first option.
function clearFilters() {
    regionSelect.value = "";
    departmentSelect.value = "";
    typeSelect.value = "";
    searchInput.value = "";
    showDestinations();
}

// The home page links use the address destinations.html?region=Coast
function selectRegionFromAddress() {
    const addressParameters = new URLSearchParams(window.location.search);
    const regionFromAddress = addressParameters.get("region");

    if (regionFromAddress !== null) {
        regionSelect.value = regionFromAddress;
    }
}

fillSelect(departmentSelect, getUniqueValues("department"));
fillSelect(typeSelect, getUniqueValues("type"));
selectRegionFromAddress();

regionSelect.addEventListener("change", showDestinations);
departmentSelect.addEventListener("change", showDestinations);
typeSelect.addEventListener("change", showDestinations);
searchInput.addEventListener("input", showDestinations);
clearButton.addEventListener("click", clearFilters);

showDestinations();
