import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles.css';

const BreweryDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [brewery, setBrewery] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState({ rating: '', description: '' });

    useEffect(() => {
        const fetchBrewery = async () => {
            try {
                const response = await axios.get(`/api/breweries/${id}`);
                setBrewery(response.data);
                setReviews(response.data.reviews || []);
            } catch (error) {
                console.error("Error fetching brewery details", error);
            }
        };

        fetchBrewery();
    }, [id]);

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`/api/breweries/${id}/reviews`, newReview);
            setReviews([...reviews, response.data]);
            setNewReview({ rating: '', description: '' });
        } catch (error) {
            console.error("Error submitting review", error);
        }
    };

    return (
        <div className="container">
            {brewery ? (
                <div>
                    <h1>{brewery.name}</h1>
                    <p>{brewery.description}</p>
                    <p>{brewery.location}</p>
                    <button onClick={() => navigate('/search')}>Back to Search</button>

                    <h2>Reviews</h2>
                    {reviews.map((review, index) => (
                        <div key={index} className="review">
                            <p>Rating: {review.rating}</p>
                            <p>{review.description}</p>
                        </div>
                    ))}

                    <h2>Add a Review</h2>
                    <form onSubmit={handleReviewSubmit}>
                        <label>Rating: 
                            <input type="number" value={newReview.rating} onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })} min="1" max="5" required />
                        </label>
                        <label>Description: 
                            <textarea value={newReview.description} onChange={(e) => setNewReview({ ...newReview, description: e.target.value })} required></textarea>
                        </label>
                        <button type="submit">Submit Review</button>
                    </form>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default BreweryDetail;
