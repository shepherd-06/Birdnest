import React from "react";

class DroneView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false
        };
    }

    toggle() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    render() {
        let last_seen_ms = this.props.drone["last_seen"];
        const pilotInformation = JSON.parse(localStorage.getItem(this.props.drone["serialNumber"]));

        return (
            <div className="row">
                <li key={this.props.id} className="list-group-item item_custom" >
                    <p>Drone Model: {this.props.drone["model"]}</p>
                    <p>Drone Serial Number: {this.props.drone["serialNumber"]}</p>
                    <p>Distance To Nest: {this.props.drone["distance"].toFixed(2)} m</p>
                    <p>Last Seen At: {new Date(last_seen_ms).toLocaleString('en-GB')}</p>
                    <button type="button" className="btn btn-dark btn_custom"
                        onClick={this.toggle.bind(this)}
                    > Pilot Information </button>

                    <div className={"row collapse" + (this.state.isModalOpen ? ' in' : '')}>
                        <div>
                            {pilotInformation == null &&
                                <div className="info">
                                    <p>
                                        Sorry! We don't have any pilot data available of this operator.
                                    </p>
                                </div>
                            }
                            {pilotInformation != null &&
                                <div className="info">
                                    <p>
                                        Pilot Name: {pilotInformation["firstName"] + " " + pilotInformation["lastName"]}
                                    </p>

                                    <p>
                                        Email Address: {pilotInformation["email"]}
                                    </p>

                                    <p>
                                        Phone Number: {pilotInformation["phoneNumber"]}
                                    </p>
                                </div>
                            }
                        </div>
                    </div>
                </li>
            </div>
        );
    }
}

export default DroneView;