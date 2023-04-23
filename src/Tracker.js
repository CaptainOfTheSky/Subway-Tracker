import React, { useState, useEffect } from 'react';
// import api from './api';

export default function Tracker() {
    const [error, setError] = useState(null);
    // const [isLoaded, setIsLoaded] = useState(false);

    const [items, setItems] = useState([]);
    const [stations, setStations] = useState([]);
    const [currentStation, setCurrentStation] = useState({ Name: "Dupont Circle", Code: "A03" });
    const baseURL = "https://api.wmata.com/";

    const colorLookup = {
        "RD": "red",
        "YL": "yellow",
        "SV": "silver",
        "GR": "green",
        "BL": "blue",
        "OR": "orange",
    }
    // useEffect(() => {
    //     api.getItems().then(({ items, error }) => {
    //     setIsLoaded(true);
    //     setError(error);
    //     setItems(items);
    //     });
    // }, []);

    useEffect(() => {
        const path = "StationPrediction.svc/json/GetPrediction/" + currentStation.Code;

        fetch(baseURL + path, { headers: { 'api_key': '247a49c603544b51a5d4bd147ba4a0d0' } })
            .then(response => response.json())
            .then(
                data => { setItems(data.Trains); },
                err => setError(err)
            )
            .catch(err => setError(err))
    }, [currentStation]);

    useEffect(() => {
        const path = "Rail.svc/json/jStations";

        fetch(baseURL + path, { headers: { 'api_key': '247a49c603544b51a5d4bd147ba4a0d0' } })
            .then(response => response.json())
            .then(
                data => {
                    setStations(data.Stations);
                },
                err => setError(err)
            )
            .catch(err => setError(err));
    }, []);

    function changeStation(e) {
        const path = "Rail.svc/json/jStationInfo?StationCode=";

        fetch(baseURL + path + e.target.value, { headers: { 'api_key': '247a49c603544b51a5d4bd147ba4a0d0' } })
            .then(response => response.json())
            .then(
                data => {
                    setCurrentStation(data);
                },
                err => setError(err)
            )
            .catch(err => setError(err));
    }

    return (
        <div>
            <h1>Trains coming to {currentStation.Name}</h1>
            <select value={currentStation.Code} onChange={(e) => changeStation(e)}>
                {stations && stations.length > 0 && stations.map((station) => (
                    <option key={station.Code} value={station.Code}>{station.Name}</option>
                ))}
            </select>   
            <br/>
            <table>
                <tbody>
                {items.map((item) => (
                    <tr key={item.Code}>
                        <td><div className={`box ` + item.Line}></div></td>
                        <td style={{ textTransform: 'capitalize' }}>{colorLookup[item.Line]} Line</td> 
                        <td>towards</td> 
                        <td>{item.DestinationName}</td>
                        <td>in</td> 
                        <td>{item.Min} minutes</td>
                    </tr>
                ))}
                </tbody>
            </table>

            <p>{error}</p>
        </div>
    );
}