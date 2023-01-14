function DeviceInformation(props) {
    if (props["props"][0] != null) {
        let information = props["props"][0];
        let last_update_ms = props["props"][1];

        const last_update = [
            new Date(last_update_ms).getFullYear(),
            new Date(last_update_ms).getMonth() + 1,
            new Date(last_update_ms).getDate(),
            new Date(last_update_ms).getHours(),
            new Date(last_update_ms).getMinutes(),
            new Date(last_update_ms).getSeconds(),
        ];

        return (
            <div className="row">
                <p> Total Violated Drones: {information["total_drones"]} </p>
                <p> Update Interval: 2s </p>
                <p> Last Updated at: {last_update[0] + " / " + last_update[1] + " / "
                    + last_update[2] + " at " + last_update[3] + ":" + last_update[4]
                    + ":" + last_update[5]} </p>
                <p> Number of drones added: {information["last_violation"]}</p>
            </div>
        );
    } else {
        const last_update_ms = Date.now();
        const last_update = [
            new Date(last_update_ms).getHours(),
            new Date(last_update_ms).getMinutes(),
            new Date(last_update_ms).getSeconds(),
        ];
        return (<div className="row">
            <p> No update Yet! </p>
            <p>
                Last checked at: {last_update[0] + ":" + last_update[1]
                    + ":" + last_update[2]}
            </p>
        </div>);
    }
}

export default DeviceInformation;