import DroneView from './drone_view';

function Drone(drones) {
    if (drones["drones"] != null) {
        let drone_list = drones["drones"]["capture"]["drone"];
        console.log(drone_list);
        return (
            <ol>
                {
                    drone_list.map((value, index) => {
                        return <DroneView
                            drone={value}
                            id={index}
                        ></DroneView>
                    })
                }
            </ol >
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