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
        let last_seen_ms = this.props.drone["last_seen"];
        const last_seen = [
            new Date(last_seen_ms).getHours(),
            new Date(last_seen_ms).getMinutes(),
            new Date(last_seen_ms).getSeconds(),
        ];
        return (
            <div className="row">
                <li key={this.props.id} >
                    <p>Drone Model: {this.props.drone["model"]}</p>
                    <p>Drone Serial Number: {this.props.drone["serialNumber"]}</p>
                    <p>Distance To Nest: {this.props.drone["distance"].toFixed(2)} m</p>
                    <p>Last Seen At: {last_seen[0] + ":" + last_seen[1] + ":" + last_seen[2]}</p>
                    <button type="button" className="btn btn-info"> Pilot Information </button>
                    {/* need some bottom padding. */}
                </li>
            </div>
        );
    }
}

export default DroneView;