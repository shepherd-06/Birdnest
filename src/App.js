import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';

async function fetch_data() {
  axios.get('https://assignments.reaktor.com/birdnest/drones/', {
    'Access-Control-Allow-Origin': '*',
  })
    .then((textResponse) => {
      let parsed_xml = new XMLParser().parse(textResponse['data']);
      let report = parsed_xml['report'];
      console.log(report);
    })
    .catch((error) => {
      console.log(error);
    });
}

function App() {
  fetch_data();
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
