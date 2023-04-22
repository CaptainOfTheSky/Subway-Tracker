import React, { useState, useEffect } from 'react';
// import api from './api';

export default function Tracker() {
    const [error, setError] = useState(null);
    // const [isLoaded, setIsLoaded] = useState(false);

    const [items, setItems] = useState([]);
    const [stations, setStations] = useState([]);
    const [currentStation, setCurrentStation] = useState({ name: "Dupont Circle", code: "A03" });
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
        const path = "StationPrediction.svc/json/GetPrediction/" + currentStation.code;

        fetch(baseURL + path, { headers: { 'api_key': '247a49c603544b51a5d4bd147ba4a0d0' } })
            .then(response => response.json())
            .then(
                data => { setItems(data.Trains); },
                err => setError(err)
            )
            .catch(err => setError(err))
    }, []);

    useEffect(() => {
        const path = "Rail.svc/json/jStations";

        fetch(baseURL + path, { headers: { 'api_key': '247a49c603544b51a5d4bd147ba4a0d0' } })
            .then(response => response.json())
            .then(
                data => {
                    setStations(data.Stations);
                    console.log(data)
                },
                err => setError(err)
            )
            .catch(err => setError(err));

        console.log("stations")
        console.log(stations)
    }, []);

    function changeStation(e) {
        setCurrentStation({ name: "Dupont Circle", code: "A03" });
        console.log(e.target.value);
    }

    return (
        <div>
            <h1>Hello</h1>
            <select onChange={(e) => changeStation(e)}>
                {stations && stations.length > 0 && stations.map((station) => (
                    <option value={station.code}>{station.Name}</option>
                ))}
            </select>

            <h2>Trains coming to {currentStation.name}</h2>
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