import { useState, useEffect } from 'react';
import axios from 'axios';

import List from './components/List';
import CountryData from './components/CountryData';
import Notification from './components/Notification';

import './App.css';

import type { Country } from './types/types';

export default function App() {
  const [countriesList, setCountriesList] = useState<Country[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [countriesFound, setCountriesFound] = useState<Country[]>([]);

  // Fetch all available countries from the API server
  useEffect(() => {
    axios.get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(response => setCountriesList(response.data))
      .catch(error => console.error(error));
  }, []);

  // Update the list of countries found when a user inputs a search term
  useEffect(() => {
    if (searchTerm) {
      const filteredCountries = (
        countriesList.filter(
          c => c.name.common.toLowerCase().includes(searchTerm.toLowerCase()
        ))
      );
      setCountriesFound(filteredCountries);
    } else {
      setCountriesFound([]);
    }
  }, [searchTerm]);

  // Add a delay of 500ms between the user typing and updating the page
  const handleSearchCountry = (term: string) => {
    const handler = setTimeout(() => {
      setSearchTerm(term);
    }, 300);
  
    return () => clearTimeout(handler);
  };

  const handleButtonClick = (country: Country) => {
    setCountriesFound([country]);
  }

  return (
    <>
      <div>
        <label htmlFor='search-field'>Search country: </label>
        <input
          type='search'
          id='search-field'
          name='search-field'
          onChange={(e) => handleSearchCountry(e.target.value)}
        />
      </div>
      
      {/* Handle displaying the Countries list when there is a search term available */}
      {countriesFound.length > 0 && countriesFound.length <= 10 ? (
        <>
          {countriesFound.length > 1 ? (
            <ul className='countries-list'>
              {countriesFound.map(country => (
                <List 
                  key={country.name.common} 
                  countryName={country.name.common} 
                  listSize={countriesFound.length}
                  handleButtonClick={() => handleButtonClick(country)}
                  flag={country.flag}
                />
              ))}
            </ul>
          ) : (
            <CountryData country={countriesFound[0]} />
          )}
        </>
      ) : (
        <Notification listSize={countriesFound.length} searchTerm={searchTerm} />
      )}
    </>
  );
}
