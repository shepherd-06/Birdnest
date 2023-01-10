import logo from './logo.svg';
import './App.css';
import axios from 'axios';

async function fetch_data() {
  // this code returns promise fulfilled. no error, just I cant log any data.
  axios.get('https://assignments.reaktor.com/birdnest/drones/', {
    'Access-Control-Allow-Origin': '*',
  })
    .then((textResponse) => {
      // let response_doc = new DOMParser().parseFromString(textResponse, 'application/xml');
      console.log('response is ', textResponse);
      console.log('len ', textResponse.length);
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
