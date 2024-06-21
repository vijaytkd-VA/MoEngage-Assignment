import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles.css';

const Search = () => {
    const [breweries, setBreweries] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBreweries = async () => {
            try {
                const response = await axios.get('/api/breweries');
                setBreweries(response.data);
            } catch (error) {
                console.error("Error fetching breweries", error);
            }
        };

        fetchBreweries();
    }, []);

    return (
        <div className="container">
            <h1>Search Breweries</h1>
            <div className="brewery-list">
                {breweries.map((brewery) => (
                    <div key={brewery.id} className="brewery-item" onClick={() => navigate(`/brewery/${brewery.id}`)}>
                        <h2>{brewery.name}</h2>
                        <p>{brewery.address}</p>
                        <p>{brewery.phone}</p>
                        <p><a href={brewery.website} target="_blank" rel="noopener noreferrer">{brewery.website}</a></p>
                        <p>Rating: {brewery.rating}</p>
                        <p>{brewery.state}, {brewery.city}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Search;
