import Item from "./Item";

import "../styles/List.css";

// TypeScript types
import type { Country } from "../types/types";

interface ListProps {
  countries: Country[];
}

export default function List({ countries }: ListProps) {
  return (
    <div className="countries-list">
      {countries.map((country) => (
        <Item
          key={country.name.common}
          countryName={country.name.common}
          flag={country.flag}
          url={country.url}
        />
      ))}
    </div>
  );
}
