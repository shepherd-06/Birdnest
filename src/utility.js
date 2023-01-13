export const isValid = () => {
    /**
     * Purpose of this function is to check validity of data currently present in localStorage
     * if any data is more than 10 m old, it would be deleted.
     */
}

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
        console.log(distance);

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