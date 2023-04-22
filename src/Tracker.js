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
        "RD": { color: '#ff0000', name: "RED" },
        "YL": { color: '#00ffff', name: "YELLOW" },
        "SV": { color: '#888888', name: "SILVER" },
        "GR": { color: '#00ff00', name: "GREEN" },
        "BL": { color: '#0000ff', name: "BLUE" },
        "OR": { color: '#00ffff', name: "ORANGE" },
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
            <h1>Hello</h1>
            <select onChange={(e) => changeStation(e)}>
                {stations && stations.length > 0 && stations.map((station) => (
                    <option selected={station.Code == currentStation.Code} key={station.Code} value={station.Code}>{station.Name}</option>
                ))}
            </select>

            <h2>Trains coming to {currentStation.Name}</h2>
            <ul>
                {items.map((item) => (
                    <li key={item.id}>
                        <span className="">{colorLookup[item.Line].name}</span> Line towards {item.DestinationName} in {item.Min} minutes
                    </li>
                ))}
            </ul>

            <p>{error}</p>
        </div>
    );
}