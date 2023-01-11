import DroneView from './drone_view';

function Drone(drones) {
    if (drones["drones"] != null) {
        let drone_list = drones["drones"]["capture"]["drone"];
        return (
            <ol key="oi">
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