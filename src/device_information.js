function DeviceInformation(props) {
    if (props["props"][0] != null) {
        const information = props["props"][0];
        const last_update = new Date(props["props"][1]).toLocaleString('en-GB');
        const last_expired_at = new Date(props["props"][0]["last_expired_at"]).toLocaleString('en-GB');

        return (
            <div className="row">
                <p> Total Violated Drones: {information["total_drones"]} </p>
                <p> Data Update Interval: 2s </p>
                <p> Last Violation Checked At: {last_update} </p>
                <p> Last Expiration Checked At: {last_expired_at} </p>
            </div>
        );
    } else {
        const last_update = new Date().toLocaleString('en-GB');

        return (<div className="row">
            <p> No update Yet! </p>
            <p>
                Last checked at: {last_update}
            </p>
        </div>);
    }
}

export default DeviceInformation;