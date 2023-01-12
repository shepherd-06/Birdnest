import DroneView from './drone_view';

function Drone(props) {
    if (props["props"] != null) {
        let drone_list = props["props"]["drones"];
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
    }
    return (
        <div>
            {/* TODO: <create view here> */}
            <p> modify empty val</p>
        </div>
    )
}

export default Drone;