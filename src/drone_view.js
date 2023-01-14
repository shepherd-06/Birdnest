import React from "react";

import showPilotInformation from "./pilot";

class DroneView extends React.Component {
    // TODO: add pilot information from here. add a button and some way to display pilot data
    render() {
        let last_seen_ms = this.props.drone["last_seen"];
        const last_seen = [
            new Date(last_seen_ms).getHours(),
            new Date(last_seen_ms).getMinutes(),
            new Date(last_seen_ms).getSeconds(),
        ];
        return (
            <div className="row">
                <li key={this.props.id} className="list-group-item" >
                    <p>Drone Model: {this.props.drone["model"]}</p>
                    <p>Drone Serial Number: {this.props.drone["serialNumber"]}</p>
                    <p>Distance To Nest: {this.props.drone["distance"].toFixed(2)} m</p>
                    <p>Last Seen At: {last_seen[0] + ":" + last_seen[1] + ":" + last_seen[2]}</p>
                    <button type="button" className="btn btn-info" onClick={showPilotInformation}> Pilot Information </button>
                    {/* need some bottom padding. */}
                </li>
            </div>
        );
    }
}

export default DroneView;