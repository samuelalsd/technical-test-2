import apiClient from "./apiClient";
import { CountryListItem } from "./components/CountryListItem";
import { CountryDetailedSnippet } from "./components/CountryDetailedSnippet";
import { CountryLink } from "./components/CountryLink";

/**
 * DOM Elements of the UI we will need to manipulate
 */
const resultsList = document.querySelector("#countries-search-results-list");
const resultSnippet = document.querySelector(
  "#countries-search-results-snippet"
);

/**
 * Async API call to fetch a country's border countries names
 * @param object country containing a country information
 */
const fetchBorderCountries = async country => {
  const listElement = document.querySelector("#border-countries-list");
  if (country.borders.length) {
    try {
      const response = await apiClient.countries.fetchAllMatchingCodes(
        country.borders
      );
      const result = await response.json();

      if (result.length) {
        listElement.innerHTML = "";
        result.forEach(item => {
          listElement.append(CountryLink(item));
        });
      } else {
        listElement.innerHTML = "None";
      }
    } catch (err) {
      console.log(err);
    }
  } else {
    listElement.innerHTML = "None";
  }
};

/**
 * Append country result list items
 * @param array result containing countries that matched user search query
 */
const showCountriesSearchResults = result => {
  resultsList.innerHTML = "";

  result.forEach(item => {
    // Create a CountryListItem element
    let listItem = CountryListItem(item);

    // Show detailed snippet on the corresponding
    // country when user clicks on the list item
    listItem.addEventListener("click", e => {
      resultsList
        .querySelectorAll(".country-list-item")
        .forEach(item => item.classList.remove("selected"));

      listItem.classList.add("selected");
      showCountryDetailedSnippet(item);
    });

    // Append item to the list
    resultsList.appendChild(listItem);
  });
};

/**
 * Show detailed snippet of request country
 * @param object country containing a country information
 */
export const showCountryDetailedSnippet = country => {
  emptyDetailedSnippet();

  let snippet = CountryDetailedSnippet(country);

  if (window.innerWidth < 768) {
    resultsList
      .querySelector("#country-list-item-" + country.alpha3Code)
      .insertAdjacentElement("afterend", snippet);
  } else {
    resultSnippet.appendChild(snippet);
  }

  setTimeout(function() {
    fetchBorderCountries(country);
  }, 500);
};

/**
 * Empty the search results list
 */
export const emptySearchResults = () => {
  resultsList.innerHTML = "No result found...";
};

/**
 * Empty the detailed snippet container
 */
export const emptyDetailedSnippet = () => {
  resultSnippet.innerHTML = "";
  document.querySelectorAll(".country-detailed-snippet").forEach(snippet => {
    snippet.remove();
  });
};

/**
 * API call to fetch all countries which name match with user request
 * and display the result (list & detailed snippet of the first item)
 * @param string terms containing user search keywords
 */
export const fetchAndRender = terms => {
  apiClient.countries
    .fetchAllMatchingName(terms)
    .then(response => response.json())
    .then(result => {
      if (result.length) {
        showCountriesSearchResults(result);
        showCountryDetailedSnippet(result[0]);

        resultsList.querySelector(":first-child").classList.add("selected");
      } else {
        emptySearchResults();
        emptyDetailedSnippet();
      }
    });
};
