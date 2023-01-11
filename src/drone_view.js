import React from "react";

class DroneView extends React.Component {
    // TODO: add pilot information from here. add a button and some way to display pilot data
    constructor(props) {
        super(props);
        this.state = {
            drone: null,
            id: null,
        };
    }
    render() {
        return (
            <div className="row">
                <li key={this.props.id} >
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