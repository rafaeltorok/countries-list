import { useSearchParams } from "react-router";

// Components
import List from "./List";
import Notification from "./Notification";

// TypeScript types
import type { Country } from "../types/types";

interface ContainerProps {
  countries: Country[];
}

import "../styles/Container.css";

export default function Container({ countries }: ContainerProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  // Filter the countries list based on the user search term
  const filteredCountries = countries.filter((c) =>
    c.name.common.toLowerCase().includes((searchParams.get("search") || "").toLowerCase()),
  );

  // Add a delay of 300ms between the user typing and updating the page
  const handleSearchCountry = (term: string) => {
    const handler = setTimeout(() => {
      setSearchParams({ search: term });
    }, 300);

    return () => clearTimeout(handler);
  };

  return (
    <div>
      <div className="search-container">
        <label htmlFor="search-field">Search country: </label>
        <input
          type="search"
          id="search-field"
          name="search-field"
          defaultValue={searchParams.get("search") || ""}
          onChange={(e) => handleSearchCountry(e.target.value)}
        />
      </div>

      {/* Handle displaying the Countries list when there is a search term available */}
      {filteredCountries.length > 0 && filteredCountries.length <= 10 ? (
        <List countries={filteredCountries} />
      ) : (
        <Notification
          listSize={filteredCountries.length}
          searchTerm={searchParams.get("search")}
        />
      )}
    </div>
  );
}
