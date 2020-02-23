import {
  emptySearchResults,
  emptyDetailedSnippet,
  fetchAndRender
} from "./countries-search";
import { delay, readCookie, setCookie, yesNoToggler } from "./helpers";

import "./styles.css";

/**
 * DOM Elements of the UI we will need to manipulate
 */
const searchInput = document.querySelector("#countries-search");
const clearSearchBtn = document.querySelector("#clear-search-btn");
const resultsList = document.querySelector("#countries-search-results-list");
const resultSnippet = document.querySelector(
  "#countries-search-results-snippet"
);

/**
 * Respond to the user search request by populating the UI with the
 * search results list and a detailed snippet of the first result item.
 * @param string keywords containing user search keywords
 */
const searchAndUpdateView = keywords => {
  let authorizedString = new RegExp(/^[a-z A-Z\u00C0-\u00FF]*$/);
  keywords = keywords.trim();

  if (keywords.match(authorizedString) && keywords !== "") {
    fetchAndRender(keywords);
  } else {
    emptySearchResults();
    emptyDetailedSnippet();
  }
};

/**
 * Cookies & Session related settings
 */

const darkModeC = "dark_mode_enabled";
const darkModeTrigger = document.querySelector("#dark-mode-trigger");
let triggerTitleAttr = {
  yes: "Light mode",
  no: "Dark mode"
};

// Function that toggles dark/light modes
const toggleDarkMode = () => {
  darkModeTrigger.classList.toggle("enabled");
  document.querySelector("body").classList.toggle("dark-mode");
  setCookie(darkModeC, yesNoToggler(readCookie(darkModeC)), 30);
  darkModeTrigger.setAttribute(
    "title",
    triggerTitleAttr[readCookie(darkModeC)]
  );
};

// Toogle dark mode if it has been enabled ("yes" found in cookie)
if (readCookie(darkModeC) === "yes") {
  darkModeTrigger.classList.add("enabled");
  document.querySelector("body").classList.add("dark-mode");
  darkModeTrigger.setAttribute("title", triggerTitleAttr["yes"]);
}

/**
 * Event Listeners
 * Handle user interactions with the interface
 */

// Trigger application dark mode
darkModeTrigger.addEventListener("click", toggleDarkMode);

// Listen to keyup on search input
searchInput.addEventListener("keyup", e => {
  if (e.target.value) {
    searchInput.parentNode.classList.add("not-empty");
    delay(searchAndUpdateView(e.target.value), 1000);
  } else {
    searchInput.parentNode.classList.remove("not-empty");
  }
});

// Clear search on user request (click on the dedicated button)
clearSearchBtn.addEventListener("click", e => {
  searchInput.value = "";
  searchInput.parentNode.classList.remove("not-empty");
});

// Adjust layout when resizing screen
// window.addEventListener("resize", e => {
//   let snippet = document.querySelector(".country-detailed-snippet");
//   if (window.innerWidth < 768) {
//     resultsList
//       .querySelector(".country-list-item.selected")
//       .insertAdjacentElement("afterend", snippet);
//   } else {
//     resultSnippet.appendChild(snippet);
//   }
// });
