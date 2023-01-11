import './App.css';
import React, { useState } from 'react';
import './drone';
import Drone from './drone';

import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';


// function fetch_data(setReport) {
//   axios.get('https://assignments.reaktor.com/birdnest/drones/', {
//     'Access-Control-Allow-Origin': '*',
//   })
//     .then((textResponse) => {
//       let parsed_xml = new XMLParser().parse(textResponse['data']);
//       let report = parsed_xml['report'];
//       console.log(report);
//       setReport(report);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// }

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      report: null,
      counter: 0,
    };
  }

  componentDidMount() {
    // fetch_data(this.setReport());
    axios.get('https://assignments.reaktor.com/birdnest/drones/', {
      'Access-Control-Allow-Origin': '*',
    })
      .then((textResponse) => {
        let parsed_xml = new XMLParser().parse(textResponse['data']);
        let report_data = parsed_xml['report'];
        this.setState({
          report: report_data
        })
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    // console.log("-------");
    // console.log(this.state.report);
    // console.log("-------");
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
            <Drone drones={this.state.report} />
          </div>

          <div className='col-lg-6'>
            {/* this pane will be used to view random information, like last check, current time etc */}
          </div>
        </div>

      </div>
    );
  }
}

export default App;
