import Papa from 'papaparse';
import countries from "./countries.csv";
import React from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';


function sortCountries(sortOrder, countries) {
  console.log(sortOrder)
  if (sortOrder === 'asc') {
    return countries.sort(function (a, b) { return a.name.localeCompare(b.name) });
  } else if (sortOrder === 'des') {
    return countries.sort(function (a, b) { return b.name.localeCompare(a.name) });
  } else if (sortOrder === '+pop') {
    return countries.sort(function (a, b) { return b.population - a.population });
  } else if (sortOrder === '-pop') {
    return countries.sort(function (a, b) { return a.population - b.population });
  } else {
    return countries.sort(o => o.name);
  }
}
function showModal(){
  alert(3)
}
function fetchModalData(w){
  const logFileText = async file => {
      const response = await fetch(file)
      const text = await response.text()
      //console.log(text)
      
      document.getElementById('blue').innerHTML=text
  }
  const txt = logFileText(w)
  return txt;
}

function lower(w){return w.toLowerCase();}
function formattedNumberDefault(p){return Number(p).toLocaleString()}

function Country(props){

  const country = props.country
  //console.log(country)
  //debugger
  return <div key={country.name}

    className={`${country.subregion} ${country.continent}`}
    style={{
      backgroundColor: country.HEX,
      margin: '10px',
    }}>

    <Card style={{ width: '18rem' }} >
      <Card.Img variant="top" src={`https://flagcdn.com/${lower(country.abbreviation)}.svg`} alt={`flag of ${country.name}`} />
      <Card.Body>
        <Card.Title>{country.name}</Card.Title>
        <Card.Text>
          Region: {country.continent}<br />
          Population: {formattedNumberDefault(country.population)}<br />
          Capital: {country.capital}
        </Card.Text>
        <Button variant="primary" onClick={showModal}>Show more</Button>
      </Card.Body>
    </Card>

  </div>
}


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: null, lightOrDark: '', temp: '', sortOrder: '', showmodel: '', };
  }

  async componentDidMount() {
    const response = await fetch(countries);
    const csvText = await response.text();
    const parsedData = Papa.parse(csvText, { header: true }).data;
    this.setState({ data: parsedData });
  }

  render() {
    const { data, lightOrDark, temp, sortOrder } = this.state;

    if (data === null) {
      return 'loading...'
    }

    function filterContries(lightOrDark, country) {
      if (lightOrDark === 'africa') {
        return country.continent === 'Africa'
      } else if (lightOrDark === 'asia') {
        return country.continent === 'Asia'
      } else if (lightOrDark === 'europe') {
        return country.continent === 'Europe'
      } else if (lightOrDark === 'oceania') {
        return country.continent === 'Oceania'
      } else if (lightOrDark === 'northamerica') {
        return country.continent === 'North America'
      } else if (lightOrDark === 'southamerica') {
        return country.continent === 'South America'
      } else {
        return true
      }
    }
    // function filterTemp(temp, color) {
    //   if (temp === 'warm') {
    //     return color.temp === 'warm'
    //   } else if (temp === 'cool') {
    //     return color.temp === 'cool'
    //   } else {
    //     return true
    //   }
    // }
    

    const filteredCountries = data.filter(
      country => filterContries(lightOrDark, country) //&& filterTemp(temp, color)
    )
    const sortedCountries = sortCountries(sortOrder, filteredCountries)
    const countries = sortedCountries.map(country => {
      return <Country country={country}/>
      
    })

    console.log(countries[0])
    return (
      <div>
        <label htmlFor="options">Choose an option</label>
        <select onChange={(event) => {
          this.setState({ lightOrDark: event.target.value })
        }}>
          <option value="all">Show all</option>
          <option value="africa">Africa</option>
          <option value="asia">Asia</option>
          <option value="europe">Europe</option>
          <option value="oceania">Oceania</option>
          <option value="northamerica">North America</option>
          <option value="southamerica">South America</option>
        </select>
        {/* <select onChange={(event) => {
          this.setState({ temp: event.target.value })
        }}>
          <option value="all">Show all</option>
          <option value="warm">Warm Only</option>
          <option value="cool">Cool Only</option>
        </select> */}
        
        <select onChange={(event) => {
          this.setState({ sortOrder: event.target.value })
        }}>
          <option value="asc">asc </option>
          <option value="des">des </option>
          <option value="+pop">population asc</option>
          <option value="-pop">population dec</option>
        </select>

        <div className="App" style={{
          display: 'flex',
          width: '80%',
          margin: '10px auto',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }} >
          {countries}
        </div>
      </div>
    );
  }
}

export default App;