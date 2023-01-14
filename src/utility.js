import axios from 'axios';

export const getDistance = (x, y) => {
    /**
     * takes x, y and calculates the distance from the center (250000,250000)
     * 
     * returns distance
     */
    let x1 = x - 250000;
    let y1 = y - 250000;

    return Math.sqrt(x1 * x1 + y1 * y1);
}

export const checkViolation = (new_drones) => {
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
        // let distance = this.getDistance(positionX, positionY);
        let distance = getDistance(positionX, positionY);

        if (distance <= 100000) {
            new_drones[i]["distance"] = distance / 1000;
            new_drones[i]["last_seen"] = Date.now();

            violated_drones = violated_drones.concat(new_drones[i]);
        }
    }
    console.log("total drones --> ", new_drones.length, " violation --> ", violated_drones.length);
    return violated_drones;
}


export const filter = (old_drones, new_drones) => {
    /**
     *  check if new data already exist in the list,
     *  and update the latest position
     */
    console.log("[old drones ", old_drones["drones"].length, " new drones ", new_drones.length, " ]");

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
            // this will add a new pilot information
            getPilotInformation(serial_number);
        }
    }
    return old_drones;
}

export const getPilotInformation = (serialNumber) => {
    /**
     * Get Pilot Information if it doesn't already exist in storage.
     * if present, increase number of violation by 1.
     * else, init by 1.
     * 
     * if pilot information not present, then create an empty entry in localStorage.
     */
    let pilot_information = localStorage.getItem('serialNumber');
    pilot_information = JSON.parse(pilot_information);
    let old_data_exist = false;

    if (pilot_information != null) {
        if (pilot_information["data_exist"]) {
            // pilot information already exist. just update incident number.
            pilot_information["violation"] += 1;
            localStorage.setItem(serialNumber, JSON.stringify(pilot_information));
            old_data_exist = true;
        }
    }

    if (!old_data_exist) {
        const URL = "https://assignments.reaktor.com/birdnest/pilots/".concat(serialNumber)
        axios.get(URL, {
            'Access-Control-Allow-Origin': '*',
        }).then((response) => {
            response = response["data"];
            response["data_exist"] = true;

            if (pilot_information === null) {
                response["violation"] = 1;
            } else {
                response["violation"] = pilot_information["violation"] + 1;
            }
            localStorage.setItem(serialNumber, JSON.stringify(response));
        }
        ).catch((error) => {
            if (error.response) {
                console.log(error.response.status, serialNumber);
                let data = {
                    "data_exist": false
                }
                if (pilot_information === null) {
                    data["violation"] = 1;
                } else {
                    data["violation"] = pilot_information["violation"] + 1;
                }
                localStorage.setItem(serialNumber, JSON.stringify(data));
            }
        });
    }
}