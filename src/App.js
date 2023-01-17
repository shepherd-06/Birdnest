import './App.css';
import React from 'react';

import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';

import Drone from './drone';
import DeviceInformation from './device_information';
import { checkViolation, filterAndInsert } from './utility';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      drones: null, // all drone list (from local_storage + API)
      last_update_ms: null, //last updated. value updates every 2s
      total_drones: null,
      last_violation: null,
      last_expired: null,
      last_expired_at: null,
    };
  }

  isValid() {
    /**
     * Purpose of this function is to check validity of data currently present in localStorage
     * if any data is more than 10 m old, it would be deleted.
     * it will also delete the pilot's information from localStorage by serialNumber.
     */
    // console.log("validity check");
    let drone_list = localStorage.getItem('drones');
    drone_list = JSON.parse(drone_list);
    const ten_m = 600000; // 10 minutes in ms
    let total_expire = 0;

    if (drone_list != null) {
      for (let i = 0; i < drone_list["drones"].length; i++) {
        let serialNumber = drone_list["drones"][i]["serialNumber"];
        let lastSeen = drone_list["drones"][i]["last_seen"];

        if (lastSeen + ten_m < Date.now()) {
          // expired milk
          total_expire += 1;
          drone_list["drones"].splice(i, 1);
          i--; // fixing index issue.

          // remove pilot information
          localStorage.removeItem(serialNumber);
        }
      }
      // console.log("total expire ", total_expire, " array length ", drone_list["drones"].length);
      localStorage.setItem('drones', JSON.stringify(drone_list));
      this.setState({
        drones: drone_list,
        last_expired_at: Date.now(),
        total_drones: drone_list["drones"].length,
        last_expired: total_expire,
      });
    }
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
        total_drones: drone_list["drones"].length,
        last_violation: 'Not Calculated Yet',
        last_expired: 0,
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
              drone_list = filterAndInsert(drone_list, new_drones);
            }
            localStorage.setItem('drones', JSON.stringify(drone_list));

            this.setState({
              drones: drone_list,
              last_update_ms: Date.now(),
              total_drones: drone_list["drones"].length,
              last_violation: new_drones.length,
            })
          } else {
            this.setState({
              total_drones: drone_list["drones"].length,
              last_violation: new_drones.length,
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
    this.getLocalData(); // load existing data from localStorage
    this.isValid(); // check if validity exist, this happens once.

    setInterval(() => {
      this.mainEngine();
    }, 2000); // <- change this to 2 S (2000 ms) in production.

    setInterval(() => {
      this.isValid();
    }, 5000); // <- 5 second works best.
  }

  render() {
    let information = {
      "total_drones": this.state.total_drones,
      "last_violation": this.state.last_violation,
      "last_expired": this.state.last_expired,
      "last_expired_at": this.state.last_expired_at,
    }
    return (
      <div className="container">
        <div className="row">
          <h1 className="display-1 App">PROJECT BIRDNEST</h1>
          <hr />
          <div className="col-lg-12">
            <br />
            <div className='row'>
              <div className="col-md-5">
                {/* we will view the list of drones in the left side of the pane. */}
                <h1 className="display-4"> Violated Drone List</h1>
                <Drone props={this.state.drones} />
              </div>
              <div className='col-md-2'></div>
              <div className="col-md-5">
                {/* this pane will be used to view random information, like last check, current time etc */}
                <div className="row">
                  <h4 className="display-4"> Update Information</h4> <br />
                  <DeviceInformation
                    props={[information, this.state.last_update_ms]} />
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
