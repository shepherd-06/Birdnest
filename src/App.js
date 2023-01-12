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
      information: null, // last data from API
      drones: null, // all drone list (from local_storage + API)
      last_update_ms: null, //last updated. value updates every 2s
    };
  }

  componentDidMount() {
    let drone_list = localStorage.getItem('drones');
    // why doesnt this if block work?
    if (drone_list !== null || drone_list !== 'undefined') {
      drone_list = JSON.parse(drone_list);
      if (drone_list === null) {
        drone_list = {
          "drones": []
        };
      }
      this.setState({
        drones: drone_list,
        last_update_ms: Date.now(),
      });
    }

    axios.get('https://assignments.reaktor.com/birdnest/drones/', {
      'Access-Control-Allow-Origin': '*',
    })
      .then((textResponse) => {
        let parsed_xml = new XMLParser().parse(textResponse['data']);
        let report_data = parsed_xml['report'];
        if (report_data) {
          let device_information = report_data["deviceInformation"];
          let new_drones = report_data["capture"]["drone"];
          if (device_information !== null) {
            if (device_information !== 'undefined') {
              this.setState({
                information: device_information,
              })
            }
          }

          // filter old drone position with new position here.

          if (drone_list["drones"].length === 0) {
            drone_list = {
              "drones": new_drones
            }
          } else {
            drone_list = {
              "drones": drone_list["drones"].concat(new_drones)
            };
          }
          localStorage.setItem('drones', JSON.stringify(drone_list));

          this.setState({
            drones: drone_list,
            last_update_ms: Date.now(),
          })
        }
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
                  props={[this.state.information, this.state.last_update_ms]} />
              </div>
            </div>
            <br />
            <div className="col-md-6">
              {/* we will view the list of drones in the left side of the pane. */}
              <h1> Violated Drone List</h1>
              <Drone props={this.state.drones} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
