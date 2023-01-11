import DroneView from './drone_view';

function Drone(drones) {
    if (drones != null) {
        return (
            <div>
                <DroneView />
            </div >);
    } else {
        return (
            <div>
                <p> modify empty val</p>
            </div>
        )
    }
}

export default Drone;