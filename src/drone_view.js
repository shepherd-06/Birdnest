import React from "react";

class DroneView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            serial_number: null,
            model: null,
            manufacturer: null,
            mac: null,
            ipv4: null,
            ipv6: null,
            firmware: null,
            positionY: null,
            positionX: null,
            altitude: null,
        };
    }

    render() {
        return (<div>
            <h3>
                Drone Serial Number:
                {this.props.drone_serial_number}
            </h3>
            <h3>
                Drone Model:
                {this.props.drone_model}
            </h3>
        </div >);
    }
}

export default DroneView;