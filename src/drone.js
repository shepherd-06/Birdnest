/* <serialNumber>SN-fuw-_6D-no</serialNumber>
<model>Eagle</model>
<manufacturer>MegaBuzzer Corp</manufacturer>
<mac>fc:18:e9:1f:cf:b6</mac>
<ipv4>132.243.41.217</ipv4>
<ipv6>9992:c017:f67c:998e:0633:4c9e:f59b:e95f</ipv6>
<firmware>1.6.4</firmware>
<positionY>375940.62656280556</positionY>
<positionX>278534.15577558056</positionX>
<altitude>4947.574486349208</altitude>
</drone> */
import React from "react";

class DroneView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            drone_serial_number: "Default Drone Serial",
            drone_model: "Default Drone Model",
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