import { useState, useEffect } from "react";
import axios from "axios";
import { Routes, Route } from "react-router";
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
  const [selectedCountry, setSelectedCountry] = useState<Country | undefined>(
    undefined,
  );

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

  return (
    <CountryContext.Provider
      value={{
        countriesList,
        selectedCountry,
        setSelectedCountry,
      }}
    >
      <div className="page-container">
        <Header />

        <div className="main-page-content">
          <Routes>
            <Route path="/" element={<Container countries={countriesList} />} />
            <Route path="/:name" element={<CountryData />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </CountryContext.Provider>
  );
}
