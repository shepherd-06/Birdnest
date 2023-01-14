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
            const last_update_ms = Date.now();
            const last_update = [
                new Date(last_update_ms).getHours(),
                new Date(last_update_ms).getMinutes(),
                new Date(last_update_ms).getSeconds(),
            ];
            return (
                <p> No drone violation recorded yet! Last checked at: {last_update[0] + ":" + last_update[1]
                    + ":" + last_update[2]}
                </p>
            );
        }
    }
    const last_update_ms = Date.now();
    const last_update = [
        new Date(last_update_ms).getHours(),
        new Date(last_update_ms).getMinutes(),
        new Date(last_update_ms).getSeconds(),
    ];
    return (
        <div>
            <p> No drone violation recorded yet! Last checked at: {last_update[0] + ":" + last_update[1]
                + ":" + last_update[2]}
            </p>
        </div>
    )
}

export default Drone;