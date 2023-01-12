import DroneView from './drone_view';

function Drone(props) {
    if (props["props"] != null) {
        let drone_list = props["props"]["drones"];
        if (drone_list.length !== 0) {
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
            // TODO update here
            return (
                <p>Hello World</p> 
            );
        }

    }
    return (
        <div>
            {/* TODO: <create view here> */}
            <p> modify empty val</p>
        </div>
    )
}

export default Drone;