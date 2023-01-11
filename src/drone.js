import DroneView from './drone_view';

function Drone(drones) {
    if (drones["drones"] != null) {
        let drone_list = drones["drones"]["capture"]["drone"];
        console.log(drone_list);
        for (let i = 0; i < drone_list.length; i++) {
            console.log(i, " --> ", drone_list[i]);
        }
        return (
            <ul>
                {
                    // drone_list.map((value, index) => {
                    //     return <li key={index}>{value}</li>
                    // })
                }
            </ul>
            // <div>
            //     <DroneView />
            // </div >
        );
    } else {
        return (
            <div>
                <p> modify empty val</p>
            </div>
        )
    }
}

export default Drone;