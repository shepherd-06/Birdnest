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


  getDistance(x, y) {
    /**
     * takes x, y and calculates the distance from the center (250000,250000)
     * 
     * returns distance
     */
    let x1 = x - 250000;
    let y1 = y - 250000;

    return Math.sqrt(x1 * x1 + y1 * y1);
  }

  checkViolation(new_drones) {
    /**
     * checks drone violation.
     * calculate the distance from the nest.
     * could return empty list, if no violation
     * add the violation time in the list.
     * 
     * returns list. 
     */

    let violated_drones = [];
    for (let i = 0; i < new_drones.length; i++) {
      let positionX = new_drones[i]["positionX"];
      let positionY = new_drones[i]["positionY"];
      let distance = this.getDistance(positionX, positionY);

      if (distance <= 100000) {
        new_drones[i]["distance"] = distance / 1000;
        new_drones[i]["last_seen"] = Date.now();

        violated_drones = violated_drones.concat(new_drones[i]);
      }
    }
    console.log("total drones ", new_drones.length, " violation ", violated_drones.length);
    return violated_drones;
  }

  filter(old_drones, new_drones) {
    /**
     *  check if new data already exist in the list,
     *  and update the latest position
     * 
     *  TODO: there's a bug in this function. it repeats the same drone multiple times.
     */
    console.log("old drones ", old_drones["drones"].length, " new drones ", new_drones.length);
    let new_added = 0;

    for (let i = 0; i < new_drones.length; i++) {
      const serial_number = new_drones[i]["serialNumber"];
      let is_found = false;
      for (let j = 0; j < old_drones["drones"].length; j++) {
        if (old_drones["drones"][j]["serialNumber"] === serial_number) {
          // drone exist in the list. update the information.
          old_drones["drones"][j]["distance"] = new_drones[i]["distance"];
          old_drones["drones"][j]["last_seen"] = new_drones[i]["last_seen"];
          is_found = true;
          break;
        }
      }

      if (!is_found) {
        // no match in the existing list. can be added directly
        old_drones["drones"] = old_drones["drones"].concat(new_drones[i]);
        new_added += 1;
      }
    }
    console.log("new added in the list ", new_added);
    return old_drones;
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
      this.setState({
        drones: drone_list,
        last_update_ms: Date.now(),
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
          let device_information = report_data["deviceInformation"];
          let new_drones = report_data["capture"]["drone"];
          if (device_information !== null) {
            if (device_information !== 'undefined') {
              this.setState({
                information: device_information,
              })
            }
          }
          // violation filter
          new_drones = this.checkViolation(new_drones);

          if (new_drones.length !== 0) {
            // no need to trigger anything, unless there's a violation!
            if (drone_list["drones"].length === 0) {
              // no need to filter anything.
              drone_list = {
                "drones": new_drones
              }
            } else {
              // filter old drone position with new position here.
              drone_list = this.filter(drone_list, new_drones);
            }
            localStorage.setItem('drones', JSON.stringify(drone_list));

            this.setState({
              drones: drone_list,
              last_update_ms: Date.now(),
            })
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidMount() {
    // update the view?
    this.getLocalData();
    setInterval(() => {
      this.mainEngine();
    }, 15000);
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
