import { Link, useLocation } from "react-router";
import { useEffect } from "react";

// Context
import useCountryContext from "../hooks/useCountryContext";

import "../styles/CountryData.css";

export default function CountryData() {
  const { countriesList, selectedCountry, setSelectedCountry } =
    useCountryContext();
  const location = useLocation();

  // Handle matching the URL path to a specific country data
  useEffect(() => {
    if (location.pathname) {
      setSelectedCountry(
        countriesList.find(
          (c) => c.url === decodeURIComponent(location.pathname),
        ),
      );
    }
  }, [location, countriesList, selectedCountry, setSelectedCountry]);

  // Error screen
  if (!selectedCountry) {
    return <h2>No data available</h2>;
  }

  return (
    <div>
      <div className="country-data-wrapper">
        <div className="country-name">
          {selectedCountry.name.common.toUpperCase()}
        </div>
        <br />

        {/* Flag */}
        <div>
          <img
            src={selectedCountry.flags.svg}
            alt={selectedCountry.flags.alt}
            className="country-flag"
          />
        </div>

        {/* Capital(s) */}
        <div className="country-data-row">
          <div className="row-label">
            Capital(s):
          </div>
          <div className="row-data">
            {selectedCountry.capital.join(", ")}
          </div>
        </div>

        {/* Population */}
        <div className="country-data-row">
          <div className="row-label">
            Population:{" "}
          </div>
          <div className="row-data">
            {selectedCountry.population.toLocaleString("de-DE")}
          </div>
        </div>

        {/* Area */}
        <div className="country-data-row">
          <div className="row-label">
            Area:
          </div>
          <div className="row-data">
            {selectedCountry.area.toLocaleString("de-DE")} km²
          </div>
        </div>

        {/* Currency */}
        <div className="country-data-row">
          <div className="row-label">
            Currency:
          </div>
          <div className="row-data">
            &nbsp;
            {
              selectedCountry.currencies[
                Object.keys(selectedCountry.currencies)[0]
              ].name
            }
            <span className="no-wrap">
              &nbsp;({Object.keys(selectedCountry.currencies)[0]} | &nbsp;
              {
                selectedCountry.currencies[
                  Object.keys(selectedCountry.currencies)[0]
                ].symbol
              }
              )
            </span>
          </div>
        </div>

        {/* Region (Continent) */}
        <div className="country-data-row">
          <div className="row-label">
            Region:
          </div>
          <div className="row-data">
            {selectedCountry.region}
          </div>
        </div>

        {/* Subregion (Continent subregion) */}
        <div className="country-data-row">
          <div className="row-label">
            Subregion:
          </div>
          <div className="row-data">
            {selectedCountry.subregion}
          </div>
        </div>

        {/* Borders (Countries who share their borders with) */}
        <div className="country-data-row">
          <div className="row-label">
            Borders:
          </div>
          <div className="row-data">
            {selectedCountry.borders?.length
              ? selectedCountry.borders.join(", ")
              : "None"}
          </div>
        </div>

        {/* Official language(s) */}
        <div className="country-data-row">
          <div className="row-label">
            Languages:
          </div>
          <div className="row-data">
            <ul className="languages-list">
              {Object.entries(selectedCountry.languages).map(([key, value]) => {
                return <li key={key}>{value}</li>;
              })}
            </ul>
          </div>
        </div>
      </div>

      {/* Return to the main page button */}
      <Link to={"/"} className="return-button">
        Return
      </Link>
    </div>
  );
}
