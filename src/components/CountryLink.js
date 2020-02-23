import { fetchAndRender } from "../countries-search";

/**
 * DOM Elements of the UI we will need to manipulate
 */
const searchInput = document.querySelector("#countries-search");

/**
 * Template for a country link with an onClick event triggering a new
 * API call to fetch countries which name match the param country name
 * @param object country containg a country information
 */
export const CountryLink = country => {
  let container = document.createElement("strong");
  let searchIcon = document.createElement("i");

  container.className = "cursor-pointer country-link";
  container.setAttribute("title", 'Search "' + country.name + '"');
  container.innerHTML = country.name;
  searchIcon.className = "fas fa-search";

  container.append(searchIcon);

  container.addEventListener("click", e => {
    searchInput.value = country.name;
    fetchAndRender(country.name);
  });

  return container;
};
