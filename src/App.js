import Papa from "papaparse";
import countries from "./countries.csv";
import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import Markdown from "react-markdown";

async function fetchModalData(file) {
  const response = await fetch(file);
  const text = await response.text();
  return text;
}

function filterSearch(query, country) {
  //console.log(query)
  if (country.name.toLowerCase().startsWith(query.toLowerCase())) {
    //console.log(country)

    return country
  }
}
function sortCountries(sortOrder, countries) {
  //console.log(sortOrder)
  if (sortOrder === "asc") {
    return countries.sort(function (a, b) {
      return a.name.localeCompare(b.name);
    });
  } else if (sortOrder === "des") {
    return countries.sort(function (a, b) {
      return b.name.localeCompare(a.name);
    });
  } else if (sortOrder === "+pop") {
    return countries.sort(function (a, b) {
      return b.population - a.population;
    });
  } else if (sortOrder === "-pop") {
    return countries.sort(function (a, b) {
      return a.population - b.population;
    });
  } else {
    return countries.sort((o) => o.name);
  }
}
function lower(w) {
  return w.toLowerCase();
}
function formattedNumberDefault(p) {
  return Number(p).toLocaleString();
}
function Country(props) {
  const [show, setShow] = useState(false);
  const [data, setData] = useState(null);
  const country = props.country;
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = async () => {
    setShow(true);
    const fetchData = await fetchModalData("text.txt");
    //console.log(data)
    setData(fetchData);
  };
  //console.log(country.capital_latitude)
  const map =
    "https://maps.google.com/maps?q=" +
    country.capital_latitude +
    "," +
    country.capital_longitude +
    "&amp;z=6&amp;output=embed";
  //debugger
  //console.log(map)
  const map2 = `                      <iframe 
            title={country.name}
width="100%" 
height="480" 
frameborder="0" 
scrolling="no" 
marginheight="0" 
marginwidth="0"
src="https://maps.google.com/maps?q=${country.capital_latitude},${country.capital_longitude}&amp;z=6&amp;output=embed">

<a href="https://www.google.com/maps/12.37,-1.52,4z" target="_blank">
See full page map
</a></iframe>`;
  return (
    <div
      key={country.name}
      className={`${country.subregion} ${country.continent}`}
      style={{
        backgroundColor: country.HEX,
        margin: "10px",
      }}
    >
      <Card style={{ width: "18rem" }}>
        <Card.Img
          variant="top"
          src={`https://flagcdn.com/${lower(country.abbreviation)}.svg`}
          alt={`flag of ${country.name}`}
        />
        <Card.Body>
          <Card.Title>{country.name}</Card.Title>
          <Card.Text>
            Region: {country.continent}
            <br />
            Population: {formattedNumberDefault(country.population)}
            <br />
            Capital: {country.capital}
            {/* <iframe 
           title={country.name}
            width="100%" 
            height="480" 
            frameborder="0" 
            scrolling="no" 
            marginheight="0" 
            marginwidth="0"
            
            src= "https://maps.google.com/maps?q=12.37,-1.52&amp;z=6&amp;output=embed">
            <br/>
            <a href={`https://www.google.com/maps/@${country.capital_latitude},${country.capital_longitude},${7}z" target="_blank`}>
            See full page map
            </a></iframe>  */}
          </Card.Text>
          <Button variant="primary" onClick={handleShow}>
            Show more
          </Button>
        </Card.Body>
      </Card>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{country.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Population: {country.population}
          <br />
          Region: {country.continent}
          <br />
          Capital: {country.capital}
          <br />
          Subregion: {country.subregion}
          <br />
          Map: <a href={`${country.map_google}`}target="blank">map</a> 
          <br /> 
          Wiki: <a href={`https://en.wikipedia.org/wiki/${country.name}`}target="blank">Wiki</a>        
          <br /> 
          {/* <iframe width="100%" height="315" src="https://www.youtube.com/embed/udjSQot7yxw?si=aBeCjznFyyi3aQKf" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> */}
          {/* <iframe 
           title={country.name}
            width="100%" 
            height="480" 
            frameborder="0" 
            scrolling="no" 
            marginheight="0" 
            marginwidth="0"
            
            src={`https://maps.google.com/maps?q=${country.capital_latitude},${country.capital_longitude}&amp;z=6&amp;output=embed`}>
            <br/>
            <a href={`https://www.google.com/maps/@${country.capital_latitude},${country.capital_longitude},${7}z" target="_blank`}>
            See full page map
            </a></iframe> */}
          {/* src={`https://maps.google.com/maps?q=59.72,10.75&amp;z=9&amp;out> */}
          {/* src={`https://maps.google.com/maps?q=19.79,96.07&amp;z=1&amp;output=embed`}> */}
          {/* src={`https://maps.google.com/maps?q=59.72,10.75&amp;z=1&amp;output=embed`}> */}
          {/* src={`https://maps.google.com/maps?q=59.72,10.75&amp;z=1&amp;output=embed`}> */}
          {/* src={`https://maps.google.com/maps?q=59.72,10.75&amp;z=1&amp;output=embed`}> */}
          {/* src={`https://maps.google.com/maps?q=59.72,10.75&amp;z=1&amp;output=embed`}> */}
          {/* src={'https://maps.google.com/maps?q=59.72,10.75&hl=es;z=14&amp;output=embed'}>*/}
          {/* <iframe src="https://www.google.com/maps/embed?p
            b=!1m14!1m12!1m3!1d299967.5742871857!2d-75.32440282359767!3d-8.946704023723896!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1697663243492!5m2!1sen!2sus" 
            width="600" 
            height="450" 
            style="border:0;" 
            allowfullscreen="" l
            oading="lazy" 
            referrerpolicy="no-referrer-when-downgrade">

            </iframe> */}
          {/* <a href={`${country.lo}`}></a> */}

          {/* <iframe
            title={country.name}
            width="100%"
            height="480"
            frameBorder="0"
            scrolling="no"
            marginHeight="0"
            marginWidth="0"
            
            ///src={map}
             src="https://maps.google.com/maps?q=12.37,-1.52&amp;z=2&amp;output=embed"
            //src={country.map_google}
          >
            <a href="https://www.google.com/maps/12.37,-1.52,4z">
              See full page map
            </a>
          </iframe> */}

          {/* {country.capital_latitude} */}
          {/* `${map2}` */}
          <Markdown>{data}</Markdown>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      lightOrDark: "",
      search: "",
      sortOrder: "",
    };
  }

  async componentDidMount() {
    const response = await fetch(countries);
    const csvText = await response.text();
    const parsedData = Papa.parse(csvText, { header: true }).data;
    this.setState({ data: parsedData });
  }

  render() {
    const { data, lightOrDark, search, sortOrder } = this.state;

    if (data === null) {
      return "loading...";
    }

    function filterContries(lightOrDark, country) {
      if (lightOrDark === "africa") {
        return country.continent === "Africa";
      } else if (lightOrDark === "asia") {
        return country.continent === "Asia";
      } else if (lightOrDark === "europe") {
        return country.continent === "Europe";
      } else if (lightOrDark === "oceania") {
        return country.continent === "Oceania";
      } else if (lightOrDark === "northamerica") {
        return country.continent === "North America";
      } else if (lightOrDark === "southamerica") {
        return country.continent === "South America";
      } else {
        return true;
      }
    }

    const allcountries = data.length;
    //debugger
    //console.log(allcountries);
    const filteredCountries = data.filter(
      (country) => filterContries(lightOrDark, country) && filterSearch(search, country)
    );
    const sortedCountries = sortCountries(sortOrder, filteredCountries);
    const countries = sortedCountries.map((country) => {
      return <Country country={country} key={country.name} />;
    });
    const newcountries = countries.length;
    //console.log(newcountries);
    //console.log()
    //console.log(countries[0].pro)
    return (
      <div>
        <label htmlFor="options">Choose an option</label>
        <select
          id="options"
          onChange={(event) => {
            this.setState({ lightOrDark: event.target.value });
          }}
        >
          <option value="all">Show all</option>
          <option value="africa">Africa</option>
          <option value="asia">Asia</option>
          <option value="europe">Europe</option>
          <option value="oceania">Oceania</option>
          <option value="northamerica">North America</option>
          <option value="southamerica">South America</option>
        </select>
        <select
          onChange={(event) => {
            this.setState({ sortOrder: event.target.value });
          }}>
          <option value="asc">asc </option>
          <option value="des">des </option>
          <option value="+pop">population asc</option>
          <option value="-pop">population dec</option>
        </select>

        <form>
          <label htmlFor="search">search</label>
          <input id="search"onChange={(event)=> {this.setState({search:event.target.value})}}></input>
        </form>
        <h1>
          now showing {newcountries} out of {allcountries}
        </h1>
        <div
          className="App"
          style={{
            display: "flex",
            width: "80%",
            margin: "10px auto",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {countries}
        </div>
      </div>
    );
  }
}
export default App;