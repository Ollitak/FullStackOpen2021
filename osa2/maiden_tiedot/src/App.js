import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'


const App = () => {
  const [filter, setFilter] = useState("")
  const [countries, setCountries] = useState([])
  const [weath, setWeath] = useState([])
  let countriesToShow = []
  

  const handleCountryChange = (event) => {
    console.log("input log: ", event.target.value)
    setFilter(event.target.value)
  }


  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all")
    .then((response) => {
      setCountries(response.data)
    }
    )  
  },[])


  useEffect(() => {
    if(countriesToShow.length === 1){
      const api_key = process.env.REACT_APP_API_KEY
      const country = countriesToShow[0].capital
      const endPointURL = "http://api.weatherapi.com/v1/current.json?key="+api_key+"&q="+country
      axios
        .get(endPointURL)
        .then((response) => {
            const list = [response.data.current.temp_c, response.data.current.wind_mph, response.data.current.wind_dir]
            setWeath(list)
          })
      }
    }, [filter]
)


  const showOneCountry = (name) => {
    const handler = () => {
      setFilter(name)
    }
    return handler
  }

  
  countries.forEach(c => {
    if(c.name.common.toLowerCase().includes(filter.toLowerCase())){
      // some langugage objects might become empty
      // if so, make them "not defined"
      const langs = (c.languages == null)
      ? {lang:"not defined"}
      : c.languages
      
      const data = {
        name: c.name.common,
        capital: c.capital,
        population: c.population,
        languages: langs,
        flags: c.flags.png
      }
      countriesToShow = countriesToShow.concat(data)
    }
  })


  if (countriesToShow.length > 10){
    return (
    <div>
        Find countries: <input value={filter} onChange={handleCountryChange} />
        <h5> Too many matches, speficy another filter </h5>
    </div>
    )

  } else if (countriesToShow.length > 1){
    return (
      <div>
        Find countries: <input value={filter} onChange={handleCountryChange} />
        <br/>
        Countries:
        <br/>
        <ul>
          {countriesToShow.map(c =>
             <li key={c.name}> 
              {c.name}
              <button onClick={showOneCountry(c.name)}> show </button>
             </li>
             
             )}
        </ul>
      </div>
      )

  } else if (countriesToShow.length === 1) {
    return (
      <div>
        Find countries: <input value={filter} onChange={handleCountryChange} />
        <br/>
        <div>
          <h1>{countriesToShow[0].name}</h1>
          <p>Capital: {countriesToShow[0].capital}</p>
          <p>Population: {countriesToShow[0].population}</p>
        </div>
        <div>
          <h3>Languages</h3>
          <ul>
            {Object.values(countriesToShow[0].languages).map(l => <li key={l}>{l}</li>)}
          </ul>
        </div>
        <div>
          <img src={countriesToShow[0].flags} alt="Country flag"></img>
        </div>
        <div>
          <h3>Weather in {countriesToShow[0].capital}</h3>
          <ul>
            <p>Temperature: {weath[0]} {" celsius"}</p>
            <p>Wind speed: {weath[1]} {" mph"}</p>
            <p>Wind direction: {weath[2]}</p>
          </ul>
        </div>
      </div>
      )

  } else {
    return(
    <div>
        Find countries: <input value={filter} onChange={handleCountryChange} />
        <br/>
        <h5> No countries found with the current input </h5>
    </div>
    )
  }

}

export default App
