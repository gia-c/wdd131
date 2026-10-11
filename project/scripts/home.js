// Home page: shows a few featured destinations.

const featuredIds = ["mancora", "paracas", "machu-picchu", "laguna-69", "colca-canyon", "tambopata"];
const featuredGrid = document.querySelector("#featured-destinations");

const featuredDestinations = destinations.filter(function (destination) {
    return featuredIds.includes(destination.id);
});

const featuredCards = featuredDestinations.map(function (destination) {
    return createCard(destination);
});

featuredGrid.innerHTML = featuredCards.join("");
addFavoriteButtonEvents(updateFavoriteButton);
