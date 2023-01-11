import React from "react";

class DroneView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            drone: null,
            id: null,
            // serial_number: null,
            // model: null,
            // manufacturer: null,
            // mac: null,
            // ipv4: null,
            // ipv6: null,
            // firmware: null,
            // positionY: null,
            // positionX: null,
            // altitude: null,
        };
    }
    render() {
        return (
            <div id={this.props.id}>
                <li>
                    <p>Drone Model: {this.props.drone["model"]}</p>
                    <p>Drone Serial Number: {this.props.drone["serial_number"]}</p>
                    <p>Drone Altitude: {this.props.drone["altitude"]}</p>
                    <p>Drone position (X, Y): {this.props.drone["positionX"]}, {this.props.drone["positionY"]}</p>
                </li>
            </div>
        );
    }
}

export default DroneView;