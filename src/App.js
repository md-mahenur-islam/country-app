  import { useState, useEffect } from "react";
import { Countries } from "./Components/Countries";
import "./App.css"
import Search from "./Components/Search";


  const url ="https://restcountries.com/v3.1/all"
  function App() {

  const [isLoading,setIsLoading] = useState(true);
  const [error,setError] = useState(null);
  const [countries,setCountries] = useState([]);
  const [filteredCountries,setFilteredCountries] = useState(countries);


  const fetchData = async(url)=>{
    setIsLoading(true);
    try{
      const response = await fetch(url);
    const data = await response.json();
    setCountries(data);
    setIsLoading(false);
    setFilteredCountries(data);
    setError(null);
    console.log(countries);
    }catch(error){
      setIsLoading(false);
      setError(error)
    }
  }

  useEffect(() => {
    fetchData(url);
  }, []);

  const handleRemoveCountry = (name)=>{
    const filter = filteredCountries.filter((country)=>
      country.name.common !== name
    );

    setFilteredCountries(filter);
    alert(name);

  }

    const handleSearch = (searchValue)=>{
        let value = searchValue.toLowerCase();
        const countriesNew = countries.filter((country)=>{
          const countryName = country.name.common.toLowerCase();

          return countryName.startsWith(value);
        });
        setFilteredCountries(countriesNew);
    }

    return (
      <>
        <h1>Country App</h1>
        <Search onSearch = {handleSearch}/>
        {isLoading && <h2>Loding...</h2>}
        {error && <h2>{error.message}</h2>}
        {countries && <Countries countries = {filteredCountries} onRemoveCountry={handleRemoveCountry}/>}

      </>
    );
  }

  export default App;
