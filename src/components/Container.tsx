import { useSearchParams } from "react-router";
import "../styles/Container.css";

// Components
import List from "./List";
import Notification from "./Notification";

// TypeScript types
import type { Country } from "../types/types";

interface ContainerProps {
  countries: Country[];
}

export default function Container({ countries }: ContainerProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  // Add a delay of 500ms between the user typing and updating the page
  const handleSearchCountry = (term: string) => {
    const handler = setTimeout(() => {
      setSearchParams({ search: term });
    }, 300);
  
    return () => clearTimeout(handler);
  };

  return (
    <div>
      <div className="search-container">
        <label htmlFor='search-field'>Search country: </label>
        <input
          type='search'
          id='search-field'
          name='search-field'
          defaultValue={searchParams.get("search") || ""}
          onChange={(e) => handleSearchCountry(e.target.value)}
        />
      </div>

      {/* Handle displaying the Countries list when there is a search term available */}
      {countries.length > 0 && countries.length <= 10 ? (
        <List countries={countries} />
      ) : (
        <Notification listSize={countries.length} searchTerm={searchParams.get("search") || ""} />
      )}
    </div>
  );
}
