export interface Country {
  name: {
    common: string;
  };
  flags: {
    svg: string;
    alt: string;
  };
  capital: string[];
  population: number;
  area: number;
  currencies: Currency;
  region: string;
  subregion: string;
  borders: string[];
  languages: Language;
  flag: string;
  url: string;
}

interface Currency {
  [key: string]: {
    name: string;
    symbol: string;
  };
}

interface Language {
  [key: string]: string;
}

export type CountryContextType = {
  countriesList: Country[];
  selectedCountry: Country | undefined;
  setSelectedCountry: (country: Country) => void;
};
