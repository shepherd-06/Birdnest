import './App.css';
import React from 'react';

import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';

import Drone from './drone';
import DeviceInformation from './device_information';
import { isValid, checkViolation, filter } from './utility';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      information: null, // last data from API
      drones: null, // all drone list (from local_storage + API)
      last_update_ms: null, //last updated. value updates every 2s
    };
  }

  getLocalData() {
    /**
     * go to localStorage, check drones,
     * update states, if not NULL.
     */
    let drone_list = localStorage.getItem('drones');
    // why doesnt this if block work?
    if (drone_list !== null || drone_list !== 'undefined') {
      drone_list = JSON.parse(drone_list);
      if (drone_list === null) {
        drone_list = {
          "drones": []
        };
        localStorage.setItem('drones', JSON.stringify(drone_list));
      }
      let information = {
        "total_drones": drone_list["drones"].length,
        "last_violation": 'Not Calculated Yet',
      }
      this.setState({
        drones: drone_list,
        last_update_ms: Date.now(),
        information: information,
      });
      return drone_list;
    }
    // default fall back.
    return {
      "drones": []
    };
  }

  mainEngine() {
    /**
     * main func.
     * it runs the api scheduler.
     */
    let drone_list = this.getLocalData();

    axios.get('https://assignments.reaktor.com/birdnest/drones/', {
      'Access-Control-Allow-Origin': '*',
    })
      .then((textResponse) => {
        let parsed_xml = new XMLParser().parse(textResponse['data']);
        let report_data = parsed_xml['report'];
        if (report_data) {
          let new_drones = report_data["capture"]["drone"];
          // violation filter
          new_drones = checkViolation(new_drones);

          if (new_drones.length !== 0) {
            // no need to trigger anything, unless there's a violation!
            if (drone_list["drones"].length === 0) {
              // no need to filter anything.
              drone_list = {
                "drones": new_drones
              }
            } else {
              // filter old drone position with new position here.
              drone_list = filter(drone_list, new_drones);
            }
            localStorage.setItem('drones', JSON.stringify(drone_list));

            this.setState({
              drones: drone_list,
              last_update_ms: Date.now(),
              information: {
                "total_drones": drone_list["drones"].length,
                "last_violation": new_drones.length,
              }
            })
          } else {
            this.setState({
              information: {
                "last_violation": new_drones.length,
              }
            })
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidMount() {
    // this happens once.
    this.getLocalData();
    setInterval(() => {
      this.mainEngine();
    }, 15000); // <- change this to 2 S in production.

    setInterval(() => {
      isValid();
    }, 60000000); // <- this value should be equal to 1 M in production
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
