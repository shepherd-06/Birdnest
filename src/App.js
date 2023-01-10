import './App.css';
import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';
import DroneView from './drone';

async function fetch_data() {
  let report = null;
  axios.get('https://assignments.reaktor.com/birdnest/drones/', {
    'Access-Control-Allow-Origin': '*',
  })
    .then((textResponse) => {
      let parsed_xml = new XMLParser().parse(textResponse['data']);
      report = parsed_xml['report'];
    })
    .catch((error) => {
      console.log(error);
    });
}

function App() {
  fetch_data();

  return (
    <div className="container">
      {/* <header className="App-header">
      TODO: Show header information by this bar Later
      </header> */}

      {/* Main body */}
      <div className='col-lg-12'>

        {/* some empty space for now */}
        <br></br>
        <div className="col-lg-6">
          {/* we will view the list of drones in the left side of the pane. */}
          <DroneView drone_serial_number={"apple"} />
        </div>

        <div className='col-lg-6'>
          {/* this pane will be used to view random information, like last check, current time etc */}
        </div>
      </div>

    </div>
  );
}

export default App;
