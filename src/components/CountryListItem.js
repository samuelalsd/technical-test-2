/**
 * Template for a country result list item
 * @param object item containing a country information
 * @return node containing the detailed snippet
 */
export const CountryListItem = item => {
  let container = document.createElement("div");
  container.className = "cursor-pointer country-list-item";

  container.innerHTML = `<small>${item.alpha3Code}</small>
		<h4>${item.name}</h4>`;

  return container;
};
