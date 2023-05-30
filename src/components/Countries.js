import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Card from './Card';

const Countries = () => {
    const [data, setData] = useState([])
    const [numberFlags, setNumberFlags] = useState(36)
    const radios = ["Africa", "America", "Asia", "Europe", "Oceania"];
    const [selectedRadio, setSelectedRadio] = useState("")

    useEffect(() => {
        axios
            .get("https://restcountries.com/v3.1/all")
            .then((res) => setData(res.data))
    }, [])

    return (
        <div className='countries'>
            <ul className="radio-container">
                <input
                    type="range"
                    min="1"
                    max="250"
                    defaultValue={numberFlags}
                    onChange={(event) => setNumberFlags(event.target.value)}
                />
                {radios.map((continent) => (
                    <li>
                        <input
                            type="radio"
                            id={continent}
                            name='continent-radio'
                            checked={continent === selectedRadio}
                            onChange={(event) => setSelectedRadio(event.target.id)}
                        />
                        <label htmlFor={continent}>{continent}</label>
                    </li>
                ))}
                {
                    console.log(radios)
                }
            </ul>
            {selectedRadio && <button onClick={() => setSelectedRadio("")}>Annuler la recherche</button>}
            <ul>
                {
                    data
                        .filter((country) => country.continents[0].includes(selectedRadio))
                        .sort((a, b) => b.population - a.population)
                        .slice(0, numberFlags)
                        .map((country, index) => (
                            <Card key={index} country={country} />
                        ))}
            </ul>
        </div>
    );
};

export default Countries;