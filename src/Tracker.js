import React, { useState, useEffect } from 'react';
// import api from './api';

export default function Tracker() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    const [items, setItems] = useState([]);
    const [stations, setStations] = useState([]);
    const [currentStation, setCurrentStation] = useState();
    const baseURL = "https://api.wmata.com/StationPrediction.svc/json/";
    // useEffect(() => {
    //     api.getItems().then(({ items, error }) => {
    //     setIsLoaded(true);
    //     setError(error);
    //     setItems(items);
    //     });
    // }, []);

    useEffect(() => {
        const path = "GetPrediction/B03";
        const headers = {  };

        fetch(baseURL + path, { 'api_key': '247a49c603544b51a5d4bd147ba4a0d0' })
            .then(response => response.json())
            .then(data => { setItems(data); console.log(data) })
            .catch(err => setError(err))
    }, []);

    return (
        <div>
            <h1>Hello</h1>
            <ul>
                {/* {items.map((item) => (
                    <li key={item.name}>
                        {item.name} {item.price}
                    </li>
                ))} */}

                <p>{ error }</p>
            </ul>
        </div>
    );
}