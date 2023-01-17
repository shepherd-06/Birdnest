import DroneView from './drone_view';

function Drone(props) {
    if (props["props"] != null) {
        let drone_list = props["props"]["drones"];
        if (drone_list.length !== 0) {
            return (
                <ol key="oi" className='list-group'>
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
            const last_update = Date.now().toLocaleString('en-GB');
            return (
                <p>
                    No drone violation recorded yet! Last checked at: {last_update}
                </p>
            );
        }
    }
    const last_update = Date.now().toLocaleString('en-GB');
    return (
        <p>
            No drone violation recorded yet! Last checked at: {last_update}
        </p>
    );
}

export default Drone;