import './App.css';
import React from 'react';

import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';

import Drone from './drone';
import DeviceInformation from './device_information';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      report: null,
      counter: 0,
      last_update_ms: null,
    };
  }

  componentDidMount() {
    axios.get('https://assignments.reaktor.com/birdnest/drones/', {
      'Access-Control-Allow-Origin': '*',
    })
      .then((textResponse) => {
        let parsed_xml = new XMLParser().parse(textResponse['data']);
        let report_data = parsed_xml['report'];
        this.setState({
          report: report_data,
          last_update_ms: Date.now(),
        })
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <br />
            <div className="col-md-6">
              {/* this pane will be used to view random information, like last check, current time etc */}
              <div className="row">
                <h1> Device and Update Information</h1>
                <DeviceInformation
                  props={[this.state.report, this.state.last_update_ms]} />
              </div>
            </div>
            <br />
            <div className="col-md-6">
              {/* we will view the list of drones in the left side of the pane. */}
              <h1> Violated Drone List</h1>
              <Drone drones={this.state.report} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
