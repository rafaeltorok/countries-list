import { Link, useLocation } from "react-router";
import { useEffect, useState } from "react";

// Context
import useCountryContext from "../hooks/useCountryContext";

import "../styles/CountryData.css";

export default function CountryData() {
	const [loading, setLoading] = useState(true);
	const { countriesList, selectedCountry, setSelectedCountry } = useCountryContext();
	const location = useLocation();

	// Handle matching the URL path to a specific country data
  useEffect(() => {
    if (location.pathname) {
      setSelectedCountry(
        countriesList.find((c) => c.url === location.pathname),
      );
    }
		if (selectedCountry) {
			setLoading(false);
		}
  }, [location, countriesList, selectedCountry, setSelectedCountry, setLoading]);

	// Loading screen
	if (loading) {
		return <h2>Loading information, please wait...</h2>;
	}

	// Error screen
  if (!selectedCountry) {
    return <h2>No data available</h2>;
  }

  return (
		<div>
			<div className="country-data-wrapper">
				<div className="country-name">{selectedCountry.name.common.toUpperCase()}</div>
				<br />
				<div>
					<img
						src={selectedCountry.flags.svg}
						alt={selectedCountry.flags.alt}
						className="country-flag"
					/>
				</div>
				<p>
					Capital(s): <strong>{selectedCountry.capital.join(", ")}</strong>
				</p>
				<p>
					Population:{" "}
					<strong>{selectedCountry.population.toLocaleString("de-DE")}</strong>
				</p>
				<p>
					Area: <strong>{selectedCountry.area.toLocaleString("de-DE")}</strong> km²
				</p>
				<p>
					Currency:
					<strong>
						&nbsp;{selectedCountry.currencies[Object.keys(selectedCountry.currencies)[0]].name}
						<span className="no-wrap">
							&nbsp;({Object.keys(selectedCountry.currencies)[0]} | &nbsp;
							{selectedCountry.currencies[Object.keys(selectedCountry.currencies)[0]].symbol})
						</span>
					</strong>
				</p>
				<p>
					Region: <strong>{selectedCountry.region}</strong>
				</p>
				<p>
					Subregion: <strong>{selectedCountry.subregion}</strong>
				</p>
				<p>
					Borders:{" "}
					<strong>
						{selectedCountry.borders?.length ? selectedCountry.borders.join(", ") : "None"}
					</strong>
				</p>
				<p>
					<strong>Languages:</strong>
				</p>
				<ul className="languages-list">
					{Object.entries(selectedCountry.languages).map(([key, value]) => {
						return <li key={key}>{value}</li>;
					})}
				</ul>
			</div>

			<Link to={"/"} className="return-button">
        Return
      </Link>
		</div>
  );
}
