import { useState, useEffect } from "react";
import axios from "axios";
import { Routes, Route, useSearchParams } from "react-router";
import CountryContext from "./context/context";

// Components
import Header from "./components/Header";
import Container from "./components/Container";
import CountryData from "./components/CountryData";
import Footer from "./components/Footer";

// CSS styles
import "./styles/App.css";

// TypeScript types
import type { Country } from "./types/types";

// Main component
export default function App() {
  const [countriesList, setCountriesList] = useState<Country[]>([]);
  const [countriesFound, setCountriesFound] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<Country | undefined>(
    undefined,
  );

  // React Router
  const [searchParams, setSearchParams] = useSearchParams();

  // Fetch all available countries from the API server
  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get(
          `https://studies.cs.helsinki.fi/restcountries/api/all`,
        );
        const data = await response.data;
        const mappedData = data.map((country: Country) => {
          return {
            ...country,
            url: `/${country.name.common.toLowerCase().replace(/\s+/g, "-")}`,
          };
        });
        setCountriesList(mappedData);
      } catch (err: unknown) {
        console.error(err);
      }
    }
    getData();
  }, []);

  // Update the list of countries found when a user inputs a search term
  useEffect(() => {
    const searchTerm = searchParams.get("search");

    if (searchTerm) {
      // Filter the countries list based on the user search term
      const filteredCountries = countriesList.filter((c) =>
        c.name.common.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      setCountriesFound(filteredCountries);
      setSearchParams({ search: searchTerm });
    } else {
      // Empty the array when there is no search term
      setCountriesFound([]);
    }
  }, [countriesList, searchParams, setSearchParams]);

  return (
    <CountryContext.Provider value={{
      countriesList,
      selectedCountry,
      setSelectedCountry,
    }}>
      <div className="page-container">
        <Header />

        <div className="main-page-content">
          <Routes>
            <Route path="/" element={<Container countries={countriesFound} />} />
            <Route
              path="/:name"
              element={<CountryData />}
            />
          </Routes>
        </div>

        <Footer />
      </div>
    </CountryContext.Provider>
  );
}
