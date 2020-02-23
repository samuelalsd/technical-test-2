import { humanizeNumber } from "../helpers";

/**
 * Template for a country result detailed snippet
 * @param object item containing a country information
 * @return node containing the detailed snippet
 */
export const CountryDetailedSnippet = item => {
  let container = document.createElement("div");
  container.className = "country-detailed-snippet";

  container.innerHTML = `<div class="country-detailed-snippet-header">
			<div class="row justify-start align-start">
				<div class="country-flag">
					<img src="${item.flag}" alt="${item.name}" />
				</div>
				<div class="country-main-info">
					<div class="row justify-between align-start country-names">
						<h3 class="country-name">${item.nativeName}</h3>
						<em>${item.alpha3Code}, ${item.alpha2Code}</em>
					</div>
					<div class="country-demographic-data">
						<span>
							<i class="fas fa-flag"></i> ${item.capital}
						</span>
						<span title="${item.population}">
							<i class="fas fa-users"></i> ${humanizeNumber(item.population)}
						</span>
						<span>
							<i class="fas fa-clock"></i> ${item.timezones[0]}
						</span>
					</div>
				</div>
			</div>
		</div>
		<div class="country-detailed-snippet-body">
			<div class="row card-info-row">
				<label>Languages</label>
				<div>
					${item.languages.map(l => "<strong>" + l.name + "</strong>").join("<br>")}
				</div>
			</div>
			<div class="row card-info-row">
				<label>Currencies</label>
				<div>
					${item.currencies
            .map(c => {
              let symbol = c.symbol
                ? '<span class="tag">' + c.symbol + "</span>"
                : "";
              let code = c.code ? "(" + c.code + ")" : "";
              return symbol + " <strong>" + c.name + "</strong> " + code;
            })
            .join("<br>")}
				</div>
			</div>
			<div class="row card-info-row">
				<label>Border countries</label>
				<div id="border-countries-list">Loading...</div>
			</div>
		</div>`;

  return container;
};
