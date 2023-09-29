import Papa from 'papaparse';
import countries from "./countries.csv";
import React from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';


function sortColors(sortOrder, colors) {
  console.log(sortOrder)
  if (sortOrder === 'asc') {
    return colors.sort(function (a, b) { return a.Name.localeCompare(b.Name) });
  } else if (sortOrder === 'des') {
    return colors.sort(function (a, b) { return b.Name.localeCompare(a.Name) });
  } else if (sortOrder === '+star') {
    return colors.sort(function (a, b) { return b.star - a.star });
  } else if (sortOrder === '-star') {
    return colors.sort(function (a, b) { return a.star - b.star });
  } else {
    return colors.sort(o => o.Name);
  }
}
function Example() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
function lower(w){return w.toLowerCase();}
function formattedNumberDefault(p){return Number(p).toLocaleString()}
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

    function filterColor(lightOrDark, color) {
      if (lightOrDark === 'dark') {
        return color.shininess === 'dull'
      } else if (lightOrDark === 'light') {
        return color.shininess === 'bright'
      } else {
        return true
      }
    }
    function filterTemp(temp, color) {
      if (temp === 'warm') {
        return color.temp === 'warm'
      } else if (temp === 'cool') {
        return color.temp === 'cool'
      } else {
        return true
      }
    }
    

    const filteredColors = data.filter(
      color => filterColor(lightOrDark, color) && filterTemp(temp, color)
    )
    const sortedColors = sortColors(sortOrder, filteredColors)
    const colors = sortedColors.map(color => {
      return <div key={color.name}
        className={color.shininess}
        style={{
          backgroundColor: color.HEX,
          margin: '10px',
        }}>

        <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={`https://flagcdn.com/${lower(color.abbreviation)}.svg`} alt={`flag of ${color.name}`}/>
      <Card.Body>
        <Card.Title>{color.name}</Card.Title>
        <Card.Text>
          Region: {color.continent}<br/>    
          Population: {formattedNumberDefault(color.population)}<br/>
          Capital: {color.capital}
        </Card.Text>
        <Button variant="primary" >Show more</Button>
      </Card.Body>
    </Card>

      </div>
    })

    console.log(colors[0])
    return (
      <div>
        <label htmlFor="options">Choose an option</label>
        <select onChange={(event) => {
          this.setState({ lightOrDark: event.target.value })
        }}>
          <option value="all">Show all</option>
          <option value="dark">Dark Only</option>
          <option value="light">Light Only</option>
        </select>
        <select onChange={(event) => {
          this.setState({ temp: event.target.value })
        }}>
          <option value="all">Show all</option>
          <option value="warm">Warm Only</option>
          <option value="cool">Cool Only</option>
        </select>
        <select onChange={(event) => {
          this.setState({ sortOrder: event.target.value })
        }}>
          <option value="asc">asc </option>
          <option value="des">des </option>
          <option value="+star">star asc</option>
          <option value="-star">star dec</option>
        </select>

        <div className="App" style={{
          display: 'flex',
          width: '80%',
          margin: '10px auto',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }} >
          {colors}
        </div>
      </div>
    );
  }
}
export default App;