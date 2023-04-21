import React, { useState, useEffect } from 'react';
// import api from './api';

export default function Tracker() {
    const [error, setError] = useState(null);
    // const [isLoaded, setIsLoaded] = useState(false);

    const [items, setItems] = useState([]);
    const [stations, setStations] = useState([]);
    const [currentStation, setCurrentStation] = useState('B03');
    const baseURL = "https://api.wmata.com/StationPrediction.svc/json/";

    // useEffect(() => {
    //     api.getItems().then(({ items, error }) => {
    //     setIsLoaded(true);
    //     setError(error);
    //     setItems(items);
    //     });
    // }, []);

    useEffect(() => {
        const path = "GetPrediction/" + currentStation;

        fetch(baseURL + path, { headers: { 'api_key': '247a49c603544b51a5d4bd147ba4a0d0' } })
            .then(response => response.json())
            .then(data => { setItems(data.Trains); console.log("trains"); console.log(data) })
            .catch(err => setError(err))
    }, []);

    useEffect(() => {
        const path = "jStations";
        console.log(baseURL + path)

        fetch(baseURL + path, { headers: { 'api_key': '247a49c603544b51a5d4bd147ba4a0d0' } })
            .then(response => response.json())
            .then(data => { setStations(data.Stations); console.log(data) })
            .catch(err => setError(err));

        console.log("stations")
        console.log(stations)
    }, []);

    function changeStation(e) {
        setCurrentStation('B03');
    }

    return (
        <div>
            <h1>Hello</h1>
            <select onChange={changeStation}>
                {stations && stations.length > 0 && stations.map((station) => (
                    <option>{station.name}</option>
                ))}
            </select>

            <h2>Trains coming to Whatever Station {currentStation}</h2>
            <ul>
                {items.map((item) => (
                    <li key={item.id}>
                        {item.Line} Line towards {item.DestinationName}
                    </li>
                ))}
            </ul>

            <p>{error}</p>
        </div>
    );
}