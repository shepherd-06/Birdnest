function DeviceInformation(props) {
    if (props["props"][0] != null) {
        let information = props["props"][0];
        information = information["deviceInformation"]

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
                <p> Device Started: {information["deviceStarted"]} </p>
                <p> Update Interval: {information["updateIntervalMs"]} ms </p>
                <p>    Last Updated at: {last_update[0] + " / " + last_update[1] + " / "
                    + last_update[2] + " at " + last_update[3] + ":" + last_update[4]
                    + ":" + last_update[5]} </p>
                <p>    Next Update In: { } </p>
            </div>
        );
    } else {
        return (<div className="row">
            <p> Unable to load information! </p>
        </div>);
    }
}

export default DeviceInformation;