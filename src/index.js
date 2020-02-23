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

// Toogle dark mode if it has been enabled ("yes" found in cookie)
const darkModeC = "dark_mode_enabled";
const darkModeTrigger = document.querySelector("#dark-mode-trigger");
let triggerTitle = {
  yes: "Switch the lights back on!",
  no: "Dark mode"
};

const toggleDarkMode = () => {
  darkModeTrigger.classList.toggle("enabled");
  document.querySelector("body").classList.toggle("dark-mode");
  setCookie(darkModeC, yesNoToggler(readCookie(darkModeC)), 30);
  darkModeTrigger.setAttribute("title", triggerTitle[readCookie(darkModeC)]);
};

if (readCookie(darkModeC) === "yes") {
  darkModeTrigger.classList.add("enabled");
  document.querySelector("body").classList.add("dark-mode");
  darkModeTrigger.setAttribute("title", triggerTitle["yes"]);
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
